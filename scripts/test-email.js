// Script para testar envio de email
// Carrega variáveis de ambiente do .env.local se existir
const fs = require('fs');
const path = require('path');
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
        // Remove aspas se houver
        value = value.replace(/^["']|["']$/g, '');
        if (key && value) {
          process.env[key] = value;
          console.log(`   Carregado: ${key}=${value.substring(0, 20)}...`);
        }
      }
    }
  });
  
  console.log('✅ Variáveis de ambiente carregadas do .env.local');
}

const { Resend } = require('resend');

// Carregar template de email
function getWorkshopEmailTemplate(data) {
  const meetInfo = {
    link: process.env.GOOGLE_MEET_LINK || 'https://meet.google.com/awb-vxqu-xnm',
    phone: process.env.GOOGLE_MEET_PHONE || '(BR) +55 21 4560-7556',
    pin: process.env.GOOGLE_MEET_PIN || '523 187 755#',
    phoneLink: process.env.GOOGLE_MEET_PHONE_LINK || 'https://tel.meet/awb-vxqu-xnm?pin=4122161251082',
  };

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
                <h2 style="margin: 0 0 15px; color: #92400e; font-size: 20px; font-weight: bold;">
                  📅 Detalhes do Workshop
                </h2>
                <p style="margin: 5px 0; color: #78350f; font-size: 15px;">
                  <strong>Data:</strong> Quarta-feira, 26 de novembro de 2025
                </p>
                <p style="margin: 5px 0; color: #78350f; font-size: 15px;">
                  <strong>Horário:</strong> 13:00 – 17:00 (Fuso horário: America/Sao_Paulo)
                </p>
                <p style="margin: 5px 0; color: #78350f; font-size: 15px;">
                  <strong>Formato:</strong> Online • Ao vivo
                </p>
              </div>
              
              <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h2 style="margin: 0 0 15px; color: #1e40af; font-size: 20px; font-weight: bold;">
                  🎥 Como Participar do Google Meet
                </h2>
                
                <p style="margin: 0 0 15px; color: #1e3a8a; font-size: 15px; line-height: 1.6;">
                  <strong>Link da videochamada:</strong>
                </p>
                <p style="margin: 0 0 20px;">
                  <a href="${meetInfo.link}" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
                    Acessar Google Meet
                  </a>
                </p>
                
                <p style="margin: 15px 0 5px; color: #1e3a8a; font-size: 15px;">
                  <strong>Ou disque:</strong>
                </p>
                <p style="margin: 0 0 10px; color: #1e3a8a; font-size: 15px;">
                  ${meetInfo.phone}<br>
                  PIN: ${meetInfo.pin}
                </p>
                
                <p style="margin: 15px 0 5px; color: #1e3a8a; font-size: 15px;">
                  <strong>Outros números de telefone:</strong>
                </p>
                <p style="margin: 0;">
                  <a href="${meetInfo.phoneLink}" style="color: #3b82f6; text-decoration: underline;">${meetInfo.phoneLink}</a>
                </p>
              </div>
              
              <div style="background-color: #f3f4f6; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                  <strong>⚠️ Importante:</strong> A sala pode sofrer alterações. Todos os participantes serão informados caso isso aconteça.
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
                <strong style="color: #fbbf24;">Escuderia Pódium</strong>
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

async function sendTestEmail() {
  // Tentar carregar novamente se não encontrou
  if (!process.env.RESEND_API_KEY && fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    const lines = envFile.split('\n');
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const match = trimmedLine.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          let value = match[2].trim();
          value = value.replace(/^["']|["']$/g, '');
          process.env[key] = value;
        }
      }
    });
  }
  
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error('❌ ERRO: RESEND_API_KEY não encontrado!');
    console.log('\nPor favor, configure a variável RESEND_API_KEY:');
    console.log('1. Crie um arquivo .env.local na raiz do projeto');
    console.log('2. Adicione: RESEND_API_KEY=re_xxxxxxxxxxxxx');
    console.log('3. Execute este script novamente\n');
    process.exit(1);
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.FROM_EMAIL || 'noreply@mundopodium.com.br';
  const testEmail = 'romulocsfreitas@gmail.com';
  const testNome = 'Rômulo';

  console.log('📧 Enviando email de teste...');
  console.log(`   Para: ${testEmail}`);
  console.log(`   De: ${fromEmail}`);
  console.log(`   Nome: ${testNome}\n`);

  try {
    const html = getWorkshopEmailTemplate({ nome: testNome, email: testEmail });
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [testEmail],
      subject: '🧪 Email de Teste - Workshop Destrave Suas Ligações',
      html,
    });

    if (error) {
      console.error('❌ Erro ao enviar email:', error);
      process.exit(1);
    }

    console.log('✅ Email enviado com sucesso!');
    console.log(`   Message ID: ${data?.id}`);
    console.log(`\n📬 Verifique a caixa de entrada de ${testEmail}\n`);
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    process.exit(1);
  }
}

sendTestEmail();

