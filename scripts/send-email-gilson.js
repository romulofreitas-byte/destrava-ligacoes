/**
 * Script para enviar email de confirmação para Gilson Silva Castro via Resend
 * 
 * Uso: node scripts/send-email-gilson.js
 */

const { Resend } = require('resend');

// API Key do Resend
const RESEND_API_KEY = 're_YvGf7VWV_K9DgWEdAoPjxtHzMYFqPvKjz';

// Dados do participante
const dadosParticipante = {
  nome: 'Gilson Silva Castro',
  email: 'azimutegestao@gmail.com',
};

// Informações do Google Meet
const meetInfo = {
  link: 'https://meet.google.com/awb-vxqu-xnm',
  phone: '(BR) +55 21 4560-7556',
  pin: '523 187 755#',
  phoneLink: 'https://tel.meet/awb-vxqu-xnm?pin=4122161251082',
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

async function enviarEmail() {
  try {
    console.log('📧 Enviando email de confirmação via Resend...');
    console.log(`   Para: ${dadosParticipante.email}`);
    console.log(`   Nome: ${dadosParticipante.nome}`);
    
    const resend = new Resend(RESEND_API_KEY);
    
    // Gerar HTML do email
    const html = getWorkshopEmailTemplate(dadosParticipante);
    
    const subject = '🎉 Pagamento Confirmado - Workshop Destrave Suas Ligações';
    
    const fromEmail = 'noreply@pitstop.mundopodium.com.br';
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
    console.log(`   Para: ${dadosParticipante.email}`);
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error.message);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Iniciando envio de email de confirmação...\n');
    
    await enviarEmail();
    
    console.log('\n✅ Processo concluído com sucesso!');
  } catch (error) {
    console.error('\n❌ Erro no processo:', error.message);
    process.exit(1);
  }
}

main();







