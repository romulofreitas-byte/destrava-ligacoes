# Configuração do Vercel - Guia Completo

## ✅ Deploy no GitHub - CONCLUÍDO

O código foi enviado com sucesso para o repositório:
`https://github.com/romulofreitas-byte/destrava-ligacoes.git`

## 📋 Próximos Passos - Configuração no Vercel

### 1. Conectar Repositório ao Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New Project"**
3. Selecione o repositório `destrava-ligacoes`
4. O Vercel detectará automaticamente:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### 2. Configurar Variáveis de Ambiente

**IMPORTANTE**: Configure estas variáveis ANTES do primeiro deploy.

No dashboard do Vercel, vá em:
**Settings > Environment Variables**

Adicione as seguintes variáveis:

#### Variáveis Obrigatórias:

```
NEXT_PUBLIC_META_PIXEL_ID=2971488916372606
```

#### Variáveis Opcionais (mas recomendadas):

```
NEXT_PUBLIC_BASE_URL=https://seu-dominio.vercel.app
```

**Nota**: 
- Substitua `seu-dominio.vercel.app` pelo domínio real do seu site
- Se você tiver um domínio customizado, use esse domínio
- Para ambiente de produção, selecione **Production**
- Para previews, selecione **Preview** e **Development**

### 3. Configurações de Build

O Vercel detecta automaticamente as configurações do Next.js, mas você pode verificar:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (raiz do projeto)
- **Build Command**: `npm run build` (automático)
- **Output Directory**: `.next` (automático)
- **Install Command**: `npm install` (automático)

### 4. Fazer Deploy

1. Clique em **"Deploy"**
2. Aguarde o build completar (geralmente 2-5 minutos)
3. O Vercel fornecerá uma URL temporária: `https://destrava-ligacoes-xxx.vercel.app`

### 5. Verificar Deploy

Após o deploy, verifique:

- [ ] Site carrega corretamente
- [ ] Meta Pixel está funcionando (verifique no console do navegador)
- [ ] Cookies consent está aparecendo
- [ ] Todas as rotas funcionam:
  - `/` (página principal)
  - `/privacidade`
  - `/termos`
  - `/workshop-destrava-ligacoes`
  - `/workshop-destrava-ligacoes/obrigado`

### 6. Configurar Domínio Customizado (Opcional)

1. Vá em **Settings > Domains**
2. Adicione seu domínio customizado
3. Siga as instruções de DNS fornecidas pelo Vercel
4. Atualize `NEXT_PUBLIC_BASE_URL` com o novo domínio

### 7. Monitoramento e Logs

- **Deployments**: Veja histórico de deploys
- **Logs**: Acesse logs de build e runtime
- **Analytics**: Vercel Analytics já está configurado no código

## 🔧 Troubleshooting

### Build Falha

1. Verifique os logs de build no Vercel
2. Certifique-se de que todas as variáveis de ambiente estão configuradas
3. Teste o build localmente: `npm run build`

### Meta Pixel Não Funciona

1. Verifique se `NEXT_PUBLIC_META_PIXEL_ID` está configurado
2. Verifique se o consentimento de cookies está sendo dado
3. Use o [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) para debug

### Site Não Carrega

1. Verifique se o domínio está configurado corretamente
2. Verifique se `NEXT_PUBLIC_BASE_URL` está correto
3. Verifique os logs de runtime no Vercel

### Erro 404

1. Verifique se todas as rotas estão corretas
2. Verifique se o build foi bem-sucedido
3. Limpe o cache do Vercel e faça um novo deploy

## 📝 Checklist de Deploy

- [ ] Repositório conectado ao Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Primeiro deploy realizado
- [ ] Site carregando corretamente
- [ ] Meta Pixel funcionando
- [ ] Cookies consent funcionando
- [ ] Todas as rotas testadas
- [ ] Domínio customizado configurado (se aplicável)

## 🔗 Links Úteis

- [Documentação do Vercel](https://vercel.com/docs)
- [Next.js no Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Variáveis de Ambiente no Vercel](https://vercel.com/docs/environment-variables)
- [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)

## ✅ Status Atual

- ✅ Código no GitHub
- ✅ Build testado localmente
- ✅ ESLint sem erros
- ✅ TypeScript sem erros
- ⏳ Aguardando configuração no Vercel

