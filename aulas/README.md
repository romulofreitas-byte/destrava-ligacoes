# Projetos de aula — Mundo Pódium

Pasta só das aulas ao vivo. O workshop (`/`) não entra aqui.

Cada aula tem um briefing em `aulas/<slug>.md`. A página no site é `/aula/<slug>`.

## No ar

| Aula | Data | URL |
| --- | --- | --- |
| Lead antigo não é lead morto | 21/09/2026, 20:30 | `/aula/lead-antigo-nao-e-lead-morto` |

## Nova aula

1. Copia `MODELO.md` para `aulas/<slug>.md` e preenche.
2. No chat do Cursor: **“cria a aula com o briefing X”** (o subagente `aula-paginas` entra).
3. Não mexer no workshop nem inventar rota nova — só um objeto em `src/content/aulas.ts`.

## Cursor

Workspace dedicado: abre `aulas.code-workspace` (File → Open Workspace from File).

No Explorer aparece **Aulas** no topo (briefings) e **Site** (o Next.js).

- Subagente: `.cursor/agents/aula-paginas.md`
- Skill: `.cursor/skills/aula-paginas/`
- Regra: `.cursor/rules/aula-paginas.mdc`
