---
name: aula-paginas
description: Creates and edits Mundo Pódium free live-class landing pages at /aula/[slug] from a briefing. Use when the user asks for a new aula, aula ao vivo, LP de aula, página de aula, futura aula, or to clone the lead-antigo model.
---

# Páginas de aula

Lê [reference.md](reference.md) antes de escrever código. Briefings ficam em `aulas/`.

## Quando entrar

Pedido de aula nova, clone do modelo, ou edição de `/aula/*`. Não usar no workshop.

## Passos

1. Se não houver briefing, cria `aulas/<slug>.md` a partir de `aulas/MODELO.md` e confirma título, data e Meet.
2. Copia o objeto da aula vigente em `src/content/aulas.ts` (hoje `LEAD_ANTIGO`). Troca slug, datas, copy, prova, Meet.
3. Registra em `AULAS`. Foto/host/footer/legal/CTA/FAQ base permanecem, salvo o briefing mudar.
4. Não cria rota, layout, API nem componentes novos. `/aula/[slug]`, `/obrigado`, `POST /api/inscricao` e o e-mail já servem todas as aulas.
5. Poster de vídeo em `public/videos/`. Env `NEXT_PUBLIC_AULA_<SLUG_EM_MAIUSCULAS>_MEET_URL` no `meetEnvKey`, `env.template` e Vercel.
6. Confere mobile 390px e desktop: H1 duas linhas, form no primeiro scroll, quebras com `\n`, zero jargão de fundo de funil.
7. Atualiza a tabela em `aulas/README.md`.

## Delegar

Tarefa completa de aula nova → subagente `.cursor/agents/aula-paginas.md`.
