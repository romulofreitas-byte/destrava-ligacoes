# Modelo da LP de aula

## Arquivos

| Peça | Onde |
| --- | --- |
| Conteúdo | `src/content/aulas.ts` — um objeto por aula + `AULAS[slug]` |
| UI | `src/components/aula/*` — compartilhada |
| Rotas | `src/app/aula/[slug]/page.tsx` e `obrigado` |
| Inscrição | `src/app/api/inscricao/route.ts` → Supabase `inscricoes` + Resend |
| E-mail | `src/lib/aula-email.ts` (logo + botões da LP) |
| Links | `resolveAulaLinks`: env Meet + `NEXT_PUBLIC_AULA_COMMUNITY_URL` |
| Briefing | `aulas/<slug>.md` |

## Ordem das seções

Mobile: Hero+form → vídeo → dor (cards snap) → entregas → pra quem → host → FAQ → CTA → footer. CTA amarelo fixo embaixo quando o form some.

Desktop: Hero 2 colunas (copy \| form) → dor → entregas → pra quem → host → FAQ → vídeo → CTA → footer.

## Copy

- Topo de funil. Proibido: Comunidade, follow-up, discar, CRM, Método Pódium, pista, Pilotos, pitch, R1.
- H1 em `tituloLinha1` + `tituloLinha2`. Títulos longos com `\n`. Sem `text-pretty`. Sem “palavra — resto” (o travessão parte a linha).
- Hero mobile: uma linha de gancho, não o parágrafo longo.
- Prova do hero: nome + fala em 1ª pessoa (`historias` com `nome` e `texto`). Sem “Na Comunidade”.
- FAQ mínima: é pago? gravação? lista? ligar na aula? duração? o que recebo agora?
- WhatsApp = “grupo no WhatsApp”, nunca Comunidade.

## Visual

- Tokens do workshop: `gray-900`, `yellow-400`/`yellow-500`, Ubuntu/Montserrat, classes `aula-*`.
- Foto do host no hero mobile. Form com borda amarela e inputs `text-base`.
- Legal: Mundo Pódium LTDA · CNPJ 68.349.974/0001-19 · BH. YouTube `https://www.youtube.com/@mundopodium`.
- `/aula` é `noindex`.

## Go-live

1. SQL `supabase-inscricoes-schema.sql` (já pode ter rodado).
2. Meet no objeto + env Vercel.
3. Uma inscrição de teste: linha no Supabase + e-mail + grupo.
4. URL: `https://workshop.mundopodium.com.br/aula/<slug>`.
