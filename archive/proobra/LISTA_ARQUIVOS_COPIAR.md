# Lista Completa de Arquivos para Copiar

Este arquivo lista **todos os arquivos** que precisam ser copiados do projeto atual para o novo repositório.

## 📁 Estrutura de Arquivos

### Raiz do Projeto

```
.gitignore
package.json
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
src/app/layout.tsx
src/app/page.tsx
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

### Diretório src/components/sections/ (21 arquivos)

```
src/components/sections/WorkshopPageContent.tsx
src/components/sections/HeroSectionWorkshop.tsx
src/components/sections/WorkshopTestimonialBanner.tsx
src/components/sections/WorkshopModulesSection.tsx
src/components/sections/LiveCallsSection.tsx
src/components/sections/EventDetailsSection.tsx
src/components/sections/WhoIsItForWorkshopSection.tsx
src/components/sections/ColdCallQuizSection.tsx
src/components/sections/WhyYouStuckSection.tsx
src/components/sections/TestimonialsVideoSection.tsx
src/components/sections/WhatYouWillLearnSection.tsx
src/components/sections/AboutRomuloWorkshopSection.tsx
src/components/sections/WhyDifferentWorkshopSection.tsx
src/components/sections/NicheApplicationSection.tsx
src/components/sections/AfterWorkshopSection.tsx
src/components/sections/TestimonialsScrollSection.tsx
src/components/sections/WorkshopFAQSection.tsx
src/components/sections/FinalCTAWorkshopSection.tsx
src/components/sections/Footer.tsx
src/components/sections/PainPointsMarquee.tsx
src/components/sections/BenefitsMarquee.tsx
src/components/sections/LogoSeparator.tsx
```

### Diretório src/components/ui/ (17 arquivos)

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
src/data/faq.ts
src/data/benefits.ts
src/data/comparison.ts
src/data/program.ts
```

### Diretório src/lib/

```
src/lib/constants.ts
src/lib/metaPixel.ts
```

### Diretório public/

**Nota**: Copiar todas as imagens referenciadas nos componentes. Lista parcial:

```
public/icon-escuderia.png
public/workshop-metodo.png
public/[todas as outras imagens PNG, JPG usadas]
```

---

## 📊 Resumo por Categoria

- **Configurações**: 7 arquivos
- **Estilos**: 1 arquivo (globals.css)
- **Layout/Páginas**: 3 arquivos
- **Componentes Globais**: 6 arquivos
- **Componentes de Seção**: 21 arquivos
- **Componentes UI**: 17 arquivos
- **Contextos**: 1 arquivo
- **Dados**: 4 arquivos
- **Bibliotecas**: 2 arquivos
- **Assets**: Múltiplos (imagens)

**Total aproximado**: ~62 arquivos TypeScript/TSX + assets

---

## 🔍 Como Usar Esta Lista

1. Use esta lista como checklist durante a cópia
2. Marque cada arquivo conforme copiar
3. Verifique se todos os arquivos foram copiados antes de testar
4. Use o `GUIA_MIGRACAO_COMPLETA.md` para instruções detalhadas

---

## ⚠️ Arquivos que NÃO Precisam Ser Copiados

- `node_modules/` - Será recriado com `npm install`
- `.next/` - Build temporário
- `.env.local` - Criar novo no projeto destino
- Arquivos de documentação específicos do projeto atual
- Scripts de deploy específicos (`deploy-vercel.ps1`, etc.)
- Arquivos SQL de banco de dados (`supabase-workshop-schema.sql`)
- Rotas de API (`src/app/api/`) - Apenas se necessário para nova temática

---

## ✅ Checklist Rápido

Use este checklist durante a cópia:

### Configurações
- [ ] .gitignore
- [ ] package.json
- [ ] tsconfig.json
- [ ] next.config.js
- [ ] tailwind.config.js
- [ ] postcss.config.js

### App Core
- [ ] src/app/globals.css
- [ ] src/app/layout.tsx
- [ ] src/app/page.tsx
- [ ] src/app/not-found.tsx

### Componentes Globais
- [ ] src/components/ClientComponents.tsx
- [ ] src/components/ErrorBoundary.tsx
- [ ] src/components/CookieConsent.tsx
- [ ] src/components/MetaPixel.tsx
- [ ] src/components/Clarity.tsx
- [ ] src/components/FloatingWhatsAppButton.tsx

### Componentes de Seção (21)
- [ ] WorkshopPageContent.tsx
- [ ] HeroSectionWorkshop.tsx
- [ ] WorkshopTestimonialBanner.tsx
- [ ] WorkshopModulesSection.tsx
- [ ] LiveCallsSection.tsx
- [ ] EventDetailsSection.tsx
- [ ] WhoIsItForWorkshopSection.tsx
- [ ] ColdCallQuizSection.tsx
- [ ] WhyYouStuckSection.tsx
- [ ] TestimonialsVideoSection.tsx
- [ ] WhatYouWillLearnSection.tsx
- [ ] AboutRomuloWorkshopSection.tsx
- [ ] WhyDifferentWorkshopSection.tsx
- [ ] NicheApplicationSection.tsx
- [ ] AfterWorkshopSection.tsx
- [ ] TestimonialsScrollSection.tsx
- [ ] WorkshopFAQSection.tsx
- [ ] FinalCTAWorkshopSection.tsx
- [ ] Footer.tsx
- [ ] PainPointsMarquee.tsx
- [ ] BenefitsMarquee.tsx
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

### Dados
- [ ] src/data/faq.ts
- [ ] src/data/benefits.ts
- [ ] src/data/comparison.ts
- [ ] src/data/program.ts

### Bibliotecas
- [ ] src/lib/constants.ts
- [ ] src/lib/metaPixel.ts

### Assets
- [ ] Todas as imagens do public/

---

**Total de arquivos TypeScript/TSX**: ~62 arquivos
