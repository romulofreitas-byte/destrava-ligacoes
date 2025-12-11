// Script para adicionar convidados especiais (mentorados e convidados da comunidade) ao Supabase
// e enviar e-mails de convite
// Uso: node scripts/add-invited-guests.js
// Ou: npm run add:invited-guests (se adicionado ao package.json)

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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002';

// Lista de mentorados (Elite Pódium ou Escuderia Pódium)
const mentorados = [
  { nome: 'Vinícius Nascimento', email: 'vinicius.nascimento.dev@gmail.com' },
  { nome: 'Lucas Soares', email: 'lucasleite255@gmail.com' },
  { nome: 'Marina Marchiolli', email: 'marinamarchiollistudio@gmail.com' },
  { nome: 'Thiago Rosa', email: 'thiagofernandesrosa2@gmail.com' },
  { nome: 'João Pedro', email: 'contato.joaopedrolemos@gmail.com' },
  { nome: 'Lawria Melo', email: 'lawriamelo84@gmail.com' },
  { nome: 'Lucas Ribeiro', email: 'lucas42goto1@gmail.com' },
  { nome: 'André Neto', email: 'andre.kapdigital@gmail.com' },
  { nome: 'Gabriel Gelape', email: 'gabriel.gelape@axusengenharia.com.br' },
  { nome: 'Brendha Boaventura', email: 'brendhaboaventura@gmail.com' },
  { nome: 'Thiago Diniz', email: '2bempresarial@gmail.com' },
  { nome: 'Lucas Bonelli', email: 'lucasbonelli2018@gmail.com' },
  { nome: 'Nicolas Gonçalves', email: 'aioncompany1@gmail.com' },
  { nome: 'Nikolas Lage', email: 'nikolaslage.adv@gmail.com' },
  { nome: 'Jadson Lima', email: 'jadsonlimapro@gmail.com' },
];

// Lista de convidados (Comunidade Gratuita no WhatsApp)
const convidados = [
  { nome: 'DIOGO VICENTE SOUZA DE SANTANA', email: 'diogo.vicente.s@hotmail.com' },
  { nome: 'Fabrício Brasil', email: 'fabmkt3@gmail.com' },
];

async function addInvitedGuest(nome, email, tipo) {
  try {
    const response = await fetch(`${baseUrl}/api/invited-guests/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        email,
        tipo,
      }),
    });

    const result = await response.json();
    return { success: response.ok, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function processAllGuests() {
  console.log('🔄 Processando convidados especiais...\n');
  console.log(`📋 Total de mentorados: ${mentorados.length}`);
  console.log(`📋 Total de convidados: ${convidados.length}\n`);

  const results = {
    mentorados: { success: [], failed: [] },
    convidados: { success: [], failed: [] },
  };

  // Processar mentorados
  console.log('👥 Processando mentorados...\n');
  for (const mentorado of mentorados) {
    console.log(`📧 Processando: ${mentorado.nome} (${mentorado.email})`);
    const result = await addInvitedGuest(mentorado.nome, mentorado.email, 'MENTORADO');
    
    if (result.success && result.result?.success) {
      console.log(`   ✅ Adicionado ao Supabase e e-mail enviado`);
      console.log(`   🆔 Charge ID: ${result.result.chargeId || 'N/A'}\n`);
      results.mentorados.success.push({ ...mentorado, chargeId: result.result.chargeId });
    } else {
      console.log(`   ❌ Erro: ${result.result?.error || result.error || 'Erro desconhecido'}\n`);
      results.mentorados.failed.push({ ...mentorado, error: result.result?.error || result.error });
    }
    
    // Pequeno delay para evitar rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Processar convidados
  console.log('👥 Processando convidados da comunidade...\n');
  for (const convidado of convidados) {
    console.log(`📧 Processando: ${convidado.nome} (${convidado.email})`);
    const result = await addInvitedGuest(convidado.nome, convidado.email, 'CONVIDADO');
    
    if (result.success && result.result?.success) {
      console.log(`   ✅ Adicionado ao Supabase e e-mail enviado`);
      console.log(`   🆔 Charge ID: ${result.result.chargeId || 'N/A'}\n`);
      results.convidados.success.push({ ...convidado, chargeId: result.result.chargeId });
    } else {
      console.log(`   ❌ Erro: ${result.result?.error || result.error || 'Erro desconhecido'}\n`);
      results.convidados.failed.push({ ...convidado, error: result.result?.error || result.error });
    }
    
    // Pequeno delay para evitar rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Resumo final
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO FINAL');
  console.log('='.repeat(60) + '\n');

  console.log('👥 MENTORADOS:');
  console.log(`   ✅ Sucesso: ${results.mentorados.success.length}/${mentorados.length}`);
  console.log(`   ❌ Falhas: ${results.mentorados.failed.length}/${mentorados.length}`);
  if (results.mentorados.failed.length > 0) {
    console.log('\n   Falhas:');
    results.mentorados.failed.forEach(item => {
      console.log(`   - ${item.nome} (${item.email}): ${item.error}`);
    });
  }

  console.log('\n👥 CONVIDADOS:');
  console.log(`   ✅ Sucesso: ${results.convidados.success.length}/${convidados.length}`);
  console.log(`   ❌ Falhas: ${results.convidados.failed.length}/${convidados.length}`);
  if (results.convidados.failed.length > 0) {
    console.log('\n   Falhas:');
    results.convidados.failed.forEach(item => {
      console.log(`   - ${item.nome} (${item.email}): ${item.error}`);
    });
  }

  const totalSuccess = results.mentorados.success.length + results.convidados.success.length;
  const totalFailed = results.mentorados.failed.length + results.convidados.failed.length;
  const total = mentorados.length + convidados.length;

  console.log('\n' + '='.repeat(60));
  console.log(`📈 TOTAL: ${totalSuccess}/${total} processados com sucesso`);
  if (totalFailed > 0) {
    console.log(`⚠️  ${totalFailed} falhas encontradas`);
  }
  console.log('='.repeat(60) + '\n');
}

// Executar
processAllGuests().catch(error => {
  console.error('❌ Erro ao processar convidados:', error);
  console.error('\n💡 Dicas:');
  console.error('   1. Certifique-se de que o servidor está rodando (npm run dev)');
  console.error('   2. Verifique se NEXT_PUBLIC_BASE_URL está configurado corretamente');
  console.error('   3. Verifique se RESEND_API_KEY está configurado no .env.local');
  console.error('   4. Verifique se SUPABASE_SERVICE_ROLE_KEY está configurado');
  process.exit(1);
});
















