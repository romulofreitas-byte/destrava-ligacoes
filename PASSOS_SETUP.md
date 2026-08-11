# 🚀 Passos para Configurar a Integração Supabase

## Passo 1: Criar a Tabela no Supabase

### 1.1. Acessar o Supabase Dashboard
1. Abra seu navegador e acesse: https://app.supabase.com
2. Faça login na sua conta
3. Selecione o projeto: **wmsxiuxscmogbechxlty**

### 1.2. Abrir o SQL Editor
1. No menu lateral esquerdo, clique em **SQL Editor**
2. Clique no botão **New Query** (ou use o atalho Ctrl+K)

### 1.3. Executar o Script SQL
1. Abra o arquivo `supabase-workshop-schema.sql` que está na raiz do projeto
2. Copie TODO o conteúdo do arquivo (Ctrl+A, Ctrl+C)
3. Cole no SQL Editor do Supabase (Ctrl+V)
4. Clique no botão **Run** (ou pressione Ctrl+Enter)
5. Aguarde a confirmação: "Success. No rows returned"

✅ **Pronto!** A tabela `workshop_registrations` foi criada.

---

## Passo 2: Configurar Variáveis de Ambiente

### 2.1. Criar/Editar o arquivo .env.local
1. Na raiz do projeto (`C:\Users\romul\destrava-ligacoes`), verifique se existe o arquivo `.env.local`
2. Se não existir, crie um novo arquivo chamado `.env.local`
3. Se já existir, abra-o para editar

### 2.2. Adicionar as Variáveis
Adicione estas linhas no arquivo `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://wmsxiuxscmogbechxlty.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

⚠️ **IMPORTANTE**: 
- Se já houver outras variáveis no arquivo, apenas adicione essas duas linhas
- Não remova outras variáveis que já existam (como `PAGBANK_TOKEN`, `RESEND_API_KEY`, etc.)

### 2.3. Salvar o Arquivo
- Salve o arquivo (Ctrl+S)

---

## Passo 3: Reiniciar o Servidor

### 3.1. Parar o Servidor (se estiver rodando)
- No terminal onde o servidor está rodando, pressione `Ctrl+C`

### 3.2. Iniciar o Servidor Novamente
Execute o comando:

```bash
npm run dev
```

### 3.3. Verificar se Funcionou
Você deve ver no console:
- ✅ Servidor iniciando na porta 3002
- ⚠️ Se aparecer um aviso sobre Supabase não configurado, verifique se as variáveis foram salvas corretamente

---

## Passo 4: Testar a Integração

### 4.1. Verificar se a Tabela Foi Criada
1. No Supabase Dashboard, vá em **Table Editor**
2. Procure pela tabela `workshop_registrations`
3. Ela deve aparecer na lista de tabelas

### 4.2. Testar um Pagamento (Opcional)
1. Faça um teste de pagamento no workshop
2. Verifique os logs do servidor - deve aparecer:
   - `💾 Criando registro inicial no Supabase`
   - `✅ Registro inicial criado no Supabase com sucesso`
3. No Supabase, vá em `workshop_registrations` e verifique se o registro foi criado

---

## ✅ Checklist Final

- [ ] Script SQL executado no Supabase
- [ ] Tabela `workshop_registrations` criada
- [ ] Variáveis de ambiente adicionadas no `.env.local`
- [ ] Servidor reiniciado
- [ ] Nenhum erro no console sobre Supabase não configurado

---

## 🆘 Problemas Comuns

### Erro: "Supabase não configurado"
- **Solução**: Verifique se o arquivo `.env.local` existe e tem as variáveis corretas
- **Solução**: Reinicie o servidor após adicionar as variáveis

### Erro ao executar o SQL: "relation already exists"
- **Solução**: A tabela já existe. Isso é normal se você executar o script duas vezes
- **Solução**: Pode ignorar ou deletar a tabela e executar novamente

### Não vejo a tabela no Table Editor
- **Solução**: Atualize a página (F5)
- **Solução**: Verifique se você está no projeto correto

---

## 📝 Próximos Passos Após Configuração

Após configurar, todos os dados de compra do workshop serão automaticamente salvos no Supabase:

- ✅ Quando um pagamento é criado → Registro inicial criado
- ✅ Quando o PagBank notifica → Status atualizado
- ✅ Quando o pagamento é confirmado → `paid_at` preenchido
- ✅ Quando o email é enviado → `email_sent` marcado como true

Tudo acontece automaticamente! 🎉




















