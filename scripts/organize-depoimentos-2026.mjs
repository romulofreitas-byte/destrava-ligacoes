#!/usr/bin/env node
/**
 * Organiza public/Depoimentos - 2026 em hero / gallery / archive
 * e exporta curation/index.json, index.csv e blur-checklist.md.
 *
 * Uso:
 *   node scripts/organize-depoimentos-2026.mjs
 *   node scripts/organize-depoimentos-2026.mjs --dry-run
 *   node scripts/organize-depoimentos-2026.mjs --move   # move em vez de copiar
 *
 * Fonte dos arquivos (nessa ordem):
 *   1) public/Depoimentos - 2026/_raw/
 *   2) public/Depoimentos - 2026/ (raiz, arquivos soltos)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DEPOIMENTOS_2026,
  CATEGORY_LABELS,
  EXPECTED_COUNT,
} from './depoimentos-2026-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BASE = path.join(ROOT, 'public', 'Depoimentos - 2026');
const CURATION = path.join(BASE, 'curation');
const DESTINATIONS = ['hero', 'gallery', 'archive', '_raw'];

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');
const MOVE = args.has('--move');

function ensureDirs() {
  for (const dir of [...DESTINATIONS, 'curation'].map((d) => path.join(BASE, d))) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function findSource(filename) {
  const candidates = [
    path.join(BASE, '_raw', filename),
    path.join(BASE, filename),
    path.join(BASE, 'hero', filename),
    path.join(BASE, 'gallery', filename),
    path.join(BASE, 'archive', filename),
  ];
  return candidates.find((p) => fs.existsSync(p) && fs.statSync(p).isFile()) || null;
}

function csvEscape(value) {
  const s = String(value ?? '');
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function writeIndexJson() {
  const payload = {
    generatedAt: new Date().toISOString(),
    total: DEPOIMENTOS_2026.length,
    expectedTotal: EXPECTED_COUNT,
    categoryLabels: CATEGORY_LABELS,
    counts: {
      byDestination: countBy(DEPOIMENTOS_2026, 'destination'),
      byCategory: countBy(DEPOIMENTOS_2026, 'category'),
      byUsability: countBy(DEPOIMENTOS_2026, 'usability'),
      byFormat: countBy(DEPOIMENTOS_2026, 'format'),
      needsBlur: DEPOIMENTOS_2026.filter((e) => e.needsBlur).length,
    },
    items: DEPOIMENTOS_2026,
  };
  const out = path.join(CURATION, 'index.json');
  fs.writeFileSync(out, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  return out;
}

function writeIndexCsv() {
  const headers = [
    'file',
    'destination',
    'category',
    'category_label',
    'theme',
    'usability',
    'format',
    'quality',
    'needs_blur',
    'summary',
    'tags',
    'privacy_notes',
  ];
  const lines = [headers.join(',')];
  for (const e of DEPOIMENTOS_2026) {
    lines.push(
      [
        e.file,
        e.destination,
        e.category,
        CATEGORY_LABELS[e.category],
        e.theme,
        e.usability,
        e.format,
        e.quality,
        e.needsBlur ? 'yes' : 'no',
        e.summary,
        (e.tags || []).join('|'),
        e.privacyNotes || '',
      ]
        .map(csvEscape)
        .join(','),
    );
  }
  const out = path.join(CURATION, 'index.csv');
  fs.writeFileSync(out, lines.join('\n') + '\n', 'utf8');
  return out;
}

function writePathsJson() {
  const webBase = '/Depoimentos - 2026';
  const byDest = (destination) =>
    DEPOIMENTOS_2026.filter((e) => e.destination === destination).map((e) => ({
      file: e.file,
      path: `${webBase}/${destination}/${e.file}`,
      category: e.category,
      theme: e.theme,
      needsBlur: e.needsBlur,
      summary: e.summary,
    }));
  const payload = {
    categoryLabels: CATEGORY_LABELS,
    hero: byDest('hero'),
    gallery: byDest('gallery'),
    archive: byDest('archive'),
  };
  const out = path.join(CURATION, 'paths.json');
  fs.writeFileSync(out, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  return out;
}

function writeBlurChecklist() {
  const heroBlur = DEPOIMENTOS_2026.filter((e) => e.destination === 'hero' && e.needsBlur);
  const galleryBlur = DEPOIMENTOS_2026.filter((e) => e.destination === 'gallery' && e.needsBlur);
  const heroClean = DEPOIMENTOS_2026.filter((e) => e.destination === 'hero' && !e.needsBlur);
  const galleryClean = DEPOIMENTOS_2026.filter((e) => e.destination === 'gallery' && !e.needsBlur);

  const list = (items) =>
    items
      .map(
        (e) =>
          `- [ ] \`${e.file}\` — ${e.summary}${e.privacyNotes ? ` _(PII: ${e.privacyNotes})_` : ''}`,
      )
      .join('\n');

  const md = `# Checklist de blur — Depoimentos 2026

Gerado em ${new Date().toISOString()}.

Antes de publicar qualquer print WhatsApp com telefone visível (\`+55\` / \`+351\`), aplicar blur no número (e preferencialmente no header completo).

## Resumo

| Bucket | Com blur obrigatório | Sem blur aparente |
|--------|---------------------:|------------------:|
| hero | ${heroBlur.length} | ${heroClean.length} |
| gallery | ${galleryBlur.length} | ${galleryClean.length} |
| **keeps total** | **${heroBlur.length + galleryBlur.length}** | **${heroClean.length + galleryClean.length}** |

Arquivo com risco extremo (já em \`archive/\`, não publicar):
- \`IMG_8003.PNG\` — contrato ZapSign com nome de terceiro
- \`IMG_8109.PNG\` — lock screen com notificações pessoais
- UUID clusters \`12BB1F88…\`, \`6F0B3A9D…\`, \`9901C346…\` — muitos telefones

## Hero — blur obrigatório (${heroBlur.length})

${list(heroBlur) || '_Nenhum_'}

## Hero — já limpos / prontos (${heroClean.length})

${list(heroClean) || '_Nenhum_'}

## Gallery — blur obrigatório (${galleryBlur.length})

${list(galleryBlur) || '_Nenhum_'}

## Gallery — sem blur aparente (${galleryClean.length})

${list(galleryClean) || '_Nenhum_'}

## Regras rápidas

1. Blur telefone em todo WhatsApp com DDI visível.
2. Preferir crops limpos quando houver versão alternativa (\`IMG_6416\` vs \`IMG_6415\`, \`IMG_7681 (1)\` vs \`IMG_7681\`).
3. Não publicar \`archive/\` sem revisão caso a caso.
4. Após blur, manter o arquivo editado em \`hero/\` ou \`gallery/\` (não sobrescrever \`_raw/\`).
`;

  const out = path.join(CURATION, 'blur-checklist.md');
  fs.writeFileSync(out, md, 'utf8');
  return out;
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const k = item[key];
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
}

function organizeFiles() {
  const stats = {
    copied: 0,
    moved: 0,
    missing: [],
    skippedSame: 0,
    errors: [],
  };

  for (const entry of DEPOIMENTOS_2026) {
    const destDir = path.join(BASE, entry.destination);
    const destPath = path.join(destDir, entry.file);
    const source = findSource(entry.file);

    if (!source) {
      stats.missing.push(entry.file);
      continue;
    }

    if (path.resolve(source) === path.resolve(destPath)) {
      stats.skippedSame += 1;
      continue;
    }

    if (DRY_RUN) {
      console.log(`[dry-run] ${MOVE ? 'move' : 'copy'} ${path.relative(BASE, source)} → ${entry.destination}/${entry.file}`);
      continue;
    }

    try {
      fs.mkdirSync(destDir, { recursive: true });
      if (MOVE) {
        fs.renameSync(source, destPath);
        stats.moved += 1;
      } else {
        fs.copyFileSync(source, destPath);
        stats.copied += 1;
        // Se estava solto na raiz (não em _raw/destino), mover original para _raw
        const inRoot = path.dirname(source) === BASE;
        if (inRoot) {
          const rawPath = path.join(BASE, '_raw', entry.file);
          if (!fs.existsSync(rawPath)) {
            fs.renameSync(source, rawPath);
          }
        }
      }
    } catch (err) {
      stats.errors.push({ file: entry.file, error: String(err.message || err) });
    }
  }

  return stats;
}

function writeReadme(organizeStats) {
  const byDest = countBy(DEPOIMENTOS_2026, 'destination');
  const md = `# Depoimentos — 2026 (curadoria)

Acervo avaliado: **${DEPOIMENTOS_2026.length}** prints (esperado ${EXPECTED_COUNT}).

## Pastas

| Pasta | Qtd | Uso |
|-------|----:|-----|
| \`hero/\` | ${byDest.hero || 0} | Carrossel / prova social pesada (métricas e transformação) |
| \`gallery/\` | ${byDest.gallery || 0} | Marquee / galeria |
| \`archive/\` | ${byDest.archive || 0} | Duplicatas, ruído, risco de privacidade |
| \`_raw/\` | — | Originais brutos (drop aqui antes de organizar) |
| \`curation/\` | — | \`index.json\`, \`index.csv\`, \`blur-checklist.md\` |

## Categorias temáticas

${Object.entries(CATEGORY_LABELS)
  .map(([k, v]) => `- **${k}** — ${v}`)
  .join('\n')}

## Como (re)organizar

1. Coloque os arquivos originais em \`public/Depoimentos - 2026/_raw/\` (ou soltos na raiz desta pasta).
2. Rode:

\`\`\`bash
node scripts/organize-depoimentos-2026.mjs
\`\`\`

Opções: \`--dry-run\`, \`--move\`.

## Privacidade

Ver [\`curation/blur-checklist.md\`](./curation/blur-checklist.md). **Não publique** itens de \`archive/\` marcados como \`discard_privacy_risk\` sem revisão.

## Status desta execução

- Arquivos encontrados e organizados: **${(organizeStats.copied || 0) + (organizeStats.moved || 0) + (organizeStats.skippedSame || 0)}**
- Arquivos ausentes neste ambiente: **${organizeStats.missing.length}**
${organizeStats.missing.length ? '\n> Os metadados (JSON/CSV/checklist) estão completos. Para popular `hero/`/`gallery/`/`archive/` com as imagens, rode o script na máquina/local onde a pasta `_raw` tiver os 187 arquivos.\n' : ''}
`;

  const out = path.join(BASE, 'README.md');
  fs.writeFileSync(out, md, 'utf8');
  return out;
}

function main() {
  if (DEPOIMENTOS_2026.length !== EXPECTED_COUNT) {
    console.warn(
      `Aviso: curadoria tem ${DEPOIMENTOS_2026.length} itens; esperado ${EXPECTED_COUNT}.`,
    );
  }

  const files = DEPOIMENTOS_2026.map((e) => e.file);
  const dupes = files.filter((f, i) => files.indexOf(f) !== i);
  if (dupes.length) {
    console.error('Arquivos duplicados no índice:', dupes);
    process.exit(1);
  }

  ensureDirs();
  const jsonPath = writeIndexJson();
  const csvPath = writeIndexCsv();
  const blurPath = writeBlurChecklist();
  const organizeStats = organizeFiles();
  const readmePath = writeReadme(organizeStats);

  console.log('Curadoria exportada:');
  console.log(' -', path.relative(ROOT, jsonPath));
  console.log(' -', path.relative(ROOT, csvPath));
  console.log(' -', path.relative(ROOT, blurPath));
  console.log(' -', path.relative(ROOT, readmePath));
  console.log('Contagens:', countBy(DEPOIMENTOS_2026, 'destination'));
  console.log('Needs blur:', DEPOIMENTOS_2026.filter((e) => e.needsBlur).length);
  console.log('Organize:', {
    copied: organizeStats.copied,
    moved: organizeStats.moved,
    skippedSame: organizeStats.skippedSame,
    missing: organizeStats.missing.length,
    errors: organizeStats.errors.length,
  });

  if (organizeStats.missing.length) {
    const missingPath = path.join(CURATION, 'missing-files.txt');
    fs.writeFileSync(missingPath, organizeStats.missing.join('\n') + '\n', 'utf8');
    console.log('Lista de ausentes:', path.relative(ROOT, missingPath));
  }

  if (organizeStats.errors.length) {
    console.error('Erros:', organizeStats.errors);
    process.exit(1);
  }
}

main();
