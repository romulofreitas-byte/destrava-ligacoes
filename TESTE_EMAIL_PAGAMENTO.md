# 🧪 Teste de Email Após Pagamento

Este documento explica como testar o envio de email após pagamento.

## 📋 Opções de Teste

### 1. Teste com chargeId Real (GET)

Usa um `charge_id` real do PagBank para buscar os dados do pagamento e enviar o email.

**Via API:**
```bash
# Usando curl
curl "http://localhost:3002/api/pagamento/test-email?charge_id=CHARGE_ID"

# Ou no navegador
http://localhost:3002/api/pagamento/test-email?charge_id=CHARGE_ID
```

**Via Script:**
```bash
# Usando npm
npm run test:email-pagamento seu-email@exemplo.com "Seu Nome" CHARGE_ID

# Ou diretamente
node scripts/test-email-pagamento.js seu-email@exemplo.com "Seu Nome" CHARGE_ID
```

### 2. Teste com Dados Customizados (POST)

Envia email de teste sem precisar de um pagamento real.

**Via API:**
```bash
curl -X POST http://localhost:3002/api/pagamento/test-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seu-email@exemplo.com",
    "nome": "Seu Nome",
    "chargeId": "TEST_123",
    "referenceId": "REF_123"
  }'
```

**Via Script:**
```bash
# Com email e nome
npm run test:email-pagamento seu-email@exemplo.com "Seu Nome"
# Ou: node scripts/test-email-pagamento.js seu-email@exemplo.com "Seu Nome"

# Apenas email (nome será extraído do email)
npm run test:email-pagamento seu-email@exemplo.com
# Ou: node scripts/test-email-pagamento.js seu-email@exemplo.com
```

## 🔧 Requisitos

1. **Variáveis de Ambiente:**
   - `RESEND_API_KEY` - Chave da API do Resend (obrigatório)
   - `FROM_EMAIL` - Email remetente (opcional, padrão: noreply@mundopodium.com.br)
   - `PAGBANK_TOKEN` - Token do PagBank (obrigatório apenas para teste com chargeId real)
   - `NEXT_PUBLIC_BASE_URL` - URL base da aplicação (opcional, padrão: http://localhost:3002)

2. **Servidor Rodando:**
   ```bash
   npm run dev
   ```

## 📝 Exemplos de Uso

### Exemplo 1: Teste Simples
```bash
npm run test:email-pagamento romulocsfreitas@gmail.com "Rômulo"
```

### Exemplo 2: Teste com Pagamento Real
```bash
npm run test:email-pagamento romulocsfreitas@gmail.com "Rômulo" "CHARGE_ID_AQUI"
```

### Exemplo 3: Via API (POST)
```javascript
fetch('http://localhost:3002/api/pagamento/test-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'teste@exemplo.com',
    nome: 'Teste',
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## ✅ Resposta de Sucesso

```json
{
  "success": true,
  "message": "✅ Email de teste enviado com sucesso!",
  "details": {
    "email": "seu-email@exemplo.com",
    "nome": "Seu Nome",
    "charge_id": "CHARGE_ID",
    "reference_id": "REFERENCE_ID",
    "payment_status": "PAID"
  }
}
```

## ❌ Resposta de Erro

```json
{
  "success": false,
  "error": "Mensagem de erro",
  "details": {
    "email": "seu-email@exemplo.com",
    "charge_id": "CHARGE_ID"
  }
}
```

## 🔍 Verificação

Após enviar o teste, verifique:
1. ✅ Console do servidor para logs
2. ✅ Caixa de entrada do email
3. ✅ Spam/lixo eletrônico (caso não apareça na caixa de entrada)

## 📚 Rotas Relacionadas

- `/api/email/test` - Teste genérico de email
- `/api/email/send` - Envio manual de email (com chargeId)
- `/api/pagamento/webhook` - Webhook que envia email automaticamente após pagamento confirmado

