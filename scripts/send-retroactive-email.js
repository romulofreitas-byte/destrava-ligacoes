// Script para disparar e-mails retroativos para alunos que compraram antes do sistema de e-mails
// Uso: node scripts/send-retroactive-email.js [chargeId]
// Ou: npm run send:retroactive-email [chargeId]

const fs = require('fs');
const path = require('path');

// Verificar se fetch está disponível (Node 18+)
if (typeof fetch === 'undefined') {
  console.error('❌ Este script requer Node.js 18+ (fetch nativo)');
  console.error('   Ou instale node-fetch: npm install node-fetch');
  process.exit(1);
}

const envPath = path.join(__dirname, '..', '.env.local');

// Carregar variáveis de ambiente
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

const chargeId = process.argv[2];

if (!chargeId) {
  console.error('❌ Erro: chargeId é obrigatório\n');
  console.error('📖 Uso:');
  console.error('   node scripts/send-retroactive-email.js [chargeId]');
  console.error('   npm run send:retroactive-email [chargeId]\n');
  console.error('📋 Exemplo:');
  console.error('   node scripts/send-retroactive-email.js E2BA8844-AAD3-4608-BC20-C7F63BB4A444\n');
  process.exit(1);
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002';

async function sendRetroactiveEmails() {
  console.log('🔄 Disparando e-mails retroativos para aluno...\n');
  console.log(`📋 Charge ID: ${chargeId}\n`);

  try {
    // Primeiro, consultar quais e-mails seriam enviados (sem enviar)
    console.log('🔍 Consultando dados do aluno...\n');
    const checkUrl = `${baseUrl}/api/email/send-retroactive?charge_id=${chargeId}`;
    
    const checkResponse = await fetch(checkUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const checkResult = await checkResponse.json();

    if (!checkResponse.ok) {
      console.error('❌ Erro ao consultar aluno:\n');
      console.error(JSON.stringify(checkResult, null, 2));
      process.exit(1);
    }

    if (!checkResult.found) {
      console.error('❌ Aluno não encontrado');
      console.error(`   Charge ID: ${chargeId}\n`);
      process.exit(1);
    }

    console.log('✅ Aluno encontrado:');
    console.log(`   📧 Email: ${checkResult.email}`);
    console.log(`   👤 Nome: ${checkResult.nome}`);
    console.log(`   🆔 Charge ID: ${checkResult.chargeId}\n`);

    console.log('📅 Status dos prazos:');
    console.log(`   📆 Data atual: ${new Date(checkResult.currentDate).toLocaleString('pt-BR')}`);
    console.log(`   📆 Workshop: ${new Date(checkResult.workshopDate).toLocaleString('pt-BR')}`);
    console.log(`   📆 1 dia antes: ${new Date(checkResult.oneDayBeforeDate).toLocaleString('pt-BR')}`);
    console.log(`   📆 1 hora antes: ${new Date(checkResult.oneHourBeforeDate).toLocaleString('pt-BR')}\n`);

    console.log('📧 E-mails que serão enviados:');
    console.log(`   ${checkResult.wouldSend.immediate ? '✅' : '⏳'} Email imediato (confirmação de pagamento)`);
    console.log(`   ${checkResult.wouldSend.oneDayBefore ? '✅' : '⏳'} Email 1 dia antes (25/11)`);
    console.log(`   ${checkResult.wouldSend.oneHourBefore ? '✅' : '⏳'} Email 1 hora antes (26/11 às 12:00)\n`);

    // Confirmar antes de enviar
    console.log('⚠️  ATENÇÃO: Os e-mails serão enviados agora.');
    console.log('   Pressione Ctrl+C para cancelar ou aguarde 3 segundos para continuar...\n');
    
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Enviar e-mails
    console.log('📤 Enviando e-mails...\n');
    const sendUrl = `${baseUrl}/api/email/send-retroactive`;
    
    const sendResponse = await fetch(sendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chargeId }),
    });

    const sendResult = await sendResponse.json();

    if (sendResponse.ok && sendResult.success) {
      console.log('✅ E-mails enviados com sucesso!\n');
      console.log('📬 Resumo:');
      console.log(`   📧 Email: ${sendResult.email}`);
      console.log(`   👤 Nome: ${sendResult.nome}`);
      console.log(`   🆔 Charge ID: ${sendResult.chargeId}\n`);
      console.log('📧 Status dos e-mails:');
      console.log(`   ${sendResult.emailsSent.immediate ? '✅' : '❌'} Email imediato: ${sendResult.emailsSent.immediate ? 'Enviado' : 'Não enviado'}`);
      if (sendResult.details.immediate.error) {
        console.log(`      ⚠️  ${sendResult.details.immediate.error}`);
      }
      console.log(`   ${sendResult.emailsSent.oneDayBefore ? '✅' : '⏳'} Email 1 dia antes: ${sendResult.emailsSent.oneDayBefore ? 'Enviado' : sendResult.details.oneDayBefore.error || 'Aguardando prazo'}`);
      console.log(`   ${sendResult.emailsSent.oneHourBefore ? '✅' : '⏳'} Email 1 hora antes: ${sendResult.emailsSent.oneHourBefore ? 'Enviado' : sendResult.details.oneHourBefore.error || 'Aguardando prazo'}\n`);
      console.log(`📧 Verifique a caixa de entrada de ${sendResult.email}\n`);
    } else {
      console.error('❌ Erro ao enviar e-mails:\n');
      console.error(JSON.stringify(sendResult, null, 2));
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Erro ao fazer requisição:', error.message);
    console.error('\n💡 Dicas:');
    console.error('   1. Certifique-se de que o servidor está rodando (npm run dev)');
    console.error('   2. Verifique se NEXT_PUBLIC_BASE_URL está configurado corretamente');
    console.error('   3. Verifique se RESEND_API_KEY está configurado no .env.local');
    console.error('   4. Verifique se PAGBANK_TOKEN está configurado no .env.local (para buscar dados do aluno)');
    console.error('   5. Verifique se SUPABASE_SERVICE_ROLE_KEY está configurado (para buscar no banco)');
    process.exit(1);
  }
}

sendRetroactiveEmails();


















