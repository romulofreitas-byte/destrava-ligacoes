#!/usr/bin/env node
/**
 * Campanha de vídeo da aula via Marketing API.
 * node create-campaign.mjs --discover
 * node create-campaign.mjs            # cria PAUSED (vídeos + 10 ads)
 * node create-campaign.mjs --activate
 * node create-campaign.mjs --pause-old
 */
import { readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const args = new Set(process.argv.slice(2));
const GRAPH_DEFAULT = 'v21.0';
const OLD_CAMPAIGN_ID = '120256030617530311';

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
  audiences.push({ id: created.id, name: names[0] });
  return created.id;
}

function websiteUrlRule(pixelId, urlPart, retentionSeconds) {
  return {
    inclusions: {
      operator: 'or',
      rules: [
        {
          event_sources: [{ id: pixelId, type: 'pixel' }],
          retention_seconds: retentionSeconds,
          filter: {
            operator: 'and',
            filters: [{ field: 'url', operator: 'i_contains', value: urlPart }],
          },
        },
      ],
    },
  };
}

function pixelEventRule(pixelId, eventName, retentionSeconds) {
  return {
    inclusions: {
      operator: 'or',
      rules: [
        {
          event_sources: [{ id: pixelId, type: 'pixel' }],
          retention_seconds: retentionSeconds,
          filter: {
            operator: 'and',
            filters: [{ field: 'event', operator: 'eq', value: eventName }],
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
  console.log(`Imagem (thumb): hash ${first.hash}`);
  return first.hash;
}

async function uploadVideo(env, accountId, filePath, fileName) {
  const buf = await readFile(filePath);
  const form = new FormData();
  form.append('source', new Blob([buf]), fileName);
  const created = await api(env, 'POST', `/act_${accountId}/advideos`, {}, { rawBody: form });
  if (!created.id) throw new Error(`Upload do vídeo ${fileName} não devolveu id`);
  console.log(`Vídeo enviado: ${fileName} → ${created.id}. Aguardando encoding…`);
  for (let i = 0; i < 36; i += 1) {
    await new Promise((r) => setTimeout(r, 5000));
    const status = await api(env, 'GET', `/${created.id}`, { fields: 'status' });
    const phase = status.status?.video_status || status.status;
    console.log(`  ${fileName}: ${JSON.stringify(phase)}`);
    if (phase === 'ready' || status.status?.processing_progress === 100) return created.id;
    if (String(phase).toLowerCase().includes('error')) throw new Error(`Encoding de ${fileName} falhou`);
  }
  console.warn(`Encoding de ${fileName} ainda não confirmou ready. Seguindo com ${created.id}.`);
  return created.id;
}

function targeting({ audienceIds }) {
  return {
    geo_locations: { countries: ['BR'] },
    age_min: 25,
    age_max: 54,
    custom_audiences: audienceIds.map((id) => ({ id })),
    targeting_automation: { advantage_audience: 0 },
  };
}

async function createTrafficCampaign(env, accountId, copy) {
  const created = await api(env, 'POST', `/act_${accountId}/campaigns`, {
    name: copy.campaign.name,
    objective: 'OUTCOME_TRAFFIC',
    status: 'PAUSED',
    special_ad_categories: [],
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
  });
  console.log(`Campanha Tráfego: ${created.id}`);
  return created.id;
}

async function createWarmAdSet(env, accountId, campaignId, copy, audienceIds, pixelId) {
  const daily = Math.round(Number(copy.campaign.dailyBudgetBrl) * 100);
  const base = {
    name: copy.adSet.name,
    campaign_id: campaignId,
    billing_event: 'IMPRESSIONS',
    optimization_goal: copy.campaign.optimization || 'LINK_CLICKS',
    targeting: targeting({ audienceIds }),
    destination_type: 'WEBSITE',
    status: 'PAUSED',
    end_time: stopTimeIso(copy),
    daily_budget: daily,
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
    promoted_object: { pixel_id: pixelId },
  };

  try {
    const created = await api(env, 'POST', `/act_${accountId}/adsets`, base);
    console.log(`Conjunto: ${copy.adSet.name} (${created.id})`);
    return { id: created.id, optimization: base.optimization_goal };
  } catch (error) {
    console.warn(`LINK_CLICKS falhou (${error.message}). Tentando LANDING_PAGE_VIEWS.`);
    const fallback = {
      ...base,
      optimization_goal: 'LANDING_PAGE_VIEWS',
    };
    const created = await api(env, 'POST', `/act_${accountId}/adsets`, fallback);
    console.log(`Conjunto LPV: ${copy.adSet.name} (${created.id})`);
    return { id: created.id, optimization: 'LANDING_PAGE_VIEWS' };
  }
}

async function createVideoCreative(env, accountId, pageId, igId, ad, link, imageHash, videoId, videoLabel) {
  const story = { page_id: pageId };
  if (igId) story.instagram_user_id = igId;
  story.video_data = {
    video_id: videoId,
    title: ad.headline,
    message: ad.primary,
    image_hash: imageHash,
    call_to_action: { type: ad.cta, value: { link } },
    link_description: ad.description,
  };
  const created = await api(env, 'POST', `/act_${accountId}/adcreatives`, {
    name: `AULA | ${ad.id} | ${videoLabel}`,
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

async function pauseTree(env, campaignId) {
  await setStatus(env, campaignId, 'PAUSED');
  const sets = await api(env, 'GET', `/${campaignId}/adsets`, { fields: 'id', limit: 50 });
  for (const set of sets.data || []) await setStatus(env, set.id, 'PAUSED');
  const ads = await api(env, 'GET', `/${campaignId}/ads`, { fields: 'id', limit: 50 });
  for (const ad of ads.data || []) await setStatus(env, ad.id, 'PAUSED');
  console.log(`Pausada: ${campaignId}`);
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

async function ensureRemarketingAudiences(env, accountId, pixelId, copy) {
  const audiences = await listAudiences(env, accountId);
  const created = { page: null, video: null, lead: null };
  try {
    created.page = await createOrReuseAudience(
      env,
      accountId,
      audiences,
      ['AULA 21/09 | Visitantes LP 30d'],
      { subtype: 'WEBSITE', rule: websiteUrlRule(pixelId, copy.campaign.slug, 2592000) },
    );
  } catch (error) {
    console.warn(`Público visitantes não criado: ${error.message}`);
  }
  try {
    created.video =
      env.META_VIDEO_AUDIENCE_ID?.trim() ||
      findAudienceByNames(audiences, ['[RMK][VIDEO50][30D]', 'AULA 21/09 | Video 50pct 365d'])?.id ||
      null;
    if (created.video) console.log(`Público vídeo (remarketing): ${created.video}`);
  } catch (error) {
    console.warn(`Público vídeo: ${error.message}`);
  }
  try {
    created.lead = await createOrReuseAudience(
      env,
      accountId,
      audiences,
      ['AULA 21/09 | Lead 180d'],
      { subtype: 'WEBSITE', rule: pixelEventRule(pixelId, 'Lead', 15552000) },
    );
  } catch (error) {
    console.warn(`Público Lead 180d não criado: ${error.message}`);
  }
  return created;
}

async function main() {
  const env = await loadEnv();
  const copy = JSON.parse(await readFile(join(ROOT, 'copy.json'), 'utf8'));
  const pixelId = env.META_PIXEL_ID?.trim() || copy.campaign.pixelId;
  if (env.META_BUDGET_BRL?.trim()) copy.campaign.dailyBudgetBrl = Number(env.META_BUDGET_BRL);

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

  if (args.has('--pause-old')) {
    await pauseTree(env, OLD_CAMPAIGN_ID);
    return;
  }

  if (args.has('--activate')) {
    const last = JSON.parse(await readFile(lastPath, 'utf8'));
    if (last.oldCampaignId) {
      try {
        await pauseTree(env, last.oldCampaignId);
      } catch (error) {
        console.warn(`Não pausou a antiga: ${error.message}`);
      }
    }
    await setStatus(env, last.campaignId, 'ACTIVE');
    for (const id of last.adSetIds || []) await setStatus(env, id, 'ACTIVE');
    for (const id of last.adIds || []) await setStatus(env, id, 'ACTIVE');
    console.log(`Campanha ACTIVE: ${last.campaignId}`);
    return;
  }

  const remarketing = await ensureRemarketingAudiences(env, accountId, pixelId, copy);

  const imagePath = join(ROOT, 'creatives', 'romulo-mentor-destrava.jpg');
  await access(imagePath);
  const imageHash = await uploadImage(env, accountId, imagePath);

  const videoIds = {};
  for (const video of copy.videos) {
    const videoPath = join(ROOT, 'creatives', ...video.file.split('/'));
    await access(videoPath);
    videoIds[video.id] = await uploadVideo(env, accountId, videoPath, video.file.split('/').pop());
  }

  const warmIds = [env.META_IG_AUDIENCE_ID?.trim(), env.META_VIDEO_AUDIENCE_ID?.trim()].filter(Boolean);
  if (!warmIds.length) throw new Error('Faltam META_IG_AUDIENCE_ID e META_VIDEO_AUDIENCE_ID.');

  const campaignId = await createTrafficCampaign(env, accountId, copy);
  const adSet = await createWarmAdSet(env, accountId, campaignId, copy, warmIds, pixelId);

  const adIds = [];
  for (const video of copy.videos) {
    for (const ad of copy.ads) {
      const link = destinationUrl(copy, `${video.id}-${ad.id}`);
      const creativeId = await createVideoCreative(
        env,
        accountId,
        page.id,
        igId,
        ad,
        link,
        imageHash,
        videoIds[video.id],
        video.id,
      );
      const adId = await createAd(
        env,
        accountId,
        adSet.id,
        creativeId,
        `${copy.adSet.name} | ${video.id} | ${ad.id}`,
      );
      adIds.push(adId);
      console.log(`Anúncio: ${video.id} / ${ad.id} (${adId})`);
    }
  }

  const result = {
    createdAt: new Date().toISOString(),
    accountId,
    pageId: page.id,
    igId,
    pixelId,
    campaignId,
    oldCampaignId: OLD_CAMPAIGN_ID,
    objective: 'OUTCOME_TRAFFIC',
    optimization: adSet.optimization,
    audiences: { ig: warmIds[0] || null, video: warmIds[1] || null, remarketing },
    adSetIds: [adSet.id],
    adIds,
    videoIds,
    stopAt: copy.campaign.stopAt,
    dailyBudgetBrl: Number(copy.campaign.dailyBudgetBrl),
  };
  await writeFile(lastPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  console.log(`\nSalvo em last-run.json. Campanha PAUSED: ${campaignId}`);
  console.log('Para ligar: node create-campaign.mjs --activate');
}

main().catch((error) => {
  console.error(error.meta ? `${error.path || ''} → ${error.message}` : error);
  if (error.meta) console.error(JSON.stringify(error.meta, null, 2));
  process.exit(1);
});
