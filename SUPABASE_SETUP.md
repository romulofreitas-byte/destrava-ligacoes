# Setup da Integração Supabase - Workshop

## Passos para Configuração

### 1. Criar a Tabela no Supabase

1. Acesse o [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto
3. Vá em **SQL Editor**
4. Execute o script SQL do arquivo `supabase-workshop-schema.sql`

Isso criará a tabela `workshop_registrations` com todos os campos necessários, índices e triggers.

### 2. Configurar Variáveis de Ambiente

Adicione as seguintes variáveis ao arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://wmsxiuxscmogbechxlty.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sb_secret_vwvqpLQjJc9emNES5-JZYw_YFBrLnrO
```

⚠️ **Importante**: Nunca commite o arquivo `.env.local` no Git!

### 3. Reiniciar o Servidor

Após configurar as variáveis, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Como Funciona

### Fluxo de Dados

1. **Criação do Pagamento** (`/api/pagamento`):
   - Quando um pagamento é criado, um registro inicial é salvo no Supabase
   - Status inicial: `PENDING`
   - Dados do cliente e informações do pagamento são armazenados

2. **Webhook do PagBank** (`/api/pagamento/webhook`):
   - Quando o PagBank notifica sobre mudanças no status do pagamento
   - O registro no Supabase é atualizado com o novo status
   - Se o pagamento for confirmado (`PAID`), o campo `paid_at` é preenchido
   - Quando o email é enviado, o campo `email_sent` é atualizado

### Estrutura da Tabela

A tabela `workshop_registrations` armazena:

- **Dados do Cliente**: nome, email, CPF/CNPJ, telefone
- **Dados do Pagamento**: charge_id, reference_id, status, valor, método de pagamento
- **Metadados**: timestamps, status de envio de email

### Tratamento de Erros

- Erros no Supabase **não quebram** o fluxo de pagamento
- Todos os erros são logados para debugging
- O sistema continua funcionando mesmo se o Supabase estiver indisponível

## Verificação

Para verificar se a integração está funcionando:

1. Verifique os logs do servidor ao criar um pagamento
2. Verifique os logs do webhook quando um pagamento é confirmado
3. Consulte a tabela `workshop_registrations` no Supabase

## Observações

- A tabela "Leads" existente **não é modificada**
- Todos os dados do workshop são salvos em `workshop_registrations`
- A integração é não-bloqueante (não interfere no fluxo de pagamento)





