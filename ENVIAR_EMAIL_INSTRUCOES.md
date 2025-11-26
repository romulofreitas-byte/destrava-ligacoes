# Instruções para Enviar E-mail de Confirmação

## Problema Identificado

O servidor Next.js não está encontrando a variável `RESEND_API_KEY` no ambiente.

## Solução

### 1. Verificar se RESEND_API_KEY está no .env.local

Certifique-se de que o arquivo `.env.local` na raiz do projeto contém:

```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### 2. Reiniciar o servidor

Após verificar/atualizar o `.env.local`, reinicie o servidor:

```bash
# Parar o servidor atual (Ctrl+C no terminal onde está rodando)
# Ou matar o processo:
Get-Process -Name node | Stop-Process -Force

# Iniciar novamente:
npm run dev
```

### 3. Enviar o e-mail

Após o servidor estar rodando com as variáveis corretas, execute:

```bash
node scripts/send-confirmation-email.js
```

## Dados do Cliente

- **Charge ID**: `12EFC072-5ECF-41FE-B12F-6965679CA8F6`
- **Email**: `mayconferrazvieira@gmail.com`
- **Nome**: `Maycon Vieira ferraz`

## Alternativa: Enviar via API Manual

Se preferir, você pode fazer uma chamada direta à API:

```bash
curl -X POST http://localhost:3002/api/email/send-manual \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"mayconferrazvieira@gmail.com\", \"nome\": \"Maycon Vieira ferraz\", \"type\": \"payment\"}"
```

Ou usar o endpoint retroactive:

```bash
curl -X POST http://localhost:3002/api/email/send-retroactive \
  -H "Content-Type: application/json" \
  -d "{\"chargeId\": \"12EFC072-5ECF-41FE-B12F-6965679CA8F6\", \"email\": \"mayconferrazvieira@gmail.com\", \"nome\": \"Maycon Vieira ferraz\"}"
```



