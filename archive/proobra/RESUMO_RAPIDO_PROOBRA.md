# Resumo Rápido - Migração Workshop PROOBRA

## 🎯 Objetivo
Copiar toda a estrutura da landing page para criar a landing page do **Workshop PROOBRA**.

## 📦 Informações do Workshop PROOBRA

- **Título**: Workshop PROOBRA
- **Subtítulo**: O método que transforma execução de obra em gestão lucrativa
- **Duração**: 2 horas
- **Formato**: Google Meet ao vivo
- **Valor**: R$ 49,99
- **Mentor**: Gabriel Gelape (Engenheiro Civil)

## 📦 Arquivos Criados para Ajudar na Migração

1. **`GUIA_MIGRACAO_PROOBRA.md`** - Guia detalhado com todas as instruções específicas do PROOBRA
2. **`LISTA_ARQUIVOS_PROOBRA.md`** - Lista completa de arquivos com checklist adaptado
3. **`verificar-arquivos.ps1`** - Script PowerShell para verificar arquivos copiados (reutilizar)
4. **`env.template`** - Template de variáveis de ambiente (reutilizar)

## ⚡ Passos Rápidos

### 1. Preparação
```bash
# No novo repositório
npm create next-app@latest . --typescript --tailwind --app
```

### 2. Copiar Arquivos
- Use `LISTA_ARQUIVOS_PROOBRA.md` como checklist
- Copie todos os arquivos listados
- Mantenha a estrutura de diretórios
- **Renomear**: `AboutRomuloWorkshopSection.tsx` → `AboutGabrielProobraSection.tsx`

### 3. Instalar Dependências
```bash
npm install
```

### 4. Configurar Ambiente
```bash
# Copiar env.template para .env.local
cp env.template .env.local
# Editar .env.local com seus valores
# IMPORTANTE: Configurar Google Meet (workshop ao vivo)
```

### 5. Verificar Arquivos
```powershell
# Executar script de verificação
.\verificar-arquivos.ps1
```

### 6. Customizar Conteúdo PROOBRA
- **Hero**: "A sua obra não deve ser um caos. Ela deve ser previsível, controlada e lucrativa."
- **Vídeo**: Aula de Apresentação do Método PROOBRA
- **Problema**: "O problema não é a obra. É a falta de método."
- **3 Chaves**: Mentalidade, Controle, Método
- **Público**: Engenheiros, arquitetos, empreiteiros
- **Mentor**: Gabriel Gelape
- **Valor**: R$ 49,99
- **FAQ**: Adaptado para contexto de obras

### 7. Substituir Imagens
- Ícone: `icon-proobra.png`
- Open Graph: `workshop-proobra.png` (1200x630)
- Foto do mentor: `gabriel-gelape.jpg`
- Imagens de obras/construção civil

### 8. Testar
```bash
npm run dev
# Abrir http://localhost:3000
```

## 📊 Estatísticas

- **Total de arquivos TypeScript/TSX**: ~60 arquivos
- **Componentes de seção**: ~15-18 arquivos (adaptados)
- **Componentes UI**: 17 arquivos (manter todos)
- **Dados/Constantes**: 4 arquivos (adaptar conteúdo)
- **Configurações**: 7 arquivos

## 🔑 Pontos Importantes - PROOBRA

1. **Google Meet**: Obrigatório configurar (workshop ao vivo)
2. **Componentes a Remover**: LiveCallsSection, ColdCallQuizSection (não aplicáveis)
3. **Renomeações**: AboutRomuloWorkshopSection → AboutGabrielProobraSection
4. **Conteúdo Principal**: 3 chaves do método (Mentalidade, Controle, Método)
5. **Valor**: R$ 49,99 (ajustar em InvestmentSection ou seção de valor)
6. **Público-Alvo**: Engenheiros civis, arquitetos, empreiteiros

## 📚 Documentação Completa

Para instruções detalhadas, consulte:
- **`GUIA_MIGRACAO_PROOBRA.md`** - Guia completo passo a passo específico PROOBRA
- **`LISTA_ARQUIVOS_PROOBRA.md`** - Lista detalhada de arquivos adaptados

## ✅ Checklist Final - PROOBRA

- [ ] Todos os arquivos copiados
- [ ] Componentes renomeados (AboutGabrielProobraSection)
- [ ] Componentes não aplicáveis removidos (LiveCallsSection, ColdCallQuizSection)
- [ ] `npm install` executado
- [ ] `.env.local` configurado (Google Meet obrigatório)
- [ ] Hero adaptado: "A sua obra não deve ser um caos..."
- [ ] Vídeo principal: Aula Método PROOBRA
- [ ] 3 chaves do método implementadas
- [ ] Público-alvo atualizado (engenheiros, arquitetos, empreiteiros)
- [ ] Seção sobre Gabriel Gelape adaptada
- [ ] Valor R$ 49,99 configurado
- [ ] FAQ adaptado para contexto de obras
- [ ] Textos ajustados para temática PROOBRA
- [ ] Imagens substituídas (icon-proobra.png, workshop-proobra.png, gabriel-gelape.jpg)
- [ ] Metadata SEO atualizada
- [ ] Página testada localmente
- [ ] Build de produção funcionando (`npm run build`)

## 🎯 Conteúdo Específico PROOBRA

### Hero Section
"A sua obra não deve ser um caos. Ela deve ser previsível, controlada e lucrativa."

### 3 Chaves do Método
1. **Mentalidade de Gestor** - Sair da execução cega
2. **Controle que Evita Prejuízo** - Organização antes da obra começar
3. **Método que Sustenta Crescimento** - Processo replicável

### Valor
R$ 49,99 - Gravação inclusa - Google Meet ao vivo

### Fechamento
"PROOBRA não é sobre fazer mais obras. É sobre ganhar dinheiro com as que você já faz."

---

**Boa sorte com a migração do Workshop PROOBRA!** 🚀
