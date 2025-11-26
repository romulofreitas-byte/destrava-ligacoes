// Script para inserir manualmente o registro do Maycon no Supabase
// Usa a REST API do Supabase com SUPABASE_SERVICE_ROLE_KEY

const fs = require('fs');
const path = require('path');

// Carregar variáveis de ambiente do .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  const lines = envFile.split(/\r?\n/);

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const equalIndex = trimmedLine.indexOf('=');
      if (equalIndex > 0) {
        const key = trimmedLine.substring(0, equalIndex).trim();
        let value = trimmedLine.substring(equalIndex + 1).trim();
        value = value.replace(/^["']|["']$/g, '');
        if (key && value) {
          process.env[key] = value;
        }
      }
    }
  });
}

const chargeId = '12EFC072-5ECF-41FE-B12F-6965679CA8F6';

async function upsertManual() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configurados');
    process.exit(1);
  }

  const restUrl = `${supabaseUrl}/rest/v1/workshop_registrations`;

  const now = new Date().toISOString();

  const payload = {
    charge_id: chargeId,
    reference_id: 'LINK_PAGAE=81eiPrem9',
    nome: 'Maycon Vieira ferraz',
    email: 'mayconferrazvieira@gmail.com',
    status: 'PAID',
    amount_brl: 49.99,
    payment_method: 'PIX',
    description: 'Workshop Destrave Suas Ligações',
    paid_at: now,
    created_at: now,
    updated_at: now,
  };

  console.log('💾 Inserindo manualmente registro no Supabase...\n');
  console.log(payload);
  console.log();

  try {
    const response = await fetch(restUrl, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    console.log('🔁 Resposta do Supabase:\n');
    console.log(text || '[sem corpo]');

    if (!response.ok) {
      process.exitCode = 1;
    }
  } catch (error) {
    console.error('❌ Erro ao chamar Supabase:', error);
    process.exitCode = 1;
  }
}

upsertManual();


