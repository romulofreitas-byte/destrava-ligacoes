# Prompt para Cursor — Plugar vídeos do YouTube no site do Workshop

Cole este prompt no Cursor, no repositório `destrava-ligacoes`. Os dois vídeos já estão gravados, editados e publicados no YouTube — esta é a etapa final de ativação dos slots que já existem no código.

---

## Vídeos publicados

| Slot | URL | ID do vídeo |
|---|---|---|
| Hero (prova/storytelling) | https://youtu.be/pX0jS2qc6CM | `pX0jS2qc6CM` |
| Garantia | https://youtu.be/E3NduUfiPPw | `E3NduUfiPPw` |

## 1. Configurar variáveis de ambiente

Adicionar ao `.env.local` e às variáveis de ambiente do Vercel (produção):

```
NEXT_PUBLIC_HERO_PROOF_YOUTUBE_URL=https://youtu.be/pX0jS2qc6CM
NEXT_PUBLIC_GARANTIA_YOUTUBE_URL=https://youtu.be/E3NduUfiPPw
```

Conferir o formato exato esperado pelas variáveis em `env.template` — se os componentes esperam só o ID do vídeo em vez da URL completa, ajustar para `pX0jS2qc6CM` e `E3NduUfiPPw` respectivamente.

## 2. Ativar os slots existentes

- `src/components/ui/HeroProofVideoSlot.tsx` — hoje mostra o placeholder "vídeo em produção". Conectar à env var `NEXT_PUBLIC_HERO_PROOF_YOUTUBE_URL`; quando a variável estiver presente, renderizar o player embutido no lugar do placeholder. Remover o texto "VÍDEO EM PRODUÇÃO" e a borda tracejada nesse estado — eles só fazem sentido enquanto não há vídeo.
- `src/components/sections/WorkshopGuaranteeSection.tsx` — mesma lógica, usando `NEXT_PUBLIC_GARANTIA_YOUTUBE_URL`.

## 3. Configuração do embed (aplicar aos dois players)

- Usar o domínio de privacidade avançada do YouTube: `https://www.youtube-nocookie.com/embed/{ID}` em vez de `https://www.youtube.com/embed/{ID}` — reduz cookies de terceiros carregados antes do consentimento do banner de cookies do site.
- Parâmetros de URL do iframe:
  - `rel=0` — mostra só vídeos relacionados do próprio canal ao final, não de terceiros.
  - `modestbranding=1` — reduz o logo do YouTube na interface do player.
  - `playsinline=1` — no mobile, toca dentro da página em vez de forçar tela cheia.
- **Não usar `autoplay=1` em nenhum dos dois** — ambos os players usam o padrão de miniatura + clique para tocar (não autoplay).

Exemplo de URL final do hero:
```
https://www.youtube-nocookie.com/embed/pX0jS2qc6CM?rel=0&modestbranding=1&playsinline=1
```

Exemplo de URL final da garantia:
```
https://www.youtube-nocookie.com/embed/E3NduUfiPPw?rel=0&modestbranding=1&playsinline=1
```

## 4. Miniatura (thumbnail) do player

Se o componente já usa um placeholder customizado como thumbnail (clique para carregar o iframe só depois do clique — recomendado para performance, evita carregar o player do YouTube antes do usuário interagir), manter esse comportamento e só trocar a imagem de fundo do placeholder pela thumbnail real de cada vídeo, ou usar a própria thumbnail que o YouTube gera (`https://img.youtube.com/vi/{ID}/maxresdefault.jpg`).

## 5. Teste

- [ ] Variáveis de ambiente configuradas em local e produção
- [ ] Placeholder "vídeo em produção" removido dos dois slots
- [ ] Player do hero carrega e toca o vídeo `pX0jS2qc6CM` corretamente, em desktop e mobile
- [ ] Player da garantia carrega e toca o vídeo `E3NduUfiPPw` corretamente, em desktop e mobile
- [ ] Nenhum autoplay acontece em nenhum dos dois — carrega parado, toca só no clique
- [ ] Embed usando `youtube-nocookie.com` com os parâmetros `rel=0`, `modestbranding=1`, `playsinline=1`
- [ ] QA de peso de página — confirmar que a página não ficou mais pesada com a mudança (o vídeo deve carregar só sob demanda, não pré-carregado)
