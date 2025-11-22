// Script para enviar manualmente o email de pagamento confirmado via API
// Uso: node scripts/send-payment-email-manual.js [email] [nome]
// Exemplo: node scripts/send-payment-email-manual.js romulo.freitas@combustivelmv.com Rômulo
// Requer: Servidor Next.js rodando (npm run dev)

// Verificar se fetch está disponível (Node 18+)
if (typeof fetch === 'undefined') {
  console.error('❌ Este script requer Node.js 18+ (fetch nativo)');
  console.error('   Ou instale node-fetch: npm install node-fetch');
  process.exit(1);
}

const email = process.argv[2];
const nome = process.argv[3];

if (!email) {
  console.error('❌ ERRO: Email é obrigatório!');
  console.log('\nUso: node scripts/send-payment-email-manual.js [email] [nome]');
  console.log('Exemplo: node scripts/send-payment-email-manual.js romulo.freitas@combustivelmv.com "Rômulo"\n');
  process.exit(1);
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002';

async function sendEmail() {
  console.log('📧 Enviando email de pagamento confirmado...\n');
  console.log(`   Email: ${email}`);
  console.log(`   Nome: ${nome || 'Participante'}`);
  console.log(`   Endpoint: ${baseUrl}/api/email/send-manual\n`);

  try {
    const body = JSON.stringify({ email, nome });
    
    const response = await fetch(`${baseUrl}/api/email/send-manual`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ Email enviado com sucesso!\n');
      console.log('📬 Detalhes:');
      console.log(`   Message ID: ${result.messageId || 'N/A'}`);
      console.log(`   Para: ${email}`);
      console.log(`   Mensagem: ${result.message}\n`);
      console.log('📧 Verifique a caixa de entrada do destinatário.\n');
    } else {
      console.error('❌ Erro ao enviar email:\n');
      console.error(JSON.stringify(result, null, 2));
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Erro ao fazer requisição:', error.message);
    console.error('\n💡 Dicas:');
    console.error('   1. Certifique-se de que o servidor está rodando (npm run dev)');
    console.error('   2. Verifique se NEXT_PUBLIC_BASE_URL está configurado corretamente');
    console.error('   3. Verifique se RESEND_API_KEY está configurado no .env.local');
    console.error('   4. Verifique se o domínio está verificado no Resend\n');
    process.exit(1);
  }
}

sendEmail();

