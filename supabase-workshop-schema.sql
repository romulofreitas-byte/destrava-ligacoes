-- Schema SQL para criar a tabela workshop_registrations no Supabase
-- Execute este script no SQL Editor do Supabase

-- Criar tabela workshop_registrations
CREATE TABLE IF NOT EXISTS workshop_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  charge_id TEXT UNIQUE NOT NULL,
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
  paid_at TIMESTAMPTZ,
  
  -- Metadados
  email_sent BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMPTZ
);

-- Criar índices para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_charge_id ON workshop_registrations(charge_id);
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_email ON workshop_registrations(email);
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_status ON workshop_registrations(status);
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_created_at ON workshop_registrations(created_at DESC);

-- Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para atualizar updated_at automaticamente
DROP TRIGGER IF EXISTS update_workshop_registrations_updated_at ON workshop_registrations;
CREATE TRIGGER update_workshop_registrations_updated_at
  BEFORE UPDATE ON workshop_registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comentários nas colunas para documentação
COMMENT ON TABLE workshop_registrations IS 'Registros de inscrições e pagamentos do Workshop Destrava Ligações';
COMMENT ON COLUMN workshop_registrations.charge_id IS 'ID único do pagamento no PagBank';
COMMENT ON COLUMN workshop_registrations.reference_id IS 'ID de referência do pagamento';
COMMENT ON COLUMN workshop_registrations.amount IS 'Valor do pagamento em centavos';
COMMENT ON COLUMN workshop_registrations.amount_brl IS 'Valor do pagamento em reais';
COMMENT ON COLUMN workshop_registrations.status IS 'Status do pagamento: PAID, CANCELLED, DECLINED, PENDING, etc.';

