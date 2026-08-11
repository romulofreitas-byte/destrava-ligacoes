# Guia Completo de Migração - Workshop PROOBRA

Este documento lista **todos os arquivos** necessários para copiar a landing page completa do **Workshop PROOBRA** para outro repositório.

## 📋 Sobre o Workshop PROOBRA

**Título**: Workshop PROOBRA  
**Subtítulo**: O método que transforma execução de obra em gestão lucrativa  
**Duração**: 2 horas  
**Formato**: Google Meet ao vivo  
**Valor**: R$ 49,99  
**Mentor**: Gabriel Gelape (Engenheiro Civil)

---

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
  "name": "workshop-proobra",
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
- **Metadata sugerida**:
  ```typescript
  title: 'Workshop PROOBRA | Gestão Lucrativa de Obras',
  description: 'Aprenda o método que transforma execução de obra em gestão lucrativa. Controle custos, tome decisões com segurança e proteja seu lucro antes, durante e depois da obra.',
  keywords: 'gestão de obras, controle de custos, método PROOBRA, engenharia civil, gestão lucrativa, orçamento de obra'
  ```

### `src/app/page.tsx`
- **Localização**: `src/app/page.tsx`
- **Função**: Página principal que renderiza WorkshopPageContent (ou ProobraPageContent)
- **Inclui**: Metadata SEO completa (title, description, Open Graph, Twitter)
- **Metadata sugerida**:
  ```typescript
  title: 'Workshop PROOBRA | Gestão Lucrativa de Obras em 2 Horas',
  description: 'Workshop ao vivo de 2 horas onde você aprende a controlar custos, tomar decisões com segurança e proteger seu lucro na gestão de obras. Método PROOBRA desenvolvido por Gabriel Gelape.',
  ```

### `src/app/not-found.tsx`
- **Localização**: `src/app/not-found.tsx`
- **Função**: Página 404 personalizada

---

## 4. Componentes de Seção

### Componente Principal

#### `src/components/sections/WorkshopPageContent.tsx` (ou `ProobraPageContent.tsx`)
- **Função**: Componente que orquestra todas as seções da página
- **Estrutura**: Renderiza todas as seções em ordem
- **Nota**: Pode manter nome genérico ou renomear para `ProobraPageContent.tsx`

### Seções Principais - Conteúdo PROOBRA

1. **`src/components/sections/HeroSectionWorkshop.tsx`**
   - **Hero principal**: "A sua obra não deve ser um caos. Ela deve ser previsível, controlada e lucrativa."
   - **Subheadline**: "Neste workshop ao vivo, você vai entender como engenheiros e profissionais da construção estão saindo do improviso e assumindo o controle real das suas obras."
   - **CTA**: Link para vídeo principal ou inscrição
   - Progress bar animada (opcional)
   - PainPointsMarquee integrado (adaptado para problemas de obras)

2. **`src/components/sections/TestimonialsVideoSection.tsx`** (ou seção de vídeo principal)
   - **Título**: "Aula de Apresentação do Método PROOBRA"
   - **Conteúdo**: Vídeo principal do workshop
   - **Descrição**: "Nesta aula, você vai descobrir: Por que a maioria das obras perde dinheiro sem perceber, onde o lucro se perde antes mesmo da obra começar, como estruturar controle, orçamento e gestão sem burocracia, o que muda quando você deixa de 'achar' e passa a saber"

3. **`src/components/sections/WhyYouStuckSection.tsx`** (adaptar para "O problema não é a obra")
   - **Título**: "O problema não é a obra. É a falta de método."
   - **Conteúdo**: 
     - Orçamentos feitos no achismo
     - Custos que aparecem tarde demais
     - Falta de clareza para explicar números ao cliente
     - Lucro corroído por pequenos erros acumulados

4. **`src/components/sections/EventDetailsSection.tsx`**
   - **Título**: "Workshop PROOBRA - As 3 chaves para assumir o controle da sua obra"
   - **Formato**: Encontro ao vivo via Google Meet
   - **Duração**: 2 horas
   - **Gravação**: Disponível por tempo limitado

5. **`src/components/sections/WhatYouWillLearnSection.tsx`**
   - **Título**: "O que você vai aprender no Workshop PROOBRA"
   - **Conteúdo**: 3 Chaves
     - **Chave 1 - Mentalidade de Gestor**: Como sair da execução cega e assumir o papel de quem controla a obra com visão estratégica
     - **Chave 2 - Controle que Evita Prejuízo**: O que precisa estar organizado antes da obra começar e como evitar perdas invisíveis que matam o lucro
     - **Chave 3 - Método que Sustenta Crescimento**: Como estruturar um processo replicável, que gera previsibilidade e confiança

6. **`src/components/sections/WhoIsItForWorkshopSection.tsx`**
   - **Título**: "Para quem é este workshop"
   - **Para quem é**:
     - Engenheiros civis
     - Arquitetos
     - Empreiteiros
     - Profissionais que gerenciam obras
     - Quem quer ganhar clareza, controle e margem
   - **Não é para**:
     - Quem busca atalhos mágicos
     - Quem não quer mudar a forma de pensar

7. **`src/components/sections/AboutRomuloWorkshopSection.tsx`** → Renomear para `AboutGabrielProobraSection.tsx`
   - **Título**: "Quem vai conduzir o Workshop"
   - **Nome**: Gabriel Gelape
   - **Descrição**: Engenheiro Civil com vivência real em campo, atuando diretamente na gestão de obras. Criador do Método PROOBRA, desenvolvido a partir de erros, acertos e validações em obras reais — com foco total em controle, previsibilidade e lucro.
   - **Diferencial**: "Aqui não tem teoria distante da realidade. Tudo foi construído no chão da obra."

8. **`src/components/sections/InvestmentSection.tsx`** (ou seção de valor)
   - **Título**: "Por que este workshop custa menos do que um erro na obra"
   - **Conteúdo**: Uma única falha de controle (material comprado errado, custo não previsto, orçamento mal feito) costuma custar muito mais do que o valor deste workshop.
   - **Valor**: R$ 49,99
   - **Inclui**: Gravação inclusa, Encontro ao vivo via Google Meet

9. **`src/components/sections/FinalCTAWorkshopSection.tsx`**
   - **Título**: "Você pode continuar executando obras… ou começar a gerenciar com método."
   - **CTA**: "Garanta sua vaga agora"
   - **Benefícios**: Receba o link do encontro por e-mail, Participe ao vivo ou assista à gravação
   - **Fechamento**: "PROOBRA não é sobre fazer mais obras. É sobre ganhar dinheiro com as que você já faz."

10. **`src/components/sections/WorkshopFAQSection.tsx`**
    - **Perguntas adaptadas**:
      - "O workshop é ao vivo?" → Sim. O encontro acontece ao vivo via Google Meet.
      - "E se eu não puder assistir no horário?" → A gravação será disponibilizada por tempo limitado.
      - "Preciso ter construtora para participar?" → Não. O conteúdo é aplicável para qualquer profissional que gerencia obras.
      - "Funciona para obras pequenas?" → Funciona principalmente nelas. É onde a falta de controle mais gera prejuízo.

11. **`src/components/sections/Footer.tsx`**
    - Rodapé da página

### Componentes que Podem Ser Removidos ou Adaptados

- `WorkshopModulesSection.tsx` - Pode ser removido ou adaptado para as 3 chaves
- `LiveCallsSection.tsx` - Não aplicável ao PROOBRA
- `ColdCallQuizSection.tsx` - Não aplicável ao PROOBRA
- `WhyDifferentWorkshopSection.tsx` - Pode ser adaptado ou removido
- `NicheApplicationSection.tsx` - Pode ser adaptado para diferentes tipos de obras
- `AfterWorkshopSection.tsx` - Pode ser adaptado para resultados esperados
- `WorkshopTestimonialBanner.tsx` - Manter se houver depoimentos
- `TestimonialsScrollSection.tsx` - Manter se houver depoimentos

### Componentes Auxiliares de Seção

- **`src/components/sections/PainPointsMarquee.tsx`**
  - Adaptar para problemas de gestão de obras:
    - Orçamentos no achismo
    - Custos que aparecem tarde
    - Falta de controle
    - Lucro corroído

- **`src/components/sections/BenefitsMarquee.tsx`**
  - Adaptar para benefícios do método:
    - Controle de custos
    - Previsibilidade
    - Lucro protegido
    - Decisões com segurança

- **`src/components/sections/LogoSeparator.tsx`**
  - Separador visual com logo PROOBRA

---

## 5. Componentes UI

Todos os componentes em `src/components/ui/` (17 componentes) - **MANTER TODOS**:

1. `src/components/ui/Button.tsx`
2. `src/components/ui/Card.tsx`
3. `src/components/ui/Section.tsx`
4. `src/components/ui/Badge.tsx`
5. `src/components/ui/FAQ.tsx`
6. `src/components/ui/ProtectedImage.tsx`
7. `src/components/ui/AnimatedButton.tsx`
8. `src/components/ui/AnimatedCard.tsx`
9. `src/components/ui/FlipCard.tsx`
10. `src/components/ui/StatCounter.tsx`
11. `src/components/ui/SubtleCTA.tsx`
12. `src/components/ui/SubtleHelpModal.tsx`
13. `src/components/ui/VideoModal.tsx`
14. `src/components/ui/TestimonialCard.tsx`
15. `src/components/ui/TestimonialCarousel.tsx`
16. `src/components/ui/TimelineModal.tsx`
17. `src/components/ui/MethodModal.tsx`

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
- **Conteúdo**: Constantes do Google Meet e informações do workshop PROOBRA
- **Estrutura sugerida**:
  ```typescript
  export const WORKSHOP_INFO = {
    title: 'WORKSHOP PROOBRA | MÉTODO DE GESTÃO LUCRATIVA DE OBRAS',
    date: '[DATA DO WORKSHOP]',
    dateObj: new Date('[DATA]'),
    time: '[HORÁRIO]',
    timezone: 'America/Sao_Paulo',
    duration: '2 horas',
    format: 'Online • Ao vivo via Google Meet',
    price: 49.99,
    mentor: 'Gabriel Gelape',
    mentorTitle: 'Engenheiro Civil'
  };
  ```

### `src/data/faq.ts`
- **Estrutura**: Array de objetos `FAQItem` com perguntas e respostas do PROOBRA
- **Perguntas sugeridas**:
  ```typescript
  export const faqItems: FAQItem[] = [
    {
      question: "O workshop é ao vivo?",
      answer: "Sim. O encontro acontece ao vivo via Google Meet."
    },
    {
      question: "E se eu não puder assistir no horário?",
      answer: "A gravação será disponibilizada por tempo limitado."
    },
    {
      question: "Preciso ter construtora para participar?",
      answer: "Não. O conteúdo é aplicável para qualquer profissional que gerencia obras."
    },
    {
      question: "Funciona para obras pequenas?",
      answer: "Funciona principalmente nelas. É onde a falta de controle mais gera prejuízo."
    }
  ];
  ```

### `src/data/benefits.ts`
- **Estrutura**: Adaptar benefícios para contexto de gestão de obras
- **Benefícios sugeridos**:
  - Controle de custos real
  - Previsibilidade na gestão
  - Proteção do lucro
  - Decisões baseadas em dados
  - Método replicável

### `src/data/comparison.ts`
- **Estrutura**: Adaptar comparações para antes/depois do método PROOBRA
- **Comparações sugeridas**:
  - Orçamento no achismo → Orçamento estruturado
  - Custos surpresa → Custos controlados
  - Lucro corroído → Lucro protegido
  - Decisões no escuro → Decisões com segurança

### `src/data/program.ts`
- **Estrutura**: Adaptar para as 3 chaves do PROOBRA
- **Conteúdo**: 3 módulos principais (Mentalidade, Controle, Método)

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
- `icon-proobra.png` - Ícone do site (substituir `icon-escuderia.png`)
- `workshop-proobra.png` - Imagem Open Graph (1200x630) (substituir `workshop-metodo.png`)

#### Outras Imagens:
- Imagens relacionadas a construção civil/obras
- Foto do Gabriel Gelape
- Imagens de obras/gestão (se aplicável)
- Logos e ícones PROOBRA

**Nota**: Substituir todas as imagens específicas do workshop anterior por imagens relacionadas ao PROOBRA e construção civil.

---

## 📝 Checklist de Migração - Workshop PROOBRA

### Fase 1: Setup Inicial
- [ ] Criar novo projeto Next.js com TypeScript
- [ ] Copiar `package.json` (ajustar nome para "workshop-proobra")
- [ ] Executar `npm install`
- [ ] Copiar `tsconfig.json`
- [ ] Copiar `next.config.js`
- [ ] Copiar `tailwind.config.js`
- [ ] Copiar `postcss.config.js`
- [ ] Copiar `.gitignore`
- [ ] Copiar `src/app/globals.css`

### Fase 2: Estrutura Base
- [ ] Copiar `src/app/layout.tsx` (ajustar metadata para PROOBRA)
- [ ] Copiar `src/app/page.tsx` (ajustar metadata para PROOBRA)
- [ ] Copiar `src/app/not-found.tsx`
- [ ] Copiar `src/components/ClientComponents.tsx`
- [ ] Copiar `src/components/ErrorBoundary.tsx`
- [ ] Copiar `src/components/CookieConsent.tsx`
- [ ] Copiar `src/components/MetaPixel.tsx` (ou remover se não usar)
- [ ] Copiar `src/components/Clarity.tsx` (ou remover se não usar)
- [ ] Copiar `src/components/FloatingWhatsAppButton.tsx`

### Fase 3: Componentes Core
- [ ] Copiar `src/components/sections/WorkshopPageContent.tsx` (ou renomear para `ProobraPageContent.tsx`)
- [ ] Copiar e adaptar `src/components/sections/HeroSectionWorkshop.tsx` (conteúdo PROOBRA)
- [ ] Adaptar `src/components/sections/TestimonialsVideoSection.tsx` (vídeo principal)
- [ ] Adaptar `src/components/sections/WhyYouStuckSection.tsx` (problema da falta de método)
- [ ] Copiar `src/components/sections/EventDetailsSection.tsx` (2 horas, Google Meet)
- [ ] Adaptar `src/components/sections/WhatYouWillLearnSection.tsx` (3 chaves)
- [ ] Adaptar `src/components/sections/WhoIsItForWorkshopSection.tsx` (engenheiros, arquitetos, etc.)
- [ ] Renomear e adaptar `AboutRomuloWorkshopSection.tsx` → `AboutGabrielProobraSection.tsx`
- [ ] Adaptar ou criar seção de investimento/valor (R$ 49,99)
- [ ] Adaptar `src/components/sections/FinalCTAWorkshopSection.tsx` (CTA PROOBRA)
- [ ] Adaptar `src/components/sections/WorkshopFAQSection.tsx` (FAQ PROOBRA)
- [ ] Copiar `src/components/sections/Footer.tsx`
- [ ] Adaptar `src/components/sections/PainPointsMarquee.tsx` (problemas de obras)
- [ ] Adaptar `src/components/sections/BenefitsMarquee.tsx` (benefícios PROOBRA)
- [ ] Copiar `src/components/sections/LogoSeparator.tsx`
- [ ] Remover ou adaptar componentes não aplicáveis (LiveCallsSection, ColdCallQuizSection, etc.)
- [ ] Copiar todos os 17 componentes UI

### Fase 4: Contextos
- [ ] Copiar `src/contexts/ModalContext.tsx`

### Fase 5: Dados e Constantes
- [ ] Copiar e adaptar `src/lib/constants.ts` (WORKSHOP_INFO do PROOBRA)
- [ ] Copiar e adaptar `src/data/faq.ts` (FAQ PROOBRA)
- [ ] Copiar e adaptar `src/data/benefits.ts` (benefícios de gestão de obras)
- [ ] Copiar e adaptar `src/data/comparison.ts` (comparações PROOBRA)
- [ ] Adaptar `src/data/program.ts` (3 chaves do método)
- [ ] Copiar `src/lib/metaPixel.ts` (se usar tracking)

### Fase 6: Assets
- [ ] Criar/substituir imagens do `public/`
- [ ] Ícone PROOBRA (`icon-proobra.png`)
- [ ] Imagem Open Graph (`workshop-proobra.png`)
- [ ] Foto do Gabriel Gelape
- [ ] Imagens relacionadas a obras/construção civil
- [ ] Ajustar referências de imagens nos componentes

### Fase 7: Customização PROOBRA
- [ ] Substituir todos os textos específicos pelo conteúdo PROOBRA
- [ ] Atualizar hero: "A sua obra não deve ser um caos..."
- [ ] Atualizar seção de vídeo: "Aula de Apresentação do Método PROOBRA"
- [ ] Atualizar seção de problema: "O problema não é a obra. É a falta de método."
- [ ] Atualizar 3 chaves do método
- [ ] Atualizar público-alvo (engenheiros, arquitetos, empreiteiros)
- [ ] Atualizar seção sobre Gabriel Gelape
- [ ] Atualizar valor: R$ 49,99
- [ ] Atualizar FAQ com perguntas do PROOBRA
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

# Google Meet (obrigatório para PROOBRA)
GOOGLE_MEET_LINK=https://meet.google.com/xxx-xxxx-xxx
GOOGLE_MEET_PHONE=+55 XX XXXX-XXXX
GOOGLE_MEET_PIN=XXX XXX XXX#
GOOGLE_MEET_PHONE_LINK=https://tel.meet/xxx-xxxx-xxx?pin=xxxxxxxxxxxx
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

## ⚠️ Observações Importantes - PROOBRA

1. **Integrações Externas**: 
   - Meta Pixel e Microsoft Clarity são opcionais
   - Google Meet é necessário (workshop ao vivo)

2. **Fontes**: 
   - Ubuntu e Montserrat são carregadas via Next.js Google Fonts
   - Não requer configuração adicional

3. **Imagens**: 
   - Todas as imagens devem estar em `/public`
   - Substituir imagens do workshop anterior por imagens relacionadas a construção civil/obras
   - Foto do Gabriel Gelape necessária

4. **Tracking**: 
   - Código tem tracking de eventos (Meta Pixel)
   - Ajustar ou remover conforme necessário

5. **Componentes Específicos**: 
   - Remover ou adaptar componentes não aplicáveis ao PROOBRA (ex: LiveCallsSection, ColdCallQuizSection)
   - Focar nas 3 chaves do método

6. **Conteúdo Principal**: 
   - Hero: "A sua obra não deve ser um caos..."
   - Vídeo: Aula de apresentação do Método PROOBRA
   - 3 Chaves: Mentalidade, Controle, Método
   - Valor: R$ 49,99
   - Mentor: Gabriel Gelape

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

## 📚 Estrutura Final do Projeto PROOBRA

```
projeto-proobra/
├── .gitignore
├── .env.local (criar)
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── public/
│   ├── icon-proobra.png
│   ├── workshop-proobra.png
│   ├── gabriel-gelape.jpg
│   └── [outras imagens de obras]
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
    │   │   ├── WorkshopPageContent.tsx (ou ProobraPageContent.tsx)
    │   │   ├── HeroSectionWorkshop.tsx
    │   │   ├── TestimonialsVideoSection.tsx
    │   │   ├── WhyYouStuckSection.tsx
    │   │   ├── EventDetailsSection.tsx
    │   │   ├── WhatYouWillLearnSection.tsx
    │   │   ├── WhoIsItForWorkshopSection.tsx
    │   │   ├── AboutGabrielProobraSection.tsx
    │   │   ├── InvestmentSection.tsx (ou seção de valor)
    │   │   ├── FinalCTAWorkshopSection.tsx
    │   │   ├── WorkshopFAQSection.tsx
    │   │   ├── Footer.tsx
    │   │   ├── PainPointsMarquee.tsx
    │   │   ├── BenefitsMarquee.tsx
    │   │   └── LogoSeparator.tsx
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
2. Criar `.env.local` com variáveis necessárias (especialmente Google Meet)
3. Substituir todos os textos pelo conteúdo PROOBRA
4. Substituir imagens por imagens relacionadas a construção civil/obras
5. Atualizar metadata SEO para PROOBRA
6. Testar página localmente
7. Verificar vídeo do workshop funcionando
8. Testar link do Google Meet
9. Ajustar cores e estilos se necessário
10. Configurar deploy (Vercel, Netlify, etc.)

---

## 📝 Conteúdo Específico do PROOBRA

### Hero Section
- **Headline**: "A sua obra não deve ser um caos. Ela deve ser previsível, controlada e lucrativa."
- **Subheadline**: "Neste workshop ao vivo, você vai entender como engenheiros e profissionais da construção estão saindo do improviso e assumindo o controle real das suas obras."

### Vídeo Principal
- **Título**: "Aula de Apresentação do Método PROOBRA"
- **Descrição**: "Nesta aula, você vai descobrir: Por que a maioria das obras perde dinheiro sem perceber, onde o lucro se perde antes mesmo da obra começar, como estruturar controle, orçamento e gestão sem burocracia, o que muda quando você deixa de 'achar' e passa a saber"

### 3 Chaves do Método
1. **Mentalidade de Gestor**: Como sair da execução cega e assumir o papel de quem controla a obra com visão estratégica
2. **Controle que Evita Prejuízo**: O que precisa estar organizado antes da obra começar e como evitar perdas invisíveis que matam o lucro
3. **Método que Sustenta Crescimento**: Como estruturar um processo replicável, que gera previsibilidade e confiança

### Valor
- **R$ 49,99**
- Gravação inclusa
- Encontro ao vivo via Google Meet

### Fechamento
- **CTA**: "Você pode continuar executando obras… ou começar a gerenciar com método."
- **Mensagem final**: "PROOBRA não é sobre fazer mais obras. É sobre ganhar dinheiro com as que você já faz."

---

**Documento criado para facilitar a migração completa da landing page do Workshop PROOBRA.**
