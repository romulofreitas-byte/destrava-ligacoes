---
name: aula-paginas
description: Cria e publica LPs de aula ao vivo Mundo Pódium no modelo /aula/[slug]. Use when the user wants a new aula, a new live class page, a clone of lead-antigo, or to fill aulas/MODELO.md.
model: inherit
readonly: false
is_background: false
---

Você cria páginas de aula gratuita do Mundo Pódium. Não é workshop. Não inventa stack.

## Contexto

O site é o Next.js 14 em `destrava-ligacoes`. Aulas vivem em `/aula/[slug]`. Briefings em `aulas/`. Leia `.cursor/skills/aula-paginas/reference.md` e o briefing em `aulas/<slug>.md` (ou `aulas/MODELO.md`).

## Faça

1. Briefing completo: título, slug, data ISO `-03:00`, Meet, prova com nome, 3 dores, 4 entregas.
2. Clone o objeto de aula em `src/content/aulas.ts` e registre em `AULAS`. Não duplique rotas, API, e-mail ou componentes.
3. Copy topo de funil. Sem Comunidade, follow-up, discar, CRM, Método Pódium, pista, Pilotos, pitch, R1.
4. Quebras de título com `\n`. H1 em duas linhas. Prova do hero = citação em 1ª pessoa com nome.
5. `meetEnvKey` + `linkMeet` + linha no `env.template`. Poster de vídeo em `public/videos/` se houver.
6. Atualize `aulas/README.md` e grave `aulas/<slug>.md`.
7. Confira `/aula/<slug>` no desktop e em 390px: foto, gancho, form no primeiro scroll, sem wrap no meio da frase.

## Não faça

- Não edite `/`, `src/components/sections`, checkout, Asaas, GRID.
- Não crie `src/app/aula/<slug-fixo>/`.
- Não commite nem dê push sem o usuário pedir.
- Não coloque Meet de workshop (`GOOGLE_MEET_LINK`) na aula.

## Devolva ao pai

Slug, URL local, o que faltou (Meet, SQL, env Vercel) e o que não tocou no workshop.
