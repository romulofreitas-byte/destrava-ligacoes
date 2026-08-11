# Variáveis de Ambiente Necessárias

Para que a integração com Supabase funcione corretamente, adicione as seguintes variáveis ao arquivo `.env.local` na raiz do projeto:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://wmsxiuxscmogbechxlty.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

## Descrição das Variáveis

- **NEXT_PUBLIC_SUPABASE_URL**: URL do projeto Supabase (Project URL)
- **SUPABASE_SERVICE_ROLE_KEY**: Chave secreta do Supabase (Secret Key) - usada para operações server-side que precisam bypassar Row Level Security (RLS)

## Importante

⚠️ **Nunca commite o arquivo `.env.local` no Git!** Ele já está no `.gitignore` por padrão.

⚠️ A `SUPABASE_SERVICE_ROLE_KEY` é uma chave sensível que permite acesso completo ao banco de dados. Mantenha-a segura e nunca a exponha no código do cliente.

## Segurança da API (obrigatório em produção)

```env
# Protege rotas admin de e-mail / guests / testes / upsert
ADMIN_API_SECRET=gere-um-token-longo-aleatorio

# Cron de e-mails agendados (Vercel Cron: Authorization Bearer)
EMAIL_CRON_SECRET=gere-outro-token-longo
# Ou use o CRON_SECRET nativo da Vercel
# CRON_SECRET=

# Opcional — valida header do webhook PagBank
# PAGBANK_WEBHOOK_SECRET=

# Opcional — HMAC do webhook Efí (obrigatório em prod se usar Efí)
# EFI_WEBHOOK_SECRET=

# Google Meet (sem defaults no código — configure no Vercel)
GOOGLE_MEET_LINK=
GOOGLE_MEET_PHONE=
GOOGLE_MEET_PIN=
GOOGLE_MEET_PHONE_LINK=
```

⚠️ **Rotacione** qualquer chave que já tenha aparecido em commits/docs (Supabase service role, Resend, PagBank).

## Relatório de acessos (`/admin/acessos`)

```env
ADMIN_PASSWORD=sua-senha-forte-aqui
# Opcional — totais oficiais do Vercel Web Analytics
# VERCEL_TOKEN=
# VERCEL_PROJECT_ID=
# VERCEL_TEAM_ID=
```

Também execute `supabase-site-pageviews-schema.sql` no Supabase.

## Verificação

Após adicionar as variáveis, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

Os logs do servidor mostrarão um aviso se o Supabase não estiver configurado corretamente.
