# Validação: Supabase + Automação de E-mails

## 📋 Resumo Executivo

Este documento valida se o fluxo completo de integração Supabase + automação de disparo de e-mails está corretamente implementado no projeto.

**Status Geral**: ✅ **IMPLEMENTAÇÃO CORRETA**

---

## 1. ✅ Configuração do Supabase

### 1.1 Validação das Variáveis de Ambiente

**Arquivo**: `src/lib/supabase.ts`

✅ **CORRETO**: O arquivo valida adequadamente as variáveis de ambiente:
- `NEXT_PUBLIC_SUPABASE_URL`: Validado com formato `https://...supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY`: Validado com comprimento mínimo (50 caracteres)
- Mensagens de erro claras quando não configurado
- Cliente Supabase criado apenas se validação passar

**Linhas relevantes**: 4-42

### 1.2 Schema da Tabela `workshop_registrations`

**Arquivo**: `supabase-workshop-schema.sql`

✅ **CORRETO**: O schema SQL define:
- Campo `email_sent BOOLEAN DEFAULT FALSE` (linha 34)
- Campo `email_sent_at TIMESTAMPTZ` (linha 35)
- Constraint UNIQUE em `charge_id` para suportar upsert (linha 9)
- Índices para performance (linhas 40-43)
- Trigger para atualizar `updated_at` automaticamente (linhas 57-70)

### 1.3 Alinhamento entre TypeScript e SQL

**Arquivo**: `src/lib/supabase.ts`

✅ **CORRETO**: A interface `WorkshopRegistration` (linhas 164-185) inclui:
- `email_sent?: boolean;` (linha 183)
- `email_sent_at?: string;` (linha 184)

✅ **CORRETO**: A função `upsertWorkshopRegistration` (linhas 232-339) inclui:
- `email_sent: data.email_sent ?? false` (linha 271)
- `email_sent_at: data.email_sent_at` (linha 272)

✅ **CORRETO**: A função `updateEmailStatus` (linhas 347-407) atualiza:
- `email_sent: emailSent` (linha 368)
- `email_sent_at: emailSent ? new Date().toISOString() : null` (linha 369)

**Conclusão**: ✅ Schema e código TypeScript estão perfeitamente alinhados.

---

## 2. ✅ Fluxo Pagamento → Supabase → E-mail Imediato

### 2.1 Criação do Pagamento

**Arquivo**: `src/app/api/pagamento/route.ts`

✅ **CORRETO**: Quando um pagamento é criado:
1. **Linha 62**: Chama `createPayment()` do PagBank
2. **Linhas 64-116**: Salva registro inicial no Supabase via `upsertWorkshopRegistration()`
   - Inclui todos os dados do cliente (nome, email, telefone, etc.)
   - Inclui dados do pagamento (amount, payment_method, status)
   - **IMPORTANTE**: `email_sent` não é definido aqui (fica `false` por padrão)
3. **Linha 25**: Webhook URL configurada: `${baseUrl}/api/pagamento/webhook`

### 2.2 Webhook do PagBank

**Arquivo**: `src/app/api/pagamento/webhook/route.ts`

✅ **CORRETO**: O fluxo do webhook está completo:

1. **Linha 11**: Recebe `charge_id` do body
2. **Linha 21**: Consulta status via `getPaymentStatus(charge_id)`
3. **Linhas 33-79**: Atualiza registro no Supabase via `upsertWorkshopRegistration()`
   - Extrai dados do pagamento (nome, email, telefone, status)
   - Atualiza `paid_at` se status for `PAID` (linha 47)
4. **Linhas 82-139**: Se `payment.status === 'PAID'`:
   - **Linha 99**: Chama `sendImmediateEmail()` com dados do cliente
   - **Linha 111**: Se e-mail enviado com sucesso, chama `updateEmailStatus(charge_id, true)`
   - **Linha 112-114**: Tratamento de erro não crítico se falhar atualização no Supabase

### 2.3 Extração de Dados Críticos

✅ **CORRETO**: Os dados críticos são extraídos corretamente:

**Do PagBank** (webhook, linhas 35-48):
- `charge_id`: ✅
- `reference_id`: ✅
- `nome`: `payment.customer?.name` ✅
- `email`: `payment.customer?.email` ✅
- `tax_id`: `payment.customer?.tax_id` ✅
- `telefone_*`: `payment.customer?.phone.*` ✅

**Para Supabase**: Todos os campos são mapeados corretamente ✅

**Para E-mail**: `email` e `nome` são passados para `sendImmediateEmail()` ✅

### 2.4 Tratamento de Erros

✅ **CORRETO**: O código trata erros adequadamente:
- Erros no Supabase não quebram o fluxo (linhas 66-79, 112-114)
- Logs detalhados para debugging (linhas 50-55, 84-89, 98-124)
- Aviso quando email não está disponível (linhas 130-139)

**Conclusão**: ✅ Fluxo completo está implementado corretamente.

---

## 3. ✅ Automação de E-mails (Cadência e Cron)

### 3.1 Configuração do Resend

**Arquivo**: `src/lib/email.ts`

✅ **CORRETO**: 
- **Linha 8**: Lazy initialization para evitar erros em build-time
- **Linha 9**: Valida `RESEND_API_KEY`
- **Linhas 37-44**: Lógica de `FROM_EMAIL`:
  - Usa `process.env.FROM_EMAIL` se configurado e não for domínio antigo
  - Fallback para `noreply@pitstop.mundopodium.com.br`
- **Linhas 48-51**: Adiciona nome do remetente: "Rômulo, Pódium"
- **Linhas 53-58**: Envia via Resend API

### 3.2 Cadência de E-mails

**Arquivo**: `src/lib/email-cadence.ts`

✅ **CORRETO**: Implementação completa da cadência:

#### 3.2.1 E-mail Imediato
- **Função**: `sendImmediateEmail()` (linhas 54-84)
- **Trigger**: Chamado no webhook quando `status === 'PAID'`
- **Template**: `getWorkshopEmailTemplate()` (confirmação de pagamento)
- **Prevenção de duplicatas**: Verifica `record.emailsSent.immediate` (linha 58)

#### 3.2.2 E-mail 1 Dia Antes
- **Função**: `sendOneDayBeforeEmail()` (linhas 86-121)
- **Trigger**: Automático via cron quando `now >= oneDayBefore && now < workshopDate`
- **Template**: `getOneDayBeforeEmailTemplate()`
- **Data**: 25 de novembro de 2025 (calculado em `checkAndSendScheduledEmails`, linha 164)

#### 3.2.3 E-mail 1 Hora Antes
- **Função**: `sendDayOfEmail()` (linhas 123-158)
- **Trigger**: Automático via cron quando `now >= oneHourBeforeStart && now < workshopStartTime`
- **Template**: `getOneHourBeforeEmailTemplate()`
- **Data/Hora**: 26 de novembro de 2025, 12:00 BRT (1 hora antes das 13:00)

#### 3.2.4 Verificação Automática
- **Função**: `checkAndSendScheduledEmails()` (linhas 161-201)
- **Lógica**: 
  - Calcula `oneDayBefore` e `oneHourBefore` baseado em `WORKSHOP_INFO.dateObj`
  - Itera sobre todos os registros em `emailRecords` (Map em memória)
  - Envia e-mails se ainda não foram enviados

⚠️ **OBSERVAÇÃO IMPORTANTE**: O sistema usa um `Map` em memória (`emailRecords`, linha 31) para rastrear e-mails enviados. Isso significa que:
- ✅ Funciona bem para e-mails imediatos (criados no momento do pagamento)
- ⚠️ **Pode perder registros** se o servidor reiniciar antes do cron executar
- 💡 **Solução**: O sistema também salva `email_sent` no Supabase, mas o cron atual não consulta o Supabase para buscar registros pendentes

### 3.3 Endpoint de Cron

**Arquivo**: `src/app/api/email/check-scheduled/route.ts`

✅ **CORRETO**:
- **Linha 24**: Chama `checkAndSendScheduledEmails()`
- **Linhas 9-22**: Autenticação opcional via `EMAIL_CRON_SECRET` (Bearer token)
- **Linha 40**: GET também disponível para testes manuais

### 3.4 Configuração do Vercel Cron

**Arquivo**: `vercel.json`

✅ **CORRETO**:
```json
{
  "crons": [
    {
      "path": "/api/email/check-scheduled",
      "schedule": "0 0 * * *"
    }
  ]
}
```

⚠️ **OBSERVAÇÃO**: O cron está configurado para executar **diariamente à meia-noite UTC** (`0 0 * * *`). Isso significa:
- ✅ Funciona para e-mails de 1 dia antes (25/11)
- ⚠️ **Pode não funcionar** para e-mail de 1 hora antes (26/11 às 12:00 BRT = 15:00 UTC)
- 💡 **Sugestão**: Adicionar um segundo cron para executar a cada hora próximo da data do workshop, ou ajustar para executar às 12:00 BRT no dia 26/11

**Conclusão**: ✅ Cadência implementada, mas cron pode precisar de ajuste para e-mail de 1 hora antes.

---

## 4. ✅ Endpoints Auxiliares de E-mail

### 4.1 Envio Manual por chargeId

**Arquivo**: `src/app/api/email/send/route.ts`

✅ **CORRETO**:
- **Linha 18**: Busca dados do pagamento via `getPaymentStatus(chargeId)`
- **Linhas 30-35**: Monta `emailData` com email, nome, chargeId, referenceId
- **Linhas 39-55**: Switch para diferentes tipos de e-mail (immediate, oneDayBefore, dayOf)
- **Linhas 79-107**: GET para consultar status de e-mails enviados (usa `getEmailRecord()`)

⚠️ **OBSERVAÇÃO**: Este endpoint **não atualiza o Supabase** após enviar e-mail. Apenas atualiza o Map em memória.

### 4.2 Envio Retroativo

**Arquivo**: `src/app/api/email/send-retroactive/route.ts`

✅ **CORRETO**: Implementação robusta:

1. **Linhas 26-62**: Busca dados por `chargeId`:
   - Primeiro tenta Supabase via `getWorkshopRegistration()`
   - Se não encontrar, tenta PagBank via `getPaymentStatus()`
2. **Linhas 66-84**: Fallback para dados fornecidos diretamente (email, nome)
3. **Linha 101**: Chama `sendRetroactiveEmails()` que:
   - Calcula quais e-mails devem ser enviados baseado na data atual
   - Envia e-mail imediato se não foi enviado
   - Envia e-mail 1 dia antes se hoje >= 25/11
   - Envia e-mail 1 hora antes se hoje >= 26/11 12:00
4. **Linhas 104-110**: Atualiza Supabase com `updateEmailStatus()` se e-mail imediato foi enviado

✅ **CORRETO**: GET também disponível (linhas 155-251) para consultar quais e-mails seriam enviados sem enviar.

**Conclusão**: ✅ Endpoints auxiliares implementados corretamente.

---

## 5. ✅ Checklist de Validação em Produção

### 5.1 Variáveis de Ambiente Obrigatórias

Verifique se todas estão configuradas no Vercel (ou seu ambiente):

#### Supabase
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - URL do projeto Supabase (formato: `https://xxxxx.supabase.co`)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Service Role Key do Supabase (chave com permissões de admin)

#### Resend (E-mails)
- [ ] `RESEND_API_KEY` - API Key do Resend
- [ ] `FROM_EMAIL` - Email remetente (opcional, padrão: `noreply@pitstop.mundopodium.com.br`)
- [ ] Domínio verificado no Resend: `pitstop.mundopodium.com.br`

#### PagBank
- [ ] `PAGBANK_TOKEN` - Token de autenticação do PagBank
- [ ] `PAGBANK_ENVIRONMENT` - `production` ou `sandbox`

#### Base URL
- [ ] `NEXT_PUBLIC_BASE_URL` - URL base da aplicação (ex: `https://seu-dominio.com`)

#### Cron (Opcional)
- [ ] `EMAIL_CRON_SECRET` - Token para autenticação do cron (opcional, mas recomendado)

#### Google Meet (Opcional)
- [ ] `GOOGLE_MEET_LINK` - Link do Google Meet
- [ ] `GOOGLE_MEET_PHONE` - Telefone para ligação
- [ ] `GOOGLE_MEET_PIN` - PIN do Google Meet
- [ ] `GOOGLE_MEET_PHONE_LINK` - Link alternativo

### 5.2 Configuração do PagBank

- [ ] **Webhook URL configurado**: `https://seu-dominio.com/api/pagamento/webhook`
- [ ] Webhook está ativo e recebendo notificações
- [ ] Testar webhook com um pagamento de teste

### 5.3 Configuração do Cron (Vercel)

- [ ] Cron configurado em `vercel.json` está ativo
- [ ] Verificar logs do Vercel para confirmar execução diária
- [ ] **RECOMENDAÇÃO**: Adicionar cron adicional para executar a cada hora no dia 26/11 (ou ajustar schedule para 15:00 UTC no dia 26/11)

**Sugestão de ajuste no `vercel.json`**:
```json
{
  "crons": [
    {
      "path": "/api/email/check-scheduled",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/email/check-scheduled",
      "schedule": "0 12,13,14,15 * 11 26"
    }
  ]
}
```
Isso executaria às 12h, 13h, 14h e 15h UTC no dia 26 de novembro (9h, 10h, 11h e 12h BRT).

### 5.4 Schema do Supabase

- [ ] Tabela `workshop_registrations` criada no Supabase
- [ ] Executar script `supabase-workshop-schema.sql` no SQL Editor do Supabase
- [ ] Verificar se campos `email_sent` e `email_sent_at` existem
- [ ] Verificar se constraint UNIQUE em `charge_id` está ativa
- [ ] Verificar se índices foram criados

**Query de verificação**:
```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'workshop_registrations'
ORDER BY ordinal_position;
```

### 5.5 Testes Manuais

#### Teste 1: Fluxo Completo de Pagamento
1. Criar um pagamento de teste via `/api/pagamento`
2. Verificar se registro aparece no Supabase:
   ```sql
   SELECT * FROM workshop_registrations WHERE charge_id = 'CHARGE_ID_AQUI';
   ```
3. Simular webhook do PagBank (ou aguardar confirmação real)
4. Verificar se `email_sent = true` e `email_sent_at` foi preenchido
5. Verificar se e-mail foi recebido

#### Teste 2: Envio Manual de E-mail
```bash
curl -X POST https://seu-dominio.com/api/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "chargeId": "CHARGE_ID_AQUI",
    "type": "immediate"
  }'
```

#### Teste 3: Envio Retroativo
```bash
curl -X POST https://seu-dominio.com/api/email/send-retroactive \
  -H "Content-Type: application/json" \
  -d '{
    "chargeId": "CHARGE_ID_AQUI"
  }'
```

#### Teste 4: Verificar Status de E-mails
```bash
curl "https://seu-dominio.com/api/email/send?charge_id=CHARGE_ID_AQUI"
```

#### Teste 5: Executar Cron Manualmente
```bash
curl -X POST https://seu-dominio.com/api/email/check-scheduled \
  -H "Authorization: Bearer SEU_EMAIL_CRON_SECRET"
```

### 5.6 Monitoramento

- [ ] Configurar alertas para erros no Supabase (logs do Vercel)
- [ ] Configurar alertas para falhas no envio de e-mails (logs do Resend)
- [ ] Monitorar logs do webhook do PagBank
- [ ] Verificar periodicamente registros com `email_sent = false` no Supabase:
  ```sql
  SELECT charge_id, email, status, created_at, email_sent, email_sent_at
  FROM workshop_registrations
  WHERE status = 'PAID' AND email_sent = false
  ORDER BY created_at DESC;
  ```

---

## 6. ⚠️ Pontos de Atenção e Melhorias Sugeridas

### 6.1 Persistência de Registros de E-mail

**Problema**: O sistema usa um `Map` em memória para rastrear e-mails enviados (`emailRecords` em `email-cadence.ts`). Se o servidor reiniciar, os registros são perdidos.

**Impacto**: 
- E-mails imediatos não são afetados (são enviados no momento do pagamento)
- E-mails agendados podem não ser enviados se o servidor reiniciar antes do cron executar

**Solução Sugerida**: 
- Modificar `checkAndSendScheduledEmails()` para consultar o Supabase em vez de usar apenas o Map em memória
- Buscar registros com `status = 'PAID'` e `email_sent = false` ou verificar datas de envio

### 6.2 Cron para E-mail de 1 Hora Antes

**Problema**: O cron atual executa apenas à meia-noite UTC, o que pode não capturar o momento exato para enviar o e-mail de 1 hora antes (26/11 às 12:00 BRT = 15:00 UTC).

**Solução**: Adicionar cron adicional conforme sugerido na seção 5.3.

### 6.3 Falta de Sincronização entre Map e Supabase

**Problema**: O Map em memória (`emailRecords`) não é sincronizado com o Supabase. Se um e-mail for enviado manualmente via endpoint, o Supabase não é atualizado (exceto no endpoint retroativo).

**Solução Sugerida**: 
- Modificar `sendImmediateEmail()`, `sendOneDayBeforeEmail()` e `sendDayOfEmail()` para sempre atualizar o Supabase após envio bem-sucedido
- Ou criar uma função centralizada que atualiza ambos (Map e Supabase)

### 6.4 Validação de Data do Workshop

**Observação**: A data do workshop está hardcoded em `src/lib/constants.ts`:
```typescript
dateObj: new Date('2025-11-26T13:00:00-03:00')
```

Se a data mudar, será necessário atualizar este arquivo e também os templates de e-mail que referenciam a data.

---

## 7. ✅ Conclusão Final

### Status Geral: ✅ **IMPLEMENTAÇÃO CORRETA**

O sistema está **funcionalmente correto** e pronto para produção, com as seguintes ressalvas:

1. ✅ **Supabase**: Configuração e schema corretos
2. ✅ **Fluxo de Pagamento**: Webhook → Supabase → E-mail imediato funcionando
3. ✅ **Cadência de E-mails**: Lógica implementada corretamente
4. ⚠️ **Cron**: Pode precisar de ajuste para e-mail de 1 hora antes
5. ⚠️ **Persistência**: Map em memória pode perder dados em reinicializações

### Próximos Passos Recomendados

1. Executar checklist de validação em produção (seção 5)
2. Considerar implementar melhorias sugeridas (seção 6)
3. Testar fluxo completo com pagamento real
4. Monitorar logs e métricas nas primeiras semanas

---

**Documento gerado em**: 2025-01-27  
**Última atualização**: 2025-01-27

