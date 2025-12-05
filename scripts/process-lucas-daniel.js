// Script para processar novo aluno: Lucas Daniel de Oliveira
// Envia e-mail de confirmação e adiciona no Supabase

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

// Dados do aluno
const studentData = {
  chargeId: '9A3660C9-EEFE-4259-A65E-C64E1F34BF14',
  referenceId: 'LINK_PAGAE=81eiPrem9',
  nome: 'Lucas Daniel de Oliveira',
  email: 'lucasdanieldeoliveira@gmail.com',
  telefone: '(47) 99649-3538',
  status: 'PAID',
  amountBrl: 49.99,
  paymentMethod: 'PIX',
};

async function processStudent() {
  console.log('🎓 Processando novo aluno do workshop...\n');
  console.log('📋 Dados do aluno:');
  console.log(`   Nome: ${studentData.nome}`);
  console.log(`   Email: ${studentData.email}`);
  console.log(`   Telefone: ${studentData.telefone}`);
  console.log(`   Charge ID: ${studentData.chargeId}\n`);

  // Passo 1: Enviar e-mail de confirmação
  console.log('📧 Passo 1: Enviando e-mail de confirmação...\n');
  
  try {
    const emailResponse = await fetch(`${baseUrl}/api/email/send-manual`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: studentData.email,
        nome: studentData.nome,
        type: 'payment',
      }),
    });

    const emailResult = await emailResponse.json();

    if (emailResponse.ok && emailResult.success) {
      console.log('✅ E-mail de confirmação enviado com sucesso!');
      console.log(`   Message ID: ${emailResult.messageId || 'N/A'}`);
      console.log(`   ${emailResult.message}\n`);
    } else {
      console.error('❌ Erro ao enviar e-mail:');
      console.error(JSON.stringify(emailResult, null, 2));
      console.log('\n⚠️  Continuando para adicionar no Supabase...\n');
    }
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail:', error.message);
    console.log('\n⚠️  Continuando para adicionar no Supabase...\n');
  }

  // Passo 2: Adicionar no Supabase
  console.log('💾 Passo 2: Adicionando dados no Supabase...\n');

  const { createClient } = require('@supabase/supabase-js');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configurados');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const registrationData = {
    charge_id: studentData.chargeId,
    reference_id: studentData.referenceId,
    nome: studentData.nome,
    email: studentData.email,
    telefone_country: '55',
    telefone_area: '47',
    telefone_number: '996493538',
    status: studentData.status,
    amount_brl: studentData.amountBrl,
    payment_method: studentData.paymentMethod,
    description: 'Workshop Destrave Suas Ligações',
    paid_at: new Date().toISOString(),
    email_sent: true,
    email_sent_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('workshop_registrations')
      .upsert(registrationData, {
        onConflict: 'charge_id',
        ignoreDuplicates: false,
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao adicionar no Supabase:');
      console.error(JSON.stringify(error, null, 2));
      process.exit(1);
    }

    console.log('✅ Dados adicionados no Supabase com sucesso!');
    console.log('\n📊 Registro criado:');
    console.log(`   ID: ${data.id}`);
    console.log(`   Charge ID: ${data.charge_id}`);
    console.log(`   Nome: ${data.nome}`);
    console.log(`   Email: ${data.email}`);
    console.log(`   Status: ${data.status}`);
    console.log(`   Email enviado: ${data.email_sent ? 'Sim' : 'Não'}\n`);

    console.log('🎉 Processamento concluído com sucesso!\n');
    console.log(`📧 Verifique a caixa de entrada de ${studentData.email}\n`);

  } catch (error) {
    console.error('❌ Erro inesperado ao adicionar no Supabase:', error.message);
    process.exit(1);
  }
}

processStudent();



