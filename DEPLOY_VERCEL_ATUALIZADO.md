# 🚀 Deploy no Vercel - Guia Atualizado com Supabase

## ⚠️ IMPORTANTE: Variáveis de Ambiente

**ANTES DE FAZER O DEPLOY**, configure TODAS as variáveis de ambiente no Vercel!

## Método 1: Via Dashboard do Vercel (Recomendado)

### Passo 1: Acessar o Vercel
1. Acesse [https://vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Se o projeto já estiver conectado, vá direto para **Settings > Environment Variables**

### Passo 2: Configurar Variáveis de Ambiente

Vá em **Settings > Environment Variables** e adicione:

#### 🔴 Variáveis Obrigatórias

**1. Supabase URL**
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://wmsxiuxscmogbechxlty.supabase.co`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

**2. Supabase Service Role Key**
- **Name**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: `YOUR_SUPABASE_SERVICE_ROLE_KEY`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

**3. PagBank Token**
- **Name**: `PAGBANK_TOKEN`
- **Value**: (seu token do PagBank)
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

**4. Resend API Key**
- **Name**: `RESEND_API_KEY`
- **Value**: (sua chave do Resend)
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

**5. Meta Pixel ID**
- **Name**: `NEXT_PUBLIC_META_PIXEL_ID`
- **Value**: `687023637552068` (ou seu ID)
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### 🟡 Variáveis Opcionais (mas recomendadas)

**6. Base URL**
- **Name**: `NEXT_PUBLIC_BASE_URL`
- **Value**: `https://destrava-ligacoes.vercel.app` (ou seu domínio)
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

**7. Email From**
- **Name**: `FROM_EMAIL`
- **Value**: (email remetente, ex: `noreply@pitstop.mundopodium.com.br`)
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

**8. Email Cron Secret** (para agendamento de emails)
- **Name**: `EMAIL_CRON_SECRET`
- **Value**: (uma string secreta aleatória)
- **Environments**: ✅ Production

**9. PagBank Environment**
- **Name**: `PAGBANK_ENVIRONMENT`
- **Value**: `production` (ou `sandbox` para testes)
- **Environments**: ✅ Production

### Passo 3: Fazer Deploy

1. Vá em **Deployments**
2. Se já houver um deploy, clique nos **3 pontos** → **Redeploy**
3. Ou faça um novo commit e push para o GitHub (deploy automático)

### Passo 4: Verificar Deploy

Após o deploy, verifique:

- [ ] Site carrega corretamente
- [ ] Logs não mostram erros de Supabase
- [ ] Meta Pixel funciona
- [ ] Cookies consent aparece
- [ ] Todas as rotas funcionam

---

## Método 2: Via CLI do Vercel

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
# Supabase
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Digite: https://wmsxiuxscmogbechxlty.supabase.co
# Selecione: Production, Preview, Development

vercel env add SUPABASE_SERVICE_ROLE_KEY
# Digite: YOUR_SUPABASE_SERVICE_ROLE_KEY
# Selecione: Production, Preview, Development

# PagBank
vercel env add PAGBANK_TOKEN
# Digite: (seu token)
# Selecione: Production, Preview, Development

# Resend
vercel env add RESEND_API_KEY
# Digite: (sua chave)
# Selecione: Production, Preview, Development

# Meta Pixel
vercel env add NEXT_PUBLIC_META_PIXEL_ID
# Digite: 687023637552068
# Selecione: Production, Preview, Development

# Base URL (opcional)
vercel env add NEXT_PUBLIC_BASE_URL
# Digite: https://destrava-ligacoes.vercel.app
# Selecione: Production, Preview, Development
```

### Fazer Deploy
```bash
vercel --prod
```

---

## ✅ Checklist Completo de Deploy

### Antes do Deploy
- [ ] Tabela `workshop_registrations` criada no Supabase
- [ ] Todas as variáveis de ambiente configuradas no Vercel
- [ ] Build local funciona: `npm run build`

### Variáveis de Ambiente
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `PAGBANK_TOKEN`
- [ ] `RESEND_API_KEY`
- [ ] `NEXT_PUBLIC_META_PIXEL_ID`
- [ ] `NEXT_PUBLIC_BASE_URL` (opcional)
- [ ] `FROM_EMAIL` (opcional)
- [ ] `EMAIL_CRON_SECRET` (opcional)
- [ ] `PAGBANK_ENVIRONMENT` (opcional)

### Após o Deploy
- [ ] Site carrega corretamente
- [ ] Logs não mostram erros
- [ ] Testar criação de pagamento
- [ ] Verificar se dados são salvos no Supabase
- [ ] Meta Pixel funcionando
- [ ] Emails sendo enviados

---

## 🔧 Troubleshooting

### Erro: "Supabase não configurado"
- **Solução**: Verifique se `NEXT_PUBLIC_SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` estão configuradas
- **Solução**: Faça um novo deploy após adicionar as variáveis

### Build Falha
- Verifique os logs no dashboard do Vercel
- Certifique-se de que todas as variáveis estão configuradas
- Teste localmente: `npm run build`

### Dados não são salvos no Supabase
- Verifique se a tabela `workshop_registrations` existe no Supabase
- Verifique os logs do servidor no Vercel
- Confirme que `SUPABASE_SERVICE_ROLE_KEY` está correta

### Erro 500 nas APIs
- Verifique os logs no Vercel Dashboard > Functions
- Confirme que todas as variáveis de ambiente estão configuradas
- Verifique se as chaves de API estão válidas

---

## 📝 Próximos Passos Após Deploy

1. **Testar Fluxo Completo**
   - Criar um pagamento de teste
   - Verificar se dados são salvos no Supabase
   - Verificar se emails são enviados

2. **Configurar Domínio Customizado** (opcional)
   - Settings > Domains
   - Adicione seu domínio
   - Atualize `NEXT_PUBLIC_BASE_URL`

3. **Monitorar Logs**
   - Use o dashboard do Vercel para ver logs em tempo real
   - Monitore erros e avisos

---

## 🎉 Pronto!

Após configurar todas as variáveis e fazer o deploy, seu site estará no ar com integração completa ao Supabase!




















