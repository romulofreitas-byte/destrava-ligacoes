# 🚀 Deploy no Vercel - Guia Passo a Passo

## Método 1: Via Dashboard do Vercel (Recomendado)

### Passo 1: Acessar o Vercel
1. Acesse [https://vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub (mesma conta do repositório)

### Passo 2: Importar Projeto
1. Clique em **"Add New..."** ou **"New Project"**
2. Selecione o repositório: `romulofreitas-byte/destrava-ligacoes`
3. Clique em **"Import"**

### Passo 3: Configurar Projeto
O Vercel detectará automaticamente:
- ✅ **Framework Preset**: Next.js
- ✅ **Root Directory**: `./`
- ✅ **Build Command**: `npm run build` (automático)
- ✅ **Output Directory**: `.next` (automático)
- ✅ **Install Command**: `npm install` (automático)

**NÃO PRECISA ALTERAR NADA** - apenas confirme as configurações.

### Passo 4: Configurar Variáveis de Ambiente ⚠️ IMPORTANTE

**ANTES DE CLICAR EM DEPLOY**, configure as variáveis:

1. Na seção **"Environment Variables"**, clique em **"Add"**
2. Adicione as seguintes variáveis:

#### Variável 1:
- **Name**: `NEXT_PUBLIC_META_PIXEL_ID`
- **Value**: `2971488916372606`
- **Environments**: Selecione todas (Production, Preview, Development)

#### Variável 2 (Opcional mas recomendado):
- **Name**: `NEXT_PUBLIC_BASE_URL`
- **Value**: `https://destrava-ligacoes.vercel.app` (ou seu domínio customizado)
- **Environments**: Selecione todas (Production, Preview, Development)

### Passo 5: Fazer Deploy
1. Clique em **"Deploy"**
2. Aguarde o build completar (2-5 minutos)
3. ✅ Seu site estará no ar!

### Passo 6: Verificar Deploy
Após o deploy, você receberá uma URL como:
`https://destrava-ligacoes-xxx.vercel.app`

Teste:
- [ ] Site carrega corretamente
- [ ] Meta Pixel funciona (verifique no console)
- [ ] Cookies consent aparece
- [ ] Todas as rotas funcionam

---

## Método 2: Via CLI do Vercel (Alternativo)

Se preferir usar a linha de comando:

### Instalar Vercel CLI
```bash
npm i -g vercel
```

### Fazer Login
```bash
vercel login
```

### Configurar Variáveis de Ambiente
```bash
vercel env add NEXT_PUBLIC_META_PIXEL_ID
# Digite: 2971488916372606
# Selecione: Production, Preview, Development

vercel env add NEXT_PUBLIC_BASE_URL
# Digite: https://destrava-ligacoes.vercel.app
# Selecione: Production, Preview, Development
```

### Fazer Deploy
```bash
vercel --prod
```

---

## ✅ Checklist de Deploy

- [ ] Repositório conectado ao Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado
- [ ] Site carregando corretamente
- [ ] Meta Pixel funcionando
- [ ] Cookies consent funcionando
- [ ] Todas as rotas testadas

---

## 🔧 Troubleshooting

### Build Falha
- Verifique os logs no dashboard do Vercel
- Certifique-se de que todas as variáveis estão configuradas
- Teste localmente: `npm run build`

### Meta Pixel Não Funciona
- Verifique se `NEXT_PUBLIC_META_PIXEL_ID` está configurado
- Verifique se o consentimento de cookies está sendo dado
- Use o [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)

### Erro 404
- Verifique se o build foi bem-sucedido
- Limpe o cache e faça um novo deploy

---

## 📝 Próximos Passos Após Deploy

1. **Configurar Domínio Customizado** (opcional)
   - Settings > Domains
   - Adicione seu domínio
   - Atualize `NEXT_PUBLIC_BASE_URL`

2. **Monitorar Performance**
   - Use o Analytics do Vercel (já configurado)
   - Monitore os logs de build

3. **Reativar CSP** (após confirmar que tudo funciona)
   - Descomente a CSP no `next.config.js`
   - Faça um novo deploy

---

## 🎉 Pronto!

Seu site estará no ar em poucos minutos após seguir estes passos!

