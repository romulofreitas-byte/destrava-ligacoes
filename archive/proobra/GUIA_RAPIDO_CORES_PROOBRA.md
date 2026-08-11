# Guia Rápido de Substituição de Cores - PROOBRA

Este guia lista todas as substituições de cores necessárias para adaptar o projeto "Destrava Ligações" para o PROOBRA.

## 🎨 Paleta de Cores PROOBRA

- **Azul Escuro**: `#0477bf` (Primary)
- **Azul Claro**: `#049dd9` (Secondary)
- **Laranja**: `#f29829` (Accent)
- **Preto**: `#000000` (Base)

## 🔄 Mapeamento de Substituições

### Cores Tailwind → PROOBRA

| Cor Original | Cor PROOBRA | Código Hex | Uso |
|-------------|-------------|------------|-----|
| `yellow-400` | Laranja | `#f29829` | Badges, destaques, CTAs |
| `yellow-500` | Laranja | `#f29829` | Hover states |
| `green-400` | Azul Claro | `#049dd9` | Elementos secundários |
| `green-500` | Azul Escuro | `#0477bf` | CTAs principais |
| `green-600` | Azul Escuro | `#0477bf` | Hover de botões |
| `purple-400` | Azul Claro | `#049dd9` | Elementos alternativos |

### Substituições em Classes Tailwind

#### Badges e Destaques
```tsx
// ANTES
className="bg-yellow-400/20 border-yellow-400/30 text-yellow-400"

// DEPOIS
className="bg-[#f29829]/20 border-[#f29829]/30 text-[#f29829]"
// OU usar classe customizada: bg-proobra-orange/20 border-proobra-orange/30 text-proobra-orange
```

#### Botões CTA Principais
```tsx
// ANTES
className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"

// DEPOIS
className="bg-gradient-to-r from-[#f29829] to-[#d8891f] hover:from-[#d8891f] hover:to-[#f29829]"
```

#### Barras de Progresso
```tsx
// ANTES
className="bg-gradient-to-r from-green-500 to-green-600"

// DEPOIS
className="bg-gradient-to-r from-[#0477bf] to-[#049dd9]"
```

#### Textos em Gradiente
```tsx
// ANTES
className="text-yellow-400"

// DEPOIS
className="text-[#049dd9]"
// OU: text-proobra-blue-light
```

#### Hover States
```tsx
// ANTES
className="hover:border-yellow-400/50 hover:shadow-yellow-400/30"

// DEPOIS
className="hover:border-[#f29829]/50 hover:shadow-[#f29829]/30"
```

#### Shadows e Glows
```tsx
// ANTES
className="shadow-green-400/40 hover:shadow-green-500/40"

// DEPOIS
className="shadow-[#049dd9]/40 hover:shadow-[#f29829]/40"
```

## 📝 Checklist de Substituição

### Arquivos Principais

- [ ] `src/app/globals.css`
  - [ ] `.btn-primary` - usar laranja `#f29829`
  - [ ] `.gradient-text` - usar azul claro `#049dd9`
  - [ ] `.card` - ajustar hover border para laranja

- [ ] `tailwind.config.js`
  - [ ] Adicionar cores customizadas PROOBRA

- [ ] `src/components/sections/HeroSectionProobra.tsx`
  - [ ] Badge - laranja
  - [ ] CTA button - laranja
  - [ ] Progress bar - azul escuro/claro
  - [ ] Textos destacados - laranja

- [ ] Todos os componentes de seção
  - [ ] Badges - laranja
  - [ ] Botões - laranja (CTAs) ou azul (secundários)
  - [ ] Bordas hover - laranja
  - [ ] Shadows - cores PROOBRA

## 🔍 Buscar e Substituir

### Expressões Regulares para Busca

#### Buscar todas as ocorrências de yellow-400
```
yellow-400
```

#### Buscar todas as ocorrências de green-400/500/600
```
green-[456]00?
```

#### Buscar gradientes com cores antigas
```
from-green-[456]00?|to-green-[456]00?|from-yellow-[45]00?|to-yellow-[45]00?
```

## 📋 Substituições Específicas por Componente

### Hero Section
- Badge: `yellow-400` → `#f29829` (laranja)
- CTA Button: `green-500/600` → `#f29829` (laranja)
- Progress Bar: `green-500/600` → `#0477bf` to `#049dd9` (azul)
- Texto destacado: `yellow-400` → `#f29829` (laranja)

### Cards e Seções
- Border hover: `yellow-400/50` → `#f29829/50` (laranja)
- Shadow hover: `yellow-400/30` → `#f29829/30` (laranja)
- Background badges: `yellow-400/20` → `#f29829/20` (laranja)

### Botões
- CTA Principal: `green-500/600` → `#f29829` (laranja)
- Secundário: `green-400` → `#049dd9` (azul claro)
- Hover: ajustar para tons mais escuros/claros

## ⚠️ Cores que NÃO Devem Ser Alteradas

- `gray-900` - Background principal (manter)
- `gray-800` - Background de cards (manter)
- `gray-700` - Bordas (manter)
- `white` - Textos claros (manter)
- `black` - Textos escuros (manter)

## 🎯 Exemplos Práticos

### Exemplo 1: Badge
```tsx
// ANTES
<div className="bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30">
  <span className="text-yellow-400">Badge</span>
</div>

// DEPOIS
<div className="bg-gradient-to-r from-[#f29829]/20 to-[#f29829]/10 border border-[#f29829]/30">
  <span className="text-[#f29829]">Badge</span>
</div>
```

### Exemplo 2: Botão CTA
```tsx
// ANTES
<a className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
  Garantir vaga
</a>

// DEPOIS
<a className="bg-gradient-to-r from-[#f29829] to-[#d8891f] hover:from-[#d8891f] hover:to-[#f29829] text-white">
  Garantir vaga
</a>
```

### Exemplo 3: Barra de Progresso
```tsx
// ANTES
<div className="bg-gradient-to-r from-green-500 to-green-600"></div>

// DEPOIS
<div className="bg-gradient-to-r from-[#0477bf] to-[#049dd9]"></div>
```

### Exemplo 4: Card com Hover
```tsx
// ANTES
<div className="border border-gray-700/50 hover:border-yellow-400/50 hover:shadow-yellow-400/30">
  Conteúdo
</div>

// DEPOIS
<div className="border border-gray-700/50 hover:border-[#f29829]/50 hover:shadow-[#f29829]/30">
  Conteúdo
</div>
```

## 🚀 Script de Substituição Rápida

Para facilitar, você pode usar estas substituições em massa (cuidado ao aplicar):

1. `yellow-400` → `[#f29829]` ou `proobra-orange`
2. `yellow-500` → `[#f29829]` ou `proobra-orange`
3. `green-400` → `[#049dd9]` ou `proobra-blue-light`
4. `green-500` → `[#0477bf]` ou `proobra-blue-dark`
5. `green-600` → `[#0477bf]` ou `proobra-blue-dark`

**Nota**: Sempre revise manualmente após substituições em massa para garantir que não quebrou nada.

---

**Use este guia como referência rápida durante a adaptação do projeto para PROOBRA.**
