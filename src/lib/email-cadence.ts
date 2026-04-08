import { sendEmail } from './email';
import { getWorkshopEmailTemplate, getOneDayBeforeEmailTemplate, getOneHourBeforeEmailTemplate } from './email-templates';
import { WORKSHOP_INFO } from './constants';
import { updateEmailStatus, getWorkshopRegistration, getPaidRegistrations } from './supabase';

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

export async function sendImmediateEmail(data: EmailCadenceData): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    console.log('📧 [CADENCE] ===== sendImmediateEmail chamada =====');
    console.log('📧 [CADENCE] Email:', data.email);
    console.log('📧 [CADENCE] Nome:', data.nome);
    console.log('📧 [CADENCE] Charge ID:', data.chargeId);
    
    const record = getEmailRecord(data.chargeId) || createEmailRecord(data);
    
    if (record.emailsSent.immediate) {
      console.log(`✅ [CADENCE] Email imediato já enviado para ${data.email}`);
      return { success: true };
    }

    // Validação: verificar se email e nome estão presentes
    if (!data.email || !data.email.includes('@')) {
      const errorMsg = 'Email inválido ou não fornecido';
      console.error(`❌ [CADENCE] ${errorMsg}`);
      return { success: false, error: errorMsg };
    }

    if (!data.nome || data.nome.trim().length === 0) {
      console.warn(`⚠️ [CADENCE] Nome não fornecido, usando fallback`);
      data.nome = data.nome || data.email.split('@')[0] || 'Participante';
    }

    console.log('📧 [CADENCE] Gerando template de email...');
    const html = getWorkshopEmailTemplate({ nome: data.nome, email: data.email });
    const subject = '🎉 Pagamento Confirmado - Workshop Destrave Suas Ligações';
    console.log('📧 [CADENCE] Template gerado, assunto:', subject);

    console.log('📧 [CADENCE] Chamando sendEmail...');
    const result = await sendEmail({
      to: data.email,
      subject,
      html,
    });

    if (result.success) {
      record.emailsSent.immediate = true;
      record.sentAt.immediate = new Date();
      emailRecords.set(data.chargeId, record);
      console.log(`✅ [CADENCE] Email imediato enviado para ${data.email}`);
      console.log(`✅ [CADENCE] Message ID: ${result.messageId}`);
      console.log(`✅ [CADENCE] Registro atualizado no Map em memória`);
      
      // Atualizar Supabase para manter sincronização
      try {
        await updateEmailStatus(data.chargeId, true);
      } catch (supabaseError: any) {
        console.warn('⚠️ [CADENCE] Erro ao atualizar status de email no Supabase (não crítico):', supabaseError?.message);
      }
    } else {
      console.error(`❌ [CADENCE] Falha ao enviar email para ${data.email}`);
      console.error(`❌ [CADENCE] Erro: ${result.error}`);
    }

    return result;
  } catch (error: any) {
    console.error('❌ [CADENCE] Exceção ao enviar email imediato:', error);
    console.error('❌ [CADENCE] Stack:', error.stack);
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
      
      // Atualizar Supabase para manter sincronização
      try {
        await updateEmailStatus(data.chargeId, true);
      } catch (supabaseError: any) {
        console.warn('⚠️ Erro ao atualizar status de email no Supabase (não crítico):', supabaseError?.message);
      }
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
      
      // Atualizar Supabase para manter sincronização
      try {
        await updateEmailStatus(data.chargeId, true);
      } catch (supabaseError: any) {
        console.warn('⚠️ Erro ao atualizar status de email no Supabase (não crítico):', supabaseError?.message);
      }
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
  
  // Buscar registros do Supabase com pagamento confirmado
  const supabaseResult = await getPaidRegistrations();
  const registrationsFromSupabase = supabaseResult.success && supabaseResult.data ? supabaseResult.data : [];
  
  // Sincronizar registros do Supabase com Map em memória
  for (const registration of registrationsFromSupabase) {
    if (registration.charge_id && registration.email) {
      const existingRecord = getEmailRecord(registration.charge_id);
      if (!existingRecord) {
        // Criar registro no Map se não existir
        createEmailRecord({
          email: registration.email,
          nome: registration.nome || registration.email.split('@')[0],
          chargeId: registration.charge_id,
          referenceId: registration.reference_id || '',
        });
      }
    }
  }
  
  // Enviar email 1 dia antes (no dia 25 de novembro, pela manhã)
  if (now >= oneDayBefore && now < workshopDate) {
    // Primeiro, processar registros do Map em memória
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
    
    // Depois, processar registros do Supabase que não estão no Map
    for (const registration of registrationsFromSupabase) {
      if (registration.charge_id && registration.email) {
        const record = getEmailRecord(registration.charge_id);
        // Se não tem registro no Map ou não foi enviado, tentar enviar
        if (!record || !record.emailsSent.oneDayBefore) {
          await sendOneDayBeforeEmail({
            email: registration.email,
            nome: registration.nome || registration.email.split('@')[0],
            chargeId: registration.charge_id,
            referenceId: registration.reference_id || '',
          });
        }
      }
    }
  }

  // Enviar email de 1 hora antes do primeiro módulo (WORKSHOP_INFO.dateObj, 1h antes do horário de início)
  // Janela: entre 11h e 13h BRT (14h e 16h UTC)
  const oneHourBefore = new Date(workshopDate);
  oneHourBefore.setHours(oneHourBefore.getHours() - 1);
  const oneHourBeforeStart = new Date(oneHourBefore);
  oneHourBeforeStart.setHours(oneHourBeforeStart.getHours() - 1); // Janela de 2 horas antes até 1 hora antes
  const workshopStartTime = new Date(workshopDate);
  
  if (now >= oneHourBeforeStart && now < workshopStartTime) {
    // Primeiro, processar registros do Map em memória
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
    
    // Depois, processar registros do Supabase que não estão no Map
    for (const registration of registrationsFromSupabase) {
      if (registration.charge_id && registration.email) {
        const record = getEmailRecord(registration.charge_id);
        // Se não tem registro no Map ou não foi enviado, tentar enviar
        if (!record || !record.emailsSent.oneHourBefore) {
          await sendDayOfEmail({
            email: registration.email,
            nome: registration.nome || registration.email.split('@')[0],
            chargeId: registration.charge_id,
            referenceId: registration.reference_id || '',
          });
        }
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

export interface RetroactiveEmailResult {
  success: boolean;
  emailsSent: {
    immediate: boolean;
    oneDayBefore: boolean;
    oneHourBefore: boolean;
  };
  results: {
    immediate?: { success: boolean; error?: string };
    oneDayBefore?: { success: boolean; error?: string };
    oneHourBefore?: { success: boolean; error?: string };
  };
  error?: string;
}

/**
 * Envia e-mails retroativos para um aluno que comprou antes do sistema de e-mails ser instalado
 * Calcula quais e-mails devem ser enviados baseado na data atual e prazos do workshop
 */
export async function sendRetroactiveEmails(
  data: EmailCadenceData
): Promise<RetroactiveEmailResult> {
  try {
    const now = new Date();
    const workshopDate = WORKSHOP_INFO.dateObj;
    const oneDayBefore = new Date(workshopDate);
    oneDayBefore.setDate(oneDayBefore.getDate() - 1);
    oneDayBefore.setHours(0, 0, 0, 0); // Início do dia 9/12
    
    const oneHourBefore = new Date(workshopDate);
    oneHourBefore.setHours(oneHourBefore.getHours() - 1); // 10/12 às 12:00

    // Garantir que existe um registro no Map em memória
    let record = getEmailRecord(data.chargeId);
    if (!record) {
      record = createEmailRecord(data);
    }

    const result: RetroactiveEmailResult = {
      success: true,
      emailsSent: {
        immediate: false,
        oneDayBefore: false,
        oneHourBefore: false,
      },
      results: {},
    };

    // 1. Email imediato: sempre enviar se não foi enviado
    if (!record.emailsSent.immediate) {
      console.log(`📧 Enviando email imediato para ${data.email}...`);
      const immediateResult = await sendImmediateEmail(data);
      result.results.immediate = immediateResult;
      result.emailsSent.immediate = immediateResult.success;
      
      if (!immediateResult.success) {
        result.success = false;
      }
    } else {
      console.log(`✓ Email imediato já foi enviado para ${data.email}`);
      result.emailsSent.immediate = true;
      result.results.immediate = { success: true };
    }

    // 2. Email 1 dia antes: enviar se hoje >= 25/11 e não foi enviado
    if (now >= oneDayBefore && !record.emailsSent.oneDayBefore) {
      console.log(`📧 Enviando email de 1 dia antes para ${data.email}...`);
      const oneDayResult = await sendOneDayBeforeEmail(data);
      result.results.oneDayBefore = oneDayResult;
      result.emailsSent.oneDayBefore = oneDayResult.success;
      
      if (!oneDayResult.success) {
        result.success = false;
      }
    } else if (record.emailsSent.oneDayBefore) {
      console.log(`✓ Email de 1 dia antes já foi enviado para ${data.email}`);
      result.emailsSent.oneDayBefore = true;
      result.results.oneDayBefore = { success: true };
    } else {
      console.log(`⏳ Email de 1 dia antes será enviado automaticamente em 25/11 para ${data.email}`);
      result.results.oneDayBefore = { success: false, error: 'Ainda não é o momento de enviar (será enviado em 25/11)' };
    }

      // 3. Email 1 hora antes: enviar se hoje >= 10/12 12:00 e não foi enviado
    if (now >= oneHourBefore && !record.emailsSent.oneHourBefore) {
      console.log(`📧 Enviando email de 1 hora antes para ${data.email}...`);
      const oneHourResult = await sendDayOfEmail(data);
      result.results.oneHourBefore = oneHourResult;
      result.emailsSent.oneHourBefore = oneHourResult.success;
      
      if (!oneHourResult.success) {
        result.success = false;
      }
    } else if (record.emailsSent.oneHourBefore) {
      console.log(`✓ Email de 1 hora antes já foi enviado para ${data.email}`);
      result.emailsSent.oneHourBefore = true;
      result.results.oneHourBefore = { success: true };
    } else {
      console.log(`⏳ Email de 1 hora antes será enviado automaticamente em 10/12 às 12:00 para ${data.email}`);
      result.results.oneHourBefore = { success: false, error: 'Ainda não é o momento de enviar (será enviado em 10/12 às 12:00)' };
    }

    return result;
  } catch (error: any) {
    console.error('Erro ao enviar e-mails retroativos:', error);
    return {
      success: false,
      emailsSent: {
        immediate: false,
        oneDayBefore: false,
        oneHourBefore: false,
      },
      results: {},
      error: error.message || 'Erro ao enviar e-mails retroativos',
    };
  }
}

