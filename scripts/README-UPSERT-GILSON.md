# Atualizar Dados do Participante e Enviar Email

Este guia explica como atualizar os dados do participante Gilson Silva Castro no Supabase e enviar o email de confirmação.

## Opção 1: Usar a Rota API (Recomendado)

### Pré-requisitos
- Servidor Next.js rodando (`npm run dev`)

### Executar

**PowerShell:**
```powershell
.\scripts\upsert-gilson.ps1
```

**Ou manualmente via curl/PowerShell:**
```powershell
$body = @{
    charge_id = '10CF6966-827A-487A-9545-9B1CEA6056FD'
    reference_id = 'LINK_PAGAE=81eiPrem9'
    nome = 'Gilson Silva Castro'
    email = 'azimutegestao@gmail.com'
    telefone_country = '55'
    telefone_area = '91'
    telefone_number = '981483968'
    status = 'PAID'
    amount_brl = 49.99
    payment_method = 'Cartão de Crédito'
    installments = 1
} | ConvertTo-Json

Invoke-RestMethod -Uri 'http://localhost:3002/api/workshop/upsert-and-send' -Method POST -Body $body -ContentType 'application/json'
```

## Opção 2: Usar Script Node.js Direto

### Pré-requisitos
- Variáveis de ambiente configuradas no `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `RESEND_API_KEY`

### Executar
```bash
node scripts/upsert-gilson-direct.js
```

## Dados do Participante

- **Nome:** Gilson Silva Castro
- **Email:** azimutegestao@gmail.com
- **Telefone:** (91) 98148-3968
- **Charge ID:** 10CF6966-827A-487A-9545-9B1CEA6056FD
- **Reference ID:** LINK_PAGAE=81eiPrem9
- **Status:** PAID
- **Valor:** R$ 49,99
- **Método de Pagamento:** Cartão de Crédito (1x)

## O que o script faz

1. ✅ Atualiza/insere os dados do participante no Supabase
2. ✅ Envia email de confirmação via Resend
3. ✅ Atualiza o status de email enviado no Supabase

## Rota API

A rota `/api/workshop/upsert-and-send` aceita um POST com os seguintes campos:

```json
{
  "charge_id": "10CF6966-827A-487A-9545-9B1CEA6056FD",
  "reference_id": "LINK_PAGAE=81eiPrem9",
  "nome": "Gilson Silva Castro",
  "email": "azimutegestao@gmail.com",
  "telefone_country": "55",
  "telefone_area": "91",
  "telefone_number": "981483968",
  "status": "PAID",
  "amount_brl": 49.99,
  "payment_method": "Cartão de Crédito",
  "installments": 1
}
```

## Resposta de Sucesso

```json
{
  "success": true,
  "supabaseUpdated": true,
  "emailSent": true,
  "message": "Dados atualizados e email enviado com sucesso",
  "supabaseData": { ... }
}
```







