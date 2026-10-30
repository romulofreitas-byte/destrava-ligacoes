-- Sala de Guerra Pós-Eleição
-- Coluna nullable. O insert das outras aulas não envia este campo.
-- Rodar na mão. Não apaga nem reescreve linha nenhuma.

ALTER TABLE inscricoes
  ADD COLUMN IF NOT EXISTS respostas JSONB;

COMMENT ON COLUMN inscricoes.respostas IS
  'Respostas extras da aula. Sala de Guerra: nicho, frase_lead, maior_trava, utm_*.';
