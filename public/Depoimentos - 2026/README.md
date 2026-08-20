# Depoimentos — 2026 (curadoria)

Acervo avaliado: **187** prints (esperado 187).

## Pastas

| Pasta | Qtd | Uso |
|-------|----:|-----|
| `hero/` | 24 | Carrossel / prova social pesada (métricas e transformação) |
| `gallery/` | 135 | Marquee / galeria |
| `archive/` | 28 | Duplicatas, ruído, risco de privacidade |
| `_raw/` | — | Originais brutos (drop aqui antes de organizar) |
| `curation/` | — | `index.json`, `index.csv`, `blur-checklist.md` |

## Categorias temáticas

- **A** — Resultados com métricas
- **B** — Destravamento / transformação
- **C** — Validação do método / cold call
- **D** — Workshop / mentoria / conteúdo
- **E** — Comunidade / networking / soft proof
- **F** — Descartes / baixo valor

## Como (re)organizar

1. Coloque os arquivos originais em `public/Depoimentos - 2026/_raw/` (ou soltos na raiz desta pasta).
2. Rode:

```bash
node scripts/organize-depoimentos-2026.mjs
```

Opções: `--dry-run`, `--move`.

## Privacidade

Ver [`curation/blur-checklist.md`](./curation/blur-checklist.md). **Não publique** itens de `archive/` marcados como `discard_privacy_risk` sem revisão.

## Status desta execução

- Arquivos encontrados e organizados: **0**
- Arquivos ausentes neste ambiente: **187**

> Os metadados (JSON/CSV/checklist) estão completos. Para popular `hero/`/`gallery/`/`archive/` com as imagens, rode o script na máquina/local onde a pasta `_raw` tiver os 187 arquivos.

