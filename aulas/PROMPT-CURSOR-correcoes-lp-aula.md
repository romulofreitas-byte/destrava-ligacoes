# CORREÇÕES — LP `/aula/lead-antigo-nao-e-lead-morto`
### Repositório `destrava-ligacoes` · aula ao vivo em 21/09/2026 às 20:30 BRT
**Cole isto inteiro no Cursor (modo Agent) com o repo aberto. Execute na ordem. Pare e reporte depois do BLOCO 1.**

---

## CONTEXTO

A página já está em produção em `https://workshop.mundopodium.com.br/aula/lead-antigo-nao-e-lead-morto`.
A aula é **amanhã, 21/09/2026, 20:30–22:00 (America/Sao_Paulo)**, tem tráfego pago rodando apontando para ela,
e o link está sendo colado em grupos de WhatsApp. As correções abaixo saíram de uma auditoria da página publicada.

**Janela de execução: hoje à noite.** Prioridade é BLOCO 1. Os blocos 2 e 3 só entram se o 1 estiver fechado e deployado.

---

## REGRAS INEGOCIÁVEIS

1. **Não tocar no workshop.** `src/app/page.tsx`, `src/components/sections/*`, checkout, Asaas e GRID ficam intactos.
2. **Não criar rota, layout, API nem componente novo.** Todas as correções são em arquivos que já existem.
3. **Não redesenhar nada.** O tema atual (`gray-900`, `yellow-400`, Ubuntu/Montserrat, classes `aula-*`) é estado aceito. Não migrar para tokens `podium-*`.
4. **Não reescrever copy** que não esteja explicitamente listada abaixo.
5. `/aula` continua `noindex, nofollow`.
6. Toda data e hora é calculada em `America/Sao_Paulo`. Nunca no fuso do servidor.
7. Nenhum dado da aula hardcoded fora de `src/content/aulas.ts`.

---

# BLOCO 1 — CRÍTICO (fazer agora, nesta ordem)

## 1.1 · `og:image` está ausente

O `<head>` da página publicada tem `og:title`, `og:description`, `og:type`, `og:locale` e
`twitter:card: summary_large_image` — **e nenhuma imagem declarada**. Consequência: o link colado
no WhatsApp aparece como preview sem imagem, e o card do Twitter/X promete imagem grande que não existe.
Este é o item de maior impacto de conversão da noite.

**O que fazer:**

1. Adicionar ao tipo `Aula` em `src/content/aulas.ts` o campo `ogImage: string` e preencher em `LEAD_ANTIGO`
   com `/og/lead-antigo-nao-e-lead-morto.png`.
2. No `generateMetadata` de `src/app/aula/[slug]/page.tsx`, declarar:
   - `openGraph.images`: `[{ url: <absoluta>, width: 1200, height: 630, alt: <titulo> }]`
   - `twitter.images`: a mesma URL
   - `openGraph.url` e `alternates.canonical` com a URL absoluta da aula
   - `openGraph.siteName: 'Mundo Pódium'`, `openGraph.type: 'website'`, `openGraph.locale: 'pt_BR'`
   - **URLs absolutas**, nunca relativas. Se existir `metadataBase` no layout raiz, confirme que aponta para
     `https://workshop.mundopodium.com.br`; se não existir, defina.
3. **Fallback obrigatório:** criar `src/app/aula/[slug]/opengraph-image.tsx` usando `ImageResponse`
   (`next/og`), 1200×630, `runtime = 'edge'`, com:
   - fundo `#0D0D0F`
   - barra amarela `#F5B301` de 12px na lateral esquerda
   - título da aula em duas linhas, peso extrabold, branco
   - linha inferior em cinza `#CDCDD2`: `AULA AO VIVO · 21/09 · 20:30 · GRÁTIS · SEM GRAVAÇÃO`
   - fonte: se Sora não estiver disponível no runtime, usar a fonte do sistema. **Não bloquear o deploy por causa de fonte.**
4. Se `public/og/lead-antigo-nao-e-lead-morto.png` não existir no repo, o `opengraph-image.tsx` passa a ser a fonte —
   nesse caso não declare um caminho estático quebrado no metadata.

**Validar antes de seguir:** `curl -s <url> | grep -i 'og:image'` retorna a tag, a URL abre a imagem,
e a imagem responde `200` com `content-type: image/png`.

---

## 1.2 · "Amanhã, 20:30" está fixo em três lugares

A página publicada exibe **"Amanhã, 20:30"** no sticky do topo, no eyebrow do hero e no CTA final.
Se isso for string literal, amanhã — no dia da aula, com a campanha rodando — a página vai dizer
"Amanhã" para uma aula que acontece hoje. Erro visível o dia inteiro, na frente do tráfego pago.

**O que fazer:**

Criar um helper `getRelativeDayLabel(dataISO: string): string` em `src/lib/aula-date.ts` (ou onde já houver util de data),
que compara a data da aula com "agora" **em `America/Sao_Paulo`**, por dia de calendário — não por diferença de horas:

| Situação | Retorno |
|---|---|
| mesmo dia civil | `Hoje` |
| dia civil seguinte | `Amanhã` |
| 2 a 6 dias à frente | nome do dia da semana capitalizado (`Segunda`, `Terça`…) |
| 7 dias ou mais | `21/09` (dia/mês) |
| já passou | `Encerrada` |

Substituir as três ocorrências fixas por `` `${getRelativeDayLabel(aula.data)}, ${horaFormatada}` ``.

**Atenção a hidratação:** se o cálculo rodar no servidor e no cliente em fusos diferentes, o React vai acusar mismatch.
Resolva de uma destas duas formas, à sua escolha, e diga qual usou:
(a) calcular sempre com `Intl.DateTimeFormat` com `timeZone: 'America/Sao_Paulo'` nos dois lados, ou
(b) renderizar o rótulo em `useEffect` com um fallback estático `21/09` no primeiro paint.

**Teste obrigatório:** teste unitário do helper com datas fixas cobrindo os cinco casos da tabela,
incluindo a virada de meia-noite BRT.

---

## 1.3 · Seção "O que você sai sabendo fazer" está sem as descrições

Na página publicada os quatro itens renderizam **apenas o número e o título**. As descrições
(`Em 20 minutos você sabe em quem gastar tempo na lista antiga.`, `"Oi, lembra de mim?" mata a chamada nos
primeiros 4 segundos…`, etc.) não aparecem. É a seção que justifica o cadastro.

**O que fazer:** abrir o componente da seção de entregas em `src/components/aula/` e verificar se o campo
de descrição está sendo consumido do objeto `LEAD_ANTIGO`. Se estiver atrás de hover, acordeão ou `opacity`
condicionado a JS, **tornar visível por padrão, sempre, em todas as larguras**. Nada nessa seção pode depender
de interação para ser lido, principalmente no mobile.

---

## 1.4 · Hero duplicado no DOM

O eyebrow `AULA AO VIVO · <dia>, 20:30` aparece duas vezes no HTML, e o gancho mobile sai grudado no
subtítulo desktop (`Volta na lista que parou. Liga de novo.Como voltar na lista que parou e ligar de novo.`).
Provavelmente são as variantes mobile e desktop convivendo, uma escondida por CSS.

**O que fazer:**
- Confirmar que a variante oculta usa `hidden`/`md:block` de verdade (`display: none`), e não apenas
  `opacity: 0`, `visibility` ou posicionamento fora da tela.
- Marcar a variante duplicada com `aria-hidden="true"` para não ser lida duas vezes por leitor de tela.
- Se as duas variantes têm o mesmo conteúdo, eliminar uma e resolver a diferença só com classes responsivas.
- Renderizar apenas **um** `<h1>` na página.

**Validar em 390px de largura real:** o visitante não pode ler a mesma frase duas vezes no primeiro scroll.

---

## 1.5 · `<head>` herdado do workshop

- `meta description`, `og:description` e `twitter:description` estão saindo **com quebra de linha literal**
  (o `\n` usado para quebrar títulos vazou para a descrição). Aplicar `.replace(/\s+/g, ' ').trim()` no valor
  usado como description. O `\n` continua valendo para o H1 renderizado — só não pode ir para o metadata.
- Remover a `meta keywords` herdada do workshop (`workshop cold call, destravar ligações, anatomia da ligação…`).
  Ela não descreve esta página. Se for global no layout raiz, sobrescrever apenas na rota `/aula`, **sem alterar o workshop**.

---

## 1.6 · Número de lives desatualizado

No bloco do host a página exibe `170+ lives no YouTube`. **Esse é o número correto e oficial.**
Varrer o repositório por ocorrências de `130` ligadas a lives (`130+`, `130 lives`, `mais de 130`) e
corrigir todas para `170+`. Vale para `aulas.ts`, componentes, textos de e-mail e qualquer copy de anúncio
versionada no repo. Onde houver `422h`, padronizar para `400h+`.

---

# BLOCO 2 — AJUSTES DE COPY (rápidos, baixo risco)

Todos em `src/content/aulas.ts`, objeto `LEAD_ANTIGO`. Não mexer em mais nada.

**2.1 · FAQ "O que eu recebo agora?"**
De: `O link do Meet e o grupo no WhatsApp. Se o horário mudar, o aviso chega lá.`
Para: `O link do Meet e o grupo no WhatsApp. Se acontecer qualquer imprevisto, o aviso chega lá.`
*Motivo: "se o horário mudar" planta dúvida numa página cujo argumento inteiro é o horário fixo.*

**2.2 · Terceira prova (a sem nome)**
Remover o item `Uma tarde voltando na lista: 5 reuniões e 1 fechamento` / `Nomes parados no WhatsApp. A volta foi por ligação.`
Ficam só Otávio e Jonathan. *Motivo: prova anônima enfraquece as duas nomeadas ao lado.*
Se a remoção quebrar o layout do grid (espera 3 colunas), ajustar para 2 colunas centralizadas — sem redesenhar a seção.

---

# BLOCO 3 — SÓ SE SOBRAR TEMPO

**3.1 ·** Garantir que a página funcione com JS desabilitado até o formulário: hero, gancho e campos visíveis.
O contador pode não renderizar; o formulário, não.

**3.2 ·** `/aula/[slug]/obrigado` acessado diretamente dispara `Lead` + `CompleteRegistration` no pixel.
Condicionar o disparo à presença de um parâmetro ou flag setada no submit, para não inflar conversão
com acesso direto. **Não implementar se exigir mudança na API** — nesta janela não vale o risco.

---

## ORDEM DE EXECUÇÃO

1. BLOCO 1 inteiro, na ordem 1.1 → 1.6
2. `npm run build` local, sem erro de tipo nem warning de hidratação
3. **Parar e me mostrar:** o diff, o print do `<head>` gerado e a imagem OG renderizada
4. Deploy
5. BLOCO 2
6. BLOCO 3 se houver tempo

---

## CRITÉRIOS DE ACEITE

- [ ] `curl` na URL de produção retorna `og:image` e `twitter:image` com URL absoluta que responde 200
- [ ] Colar a URL no WhatsApp mostra preview **com imagem**, título e descrição em uma linha só
- [ ] A descrição no `<head>` não contém quebra de linha
- [ ] Não existe `meta keywords` do workshop na rota `/aula`
- [ ] Com a data do sistema em 21/09, a página exibe **"Hoje, 20:30"** nos três lugares
- [ ] Com a data em 20/09, exibe **"Amanhã, 20:30"**
- [ ] Teste do helper de data passa nos cinco casos, incluindo virada de meia-noite BRT
- [ ] Os quatro itens de entregas exibem título **e** descrição, sem interação, em 390px
- [ ] Em 390px, nenhuma frase do hero aparece duplicada; existe um único `<h1>`
- [ ] Nenhuma ocorrência de `130` referente a lives no repositório
- [ ] `/` (workshop) permanece byte a byte igual — confirme com `git diff --stat`
- [ ] `/aula/lead-antigo-nao-e-lead-morto` continua `noindex, nofollow`

---

**Antes de escrever código, liste os arquivos que vai criar ou alterar e aguarde confirmação.**
