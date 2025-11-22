import { Resend } from 'resend';

// Lazy initialization to avoid build-time errors
let resend: Resend | null = null;

function getResend(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY não configurado');
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: EmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY não configurado');
    return { success: false, error: 'RESEND_API_KEY não configurado' };
  }

  try {
    // Email remetente padrão: noreply@pitstop.mundopodium.com.br
    // Domínio verificado no Resend: pitstop.mundopodium.com.br
    // O email precisa usar o domínio/subdomínio verificado no Resend
    // Nome do remetente: "Rômulo, Pódium"
    // Se FROM_EMAIL estiver configurado e não for do domínio antigo, será usado
    // Caso contrário, usa o padrão com nome personalizado
    let fromEmail = from;
    if (!fromEmail) {
      if (process.env.FROM_EMAIL && !process.env.FROM_EMAIL.includes('escuderiapodium')) {
        fromEmail = process.env.FROM_EMAIL;
      } else {
        fromEmail = 'noreply@pitstop.mundopodium.com.br';
      }
    }
    
    // Adicionar nome do remetente ao email (formato: "Nome <email@dominio.com>")
    // Se o from já tiver nome, manter; caso contrário, adicionar
    let fromWithName = fromEmail;
    if (!fromEmail.includes('<')) {
      fromWithName = `Rômulo, Pódium <${fromEmail}>`;
    }
    
    const { data, error } = await getResend().emails.send({
      from: fromWithName,
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('Erro ao enviar email:', error);
      return { success: false, error: error.message || 'Erro desconhecido' };
    }

    return { success: true, messageId: data?.id };
  } catch (error: any) {
    console.error('Erro ao enviar email:', error);
    return { success: false, error: error.message || 'Erro ao enviar email' };
  }
}

