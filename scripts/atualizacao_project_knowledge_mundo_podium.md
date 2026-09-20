# Atualização de Project Knowledge — Mundo Pódium
**Cole este conteúdo dentro do `Project_Knowledge_Mundo_Podium.md`, nas seções correspondentes (ou como novas seções).**
Consolida tudo que foi decidido/descoberto em sessões recentes de trabalho no site do Workshop, benchmarking de mercado e auditoria de marca.

---

## 1. Workshop Destrava Ligações — Status atual (11ª edição)

**Fonte única de verdade no código:** `src/lib/constants.ts` (repo `destrava-ligacoes`). Qualquer mudança de data, preço, âncora, vagas, edição ou copy de plataforma/FAQ deve ser feita lá primeiro.

| Item | Valor |
|---|---|
| Edição | 11ª |
| Preço | R$ 897,00 |
| Âncora ("de") | R$ 1.497,00 — baseada em faixa de preço de mercado (concorrentes tipo Sales Clube), **não é preço anterior real do próprio Workshop** — nunca exibir texto explicativo da âncora na página, só os dois números |
| Economia exibida | R$ 600 |
| Módulo 1 | 19/08/2026, 13h–17h |
| Módulo 2 (Sala de Ligação) | 25/08/2026, 08h–12h |
| Duração total | 8h (2×4h) |
| Acesso à Plataforma incluso | 60 dias a partir da compra |
| Continuidade pós-workshop (alumni) | a partir de R$ 59,90/mês |
| Preço público da Plataforma (não-aluno) | R$ 89,90/mês |
| Vagas | 6/20 preenchidas (30%) — **checar se ainda é verdade a cada retomada do assunto** |
| CNPJ oficial (rodapé, contratos) | 68.349.974/0001-19 — Mundo Pódium LTDA (substituiu definitivamente o CNPJ 43.393.622/0001-30, que foi baixado) |

**Estrutura da página (ordem, 19 seções):** Hero (com slot de vídeo de prova) → Teaser Rômulo → Banner de depoimento destaque → Módulos (accordion) → Live Calls → Detalhes do evento → Pra quem é → Por que você trava → Plataforma/"casa" → Vídeos de depoimento → Quem é o Rômulo → Por que é diferente → Aplicação por nicho → Transformações pós-workshop → Grid de depoimentos → FAQ → Garantia (com slot de vídeo) → CTA final → Footer.

**Correção pendente no footer:** a seção "Escuderia Pódium" (nome antigo, produto que não existe mais separado — foi absorvido pelo Acelerador 90 dias) precisa ser renomeada para "Acelerador 90 dias" em todo o bloco (título, CTA, logo), mantendo a descrição atual ("mentoria em grupo para transformar seu processo comercial e fechar seu primeiro contrato").

**Inconsistência de e-mail no rodapé:** contato ainda usa `romulo.freitas@combustivelmv.com` (domínio antigo da Combustível MV), enquanto o resto do rodapé já reflete "Mundo Pódium LTDA". Avaliar migrar para e-mail em domínio próprio da Mundo Pódium quando houver um configurado.

---

## 2. Sistema de cor — correção aplicada ao site do Workshop

O manual de marca define azul marinho de fundo e **amarelo Pódium como único accent**. Auditoria encontrou a paleta fragmentada (verde, roxo, vermelho, azul e laranja todos como destaque em seções diferentes, sem lógica semântica). Sistema corrigido, a aplicar/já em aplicação em toda a página:

- **Amarelo Pódium:** CTA de conversão, destaque de preço, badges de urgência/oferta.
- **Verde (único, reservado):** só para prova de resultado/sucesso — depoimentos com número, checks de benefício confirmado.
- **Neutro (cinza claro/branco):** ícones informativos sem carga positiva/negativa.
- Removido como accent: roxo, vermelho, azul, laranja em ícones/cards que antes usavam cores aleatórias sem lógica (ex.: os 8 ícones de "o que mudou na prática", os 4 cards de "por que você trava").

**Marquee (faixa de palavras-chave abaixo do hero):** redesenhado em glassmorfismo — fundo branco translúcido ~4% + blur, bordas amarelas finas ~15% opacidade, texto majoritário em branco ~55% opacidade com 2-3 palavras de maior impacto em amarelo cheio, separador em ponto amarelo, fade nas bordas laterais. Substitui a versão antiga (fundo branco, texto preto/laranja) que quebrava o tema dark da página.

**Hero:** foto estática do Rômulo substituída por player de vídeo (placeholder on-brand — borda tracejada amarela, símbolo da marca, botão de play translúcido, texto "vídeo em produção" — até o vídeo real ser gravado e plugado). Preço exibido apenas como R$1.497 riscado → R$897, sem texto explicativo. Contador + vagas consolidados numa linha compacta abaixo do CTA. Estrutura de duas colunas (copy à esquerda, vídeo à direita) obrigatória a partir do breakpoint desktop/tablet — empilhamento vertical restrito a mobile.

---

## 3. Vídeos — plano de produção (roteiro completo já escrito, pendente gravação)

Dois vídeos com slots já prontos no código (`HeroProofVideoSlot.tsx`, `WorkshopGuaranteeSection.tsx`), ativados via env vars (`NEXT_PUBLIC_HERO_PROOF_YOUTUBE_URL`/`NEXT_PUBLIC_HERO_PROOF_VIDEO_URL`, `NEXT_PUBLIC_GARANTIA_YOUTUBE_URL`).

- **Vídeo 1 (hero):** trecho real de ligação (não roteirizado), 60-90s, formato 3:4, sem overlay de texto queimado (a UI do site já sobrepõe o badge), com legenda de acessibilidade. Critério de seleção: início forte (já dentro da ligação), objeção sendo quebrada no meio, fechamento (reunião marcada) dentro do próprio clipe.
- **Vídeo 1B (continuação, só para anúncios/tráfego pago — não vai no site):** mesma sessão de gravação, corte para câmera após o fechamento da ligação, com fala direta de CTA. Existem 3 variações de fechamento roteirizadas (urgência de vaga / prova-autoridade / objeção do medo de ligar) para teste A/B em Reels/Stories, formato 9:16.
- **Vídeo 2 (garantia):** roteiro completo escrito, formato 16:9, ~45-60s, tomada única. Condição de garantia usada no roteiro (sugestão de trabalho, a confirmar/ajustar por Rômulo antes de gravar): reembolso integral, condicionado a ter participado da Sala de Ligação, prazo de 7 dias após o Módulo 2.

Roteiros completos (texto linha a linha de ambos os vídeos + as 3 variações de anúncio) estão no documento `roteiro_gravacao_workshop_11a.md`, gerado nesta rodada de trabalho.

---

## 4. Banco de depoimentos — relatório de OCR e curadoria

Rômulo rodou um script local (`build_depoimentos_content_report.py`) que faz OCR de 252 prints de depoimentos catalogados (31 tier "hero", 221 tier "gallery"), gerando `RELATORIO_DEPOIMENTOS_CONTEUDO.md` com texto extraído, tags, métricas detectadas e categoria (comunidade, destravamento, método, métricas, workshop). Esse relatório já foi usado para curadoria ativa — quando o Rômulo pedir para reforçar prova social em qualquer frente, primeiro checar esse relatório (se disponível no upload) antes de reler as imagens uma a uma.

**Depoimentos específicos já confirmados (texto + visual) como fortes para o Workshop e adicionados ao plano do site:**
- **Regularize Health / Robson Vieira** — gráfico de faturamento triplicado, já em uso no banner principal.
- **Izabela** — "4 reuniões agendadas na semana" após assistir a Live de ligação, liga resultado diretamente ao diferencial "ao vivo".
- **Lucas Ribeiro (Mentorado)** — funil completo em números (30 ligações → 10 atenderam → 5 decisores → 3 reuniões → 1 venda).
- **Gleice Souza** — elogia versatilidade multi-nicho do Rômulo no workshop ("não teve um nicho sequer que você não soubesse explicar"); prova textual direta do posicionamento multi-nicho, sem a marca precisar afirmar isso sozinha. Adicionar à seção de nichos ou ao banner.
- **Gilson Cas** — compara com concorrência ("já vi muita coisa por aí... a maioria é só 3 CPLs com pitch no final"), boa prova de diferenciação vs. modelo de infoproduto de massa.
- **Maycon Ferraz (texto, não repetir a foto)** — "10% eu adaptei pro meu nicho... foi um divisor de águas". Ele já aparece em vídeo na seção Plataforma; reforçar só com citação de texto em outro lugar da página evita repetição de rosto.
- **Depoimento de "5 R1 marcadas e 1 R2" (DEP-117)** — nome do autor não veio claro no OCR, checar a imagem original (`IMG_2432.PNG`) antes de publicar com atribuição.

**Descartado da curadoria:** um depoimento que cita "algumas centenas de milhares de reais investidos em treinamentos" como prova de autoridade — cifra vaga e não verificável, não usar.

**Pendência de curadoria geral:** a seção `TestimonialsScrollSection.tsx` ainda usa uma grade densa de prints pequenos e pouco legíveis (herança de versão antiga do site) — recomendação registrada de substituir por 4-6 cards grandes e legíveis no padrão dos depoimentos acima, em vez de volume bruto sem curadoria.

---

## 5. Benchmarking competitivo — síntese (relatórios completos já entregues como documentos separados)

Dois relatórios de pesquisa aprofundada foram concluídos, cobrindo o mercado brasileiro de treinamento em vendas/prospecção/cold call. Principais conclusões a reter:

- **Nenhum concorrente mapeado até agora replica a combinação "demonstração real e ao vivo de cold call + método aplicável a múltiplos nichos + acervo curado em plataforma paga"** — esse é o diferencial defensável do Mundo Pódium.
- **Exceção real e mais próxima: Lucas Felix** (lucasfelix.com, Agência Rugido) — faz lives semanais reais de prospecção com alunos discando para empresas reais, gravações ficam públicas e permanentes no YouTube. Mas ele é vertical (só vende serviço de agência de marketing/tráfego, ticket R$3.000/mês), enquanto o Mundo Pódium é multi-nicho por desenho. **Instrução permanente: nunca mencionar ou citar que ele foi inspiração pessoal do Rômulo** — usar apenas a diferenciação real (frequência, profundidade, foco em transformar o aluno em empresário, ênfase em mercado/regionalidade/sazonalidade, comunicação centrada em "atravessar o limbo").
- **Arquétipos de mercado identificados:** especialista-celebridade com prova por número (Thiago Concer, Thiago Reis/Growth Machine); curso corporativo/consultivo com credencial (Receita Previsível, Agendor, Vendas B2B Academy); mentoria cohort com cases nomeados (Super Vendedores); infoproduto de massa com VSL/urgência artificial (Vendaslab, VENDE-C); edu-tainment com esquetes encenadas de ligação (Bruno Fraga — ligações são ENCENADAS, não reais).
- **Faixas de preço de mercado, para referência comparativa:** infoproduto de piso R$37–130; entrada digital com credencial ~R$990; curso/comunidade intermediária ~R$1.297; cohort/mentoria high-ticket B2B ~R$20.000–43.000. O WDL (R$897) e o Acelerador (R$2.500–6.000) ficam numa faixa intermediária coerente, sem concorrente direto com o mesmo diferencial nessa faixa.
- **Recomendações já aplicadas ou em aplicação no site do Workshop:** garantia condicionada à execução (não resultado vago); preço aberto com FAQ que justifica (em vez de esconder até o checkout); urgência real de turma com data (não contador artificial); cases nomeados com número específico (em vez de números agregados genéricos tipo "500 mil treinados").

---

## 6. Auditoria de marca — presença pública (pendências reais)

- **YouTube:** canal migrado de `@combustivelmv` para `@mundopodium`, com descrição e keywords já corrigidas para refletir o posicionamento multi-nicho atual (cold call, prospecção ativa, SDR, BDR, mais keywords específicas de nicho como "prospecção para corretor de seguros", "cold call para advogado"). O problema antigo de keywords desalinhadas (engenharia civil, indústrias, representantes comerciais, produtos de limpeza) foi resolvido com a troca de canal.
- **LinkedIn:** ainda não corrigido. O que está indexado publicamente hoje é 100% imagem de palestrante industrial B2B (palestras na Capitólio Alimentos, Natupeixe, Semana Industrial Mineira) — não reflete o Mundo Pódium multi-nicho nem o diferencial de cold call ao vivo. **Pendência de ajuste separada do trabalho no site.**
- **Twitter/X:** encontrada uma conta antiga (2022) com o handle exato `@romulocsfreitas`, postando conteúdo político-partidário (torcida declarada nas eleições de 2022). **Não confirmado se é do Rômulo** — pendência de verificação pessoal dele. Se for a conta dele e ainda estiver pública, representa risco de inconsistência de marca (opinião político-partidária forte contra o posicionamento neutro/técnico construído no Mundo Pódium).
- **Instagram (@romulocsfreitas):** não auditável via ferramentas externas (plataforma não libera indexação de bio/conteúdo completo). Pendência: Rômulo colar o texto exato da bio atual para avaliação de alinhamento, se quiser essa auditoria completa.

---

## 7. Handoff técnico — referência rápida (para prompts futuros ao Cursor)

- Stack: Next.js App Router. Repositório `destrava-ligacoes`.
- Entrada da página: `src/app/page.tsx` → `src/components/sections/WorkshopPageContent.tsx`.
- Fonte única de dados: `src/lib/constants.ts` (objetos: `WORKSHOP_SALES`, `WORKSHOP_PRICING`, `WORKSHOP_INFO`, `WORKSHOP_MODULE_2_INFO`, `WORKSHOP_DURATION`, `WORKSHOP_PLATFORM_RULES`, `WORKSHOP_CLOSED_COPY`, `PLATAFORMA_MUNDO_PODIUM_COPY`, `PLATAFORMA_CASA_URL`).
- **Não misturar** com documentos/componentes do produto Proobra (`GUIA_*`, `RESUMO_*PROOBRA*`, `HeroSectionProobra.tsx`, `PainPointsMarqueeProobra.tsx`) — são de outra frente, não do Mundo Pódium.
- Screenshots do Circle em uso na seção Plataforma: `/Plataforma 1.png`, `/Plataforma 2.png`.
