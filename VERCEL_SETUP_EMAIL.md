# Configuração de Email no Vercel

Este documento contém instruções para configurar o sistema de cadência de emails no Vercel.

## 1. Variáveis de Ambiente no Vercel

Acesse: https://vercel.com/dashboard → Seu Projeto → Settings → Environment Variables

### Variáveis Obrigatórias

```
RESEND_API_KEY = re_xxxxxxxxxxxxx
```
- Obtenha em: https://resend.com/api-keys
- Configure para: Production, Preview, Development

### Variáveis Opcionais (com valores padrão)

```
FROM_EMAIL = noreply@mundopodium.com.br
GOOGLE_MEET_LINK = https://meet.google.com/awb-vxqu-xnm
GOOGLE_MEET_PHONE = (BR) +55 21 4560-7556
GOOGLE_MEET_PIN = 523 187 755#
GOOGLE_MEET_PHONE_LINK = https://tel.meet/awb-vxqu-xnm?pin=4122161251082
EMAIL_CRON_SECRET = [gerar token aleatório seguro]
```

**Importante**: Selecione todos os ambientes (Production, Preview, Development) para cada variável.

## 2. Cron Job Configurado

O arquivo `vercel.json` já está configurado com um cron job que executa diariamente às 9h UTC (6h BRT).

### Horário do Cron

- **Atual**: `0 9 * * *` = 9h UTC = 6h BRT
- **Para alterar**: Edite `vercel.json` e ajuste o schedule

### Exemplos de Horários

- `0 10 * * *` = 10h UTC = 7h BRT
- `0 12 * * *` = 12h UTC = 9h BRT
- `0 14 * * *` = 14h UTC = 11h BRT

## 3. Segurança do Cron Job

O endpoint `/api/email/check-scheduled` aceita autenticação opcional:

- Se `EMAIL_CRON_SECRET` estiver configurado, o endpoint exige autenticação
- Se não estiver configurado, permite acesso (Vercel Cron não envia headers customizados)
- **Recomendado**: Configure `EMAIL_CRON_SECRET` para maior segurança

## 4. Deploy

Após configurar as variáveis:

1. Faça commit das mudanças
2. Faça push para o repositório
3. O Vercel fará deploy automaticamente
4. As variáveis estarão disponíveis

## 5. Verificar Funcionamento

### Testar Manualmente

```bash
# Verificar emails agendados
curl https://seu-dominio.vercel.app/api/email/check-scheduled

# Enviar email imediato (substitua CHARGE_ID)
curl -X POST https://seu-dominio.vercel.app/api/email/send \
  -H "Content-Type: application/json" \
  -d '{"chargeId": "CHARGE_ID", "type": "immediate"}'
```

### Verificar Logs

1. Acesse: Vercel Dashboard → Deployments
2. Selecione o deploy mais recente
3. Vá em Functions → Logs
4. Procure por mensagens de email enviado ou erros

## 6. Cadência de Emails

O sistema envia 3 emails automaticamente:

1. **Email Imediato**: Quando pagamento é confirmado (via webhook ou página de obrigado)
2. **Email 1 Dia Antes**: 25 de novembro de 2025 (disparado pelo cron job)
3. **Email no Dia**: 26 de novembro de 2025, pela manhã (disparado pelo cron job)

## 7. Atualizar Link do Google Meet

Se o link da sala mudar:

1. Acesse Vercel Dashboard → Settings → Environment Variables
2. Atualize `GOOGLE_MEET_LINK` (e outros campos relacionados se necessário)
3. Faça um novo deploy ou aguarde o próximo deploy automático

## 8. Troubleshooting

### Emails não estão sendo enviados

1. Verifique se `RESEND_API_KEY` está configurado
2. Verifique os logs no Vercel
3. Verifique se o domínio está verificado no Resend
4. Teste manualmente chamando `/api/email/send`

### Cron job não está executando

1. Verifique se `vercel.json` está no repositório
2. Verifique se o cron está ativo no Vercel Dashboard → Settings → Cron Jobs
3. Verifique os logs do cron job

### Erro de autenticação

1. Se configurou `EMAIL_CRON_SECRET`, verifique se está correto
2. Se não configurou, o endpoint funciona sem autenticação (menos seguro)

## 9. Próximos Passos

1. ✅ Configurar variáveis de ambiente no Vercel
2. ✅ Verificar domínio no Resend
3. ✅ Fazer deploy
4. ✅ Testar envio de email
5. ✅ Monitorar logs




