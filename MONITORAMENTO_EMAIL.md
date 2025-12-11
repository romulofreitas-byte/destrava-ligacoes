# Monitoramento e Troubleshooting de E-mails

Este documento fornece instruções detalhadas sobre como monitorar o sistema de envio de e-mails e resolver problemas comuns.

## 🔍 Como Verificar se os E-mails Estão Sendo Enviados

### 1. Verificar Logs no Vercel

1. Acesse o [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Deployments** → Selecione o deploy mais recente
4. Clique em **Functions** → **Logs**
5. Procure por:
   - `🔔 ===== WEBHOOK RECEBIDO =====` - Indica que o webhook do PagBank foi chamado
   - `📧 ===== INICIANDO ENVIO DE EMAIL =====` - Indica tentativa de envio
   - `✅ ===== EMAIL ENVIADO COM SUCESSO =====` - Confirma envio bem-sucedido
   - `❌ ===== FALHA AO ENVIAR EMAIL =====` - Indica falha no envio

### 2. Usar o Endpoint de Health Check

Acesse o endpoint de health check para verificar a configuração:

```bash
# Verificar status geral
curl https://seu-dominio.vercel.app/api/email/health

# Enviar email de teste
curl -X POST https://seu-dominio.vercel.app/api/email/health \
  -H "Content-Type: application/json" \
  -d '{"email": "seu@email.com"}'
```

**Resposta esperada (healthy):**
```json
{
  "timestamp": "2024-12-05T21:00:00.000Z",
  "checks": {
    "resendApiKey": true,
    "resendConnection": true,
    "fromEmail": true
  },
  "details": {
    "resendApiKey": "Configurada",
    "fromEmail": "noreply@pitstop.mundopodium.com.br",
    "resendConnection": "Conexão OK"
  },
  "overall": "healthy"
}
```

### 3. Verificar Supabase

Acesse o [Supabase Dashboard](https://supabase.com/dashboard) e verifique a tabela `workshop_registrations`:

```sql
SELECT 
  charge_id,
  email,
  nome,
  status,
  email_sent,
  created_at,
  paid_at
FROM workshop_registrations
WHERE status = 'PAID'
ORDER BY created_at DESC
LIMIT 10;
```

A coluna `email_sent` deve ser `true` para pagamentos confirmados.

## 🚨 Problemas Comuns e Soluções

### Problema 1: E-mails não estão sendo enviados

**Sintomas:**
- Logs mostram `❌ RESEND_API_KEY não configurado`
- Health check retorna `"resendApiKey": false`

**Solução:**
1. Acesse Vercel Dashboard → Settings → Environment Variables
2. Adicione `RESEND_API_KEY` com o valor da sua API key do Resend
3. **IMPORTANTE:** Selecione **Production, Preview, Development**
4. Faça um novo deploy ou aguarde o próximo deploy automático

### Problema 2: Webhook não está sendo chamado

**Sintomas:**
- Logs não mostram `🔔 ===== WEBHOOK RECEBIDO =====`
- Pagamento é confirmado mas nenhum log aparece

**Solução:**
1. Verifique se o webhook está configurado no painel do PagBank:
   - URL: `https://seu-dominio.vercel.app/api/pagamento/webhook`
   - Eventos: `CHARGE.PAID`, `CHARGE.CANCELLED`, `CHARGE.DECLINED`
2. Certifique-se de que a URL está acessível publicamente (HTTPS)
3. Teste manualmente:
   ```bash
   curl -X POST https://seu-dominio.vercel.app/api/pagamento/webhook \
     -H "Content-Type: application/json" \
     -d '{"charge_id": "SEU_CHARGE_ID"}'
   ```

### Problema 3: E-mail enviado mas não chega na caixa de entrada

**Sintomas:**
- Logs mostram `✅ EMAIL ENVIADO COM SUCESSO`
- Cliente não recebe o e-mail

**Solução:**
1. Peça ao cliente para verificar a **caixa de spam**
2. Verifique se o domínio está verificado no Resend:
   - Acesse [Resend Dashboard](https://resend.com/domains)
   - Confirme que `pitstop.mundopodium.com.br` está verificado
3. Verifique os logs do Resend:
   - Acesse [Resend Logs](https://resend.com/emails)
   - Procure pelo e-mail usando o Message ID dos logs

### Problema 4: Erro "domain not verified"

**Sintomas:**
- Logs mostram erro relacionado a domínio não verificado

**Solução:**
1. Acesse [Resend Dashboard](https://resend.com/domains)
2. Verifique se `pitstop.mundopodium.com.br` está na lista
3. Se não estiver, adicione o domínio
4. Configure os registros DNS conforme instruções do Resend
5. Aguarde a verificação (pode levar até 48h)

### Problema 5: Timeout ao enviar e-mail

**Sintomas:**
- Logs mostram timeout ou demora excessiva
- Função serverless atinge limite de tempo

**Solução:**
- O sistema já possui retry automático (3 tentativas)
- Se o problema persistir, verifique:
  1. Status da API do Resend: https://resend.com/status
  2. Logs detalhados no Vercel para identificar gargalos
  3. Considere aumentar o timeout da função no `vercel.json`

## 📊 Métricas Importantes

### Taxa de Sucesso de E-mails

Para calcular a taxa de sucesso, compare:
- Total de pagamentos confirmados (status = 'PAID' no Supabase)
- Total de e-mails enviados (email_sent = true no Supabase)

```sql
SELECT 
  COUNT(*) as total_pagamentos,
  SUM(CASE WHEN email_sent = true THEN 1 ELSE 0 END) as emails_enviados,
  ROUND(SUM(CASE WHEN email_sent = true THEN 1 ELSE 0 END)::numeric / COUNT(*) * 100, 2) as taxa_sucesso
FROM workshop_registrations
WHERE status = 'PAID';
```

**Meta:** Taxa de sucesso > 95%

### Tempo de Envio

Monitore o tempo entre pagamento confirmado e e-mail enviado:

```sql
SELECT 
  charge_id,
  email,
  paid_at,
  created_at,
  EXTRACT(EPOCH FROM (created_at - paid_at)) as segundos_ate_email
FROM workshop_registrations
WHERE status = 'PAID' AND email_sent = true
ORDER BY created_at DESC
LIMIT 10;
```

**Meta:** E-mail enviado em < 10 segundos após pagamento

## 🔧 Ferramentas de Diagnóstico

### Script de Teste Rápido

Execute este comando para testar todo o fluxo:

```bash
# 1. Verificar health check
echo "=== Health Check ==="
curl https://seu-dominio.vercel.app/api/email/health

# 2. Enviar email de teste
echo "\n\n=== Enviando Email de Teste ==="
curl -X POST https://seu-dominio.vercel.app/api/email/health \
  -H "Content-Type: application/json" \
  -d '{"email": "seu@email.com"}'
```

### Reenviar E-mail Manualmente

Se um cliente não recebeu o e-mail, você pode reenviar manualmente:

```bash
curl -X POST https://seu-dominio.vercel.app/api/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "chargeId": "CHARGE_ID_DO_PAGAMENTO",
    "type": "immediate"
  }'
```

Ou use o script Node.js:

```bash
cd scripts
node send-confirmation-email.js
```

## 📝 Checklist de Monitoramento Diário

- [ ] Verificar logs do Vercel para erros
- [ ] Verificar taxa de sucesso de e-mails no Supabase
- [ ] Verificar se há pagamentos sem e-mail enviado
- [ ] Testar health check endpoint
- [ ] Verificar status do Resend (https://resend.com/status)

## 📞 Quando Escalar para Suporte

Entre em contato com suporte técnico se:

1. Taxa de sucesso de e-mails < 90% por mais de 24h
2. Webhook não está sendo chamado por mais de 1 hora
3. Health check retorna "unhealthy" por mais de 30 minutos
4. Múltiplos clientes reportam não receber e-mails
5. Logs mostram erros desconhecidos ou críticos

## 🔐 Variáveis de Ambiente Necessárias

Certifique-se de que todas essas variáveis estão configuradas no Vercel:

### Obrigatórias

- `RESEND_API_KEY` - Chave da API Resend
- `PAGBANK_TOKEN` - Token do PagBank
- `NEXT_PUBLIC_SUPABASE_URL` - URL do Supabase
- `SUPABASE_SERVICE_ROLE_KEY` - Chave do Supabase

### Opcionais (com valores padrão)

- `FROM_EMAIL` - E-mail remetente (padrão: `noreply@pitstop.mundopodium.com.br`)
- `PAGBANK_ENVIRONMENT` - Ambiente (padrão: `production`)
- `GOOGLE_MEET_LINK` - Link do Google Meet
- `GOOGLE_MEET_PHONE` - Telefone do Google Meet
- `GOOGLE_MEET_PIN` - PIN do Google Meet

## 📚 Recursos Adicionais

- [Documentação do Resend](https://resend.com/docs)
- [Documentação do PagBank](https://dev.pagbank.uol.com.br/)
- [Documentação do Supabase](https://supabase.com/docs)
- [Logs do Vercel](https://vercel.com/docs/observability/runtime-logs)

## 🆘 Contatos de Emergência

- **Resend Support:** support@resend.com
- **PagBank Support:** https://pagseguro.uol.com.br/atendimento
- **Vercel Support:** https://vercel.com/support



