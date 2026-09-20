# Prompt para Cursor — Otimização completa da página do Workshop Destrava Ligações

Cole este prompt no Cursor, no repositório do site `workshop.mundopodium.com.br`. Está organizado por prioridade de execução. Trabalhe na ordem apresentada — os itens da seção 1 são bloqueantes e devem ser resolvidos antes de qualquer outro ajuste.

---

## 1. BLOQUEANTE — corrigir antes de investir em tráfego pago

### 1.1 Trocar CNPJ antigo pelo novo no rodapé
O rodapé mostra `CNPJ: 43.393.622/0001-30`. Esse CNPJ foi baixado e não pode mais aparecer em nenhum lugar público do site. Substituir pelo CNPJ novo e já regularizado:

`CNPJ: 68.349.974/0001-19 — Mundo Pódium LTDA`

Conferir se a razão social em qualquer outro lugar do site/documentos que cite "Combustível Marketing e Vendas" ou o CNPJ antigo também precisa ser atualizada para Mundo Pódium LTDA, já que o contexto de negócio migrou.

### 1.2 Atualizar ano do copyright
Rodapé mostra `© 2025 Mundo Pódium`. Trocar para `© 2026` (ou lógica dinâmica `© {new Date().getFullYear()}` para não precisar editar manualmente todo ano).

### 1.3 Testar renderização do hero
Em uma captura de página completa, o espaço entre o header (data/hora do topo) e a seção de depoimentos apareceu em branco — como se o hero (headline, foto do Rômulo, botão de compra, barra de vagas) não tivesse carregado. Testar em:
- Janela anônima, desktop e mobile
- Conexão 4G simulada (throttling no DevTools)
- Pelo menos 2 navegadores diferentes (Chrome e Safari)

Se o hero falhar em renderizar em qualquer cenário, é bloqueante — é a primeira coisa que qualquer visitante vê.

---

## 2. CONTEÚDO — nichos e público

### 2.1 Reescrever "Como o método se adapta ao seu nicho"
Hoje a seção mostra apenas dois cards: "Para Quem Trabalha com Serviços" (genérico: freelancers, tráfego pago, social media, agência, consultoria) e "Para Quem Trabalha com Investimentos". Isso não reflete a base real de alunos do Mundo Pódium, que inclui fortemente seguros, planos de saúde, jurídico e contabilidade — nichos que já são o nicho do profissional, não precisam de "adaptação de linguagem genérica de serviço".

**Ação:** expandir para 3-4 cards nomeados, seguindo o padrão do card de Investimentos (que já está no formato certo: linguagem específica + objeções nomeadas). Sugestão de cards:

- **Seguros e Planos de Saúde** — corretores e consultores. Objeções: "já tenho corretor", "isso é golpe?", "me manda a cotação por WhatsApp".
- **Jurídico** — advogados captando clientes no digital/telefone. Objeções: "isso é permitido pela OAB?", "advogado bom não precisa ligar".
- **Contabilidade** — objeções: "meu contador atual já resolve", "isso é coisa de vendedor, não de contador".
- **Serviços/Agência** (manter o existente, mas mais específico que hoje).

Cada card deve seguir a estrutura do card de Investimentos: 2-3 bullets de linguagem/abordagem específica + lista de objeções comuns do setor com a virada de jogo.

### 2.2 Adicionar bloco "Quem é o Rômulo" mais cedo na página (versão para tráfego pago)
Hoje esse bloco está no meio-fim da página. Para quem chega por anúncio pago (não conhece o Rômulo), a pergunta "por que confiar nesse cara" precisa de resposta mais cedo. Considerar uma versão A/B da página com esse bloco reposicionado mais próximo do hero, ou uma versão resumida (foto + 2 linhas + selo "ligações reais ao vivo") logo abaixo do hero, mantendo a versão completa na posição atual.

---

## 3. COPY — textos a reescrever

### 3.1 Fechamento antes do rodapé
Texto atual: *"Este Workshop é a primeira etapa para dominar prospecção ativa com consistência. No final, você terá clareza sobre o próximo passo."*
Fraco — não reforça prova nem urgência. Reescrever para algo como: *"Você sai do Workshop com script pronto, primeiras ligações feitas e 60 dias na Plataforma pra continuar. [inserir dado real de vagas restantes ou próxima turma]."* Ajustar à informação real de disponibilidade no momento.

### 3.2 Revisar resposta do FAQ "Por que custa R$ 897,00?"
Confirmar que a resposta não ficou presa ao raciocínio antigo de R$497 ("investimento simbólico que garante comprometimento"). Em R$897 o argumento pode evoluir para refletir entrega e qualidade, não só filtro de acesso.

### 3.3 Adicionar pergunta ao FAQ sobre horário/fuso
Não há pergunta explícita tipo "e se eu não puder participar no horário ao vivo?" — mesmo já havendo prova social de quem assistiu à gravação. Adicionar a pergunta e resposta explícita (mencionar gravação disponível, prazo de acesso).

### 3.4 Adicionar clareza de pós-compra
A página não informa o que acontece imediatamente após o pagamento (confirmação por e-mail? Grupo de WhatsApp da turma? Convite de calendário?). Adicionar um bloco curto de "o que acontece depois que você compra" — reduz fricção de última hora e ansiedade pós-clique.

---

## 4. GARANTIA — elemento ausente

Não há nenhuma garantia ou reversão de risco em nenhum bloco da página. Objeção "e se não funcionar pra mim" fica sem resposta.

**Ação:** adicionar um bloco de garantia condicionada à execução, coerente com a filosofia da marca (nada de "garantia de resultado" vaga — deve ser condicionada a fazer o que o workshop pede). Sugestão de estrutura: *"Fez as ligações da Sala de Ligação e não evoluiu? [condição de reembolso a definir com o Rômulo]."* Posicionar perto do CTA final e/ou do FAQ. Este texto precisa ser validado pelo Rômulo antes de publicar — não inventar termos de reembolso sem confirmação dele.

---

## 5. VÍDEO — prova em movimento

O maior diferencial (ligação real ao vivo) hoje só aparece em vídeo no meio da página, dentro da seção mais longa (ecossistema/plataforma), longe do hero.

**Ação:** produzir e inserir um clipe curto (60-90s) logo no hero ou imediatamente abaixo dele — não é VSL de venda tradicional (sem contador falso, sem "gancho de dor" manipulador), é um clipe de prova: trecho real de ligação + corte para o resultado. Formato recomendado: vertical/quadrado para boa exibição em mobile, com legendas embutidas (a maioria assiste sem áudio no feed).

---

## 6. URGÊNCIA REAL — adicionar

### 6.1 Contagem regressiva para o Módulo 1
Já existe a barra "vagas preenchidas · 27%", que é urgência real e deve ser mantida. Adicionar também uma contagem regressiva para a data do Módulo 1 (19/08) — é urgência genuína de calendário (evento tem data marcada), diferente de contador manipulável. Não usar contador que reseta ou é o mesmo para todo visitante independente da data real.

### 6.2 Trocar percentual por número absoluto na barra de vagas
"27%" é mais abstrato que "6 de 20 vagas preenchidas". Números absolutos convertem melhor por serem mais concretos — usar o dado real de inscritos.

---

## 7. DESIGN — sistema de cor

### Problema
A paleta de accent está fragmentada: amarelo, verde, roxo, vermelho, azul e laranja aparecem todos como cor de destaque em diferentes seções, sem lógica semântica consistente. O manual de marca define azul marinho como fundo e **amarelo Pódium como único accent**.

### Ação — reduzir para 3 cores de sistema:
1. **Amarelo Pódium** — CTA de conversão, destaque de preço, badges de urgência/oferta.
2. **Verde** (único, reservado) — apenas para prova de resultado/sucesso: depoimentos com número, checks de benefício confirmado. Não usar em ícones informativos neutros.
3. **Neutro** (cinza claro/branco sobre o fundo navy) — ícones informativos sem carga positiva/negativa (ex.: "Formato", "Duração", "Plataforma" na seção de detalhes do evento).

**Remover como accent:** roxo, vermelho, azul, laranja. Isso afeta especificamente:
- Os 8 ícones de "O que mudou na prática" (case do Maycon) — hoje cada um tem uma cor diferente sem lógica; padronizar em neutro, exceto os que representam resultado direto (Ganho na R1, Volume), que podem usar verde.
- Os 4 cards de "A VERDADE: por que você trava" (vermelho, dourado, azul, laranja) — são 4 problemas de mesmo peso; padronizar todos com a mesma cor de ícone (sugestão: neutro ou um único tom de aviso, não quatro cores diferentes).
- Badge "Mundo Pódium" em roxo — avaliar se deve virar amarelo para reforçar identidade de marca.

### 7.1 Padronizar cor dos checkmarks
"O Que Você Vai Aprender" usa checks verdes; "O Que Você Sai Capaz de Fazer" usa checks roxos. Mesmo tipo de elemento, cores diferentes. Padronizar — sugestão: verde para ambos (é conteúdo de benefício/resultado confirmado).

### 7.2 Trocar cor do CTA principal
Botão final "Garantir Minha Vaga Agora" está verde — fora da paleta de marca. Trocar para amarelo Pódium (ou rodar teste A/B verde vs. amarelo antes de decidir definitivamente).

### 7.3 Corrigir contraste do CTA-âncora intermediário
O botão "Garantir vaga ↓" no meio da página (âncora que rola até o formulário) está escuro sobre fundo escuro, quase invisível. Aumentar contraste — pode usar contorno amarelo ou fundo levemente mais claro.

### 7.4 Confirmar fonte da marca
O manual especifica Calibri. A tipografia atual do site parece ser uma fonte geométrica de SaaS (estilo Inter), não Calibri. Confirmar com quem codificou o site qual fonte está de fato carregada e corrigir se necessário.

### 7.5 Estilizar o banner de cookies
O banner de cookies é branco, estilo padrão de plugin, destoando visualmente do resto da página (dark navy com glow). Aplicar um estilo dark consistente com o resto do site.

---

## 8. PROVA SOCIAL — curadoria em vez de volume

### 8.1 Substituir a grade densa de prints por depoimentos curados
A seção "O que pilotos da comunidade estão dizendo" tem uma grade com dezenas de prints minúsculos, vários ilegíveis (especialmente em mobile). Isso é volume bruto sem curadoria — o oposto do padrão de qualidade já validado (ex.: os depoimentos de Regularize Health e Izabela, que têm nome, resultado e boa legibilidade).

**Ação:** substituir a grade por 4-6 cards no mesmo padrão visual do depoimento de Lucas Ribeiro (grande, legível, nome + resultado + citação). Usar como base:
- Regularize Health / Robson Vieira (já usado no topo — pode repetir ou usar variante)
- Izabela — 4 reuniões na semana após a Live
- Lucas Ribeiro Mentorado — 30 ligações → 3 reuniões → 1 venda (já usado — reforçar aqui também é válido)
- Mais 2-3 do relatório completo de 252 depoimentos catalogados (o Rômulo pode indicar quais priorizar, ou pedir para o Claude selecionar mais candidatos)

Se quiser manter algum volume visual de prova social bruta, colocar como elemento secundário/decorativo (ex. mosaico borrado ao fundo de uma seção), nunca como conteúdo principal que a pessoa precisa conseguir ler.

---

## 9. PERFORMANCE

### 9.1 Testar velocidade de carregamento
A página tem muitas imagens de depoimento em alta resolução, incluindo a grade densa mencionada no item 8. Rodar teste de PageSpeed Insights / Core Web Vitals antes de escalar tráfego pago — a maior parte do tráfego de anúncio vem via Instagram/mobile, onde peso de página impacta conversão diretamente. Otimizar/comprimir imagens de depoimento, usar lazy loading para imagens abaixo da dobra.

---

## 10. Checklist final

- [ ] CNPJ antigo trocado pelo novo (68.349.974/0001-19 — Mundo Pódium LTDA) no rodapé
- [ ] Ano do copyright atualizado
- [ ] Hero testado e confirmado renderizando em mobile/anônimo/múltiplos navegadores
- [ ] Seção de nichos expandida com Seguros/Saúde, Jurídico, Contabilidade
- [ ] Bloco "Quem é o Rômulo" avaliado para reposicionamento (ou versão A/B)
- [ ] Texto de fechamento reescrito com prova + urgência real
- [ ] FAQ de preço revisado para refletir R$897 (não a lógica antiga de R$497)
- [ ] FAQ de horário/fuso adicionado
- [ ] Bloco de clareza pós-compra adicionado
- [ ] Garantia condicionada à execução adicionada (termos validados pelo Rômulo antes de publicar)
- [ ] Clipe de vídeo de prova (60-90s) inserido próximo ao hero
- [ ] Contagem regressiva para o Módulo 1 adicionada
- [ ] Barra de vagas trocada de percentual para número absoluto
- [ ] Sistema de cor reduzido a amarelo/verde/neutro em toda a página
- [ ] Checkmarks padronizados na mesma cor em todas as seções
- [ ] CTA principal trocado para amarelo Pódium (ou em teste A/B)
- [ ] Contraste do CTA-âncora intermediário corrigido
- [ ] Fonte confirmada como Calibri (ou corrigida)
- [ ] Banner de cookies estilizado em dark mode
- [ ] Grade de prints ilegíveis substituída por depoimentos curados
- [ ] Teste de performance/PageSpeed rodado e otimizações aplicadas
