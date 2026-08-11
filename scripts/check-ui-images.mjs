/**
 * Fails if any hardcoded /depoimentos* or /videos* path referenced in src
 * sections is missing from public/.
 *
 * Usage: node scripts/check-ui-images.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'src');

const PATH_RE =
  /['"`](\/(?:depoimentos(?:-2026-ready)?|videos)\/[^'"`]+)['"`]/g;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) files.push(full);
  }
  return files;
}

const found = new Map(); // path -> [files]
for (const file of walk(srcDir)) {
  const text = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = PATH_RE.exec(text))) {
    const asset = m[1];
    if (!found.has(asset)) found.set(asset, []);
    found.get(asset).push(path.relative(root, file));
  }
}

const missing = [];
const ok = [];
for (const [asset, refs] of [...found.entries()].sort()) {
  const disk = path.join(root, 'public', asset.replace(/^\//, ''));
  if (fs.existsSync(disk)) ok.push(asset);
  else missing.push({ asset, refs });
}

console.log(`Checked ${found.size} unique public image paths from src.`);
console.log(`OK: ${ok.length}`);
if (missing.length) {
  console.error(`MISSING: ${missing.length}`);
  for (const { asset, refs } of missing) {
    console.error(`  ${asset}`);
    for (const r of refs) console.error(`    ← ${r}`);
  }
  process.exit(1);
}
console.log('All UI depoimento/video image paths exist on disk.');
