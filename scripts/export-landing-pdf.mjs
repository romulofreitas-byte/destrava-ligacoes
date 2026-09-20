import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const outDir = path.resolve('exports');
fs.mkdirSync(outDir, { recursive: true });

const pdfPath = path.join(outDir, 'workshop-landing-visual.pdf');
const pngPath = path.join(outDir, 'workshop-landing-visual-full.png');

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

console.log('Navigating...');
await page.goto('http://localhost:3000/', {
  waitUntil: 'networkidle',
  timeout: 120000,
});
await page.waitForTimeout(2500);

await page.addStyleTag({
  content: `
    [class*='FloatingWhatsApp'],
    [class*='floating'],
    button[aria-label*='WhatsApp'] {
      display: none !important;
      visibility: hidden !important;
    }
    *, *::before, *::after {
      animation-play-state: paused !important;
    }
  `,
});

await page.keyboard.press('Escape');
await page.waitForTimeout(500);

const scrollHeight = await page.evaluate(async () => {
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 800) {
    window.scrollTo(0, y);
    await delay(200);
  }
  window.scrollTo(0, 0);
  await delay(800);
  return document.documentElement.scrollHeight;
});

console.log('Page height:', scrollHeight);

await page.evaluate(async () => {
  const imgs = Array.from(document.images);
  await Promise.all(
    imgs.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
        setTimeout(resolve, 5000);
      });
    })
  );
});

await page.waitForTimeout(1500);
const finalHeight = await page.evaluate(
  () => document.documentElement.scrollHeight
);
console.log('Final height:', finalHeight);

console.log('Capturing full-page PNG...');
await page.screenshot({ path: pngPath, fullPage: true, type: 'png' });
console.log(
  'PNG size MB:',
  (fs.statSync(pngPath).size / 1024 / 1024).toFixed(2)
);

const pdfHeight = Math.min(finalHeight + 40, 20000);
console.log('Generating PDF, height px:', pdfHeight);
await page.pdf({
  path: pdfPath,
  printBackground: true,
  width: '1440px',
  height: `${pdfHeight}px`,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
  preferCSSPageSize: false,
});

console.log(
  'PDF size MB:',
  (fs.statSync(pdfPath).size / 1024 / 1024).toFixed(2)
);
console.log('PDF:', pdfPath);
console.log('PNG:', pngPath);

await browser.close();
