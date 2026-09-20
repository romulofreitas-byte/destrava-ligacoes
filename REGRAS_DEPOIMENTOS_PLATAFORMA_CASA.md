# Regras de uso — Depoimentos na página da Casa / Plataforma Mundo Pódium

Documento para curadoria e implementação de prova social em **`https://casa.mundopodium.com.br/`** (e seções equivalentes da **Plataforma Mundo Pódium** no Circle).

**Não misturar** com a landing do Workshop (`workshop` / Destrava Ligações), salvo exceções explícitas no final.

---

## 1. Objetivo da página

A Casa vende (ou apresenta) a **plataforma contínua**: treino ao vivo, mentorias, ritmo com Pilotos, comunidade e acervo no Circle — não um evento pontual.

Cada depoimento na página deve responder a pelo menos uma destas perguntas:

| Pergunta do visitante | O que o print precisa provar |
|-----------------------|------------------------------|
| “Isso é só mais um curso?” | Que é **casa / comunidade / plataforma** com acesso contínuo |
| “Vale a assinatura / continuar depois?” | ROI, pertencimento, ritmo, networking, mentorias |
| “Tem gente de verdade?” | Nome, foto, tom de membro ativo (não anúncio genérico) |
| “O que acontece lá dentro?” | Sala, live, mentoria, Circle, troca entre Pilotos |

Se o print só elogia **uma edição de workshop** ou um **resultado de ligação sem citar a casa**, ele é secundário ou fica fora desta página.

---

## 2. Fonte canônica de assets

| Item | Caminho |
|------|---------|
| Prints prontos (telefone borrado) | `public/depoimentos-2026-ready/` |
| Categoria prioritária | arquivos com `_comunidade_` no nome |
| Inventário textual | `RELATORIO_DEPOIMENTOS_CONTEUDO.md` |
| Manifesto source → output | `public/depoimentos-2026-ready/manifest.json` |
| Originais brutos (nunca publicar) | `public/Depoimentos - 2026/` |

Padrão de nome: `{tier}_{categoria}_{slug}[_comp-x][_parte-n].png`

- **Tier `hero/`** — candidatos a destaque (acima da dobra / featured).
- **Tier `gallery/`** — grade, carrossel, lightbox, reforço.

Na Casa, a maioria dos prints de plataforma está em **`gallery/` + categoria `comunidade`** (~41 arquivos). Use também prints de outras categorias **somente** se o texto citar plataforma, Circle, comunidade, mentoria contínua ou “casa”.

---

## 3. O que ENTRA na página da Casa

### 3.1 Prioridade alta (usar primeiro)

Mensagens que citam explicitamente:

- **plataforma / Circle / comunidade / Mundo Pódium / Pilotos**
- **mentorias recorrentes** (Seg/Qui, “toda mentoria”, ritmo)
- **Sala de Ligação** como hábito da casa (não só “live do workshop”)
- **networking / grupo / mina de ouro / pertencimento**
- **ROI da continuidade** (ex.: investimento na plataforma + resultado)

### 3.2 Prioridade média (usar com cuidado)

- Resultados de métricas (reuniões, vendas) **se** o contexto for membro da comunidade / aplicação contínua — não se parecer “só workshop de 2 dias”.
- Destravamento emocional **se** atribuído à convivência / lives / mentorias da casa.

### 3.3 Shortlist sugerida (plataforma / comunidade)

Use estes como base de curadoria (sempre conferir o print antes de publicar):

| Arquivo (em `gallery/`) | Por que serve à Casa |
|-------------------------|----------------------|
| `gallery_comunidade_guilherme-alves-elogia-argumento-do-grup_parte-1.png` (+ parte-2 se complementar) | Comunidade = “mina de ouro” |
| `gallery_comunidade_mayara-curitiba-cumprimenta-o-grupo-e-di.png` | Acolhimento / “adorando a comunidade” |
| `gallery_comunidade_aluno-novo-elogia-a-sintonia-e-o-valor-d.png` | Valor do grupo desde o 1º dia |
| `gallery_comunidade_apos-live-emocional-membros-reforcam-con_parte-1.png` (+ parte-2) | Conexão pós-live / jornada compartilhada |
| `gallery_comunidade_gente-so-facam_parte-1.png` (série parte-1…4) | Prova de ação + validação de empresários no grupo |
| `gallery_comunidade_bruno-henrique-da-nota-1000-e-chama-a-en.png` | Entrega / nota máxima |
| `gallery_comunidade_victor-diz-que-a-equipe-adorou-e-pede-o.png` | Pedido de link da comunidade (desejo de entrada) |
| `hero_destravamento_elogio-workshop.png` *(hero; texto fala de plataforma)* | Alanis: **“plataforma foi um divisor de águas”** — forte para Casa; **não** tratar como depoimento só de workshop |

**Cruzamento forte com pilares da Casa** (também úteis fora da pasta `comunidade`):

| Tema do pilar | Preferir prints que… |
|---------------|----------------------|
| Sala de Ligação | Citem live / sala / ligar junto / treino ao vivo |
| Mentorias Seg/Qui | Citem mentoria, frequência, “toda mentoria” |
| PódiumFlix / acervo | Citem vídeos, revisitar conteúdo, Circle |
| Comunidade + Corrida ao Vivo | Citem grupo, Pilotos, networking, ritmo |

Maycon (ROI / divisor de águas / vídeo com tour Circle) é **prova de plataforma + resultado** — adequado à Casa; no workshop, evitar duplicar o mesmo print se o vídeo já estiver na seção da casa.

---

## 4. O que NÃO entra (ou entra só como exceção)

### Bloquear na página da Casa

1. **Depoimentos 100% de edição de workshop** (“workshop de hoje”, “turma”, “módulo 1/2”) sem menção à continuidade / casa / Circle.
2. Prints cujo highlight é **só pitch de compra do workshop** (preço do ingresso, “melhores R$50”) — isso é landing de evento.
3. **Humor puro / figurinha / bordão** sem valor de produto (`vertinho`, “pedir truco”, “ce é bom demais”) — ok em stories internos; fraco em página de produto.
4. **Prints cortados ilegíveis**, sem nome, ou com UI de notificação sem contexto (`notificacao-de-que-metaforando…`).
5. **Originais sem blur de telefone** — nunca. Só arquivos em `depoimentos-2026-ready/`.
6. **Duplicar a mesma pessoa** na mesma viewport com o mesmo ângulo (ex.: Alanis “workshop” + Alanis “plataforma” lado a lado). Escolher **um** ângulo por página.
7. Depoimentos que prometem resultado **garantido** ou tom de “fique rico” — preferir prova específica e sóbria.

### Exceção permitida

Um resultado numérico “quente” (ex.: Regularize, Lucas) **pode** aparecer na Casa **somente** se o bloco de copy deixar claro que o método / ritmo da **plataforma** sustenta o resultado — nunca como prova isolada de “compre o workshop”.

---

## 5. Regras de apresentação (UI / copy)

### 5.1 Anatomia do card (padrão Mundo Pódium)

Seguir o espírito de `WorkshopProofCard`:

1. **Print** (telefone já borrado) — preferir `fitToImage` / lightbox se o texto for longo  
2. **Highlight** — 1 frase curta, impacto (não o parágrafo inteiro)  
3. **Nome** — como aparece no print  
4. **Papel** — na Casa, preferir rótulos como:
   - `Membro da Casa`
   - `Piloto da comunidade`
   - `Comunidade Mundo Pódium`
   - Evitar `Participante do Workshop` nesta página (salvo o print ser exclusivamente de workshop e você tiver aceito a exceção)
5. **Body quote** (opcional) — 1–2 frases; o print carrega o resto

### 5.2 Headline da seção

A seção de depoimentos na Casa deve soar **casa / comunidade / continuidade**, não “o que a turma do workshop disse”.

Exemplos de framing:

- “O que os Pilotos vivem dentro da casa”
- “Prova de quem treina no ritmo da comunidade”
- Evitar: “Depoimentos da última turma do workshop”

### 5.3 Quantidade

- **Acima da dobra / featured:** 1–3 cards máximos (qualidade > volume).
- **Grade:** 4–8 cards; se precisar de mais, carrossel — nunca mosaico ilegível de prints minúsculos.
- **Uma pessoa = um slot** por seção, salvo partes complementares do mesmo fio (`parte-1` + `parte-2`) tratadas como **um** depoimento (lightbox ou stack).

### 5.4 Complementares (`comp-*` / `parte-*`)

- Não espalhar `parte-1…4` como 4 cards diferentes na grade.
- Escolher a **melhor parte** (nome + frase legível) ou agrupar no mesmo card/lightbox.

---

## 6. Privacidade e compliance

1. Publicar **somente** PNG de `depoimentos-2026-ready/` (telefones borrados no pipeline).
2. Se entrar print novo: processar com `scripts/process_depoimentos_ready.py` (ou blur pontual) **antes** de commit.
3. Allowlist no `.gitignore` se a pasta `hero/` ou `gallery/` estiver ignorada por padrão — senão o deploy quebra.
4. Não expor número, e-mail ou dados de terceiros no alt text / highlight.
5. Alt text: descrever **resultado ou tema**, não “print de WhatsApp do fulano +55…”.

---

## 7. Separação Casa × Workshop (anti-canibalização)

| Critério | Página da Casa | Landing do Workshop |
|----------|----------------|---------------------|
| Foco | Continuidade, Circle, comunidade, mentorias | Evento, módulos, inscrição |
| Categoria preferida | `comunidade` (+ plataforma no texto) | `workshop` + `metricas` de resultado rápido |
| Rótulo do card | Membro / Piloto / Casa | Participante do Workshop / Mentorado |
| Maycon vídeo + tour | Primário aqui | Evitar repetir o mesmo bloco |
| “Workshop sensacional / turma” | Secundário ou fora | Primário |
| “Plataforma divisor de águas / mina de ouro” | Primário | Só se reforçar acesso incluso pós-compra |

**Regra prática:** se o highlight puder ser lido sem a palavra *workshop* e ainda vender a Casa, ele pertence à Casa. Se sem *workshop* o print perde o sentido, ele pertence ao Workshop.

---

## 8. Checklist antes de publicar na Casa

- [ ] Print em `depoimentos-2026-ready/` (não na pasta bruta)
- [ ] Telefone ilegível no arquivo final
- [ ] Texto prova **casa / comunidade / plataforma / ritmo**, não só evento
- [ ] Highlight ≤ ~70 caracteres, frase memorizável
- [ ] Papel = membro/piloto/casa (não “participante do workshop”, salvo exceção)
- [ ] Sem duplicar pessoa/ângulo já usado na mesma página
- [ ] Complementares agrupados (não 4 cards do mesmo fio)
- [ ] Alt text sem dados sensíveis
- [ ] Asset allowlisted + commitado se a pasta estiver no `.gitignore`
- [ ] Conferência mobile: texto do print legível ou lightbox disponível

---

## 9. Como puxar candidatos do inventário

No `RELATORIO_DEPOIMENTOS_CONTEUDO.md` / `manifest.json`:

1. Filtrar `category == comunidade` **ou** resumo/OCR com: `plataforma`, `circle`, `comunidade`, `mentoria`, `piloto`, `casa`.
2. Descartar humor vazio, notificação sem contexto, print ilegível.
3. Priorizar: nome visível + frase de pertencimento/ROI/ritmo + boa legibilidade.
4. Preencher (quando for o caso) `frente_produto_sugerida = Casa / Plataforma Mundo Pódium` e `uso_sugerido = hero | grade | pilar Sala | pilar Mentoria | pilar Comunidade`.

---

## 10. Referências no repo

- Seção atual na landing do workshop (framing casa): `src/components/sections/PlataformaMundoPodiumSection.tsx`
- Copy da casa: `PLATAFORMA_MUNDO_PODIUM_COPY` em `src/lib/constants.ts`
- URL: `PLATAFORMA_CASA_URL` → `https://casa.mundopodium.com.br/`
- Componente de card: `src/components/ui/WorkshopProofCard.tsx`
- Inventário: `RELATORIO_DEPOIMENTOS_CONTEUDO.md`
- Pipeline: `scripts/process_depoimentos_ready.py`

---

*Última orientação: na dúvida entre dois prints, escolha o que fala de **pertencer e continuar**, não o que fala de **ter ido a um evento**.*
