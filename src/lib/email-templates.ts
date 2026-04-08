import { getGoogleMeetInfo, WORKSHOP_INFO, WORKSHOP_MODULE_2_INFO } from './constants';

export interface WorkshopEmailData {
  nome: string;
  email: string;
}

export function getWorkshopEmailTemplate(data: WorkshopEmailData): string {
  const meetInfo = getGoogleMeetInfo();
  
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
                  <strong style="color: #78350f;">Módulo 1:</strong> ${WORKSHOP_INFO.dateEmailLine}
                </p>
                <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
                  <strong style="color: #78350f;">Módulo 2:</strong> ${WORKSHOP_MODULE_2_INFO.dateEmailLine}
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

// Template específico para email de lembrete de 1 dia antes
export function getOneDayBeforeEmailTemplate(data: WorkshopEmailData): string {
  const meetInfo = getGoogleMeetInfo();
  
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lembrete: Workshop Destrave Suas Ligações</title>
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
                ⏰ FALTA APENAS 1 DIA!
              </h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px;">
                Workshop Destrave Suas Ligações
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #374151; font-size: 18px; line-height: 1.6; font-weight: bold;">
                Olá <strong>${data.nome || 'Participante'}</strong>! 👋
              </p>
              
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                <strong>Falta apenas 1 dia para o Workshop Destrave Suas Ligações!</strong> Estamos muito animados para te ajudar a transformar seu medo em coragem e suas travas em resultados.
              </p>
              
              <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); border: 2px solid #3b82f6; padding: 30px; margin: 30px 0; border-radius: 8px; text-align: center;">
                <h2 style="margin: 0 0 20px; color: #fbbf24; font-size: 22px; font-weight: bold;">
                  🚀 O que você vai conquistar amanhã:
                </h2>
                <div style="text-align: left; color: #ffffff; font-size: 15px; line-height: 1.8;">
                  <p style="margin: 10px 0; color: #ffffff;"><strong style="color: #fbbf24;">✅ Discurso perfeito de cold call</strong> - Saiba exatamente o que dizer</p>
                  <p style="margin: 10px 0; color: #ffffff;"><strong style="color: #fbbf24;">✅ Abrir ligações sem ser invasivo</strong> - Técnica que cria interesse</p>
                  <p style="margin: 10px 0; color: #ffffff;"><strong style="color: #fbbf24;">✅ Marcar R1 em até 48h</strong> - Método comprovado de agendamento</p>
                  <p style="margin: 10px 0; color: #ffffff;"><strong style="color: #fbbf24;">✅ Lidar com rejeição e objeções</strong> - Transforme "não" em "sim"</p>
                  <p style="margin: 10px 0; color: #ffffff;"><strong style="color: #fbbf24;">✅ Falar com autoridade</strong> - Mesmo sendo iniciante</p>
                  <p style="margin: 10px 0; color: #ffffff;"><strong style="color: #fbbf24;">✅ Destravar de vez o medo</strong> - Elimine o bloqueio de ligar</p>
                  <p style="margin: 10px 0; color: #ffffff;"><strong style="color: #fbbf24;">✅ Assistir ligações reais ao vivo</strong> - Aprenda com exemplos práticos</p>
                </div>
              </div>
              
              <div style="background-color: #fef3c7; border-left: 4px solid #fbbf24; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h2 style="margin: 0 0 15px; color: #78350f; font-size: 20px; font-weight: bold;">
                  📅 Informações Importantes
                </h2>
                <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
                  <strong style="color: #78350f;">Módulo 1 (amanhã):</strong> <span style="color: #1f2937; font-weight: bold;">${WORKSHOP_INFO.date}</span>
                </p>
                <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
                  <strong style="color: #78350f;">Módulo 2:</strong> ${WORKSHOP_MODULE_2_INFO.dateEmailLine}
                </p>
                <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
                  <strong style="color: #78350f;">Horário:</strong> 13:00 – 17:00 (Fuso horário: America/Sao_Paulo)
                </p>
                <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
                  <strong style="color: #78350f;">Formato:</strong> Online • Ao vivo • 100% prático
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
              
              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h2 style="margin: 0 0 15px; color: #065f46; font-size: 20px; font-weight: bold;">
                  💪 Por que sua participação é importante?
                </h2>
                <p style="margin: 0 0 10px; color: #1f2937; font-size: 15px; line-height: 1.6;">
                  Este não é apenas mais um workshop. É uma <strong style="color: #065f46;">transformação completa</strong> na forma como você se comunica e vende. Você vai:
                </p>
                <ul style="margin: 10px 0; padding-left: 20px; color: #1f2937; font-size: 15px; line-height: 1.8;">
                  <li>Ganhar <strong style="color: #065f46;">confiança para ligar</strong> sem medo ou vergonha</li>
                  <li>Aprender métodos <strong style="color: #065f46;">testados e validados</strong> por centenas de vendedores</li>
                  <li>Assistir <strong style="color: #065f46;">ligações reais ao vivo</strong> e ver o método em ação</li>
                  <li>Receber <strong style="color: #065f46;">feedback imediato</strong> e personalizado</li>
                  <li>Sair do workshop com um <strong style="color: #065f46;">discurso pronto</strong> para usar já na segunda-feira</li>
                </ul>
              </div>
              
              <div style="background-color: #fef3c7; padding: 20px; margin: 30px 0; border-radius: 4px; text-align: center; border: 2px solid #fbbf24;">
                <p style="margin: 0; color: #78350f; font-size: 16px; line-height: 1.6; font-weight: bold;">
                  🎯 Não perca esta oportunidade única de transformar sua carreira comercial!
                </p>
                <p style="margin: 10px 0 0; color: #1f2937; font-size: 14px; line-height: 1.6;">
                  Este workshop acontece apenas uma vez. Garanta sua presença e comece a marcar reuniões ainda nesta semana.
                </p>
              </div>
              
              <p style="margin: 30px 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Estamos <strong>muito ansiosos</strong> para te ver amanhã e fazer parte desta transformação incrível!
              </p>
              
              <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Qualquer dúvida, entre em contato conosco. Te esperamos amanhã! 🚀
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

// Template específico para email de lembrete de 1 hora antes
export function getOneHourBeforeEmailTemplate(data: WorkshopEmailData): string {
  const meetInfo = getGoogleMeetInfo();
  
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lembrete: Workshop começa em 1 hora!</title>
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
                ⏰ FALTA APENAS 1 HORA!
              </h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px;">
                Workshop Destrave Suas Ligações começa às 13:00
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #374151; font-size: 18px; line-height: 1.6; font-weight: bold;">
                Olá <strong>${data.nome || 'Participante'}</strong>! 🚀
              </p>
              
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                <strong>O Workshop Destrave Suas Ligações começa em apenas 1 hora!</strong> Está tudo pronto para transformar seu medo em coragem e suas travas em resultados reais.
              </p>
              
              <div style="background-color: #ffffff; border: 2px solid #e5e7eb; padding: 25px; margin: 30px 0; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="margin: 0 0 15px; color: #1f2937; font-size: 24px; font-weight: bold;">
                  🎯 Prepare-se para:
                </h2>
                <p style="margin: 5px 0; color: #1f2937; font-size: 16px; font-weight: bold;">
                  Assista ligações reais AO VIVO
                </p>
                <p style="margin: 5px 0; color: #6b7280; font-size: 15px;">
                  Veja na prática como destravar ligações e marcar reuniões
                </p>
              </div>
              
              <div style="background-color: #fef3c7; border-left: 4px solid #fbbf24; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h2 style="margin: 0 0 15px; color: #78350f; font-size: 20px; font-weight: bold;">
                  📅 Informações do Workshop
                </h2>
                <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
                  <strong style="color: #78350f;">Módulo 1 (hoje):</strong> <span style="color: #1f2937; font-weight: bold;">${WORKSHOP_INFO.date}</span>
                </p>
                <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
                  <strong style="color: #78350f;">Módulo 2:</strong> ${WORKSHOP_MODULE_2_INFO.dateEmailLine}
                </p>
                <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
                  <strong style="color: #78350f;">Horário:</strong> <span style="color: #dc2626; font-weight: bold;">13:00 – 17:00</span> (Fuso horário: America/Sao_Paulo)
                </p>
                <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
                  <strong style="color: #78350f;">Formato:</strong> Online • Ao vivo • 100% prático
                </p>
              </div>
              
              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h2 style="margin: 0 0 15px; color: #1e40af; font-size: 20px; font-weight: bold;">
                  🎥 Link da Videochamada (GUARDE ESTE LINK!)
                </h2>
                
                <p style="margin: 0 0 20px; color: #1e293b; font-size: 15px; line-height: 1.6;">
                  <strong style="color: #1e40af;">Clique no botão abaixo para entrar no Google Meet:</strong>
                </p>
                <p style="margin: 0 0 20px; text-align: center;">
                  <a href="${meetInfo.link}" style="display: inline-block; padding: 16px 32px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">
                    🎬 ENTRAR NO WORKSHOP AGORA
                  </a>
                </p>
                
                <p style="margin: 20px 0 5px; color: #1e293b; font-size: 14px;">
                  <strong style="color: #1e40af;">Ou disque pelo telefone:</strong>
                </p>
                <p style="margin: 0 0 10px; color: #1e293b; font-size: 14px;">
                  ${meetInfo.phone}<br>
                  PIN: <strong>${meetInfo.pin}</strong>
                </p>
                
                <p style="margin: 15px 0 5px; color: #1e293b; font-size: 14px;">
                  <strong style="color: #1e40af;">Outros números:</strong>
                </p>
                <p style="margin: 0;">
                  <a href="${meetInfo.phoneLink}" style="color: #2563eb; text-decoration: underline; font-weight: 600; font-size: 14px;">${meetInfo.phoneLink}</a>
                </p>
              </div>
              
              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h2 style="margin: 0 0 15px; color: #065f46; font-size: 20px; font-weight: bold;">
                  ✅ Checklist antes de começar:
                </h2>
                <ul style="margin: 10px 0; padding-left: 20px; color: #1f2937; font-size: 15px; line-height: 1.8;">
                  <li>✓ Teste seu microfone e câmera</li>
                  <li>✓ Feche outros aplicativos para melhor qualidade</li>
                  <li>✓ Prepare um bloco de notas para anotações</li>
                  <li>✓ Esteja em um ambiente silencioso e confortável</li>
                  <li>✓ Tenha o link do Google Meet acessível</li>
                </ul>
              </div>
              
              <div style="background-color: #fef3c7; padding: 20px; margin: 30px 0; border-radius: 4px; text-align: center; border: 2px solid #fbbf24;">
                <p style="margin: 0; color: #78350f; font-size: 16px; line-height: 1.6; font-weight: bold;">
                  🎯 Você está a poucos minutos de transformar sua forma de vender!
                </p>
                <p style="margin: 10px 0 0; color: #1f2937; font-size: 14px; line-height: 1.6;">
                  Nos vemos em 1 hora às 13:00. Não perca esta oportunidade única!
                </p>
              </div>
              
              <p style="margin: 30px 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Estamos <strong>muito ansiosos</strong> para começar e te ajudar a destravar suas ligações!
              </p>
              
              <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Qualquer dúvida, entre em contato conosco. Te esperamos às 13:00! 🚀
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

// Template específico para email de convite especial (mentorados e convidados da comunidade)
export function getInvitationEmailTemplate(
  data: WorkshopEmailData,
  tipo: 'MENTORADO' | 'CONVIDADO'
): string {
  const meetInfo = getGoogleMeetInfo();
  
  // Personalizar mensagem baseado no tipo
  const comunidadeText = tipo === 'MENTORADO' 
    ? 'Elite Pódium ou Escuderia Pódium'
    : 'Comunidade Pódium';
  
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Convite Especial - Workshop Destrave Suas Ligações</title>
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
                🎁 CONVITE ESPECIAL
              </h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px;">
                WORKSHOP DESTRAVE SUAS LIGAÇÕES
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
                Como você já faz parte da <strong>${comunidadeText}</strong>, quero te convidar especialmente para participar do <strong>Workshop Destrave Suas Ligações</strong>.
              </p>
              
              <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); border: 2px solid #fbbf24; padding: 25px; margin: 30px 0; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #1f2937; font-size: 18px; font-weight: bold; line-height: 1.6;">
                  🎯 Este é um convite exclusivo para você, como parte da nossa comunidade.
                </p>
                <p style="margin: 15px 0 0; color: #78350f; font-size: 16px; line-height: 1.6;">
                  Você terá <strong>acesso gratuito</strong> a este workshop em 2 módulos (6 horas no total), nos dias <strong>15 e 22 de abril de 2026</strong>, das 13:00 às 17:00 em cada encontro.
                </p>
              </div>
              
              <div style="background-color: #fef3c7; border-left: 4px solid #fbbf24; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h2 style="margin: 0 0 15px; color: #78350f; font-size: 20px; font-weight: bold;">
                  📅 Detalhes do Workshop
                </h2>
                <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
                  <strong style="color: #78350f;">Módulo 1:</strong> ${WORKSHOP_INFO.dateEmailLine}
                </p>
                <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
                  <strong style="color: #78350f;">Módulo 2:</strong> ${WORKSHOP_MODULE_2_INFO.dateEmailLine}
                </p>
                <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
                  <strong style="color: #78350f;">Horário:</strong> 13:00 – 17:00 (Fuso horário: America/Sao_Paulo)
                </p>
                <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
                  <strong style="color: #78350f;">Formato:</strong> Online • Ao vivo • 100% prático
                </p>
                <p style="margin: 8px 0; color: #1f2937; font-size: 15px;">
                  <strong style="color: #78350f;">Duração:</strong> 6 horas no total (3h por módulo)
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
              
              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h2 style="margin: 0 0 15px; color: #065f46; font-size: 20px; font-weight: bold;">
                  🚀 O que você vai aprender:
                </h2>
                <ul style="margin: 10px 0; padding-left: 20px; color: #1f2937; font-size: 15px; line-height: 1.8;">
                  <li>✅ <strong style="color: #065f46;">Discurso perfeito de cold call</strong> - Saiba exatamente o que dizer</li>
                  <li>✅ <strong style="color: #065f46;">Abrir ligações sem ser invasivo</strong> - Técnica que cria interesse</li>
                  <li>✅ <strong style="color: #065f46;">Marcar R1 em até 48h</strong> - Método comprovado de agendamento</li>
                  <li>✅ <strong style="color: #065f46;">Lidar com rejeição e objeções</strong> - Transforme "não" em "sim"</li>
                  <li>✅ <strong style="color: #065f46;">Falar com autoridade</strong> - Mesmo sendo iniciante</li>
                  <li>✅ <strong style="color: #065f46;">Destravar de vez o medo</strong> - Elimine o bloqueio de ligar</li>
                  <li>✅ <strong style="color: #065f46;">Assistir ligações reais ao vivo</strong> - Aprenda com exemplos práticos</li>
                </ul>
              </div>
              
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">
                  <strong style="color: #1f2937;">⚠️ Importante:</strong> A sala pode sofrer alterações. Todos os participantes serão informados caso isso aconteça.
                </p>
              </div>
              
              <p style="margin: 30px 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Estou <strong>muito ansioso</strong> para te ver no workshop e fazer parte desta transformação incrível na sua forma de vender!
              </p>
              
              <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Qualquer dúvida, entre em contato conosco. Te espero lá! 🚀
              </p>
              
              <p style="margin: 20px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6; font-style: italic;">
                Com carinho,<br>
                <strong style="color: #1f2937;">Rômulo</strong>
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

