import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

// Configuração do Supabase
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

// Validação robusta das variáveis de ambiente
function validateSupabaseConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!SUPABASE_URL) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL não está configurada');
  } else if (!SUPABASE_URL.startsWith('https://') || !SUPABASE_URL.includes('.supabase.co')) {
    errors.push(`NEXT_PUBLIC_SUPABASE_URL parece inválida: ${SUPABASE_URL.substring(0, 50)}...`);
  }

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    errors.push('SUPABASE_SERVICE_ROLE_KEY não está configurada');
  } else if (SUPABASE_SERVICE_ROLE_KEY.length < 50) {
    errors.push('SUPABASE_SERVICE_ROLE_KEY parece inválida (muito curta)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

const configValidation = validateSupabaseConfig();

if (!configValidation.isValid) {
  console.error('❌ Supabase não configurado corretamente:');
  configValidation.errors.forEach((error) => {
    console.error(`  - ${error}`);
  });
  console.error('\n📝 Para corrigir:');
  console.error('  1. Crie um arquivo .env.local na raiz do projeto');
  console.error('  2. Adicione as variáveis:');
  console.error('     NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co');
  console.error('     SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key');
  console.error('  3. Reinicie o servidor de desenvolvimento');
}

// Cliente Supabase para operações server-side (usa service role key para bypass RLS)
export const supabase: SupabaseClient | null = configValidation.isValid && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      db: {
        schema: 'public',
      },
    })
  : null;

// Função para verificar conexão com Supabase
export async function testSupabaseConnection(): Promise<{
  success: boolean;
  error?: string;
  details?: {
    connected: boolean;
    tableExists: boolean;
    canRead: boolean;
    canWrite: boolean;
  };
}> {
  if (!supabase) {
    return {
      success: false,
      error: 'Supabase não configurado',
    };
  }

  const details = {
    connected: false,
    tableExists: false,
    canRead: false,
    canWrite: false,
  };

  try {
    // Teste 1: Verificar se consegue conectar (fazendo uma query simples)
    const { data, error } = await supabase
      .from('workshop_registrations')
      .select('id')
      .limit(1);

    if (error) {
      // Verificar se é erro de tabela não encontrada
      if (error.code === '42P01' || error.message.includes('does not exist')) {
        return {
          success: false,
          error: 'Tabela workshop_registrations não existe. Execute o script SQL em supabase-workshop-schema.sql',
          details: {
            ...details,
            connected: true,
          },
        };
      }

      return {
        success: false,
        error: `Erro ao conectar: ${error.message} (código: ${error.code})`,
        details: {
          ...details,
          connected: true,
        },
      };
    }

    details.connected = true;
    details.tableExists = true;
    details.canRead = true;

    // Teste 2: Verificar se consegue escrever (fazendo um upsert de teste que será revertido)
    const testChargeId = `test-connection-${Date.now()}`;
    const { error: writeError } = await supabase
      .from('workshop_registrations')
      .upsert(
        {
          charge_id: testChargeId,
          status: 'TEST',
          nome: 'Test Connection',
        },
        {
          onConflict: 'charge_id',
        }
      );

    if (writeError) {
      return {
        success: false,
        error: `Erro ao escrever: ${writeError.message} (código: ${writeError.code})`,
        details: {
          ...details,
          canWrite: false,
        },
      };
    }

    details.canWrite = true;

    // Limpar registro de teste
    await supabase
      .from('workshop_registrations')
      .delete()
      .eq('charge_id', testChargeId);

    return {
      success: true,
      details,
    };
  } catch (error: any) {
    return {
      success: false,
      error: `Erro inesperado ao testar conexão: ${error.message}`,
      details,
    };
  }
}

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
 * Retry logic para operações do Supabase
 */
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      // Não fazer retry para erros de validação ou configuração
      if (
        error.code === '23505' || // Unique constraint violation
        error.code === '23503' || // Foreign key violation
        error.code === '42P01' || // Table doesn't exist
        error.message?.includes('not configured')
      ) {
        throw error;
      }

      if (attempt < maxRetries) {
        const waitTime = delayMs * attempt;
        console.warn(`⚠️ Tentativa ${attempt}/${maxRetries} falhou, tentando novamente em ${waitTime}ms...`, {
          error: error.message,
          code: error.code,
        });
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }
  
  throw lastError;
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
    const errorMsg = 'Supabase não configurado. Verifique NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY';
    console.error(`❌ ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  // Validação básica dos dados
  if (!data.charge_id) {
    const errorMsg = 'charge_id é obrigatório';
    console.error(`❌ ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  if (!data.status) {
    const errorMsg = 'status é obrigatório';
    console.error(`❌ ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

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

  // Usar retry logic para operações críticas
  try {
      const result = await withRetry(async () => {
        const response = await supabase!
          .from('workshop_registrations')
          .upsert(registrationData, {
            onConflict: 'charge_id',
            ignoreDuplicates: false,
          })
          .select()
          .single();
        
        if (response.error) {
          throw response.error;
        }
        
        return response;
      });

      // Se chegou aqui, a operação foi bem-sucedida
      if (result.data) {
        console.log('✅ Registro do workshop salvo no Supabase:', {
          charge_id: data.charge_id,
          email: data.email,
          status: data.status,
          id: result.data.id,
        });
        return { success: true, data: result.data as WorkshopRegistration };
      }
      
      // Se não tem data mas também não tem error, algo estranho aconteceu
      return { success: false, error: 'Operação concluída mas nenhum dado retornado' };
    } catch (error: any) {
      // Tratamento específico de erros comuns
      let errorMessage = error?.message || 'Erro desconhecido ao salvar registro';
      
      if (error?.code === '42P01') {
        errorMessage = 'Tabela workshop_registrations não existe. Execute o script SQL em supabase-workshop-schema.sql';
      } else if (error?.code === '23505') {
        errorMessage = `Registro com charge_id ${data.charge_id} já existe (violação de constraint único)`;
      } else if (error?.code === '23502') {
        errorMessage = `Campo obrigatório ausente: ${error.column || 'desconhecido'}`;
      } else if (error?.code === 'PGRST301') {
        errorMessage = 'Erro de permissão. Verifique se a service role key está correta';
      }

      console.error('❌ Erro ao salvar registro no Supabase:', {
        error: errorMessage,
        code: error?.code,
        details: error?.details,
        hint: error?.hint,
        charge_id: data.charge_id,
        email: data.email,
        status: data.status,
      });
      
      return { success: false, error: errorMessage };
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
    const errorMsg = 'Supabase não configurado. Verifique NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY';
    console.error(`❌ ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  if (!chargeId) {
    const errorMsg = 'chargeId é obrigatório';
    console.error(`❌ ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  try {
    await withRetry(async () => {
      const response = await supabase!
        .from('workshop_registrations')
        .update({
          email_sent: emailSent,
          email_sent_at: emailSent ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq('charge_id', chargeId);
      
      if (response.error) {
        throw response.error;
      }
      
      return response;
    });

    console.log('✅ Status de email atualizado no Supabase:', {
      charge_id: chargeId,
      email_sent: emailSent,
    });

    return { success: true };
  } catch (error: any) {
    let errorMessage = error?.message || 'Erro desconhecido ao atualizar status de email';
    
    if (error?.code === '42P01') {
      errorMessage = 'Tabela workshop_registrations não existe. Execute o script SQL em supabase-workshop-schema.sql';
    } else if (error?.code === 'PGRST116') {
      // Registro não encontrado - não é necessariamente um erro crítico
      console.warn('⚠️ Registro não encontrado ao atualizar status de email:', {
        charge_id: chargeId,
      });
      return { success: false, error: 'Registro não encontrado' };
    }

    console.error('❌ Erro ao atualizar status de email:', {
      error: errorMessage,
      code: error?.code,
      charge_id: chargeId,
    });
    return { success: false, error: errorMessage };
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
    const errorMsg = 'Supabase não configurado. Verifique NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY';
    console.error(`❌ ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  if (!chargeId) {
    const errorMsg = 'chargeId é obrigatório';
    console.error(`❌ ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  try {
    const result = await withRetry(async () => {
      const response = await supabase!
        .from('workshop_registrations')
        .select('*')
        .eq('charge_id', chargeId)
        .single();
      
      if (response.error && response.error.code !== 'PGRST116') {
        throw response.error;
      }
      
      return response;
    });

    if (result.error) {
      if (result.error.code === 'PGRST116') {
        // Registro não encontrado - não é um erro, apenas não existe
        return { success: true, data: undefined };
      }

      let errorMessage = result.error.message || 'Erro desconhecido ao buscar registro';
      
      if (result.error.code === '42P01') {
        errorMessage = 'Tabela workshop_registrations não existe. Execute o script SQL em supabase-workshop-schema.sql';
      }

      console.error('❌ Erro ao buscar registro:', {
        error: errorMessage,
        code: result.error.code,
        charge_id: chargeId,
      });
      return { success: false, error: errorMessage };
    }

    return { success: true, data: result.data as WorkshopRegistration };
  } catch (error: any) {
    let errorMessage = error?.message || 'Erro desconhecido ao buscar registro';
    
    if (error?.code === '42P01') {
      errorMessage = 'Tabela workshop_registrations não existe. Execute o script SQL em supabase-workshop-schema.sql';
    }
    
    console.error('❌ Erro inesperado ao buscar registro:', {
      error: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      charge_id: chargeId,
    });
    return { success: false, error: errorMessage };
  }
}

/**
 * Busca todos os registros com pagamento confirmado que precisam receber e-mails agendados
 * @returns Lista de registros com status PAID
 */
export async function getPaidRegistrations(): Promise<{ success: boolean; data?: WorkshopRegistration[]; error?: string }> {
  if (!supabase) {
    const errorMsg = 'Supabase não configurado. Verifique NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY';
    console.error(`❌ ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  try {
    const result = await withRetry(async () => {
      const response = await supabase!
        .from('workshop_registrations')
        .select('*')
        .eq('status', 'PAID')
        .not('email', 'is', null)
        .or('reference_id.is.null,reference_id.neq.workshop-corretores');
      
      if (response.error) {
        throw response.error;
      }
      
      return response;
    }) as { data: WorkshopRegistration[] | null; error: any };

    if (result.error) {
      let errorMessage = result.error?.message || 'Erro desconhecido ao buscar registros';
      
      if (result.error?.code === '42P01') {
        errorMessage = 'Tabela workshop_registrations não existe. Execute o script SQL em supabase-workshop-schema.sql';
      }

      console.error('❌ Erro ao buscar registros:', {
        error: errorMessage,
        code: result.error?.code,
      });
      return { success: false, error: errorMessage };
    }

    return { success: true, data: (result.data || []) as WorkshopRegistration[] };
  } catch (error: any) {
    let errorMessage = error?.message || 'Erro desconhecido ao buscar registros';
    
    if (error?.code === '42P01') {
      errorMessage = 'Tabela workshop_registrations não existe. Execute o script SQL em supabase-workshop-schema.sql';
    }
    
    console.error('❌ Erro inesperado ao buscar registros:', {
      error: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
    return { success: false, error: errorMessage };
  }
}

/**
 * Adiciona um convidado especial (mentorado ou convidado da comunidade) ao Supabase
 * Gera um charge_id único usando UUID e preenche campos de pagamento com valores padrão
 * @param nome Nome do convidado
 * @param email Email do convidado
 * @param tipo Tipo de convidado: MENTORADO ou CONVIDADO
 * @returns Resultado da operação
 */
export async function addInvitedGuest(
  nome: string,
  email: string,
  tipo: 'MENTORADO' | 'CONVIDADO'
): Promise<{ success: boolean; error?: string; data?: WorkshopRegistration; chargeId?: string }> {
  if (!supabase) {
    const errorMsg = 'Supabase não configurado. Verifique NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY';
    console.error(`❌ ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  // Validação básica
  if (!nome || !email) {
    const errorMsg = 'Nome e email são obrigatórios';
    console.error(`❌ ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  // Gerar charge_id único usando UUID (formato: invite-{uuid})
  const chargeId = `invite-${randomUUID()}`;

  // Criar registro com valores padrão para pessoas que não compraram
  const registrationData: WorkshopRegistration = {
    charge_id: chargeId,
    reference_id: `invitation-${tipo.toLowerCase()}-${Date.now()}`,
    nome: nome,
    email: email,
    status: 'INVITED',
    amount: 0,
    amount_brl: 0.00,
    payment_method: undefined,
    installments: undefined,
    description: `Convite especial - ${tipo === 'MENTORADO' ? 'Mentorado (Elite/Escuderia Pódium)' : 'Convidado (Comunidade Pódium)'}`,
    email_sent: false,
    paid_at: undefined,
  };

  // Usar upsertWorkshopRegistration existente
  const result = await upsertWorkshopRegistration(registrationData);

  if (result.success && result.data) {
    console.log('✅ Convidado adicionado ao Supabase:', {
      charge_id: chargeId,
      email: email,
      nome: nome,
      tipo: tipo,
    });
    return { 
      success: true, 
      data: result.data,
      chargeId: chargeId,
    };
  }

  return { 
    success: false, 
    error: result.error || 'Erro desconhecido ao adicionar convidado',
  };
}

