/**
 * Script para atualizar dados do participante Gilson Silva Castro no Supabase
 * e enviar email de confirmação
 * 
 * Uso: node scripts/upsert-gilson.js
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Erro: NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY devem estar configurados');
  process.exit(1);
}

// Dados do participante
const dadosParticipante = {
  charge_id: '10CF6966-827A-487A-9545-9B1CEA6056FD',
  reference_id: 'LINK_PAGAE=81eiPrem9',
  nome: 'Gilson Silva Castro',
  email: 'azimutegestao@gmail.com',
  telefone_country: '55',
  telefone_area: '91',
  telefone_number: '981483968',
  status: 'PAID',
  amount_brl: 49.99,
  payment_method: 'Cartão de Crédito',
  installments: 1,
  paid_at: new Date().toISOString(),
};

async function upsertParticipante() {
  try {
    console.log('📝 Atualizando dados do participante no Supabase...');
    console.log(`   Nome: ${dadosParticipante.nome}`);
    console.log(`   Email: ${dadosParticipante.email}`);
    console.log(`   Charge ID: ${dadosParticipante.charge_id}`);
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1/workshop_registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify(dadosParticipante),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao atualizar Supabase: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Dados atualizados no Supabase com sucesso!');
    console.log(`   ID do registro: ${data[0]?.id || 'N/A'}`);
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao atualizar Supabase:', error.message);
    throw error;
  }
}

async function enviarEmail() {
  try {
    console.log('\n📧 Enviando email de confirmação...');
    
    // Determinar URL base (local ou produção)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002';
    
    const response = await fetch(`${baseUrl}/api/email/send-manual`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: dadosParticipante.email,
        nome: dadosParticipante.nome,
        type: 'payment',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro ao enviar email: ${response.status} - ${errorData.error || 'Erro desconhecido'}`);
    }

    const result = await response.json();
    console.log('✅ Email enviado com sucesso!');
    console.log(`   Message ID: ${result.messageId || 'N/A'}`);
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error.message);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Iniciando atualização de dados e envio de email...\n');
    
    // 1. Atualizar Supabase
    await upsertParticipante();
    
    // 2. Enviar email
    await enviarEmail();
    
    console.log('\n✅ Processo concluído com sucesso!');
  } catch (error) {
    console.error('\n❌ Erro no processo:', error.message);
    process.exit(1);
  }
}

main();







