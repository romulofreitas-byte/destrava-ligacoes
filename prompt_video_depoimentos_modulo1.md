# Prompt para Cursor — Adicionar vídeo compilado de depoimentos (Módulo 1)

Cole este prompt no Cursor, no repositório `destrava-ligacoes`.

---

## Contexto

Vídeo publicado no YouTube: https://youtu.be/HKqIZtlBz6I

É um compilado de ~35 depoimentos de alunos durante o Módulo 1 de uma edição do Workshop — diferente em formato e peso dos depoimentos individuais já usados na página (Regularize, Izabela, Lucas Ribeiro, Gilson Cas, Maycon). Por ser mais longo (~35 min) e ser um "raio-x" de vários alunos ao mesmo tempo, não deve ser tratado como mais um item igual aos outros — funciona melhor como prova de profundidade pra quem já está inclinado a comprar e quer mais confiança antes de decidir, não como gancho de decisão rápida.

## 1. Criar seção própria (não misturar com `TestimonialsVideoSection.tsx`)

Criar um novo componente, ex. `WorkshopFullTestimonialsSection.tsx`, ou adicionar como bloco adicional dentro da seção de depoimentos em vídeo já existente, mas com tratamento visual diferente dos outros dois vídeos (Lucas, Vinicius):

- Card maior que os outros vídeos de depoimento.
- Badge de duração visível: "35 min — depoimentos completos".
- Texto de enquadramento explícito, algo como: *"Quer ver o processo inteiro, com vários alunos, no mesmo módulo? Assista o compilado completo do Módulo 1."*
- Posicionar depois dos depoimentos individuais curtos na ordem da página — é conteúdo de aprofundamento, não deve competir pela primeira atenção.

## 2. Embed do vídeo

Mesmo padrão técnico já usado nos vídeos do hero e da garantia:
- Domínio de privacidade avançada: `https://www.youtube-nocookie.com/embed/HKqIZtlBz6I`
- Parâmetros: `rel=0&modestbranding=1&playsinline=1`
- Sem autoplay — carrega com thumbnail, toca só no clique.
- Se o componente usar capítulos/timestamps do YouTube (o vídeo pode ganhar capítulos depois, quando os tempos forem confirmados), considerar usar o parâmetro de início (`?start=SEGUNDOS`) só se algum dia for necessário linkar direto pra um trecho específico — não é necessário agora.

## 3. Miniatura (thumbnail)

Como é um compilado de várias pessoas (não um rosto único), evitar usar a thumbnail automática do YouTube se ela capturar só uma pessoa aleatória no meio da fala. Preferir uma thumbnail customizada no padrão visual da marca (navy + amarelo Pódium), com algo como "Depoimentos Reais — Módulo 1" em vez de foto de rosto único, para não sub-representar o caráter coletivo do vídeo.

## 4. Variável de ambiente (se o componente novo seguir o padrão dos outros vídeos)

```
NEXT_PUBLIC_MODULO1_TESTIMONIALS_YOUTUBE_URL=https://youtu.be/HKqIZtlBz6I
```

## Checklist

- [ ] Seção própria criada, separada dos depoimentos individuais curtos
- [ ] Badge de duração "35 min" visível
- [ ] Texto de enquadramento como conteúdo de aprofundamento (não de decisão rápida)
- [ ] Embed com `youtube-nocookie.com`, `rel=0`, `modestbranding=1`, `playsinline=1`, sem autoplay
- [ ] Thumbnail customizada (não foto de rosto único capturada automaticamente)
- [ ] Posicionado depois dos depoimentos individuais curtos na ordem da página
- [ ] QA de peso de página (carregamento sob demanda, igual aos outros vídeos)
