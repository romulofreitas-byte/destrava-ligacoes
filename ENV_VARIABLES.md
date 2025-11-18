# Variáveis de Ambiente

Este projeto requer as seguintes variáveis de ambiente para funcionar corretamente.

## Variáveis Obrigatórias

### `NEXT_PUBLIC_META_PIXEL_ID`
- **Descrição**: ID do Meta Pixel (Facebook Pixel) para rastreamento de eventos
- **Onde obter**: Facebook Events Manager (https://business.facebook.com/events_manager2)
- **Valor padrão**: `2971488916372606` (fallback se não configurado)
- **Exemplo**: `NEXT_PUBLIC_META_PIXEL_ID=2971488916372606`

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
NEXT_PUBLIC_META_PIXEL_ID=2971488916372606
```

### Vercel

1. Acesse o dashboard do Vercel
2. Vá em Settings > Environment Variables
3. Adicione as variáveis acima
4. Faça um novo deploy

### GitHub Actions (se aplicável)

Configure as variáveis em Settings > Secrets and variables > Actions

## Notas

- Variáveis que começam com `NEXT_PUBLIC_` são expostas ao cliente (browser)
- Nunca commite arquivos `.env.local` ou `.env` no repositório
- O arquivo `.env.example` serve como template (não contém valores reais)

