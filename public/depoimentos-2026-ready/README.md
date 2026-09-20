# Depoimentos 2026 — prontos para uso

Gerado a partir de `public/Depoimentos - 2026` (somente keeps do relatório).

## O que foi feito

- **Blur só de telefones** (`+55` / `+351` e padrões BR) via OCR
- **Split** quando há mais de um autor/depoimento no mesmo print → arquivos `…_parte-N.png`
- **Complementares** (mesmo fio / scrolls) mantidos com sufixo `comp-a`, `comp-b`, …
- **Rename** no padrão: `{tier}_{categoria}_{slug}[_comp-x][_parte-n].png`

## Pastas

- `hero/` — shortlist + reservas fortes
- `gallery/` — demais keeps
- `manifest.json` — mapa source → output (phones, splits, grupo)

## Categorias

`metricas` · `destravamento` · `metodo` · `workshop` · `comunidade`

## Originais

Os arquivos em `Depoimentos - 2026` **não foram alterados**.

## Regenerar

```bash
python scripts/process_depoimentos_ready.py --test   # amostra
python scripts/process_depoimentos_ready.py          # lote completo
```
