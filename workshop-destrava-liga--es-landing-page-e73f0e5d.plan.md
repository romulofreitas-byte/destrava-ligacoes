<!-- e73f0e5d-5ae7-4555-abad-11a92d94aaea 86209bd2-2ebc-4c39-98a5-05249e69a9cc -->
# Landing Page - Workshop Destrava Ligações

Criar uma landing page completa para o Workshop de Destravamento de Ligações (3 horas, 26 de Novembro) replicando a estrutura visual, efeitos e design system da página atual da Mentoria em Grupo.

## Estrutura da Implementação

### 1. Nova Rota

- Criar `/src/app/workshop-destrava-ligacoes/page.tsx` com metadata SEO específica
- Seguir padrão de lazy loading de seções abaixo do fold

### 2. Componentes de Seção (em `/src/components/sections/`)

**HeroSectionWorkshop.tsx**

- Hero com headline: "Destrave suas ligações e comece a marcar R1s em até 48h"
- Subheadline emocional sobre transformação
- Badge de evento: "26 de Novembro • 3 horas intensas • 100% prático"
- CTA principal destacado (botão vermelho/amarelo)
- Foto do Rômulo (reutilizar `/imagens/romulo-hero.png`)
- Layout responsivo (mobile full viewport, desktop grid 2 colunas)

**WhoIsItForWorkshopSection.tsx**

- Grid 2 colunas: "Pra quem é este workshop?"
- Bullets criando identificação emocional
- Mesclar freelancers travados com perfis avançados (SDR/BDR, líderes comerciais, etc.)
- Reforçar: "Se você vende serviços, você precisa disso"

**WhyYouStuckSection.tsx**

- Bloco: "Por que você trava no telefone?"
- Explicação psicológica profunda (vergonha, medo, falta de discurso/método)
- Cards com hover effects
- Objetivo: fazer leitor se identificar

**WhatYouWillLearnSection.tsx**

- Grid com 5-7 bullets transformacionais:
  - Como montar discurso perfeito de cold call
  - Como abrir ligação sem ser invasivo
  - Como conduzir conversa que marca R1
  - Como lidar com rejeição, silêncio e objeções
  - Como falar com autoridade (mesmo sendo iniciante)
  - Como vender para decisores
  - Como destravar de vez o medo de ligar
- Cards com animações fade-in-up

**LiveCallsSection.tsx**

- Seção destacada: "A parte mais poderosa — ligações reais ao vivo"
- Explicar que Rômulo ligará AO VIVO
- Benefícios: prova imediata, mostra como profissional faz, aumenta confiança
- Copy: "Você não vai ver teoria. Você vai ver o que NINGUÉM mostra: ligações reais, analisadas e explicadas."
- Card premium com border amarelo destacado

**AboutRomuloWorkshopSection.tsx**

- Versão curta e direta do AboutMentorSection
- Foco em autoridade: criador do Método Pódium, 12+ anos cold caller, mentor 100+ pilotos
- Tom autêntico, direto, sem enrolação
- Estatísticas destacadas

**WhyItWorksSection.tsx**

- Bloco: "Por que isso funciona para freelancers E profissionais avançados"
- Método validado, funciona em qualquer nicho
- Serve tanto para travados quanto para aumentar conversão
- Cards com prova social

**AfterWorkshopSection.tsx**

- "O que você sai capaz de fazer após 3h"
- Transformações reais:
  - Fazer primeira cold call sem travar
  - Marcar primeiras R1s em até 48h
  - Ter segurança para abordar decisores
  - Saber exatamente o que dizer
  - Começar pipeline previsível
  - Superar vergonha
- Grid de cards com hover effects

**FinalCTAWorkshopSection.tsx**

- CTA final com urgência leve
- "Vagas limitadas"
- "Evento ao vivo, sem replay"
- Botão destacado (gradient vermelho)
- Progress bar opcional (se houver limite de vagas)

**EventDetailsSection.tsx**

- Card destacado com informações do evento:
  - Data: 26 de Novembro
  - Duração: 3 horas
  - Formato: Online (transmissão ao vivo)
  - Horário: (a definir ou especificar)
- Badge de destaque

**Footer.tsx** (reutilizar existente)

### 3. Design System e Efeitos Visuais

Aplicar exatamente os mesmos padrões:

- **Tipografia**: Ubuntu (headings) + Montserrat (body)
- **Cores**: gray-900 (background), yellow-400 (destaques), red-500 (CTAs/urgência)
- **Animações**: fade-in-up, shimmer, float (orbs), progress-flow
- **Cards**: glassmorphism (backdrop-blur), borders com transparência, hover effects
- **Backgrounds**: grid pattern overlay, floating orbs, gradients
- **Responsividade**: mobile-first, breakpoints sm/md/lg

### 4. Copy e Tom

- Tom forte, direto, emocional e profissional
- Sem termos técnicos difíceis
- Foco: dor → desejo → solução → prova → ação
- Construir como página premium de conversão
- Manter essência Mundo Pódium (identidade, coragem, responsabilidade, prática)
- NÃO mencionar estratégias de tráfego

### 5. Estrutura de Arquivos

```
src/
├── app/
│   └── workshop-destrava-ligacoes/
│       └── page.tsx (nova página)
└── components/
    └── sections/
        ├── HeroSectionWorkshop.tsx
        ├── WhoIsItForWorkshopSection.tsx
        ├── WhyYouStuckSection.tsx
        ├── WhatYouWillLearnSection.tsx
        ├── LiveCallsSection.tsx
        ├── AboutRomuloWorkshopSection.tsx
        ├── WhyItWorksSection.tsx
        ├── AfterWorkshopSection.tsx
        ├── FinalCTAWorkshopSection.tsx
        └── EventDetailsSection.tsx
```

### 6. Integração com Meta Pixel

- Reutilizar `trackCTAClick` e `trackViewContent` do `@/lib/metaPixel`
- Adicionar tracking nos CTAs principais

### 7. Componentes Reutilizáveis

- `ProtectedImage` para todas as imagens
- Animações CSS do `globals.css` (já existentes)
- Padrões de card e botão do design system

## Checklist de Implementação

- [ ] Criar rota `/workshop-destrava-ligacoes`
- [ ] Criar HeroSectionWorkshop com layout responsivo
- [ ] Criar WhoIsItForWorkshopSection (grid 2 colunas)
- [ ] Criar WhyYouStuckSection (explicação psicológica)
- [ ] Criar WhatYouWillLearnSection (5-7 bullets)
- [ ] Criar LiveCallsSection (destaque premium)
- [ ] Criar AboutRomuloWorkshopSection (versão curta)
- [ ] Criar WhyItWorksSection (validação método)
- [ ] Criar AfterWorkshopSection (transformações)
- [ ] Criar FinalCTAWorkshopSection (urgência)
- [ ] Criar EventDetailsSection (informações evento)
- [ ] Aplicar design system completo (cores, tipografia, animações)
- [ ] Testar responsividade (mobile, tablet, desktop)
- [ ] Adicionar Meta Pixel tracking
- [ ] Validar copy persuasiva em todas as seções

### To-dos

- [ ] Criar rota /workshop-destrava-ligacoes com page.tsx e metadata SEO
- [ ] Criar HeroSectionWorkshop com headline, subheadline, badge de evento, CTA e foto do Rômulo
- [ ] Criar WhoIsItForWorkshopSection com grid 2 colunas e bullets de identificação
- [ ] Criar WhyYouStuckSection com explicação psicológica profunda sobre travas
- [ ] Criar WhatYouWillLearnSection com 5-7 bullets transformacionais
- [ ] Criar LiveCallsSection destacando ligações ao vivo como diferencial
- [ ] Criar AboutRomuloWorkshopSection versão curta e direta com autoridade
- [ ] Criar WhyItWorksSection validando método para freelancers e profissionais avançados
- [ ] Criar AfterWorkshopSection com transformações reais após 3h
- [ ] Criar EventDetailsSection com informações do evento (data, horário, formato)
- [ ] Criar FinalCTAWorkshopSection com urgência e CTA destacado
- [ ] Aplicar design system completo (cores, tipografia, animações, glassmorphism)
- [ ] Adicionar tracking Meta Pixel nos CTAs principais