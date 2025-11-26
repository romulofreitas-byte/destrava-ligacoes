// Script para forçar o registro do pagamento do Maycon no Supabase
// Usa o endpoint /api/pagamento/webhook, que consulta o PagBank e salva no Supabase

const chargeId = '12EFC072-5ECF-41FE-B12F-6965679CA8F6';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002';

async function upsertMaycon() {
  console.log('💾 Enviando webhook manual para registrar pagamento no Supabase...\n');
  console.log(`📋 Charge ID: ${chargeId}\n`);

  try {
    const response = await fetch(`${baseUrl}/api/pagamento/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ charge_id: chargeId }),
    });

    const text = await response.text();
    console.log('🔁 Resposta do webhook:\n');
    console.log(text);

    if (!response.ok) {
      process.exitCode = 1;
    }
  } catch (error) {
    console.error('❌ Erro ao chamar webhook:', error);
    process.exitCode = 1;
  }
}

upsertMaycon();



