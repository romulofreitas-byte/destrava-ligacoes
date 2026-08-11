# ⚡ Resumo Rápido - Setup Supabase

## 🎯 3 Passos Simples

### 1️⃣ Executar SQL no Supabase
```
1. Acesse: https://app.supabase.com
2. Projeto: wmsxiuxscmogbechxlty
3. SQL Editor → New Query
4. Cole o conteúdo de: supabase-workshop-schema.sql
5. Run (Ctrl+Enter)
```

### 2️⃣ Adicionar Variáveis no .env.local
Crie/edite o arquivo `.env.local` na raiz do projeto e adicione:

```env
NEXT_PUBLIC_SUPABASE_URL=https://wmsxiuxscmogbechxlty.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

### 3️⃣ Reiniciar o Servidor
```bash
npm run dev
```

---

## ✅ Como Saber se Funcionou?

1. **No Console do Servidor**: Não deve aparecer aviso sobre Supabase não configurado
2. **No Supabase Dashboard**: A tabela `workshop_registrations` deve aparecer no Table Editor
3. **Ao criar um pagamento**: Logs devem mostrar `✅ Registro inicial criado no Supabase`

---

## 📖 Guia Completo

Para instruções detalhadas, veja: **PASSOS_SETUP.md**




















