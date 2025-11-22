# Variáveis de Ambiente

Este projeto requer as seguintes variáveis de ambiente para funcionar corretamente.

## Variáveis Obrigatórias

### `NEXT_PUBLIC_META_PIXEL_ID`
- **Descrição**: ID do Meta Pixel (Facebook Pixel) para rastreamento de eventos
- **Onde obter**: Facebook Events Manager (https://business.facebook.com/events_manager2)
- **Valor padrão**: `687023637552068` (fallback se não configurado)
- **Exemplo**: `NEXT_PUBLIC_META_PIXEL_ID=687023637552068`

## Variáveis Opcionais

### `NEXT_PUBLIC_BASE_URL`
- **Descrição**: URL base do site para metadata (Open Graph, Twitter Cards)
- **Valor padrão**: `https://escuderiapodium.com.br`
- **Exemplo**: `NEXT_PUBLIC_BASE_URL=https://escuderiapodium.com.br`
- **Nota**: Deve ser configurado com o domínio real em produção

## Configuração

### Desenvolvimento Local

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_META_PIXEL_ID=687023637552068
```

### Vercel

1. Acesse o dashboard do Vercel
2. Vá em Settings > Environment Variables
3. Adicione as variáveis acima
4. Faça um novo deploy

### GitHub Actions (se aplicável)

Configure as variáveis em Settings > Secrets and variables > Actions

### `PAGBANK_TOKEN`
- **Descrição**: Token de autenticação da API do PagBank
- **Onde obter**: Painel do PagBank > Integrações > Gerar Token
- **Exemplo**: `PAGBANK_TOKEN=3e894315-932b-4358-ba90-597029a6861ae9164ade4d2d94de527175089a067acc3826-7c89-4cdd-8805-8e79d24bfd86`
- **Importante**: Nunca commite este token no repositório. Armazene apenas em variáveis de ambiente.

### `PAGBANK_ENVIRONMENT`
- **Descrição**: Ambiente da API (sandbox ou production)
- **Valor padrão**: `sandbox`
- **Valores possíveis**: `sandbox` ou `production`
- **Exemplo**: `PAGBANK_ENVIRONMENT=production`
- **Nota**: Use `sandbox` para testes e `production` para ambiente real

## Notas

- Variáveis que começam com `NEXT_PUBLIC_` são expostas ao cliente (browser)
- Nunca commite arquivos `.env.local` ou `.env` no repositório
- O arquivo `.env.example` serve como template (não contém valores reais)
- O token do PagBank deve ser mantido em segredo e nunca exposto no código do cliente

