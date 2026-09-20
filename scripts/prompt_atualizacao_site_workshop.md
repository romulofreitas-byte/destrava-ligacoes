# Prompt para Cursor — Atualizar site do Workshop Destrava Ligações

Cole este prompt no Cursor, no repositório do site `workshop.mundopodium.com.br`.

---

## Contexto pro agente

Esse site passou por uma mudança temporária: como não havia data confirmada pra próxima turma do Workshop, a home foi ajustada pra parar de vender vaga e redirecionar visitantes pra assinatura avulsa da Plataforma (R$89,90/mês). É por isso que o estado atual do site mostra "Vagas encerradas", remete pra Plataforma como CTA principal, e não tem barra de progresso de vagas.

Agora existe data nova e o objetivo volta a ser vender vaga do Workshop. **Antes de aplicar qualquer alteração de conteúdo abaixo, reverta a estrutura da página para a versão anterior que vendia o Workshop ativamente** — aquela que tinha:
- Hero de venda ativa (não o hero atual de "vagas encerradas, vá pra Plataforma")
- Barra de progresso de vagas / indicador de vagas restantes
- Copy de urgência e CTA de compra, não de redirecionamento

Use o histórico do Git para localizar o commit anterior à mudança que passou o site pro modo "redireciona pra Plataforma" (procure por commits que alteraram hero, CTA principal e a seção de "Vagas encerradas"). Volte essa estrutura como base, e só então aplique as mudanças de conteúdo listadas abaixo. Não misture: não é pra pegar a estrutura atual (modo redirecionamento) e só trocar textos — é pra restaurar o modo de venda e atualizar os dados dele.

Se não for possível localizar a versão anterior no histórico do Git, sinalize isso antes de prosseguir, em vez de tentar reconstruir a estrutura de memória.

---

## 1. Datas do Workshop

Trocar em todo o site (banner de topo, hero, seção "10ª Edição", calendário dos módulos, seção "Detalhes do Workshop", e qualquer outro lugar que cite 08/07 e 09/07):

- **Módulo 1:** dia 19
- **Módulo 2:** dia 25

> Confirmar com Rômulo o mês exato antes de publicar — o texto atual usa julho (08/07 e 09/07); as novas datas (19 e 25) precisam do mês confirmado para não sair errado no ar.

Manter os horários de cada módulo como estão hoje (13h–17h módulo 1 / 8h–12h módulo 2), a menos que Rômulo peça mudança de horário também — não foi pedido, então não alterar.

## 2. Preço

Trocar **todas** as menções de R$497,00 para **R$897,00**, incluindo:
- Seção "Por Que Este Workshop é Diferente" ("Investimento de R$497,00 para garantir comprometimento...")
- Bloco "Investimento Simbólico, Entrega Real"
- FAQ "Por que custa R$497,00?" — atualizar pergunta e resposta para R$897,00
- Qualquer botão de checkout, metadado de produto (schema.org/JSON-LD se houver), ou integração de pagamento que referencie o valor antigo

## 3. Acesso à Plataforma incluso

Manter em **60 dias** — já está correto no texto atual ("acesso incluso no ingresso segue até 60 dias após a compra"). Só confirmar que essa informação continua presente e consistente em todos os lugares que a mencionam (hero, seção de bônus, FAQ) depois de restaurar a estrutura de venda.

## 4. Rodapé — CNPJ

O CNPJ que aparece hoje no rodapé (43.393.622/0001-30) **não deve mais ser usado** — foi baixado. O Mundo Pódium tem CNPJ novo já regularizado, mas o número exato ainda não foi confirmado.

Ação: remover a linha do CNPJ do rodapé por enquanto (ou deixar um placeholder claro tipo `CNPJ: [aguardando número atualizado]` visível só em ambiente de dev, nunca em produção) até que o número novo seja enviado. Não publicar com o CNPJ antigo nem inventar um número.

## 5. Checklist final antes de publicar

- [ ] Estrutura de venda restaurada (hero + barra/indicador de vagas + CTA de compra)
- [ ] Datas trocadas para 19 e 25, mês confirmado com Rômulo
- [ ] Todas as menções de R$497,00 substituídas por R$897,00 (incluindo checkout/integração de pagamento)
- [ ] Acesso de 60 dias à Plataforma confirmado nos textos
- [ ] CNPJ antigo removido do rodapé; nenhum CNPJ novo publicado sem confirmação
- [ ] Depoimentos, FAQ e seções de prova social mantidos como estão (não fazem parte desta mudança)
