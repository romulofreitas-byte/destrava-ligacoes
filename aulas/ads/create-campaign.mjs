#!/usr/bin/env node
/**
 * Cria (PAUSED) a campanha da aula via Marketing API.
 * node create-campaign.mjs --discover
 * node create-campaign.mjs
 * node create-campaign.mjs --video
 * node create-campaign.mjs --activate
 */
import { readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const args = new Set(process.argv.slice(2));
const GRAPH_DEFAULT = 'v21.0';

function parseEnv(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 1) continue;
    out[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return out;
}

async function loadEnv() {
  const fromFile = parseEnv(await readFile(join(ROOT, '.env'), 'utf8').catch(() => ''));
  return { ...fromFile, ...process.env };
}

function required(env, key) {
  const value = env[key]?.trim();
  if (!value) throw new Error(`Falta ${key} em ads/.env`);
  return value;
}

function graphBase(env) {
  return `https://graph.facebook.com/${env.META_API_VERSION || GRAPH_DEFAULT}`;
}

function actId(raw) {
  return String(raw).replace(/^act_/, '');
}

function destinationUrl(copy, utmContent) {
  const url = new URL(copy.campaign.url);
  for (const [key, value] of Object.entries(copy.campaign.utm)) {
    url.searchParams.set(key, value);
  }
  url.searchParams.set('utm_content', utmContent);
  return url.toString();
}

function stopTimeIso(copy) {
  return copy.campaign.stopAt.replace(/:(?=\d{2}$)/, '');
}

async function api(env, method, path, params = {}, { rawBody, headers } = {}) {
  const url = new URL(`${graphBase(env)}${path.startsWith('/') ? path : `/${path}`}`);
  const token = required(env, 'META_ACCESS_TOKEN');
  let body;
  const init = { method, headers: { ...headers } };

  if (rawBody) {
    if (rawBody instanceof FormData) {
      rawBody.append('access_token', token);
      init.body = rawBody;
    } else {
      init.body = rawBody;
    }
  } else if (method === 'GET') {
    url.searchParams.set('access_token', token);
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;
      url.searchParams.set(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
    }
  } else {
    const form = new URLSearchParams();
    form.set('access_token', token);
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;
      form.set(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
    }
    init.body = form;
  }

  const res = await fetch(url, init);
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) {
    const err = json.error || { message: res.statusText, code: res.status };
    const error = new Error(err.message || 'Meta API error');
    error.meta = err;
    error.path = path;
    throw error;
  }
  return json;
}

async function discover(env) {
  const me = await api(env, 'GET', '/me', { fields: 'id,name' });
  const accounts = await api(env, 'GET', '/me/adaccounts', {
    fields: 'id,account_id,name,account_status,business{name},currency',
    limit: 50,
  });
  const pages = await api(env, 'GET', '/me/accounts', {
    fields: 'id,name,access_token,instagram_business_account',
    limit: 50,
  });

  const pagesWithIg = [];
  for (const page of pages.data || []) {
    let ig = page.instagram_business_account?.id;
    if (!ig) {
      try {
        const detail = await api(env, 'GET', `/${page.id}`, { fields: 'instagram_business_account' });
        ig = detail.instagram_business_account?.id;
      } catch {
        ig = undefined;
      }
    }
    pagesWithIg.push({ id: page.id, name: page.name, ig });
  }

  return { me, accounts: accounts.data || [], pages: pagesWithIg };
}

function scoreAccount(account) {
  const hay = `${account.name || ''} ${account.business?.name || ''}`.toLowerCase();
  let score = 0;
  if (hay.includes('workshop') || hay.includes('dsl')) score += 8;
  if (hay.includes('podium') || hay.includes('pódium') || hay.includes('metodo')) score += 6;
  if (account.account_status === 1) score += 2;
  return score;
}

function pickAccount(accounts, forced) {
  if (forced) {
    const match = accounts.find((a) => actId(a.id) === actId(forced) || a.account_id === actId(forced));
    if (match) return match;
  }
  return [...accounts].sort((a, b) => scoreAccount(b) - scoreAccount(a))[0];
}

async function findAccountByPixel(env, accounts, pixelId) {
  for (const account of accounts) {
    try {
      const pixels = await api(env, 'GET', `/${account.id}/adspixels`, { fields: 'id,name', limit: 30 });
      if ((pixels.data || []).some((p) => p.id === pixelId)) return account;
    } catch {
      // skip accounts the token cannot read
    }
  }
  return null;
}

function pickPage(pages, forcedPage, forcedIg) {
  if (forcedPage) {
    const match = pages.find((p) => p.id === forcedPage);
    if (match) return match;
  }
  if (forcedIg) {
    const match = pages.find((p) => p.ig === forcedIg);
    if (match) return match;
  }
  return pages.find((p) => p.ig) || pages[0];
}

async function listAudiences(env, accountId) {
  const list = await api(env, 'GET', `/act_${accountId}/customaudiences`, {
    fields: 'id,name,subtype',
    limit: 200,
  });
  return list.data || [];
}

function findAudienceByNames(audiences, names) {
  const wanted = names.map((n) => n.toLowerCase());
  return audiences.find((item) => wanted.includes(item.name.toLowerCase()));
}

async function createOrReuseAudience(env, accountId, audiences, names, payload) {
  const existing = findAudienceByNames(audiences, names);
  if (existing) {
    console.log(`Público reusado: ${existing.name} (${existing.id})`);
    return existing.id;
  }
  const created = await api(env, 'POST', `/act_${accountId}/customaudiences`, {
    name: names[0],
    prefill: true,
    ...payload,
  });
  console.log(`Público criado: ${names[0]} (${created.id})`);
  return created.id;
}

function igAudienceRule(igId) {
  return {
    inclusions: {
      operator: 'or',
      rules: [
        {
          event_sources: [{ id: igId, type: 'ig_business' }],
          retention_seconds: 31536000,
          filter: {
            operator: 'and',
            filters: [{ field: 'event', operator: 'eq', value: 'ig_business_profile_all' }],
          },
        },
      ],
    },
  };
}

function videoAudienceRule(pageId) {
  return {
    inclusions: {
      operator: 'or',
      rules: [
        {
          event_sources: [{ id: pageId, type: 'page' }],
          retention_seconds: 31536000,
          filter: {
            operator: 'and',
            filters: [
              { field: 'event', operator: 'eq', value: 'video_watched' },
              { field: 'video_watched', operator: 'eq', value: 50 },
            ],
          },
        },
      ],
    },
  };
}

async function uploadImage(env, accountId, filePath) {
  const buf = await readFile(filePath);
  const created = await api(env, 'POST', `/act_${accountId}/adimages`, {
    bytes: buf.toString('base64'),
  });
  const first = Object.values(created.images || {})[0];
  if (!first?.hash) throw new Error('Upload da imagem não devolveu hash');
  console.log(`Imagem: hash ${first.hash}`);
  return first.hash;
}

async function uploadVideo(env, accountId, filePath) {
  const buf = await readFile(filePath);
  const form = new FormData();
  form.append('source', new Blob([buf]), 'aula-lead-antigo.mp4');
  const created = await api(env, 'POST', `/act_${accountId}/advideos`, {}, { rawBody: form });
  if (!created.id) throw new Error('Upload do vídeo não devolveu id');
  console.log(`Vídeo enviado: ${created.id}. Aguardando encoding…`);
  for (let i = 0; i < 24; i += 1) {
    await new Promise((r) => setTimeout(r, 5000));
    const status = await api(env, 'GET', `/${created.id}`, { fields: 'status' });
    const phase = status.status?.video_status || status.status;
    console.log(`  status vídeo: ${JSON.stringify(phase)}`);
    if (phase === 'ready' || status.status?.processing_progress === 100) return created.id;
    if (String(phase).toLowerCase().includes('error')) throw new Error('Encoding do vídeo falhou');
  }
  return created.id;
}

function targeting({ audienceId, instagramOnly }) {
  const spec = {
    geo_locations: { countries: ['BR'] },
    age_min: 25,
    age_max: 54,
    custom_audiences: [{ id: audienceId }],
    targeting_automation: { advantage_audience: 0 },
  };
  if (instagramOnly) {
    spec.publisher_platforms = ['instagram'];
    spec.instagram_positions = ['stream', 'story', 'reels', 'explore'];
  }
  return spec;
}

async function createCampaign(env, accountId, copy, budgetBrl) {
  const lifetime = Math.round(Number(budgetBrl) * 100);
  const payload = {
    name: copy.campaign.name,
    objective: 'OUTCOME_LEADS',
    status: 'PAUSED',
    special_ad_categories: [],
    lifetime_budget: lifetime,
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
  };
  try {
    const created = await api(env, 'POST', `/act_${accountId}/campaigns`, payload);
    console.log(`Campanha Leads: ${created.id}`);
    return { id: created.id, objective: 'OUTCOME_LEADS', optimization: 'OFFSITE_CONVERSIONS' };
  } catch (error) {
    console.warn(`OUTCOME_LEADS falhou: ${error.message}. Tentando Tráfego.`);
    const traffic = await api(env, 'POST', `/act_${accountId}/campaigns`, {
      name: copy.campaign.name,
      objective: 'OUTCOME_TRAFFIC',
      status: 'PAUSED',
      special_ad_categories: [],
      lifetime_budget: lifetime,
      bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
    });
    console.log(`Campanha Tráfego: ${traffic.id}`);
    return { id: traffic.id, objective: 'OUTCOME_TRAFFIC', optimization: 'LANDING_PAGE_VIEWS' };
  }
}

async function createAdSet(env, accountId, campaign, copy, set, audienceId, pixelId, pageId) {
  const instagramOnly = true;
  const base = {
    name: set.name,
    campaign_id: campaign.id,
    billing_event: 'IMPRESSIONS',
    optimization_goal: campaign.optimization,
    targeting: targeting({ audienceId, instagramOnly }),
    destination_type: 'WEBSITE',
    status: 'PAUSED',
    end_time: stopTimeIso(copy),
  };

  if (campaign.objective === 'OUTCOME_LEADS') {
    base.promoted_object = { pixel_id: pixelId, custom_event_type: 'LEAD' };
  } else {
    base.promoted_object = { pixel_id: pixelId, custom_event_type: 'VIEW_CONTENT' };
  }

  const tryCreate = async (payload) => api(env, 'POST', `/act_${accountId}/adsets`, payload);

  try {
    const created = await tryCreate(base);
    console.log(`Conjunto: ${set.name} (${created.id})`);
    return created.id;
  } catch (error) {
    console.warn(`Conjunto IG-only falhou (${error.message}). Abrindo Facebook também.`);
    const widened = {
      ...base,
      targeting: targeting({ audienceId, instagramOnly: false }),
    };
    try {
      const created = await tryCreate(widened);
      console.log(`Conjunto (FB+IG): ${set.name} (${created.id})`);
      return created.id;
    } catch (second) {
      if (campaign.objective === 'OUTCOME_LEADS') {
        console.warn(`Lead set falhou (${second.message}). Tentando page_id no promoted_object.`);
        const withPage = {
          ...widened,
          promoted_object: { pixel_id: pixelId, custom_event_type: 'LEAD', page_id: pageId },
        };
        const created = await tryCreate(withPage);
        console.log(`Conjunto: ${set.name} (${created.id})`);
        return created.id;
      }
      throw second;
    }
  }
}

async function createCreative(env, accountId, pageId, igId, ad, link, imageHash, videoId) {
  const story = { page_id: pageId };
  if (igId) story.instagram_user_id = igId;

  if (videoId) {
    story.video_data = {
      video_id: videoId,
      title: ad.headline,
      message: ad.primary,
      image_hash: imageHash,
      call_to_action: { type: ad.cta, value: { link } },
      link_description: ad.description,
    };
  } else {
    story.link_data = {
      link,
      message: ad.primary,
      name: ad.headline,
      description: ad.description,
      image_hash: imageHash,
      call_to_action: { type: ad.cta, value: { link } },
    };
  }

  const created = await api(env, 'POST', `/act_${accountId}/adcreatives`, {
    name: `AULA | ${ad.id} | ${videoId ? 'video' : 'static'}`,
    object_story_spec: story,
  });
  return created.id;
}

async function createAd(env, accountId, adSetId, creativeId, name) {
  const created = await api(env, 'POST', `/act_${accountId}/ads`, {
    name,
    adset_id: adSetId,
    creative: { creative_id: creativeId },
    status: 'PAUSED',
  });
  return created.id;
}

async function setStatus(env, id, status) {
  return api(env, 'POST', `/${id}`, { status });
}

function printDiscover(data, picked) {
  console.log(`Usuário: ${data.me.name} (${data.me.id})`);
  console.log('\nContas de anúncio:');
  for (const account of data.accounts) {
    const mark = picked.account && actId(account.id) === actId(picked.account.id) ? ' ← usada' : '';
    console.log(`  ${account.id}  ${account.name}  ${account.currency || ''}  status=${account.account_status}${mark}`);
  }
  console.log('\nPáginas:');
  for (const page of data.pages) {
    const mark = picked.page && page.id === picked.page.id ? ' ← usada' : '';
    console.log(`  ${page.id}  ${page.name}  IG=${page.ig || '—'}${mark}`);
  }
}

async function main() {
  const env = await loadEnv();
  const copy = JSON.parse(await readFile(join(ROOT, 'copy.json'), 'utf8'));
  const pixelId = env.META_PIXEL_ID?.trim() || copy.campaign.pixelId;
  const budgetBrl = env.META_BUDGET_BRL?.trim() || copy.campaign.budgetBrl;

  const discovered = await discover(env);
  const account =
    pickAccount(discovered.accounts, env.META_AD_ACCOUNT_ID) ||
    (await findAccountByPixel(env, discovered.accounts, pixelId)) ||
    pickAccount(discovered.accounts);
  const page = pickPage(discovered.pages, env.META_PAGE_ID, env.META_IG_ACTOR_ID);
  if (!account) throw new Error('Nenhuma conta de anúncio nesse token.');
  if (!page) throw new Error('Nenhuma Página nesse token.');
  const igId = env.META_IG_ACTOR_ID?.trim() || page.ig;
  const accountId = actId(account.id);

  printDiscover(discovered, { account, page });

  if (args.has('--discover')) return;

  if (!igId) throw new Error('Página sem Instagram Business. Preencha META_IG_ACTOR_ID.');

  const lastPath = join(ROOT, 'last-run.json');
  if (args.has('--activate')) {
    const last = JSON.parse(await readFile(lastPath, 'utf8'));
    await setStatus(env, last.campaignId, 'ACTIVE');
    for (const id of last.adSetIds || []) await setStatus(env, id, 'ACTIVE');
    for (const id of last.adIds || []) await setStatus(env, id, 'ACTIVE');
    console.log(`Campanha ACTIVE: ${last.campaignId}`);
    return;
  }

  const imagePath = join(ROOT, 'creatives', 'romulo-mentor-destrava.jpg');
  await access(imagePath);
  const imageHash = await uploadImage(env, accountId, imagePath);

  let videoId;
  const videoPath = join(ROOT, 'creatives', 'aula-lead-antigo.mp4');
  if (args.has('--video')) {
    await access(videoPath);
    videoId = await uploadVideo(env, accountId, videoPath);
  }

  const audiences = await listAudiences(env, accountId);
  const igAudienceId =
    env.META_IG_AUDIENCE_ID?.trim() ||
    (await createOrReuseAudience(
      env,
      accountId,
      audiences,
      ['AULA 21/09 | IG engajados 365d', 'Engajamento Instagram 365D', '[RMK][ENGAJAMENTO IG][30D][WORKSHOP]'],
      { rule: igAudienceRule(igId) },
    ));
  let videoAudienceId = env.META_VIDEO_AUDIENCE_ID?.trim();
  if (!videoAudienceId) {
    try {
      videoAudienceId = await createOrReuseAudience(
        env,
        accountId,
        audiences,
        ['AULA 21/09 | Video 50pct 365d', '[RMK][VIDEO50][30D]'],
        { rule: videoAudienceRule(page.id) },
      );
    } catch (error) {
      console.warn(`Público de vídeo não criado: ${error.message}. Segue só o conjunto IG.`);
    }
  } else {
    console.log(`Público de vídeo (env): ${videoAudienceId}`);
  }

  const campaign = await createCampaign(env, accountId, copy, budgetBrl);
  const adSetIds = [];
  const sets = [];
  const igSetId = await createAdSet(env, accountId, campaign, copy, copy.adSets[0], igAudienceId, pixelId, page.id);
  adSetIds.push(igSetId);
  sets.push({ ...copy.adSets[0], id: igSetId });
  if (videoAudienceId) {
    const videoSetId = await createAdSet(
      env,
      accountId,
      campaign,
      copy,
      copy.adSets[1],
      videoAudienceId,
      pixelId,
      page.id,
    );
    adSetIds.push(videoSetId);
    sets.push({ ...copy.adSets[1], id: videoSetId });
  }

  const adIds = [];
  for (const set of sets) {
    const link = destinationUrl(copy, set.utmContent);
    for (const ad of copy.ads) {
      const creativeId = await createCreative(env, accountId, page.id, igId, ad, link, imageHash, videoId);
      const adId = await createAd(env, accountId, set.id, creativeId, `${set.name} | ${ad.id}`);
      adIds.push(adId);
      console.log(`Anúncio: ${set.name} / ${ad.id} (${adId})`);
    }
  }

  const result = {
    createdAt: new Date().toISOString(),
    accountId,
    pageId: page.id,
    igId,
    pixelId,
    campaignId: campaign.id,
    objective: campaign.objective,
    audiences: { ig: igAudienceId, video: videoAudienceId || null },
    adSetIds,
    adIds,
    videoId: videoId || null,
    stopAt: copy.campaign.stopAt,
    budgetBrl: Number(budgetBrl),
  };
  await writeFile(lastPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  console.log(`\nSalvo em last-run.json. Campanha PAUSED: ${campaign.id}`);
  console.log('Para ligar: node create-campaign.mjs --activate');
}

main().catch((error) => {
  console.error(error.meta ? `${error.path || ''} → ${error.message}` : error);
  if (error.meta) console.error(JSON.stringify(error.meta, null, 2));
  process.exit(1);
});
