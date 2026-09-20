-- Inscrições das aulas ao vivo. Pode rodar de novo se a tabela já existir.

CREATE TABLE IF NOT EXISTS inscricoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  nome TEXT NOT NULL,
  email TEXT,
  whatsapp TEXT NOT NULL,
  consentimento BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE inscricoes ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE inscricoes ADD COLUMN IF NOT EXISTS nome TEXT;
ALTER TABLE inscricoes ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE inscricoes ADD COLUMN IF NOT EXISTS whatsapp TEXT;
ALTER TABLE inscricoes ADD COLUMN IF NOT EXISTS consentimento BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE inscricoes ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

UPDATE inscricoes
SET slug = 'lead-antigo-nao-e-lead-morto'
WHERE slug IS NULL OR btrim(slug) = '';

ALTER TABLE inscricoes ALTER COLUMN slug SET NOT NULL;
ALTER TABLE inscricoes ALTER COLUMN nome SET NOT NULL;
ALTER TABLE inscricoes ALTER COLUMN whatsapp SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_inscricoes_slug_whatsapp
  ON inscricoes (slug, whatsapp);

CREATE INDEX IF NOT EXISTS idx_inscricoes_created_at
  ON inscricoes (created_at DESC);

ALTER TABLE inscricoes ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE inscricoes IS 'Inscrições de aulas ao vivo gratuitas';
COMMENT ON COLUMN inscricoes.whatsapp IS 'Telefone normalizado em E.164';
