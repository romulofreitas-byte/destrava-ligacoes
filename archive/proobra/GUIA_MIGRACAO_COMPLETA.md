# Guia Completo de Migração - Landing Page

Este documento lista **todos os arquivos** necessários para copiar a landing page completa para outro repositório com nova temática.

## 📋 Índice

1. [Configurações Base](#1-configurações-base)
2. [Estilos Globais](#2-estilos-globais)
3. [Layout e Páginas](#3-layout-e-páginas)
4. [Componentes de Seção](#4-componentes-de-seção)
5. [Componentes UI](#5-componentes-ui)
6. [Componentes Globais](#6-componentes-globais)
7. [Contextos](#7-contextos)
8. [Dados e Constantes](#8-dados-e-constantes)
9. [Bibliotecas](#9-bibliotecas)
10. [Assets](#10-assets)

---

## 1. Configurações Base

### Arquivos Necessários:

#### `package.json`
```json
{
  "name": "destrava-ligacoes",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "next lint"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.84.0",
    "@vercel/analytics": "^1.0.0",
    "framer-motion": "^10.18.0",
    "lucide-react": "^0.294.0",
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "resend": "^6.5.2",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.0.0"
  }
}
```

#### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### `next.config.js`
- Localização: `next.config.js`
- Contém: Configuração de imagens, headers de segurança, webpack

#### `tailwind.config.js`
- Localização: `tailwind.config.js`
- Contém: Configuração Tailwind com fontes customizadas

#### `postcss.config.js`
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

#### `.gitignore`
```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem
*.p12
*.pfx
certificado.*

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

---

## 2. Estilos Globais

### `src/app/globals.css`
- **Localização**: `src/app/globals.css`
- **Conteúdo**: Todos os estilos globais, animações CSS, classes utilitárias, gradientes e efeitos visuais
- **Inclui**:
  - Configuração de fontes (Ubuntu e Montserrat)
  - Animações (shimmer, marquee, fade-in, float, etc.)
  - Classes utilitárias (btn-primary, btn-secondary, card, etc.)
  - Estilos de proteção de imagens
  - Efeitos de botão shine
  - Gradientes e backgrounds

---

## 3. Layout e Páginas

### `src/app/layout.tsx`
- **Localização**: `src/app/layout.tsx`
- **Função**: Layout raiz com fontes, metadata SEO, Analytics
- **Importa**: Ubuntu e Montserrat do Google Fonts
- **Inclui**: ClientComponents, Analytics do Vercel

### `src/app/page.tsx`
- **Localização**: `src/app/page.tsx`
- **Função**: Página principal que renderiza WorkshopPageContent
- **Inclui**: Metadata SEO completa (title, description, Open Graph, Twitter)

### `src/app/not-found.tsx`
- **Localização**: `src/app/not-found.tsx`
- **Função**: Página 404 personalizada

---

## 4. Componentes de Seção

### Componente Principal

#### `src/components/sections/WorkshopPageContent.tsx`
- **Função**: Componente que orquestra todas as seções da página
- **Estrutura**: Renderiza todas as seções em ordem

### Seções Principais (18 componentes)

1. **`src/components/sections/HeroSectionWorkshop.tsx`**
   - Hero principal com CTA
   - Progress bar animada
   - PainPointsMarquee integrado

2. **`src/components/sections/WorkshopTestimonialBanner.tsx`**
   - Banner de depoimentos no topo

3. **`src/components/sections/WorkshopModulesSection.tsx`**
   - Seção de módulos do workshop

4. **`src/components/sections/LiveCallsSection.tsx`**
   - Seção de ligações ao vivo

5. **`src/components/sections/EventDetailsSection.tsx`**
   - Detalhes do evento (data, horário, formato)

6. **`src/components/sections/WhoIsItForWorkshopSection.tsx`**
   - Público-alvo do workshop

7. **`src/components/sections/ColdCallQuizSection.tsx`**
   - Quiz interativo sobre cold call

8. **`src/components/sections/WhyYouStuckSection.tsx`**
   - Por que você trava nas ligações

9. **`src/components/sections/TestimonialsVideoSection.tsx`**
   - Depoimentos em vídeo

10. **`src/components/sections/WhatYouWillLearnSection.tsx`**
    - O que você vai aprender

11. **`src/components/sections/AboutRomuloWorkshopSection.tsx`**
    - Sobre o mentor (Rômulo)

12. **`src/components/sections/WhyDifferentWorkshopSection.tsx`**
    - Por que este workshop é diferente

13. **`src/components/sections/NicheApplicationSection.tsx`**
    - Aplicação em diferentes nichos

14. **`src/components/sections/AfterWorkshopSection.tsx`**
    - Resultados após o workshop

15. **`src/components/sections/TestimonialsScrollSection.tsx`**
    - Depoimentos em scroll horizontal

16. **`src/components/sections/WorkshopFAQSection.tsx`**
    - FAQ do workshop

17. **`src/components/sections/FinalCTAWorkshopSection.tsx`**
    - CTA final com urgência

18. **`src/components/sections/Footer.tsx`**
    - Rodapé da página

### Componentes Auxiliares de Seção

- **`src/components/sections/PainPointsMarquee.tsx`**
  - Marquee animado de pontos de dor

- **`src/components/sections/BenefitsMarquee.tsx`**
  - Marquee animado de benefícios

- **`src/components/sections/LogoSeparator.tsx`**
  - Separador visual com logo

---

## 5. Componentes UI

Todos os componentes em `src/components/ui/` (17 componentes):

1. **`src/components/ui/Button.tsx`**
   - Botão reutilizável com variantes

2. **`src/components/ui/Card.tsx`**
   - Card reutilizável

3. **`src/components/ui/Section.tsx`**
   - Wrapper de seção com padding consistente

4. **`src/components/ui/Badge.tsx`**
   - Badge/etiqueta reutilizável

5. **`src/components/ui/FAQ.tsx`**
   - Componente de FAQ com accordion

6. **`src/components/ui/ProtectedImage.tsx`**
   - Imagem protegida (anti-drag, anti-select)

7. **`src/components/ui/AnimatedButton.tsx`**
   - Botão com animações

8. **`src/components/ui/AnimatedCard.tsx`**
   - Card com animações de entrada

9. **`src/components/ui/FlipCard.tsx`**
   - Card com efeito flip 3D

10. **`src/components/ui/StatCounter.tsx`**
    - Contador animado de números

11. **`src/components/ui/SubtleCTA.tsx`**
    - CTA sutil e discreto

12. **`src/components/ui/SubtleHelpModal.tsx`**
    - Modal de ajuda sutil

13. **`src/components/ui/VideoModal.tsx`**
    - Modal para exibir vídeos

14. **`src/components/ui/TestimonialCard.tsx`**
    - Card de depoimento

15. **`src/components/ui/TestimonialCarousel.tsx`**
    - Carrossel de depoimentos

16. **`src/components/ui/TimelineModal.tsx`**
    - Modal de timeline

17. **`src/components/ui/MethodModal.tsx`**
    - Modal de método

---

## 6. Componentes Globais

### `src/components/ClientComponents.tsx`
- **Função**: Wrapper para componentes client-side
- **Inclui**: ErrorBoundary, MetaPixel, Clarity, CookieConsent

### `src/components/ErrorBoundary.tsx`
- **Função**: Boundary de erro React

### `src/components/CookieConsent.tsx`
- **Função**: Componente de consentimento de cookies

### `src/components/MetaPixel.tsx`
- **Função**: Integração Meta Pixel (Facebook)
- **Nota**: Requer variável de ambiente `NEXT_PUBLIC_META_PIXEL_ID`

### `src/components/Clarity.tsx`
- **Função**: Integração Microsoft Clarity
- **Nota**: Requer variável de ambiente `NEXT_PUBLIC_CLARITY_ID`

### `src/components/FloatingWhatsAppButton.tsx`
- **Função**: Botão flutuante do WhatsApp
- **Nota**: Ajustar número do WhatsApp conforme necessário

---

## 7. Contextos

### `src/contexts/ModalContext.tsx`
- **Função**: Contexto para gerenciar modais e estado de CTAs
- **Inclui**: Provider e hook useModalContext

---

## 8. Dados e Constantes

### `src/lib/constants.ts`
- **Conteúdo**: Constantes do Google Meet e informações do workshop
- **Estrutura**:
  - `getGoogleMeetInfo()` - Função que retorna informações do Google Meet
  - `WORKSHOP_INFO` - Objeto com informações do workshop (data, horário, formato)

### `src/data/faq.ts`
- **Estrutura**: Array de objetos `FAQItem` com perguntas e respostas
- **Interface**:
  ```typescript
  interface FAQItem {
    question: string;
    answer: string;
  }
  ```

### `src/data/benefits.ts`
- **Estrutura**: Arrays de bônus, benefícios e resultados esperados
- **Interfaces**:
  - `Bonus` - Bônus do programa
  - `Benefit` - Benefícios principais
  - `Result` - Resultados esperados

### `src/data/comparison.ts`
- **Estrutura**: Dados de comparação e passos do método
- **Interfaces**:
  - `Comparison` - Comparação antes/depois
  - `MethodStep` - Passos do método

### `src/data/program.ts`
- **Estrutura**: Dados do programa completo
- **Interface**: `ProgramWeek` - Estrutura de semanas do programa

---

## 9. Bibliotecas

### `src/lib/metaPixel.ts`
- **Função**: Funções de tracking Meta Pixel
- **Funções principais**:
  - `trackCTAClick()` - Rastrear cliques em CTAs
  - `trackViewContent()` - Rastrear visualizações de conteúdo

### Outros arquivos em `src/lib/` (opcionais)
- Podem ser específicos do projeto atual (pagamento, email, etc.)
- Copiar apenas se necessário para nova temática

---

## 10. Assets

### Diretório `public/`

#### Imagens Principais:
- `icon-escuderia.png` - Ícone do site
- `workshop-metodo.png` - Imagem Open Graph (1200x630)

#### Outras Imagens:
- Todas as imagens PNG, JPG usadas nos componentes
- Imagens de depoimentos
- Imagens de seções específicas
- Logos e ícones

**Nota**: Listar todas as imagens referenciadas nos componentes e copiá-las para o novo projeto.

---

## 📝 Checklist de Migração

### Fase 1: Setup Inicial
- [ ] Criar novo projeto Next.js com TypeScript
- [ ] Copiar `package.json` e executar `npm install`
- [ ] Copiar `tsconfig.json`
- [ ] Copiar `next.config.js`
- [ ] Copiar `tailwind.config.js`
- [ ] Copiar `postcss.config.js`
- [ ] Copiar `.gitignore`
- [ ] Copiar `src/app/globals.css`

### Fase 2: Estrutura Base
- [ ] Copiar `src/app/layout.tsx` (ajustar metadata)
- [ ] Copiar `src/app/page.tsx` (ajustar metadata)
- [ ] Copiar `src/app/not-found.tsx`
- [ ] Copiar `src/components/ClientComponents.tsx`
- [ ] Copiar `src/components/ErrorBoundary.tsx`
- [ ] Copiar `src/components/CookieConsent.tsx`
- [ ] Copiar `src/components/MetaPixel.tsx` (ou remover se não usar)
- [ ] Copiar `src/components/Clarity.tsx` (ou remover se não usar)
- [ ] Copiar `src/components/FloatingWhatsAppButton.tsx`

### Fase 3: Componentes Core
- [ ] Copiar `src/components/sections/WorkshopPageContent.tsx`
- [ ] Copiar todos os 18 componentes de seção
- [ ] Copiar componentes auxiliares (PainPointsMarquee, BenefitsMarquee, LogoSeparator)
- [ ] Copiar todos os 17 componentes UI

### Fase 4: Contextos
- [ ] Copiar `src/contexts/ModalContext.tsx`

### Fase 5: Dados e Constantes
- [ ] Copiar `src/lib/constants.ts` (ajustar dados)
- [ ] Copiar `src/data/faq.ts` (ajustar perguntas)
- [ ] Copiar `src/data/benefits.ts` (ajustar benefícios)
- [ ] Copiar `src/data/comparison.ts` (ajustar comparações)
- [ ] Copiar `src/data/program.ts` (ajustar programa)
- [ ] Copiar `src/lib/metaPixel.ts` (se usar tracking)

### Fase 6: Assets
- [ ] Copiar todas as imagens do `public/`
- [ ] Ajustar referências de imagens nos componentes
- [ ] Substituir imagens específicas por novas da temática

### Fase 7: Customização
- [ ] Substituir todos os textos específicos do workshop
- [ ] Ajustar cores no Tailwind se necessário
- [ ] Atualizar metadata SEO em `layout.tsx` e `page.tsx`
- [ ] Atualizar links e CTAs
- [ ] Configurar variáveis de ambiente (`.env.local`)
- [ ] Testar página localmente (`npm run dev`)
- [ ] Verificar todos os componentes funcionando
- [ ] Fazer build de produção (`npm run build`)

---

## 🔧 Variáveis de Ambiente Necessárias

Criar arquivo `.env.local`:

```env
# Base URL (opcional)
NEXT_PUBLIC_BASE_URL=https://seu-dominio.com

# Meta Pixel (opcional)
NEXT_PUBLIC_META_PIXEL_ID=seu-pixel-id

# Microsoft Clarity (opcional)
NEXT_PUBLIC_CLARITY_ID=seu-clarity-id

# Google Meet (se usar)
GOOGLE_MEET_LINK=https://meet.google.com/xxx
GOOGLE_MEET_PHONE=+55 XX XXXX-XXXX
GOOGLE_MEET_PIN=XXX XXX XXX#
GOOGLE_MEET_PHONE_LINK=https://tel.meet/xxx
```

---

## 📦 Dependências Principais

```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "framer-motion": "^10.18.0",
  "lucide-react": "^0.294.0",
  "tailwindcss": "^3.3.0",
  "typescript": "^5.0.0"
}
```

---

## ⚠️ Observações Importantes

1. **Integrações Externas**: 
   - Meta Pixel e Microsoft Clarity são opcionais
   - Remover ou configurar conforme necessário

2. **Fontes**: 
   - Ubuntu e Montserrat são carregadas via Next.js Google Fonts
   - Não requer configuração adicional

3. **Imagens**: 
   - Todas as imagens devem estar em `/public`
   - Verificar todas as referências nos componentes

4. **Tracking**: 
   - Código tem tracking de eventos (Meta Pixel)
   - Ajustar ou remover conforme necessário

5. **API Routes**: 
   - O projeto tem rotas de API em `src/app/api/`
   - Copiar apenas se necessário para nova temática

6. **Supabase/Resend**: 
   - Dependências estão no package.json mas podem não ser usadas
   - Remover se não usar integrações de banco/email

---

## 🚀 Comandos Úteis

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start

# Lint
npm run lint
```

---

## 📚 Estrutura Final do Projeto

```
projeto/
├── .gitignore
├── .env.local (criar)
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── public/
│   ├── icon-escuderia.png
│   ├── workshop-metodo.png
│   └── [outras imagens]
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── not-found.tsx
    ├── components/
    │   ├── ClientComponents.tsx
    │   ├── ErrorBoundary.tsx
    │   ├── CookieConsent.tsx
    │   ├── MetaPixel.tsx
    │   ├── Clarity.tsx
    │   ├── FloatingWhatsAppButton.tsx
    │   ├── sections/
    │   │   ├── WorkshopPageContent.tsx
    │   │   ├── HeroSectionWorkshop.tsx
    │   │   ├── [17 outros componentes de seção]
    │   │   └── [componentes auxiliares]
    │   └── ui/
    │       ├── [17 componentes UI]
    ├── contexts/
    │   └── ModalContext.tsx
    ├── data/
    │   ├── faq.ts
    │   ├── benefits.ts
    │   ├── comparison.ts
    │   └── program.ts
    └── lib/
        ├── constants.ts
        └── metaPixel.ts
```

---

## ✅ Próximos Passos Após Cópia

1. Executar `npm install` no novo projeto
2. Criar `.env.local` com variáveis necessárias
3. Ajustar todos os textos para nova temática
4. Substituir imagens específicas
5. Testar página localmente
6. Ajustar cores e estilos se necessário
7. Configurar deploy (Vercel, Netlify, etc.)

---

**Documento criado para facilitar a migração completa da landing page.**
