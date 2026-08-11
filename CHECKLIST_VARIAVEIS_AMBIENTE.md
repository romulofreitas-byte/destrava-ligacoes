# Checklist de Variáveis de Ambiente - Vercel

Este documento contém um checklist completo de todas as variáveis de ambiente necessárias para o funcionamento correto do sistema de e-mails e pagamentos.

## 📋 Como Configurar no Vercel

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Para cada variável:
   - Clique em **Add New**
   - Insira o **Name** (nome da variável)
   - Insira o **Value** (valor da variável)
   - **IMPORTANTE:** Selecione **Production, Preview, Development**
   - Clique em **Save**

## ✅ Variáveis Obrigatórias

### 1. RESEND_API_KEY

**Descrição:** Chave da API do Resend para envio de e-mails

**Como obter:**
1. Acesse [Resend Dashboard](https://resend.com/api-keys)
2. Clique em **Create API Key**
3. Copie a chave gerada

**Formato:** `re_xxxxxxxxxxxxxxxxxxxxx`

**Status:** 
- [ ] Configurada no Vercel
- [ ] Testada com health check

---

### 2. PAGBANK_TOKEN

**Descrição:** Token de autenticação do PagBank para processar pagamentos

**Como obter:**
1. Acesse [PagBank Dashboard](https://pagseguro.uol.com.br/)
2. Vá em **Venda online** → **Integrações** → **Tokens**
3. Copie o token de produção

**Formato:** `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

**Status:**
- [ ] Configurada no Vercel
- [ ] Testada com pagamento

---

### 3. NEXT_PUBLIC_SUPABASE_URL

**Descrição:** URL do projeto Supabase

**Como obter:**
1. Acesse [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie a **Project URL**

**Formato:** `https://xxxxxxxxxxxxx.supabase.co`

**Status:**
- [ ] Configurada no Vercel
- [ ] Testada com consulta ao banco

---

### 4. SUPABASE_SERVICE_ROLE_KEY

**Descrição:** Chave de serviço do Supabase (permite bypass de RLS)

**Como obter:**
1. Acesse [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie a **service_role** key (não a anon key!)

**Formato:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**⚠️ ATENÇÃO:** Esta é uma chave sensível! Nunca exponha no código do cliente.

**Status:**
- [ ] Configurada no Vercel
- [ ] Testada com inserção no banco

---

## 🔧 Variáveis Opcionais (com valores padrão)

### 5. FROM_EMAIL

**Descrição:** E-mail remetente dos e-mails

**Valor padrão:** `noreply@pitstop.mundopodium.com.br`

**Quando configurar:** Se quiser usar um e-mail diferente (deve ser verificado no Resend)

**Formato:** `seu@dominio.com`

**Status:**
- [ ] Configurada no Vercel (opcional)
- [ ] Domínio verificado no Resend

---

### 6. PAGBANK_ENVIRONMENT

**Descrição:** Ambiente do PagBank (sandbox ou production)

**Valor padrão:** `production`

**Valores possíveis:**
- `sandbox` - Para testes
- `production` - Para produção

**Status:**
- [ ] Configurada no Vercel (opcional)

---

### 7. GOOGLE_MEET_LINK

**Descrição:** Link da sala do Google Meet para o workshop

**Valor padrão:** `https://meet.google.com/awb-vxqu-xnm`

**Quando configurar:** Se o link da sala mudar

**Formato:** `https://meet.google.com/xxx-xxxx-xxx`

**Status:**
- [ ] Configurada no Vercel (opcional)

---

### 8. GOOGLE_MEET_PHONE

**Descrição:** Telefone para acesso ao Google Meet

**Valor padrão:** `(BR) +55 21 4560-7556`

**Status:**
- [ ] Configurada no Vercel (opcional)

---

### 9. GOOGLE_MEET_PIN

**Descrição:** PIN para acesso ao Google Meet por telefone

**Valor padrão:** `523 187 755#`

**Status:**
- [ ] Configurada no Vercel (opcional)

---

### 10. GOOGLE_MEET_PHONE_LINK

**Descrição:** Link direto para ligar para o Google Meet

**Valor padrão:** `https://tel.meet/awb-vxqu-xnm?pin=4122161251082`

**Status:**
- [ ] Configurada no Vercel (opcional)

---

### 11. EMAIL_CRON_SECRET

**Descrição:** Token secreto para proteger o endpoint de cron job de e-mails

**Como gerar:**
```bash
# No terminal
openssl rand -base64 32
```

**Quando configurar:** Para maior segurança do endpoint de cron

**Status:**
- [ ] Configurada no Vercel (opcional)

---

### 12. ADMIN_PASSWORD

**Descrição:** Senha de acesso ao painel `/admin/acessos` (mínimo 8 caracteres)

**Quando configurar:** Obrigatória para usar o relatório de acessos

**Status:**
- [ ] Configurada no Vercel
- [ ] Testada em `/admin/login`

---

### 13. VERCEL_TOKEN / VERCEL_PROJECT_ID / VERCEL_TEAM_ID (opcional)

**Descrição:** Credenciais para exibir totais oficiais do Vercel Web Analytics em `/admin/acessos`

**Status:**
- [ ] Configurada no Vercel (opcional)

---

## 📊 Setup do relatório de acessos (`/admin/acessos`)

1. Execute `supabase-site-pageviews-schema.sql` no SQL Editor do Supabase
2. Configure `ADMIN_PASSWORD` no Vercel (e localmente em `.env.local`)
3. Acesse `/admin/acessos` e faça login
4. Pageviews só são gravados após o visitante aceitar cookies de analytics

## 🧪 Teste de Configuração

Após configurar todas as variáveis obrigatórias, execute este teste:

### 1. Health Check

```bash
curl https://seu-dominio.vercel.app/api/email/health
```

**Resultado esperado:**
```json
{
  "overall": "healthy",
  "checks": {
    "resendApiKey": true,
    "resendConnection": true,
    "fromEmail": true
  }
}
```

### 2. Teste de E-mail

```bash
curl -X POST https://seu-dominio.vercel.app/api/email/health \
  -H "Content-Type: application/json" \
  -d '{"email": "seu@email.com"}'
```

**Resultado esperado:**
```json
{
  "success": true,
  "message": "Email de teste enviado com sucesso",
  "messageId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

### 3. Teste de Webhook

```bash
curl -X POST https://seu-dominio.vercel.app/api/pagamento/webhook \
  -H "Content-Type: application/json" \
  -d '{"charge_id": "CHARGE_ID_DE_TESTE"}'
```

## 📝 Checklist Final

Antes de considerar a configuração completa, verifique:

- [ ] Todas as variáveis obrigatórias estão configuradas
- [ ] Variáveis estão configuradas para **Production, Preview, Development**
- [ ] Health check retorna "healthy"
- [ ] E-mail de teste foi recebido
- [ ] Webhook responde corretamente
- [ ] Domínio está verificado no Resend
- [ ] Webhook está configurado no PagBank
- [ ] Teste de pagamento completo foi realizado
- [ ] Logs do Vercel não mostram erros

## 🔄 Após Adicionar/Modificar Variáveis

**IMPORTANTE:** Após adicionar ou modificar variáveis de ambiente no Vercel:

1. Faça um novo deploy:
   ```bash
   git commit --allow-empty -m "Trigger deploy após atualizar env vars"
   git push
   ```

2. Ou force um redeploy no Vercel Dashboard:
   - Vá em **Deployments**
   - Clique nos 3 pontos do último deploy
   - Clique em **Redeploy**

3. Aguarde o deploy completar (2-3 minutos)

4. Teste novamente com o health check

## 🚨 Troubleshooting

### Variável não está sendo reconhecida

**Sintomas:** Logs mostram "variável não configurada" mesmo após adicionar

**Solução:**
1. Verifique se selecionou **Production, Preview, Development**
2. Force um redeploy
3. Aguarde alguns minutos para propagação
4. Limpe o cache do Vercel (Settings → Advanced → Clear Cache)

### E-mail não está sendo enviado

**Sintomas:** Health check retorna "unhealthy"

**Solução:**
1. Verifique se `RESEND_API_KEY` está correta
2. Verifique se o domínio está verificado no Resend
3. Teste manualmente com curl
4. Verifique logs do Vercel para erros específicos

### Webhook não está funcionando

**Sintomas:** Pagamentos não disparam e-mails

**Solução:**
1. Verifique se `PAGBANK_TOKEN` está correta
2. Verifique se webhook está configurado no PagBank
3. Teste manualmente com curl
4. Verifique logs do Vercel para ver se webhook está sendo chamado

## 📚 Documentos Relacionados

- [MONITORAMENTO_EMAIL.md](./MONITORAMENTO_EMAIL.md) - Guia de monitoramento
- [VERCEL_SETUP_EMAIL.md](./VERCEL_SETUP_EMAIL.md) - Setup detalhado no Vercel
- [PAGBANK_SETUP.md](./PAGBANK_SETUP.md) - Configuração do PagBank
- [ENV_VARIABLES.md](./ENV_VARIABLES.md) - Documentação original de variáveis

## ✅ Status Geral

- [ ] Todas as variáveis obrigatórias configuradas
- [ ] Todas as variáveis testadas
- [ ] Sistema de e-mails funcionando
- [ ] Sistema de pagamentos funcionando
- [ ] Monitoramento ativo
- [ ] Documentação atualizada



