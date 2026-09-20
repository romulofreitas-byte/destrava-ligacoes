# Status — Workshop Destrava Ligações (11ª edição)

Documento de handoff para próximos passos (copy, vídeo, curadoria, código).  
**Data do snapshot:** 10 de agosto de 2026 (atualizado) · repo `destrava-ligacoes`

---

## Prompt sugerido para o Claude

> Você está ajudando no lançamento da **11ª edição** do Workshop Destrava Ligações (Mundo Pódium). Leia este handoff por completo. Priorize: (1) brief de gravação dos dois vídeos com slot já pronto no código (prova no hero + garantia/termos); (2) QA visual do trabalho local ainda **não commitado** (densificação + rewrite da seção Plataforma/"casa" + footer); (3) validação de vagas/preço; (4) decisões de prova social abertas. Não misture com docs Proobra (`GUIA_*`, `HeroSectionProobra.tsx`) — são de outro produto. Fonte única de datas/preço/vagas/edição/copy da plataforma: `src/lib/constants.ts`. Ref. de framing da casa: https://casa.mundopodium.com.br/ (checkout de assinatura em plataforma.mundopodium.com.br é só referência — na landing do workshop o ingresso continua primário com 60 dias incluso).

---

## 1. Snapshot atual

Fonte: [`src/lib/constants.ts`](src/lib/constants.ts)

| Item | Valor |
|------|--------|
| Edição | **11ª** (`WORKSHOP_SALES.edition: 11`) |
| Vendas | Abertas (`isOpen: true`) |
| Vagas | **6 / 20** · barra **30%** — **validar se ainda é verdade** |
| Preço atual | **R$ 897,00** |
| Âncora (“de”) | **R$ 1.497,00** |
| Economia | “Economia de R$ 600 nesta edição” |
| Módulo 1 | **19/08/2026** · 13:00–17:00 |
| Módulo 2 (Sala de Ligação) | **25/08/2026** · 08:00–12:00 |
| Duração | 2 módulos × 4h = **8h** no total |
| Acesso plataforma | **60 dias** incluso a partir da compra |
| Continuidade (alumni) | a partir de **R$ 59,90**/mês |
| Preço público plataforma | **R$ 89,90**/mês |
| URL casa / plataforma | `https://casa.mundopodium.com.br/` (`PLATAFORMA_CASA_URL`) |

### Stack e entrada da página

- Next.js App Router
- Home: [`src/app/page.tsx`](src/app/page.tsx) → [`src/components/sections/WorkshopPageContent.tsx`](src/components/sections/WorkshopPageContent.tsx)
- SEO/metadata na home: título/descrição com Anatomia da Ligação + 8h (2×4h); favicon Mundo Pódium

### Git (importante)

| Estado | Detalhe |
|--------|---------|
| Tip remoto (`origin/main`) | `e4d6f73` — *feat(workshop): prova social do workshop e Anatomia da Ligação* |
| Branch | `main` alinhada com `origin/main` no tip; **working tree suja** |
| Local não commitado | Densificação + rewrite Plataforma/"casa" + footer slim (~**+452 / −841** em 15 arquivos `src/`) |
| Untracked | `STATUS_WORKSHOP_11A_HANDOFF.md`, `env.template` |

**Arquivos modificados locais:**

- `src/lib/constants.ts`
- `WorkshopPageContent.tsx`, `WorkshopModulesSection.tsx`, `WorkshopTestimonialBanner.tsx`, `WorkshopFAQSection.tsx`
- `LiveCallsSection.tsx`, `EventDetailsSection.tsx`, `WhyYouStuckSection.tsx`, `WhyDifferentWorkshopSection.tsx`
- `NicheApplicationSection.tsx`, `AfterWorkshopSection.tsx`, `AboutRomuloWorkshopSection.tsx`
- `PlataformaMundoPodiumSection.tsx` (rewrite grande)
- `TestimonialsScrollSection.tsx`, `Footer.tsx`

Commits recentes no remoto:

- `e4d6f73` — prova social + Anatomia da Ligação  
- `e3be8f6` — logos Mundo Pódium + ancoragem R$ 1.497  
- `d897af4` — reabrir vendas (agosto, R$ 897, 20 vagas)

---

## 2. Mapa da página (ordem das seções)

Ordem atual em [`WorkshopPageContent.tsx`](src/components/sections/WorkshopPageContent.tsx):

1. `HeroSectionWorkshop` — hero + countdown + preço + slot de vídeo de prova  
2. `RomuloTeaserSection`  
3. `WorkshopTestimonialBanner` — prova social featured  
4. `WorkshopModulesSection` — **accordion**; datas/horários nos cards via `WORKSHOP_INFO` / `WORKSHOP_MODULE_2_INFO`  
5. `LiveCallsSection` — módulo 2 / sala (**slim**: 3 benefícios, sem print longo)  
6. `EventDetailsSection`  
7. `WhoIsItForWorkshopSection`  
8. `WhyYouStuckSection`  
9. `PlataformaMundoPodiumSection` — framing **“casa”** + Maycon + arsenal + CTA  
10. `TestimonialsVideoSection` — vídeos Lucas / Vinicius  
11. `AboutRomuloWorkshopSection`  
12. `WhyDifferentWorkshopSection`  
13. `NicheApplicationSection`  
14. `AfterWorkshopSection`  
15. `TestimonialsScrollSection` — grid de prints  
16. `WorkshopFAQSection`  
17. `WorkshopGuaranteeSection` — garantia + **slot de vídeo**  
18. `FinalCTAWorkshopSection`  
19. `Footer` — só logo Mundo Pódium (logo Método Pódium removido no pass local)  
+ `SubtleHelpModal` · `FloatingWhatsAppButton`

### Removidos / enxugados no trabalho local (ainda uncommitted)

- Removidos da página: `WhatYouWillLearnSection`, `WorkshopModuleDatesSection`, CTAs intermediários `SubtleCTA`
- Live Calls: sem prova longa (Izabela saiu)
- Plataforma: removidos cards de métricas do Maycon + 3 insight cards antigos → fluxo **Veja / Pratique / Evolua → vídeo → arsenal → CTA**
- FAQ / AfterWorkshop / Niche / Why* : copy mais curta
- Footer: branding dual Método Pódium removido

**Ação:** scroll QA mobile/desktop → depois **commit + push** se o pacote estiver ok.

---

## 3. Seção Plataforma / “casa” (trabalho local recente)

Arquivos: [`PlataformaMundoPodiumSection.tsx`](src/components/sections/PlataformaMundoPodiumSection.tsx) + `PLATAFORMA_MUNDO_PODIUM_COPY` em [`constants.ts`](src/lib/constants.ts)

| Item | Conteúdo |
|------|----------|
| Framing | “Não é mais um curso. **É a casa** que sustenta o destravamento.” |
| Subhead | Workshop na ligação; na casa treina ao vivo, mentorias, ritmo com Pilotos |
| Beats | Veja · Pratique · Evolua |
| Vídeo | Maycon + tour Circle (já pluggado) |
| Arsenal (pilares) | Sala de Ligação · Mentorias Seg/Qui 11h · PódiumFlix · Comunidade + Corrida ao Vivo |
| CTA | “Ver a casa por dentro” → `https://casa.mundopodium.com.br/` |
| Oferta na landing | Ingresso do workshop é primário; **60 dias** incluso — **não** transformar a seção em página de venda de assinatura |

Ref. de produto (só referência): `https://plataforma.mundopodium.com.br/checkout/plataforma-mundo-podium-casa`  
Implementação na landing aponta para **Casa**, não para esse checkout.

Screenshots Circle em uso: `/Plataforma 1.png`, `/Plataforma 2.png`.

---

## 4. Prova social hoje

### Banner (featured)

Arquivo: [`WorkshopTestimonialBanner.tsx`](src/components/sections/WorkshopTestimonialBanner.tsx)  
Componente: [`WorkshopProofCard.tsx`](src/components/ui/WorkshopProofCard.tsx)

| Pessoa | Destaque |
|--------|----------|
| Gleice Souza | “Não teve um nicho sequer que você não soubesse explicar” (print em `gallery/`) |
| Robson Vieira / Regularize Health | “Triplicamos o faturamento no mês seguinte” |
| Igor Carvalhosa | “Vale mais de 2 mil reais fácil” |

### Grid / scroll

Arquivo: [`TestimonialsScrollSection.tsx`](src/components/sections/TestimonialsScrollSection.tsx)

| Pessoa | Destaque |
|--------|----------|
| Gilson Cas | “A maioria é só 3 CPLs com pitch no final” (print hero parte-3) |
| Douglas | Anatomia da Ligação → lead à R1 sem papo bobo |
| Lucas Ribeiro | 30 ligações → 3 reuniões → 1 venda no mesmo dia |
| João | 8 ligações → 2 compras + 1 upsell |
| Alanis Almeida | “Workshop de ligações REALMENTE funciona” |
| Maycon Ferraz | “Foi um divisor de águas pra mim” — **só texto**, sem foto (vídeo já na Plataforma) |

### Vídeos de depoimento

Arquivo: [`TestimonialsVideoSection.tsx`](src/components/sections/TestimonialsVideoSection.tsx)

- Lucas — destravamento após anos travado  
- Vinicius  

### Assets curados

- Prontos: [`public/depoimentos-2026-ready/`](public/depoimentos-2026-ready/) (`hero/` + `gallery/` + `manifest.json`)
- Inventário: [`RELATORIO_DEPOIMENTOS_CONTEUDO.md`](RELATORIO_DEPOIMENTOS_CONTEUDO.md) — **252** arquivos; campos `frente_produto_sugerida` / `uso_sugerido` ainda vazios (ads/email)

---

## 5. O que já foi feito (contexto recente)

**Já no remoto (`e4d6f73` e anteriores):**

- Centralização de edição, preço, datas, duração e regras de plataforma em `constants.ts`
- Consistência 11ª edição (SEO, footer/termos/privacidade Workshop · Mundo Pódium · PagBank)
- Reframe **Anatomia da Ligação** (afastar de “script/roteiro”); print Douglas no grid
- Logos Mundo Pódium; `WorkshopProofCard`; banner Regularize + Igor; Alanis no grid; Maycon na plataforma

**Só no working tree local (ainda sem commit):**

- Densificação de texto (menos seções, copy curta, módulos em accordion com datas)
- Rewrite completo da seção Plataforma no framing **“casa”**
- Footer slim (só Mundo Pódium)
- Copy FAQ / gravações / plataforma enxugada em `constants.ts`
- **Prova social curada (local):** Gleice no banner; Gilson + Maycon (texto) no grid; `WorkshopProofCard` aceita card sem imagem
- **Não publicado:** print 5 R1/1 R2 (autor sem nome no print)

---

## 6. Necessidades críticas

### 6.1 Gravar e plugar (slots já prontos no código)

| Slot | UI atual | Arquivo | Como ativar |
|------|----------|---------|-------------|
| **Prova no hero** (ligação real ao vivo) | “Vídeo em produção” | [`HeroProofVideoSlot.tsx`](src/components/ui/HeroProofVideoSlot.tsx) | `NEXT_PUBLIC_HERO_PROOF_YOUTUBE_URL` **ou** `NEXT_PUBLIC_HERO_PROOF_VIDEO_URL` |
| **Garantia / termos** (Rômulo explica) | “Em breve: o Rômulo explica…” | [`WorkshopGuaranteeSection.tsx`](src/components/sections/WorkshopGuaranteeSection.tsx) | `NEXT_PUBLIC_GARANTIA_YOUTUBE_URL` |

Referência de env: [`env.template`](env.template)

**Brief mínimo sugerido para gravação:**

1. **Hero / prova** — vertical ou 3:4 (slot aspect ~3/4); ligação real ao vivo ou trecho forte de sala; sem overlay de texto na gravação.  
2. **Garantia** — landscape 16:9; garantia **condicionada à execução** + condições claras.

Depois: setar vars no `.env.local` / Vercel → redeploy.

### 6.2 Decisões de prova social

- [x] **Gleice Souza** no banner (1ª posição) — path `gallery/gallery_workshop_gleice-souza-agradece-o-workshop-elogian.png`  
- [x] **Maycon**: citação em texto no grid, **sem** nova foto (vídeo permanece na Plataforma)  
- [x] **Gilson Cas** no grid (diferenciação vs “3 CPLs”) — print `hero_workshop_participantes-exaltam-o-workshop-como-o_parte-3.png`  
- [x] **5 R1 / 1 R2** (`gallery_metricas_aluno-fecha-a-semana-com-5-r1-e-1-r2-e-d.png`): **não publicado** — autor sem nome legível no print (só avatar + @Rômulo)  
- [ ] Confirmar se **6/20 vagas · 30%** ainda está correto  
- [ ] Mauro Fellype permanece fora (não priorizado nesta rodada)  
- [ ] Live Calls continua só com benefícios; prova “3 CPLs” do Gilson está no grid (não duplicada na seção)

### 6.3 Ops / código

- [ ] QA visual do pacote local (densificação + seção casa + footer) — mobile e desktop  
- [ ] Commit + push dos 15 arquivos `src/` (+ `env.template` / este handoff se desejado)  
- [ ] Confirmar que CTA “Ver a casa por dentro” e copy de 60 dias não competem com a venda do ingresso  
- [ ] **Não misturar** docs Proobra (`GUIA_*`, `RESUMO_*PROOBRA*`, `HeroSectionProobra.tsx`, `PainPointsMarqueeProobra.tsx`)  

### 6.4 Outros (secundário)

- [ ] Classificar `RELATORIO_DEPOIMENTOS_CONTEUDO.md` para ads / email / objeções  
- [ ] Revisar Open Graph (`/workshop-metodo.png`) para a 11ª  

---

## 7. Fonte única de verdade

Qualquer mudança de **data, horário, preço, âncora, vagas, edição, copy de plataforma/FAQ** deve ir primeiro em:

→ [`src/lib/constants.ts`](src/lib/constants.ts)

Objetos principais: `WORKSHOP_SALES`, `WORKSHOP_PRICING`, `WORKSHOP_INFO`, `WORKSHOP_MODULE_2_INFO`, `WORKSHOP_DURATION`, `WORKSHOP_PLATFORM_RULES`, `WORKSHOP_CLOSED_COPY`, `PLATAFORMA_MUNDO_PODIUM_COPY`, `PLATAFORMA_CASA_URL`.

---

## 8. Checklist priorizado (próximos passos)

1. **Gravar** vídeo de prova do hero → setar `NEXT_PUBLIC_HERO_PROOF_*` → redeploy  
2. **Gravar** vídeo da garantia/termos → setar `NEXT_PUBLIC_GARANTIA_YOUTUBE_URL` → redeploy  
3. **QA** densificação + seção “casa” + footer → **commit + push**  
4. **Confirmar** vagas (6/20), preço (897 / 1497) e copy de urgência  
5. *(Feito local)* Gleice + Gilson + Maycon (texto) — QA visual junto com densificação  
6. *(Opcional)* Classificar relatório de depoimentos para ads/email; Mauro Fellype se quiser reforçar banner  
7. *(Opcional)* Se identificar o autor do print 5 R1 / 1 R2, aí publicar com nome

---

## 9. Arquivos-chave (atalhos)

| Papel | Path |
|-------|------|
| Constantes | `src/lib/constants.ts` |
| Orquestração da página | `src/components/sections/WorkshopPageContent.tsx` |
| Hero | `src/components/sections/HeroSectionWorkshop.tsx` |
| Slot vídeo hero | `src/components/ui/HeroProofVideoSlot.tsx` |
| Módulos (accordion) | `src/components/sections/WorkshopModulesSection.tsx` |
| Plataforma / casa | `src/components/sections/PlataformaMundoPodiumSection.tsx` |
| Garantia + slot vídeo | `src/components/sections/WorkshopGuaranteeSection.tsx` |
| Banner depoimentos | `src/components/sections/WorkshopTestimonialBanner.tsx` |
| Grid depoimentos | `src/components/sections/TestimonialsScrollSection.tsx` |
| Card de prova | `src/components/ui/WorkshopProofCard.tsx` |
| Footer | `src/components/sections/Footer.tsx` |
| Env template | `env.template` |
| Depoimentos prontos | `public/depoimentos-2026-ready/` |
| Inventário depoimentos | `RELATORIO_DEPOIMENTOS_CONTEUDO.md` |

---

*Fim do handoff. Atualize este arquivo quando vagas, vídeos, curadoria ou o pacote local forem commitados.*
