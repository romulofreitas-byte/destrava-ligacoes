# Configuração da Integração Banco Efí

Este documento explica como configurar a integração com a API Pix do Banco Efí e configurar os webhooks para envio automático de e-mails de confirmação.

## 1. Variáveis de Ambiente

Adicione as seguintes variáveis no arquivo `.env.local`:

```env
# Banco Efí - Produção
EFI_CLIENT_ID=Client_Id_e6eb49e92f7332ac30bfbbbeba60cb17f8293110
EFI_CLIENT_SECRET=Client_Secret_0da437f630afe8244e033fbcb304b7b1f4792962
EFI_CERTIFICATE_PATH=./producao-319043-WDL.p12
EFI_CERTIFICATE_PASSWORD=sua_senha_do_certificado
EFI_ENVIRONMENT=production
EFI_API_BASE=https://pix.api.efipay.com.br
EFI_OAUTH_URL=https://pix.api.efipay.com.br/oauth/token
EFI_WEBHOOK_SECRET=seu_webhook_secret (opcional)

# Banco Efí - Homologação (para testes)
# EFI_CLIENT_ID=Client_Id_c46e7838a0c082b52ca778f82a97d80126033944
# EFI_CLIENT_SECRET=Client_Secret_90ff507239ed3a68edf946e92b784dbc13a6d024
```

**Para produção no Vercel:**
1. Acesse o painel do Vercel
2. Vá em Settings > Environment Variables
3. Adicione todas as variáveis acima
4. Para o certificado P12, você pode:
   - Converter para base64 e armazenar como variável de ambiente
   - Ou usar um serviço de armazenamento seguro (AWS S3, etc.)

## 2. Obter Certificado P12

### Passo 1: Acessar o Painel do Banco Efí
1. Acesse sua conta no Banco Efí
2. Vá em **API** no menu lateral
3. Clique em **Certificados**

### Passo 2: Gerar Certificado
1. Selecione o ambiente (Produção ou Homologação)
2. Clique em **Novo Certificado**
3. Atribua uma descrição ao certificado
4. ⚠️ **IMPORTANTE:** O download é feito imediatamente após criação
5. Salve o arquivo `.p12` em local seguro
6. Anote a senha do certificado (se solicitada)

### Passo 3: Colocar Certificado no Projeto
1. Coloque o arquivo `.p12` na raiz do projeto (exemplo: `producao-319043-WDL.p12`)
2. Configure o caminho em `EFI_CERTIFICATE_PATH` com o nome exato do arquivo
3. ⚠️ **NUNCA** faça commit do certificado no Git (já está no `.gitignore`)

## 3. Configuração do Webhook no Banco Efí

### Passo 1: Acessar Configurações de Webhook
1. No painel do Banco Efí, vá em **API** > **Webhooks**
2. Clique em **Configurar Webhook** ou **Novo Webhook**

### Passo 2: Configurar URL do Webhook
Configure a URL do webhook apontando para:

```
https://seu-dominio.com.br/api/pagamento/efi-webhook
```

**Para desenvolvimento local (usando ngrok):**
```bash
ngrok http 3000
```
Depois configure a URL do ngrok no Banco Efí:
```
https://seu-ngrok-url.ngrok.io/api/pagamento/efi-webhook
```

### Passo 3: Selecionar Eventos
Configure o webhook para receber notificações dos seguintes eventos:
- **Pix recebido** (pagamento confirmado) - OBRIGATÓRIO
- Cobrança criada (opcional)
- Cobrança cancelada (opcional)

## 4. Fluxo de Pagamento

### Fluxo Completo:

1. **Cliente clica em "Garantir Vaga"**
   - Frontend redireciona para: `https://pagamento.sejaefi.com.br/a18de564-b46a-4007-917d-e3598403b8ca`
   - Cliente realiza o pagamento PIX

2. **Cliente realiza o pagamento**
   - PIX é processado pelo Banco Efí
   - Cliente é redirecionado de volta para a página de obrigado

3. **Banco Efí envia webhook**
   - Quando PIX é recebido, Banco Efí envia POST para `/api/pagamento/efi-webhook`
   - Webhook processa e registra o status
   - **E-mail de confirmação é enviado automaticamente**

4. **Página de Obrigado**
   - Cliente vê confirmação de pagamento
   - Pode reenviar e-mail se necessário

## 5. Melhorias Implementadas no Fluxo de E-mails

### Retry Automático
- Se o envio de e-mail falhar, o sistema tenta novamente automaticamente
- Máximo de 3 tentativas com delays progressivos (5s, 10s, 15s)
- Logs detalhados de cada tentativa

### Validação Dupla
- Webhook tenta enviar e-mail imediatamente
- Se falhar, sistema verifica no Supabase e tenta novamente
- Busca dados do cliente de múltiplas fontes (webhook, cobrança, Supabase)

### Fallback via Supabase
- Se dados do cliente não vierem no webhook, busca no Supabase
- Garante que e-mail seja enviado mesmo se webhook não tiver todos os dados

### Logs Detalhados
- Todas as tentativas de envio são registradas
- Facilita debugging e monitoramento
- Inclui informações do pagamento e cliente

## 6. Estrutura de Arquivos

```
src/
├── lib/
│   └── efi.ts                    # Biblioteca do Banco Efí
├── app/
│   └── api/
│       └── pagamento/
│           └── efi-webhook/
│               └── route.ts      # Webhook do Banco Efí
└── components/
    └── sections/
        ├── FinalCTAWorkshopSection.tsx  # Link atualizado
        └── InvestmentSection.tsx        # Link atualizado
```

## 7. URLs Importantes

- **Link de pagamento:** `https://pagamento.sejaefi.com.br/a18de564-b46a-4007-917d-e3598403b8ca`
- **Webhook (notificações):** `POST /api/pagamento/efi-webhook`
- **Consultar cobrança:** `GET /api/pagamento/efi-webhook?txid=xxx`
- **Página de Obrigado:** `/workshop-destrava-ligacoes/obrigado`

## 8. Status de Cobrança

Os possíveis status retornados pelo Banco Efí:
- `ATIVA` - Cobrança criada, aguardando pagamento
- `CONCLUIDA` - Pagamento confirmado (PIX recebido)
- `REMOVIDA_POR_USUARIO` - Cobrança removida
- `REMOVIDA_POR_ANTECIPACAO` - Cobrança removida por antecipação

## 9. Testando a Integração

### Ambiente de Homologação:
1. Use credenciais de homologação no `.env.local`
2. Configure `EFI_ENVIRONMENT=homologation` (se necessário)
3. Use certificado de homologação
4. Teste com PIX de teste fornecidos pelo Banco Efí

### Testar Webhook Localmente:
Use uma ferramenta como ngrok para expor sua aplicação local:

```bash
ngrok http 3000
```

Depois configure a URL do webhook no Banco Efí com a URL do ngrok:
```
https://seu-ngrok-url.ngrok.io/api/pagamento/efi-webhook
```

### Testar Envio de E-mail:
1. Realize um pagamento de teste
2. Verifique os logs do servidor
3. Confirme que o e-mail foi enviado para `romulocsfreitas@gmail.com` (em desenvolvimento)
4. Verifique o Supabase para confirmar registro

## 10. Troubleshooting

### Webhook não está recebendo notificações:
1. Verifique se a URL está acessível publicamente
2. Verifique se está usando HTTPS em produção
3. Verifique os logs do servidor
4. Teste manualmente fazendo POST para `/api/pagamento/efi-webhook`
5. Verifique se o webhook está configurado no painel do Banco Efí

### Erro ao obter access token:
1. Verifique se `EFI_CLIENT_ID` e `EFI_CLIENT_SECRET` estão corretos
2. Verifique se o certificado P12 está no caminho correto
3. Verifique se a senha do certificado está correta
4. Verifique se o certificado não expirou

### E-mail não está sendo enviado:
1. Verifique se `RESEND_API_KEY` está configurada
2. Verifique os logs do servidor para erros
3. Verifique se o e-mail do cliente está presente no webhook
4. Verifique se o status da cobrança é `CONCLUIDA`
5. Tente reenviar manualmente pela página de obrigado

### Certificado não funciona:
1. Verifique se o arquivo existe no caminho especificado (exemplo: `./producao-319043-WDL.p12`)
2. Verifique se o nome do arquivo em `EFI_CERTIFICATE_PATH` corresponde exatamente ao arquivo na raiz do projeto
3. Verifique se a senha está correta (ou deixe vazio se não tiver senha)
4. Tente gerar um novo certificado no painel do Banco Efí
5. Verifique se o certificado é do ambiente correto (produção/homologação)

## 11. Segurança

⚠️ **Importante:**
- Nunca exponha `EFI_CLIENT_SECRET` no código do cliente
- Nunca faça commit do certificado P12 no Git
- Use sempre HTTPS em produção
- Valide os dados recebidos no webhook
- Implemente rate limiting nas rotas de API
- Considere adicionar autenticação adicional no webhook

## 12. Próximos Passos

Após configurar:
1. ✅ Teste em ambiente de homologação
2. ✅ Configure webhook no painel do Banco Efí
3. ✅ Teste fluxo completo de pagamento
4. ✅ Verifique envio automático de e-mail
5. ✅ Migre para produção quando estiver tudo funcionando
6. ✅ Monitore logs e webhooks regularmente

## 13. Credenciais Obtidas

✅ **Produção:**
- Client ID: `Client_Id_e6eb49e92f7332ac30bfbbbeba60cb17f8293110`
- Client Secret: `Client_Secret_0da437f630afe8244e033fbcb304b7b1f4792962`

✅ **Homologação:**
- Client ID: `Client_Id_c46e7838a0c082b52ca778f82a97d80126033944`
- Client Secret: `Client_Secret_90ff507239ed3a68edf946e92b784dbc13a6d024`

✅ **Link de pagamento:** `https://pagamento.sejaefi.com.br/a18de564-b46a-4007-917d-e3598403b8ca`

✅ **Certificado:**
- Arquivo: `producao-319043-WDL.p12` (colocado na raiz do projeto)

⚠️ **Ainda necessário:**
- Configurar `EFI_CERTIFICATE_PATH=./producao-319043-WDL.p12` no `.env.local`
- Configurar senha do certificado (se houver) em `EFI_CERTIFICATE_PASSWORD`
- Configurar webhook no painel do Banco Efí

## 14. Documentação de Referência

- [Documentação da API Pix do Banco Efí](https://dev.efipay.com.br/docs/api-pix/credenciais/)
- [Webhooks do Banco Efí](https://dev.efipay.com.br/docs/api-pix/webhooks/)
- [Cobranças Imediatas](https://dev.efipay.com.br/docs/api-pix/cobrancas-imediatas/)

