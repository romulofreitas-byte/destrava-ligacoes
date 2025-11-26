// Script para atualizar os dados do João Romao no Supabase
// Uso: node scripts/update-joao-romao.js
// Requer: Variáveis de ambiente configuradas no .env.local

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

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ ERRO: Variáveis de ambiente não configuradas!');
  console.error('   Verifique NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local\n');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Dados do João Romao da imagem
const dadosJoaoRomao = {
  // Usar o código da transação como charge_id
  charge_id: 'E2BA8844-AAD3-4608-BC20-C7F63BB4A444',
  reference_id: 'LINK_PAGAE=81eiPrem9',
  nome: 'JOAO ROMAO DAMBROSKI FORTES BITTENCOURT',
  email: 'joaoromaodfb@gmail.com',
  // Telefone: (42) 98413-8233
  telefone_country: '+55',
  telefone_area: '42',
  telefone_number: '984138233', // Removendo formatação
  status: 'PAID', // Aprovada = PAID
  amount_brl: 49.99,
  payment_method: 'PIX',
  paid_at: new Date().toISOString(), // Assumindo que foi pago agora, ajuste se necessário
  updated_at: new Date().toISOString(),
};

async function atualizarDados() {
  console.log('🔄 Atualizando dados do João Romao no Supabase...\n');
  console.log('📋 Dados a serem atualizados:');
  console.log(`   Nome: ${dadosJoaoRomao.nome}`);
  console.log(`   Email: ${dadosJoaoRomao.email}`);
  console.log(`   Telefone: (${dadosJoaoRomao.telefone_area}) ${dadosJoaoRomao.telefone_number}`);
  console.log(`   Charge ID: ${dadosJoaoRomao.charge_id}`);
  console.log(`   Status: ${dadosJoaoRomao.status}`);
  console.log(`   Valor: R$ ${dadosJoaoRomao.amount_brl}`);
  console.log(`   Método: ${dadosJoaoRomao.payment_method}\n`);

  try {
    // Primeiro, verificar se o registro existe
    console.log('🔍 Verificando se o registro existe...');
    const { data: existingData, error: searchError } = await supabase
      .from('workshop_registrations')
      .select('*')
      .eq('charge_id', dadosJoaoRomao.charge_id)
      .single();

    if (searchError && searchError.code !== 'PGRST116') {
      // PGRST116 = não encontrado, outros erros são problemas
      throw searchError;
    }

    if (existingData) {
      console.log('✅ Registro encontrado!');
      console.log(`   ID: ${existingData.id}`);
      console.log(`   Status atual: ${existingData.status}`);
      console.log(`   Email atual: ${existingData.email || 'N/A'}\n`);
    } else {
      console.log('ℹ️  Registro não encontrado, será criado um novo.\n');
    }

    // Fazer upsert (criar ou atualizar)
    console.log('💾 Salvando dados...');
    const { data, error } = await supabase
      .from('workshop_registrations')
      .upsert(dadosJoaoRomao, {
        onConflict: 'charge_id',
        ignoreDuplicates: false,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log('\n✅ Dados atualizados com sucesso!\n');
    console.log('📊 Registro atualizado:');
    console.log(`   ID: ${data.id}`);
    console.log(`   Charge ID: ${data.charge_id}`);
    console.log(`   Nome: ${data.nome}`);
    console.log(`   Email: ${data.email}`);
    console.log(`   Telefone: (${data.telefone_area}) ${data.telefone_number}`);
    console.log(`   Status: ${data.status}`);
    console.log(`   Valor: R$ ${data.amount_brl}`);
    console.log(`   Método: ${data.payment_method}`);
    console.log(`   Pago em: ${data.paid_at || 'N/A'}`);
    console.log(`   Atualizado em: ${data.updated_at}\n`);

  } catch (error) {
    console.error('\n❌ Erro ao atualizar dados:\n');
    console.error(`   Código: ${error.code || 'N/A'}`);
    console.error(`   Mensagem: ${error.message}`);
    
    if (error.code === '42P01') {
      console.error('\n💡 A tabela workshop_registrations não existe.');
      console.error('   Execute o script SQL em supabase-workshop-schema.sql\n');
    } else if (error.code === 'PGRST301') {
      console.error('\n💡 Erro de permissão.');
      console.error('   Verifique se a SUPABASE_SERVICE_ROLE_KEY está correta\n');
    } else if (error.details) {
      console.error(`   Detalhes: ${error.details}`);
    }
    
    process.exit(1);
  }
}

atualizarDados();

