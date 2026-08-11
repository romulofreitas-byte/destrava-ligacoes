# Guia de Design Visual - Workshop PROOBRA

Este documento orienta sobre todos os padrões visuais, efeitos e estruturas de design utilizados no projeto PROOBRA.

## 🎨 Paleta de Cores PROOBRA

### Cores Principais

- **Azul Escuro (Primary)**: `#0477bf`
  - Uso: Botões principais, elementos de destaque, CTAs secundários
  - Tailwind: `proobra-blue-dark`
  
- **Azul Claro (Secondary)**: `#049dd9`
  - Uso: Textos em gradiente, elementos secundários, barras de progresso
  - Tailwind: `proobra-blue-light`

- **Laranja (Accent)**: `#f29829`
  - Uso: Botões CTA principais, badges, destaques, hover states
  - Tailwind: `proobra-orange`

- **Preto (Base)**: `#000000`
  - Uso: Textos principais, elementos de contraste

- **Cinza Escuro (Background)**: `gray-900` (#111827)
  - Uso: Background principal da página

- **Cinza Médio (Cards)**: `gray-800` (#1f2937)
  - Uso: Background de cards com glassmorfismo

### Mapeamento de Cores (Original → PROOBRA)

| Cor Original | Cor PROOBRA | Uso |
|------------|------------|-----|
| `yellow-400` | `#f29829` (laranja) | Badges, destaques |
| `yellow-500` | `#f29829` (laranja) | Hover states |
| `green-400` | `#049dd9` (azul claro) | Elementos secundários |
| `green-500` | `#0477bf` (azul escuro) | CTAs principais |
| `green-600` | `#0477bf` (azul escuro) | Hover de botões |
| `purple-400` | `#049dd9` (azul claro) | Elementos alternativos |

---

## 🔮 Glassmorfismo

### Padrões de Glassmorfismo

O glassmorfismo é um efeito visual que cria elementos com aparência de vidro fosco, usando transparência e blur.

#### Estrutura Básica

```tsx
<div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl">
  {/* Conteúdo */}
</div>
```

#### Componentes Principais

1. **Background Semi-transparente**
   - `bg-gray-800/30` - Transparência leve (30%)
   - `bg-gray-800/40` - Transparência média (40%)
   - `bg-gray-800/50` - Transparência alta (50%)

2. **Backdrop Blur**
   - `backdrop-blur-sm` - Blur suave (4px)
   - `backdrop-blur-md` - Blur médio (8px)
   - `backdrop-blur-xl` - Blur forte (24px)

3. **Bordas Semi-transparentes**
   - `border border-gray-700/50` - Borda padrão
   - `border-2 border-[cor]/30` - Borda com cor accent (30% opacidade)
   - `hover:border-[cor]/50` - Hover com borda mais visível

4. **Sombras e Glow**
   - `shadow-2xl` - Sombra grande
   - `hover:shadow-[cor]/30` - Glow colorido no hover
   - `shadow-lg shadow-[cor]/20` - Sombra com cor

### Exemplos de Uso

#### Card com Glassmorfismo

```tsx
<div className="bg-gray-800/40 border-2 border-proobra-orange/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl hover:shadow-proobra-orange/30 transition-all duration-300">
  {/* Conteúdo */}
</div>
```

#### Badge com Glassmorfismo

```tsx
<div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-proobra-orange/20 to-proobra-orange/10 border border-proobra-orange/30 rounded-full backdrop-blur-sm shadow-lg">
  <span className="text-proobra-orange font-semibold">Badge Text</span>
</div>
```

#### Card de Preço

```tsx
<div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-800/50 border border-proobra-orange/30 rounded-xl">
  <span className="text-gray-400 text-sm line-through">De R$ 297</span>
  <span className="text-proobra-orange font-bold text-xl">R$ 49,99</span>
</div>
```

---

## ✨ Efeitos Visuais e Animações

### Animações CSS Customizadas

#### 1. Fade In Up (`animate-fade-in-up`)

Animação de entrada suave de baixo para cima.

```css
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Uso:**
```tsx
<div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
  {/* Conteúdo */}
</div>
```

**Delays comuns:**
- `0.05s` - Primeiro elemento
- `0.1s` - Segundo elemento
- `0.15s` - Terceiro elemento
- `0.2s` - Quarto elemento
- `0.25s` - Quinto elemento

#### 2. Shimmer (`animate-shimmer`)

Efeito brilhante que passa sobre elementos.

```css
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
```

**Uso em gradientes de texto:**
```tsx
<span className="bg-gradient-to-r from-proobra-blue-light via-proobra-orange to-proobra-blue-light bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
  Texto com efeito shimmer
</span>
```

#### 3. Progress Flow (`animate-progress-flow`)

Animação contínua em barras de progresso.

```css
@keyframes progress-flow {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
```

**Uso em barra de progresso:**
```tsx
<div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden relative">
  <div className="h-full bg-gradient-to-r from-proobra-blue-dark to-proobra-blue-light rounded-full" style={{width: '92%'}}></div>
  <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-proobra-blue-light/40 to-transparent animate-progress-flow"></div>
</div>
```

#### 4. Marquee (`animate-marquee`)

Animação de scroll infinito horizontal.

```css
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
```

**Uso:**
```tsx
<div className="flex animate-marquee whitespace-nowrap w-max">
  {/* Conteúdo duplicado 3x para loop perfeito */}
</div>
```

#### 5. Float (`animate-float`)

Animação flutuante suave para elementos decorativos.

```css
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}
```

**Uso em orbs decorativos:**
```tsx
<div className="absolute w-96 h-96 bg-proobra-orange/10 rounded-full blur-3xl animate-float"></div>
```

#### 6. Button Shine (`button-shine-effect`)

Efeito brilhante que passa sobre botões.

```css
@keyframes button-shine {
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 100%;
  }
}
```

**Uso:**
```tsx
<a className="button-shine-effect relative overflow-hidden">
  <span className="relative z-2">Botão Text</span>
</a>
```

#### 7. Pulse (`animate-pulse`)

Animação de pulso (nativo do Tailwind).

**Uso:**
```tsx
<div className="w-2 h-2 bg-proobra-orange rounded-full animate-pulse"></div>
```

---

## 🎯 Padrões de Componentes

### Botões

#### Botão CTA Principal (Laranja)

```tsx
<a className="group relative inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-proobra-orange to-[#d8891f] text-white font-black text-sm sm:text-base rounded-full hover:from-[#d8891f] hover:to-proobra-orange transition-all duration-300 shadow-2xl hover:shadow-proobra-orange/40 hover:scale-105 button-shine-effect cursor-pointer">
  <span className="relative drop-shadow-sm">Garantir vaga por R$ 49,99</span>
  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-proobra-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</a>
```

#### Botão Secundário (Azul)

```tsx
<a className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-proobra-blue-dark to-proobra-blue-light text-white font-semibold rounded-full hover:from-proobra-blue-light hover:to-proobra-blue-dark transition-all duration-300 shadow-lg hover:shadow-proobra-blue-light/40">
  Botão Secundário
</a>
```

### Cards

#### Card Padrão com Glassmorfismo

```tsx
<div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-proobra-orange/50 hover:shadow-proobra-orange/20 hover:scale-[1.02]">
  {/* Conteúdo */}
</div>
```

#### Card Destacado

```tsx
<div className="bg-gray-800/40 border-2 border-proobra-orange/50 rounded-3xl p-8 backdrop-blur-xl shadow-2xl hover:shadow-proobra-orange/30 transition-all duration-300 relative overflow-hidden group">
  {/* Glow effect */}
  <div className="absolute inset-0 bg-gradient-to-br from-proobra-orange/0 via-proobra-orange/5 to-proobra-orange/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  <div className="relative z-10">
    {/* Conteúdo */}
  </div>
</div>
```

### Badges

#### Badge Padrão

```tsx
<div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-proobra-orange/20 to-proobra-orange/10 border border-proobra-orange/30 rounded-full backdrop-blur-sm shadow-lg hover:shadow-proobra-orange/20 transition-all duration-300">
  <span className="text-proobra-orange font-semibold text-xs tracking-wide">Badge Text</span>
</div>
```

#### Badge de Preço

```tsx
<div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-800/50 border border-proobra-orange/30 rounded-xl">
  <span className="text-gray-400 text-sm line-through">De R$ 297</span>
  <span className="text-proobra-orange font-bold text-xl">R$ 49,99</span>
</div>
```

---

## 📐 Estrutura do Hero Section

### Layout Mobile (`lg:hidden`)

```tsx
<section className="relative overflow-hidden flex flex-col bg-gray-900 min-h-[85vh] lg:min-h-[calc(100vh-64px)]">
  
  {/* Header */}
  <div className="relative z-10 border-b border-gray-800">
    <div className="container-custom py-1.5 sm:py-2">
      <div className="flex items-center justify-between">
        {/* Logo + Título */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <img src="/icon-proobra.png" className="w-5 h-5 sm:w-7 sm:h-7" />
          <span className="text-white text-[10px] sm:text-sm">Workshop PROOBRA</span>
        </div>
        {/* Data/Horário */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Data e hora */}
        </div>
      </div>
    </div>
  </div>

  {/* Badge acima da imagem */}
  <div className="px-4 pt-4 pb-2 text-center">
    <div className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-proobra-orange/20 to-proobra-orange/10 border border-proobra-orange/30 rounded-full backdrop-blur-sm shadow-lg animate-fade-in-up" style={{animationDelay: '0.05s'}}>
      <span className="text-proobra-orange font-semibold text-[10px]">2 horas • Google Meet • Gravação inclusa</span>
    </div>
  </div>

  {/* Imagem */}
  <div className="relative w-full" style={{height: '50vh', minHeight: '350px'}}>
    <div className="absolute inset-0 bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-transparent"></div>
      {/* Imagem do mentor */}
    </div>
  </div>

  {/* Conteúdo texto */}
  <div className="px-4 pb-4" style={{marginTop: '-60px'}}>
    <div className="max-w-md mx-auto text-center space-y-4">
      {/* Título, subtítulo, preço, CTA, barra de progresso */}
    </div>
  </div>

  {/* PainPointsMarquee */}
  <PainPointsMarquee />

</section>
```

### Layout Desktop (`hidden lg:flex`)

```tsx
<div className="hidden lg:flex container-custom relative z-30 flex-1 items-center justify-center">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
    
    {/* Coluna Esquerda - Texto */}
    <div className="max-w-2xl text-left relative z-30">
      {/* Badge, título, subtítulo, preço, CTA, barra de progresso */}
    </div>

    {/* Coluna Direita - Imagem */}
    <div className="hidden lg:flex justify-end items-end -mb-32 animate-mentor-fade-in" style={{marginTop: '-120px', animationDelay: '0.8s'}}>
      {/* Imagem grande */}
    </div>

  </div>
</div>
```

### Posicionamento e Espaçamentos

#### Mobile
- **Header**: `py-1.5 sm:py-2`
- **Badge**: `px-4 pt-4 pb-2`
- **Imagem**: `height: 50vh, minHeight: 350px`
- **Texto**: `marginTop: -60px`
- **Título**: `text-[17px] sm:text-xl`
- **Subtítulo**: `text-[11px]`
- **Padding geral**: `px-4 pb-4`

#### Desktop
- **Container**: `container-custom` (max-w-6xl mx-auto px-4 sm:px-6 lg:px-8)
- **Grid**: `grid-cols-1 lg:grid-cols-2 gap-16`
- **Título**: `text-2xl sm:text-2xl md:text-3xl lg:text-3xl`
- **Subtítulo**: `text-[13px] sm:text-sm`
- **Imagem**: `max-w-[70rem]`, `marginTop: -120px`, `marginBottom: -32`

---

## 🎨 Gradientes

### Gradientes Principais

#### Gradiente de Texto (Shimmer)

```tsx
<span className="bg-gradient-to-r from-proobra-blue-light via-proobra-orange to-proobra-blue-light bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
  Texto com gradiente
</span>
```

#### Gradiente de Botão CTA

```tsx
className="bg-gradient-to-r from-proobra-orange to-[#d8891f]"
```

#### Gradiente de Background

```tsx
className="bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"
```

#### Gradiente de Overlay

```tsx
className="bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-transparent"
```

---

## 🌟 Shadows e Glows

### Padrões de Sombra

#### Sombra Padrão

```tsx
className="shadow-lg"
```

#### Sombra Grande

```tsx
className="shadow-2xl"
```

#### Glow Colorido no Hover

```tsx
className="hover:shadow-proobra-orange/40"
```

#### Sombra com Cor

```tsx
className="shadow-lg shadow-proobra-blue-light/20"
```

### Efeitos de Glow em Cards

```tsx
<div className="group">
  <div className="absolute inset-0 shadow-[0_0_80px_rgba(242,152,41,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
</div>
```

---

## 📱 Responsividade

### Breakpoints Tailwind

- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+
- `2xl:` - 1536px+

### Padrões de Responsividade

#### Texto Responsivo

```tsx
className="text-[17px] sm:text-xl md:text-2xl lg:text-3xl"
```

#### Padding Responsivo

```tsx
className="px-4 sm:px-6 md:px-8 lg:px-12"
```

#### Grid Responsivo

```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

#### Display Responsivo

```tsx
className="hidden lg:flex" // Desktop apenas
className="lg:hidden" // Mobile apenas
```

---

## 🎭 Z-Index Layers

Ordem de camadas (do fundo para frente):

1. `z-0` - Background/base
2. `z-10` - Conteúdo principal
3. `z-20` - Elementos sobrepostos
4. `z-30` - Conteúdo destacado
5. `z-[35]` - PainPointsMarquee
6. `z-[100]` - Elementos de header (data/hora)

---

## 🔄 Transições

### Durações Padrão

- `duration-300` - Transições rápidas (300ms)
- `duration-500` - Transições médias (500ms)
- `duration-1000` - Transições lentas (1s)

### Propriedades de Transição

```tsx
className="transition-all duration-300"
className="transition-opacity duration-500"
className="transition-transform duration-300"
```

---

## 📋 Checklist de Aplicação

Ao criar novos componentes, verificar:

- [ ] Cores PROOBRA aplicadas corretamente
- [ ] Glassmorfismo com backdrop-blur
- [ ] Bordas semi-transparentes
- [ ] Animações com delays apropriados
- [ ] Hover states com glow/shadows
- [ ] Responsividade mobile/desktop
- [ ] Z-index correto
- [ ] Transições suaves
- [ ] Gradientes quando aplicável
- [ ] Shadows e glows consistentes

---

**Este guia deve ser consultado sempre que criar ou adaptar componentes visuais para o PROOBRA.**
