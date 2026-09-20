import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, '..', 'exports', 'qa-visual');
fs.mkdirSync(out, { recursive: true });

const SECTION_IDS = [
  'plataforma-mundo-podium',
  'modulos-workshop',
  'ligacoes-ao-vivo',
  'apos-workshop',
  'faq-workshop',
];

async function capture(browser, label, width, height) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(800);
  const accept = page.getByRole('button', { name: /Aceitar Todos/i });
  if (await accept.count()) {
    await accept.click().catch(() => {});
    await page.waitForTimeout(400);
  }

  const full = path.join(out, `${label}-full.png`);
  await page.screenshot({ path: full, fullPage: true });

  const hero = page.locator('main > section').first();
  if ((await hero.count()) > 0) {
    await hero.screenshot({ path: path.join(out, `${label}-hero.png`) });
  }

  const allIds = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[id]')).map((el) => el.id)
  );
  console.log(`${label} ids sample:`, allIds.filter((id) => /mod|live|sala|plat|apos|faq|footer/i.test(id)).join(', '));

  for (const id of SECTION_IDS) {
    const el = page.locator(`#${id}`);
    if ((await el.count()) > 0) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await el.screenshot({ path: path.join(out, `${label}-${id}.png`) });
    }
  }

  const footer = page.locator('footer');
  if ((await footer.count()) > 0) {
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await footer.screenshot({ path: path.join(out, `${label}-footer.png`) });
  }

  const body = await page.locator('body').innerText();
  const spots = [...body.matchAll(/(\d+)\s*(?:de|\/)\s*(\d+)\s*vagas/gi)].map((m) => m[0]);
  const hasMetodoLogo = await page.locator('footer img[alt*="Método"], footer img[alt*="Metodo"]').count();
  const mundoLogos = await page.locator('footer img[alt*="Mundo"]').count();
  const casaHeadline = body.includes('É a casa') || body.includes('É a casa');
  const casaCta = body.includes('Ver a casa por dentro');

  console.log(
    JSON.stringify(
      {
        label,
        width,
        height,
        spotsMentions: spots.slice(0, 8),
        has620: /6\s*(?:de|\/)\s*20/.test(body),
        casaHeadline,
        casaCta,
        footerMundoLogos: mundoLogos,
        footerMetodoLogos: hasMetodoLogo,
      },
      null,
      2
    )
  );

  await page.close();
}

const browser = await chromium.launch();
await capture(browser, 'desktop', 1440, 900);
await capture(browser, 'mobile', 390, 844);
await browser.close();

const files = fs.readdirSync(out).filter((f) => f.endsWith('.png'));
console.log('files:', files.join(', '));
