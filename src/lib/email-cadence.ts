import { sendEmail } from './email';
import { getWorkshopEmailTemplate, getOneDayBeforeEmailTemplate, getOneHourBeforeEmailTemplate } from './email-templates';
import { WORKSHOP_INFO } from './constants';

export interface EmailCadenceData {
  email: string;
  nome: string;
  chargeId: string;
  referenceId: string;
}

export interface EmailSentRecord {
  email: string;
  chargeId: string;
  referenceId: string;
  emailsSent: {
    immediate: boolean;
    oneDayBefore: boolean;
    oneHourBefore: boolean;
    dayOf: boolean;
  };
  sentAt: {
    immediate?: Date;
    oneDayBefore?: Date;
    oneHourBefore?: Date;
    dayOf?: Date;
  };
}

// Armazenamento simples em memória (em produção, usar banco de dados)
const emailRecords: Map<string, EmailSentRecord> = new Map();

export function getEmailRecord(chargeId: string): EmailSentRecord | undefined {
  return emailRecords.get(chargeId);
}

export function createEmailRecord(data: EmailCadenceData): EmailSentRecord {
  const record: EmailSentRecord = {
    email: data.email,
    chargeId: data.chargeId,
    referenceId: data.referenceId,
    emailsSent: {
      immediate: false,
      oneDayBefore: false,
      oneHourBefore: false,
      dayOf: false,
    },
    sentAt: {},
  };
  emailRecords.set(data.chargeId, record);
  return record;
}

export async function sendImmediateEmail(data: EmailCadenceData): Promise<{ success: boolean; error?: string }> {
  try {
    const record = getEmailRecord(data.chargeId) || createEmailRecord(data);
    
    if (record.emailsSent.immediate) {
      console.log(`Email imediato já enviado para ${data.email}`);
      return { success: true };
    }

    const html = getWorkshopEmailTemplate({ nome: data.nome, email: data.email });
    const subject = '🎉 Pagamento Confirmado - Workshop Destrave Suas Ligações';

    const result = await sendEmail({
      to: data.email,
      subject,
      html,
    });

    if (result.success) {
      record.emailsSent.immediate = true;
      record.sentAt.immediate = new Date();
      emailRecords.set(data.chargeId, record);
      console.log(`Email imediato enviado para ${data.email}`);
    }

    return result;
  } catch (error: any) {
    console.error('Erro ao enviar email imediato:', error);
    return { success: false, error: error.message || 'Erro ao enviar email' };
  }
}

export async function sendOneDayBeforeEmail(data: EmailCadenceData): Promise<{ success: boolean; error?: string }> {
  try {
    const record = getEmailRecord(data.chargeId);
    
    if (!record) {
      console.log(`Registro não encontrado para chargeId: ${data.chargeId}`);
      return { success: false, error: 'Registro não encontrado' };
    }

    if (record.emailsSent.oneDayBefore) {
      console.log(`Email 1 dia antes já enviado para ${data.email}`);
      return { success: true };
    }

    const html = getOneDayBeforeEmailTemplate({ nome: data.nome, email: data.email });
    const subject = '⏰ Falta apenas 1 dia! Workshop Destrave Suas Ligações é amanhã!';

    const result = await sendEmail({
      to: data.email,
      subject,
      html,
    });

    if (result.success) {
      record.emailsSent.oneDayBefore = true;
      record.sentAt.oneDayBefore = new Date();
      emailRecords.set(data.chargeId, record);
      console.log(`Email 1 dia antes enviado para ${data.email}`);
    }

    return result;
  } catch (error: any) {
    console.error('Erro ao enviar email 1 dia antes:', error);
    return { success: false, error: error.message || 'Erro ao enviar email' };
  }
}

export async function sendDayOfEmail(data: EmailCadenceData): Promise<{ success: boolean; error?: string }> {
  try {
    const record = getEmailRecord(data.chargeId);
    
    if (!record) {
      console.log(`Registro não encontrado para chargeId: ${data.chargeId}`);
      return { success: false, error: 'Registro não encontrado' };
    }

    if (record.emailsSent.oneHourBefore) {
      console.log(`Email de 1 hora antes já enviado para ${data.email}`);
      return { success: true };
    }

    const html = getOneHourBeforeEmailTemplate({ nome: data.nome, email: data.email });
    const subject = '⏰ Falta apenas 1 hora! Workshop Destrave Suas Ligações começa às 13:00';

    const result = await sendEmail({
      to: data.email,
      subject,
      html,
    });

    if (result.success) {
      record.emailsSent.oneHourBefore = true;
      record.sentAt.oneHourBefore = new Date();
      emailRecords.set(data.chargeId, record);
      console.log(`Email de 1 hora antes enviado para ${data.email}`);
    }

    return result;
  } catch (error: any) {
    console.error('Erro ao enviar email do dia:', error);
    return { success: false, error: error.message || 'Erro ao enviar email' };
  }
}

// Função para verificar e enviar emails agendados
export async function checkAndSendScheduledEmails(): Promise<void> {
  const now = new Date();
  const workshopDate = WORKSHOP_INFO.dateObj;
  const oneDayBefore = new Date(workshopDate);
  oneDayBefore.setDate(oneDayBefore.getDate() - 1);
  
  // Enviar email 1 dia antes (no dia 25 de novembro, pela manhã)
  if (now >= oneDayBefore && now < workshopDate) {
    for (const [chargeId, record] of emailRecords.entries()) {
      if (!record.emailsSent.oneDayBefore) {
        await sendOneDayBeforeEmail({
          email: record.email,
          nome: record.email.split('@')[0], // Fallback para nome
          chargeId: record.chargeId,
          referenceId: record.referenceId,
        });
      }
    }
  }

  // Enviar email de 1 hora antes do evento (26 de novembro, às 12:00 BRT = 15:00 UTC)
  // Janela: entre 11h e 13h BRT (14h e 16h UTC)
  const oneHourBefore = new Date(workshopDate);
  oneHourBefore.setHours(oneHourBefore.getHours() - 1);
  const oneHourBeforeStart = new Date(oneHourBefore);
  oneHourBeforeStart.setHours(oneHourBeforeStart.getHours() - 1); // Janela de 2 horas antes até 1 hora antes
  const workshopStartTime = new Date(workshopDate);
  
  if (now >= oneHourBeforeStart && now < workshopStartTime) {
    for (const [chargeId, record] of emailRecords.entries()) {
      if (!record.emailsSent.oneHourBefore) {
        await sendDayOfEmail({
          email: record.email,
          nome: record.email.split('@')[0], // Fallback para nome
          chargeId: record.chargeId,
          referenceId: record.referenceId,
        });
      }
    }
  }
}

// Função para enviar email manualmente sem dependência de chargeId
export async function sendWorkshopEmailManual(email: string, nome?: string): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    const customerName = nome || 'Participante';
    const html = getWorkshopEmailTemplate({ nome: customerName, email });
    const subject = '🎉 Pagamento Confirmado - Workshop Destrave Suas Ligações';

    const result = await sendEmail({
      to: email,
      subject,
      html,
    });

    if (result.success) {
      console.log(`Email de pagamento enviado manualmente para ${email}`);
    }

    return result;
  } catch (error: any) {
    console.error('Erro ao enviar email manual:', error);
    return { success: false, error: error.message || 'Erro ao enviar email' };
  }
}

// Função para enviar email de lembrete de 1 dia antes manualmente sem dependência de chargeId
export async function sendOneDayBeforeEmailManual(email: string, nome?: string): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    const customerName = nome || 'Participante';
    const html = getOneDayBeforeEmailTemplate({ nome: customerName, email });
    const subject = '⏰ Falta apenas 1 dia! Workshop Destrave Suas Ligações é amanhã!';

    const result = await sendEmail({
      to: email,
      subject,
      html,
    });

    if (result.success) {
      console.log(`Email de lembrete de 1 dia antes enviado manualmente para ${email}`);
    }

    return result;
  } catch (error: any) {
    console.error('Erro ao enviar email de lembrete manual:', error);
    return { success: false, error: error.message || 'Erro ao enviar email' };
  }
}

// Função para enviar email de lembrete de 1 hora antes manualmente sem dependência de chargeId
export async function sendOneHourBeforeEmailManual(email: string, nome?: string): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    const customerName = nome || 'Participante';
    const html = getOneHourBeforeEmailTemplate({ nome: customerName, email });
    const subject = '⏰ Falta apenas 1 hora! Workshop Destrave Suas Ligações começa às 13:00';

    const result = await sendEmail({
      to: email,
      subject,
      html,
    });

    if (result.success) {
      console.log(`Email de lembrete de 1 hora antes enviado manualmente para ${email}`);
    }

    return result;
  } catch (error: any) {
    console.error('Erro ao enviar email de lembrete de 1 hora manual:', error);
    return { success: false, error: error.message || 'Erro ao enviar email' };
  }
}

