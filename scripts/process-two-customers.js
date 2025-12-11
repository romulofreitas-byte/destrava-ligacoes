/**
 * Script para processar dois clientes que compraram na plataforma
 * - Adiciona ao Supabase se não estiverem registrados
 * - Envia email de confirmação via Resend
 * 
 * Uso: node scripts/process-two-customers.js
 * 
 * Requer: Variáveis de ambiente configuradas (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY)
 */

const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');

// Carregar variáveis de ambiente do .env.local se existir
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  // Processar linha por linha, ignorando comentários e linhas vazias
  envContent.split(/\r?\n/).forEach(line => {
    const trimmedLine = line.trim();
    // Ignorar comentários e linhas vazias
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const equalIndex = trimmedLine.indexOf('=');
      if (equalIndex > 0) {
        const key = trimmedLine.substring(0, equalIndex).trim();
        let value = trimmedLine.substring(equalIndex + 1).trim();
        // Remover aspas do início e fim se existirem
        value = value.replace(/^["']|["']$/g, '');
        if (key && value) {
          process.env[key] = value;
        }
      }
    }
  });
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Erro: NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY devem estar configurados');
  console.error('   Verifique se o arquivo .env.local existe e contém essas variáveis');
  process.exit(1);
}

if (!RESEND_API_KEY) {
  console.error('❌ Erro: RESEND_API_KEY deve estar configurado');
  console.error('   Configure RESEND_API_KEY=re_YvGf7VWV_K9DgWEdAoPjxtHzMYFqPvKjz no .env.local');
  process.exit(1);
}

// Dados dos clientes
const clientes = [
  {
    charge_id: '78B88952-5518-4485-B799-C72F96459A91',
    reference_id: 'LINK_PAGAE=81eiPrem9',
    nome: 'Fabrício da Silva Brasil',
    email: 'fabmkt3@gmail.com',
    telefone: null,
    status: 'PAID',
    amount_brl: 49.99,
    payment_method: 'PIX',
    installments: null,
  },
  {
    charge_id: 'CB4A4A02-591A-4111-846E-7D64DD7F2679',
    reference_id: 'LINK_PAGAE=81eiPrem9',
    nome: 'Ricardo Possas Ghais',
    email: 'ricardopossasg@gmail.com',
    telefone: '(11) 94103-6800',
    status: 'PAID',
    amount_brl: 49.99,
    payment_method: 'CREDIT_CARD',
    installments: 1,
  },
  {
    charge_id: '6E6484BE-430F-429A-BE88-0189D933C3DD',
    reference_id: 'LINK_PAGAE=81eiPrem9',
    nome: 'Fabio Laureano Antonio',
    email: 'fabiolaureano01@gmail.com',
    telefone: '(35) 99884-6186',
    status: 'PAID',
    amount_brl: 49.99,
    payment_method: 'PIX',
    installments: null,
  },
  {
    charge_id: 'F6AB5AE6-DE9C-4DED-B9A6-FD3A6FD893C9',
    reference_id: 'LINK_PAGAE=81eiPrem9',
    nome: 'José Oliveira',
    email: 'conatusdayones@gmail.com',
    telefone: '(21) 96910-9218',
    status: 'PAID',
    amount_brl: 49.99,
    payment_method: 'PIX',
    installments: null,
  },
  {
    charge_id: '98525167-CE74-4D0B-A290-8FE19FB33BC0',
    reference_id: 'LINK_PAGAE=81eiPrem9',
    nome: 'Luiz Felipe da Silva',
    email: 'felipesilva.sounet@gmail.com',
    telefone: '(35) 99885-4643',
    status: 'PAID',
    amount_brl: 49.99,
    payment_method: 'PIX',
    installments: null,
  },
];

// Informações do Google Meet (do constants.ts)
const meetInfo = {
  link: process.env.GOOGLE_MEET_LINK || 'https://meet.google.com/awb-vxqu-xnm',
  phone: process.env.GOOGLE_MEET_PHONE || '(BR) +55 21 4560-7556',
  pin: process.env.GOOGLE_MEET_PIN || '523 187 755#',
  phoneLink: process.env.GOOGLE_MEET_PHONE_LINK || 'https://tel.meet/awb-vxqu-xnm?pin=4122161251082',
};

function getWorkshopEmailTemplate(data) {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Workshop Destrave Suas Ligações</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #1f2937 0%, #111827 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #fbbf24; font-size: 24px; font-weight: bold;">
                WORKSHOP DESTRAVE SUAS LIGAÇÕES
              </h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px;">
                MUNDO PÓDIUM
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Olá <strong>${data.nome || 'Participante'}</strong>,
              </p>
              
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Parabéns! Seu pagamento foi confirmado e sua vaga no <strong>Workshop Destrave Suas Ligações</strong> está garantida!
              </p>
              
              <div style="background-color: #fef3c7; border-left: 4px solid #fbbf24; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h2 style="margin: 0 0 15px; color: #78350f; font-size: 20px; font-weight: bold;">
                  📅 Detalhes do Workshop
                </h2>
                <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
                  <strong style="color: #78350f;">Data:</strong> Quarta-feira, 10 de dezembro de 2025
                </p>
                <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
                  <strong style="color: #78350f;">Horário:</strong> 13:00 – 17:00 (Fuso horário: America/Sao_Paulo)
                </p>
                <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
                  <strong style="color: #78350f;">Formato:</strong> Online • Ao vivo
                </p>
              </div>
              
              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h2 style="margin: 0 0 15px; color: #1e40af; font-size: 20px; font-weight: bold;">
                  🎥 Como Participar do Google Meet
                </h2>
                
                <p style="margin: 0 0 15px; color: #1e293b; font-size: 15px; line-height: 1.6;">
                  <strong style="color: #1e40af;">Link da videochamada:</strong>
                </p>
                <p style="margin: 0 0 20px;">
                  <a href="${meetInfo.link}" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
                    Acessar Google Meet
                  </a>
                </p>
                
                <p style="margin: 15px 0 5px; color: #1e293b; font-size: 15px;">
                  <strong style="color: #1e40af;">Ou disque:</strong>
                </p>
                <p style="margin: 0 0 10px; color: #1e293b; font-size: 15px;">
                  ${meetInfo.phone}<br>
                  PIN: ${meetInfo.pin}
                </p>
                
                <p style="margin: 15px 0 5px; color: #1e293b; font-size: 15px;">
                  <strong style="color: #1e40af;">Outros números de telefone:</strong>
                </p>
                <p style="margin: 0;">
                  <a href="${meetInfo.phoneLink}" style="color: #2563eb; text-decoration: underline; font-weight: 600;">${meetInfo.phoneLink}</a>
                </p>
              </div>
              
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">
                  <strong style="color: #1f2937;">⚠️ Importante:</strong> A sala pode sofrer alterações. Todos os participantes serão informados caso isso aconteça.
                </p>
              </div>
              
              <p style="margin: 30px 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Estamos ansiosos para te ver no workshop e ajudar você a destravar suas ligações!
              </p>
              
              <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Qualquer dúvida, entre em contato conosco.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: #1f2937; border-radius: 0 0 8px 8px;">
              <p style="margin: 0 0 10px; color: #9ca3af; font-size: 14px;">
                <strong style="color: #fbbf24;">Mundo Pódium</strong>
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                Este é um email automático. Por favor, não responda.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

async function verificarClienteExistente(supabase, chargeId) {
  try {
    const { data, error } = await supabase
      .from('workshop_registrations')
      .select('id, email_sent, email')
      .eq('charge_id', chargeId)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = not found, que é OK
      throw error;
    }

    return data || null;
  } catch (error) {
    console.error(`   ⚠️ Erro ao verificar cliente: ${error.message}`);
    return null;
  }
}

async function upsertCliente(supabase, cliente) {
  try {
    console.log(`📝 Inserindo/atualizando cliente no Supabase...`);
    console.log(`   Nome: ${cliente.nome}`);
    console.log(`   Email: ${cliente.email}`);
    console.log(`   Charge ID: ${cliente.charge_id}`);

    const dadosParticipante = {
      charge_id: cliente.charge_id,
      reference_id: cliente.reference_id,
      nome: cliente.nome,
      email: cliente.email,
      status: cliente.status,
      amount_brl: cliente.amount_brl,
      payment_method: cliente.payment_method,
      installments: cliente.installments,
      paid_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('workshop_registrations')
      .upsert(dadosParticipante, {
        onConflict: 'charge_id',
        ignoreDuplicates: false,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log(`✅ Cliente inserido/atualizado no Supabase com sucesso!`);
    console.log(`   ID do registro: ${data?.id || 'N/A'}`);

    return { success: true, data };
  } catch (error) {
    console.error(`❌ Erro ao inserir/atualizar no Supabase: ${error.message}`);
    throw error;
  }
}

async function enviarEmail(resend, cliente) {
  try {
    console.log(`\n📧 Enviando email de confirmação para ${cliente.email}...`);

    // Gerar HTML do email
    const html = getWorkshopEmailTemplate({
      nome: cliente.nome,
      email: cliente.email,
    });

    const subject = '🎉 Pagamento Confirmado - Workshop Destrave Suas Ligações';

    const fromEmail =
      process.env.FROM_EMAIL && !process.env.FROM_EMAIL.includes('escuderiapodium')
        ? process.env.FROM_EMAIL
        : 'noreply@pitstop.mundopodium.com.br';

    const fromWithName = `Rômulo, Pódium <${fromEmail}>`;

    const { data, error } = await resend.emails.send({
      from: fromWithName,
      to: [cliente.email],
      subject,
      html,
    });

    if (error) {
      throw new Error(error.message || 'Erro ao enviar email');
    }

    console.log(`✅ Email enviado com sucesso!`);
    console.log(`   Message ID: ${data?.id || 'N/A'}`);

    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error(`❌ Erro ao enviar email: ${error.message}`);
    throw error;
  }
}

async function atualizarStatusEmail(supabase, chargeId) {
  try {
    await supabase
      .from('workshop_registrations')
      .update({
        email_sent: true,
        email_sent_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('charge_id', chargeId);

    console.log(`✅ Status de email atualizado no Supabase`);
  } catch (emailStatusError) {
    console.warn(
      `⚠️ Erro ao atualizar status de email no Supabase (não crítico): ${emailStatusError.message}`
    );
  }
}

async function processarCliente(cliente, supabase, resend) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📋 Processando: ${cliente.nome}`);
  console.log(`${'='.repeat(60)}`);

  try {
    // 1. Verificar se cliente já existe
    console.log(`\n🔍 Verificando se cliente já está registrado...`);
    const clienteExistente = await verificarClienteExistente(supabase, cliente.charge_id);

    if (clienteExistente) {
      console.log(`⚠️ Cliente já está registrado no Supabase!`);
      console.log(`   Email já enviado: ${clienteExistente.email_sent ? 'Sim' : 'Não'}`);
      console.log(`   Email: ${clienteExistente.email || cliente.email}`);
      console.log(`\n⏭️  Pulando processamento para evitar duplicação.`);
      return {
        success: true,
        skipped: true,
        reason: 'Cliente já registrado',
      };
    }

    console.log(`✅ Cliente não encontrado. Prosseguindo com registro...`);

    // 2. Inserir/atualizar no Supabase
    await upsertCliente(supabase, cliente);

    // 3. Enviar email
    const emailResult = await enviarEmail(resend, cliente);

    if (!emailResult.success) {
      throw new Error('Falha ao enviar email');
    }

    // 4. Atualizar status de email no Supabase
    await atualizarStatusEmail(supabase, cliente.charge_id);

    console.log(`\n✅ Cliente processado com sucesso!`);
    return {
      success: true,
      skipped: false,
      emailSent: true,
      messageId: emailResult.messageId,
    };
  } catch (error) {
    console.error(`\n❌ Erro ao processar cliente: ${error.message}`);
    return {
      success: false,
      skipped: false,
      error: error.message,
    };
  }
}

async function main() {
  try {
    console.log('🚀 Iniciando processamento de clientes...\n');
    console.log(`📊 Total de clientes: ${clientes.length}\n`);

    // Inicializar clientes
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const resend = new Resend(RESEND_API_KEY);

    // Processar cada cliente
    const resultados = [];
    for (let i = 0; i < clientes.length; i++) {
      const cliente = clientes[i];
      const resultado = await processarCliente(cliente, supabase, resend);
      resultados.push({
        cliente: cliente.nome,
        ...resultado,
      });

      // Aguardar um pouco entre processamentos para evitar rate limiting
      if (i < clientes.length - 1) {
        console.log(`\n⏳ Aguardando 2 segundos antes do próximo cliente...\n`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    // Resumo final
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📊 RESUMO DO PROCESSAMENTO`);
    console.log(`${'='.repeat(60)}\n`);

    let sucessos = 0;
    let pulados = 0;
    let erros = 0;

    resultados.forEach((resultado, index) => {
      const cliente = clientes[index];
      console.log(`${index + 1}. ${cliente.nome} (${cliente.email})`);
      if (resultado.skipped) {
        console.log(`   ⏭️  PULADO: ${resultado.reason}`);
        pulados++;
      } else if (resultado.success) {
        console.log(`   ✅ SUCESSO: Cliente registrado e email enviado`);
        if (resultado.messageId) {
          console.log(`   📧 Message ID: ${resultado.messageId}`);
        }
        sucessos++;
      } else {
        console.log(`   ❌ ERRO: ${resultado.error || 'Erro desconhecido'}`);
        erros++;
      }
      console.log('');
    });

    console.log(`${'='.repeat(60)}`);
    console.log(`✅ Sucessos: ${sucessos}`);
    console.log(`⏭️  Pulados: ${pulados}`);
    console.log(`❌ Erros: ${erros}`);
    console.log(`${'='.repeat(60)}\n`);

    if (erros > 0) {
      console.error('⚠️ Alguns clientes tiveram erros. Verifique os logs acima.');
      process.exit(1);
    } else {
      console.log('✅ Processo concluído com sucesso!');
    }
  } catch (error) {
    console.error('\n❌ Erro fatal no processo:', error.message);
    process.exit(1);
  }
}

main();

