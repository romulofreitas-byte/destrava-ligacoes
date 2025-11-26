import { NextRequest, NextResponse } from 'next/server';
import { sendRetroactiveEmails, EmailCadenceData } from '@/lib/email-cadence';
import { getWorkshopRegistration, updateEmailStatus } from '@/lib/supabase';
import { getPaymentStatus } from '@/lib/pagbank';

/**
 * Endpoint para disparar e-mails retroativos para alunos que compraram antes do sistema de e-mails
 * Aceita chargeId ou email como parâmetro
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { chargeId, email, nome } = body;

    if (!chargeId && !email) {
      return NextResponse.json(
        { error: 'chargeId ou email é obrigatório' },
        { status: 400 }
      );
    }

    let studentData: EmailCadenceData | null = null;
    let foundChargeId: string | null = null;

    // Tentar buscar por chargeId primeiro
    if (chargeId) {
      foundChargeId = chargeId;
      
      // Buscar no Supabase
      const supabaseResult = await getWorkshopRegistration(chargeId);
      
      if (supabaseResult.success && supabaseResult.data) {
        const registration = supabaseResult.data;
        if (registration.email) {
          studentData = {
            email: registration.email,
            nome: registration.nome || 'Participante',
            chargeId: registration.charge_id,
            referenceId: registration.reference_id || '',
          };
        }
      }

      // Se não encontrou no Supabase, buscar no PagBank
      if (!studentData) {
        try {
          const payment = await getPaymentStatus(chargeId);
          const customerEmail = payment.customer?.email;
          const customerName = payment.customer?.name || 'Participante';

          if (customerEmail) {
            studentData = {
              email: customerEmail,
              nome: customerName,
              chargeId: chargeId,
              referenceId: payment.reference_id || '',
            };
          }
        } catch (pagbankError: any) {
          console.warn('Erro ao buscar no PagBank (continuando):', pagbankError.message);
        }
      }
    }

    // Se não encontrou por chargeId, usar dados fornecidos diretamente
    if (!studentData) {
      // Se temos email e nome fornecidos diretamente, usar esses dados
      if (email && nome) {
        studentData = {
          email: email,
          nome: nome,
          chargeId: chargeId || `MANUAL_${Date.now()}`,
          referenceId: '',
        };
      } else if (email && chargeId) {
        // Se temos email e chargeId mas não encontramos no banco, usar os dados fornecidos
        studentData = {
          email: email,
          nome: nome || 'Participante',
          chargeId: chargeId,
          referenceId: '',
        };
      }
    }

    if (!studentData) {
      return NextResponse.json(
        { 
          error: 'Aluno não encontrado',
          details: chargeId 
            ? `Nenhum registro encontrado para chargeId: ${chargeId}. Forneça também email e nome para enviar os e-mails.`
            : 'Nenhum registro encontrado. Forneça email e nome para enviar os e-mails.',
          suggestion: 'Forneça: { "chargeId": "...", "email": "...", "nome": "..." }'
        },
        { status: 404 }
      );
    }

    // Enviar e-mails retroativos
    console.log(`🔄 Iniciando disparo retroativo de e-mails para ${studentData.email}...`);
    const result = await sendRetroactiveEmails(studentData);

    // Atualizar status de email no Supabase se o email imediato foi enviado
    if (result.emailsSent.immediate && studentData.chargeId) {
      try {
        await updateEmailStatus(studentData.chargeId, true);
      } catch (emailStatusError: any) {
        console.warn('⚠️ Erro ao atualizar status de email no Supabase (não crítico):', emailStatusError);
      }
    }

    // Preparar resposta
    const response: any = {
      success: result.success,
      email: studentData.email,
      nome: studentData.nome,
      chargeId: studentData.chargeId,
      emailsSent: result.emailsSent,
      details: {
        immediate: {
          sent: result.emailsSent.immediate,
          ...(result.results.immediate?.error && { error: result.results.immediate.error }),
        },
        oneDayBefore: {
          sent: result.emailsSent.oneDayBefore,
          ...(result.results.oneDayBefore?.error && { error: result.results.oneDayBefore.error }),
        },
        oneHourBefore: {
          sent: result.emailsSent.oneHourBefore,
          ...(result.results.oneHourBefore?.error && { error: result.results.oneHourBefore.error }),
        },
      },
    };

    if (result.error) {
      response.error = result.error;
    }

    return NextResponse.json(response, {
      status: result.success ? 200 : 500,
    });
  } catch (error: any) {
    console.error('Erro ao processar disparo retroativo:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Erro ao processar disparo retroativo',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// GET para consultar quais e-mails seriam enviados (sem enviar)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const chargeId = searchParams.get('charge_id') || searchParams.get('chargeId');
    const email = searchParams.get('email');

    if (!chargeId && !email) {
      return NextResponse.json(
        { error: 'charge_id ou email é obrigatório' },
        { status: 400 }
      );
    }

    let studentData: EmailCadenceData | null = null;

    if (chargeId) {
      // Buscar no Supabase
      const supabaseResult = await getWorkshopRegistration(chargeId);
      
      if (supabaseResult.success && supabaseResult.data) {
        const registration = supabaseResult.data;
        if (registration.email) {
          studentData = {
            email: registration.email,
            nome: registration.nome || 'Participante',
            chargeId: registration.charge_id,
            referenceId: registration.reference_id || '',
          };
        }
      }

      // Se não encontrou no Supabase, buscar no PagBank
      if (!studentData) {
        try {
          const payment = await getPaymentStatus(chargeId);
          const customerEmail = payment.customer?.email;
          const customerName = payment.customer?.name || 'Participante';

          if (customerEmail) {
            studentData = {
              email: customerEmail,
              nome: customerName,
              chargeId: chargeId,
              referenceId: payment.reference_id || '',
            };
          }
        } catch (pagbankError: any) {
          console.warn('Erro ao buscar no PagBank:', pagbankError.message);
        }
      }
    }

    if (!studentData) {
      return NextResponse.json(
        { 
          error: 'Aluno não encontrado',
          details: chargeId 
            ? `Nenhum registro encontrado para chargeId: ${chargeId}`
            : 'Nenhum registro encontrado para o email fornecido'
        },
        { status: 404 }
      );
    }

    // Calcular quais e-mails seriam enviados
    const now = new Date();
    const workshopDate = new Date('2025-11-26T13:00:00-03:00');
    const oneDayBefore = new Date(workshopDate);
    oneDayBefore.setDate(oneDayBefore.getDate() - 1);
    oneDayBefore.setHours(0, 0, 0, 0);
    
    const oneHourBefore = new Date(workshopDate);
    oneHourBefore.setHours(oneHourBefore.getHours() - 1);

    return NextResponse.json({
      found: true,
      email: studentData.email,
      nome: studentData.nome,
      chargeId: studentData.chargeId,
      wouldSend: {
        immediate: true, // Sempre enviar se não foi enviado
        oneDayBefore: now >= oneDayBefore,
        oneHourBefore: now >= oneHourBefore,
      },
      currentDate: now.toISOString(),
      workshopDate: workshopDate.toISOString(),
      oneDayBeforeDate: oneDayBefore.toISOString(),
      oneHourBeforeDate: oneHourBefore.toISOString(),
    });
  } catch (error: any) {
    console.error('Erro ao consultar disparo retroativo:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao consultar disparo retroativo' },
      { status: 500 }
    );
  }
}

