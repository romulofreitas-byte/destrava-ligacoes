/**
 * Script para atualizar dados do participante Gilson Silva Castro no Supabase
 * e enviar email de confirmação
 * 
 * Uso: node scripts/upsert-gilson-direct.js
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
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Erro: NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY devem estar configurados');
  process.exit(1);
}

if (!RESEND_API_KEY) {
  console.error('❌ Erro: RESEND_API_KEY deve estar configurado');
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

async function upsertParticipante() {
  try {
    console.log('📝 Atualizando dados do participante no Supabase...');
    console.log(`   Nome: ${dadosParticipante.nome}`);
    console.log(`   Email: ${dadosParticipante.email}`);
    console.log(`   Charge ID: ${dadosParticipante.charge_id}`);
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

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

    console.log('✅ Dados atualizados no Supabase com sucesso!');
    console.log(`   ID do registro: ${data?.id || 'N/A'}`);
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao atualizar Supabase:', error.message);
    throw error;
  }
}

async function enviarEmail() {
  try {
    console.log('\n📧 Enviando email de confirmação...');
    
    const resend = new Resend(RESEND_API_KEY);
    
    // Gerar HTML do email
    const html = getWorkshopEmailTemplate({ 
      nome: dadosParticipante.nome, 
      email: dadosParticipante.email 
    });
    
    const subject = '🎉 Pagamento Confirmado - Workshop Destrave Suas Ligações';
    
    const fromEmail = process.env.FROM_EMAIL && !process.env.FROM_EMAIL.includes('escuderiapodium')
      ? process.env.FROM_EMAIL
      : 'noreply@pitstop.mundopodium.com.br';
    
    const fromWithName = `Rômulo, Pódium <${fromEmail}>`;
    
    const { data, error } = await resend.emails.send({
      from: fromWithName,
      to: [dadosParticipante.email],
      subject,
      html,
    });

    if (error) {
      throw new Error(error.message || 'Erro ao enviar email');
    }

    console.log('✅ Email enviado com sucesso!');
    console.log(`   Message ID: ${data?.id || 'N/A'}`);
    
    // Atualizar status de email no Supabase
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });
      
      await supabase
        .from('workshop_registrations')
        .update({
          email_sent: true,
          email_sent_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('charge_id', dadosParticipante.charge_id);
      
      console.log('✅ Status de email atualizado no Supabase');
    } catch (emailStatusError) {
      console.warn('⚠️ Erro ao atualizar status de email no Supabase (não crítico):', emailStatusError.message);
    }
    
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

