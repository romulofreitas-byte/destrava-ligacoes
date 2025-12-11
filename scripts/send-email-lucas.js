// Script para enviar e-mail de confirmação para Lucas Daniel de Oliveira
// Node.js 18+ tem fetch nativo

const fs = require('fs');
const path = require('path');

// Carregar variáveis de ambiente do .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  const lines = envFile.split(/\r?\n/);
  
  lines.forEach(line => {
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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002';
const chargeId = '9A3660C9-EEFE-4259-A65E-C64E1F34BF14';
const email = 'lucasdanieldeoliveira@gmail.com';
const nome = 'Lucas Daniel de Oliveira';

async function sendConfirmationEmail() {
  console.log('📧 Enviando e-mail de confirmação via Resend...\n');
  console.log(`📋 Charge ID: ${chargeId}`);
  console.log(`📧 Email: ${email}`);
  console.log(`👤 Nome: ${nome}\n`);

  try {
    // Tentar primeiro o endpoint send-manual (mais direto para e-mail imediato)
    console.log('📤 Tentando enviar via endpoint send-manual...\n');
    let response = await fetch(`${baseUrl}/api/email/send-manual`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        nome,
        type: 'payment',
      }),
    });

    // Se não funcionar, tentar o endpoint send-retroactive
    if (!response.ok) {
      console.log('⚠️  Endpoint send-manual não disponível, tentando send-retroactive...\n');
      response = await fetch(`${baseUrl}/api/email/send-retroactive`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chargeId,
          email,
          nome,
        }),
      });
    }

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ E-mail de confirmação enviado com sucesso via Resend!\n');
      console.log('📬 Resumo:');
      
      // Formato do send-manual
      if (result.message) {
        console.log(`   ${result.message}`);
        if (result.messageId) {
          console.log(`   📧 Message ID: ${result.messageId}`);
        }
        console.log(`   📧 Email: ${email}`);
        console.log(`   👤 Nome: ${nome}\n`);
      } 
      // Formato do send-retroactive
      else if (result.email) {
        console.log(`   📧 Email: ${result.email}`);
        console.log(`   👤 Nome: ${result.nome}`);
        console.log(`   🆔 Charge ID: ${result.chargeId}\n`);
        console.log('📧 Status dos e-mails:');
        console.log(`   ${result.emailsSent.immediate ? '✅' : '❌'} Email imediato: ${result.emailsSent.immediate ? 'Enviado' : 'Não enviado'}`);
        if (result.details?.immediate?.error) {
          console.log(`      ⚠️  ${result.details.immediate.error}`);
        }
        console.log(`   ${result.emailsSent.oneDayBefore ? '✅' : '⏳'} Email 1 dia antes: ${result.emailsSent.oneDayBefore ? 'Enviado' : result.details?.oneDayBefore?.error || 'Aguardando prazo'}`);
        console.log(`   ${result.emailsSent.oneHourBefore ? '✅' : '⏳'} Email 1 hora antes: ${result.emailsSent.oneHourBefore ? 'Enviado' : result.details?.oneHourBefore?.error || 'Aguardando prazo'}\n`);
      }
      
      console.log(`📧 Verifique a caixa de entrada de ${email}\n`);
    } else {
      console.error('❌ Erro ao enviar e-mail:\n');
      console.error(JSON.stringify(result, null, 2));
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Erro ao fazer requisição:', error.message);
    console.error('\n💡 Dicas:');
    console.error('   1. Certifique-se de que o servidor está rodando (npm run dev)');
    console.error('   2. Verifique se RESEND_API_KEY está configurado no .env.local');
    process.exit(1);
  }
}

sendConfirmationEmail();





