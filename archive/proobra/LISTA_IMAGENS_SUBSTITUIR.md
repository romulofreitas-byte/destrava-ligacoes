# Lista de Imagens para Substituir - PROOBRA

Este documento lista todas as imagens que estão sendo usadas temporariamente do projeto "Destrava Ligações" e que precisam ser substituídas por imagens específicas do PROOBRA.

## 🖼️ Imagens Principais

### 1. Logo/Ícone do Site
- **Arquivo atual**: `/icon-escuderia.png`
- **Arquivo PROOBRA**: `/icon-proobra.png` (criar)
- **Uso**: Header do Hero, favicon
- **Localização no código**: 
  - `HeroSectionProobra.tsx` (linha ~72)
  - `src/app/layout.tsx` (metadata icons)

### 2. Foto do Mentor (Hero)
- **Arquivo atual**: `/romulo-hero.png`
- **Arquivo PROOBRA**: `/gabriel-gelape-hero.png` (criar)
- **Uso**: Imagem principal do Hero (mobile e desktop)
- **Localização no código**: 
  - `HeroSectionProobra.tsx` (linha ~129 mobile, linha ~277 desktop)
- **Especificações**:
  - Mobile: width 650px, height 650px
  - Desktop: width 1318px, height 1318px
  - Formato: PNG com transparência (preferencial)
  - Qualidade: 75

### 3. Imagem Open Graph
- **Arquivo atual**: `/workshop-metodo.png`
- **Arquivo PROOBRA**: `/workshop-proobra.png` (criar)
- **Uso**: Preview em redes sociais (Facebook, Twitter, LinkedIn)
- **Localização no código**: 
  - `src/app/page.tsx` (metadata openGraph.images)
  - `src/app/layout.tsx` (metadata openGraph.images)
- **Especificações**:
  - Tamanho: 1200x630px
  - Formato: PNG ou JPG
  - Deve conter: Logo PROOBRA, título do workshop, visual relacionado a construção/obras

## 📸 Imagens de Seções (Se Aplicável)

### 4. Imagens de Depoimentos
- **Arquivo atual**: Várias imagens de depoimentos
- **Arquivo PROOBRA**: Substituir por depoimentos reais do PROOBRA
- **Uso**: Seções de depoimentos/testimonials
- **Localização**: Componentes de depoimentos

### 5. Imagens de Seções Específicas
- **Arquivo atual**: Imagens relacionadas a vendas/cold call
- **Arquivo PROOBRA**: Imagens relacionadas a construção civil/obras
- **Uso**: Seções visuais do workshop
- **Localização**: Vários componentes de seção

## 🎨 Imagens Decorativas

### 6. Backgrounds e Overlays
- **Status**: Geralmente são gerados via CSS (gradientes)
- **Ação**: Verificar se há imagens de background específicas

### 7. Ícones e Ilustrações
- **Status**: Podem usar biblioteca de ícones (lucide-react)
- **Ação**: Verificar se há ícones customizados que precisam ser substituídos

## 📋 Checklist de Substituição

### Prioridade Alta
- [ ] `/icon-escuderia.png` → `/icon-proobra.png`
  - [ ] Atualizar em `HeroSectionProobra.tsx`
  - [ ] Atualizar em `src/app/layout.tsx`
  - [ ] Criar favicon

- [ ] `/romulo-hero.png` → `/gabriel-gelape-hero.png`
  - [ ] Atualizar em `HeroSectionProobra.tsx` (2 ocorrências)
  - [ ] Garantir tamanhos corretos (650x650 e 1318x1318)

- [ ] `/workshop-metodo.png` → `/workshop-proobra.png`
  - [ ] Atualizar em `src/app/page.tsx`
  - [ ] Atualizar em `src/app/layout.tsx`
  - [ ] Criar imagem 1200x630px

### Prioridade Média
- [ ] Imagens de depoimentos
- [ ] Imagens de seções específicas
- [ ] Outras imagens relacionadas ao conteúdo

### Prioridade Baixa
- [ ] Ícones customizados (se houver)
- [ ] Backgrounds específicos (se houver)

## 📝 Notas sobre Imagens

### Formato Recomendado
- **PNG**: Para imagens com transparência (logos, fotos com fundo removido)
- **JPG**: Para fotografias e imagens complexas
- **WebP**: Para otimização (Next.js converte automaticamente)

### Otimização
- Usar `next/image` (ProtectedImage) para otimização automática
- Especificar `quality={75}` para imagens grandes
- Usar `priority` para imagens acima do fold (Hero)

### Tamanhos
- **Logo**: 28x28px (header), pode ter versões maiores
- **Hero Mobile**: ~650x650px (mas será responsivo)
- **Hero Desktop**: ~1318x1318px (mas será responsivo)
- **Open Graph**: 1200x630px (fixo)

## 🔍 Como Encontrar Todas as Referências

### Buscar no código:
```bash
# Buscar referências a imagens
grep -r "romulo-hero" src/
grep -r "icon-escuderia" src/
grep -r "workshop-metodo" src/
```

### Arquivos que podem conter referências:
- `src/components/sections/*.tsx` - Componentes de seção
- `src/app/page.tsx` - Metadata
- `src/app/layout.tsx` - Metadata global
- `src/components/ui/ProtectedImage.tsx` - Componente de imagem

## ✅ Após Substituição

1. Verificar se todas as imagens carregam corretamente
2. Testar responsividade (mobile e desktop)
3. Verificar performance (tamanho dos arquivos)
4. Testar Open Graph em ferramentas de preview:
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/

---

**Substitua as imagens conforme disponibilidade, mantendo os mesmos nomes de arquivo ou atualizando as referências no código.**
