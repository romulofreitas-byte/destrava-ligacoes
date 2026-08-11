-- Schema para relatório de acessos em /admin/acessos
-- Execute no SQL Editor do Supabase (idempotente)

CREATE TABLE IF NOT EXISTS site_pageviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  referrer TEXT,
  session_id TEXT,
  device_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_site_pageviews_created_at ON site_pageviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_pageviews_path ON site_pageviews(path);
CREATE INDEX IF NOT EXISTS idx_site_pageviews_session_id ON site_pageviews(session_id);

COMMENT ON TABLE site_pageviews IS 'Pageviews do site para o painel /admin/acessos';
