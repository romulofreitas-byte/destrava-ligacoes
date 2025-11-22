# Variáveis de Ambiente Necessárias

Para que a integração com Supabase funcione corretamente, adicione as seguintes variáveis ao arquivo `.env.local` na raiz do projeto:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://wmsxiuxscmogbechxlty.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sb_secret_vwvqpLQjJc9emNES5-JZYw_YFBrLnrO
```

## Descrição das Variáveis

- **NEXT_PUBLIC_SUPABASE_URL**: URL do projeto Supabase (Project URL)
- **SUPABASE_SERVICE_ROLE_KEY**: Chave secreta do Supabase (Secret Key) - usada para operações server-side que precisam bypassar Row Level Security (RLS)

## Importante

⚠️ **Nunca commite o arquivo `.env.local` no Git!** Ele já está no `.gitignore` por padrão.

⚠️ A `SUPABASE_SERVICE_ROLE_KEY` é uma chave sensível que permite acesso completo ao banco de dados. Mantenha-a segura e nunca a exponha no código do cliente.

## Verificação

Após adicionar as variáveis, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

Os logs do servidor mostrarão um aviso se o Supabase não estiver configurado corretamente.
