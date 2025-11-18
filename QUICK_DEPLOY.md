# ⚡ Deploy Rápido no Vercel

## ✅ Você já está logado no Vercel!

Usuário: `mundopodium-5669`

## 🚀 Opção 1: Deploy Rápido via CLI

Execute no terminal:

```powershell
vercel --prod
```

**Na primeira vez**, você precisará:
1. Escolher o escopo (selecione sua conta)
2. Linkar ao projeto existente ou criar novo
3. Confirmar as configurações

## ⚙️ Opção 2: Configurar Variáveis ANTES do Deploy

Se quiser configurar as variáveis primeiro:

```powershell
# Meta Pixel ID
echo 2971488916372606 | vercel env add NEXT_PUBLIC_META_PIXEL_ID production
echo 2971488916372606 | vercel env add NEXT_PUBLIC_META_PIXEL_ID preview
echo 2971488916372606 | vercel env add NEXT_PUBLIC_META_PIXEL_ID development
```

Depois faça o deploy:
```powershell
vercel --prod
```

## 🌐 Opção 3: Via Dashboard (Mais Fácil)

1. Acesse: https://vercel.com/new
2. Selecione o repositório: `romulofreitas-byte/destrava-ligacoes`
3. Configure as variáveis:
   - `NEXT_PUBLIC_META_PIXEL_ID` = `2971488916372606`
4. Clique em **Deploy**

## 📝 Variáveis de Ambiente Necessárias

### Obrigatória:
- `NEXT_PUBLIC_META_PIXEL_ID` = `2971488916372606`

### Opcional (configurar após primeiro deploy):
- `NEXT_PUBLIC_BASE_URL` = URL do seu site (ex: `https://destrava-ligacoes.vercel.app`)

## ✅ Após o Deploy

1. Anote a URL fornecida pelo Vercel
2. Configure `NEXT_PUBLIC_BASE_URL` com essa URL
3. Teste o site
4. Verifique se Meta Pixel está funcionando

---

**Recomendação**: Use a **Opção 3 (Dashboard)** para a primeira vez, é mais visual e fácil de configurar as variáveis.

