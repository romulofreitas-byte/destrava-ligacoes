# Configuração da Integração PagBank

Este documento explica como configurar a integração com a API do PagBank e configurar os webhooks.

## 1. Variáveis de Ambiente

Adicione as seguintes variáveis no arquivo `.env.local`:

```env
PAGBANK_TOKEN=3e894315-932b-4358-ba90-597029a6861ae9164ade4d2d94de527175089a067acc3826-7c89-4cdd-8805-8e79d24bfd86
PAGBANK_ENVIRONMENT=sandbox
NEXT_PUBLIC_BASE_URL=http://localhost:3002
```

**Para produção**, altere:
- `PAGBANK_ENVIRONMENT=production`
- `NEXT_PUBLIC_BASE_URL=https://seu-dominio.com.br`

## 2. Configuração do Webhook no PagBank

### Passo 1: Acessar o Painel do PagBank
1. Acesse https://pagseguro.uol.com.br/
2. Faça login na sua conta
3. Vá em **Venda online** > **Integrações**

### Passo 2: Configurar URL do Webhook
No painel do PagBank, configure a URL do webhook:

**URL do Webhook:**
```
https://seu-dominio.com.br/api/pagamento/webhook
```

**URL de Callback (redirecionamento após pagamento):**
```
https://seu-dominio.com.br/api/pagamento/callback
```

### Passo 3: Eventos para Monitorar
Configure o webhook para receber notificações dos seguintes eventos:
- `CHARGE.PAID` - Pagamento confirmado
- `CHARGE.CANCELLED` - Pagamento cancelado
- `CHARGE.DECLINED` - Pagamento recusado

## 3. Fluxo de Pagamento

### Fluxo Completo:

1. **Cliente clica em "Garantir Vaga"**
   - Frontend chama `/api/pagamento` com dados do pagamento
   - API cria o pagamento no PagBank
   - Retorna dados do pagamento (PIX QR Code, link de pagamento, etc.)

2. **Cliente realiza o pagamento**
   - Se PIX: mostra QR Code para pagamento
   - Se Cartão: processa pagamento imediatamente

3. **PagBank envia webhook**
   - Quando pagamento é confirmado, PagBank envia POST para `/api/pagamento/webhook`
   - Webhook processa e registra o status

4. **Redirecionamento**
   - Após pagamento, cliente é redirecionado para `/api/pagamento/callback`
   - Callback redireciona para `/workshop-destrava-ligacoes/obrigado` com parâmetros

5. **Página de Obrigado**
   - Recebe `charge_id`, `status`, `reference_id` na URL
   - Mostra confirmação de pagamento
   - Exibe próximos passos

## 4. Exemplo de Uso no Frontend

### Criar Pagamento PIX:

```typescript
import { criarPagamentoPix } from '@/lib/pagamento';

const handlePayment = async () => {
  try {
    const response = await criarPagamentoPix(
      49.99, // valor
      'Workshop Destrava Ligações', // descrição
      `workshop-${Date.now()}` // reference_id único
    );
    
    // Se for PIX, mostrar QR Code
    if (response.payment.qr_codes && response.payment.qr_codes.length > 0) {
      const qrCode = response.payment.qr_codes[0];
      // Mostrar QR Code para o usuário
    }
    
    // Redirecionar para página de pagamento ou mostrar QR Code
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
  }
};
```

### Consultar Status do Pagamento:

```typescript
import { consultarStatusPagamento } from '@/lib/pagamento';

const checkStatus = async (chargeId: string) => {
  try {
    const response = await consultarStatusPagamento(chargeId);
    console.log('Status:', response.payment.status);
  } catch (error) {
    console.error('Erro ao consultar status:', error);
  }
};
```

## 5. Testando a Integração

### Ambiente Sandbox:
1. Use `PAGBANK_ENVIRONMENT=sandbox`
2. Use tokens de teste do PagBank
3. Teste com cartões de teste fornecidos pelo PagBank

### Testar Webhook Localmente:
Use uma ferramenta como ngrok para expor sua aplicação local:

```bash
ngrok http 3002
```

Depois configure a URL do webhook no PagBank com a URL do ngrok:
```
https://seu-ngrok-url.ngrok.io/api/pagamento/webhook
```

## 6. URLs Importantes

- **Criar Pagamento:** `POST /api/pagamento`
- **Webhook (notificações):** `POST /api/pagamento/webhook`
- **Callback (redirecionamento):** `GET /api/pagamento/callback`
- **Consultar Status:** `GET /api/pagamento/status?charge_id=xxx`
- **Página de Obrigado:** `/workshop-destrava-ligacoes/obrigado`

## 7. Status de Pagamento

Os possíveis status retornados pelo PagBank:
- `PAID` - Pagamento confirmado
- `PENDING` - Aguardando pagamento
- `CANCELLED` - Pagamento cancelado
- `DECLINED` - Pagamento recusado
- `REFUNDED` - Pagamento estornado

## 8. Segurança

⚠️ **Importante:**
- Nunca exponha o `PAGBANK_TOKEN` no código do cliente
- Use sempre HTTPS em produção
- Valide os dados recebidos no webhook
- Implemente rate limiting nas rotas de API
- Considere adicionar autenticação no webhook (verificar assinatura do PagBank)

## 9. Troubleshooting

### Webhook não está recebendo notificações:
1. Verifique se a URL está acessível publicamente
2. Verifique se está usando HTTPS em produção
3. Verifique os logs do servidor
4. Teste manualmente fazendo POST para `/api/pagamento/webhook`

### Erro ao criar pagamento:
1. Verifique se o token está correto
2. Verifique se está usando o ambiente correto (sandbox/production)
3. Verifique os logs do servidor para mais detalhes

### Redirecionamento não funciona:
1. Verifique se `NEXT_PUBLIC_BASE_URL` está configurado corretamente
2. Verifique se a rota `/api/pagamento/callback` está acessível
3. Verifique os parâmetros na URL

## 10. Próximos Passos

Após configurar:
1. Teste em ambiente sandbox
2. Configure webhook no painel do PagBank
3. Teste fluxo completo de pagamento
4. Migre para produção quando estiver tudo funcionando
5. Monitore logs e webhooks regularmente







