import { NextRequest, NextResponse } from 'next/server';
import { getPaymentStatus } from '@/lib/pagbank';
import { sendImmediateEmail } from '@/lib/email-cadence';
import { upsertWorkshopRegistration, updateEmailStatus } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // PagBank envia notificações com charge_id
    const { charge_id } = body;

    if (!charge_id) {
      return NextResponse.json(
        { error: 'charge_id não fornecido' },
        { status: 400 }
      );
    }

    // Consultar status do pagamento
    const payment = await getPaymentStatus(charge_id);

    // Processar status do pagamento
    // Aqui você pode salvar no banco de dados, enviar emails, etc.
    console.log('Webhook recebido:', {
      charge_id,
      status: payment.status,
      reference_id: payment.reference_id,
      customer: payment.customer,
    });

    // Salvar/atualizar registro no Supabase
    try {
      // Extrair dados do pagamento
      // Nota: A resposta do getPaymentStatus pode não incluir todos os campos (amount, payment_method)
      // Esses campos serão atualizados quando disponíveis ou mantidos do registro inicial
      const registrationData = {
        charge_id: charge_id,
        reference_id: payment.reference_id,
        nome: payment.customer?.name,
        email: payment.customer?.email,
        tax_id: payment.customer?.tax_id,
        telefone_country: payment.customer?.phone?.country,
        telefone_area: payment.customer?.phone?.area,
        telefone_number: payment.customer?.phone?.number,
        status: payment.status,
        paid_at: payment.status === 'PAID' ? new Date().toISOString() : undefined,
      };

      console.log('💾 Salvando/atualizando registro no Supabase:', {
        charge_id,
        status: payment.status,
        has_customer: !!payment.customer,
        has_email: !!payment.customer?.email,
      });

      const supabaseResult = await upsertWorkshopRegistration(registrationData);
      
      if (supabaseResult.success) {
        console.log('✅ Registro atualizado no Supabase com sucesso:', {
          charge_id,
          status: payment.status,
          email: payment.customer?.email,
        });
      } else {
        console.error('⚠️ Erro ao salvar no Supabase (não crítico - fluxo continua):', {
          charge_id,
          error: supabaseResult.error,
        });
        // Não quebrar o fluxo se houver erro no Supabase
      }
    } catch (supabaseError: any) {
      console.error('⚠️ Erro inesperado ao salvar no Supabase (não crítico - fluxo continua):', {
        charge_id,
        error: supabaseError?.message || supabaseError,
        stack: process.env.NODE_ENV === 'development' ? supabaseError?.stack : undefined,
      });
      // Não quebrar o fluxo se houver erro no Supabase
    }

    // Processar diferentes status
    if (payment.status === 'PAID') {
      // Pagamento confirmado - fazer ações necessárias
      console.log('✅ Pagamento confirmado:', {
        charge_id,
        reference_id: payment.reference_id,
        customer_email: payment.customer?.email,
        customer_name: payment.customer?.name,
      });
      
      // Obter email e nome do cliente
      const customerEmail = payment.customer?.email;
      const customerName = payment.customer?.name || 'Participante';
      
      if (customerEmail) {
        // Disparar email imediato
        try {
          console.log(`📧 Tentando enviar email para ${customerEmail}...`);
          const emailResult = await sendImmediateEmail({
            email: customerEmail,
            nome: customerName,
            chargeId: charge_id,
            referenceId: payment.reference_id,
          });
          
          if (emailResult.success) {
            console.log(`✅ Email enviado com sucesso para ${customerEmail} (charge_id: ${charge_id})`);
            
            // Atualizar status de email no Supabase
            try {
              await updateEmailStatus(charge_id, true);
            } catch (emailStatusError: any) {
              console.error('⚠️ Erro ao atualizar status de email no Supabase (não crítico):', emailStatusError);
            }
          } else {
            console.error(`❌ Erro ao enviar email para ${customerEmail}:`, emailResult.error);
            // Log detalhado para debugging
            console.error('Detalhes do erro:', {
              charge_id,
              reference_id: payment.reference_id,
              customer_email: customerEmail,
              error: emailResult.error,
            });
          }
        } catch (emailError: any) {
          console.error('❌ Erro ao enviar email (exceção):', emailError);
          console.error('Stack trace:', emailError.stack);
        }
      } else {
        console.warn('⚠️ ATENÇÃO: Email do cliente não encontrado na resposta do PagBank');
        console.warn('Dados do pagamento recebido:', {
          charge_id,
          reference_id: payment.reference_id,
          has_customer: !!payment.customer,
          customer_keys: payment.customer ? Object.keys(payment.customer) : [],
        });
        console.warn('⚠️ O email de confirmação NÃO será enviado automaticamente.');
        console.warn('⚠️ O cliente precisará receber o email através do fallback na página de obrigado.');
      }
    } else if (payment.status === 'CANCELLED' || payment.status === 'DECLINED') {
      // Pagamento cancelado ou recusado
      console.log('ℹ️ Pagamento cancelado/recusado:', {
        charge_id,
        reference_id: payment.reference_id,
        status: payment.status,
      });
    } else {
      console.log('ℹ️ Status de pagamento recebido:', {
        charge_id,
        reference_id: payment.reference_id,
        status: payment.status,
      });
    }

    return NextResponse.json({ 
      received: true,
      status: payment.status,
      charge_id: charge_id,
      reference_id: payment.reference_id
    });
  } catch (error: any) {
    console.error('Erro ao processar webhook:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}

// GET para verificar status (útil para testes)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const chargeId = searchParams.get('charge_id');

  if (!chargeId) {
    return NextResponse.json(
      { error: 'charge_id é obrigatório' },
      { status: 400 }
    );
  }

  try {
    const payment = await getPaymentStatus(chargeId);
    return NextResponse.json({ payment });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erro ao consultar pagamento' },
      { status: 500 }
    );
  }
}

