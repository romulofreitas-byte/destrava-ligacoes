import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('⚠️ Supabase não configurado. Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local');
}

// Cliente Supabase para operações server-side (usa service role key para bypass RLS)
export const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Tipos para a tabela workshop_registrations
export interface WorkshopRegistration {
  id?: string;
  charge_id: string;
  reference_id?: string;
  nome?: string;
  email?: string;
  tax_id?: string;
  telefone_country?: string;
  telefone_area?: string;
  telefone_number?: string;
  status: string;
  amount?: number;
  amount_brl?: number;
  payment_method?: string;
  installments?: number;
  description?: string;
  created_at?: string;
  updated_at?: string;
  paid_at?: string;
  email_sent?: boolean;
  email_sent_at?: string;
}

/**
 * Cria ou atualiza um registro de workshop no Supabase
 * @param data Dados do registro do workshop
 * @returns Resultado da operação
 */
export async function upsertWorkshopRegistration(
  data: WorkshopRegistration
): Promise<{ success: boolean; error?: string; data?: WorkshopRegistration }> {
  if (!supabase) {
    console.error('❌ Supabase não configurado');
    return { success: false, error: 'Supabase não configurado' };
  }

  try {
    // Preparar dados para inserção/atualização
    const registrationData: Partial<WorkshopRegistration> = {
      charge_id: data.charge_id,
      reference_id: data.reference_id,
      nome: data.nome,
      email: data.email,
      tax_id: data.tax_id,
      telefone_country: data.telefone_country,
      telefone_area: data.telefone_area,
      telefone_number: data.telefone_number,
      status: data.status,
      amount: data.amount,
      amount_brl: data.amount_brl,
      payment_method: data.payment_method,
      installments: data.installments,
      description: data.description,
      paid_at: data.paid_at,
      email_sent: data.email_sent ?? false,
      email_sent_at: data.email_sent_at,
      updated_at: new Date().toISOString(),
    };

    // Se não tiver created_at, definir como agora
    if (!data.created_at) {
      registrationData.created_at = new Date().toISOString();
    }

    // Usar upsert para criar ou atualizar baseado no charge_id
    const { data: result, error } = await supabase
      .from('workshop_registrations')
      .upsert(registrationData, {
        onConflict: 'charge_id',
        ignoreDuplicates: false,
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao salvar registro no Supabase:', {
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        charge_id: data.charge_id,
      });
      return { success: false, error: error.message };
    }

    console.log('✅ Registro do workshop salvo no Supabase:', {
      charge_id: data.charge_id,
      email: data.email,
      status: data.status,
      id: result?.id,
    });

    return { success: true, data: result as WorkshopRegistration };
  } catch (error: any) {
    console.error('❌ Erro inesperado ao salvar no Supabase:', error);
    return { success: false, error: error.message || 'Erro desconhecido' };
  }
}

/**
 * Atualiza o status de envio de email para um registro
 * @param chargeId ID do pagamento
 * @param emailSent Se o email foi enviado
 * @returns Resultado da operação
 */
export async function updateEmailStatus(
  chargeId: string,
  emailSent: boolean = true
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase não configurado' };
  }

  try {
    const { error } = await supabase
      .from('workshop_registrations')
      .update({
        email_sent: emailSent,
        email_sent_at: emailSent ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('charge_id', chargeId);

    if (error) {
      console.error('❌ Erro ao atualizar status de email:', {
        error: error.message,
        code: error.code,
        charge_id: chargeId,
      });
      return { success: false, error: error.message };
    }

    console.log('✅ Status de email atualizado no Supabase:', {
      charge_id: chargeId,
      email_sent: emailSent,
    });

    return { success: true };
  } catch (error: any) {
    console.error('❌ Erro inesperado ao atualizar status de email:', error);
    return { success: false, error: error.message || 'Erro desconhecido' };
  }
}

/**
 * Busca um registro pelo charge_id
 * @param chargeId ID do pagamento
 * @returns Registro encontrado ou null
 */
export async function getWorkshopRegistration(
  chargeId: string
): Promise<{ success: boolean; data?: WorkshopRegistration; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase não configurado' };
  }

  try {
    const { data, error } = await supabase
      .from('workshop_registrations')
      .select('*')
      .eq('charge_id', chargeId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Registro não encontrado
        return { success: true, data: undefined };
      }
      console.error('❌ Erro ao buscar registro:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data as WorkshopRegistration };
  } catch (error: any) {
    console.error('❌ Erro inesperado ao buscar registro:', error);
    return { success: false, error: error.message || 'Erro desconhecido' };
  }
}

