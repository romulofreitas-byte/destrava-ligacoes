# ⚡ Deploy Rápido - Checklist

## ✅ Build Local OK
O build foi testado e está funcionando corretamente!

## 🔴 AÇÃO NECESSÁRIA: Configurar Variáveis no Vercel

Antes de fazer deploy, adicione estas variáveis em **Vercel Dashboard > Settings > Environment Variables**:

### Variáveis Obrigatórias

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Valor: `https://wmsxiuxscmogbechxlty.supabase.co`
   - Environments: Production, Preview, Development

2. **SUPABASE_SERVICE_ROLE_KEY**
   - Valor: `sb_secret_vwvqpLQjJc9emNES5-JZYw_YFBrLnrO`
   - Environments: Production, Preview, Development

3. **PAGBANK_TOKEN**
   - Valor: (seu token atual)
   - Environments: Production, Preview, Development

4. **RESEND_API_KEY**
   - Valor: (sua chave atual)
   - Environments: Production, Preview, Development

5. **NEXT_PUBLIC_META_PIXEL_ID**
   - Valor: `687023637552068`
   - Environments: Production, Preview, Development

### Variáveis Opcionais

6. **NEXT_PUBLIC_BASE_URL**
   - Valor: `https://destrava-ligacoes.vercel.app`
   - Environments: Production, Preview, Development

## 🚀 Como Fazer Deploy

### Opção 1: Deploy Automático (Recomendado)
1. Faça commit e push das alterações:
   ```bash
   git add .
   git commit -m "feat: integração Supabase para workshop"
   git push
   ```
2. O Vercel fará deploy automaticamente

### Opção 2: Deploy Manual
1. Acesse [vercel.com](https://vercel.com)
2. Vá no projeto
3. Clique em **Deployments** → **Redeploy** (último deploy)

## ✅ Verificação Pós-Deploy

Após o deploy, verifique:
- [ ] Site carrega sem erros
- [ ] Logs não mostram "Supabase não configurado"
- [ ] Testar criação de pagamento
- [ ] Verificar dados no Supabase

## 📖 Guia Completo

Para instruções detalhadas, veja: **DEPLOY_VERCEL_ATUALIZADO.md**

