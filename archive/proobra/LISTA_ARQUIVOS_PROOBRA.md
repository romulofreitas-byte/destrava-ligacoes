# Lista Completa de Arquivos para Copiar - Workshop PROOBRA

Este arquivo lista **todos os arquivos** que precisam ser copiados do projeto atual para o novo repositório do Workshop PROOBRA.

## 📁 Estrutura de Arquivos

### Raiz do Projeto

```
.gitignore
package.json (ajustar name para "workshop-proobra")
package-lock.json
tsconfig.json
next.config.js
tailwind.config.js
postcss.config.js
next-env.d.ts
```

### Diretório src/app/

```
src/app/globals.css
src/app/layout.tsx (ajustar metadata)
src/app/page.tsx (ajustar metadata)
src/app/not-found.tsx
```

### Diretório src/components/

```
src/components/ClientComponents.tsx
src/components/ErrorBoundary.tsx
src/components/CookieConsent.tsx
src/components/MetaPixel.tsx
src/components/Clarity.tsx
src/components/FloatingWhatsAppButton.tsx
```

### Diretório src/components/sections/ (Componentes Adaptados)

**Componentes Principais:**
```
src/components/sections/WorkshopPageContent.tsx (ou ProobraPageContent.tsx)
src/components/sections/HeroSectionWorkshop.tsx (adaptar conteúdo PROOBRA)
src/components/sections/TestimonialsVideoSection.tsx (vídeo principal PROOBRA)
src/components/sections/WhyYouStuckSection.tsx (adaptar: "O problema não é a obra")
src/components/sections/EventDetailsSection.tsx (2 horas, Google Meet)
src/components/sections/WhatYouWillLearnSection.tsx (3 chaves do método)
src/components/sections/WhoIsItForWorkshopSection.tsx (engenheiros, arquitetos, etc.)
src/components/sections/AboutGabrielProobraSection.tsx (renomear de AboutRomuloWorkshopSection.tsx)
src/components/sections/InvestmentSection.tsx (ou seção de valor - R$ 49,99)
src/components/sections/FinalCTAWorkshopSection.tsx (adaptar CTA PROOBRA)
src/components/sections/WorkshopFAQSection.tsx (adaptar FAQ PROOBRA)
src/components/sections/Footer.tsx
```

**Componentes Auxiliares:**
```
src/components/sections/PainPointsMarquee.tsx (adaptar: problemas de obras)
src/components/sections/BenefitsMarquee.tsx (adaptar: benefícios PROOBRA)
src/components/sections/LogoSeparator.tsx
```

**Componentes Opcionais (remover ou adaptar):**
```
src/components/sections/WorkshopTestimonialBanner.tsx (manter se houver depoimentos)
src/components/sections/TestimonialsScrollSection.tsx (manter se houver depoimentos)
src/components/sections/WorkshopModulesSection.tsx (adaptar para 3 chaves ou remover)
src/components/sections/LiveCallsSection.tsx (NÃO APLICÁVEL - remover)
src/components/sections/ColdCallQuizSection.tsx (NÃO APLICÁVEL - remover)
src/components/sections/WhyDifferentWorkshopSection.tsx (adaptar ou remover)
src/components/sections/NicheApplicationSection.tsx (adaptar para tipos de obras ou remover)
src/components/sections/AfterWorkshopSection.tsx (adaptar para resultados ou remover)
```

### Diretório src/components/ui/ (17 arquivos - MANTER TODOS)

```
src/components/ui/Button.tsx
src/components/ui/Card.tsx
src/components/ui/Section.tsx
src/components/ui/Badge.tsx
src/components/ui/FAQ.tsx
src/components/ui/ProtectedImage.tsx
src/components/ui/AnimatedButton.tsx
src/components/ui/AnimatedCard.tsx
src/components/ui/FlipCard.tsx
src/components/ui/StatCounter.tsx
src/components/ui/SubtleCTA.tsx
src/components/ui/SubtleHelpModal.tsx
src/components/ui/VideoModal.tsx
src/components/ui/TestimonialCard.tsx
src/components/ui/TestimonialCarousel.tsx
src/components/ui/TimelineModal.tsx
src/components/ui/MethodModal.tsx
```

### Diretório src/contexts/

```
src/contexts/ModalContext.tsx
```

### Diretório src/data/

```
src/data/faq.ts (adaptar: FAQ PROOBRA)
src/data/benefits.ts (adaptar: benefícios gestão de obras)
src/data/comparison.ts (adaptar: comparações PROOBRA)
src/data/program.ts (adaptar: 3 chaves do método)
```

### Diretório src/lib/

```
src/lib/constants.ts (adaptar: WORKSHOP_INFO PROOBRA)
src/lib/metaPixel.ts (manter se usar tracking)
```

### Diretório public/

**Imagens Principais:**
```
public/icon-proobra.png (substituir icon-escuderia.png)
public/workshop-proobra.png (substituir workshop-metodo.png - 1200x630)
public/gabriel-gelape.jpg (foto do mentor)
```

**Outras Imagens:**
```
public/[imagens relacionadas a construção civil/obras]
public/[logos e ícones PROOBRA]
```

---

## 📊 Resumo por Categoria

- **Configurações**: 7 arquivos
- **Estilos**: 1 arquivo (globals.css)
- **Layout/Páginas**: 3 arquivos
- **Componentes Globais**: 6 arquivos
- **Componentes de Seção**: ~15-18 arquivos (dependendo de adaptações)
- **Componentes UI**: 17 arquivos
- **Contextos**: 1 arquivo
- **Dados**: 4 arquivos
- **Bibliotecas**: 2 arquivos
- **Assets**: Múltiplos (imagens)

**Total aproximado**: ~60 arquivos TypeScript/TSX + assets

---

## 🔍 Componentes a Renomear/Adaptar

### Renomeações Necessárias:
- `AboutRomuloWorkshopSection.tsx` → `AboutGabrielProobraSection.tsx`
- `WorkshopPageContent.tsx` → `ProobraPageContent.tsx` (opcional)

### Componentes a Remover (não aplicáveis ao PROOBRA):
- `LiveCallsSection.tsx` - Não há ligações ao vivo
- `ColdCallQuizSection.tsx` - Não há quiz de cold call

### Componentes a Adaptar Significativamente:
- `HeroSectionWorkshop.tsx` - Conteúdo PROOBRA
- `TestimonialsVideoSection.tsx` - Vídeo principal do método
- `WhyYouStuckSection.tsx` - Problema da falta de método
- `WhatYouWillLearnSection.tsx` - 3 chaves do método
- `WhoIsItForWorkshopSection.tsx` - Público-alvo (engenheiros, arquitetos)
- `WorkshopFAQSection.tsx` - FAQ específico PROOBRA
- `FinalCTAWorkshopSection.tsx` - CTA com valor R$ 49,99
- `PainPointsMarquee.tsx` - Problemas de gestão de obras
- `BenefitsMarquee.tsx` - Benefícios do método PROOBRA

---

## ✅ Checklist Rápido - PROOBRA

### Configurações
- [ ] .gitignore
- [ ] package.json (name: "workshop-proobra")
- [ ] tsconfig.json
- [ ] next.config.js
- [ ] tailwind.config.js
- [ ] postcss.config.js

### App Core
- [ ] src/app/globals.css
- [ ] src/app/layout.tsx (metadata PROOBRA)
- [ ] src/app/page.tsx (metadata PROOBRA)
- [ ] src/app/not-found.tsx

### Componentes Globais
- [ ] src/components/ClientComponents.tsx
- [ ] src/components/ErrorBoundary.tsx
- [ ] src/components/CookieConsent.tsx
- [ ] src/components/MetaPixel.tsx
- [ ] src/components/Clarity.tsx
- [ ] src/components/FloatingWhatsAppButton.tsx

### Componentes de Seção (Adaptados)
- [ ] WorkshopPageContent.tsx (ou ProobraPageContent.tsx)
- [ ] HeroSectionWorkshop.tsx (conteúdo PROOBRA)
- [ ] TestimonialsVideoSection.tsx (vídeo método PROOBRA)
- [ ] WhyYouStuckSection.tsx (problema falta de método)
- [ ] EventDetailsSection.tsx (2h, Google Meet)
- [ ] WhatYouWillLearnSection.tsx (3 chaves)
- [ ] WhoIsItForWorkshopSection.tsx (engenheiros, arquitetos)
- [ ] AboutGabrielProobraSection.tsx (renomear)
- [ ] InvestmentSection.tsx (R$ 49,99)
- [ ] FinalCTAWorkshopSection.tsx (CTA PROOBRA)
- [ ] WorkshopFAQSection.tsx (FAQ PROOBRA)
- [ ] Footer.tsx
- [ ] PainPointsMarquee.tsx (problemas obras)
- [ ] BenefitsMarquee.tsx (benefícios PROOBRA)
- [ ] LogoSeparator.tsx

### Componentes UI (17)
- [ ] Button.tsx
- [ ] Card.tsx
- [ ] Section.tsx
- [ ] Badge.tsx
- [ ] FAQ.tsx
- [ ] ProtectedImage.tsx
- [ ] AnimatedButton.tsx
- [ ] AnimatedCard.tsx
- [ ] FlipCard.tsx
- [ ] StatCounter.tsx
- [ ] SubtleCTA.tsx
- [ ] SubtleHelpModal.tsx
- [ ] VideoModal.tsx
- [ ] TestimonialCard.tsx
- [ ] TestimonialCarousel.tsx
- [ ] TimelineModal.tsx
- [ ] MethodModal.tsx

### Contextos
- [ ] src/contexts/ModalContext.tsx

### Dados (Adaptados)
- [ ] src/data/faq.ts (FAQ PROOBRA)
- [ ] src/data/benefits.ts (benefícios obras)
- [ ] src/data/comparison.ts (comparações PROOBRA)
- [ ] src/data/program.ts (3 chaves)

### Bibliotecas
- [ ] src/lib/constants.ts (WORKSHOP_INFO PROOBRA)
- [ ] src/lib/metaPixel.ts

### Assets
- [ ] icon-proobra.png
- [ ] workshop-proobra.png (1200x630)
- [ ] gabriel-gelape.jpg
- [ ] Imagens de obras/construção civil

---

## ⚠️ Arquivos que NÃO Precisam Ser Copiados

- `node_modules/` - Será recriado com `npm install`
- `.next/` - Build temporário
- `.env.local` - Criar novo no projeto destino
- Arquivos de documentação específicos do projeto atual
- Scripts de deploy específicos
- Rotas de API (`src/app/api/`) - Apenas se necessário
- Componentes não aplicáveis (LiveCallsSection, ColdCallQuizSection)

---

**Total de arquivos TypeScript/TSX**: ~60 arquivos

**Consulte `GUIA_MIGRACAO_PROOBRA.md` para instruções detalhadas.**
