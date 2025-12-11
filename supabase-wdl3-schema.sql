-- Schema SQL para criar a tabela wdl3 no Supabase
-- Execute este script no SQL Editor do Supabase
-- IMPORTANTE: Este script é idempotente - pode ser executado múltiplas vezes sem problemas

-- Criar tabela wdl3
-- A constraint UNIQUE em charge_id é essencial para o funcionamento do upsert
CREATE TABLE IF NOT EXISTS wdl3 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  charge_id TEXT UNIQUE NOT NULL, -- Constraint UNIQUE necessário para upsert com onConflict
  reference_id TEXT,
  
  -- Dados do Cliente
  nome TEXT,
  email TEXT,
  tax_id TEXT, -- CPF/CNPJ
  telefone_country TEXT,
  telefone_area TEXT,
  telefone_number TEXT,
  
  -- Dados do Pagamento
  status TEXT NOT NULL,
  amount INTEGER, -- Valor em centavos
  amount_brl DECIMAL(10, 2), -- Valor em reais
  payment_method TEXT, -- PIX, CREDIT_CARD, DEBIT_CARD, BOLETO
  installments INTEGER, -- Número de parcelas (se cartão)
  description TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

-- Criar índices para consultas rápidas
-- Nota: O índice em charge_id é redundante pois já existe constraint UNIQUE, mas não causa problemas
CREATE INDEX IF NOT EXISTS idx_wdl3_charge_id ON wdl3(charge_id);
CREATE INDEX IF NOT EXISTS idx_wdl3_email ON wdl3(email);
CREATE INDEX IF NOT EXISTS idx_wdl3_status ON wdl3(status);
CREATE INDEX IF NOT EXISTS idx_wdl3_created_at ON wdl3(created_at DESC);

-- Verificar se a tabela foi criada corretamente (opcional - apenas para validação)
-- SELECT 
--   table_name, 
--   column_name, 
--   data_type, 
--   is_nullable,
--   column_default
-- FROM information_schema.columns 
-- WHERE table_name = 'wdl3' 
-- ORDER BY ordinal_position;

-- Criar função para atualizar updated_at automaticamente (reutilizar função existente se já existir)
-- A função update_updated_at_column() já deve existir se workshop_registrations foi criada antes
-- Se não existir, será criada aqui
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para atualizar updated_at automaticamente
DROP TRIGGER IF EXISTS update_wdl3_updated_at ON wdl3;
CREATE TRIGGER update_wdl3_updated_at
  BEFORE UPDATE ON wdl3
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comentários nas colunas para documentação
COMMENT ON TABLE wdl3 IS 'Registros de inscrições e pagamentos do Workshop Destrava Ligações - WDL3 (Plataforma Mundo Pódium)';
COMMENT ON COLUMN wdl3.charge_id IS 'ID único do pagamento no gateway de pagamento';
COMMENT ON COLUMN wdl3.reference_id IS 'ID de referência do pagamento';
COMMENT ON COLUMN wdl3.amount IS 'Valor do pagamento em centavos';
COMMENT ON COLUMN wdl3.amount_brl IS 'Valor do pagamento em reais';
COMMENT ON COLUMN wdl3.status IS 'Status do pagamento: PAID, CANCELLED, DECLINED, PENDING, etc.';

