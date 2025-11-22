// Script para testar envio de email após pagamento
// Uso: node scripts/test-email-pagamento.js [email] [nome] [chargeId]
// Ou: npm run test:email-pagamento [email] [nome] [chargeId]

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

const email = process.argv[2] || 'romulocsfreitas@gmail.com';
const nome = process.argv[3] || 'Rômulo';
const chargeId = process.argv[4]; // Opcional - se fornecido, busca dados reais do PagBank

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002';
const testUrl = chargeId 
  ? `${baseUrl}/api/pagamento/test-email?charge_id=${chargeId}`
  : `${baseUrl}/api/pagamento/test-email`;

async function testEmail() {
  console.log('🧪 Testando envio de email após pagamento...\n');
  
  if (chargeId) {
    console.log(`📋 Usando chargeId real: ${chargeId}`);
    console.log(`   Buscando dados do pagamento no PagBank...\n`);
  } else {
    console.log(`📧 Email: ${email}`);
    console.log(`👤 Nome: ${nome}`);
    console.log(`   (Usando dados de teste - sem chargeId real)\n`);
  }

  try {
    const url = chargeId 
      ? `${baseUrl}/api/pagamento/test-email?charge_id=${chargeId}`
      : `${baseUrl}/api/pagamento/test-email`;

    const method = chargeId ? 'GET' : 'POST';
    const body = chargeId ? undefined : JSON.stringify({ email, nome });

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ Email enviado com sucesso!\n');
      console.log('📬 Detalhes:');
      console.log(JSON.stringify(result.details, null, 2));
      console.log(`\n📧 Verifique a caixa de entrada de ${result.details.email}\n`);
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
    if (chargeId) {
      console.error('   4. Verifique se PAGBANK_TOKEN está configurado no .env.local');
    }
    process.exit(1);
  }
}

testEmail();

