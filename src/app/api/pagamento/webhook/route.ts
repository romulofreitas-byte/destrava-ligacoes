import { NextRequest, NextResponse } from 'next/server';
import { getPaymentStatus } from '@/lib/pagbank';
import { upsertWDL3Registration } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    console.log('🔔 ===== WEBHOOK RECEBIDO =====');
    console.log('⏰ Timestamp:', new Date().toISOString());
    
    const body = await request.json();
    console.log('📦 Body recebido:', JSON.stringify(body, null, 2));
    
    // PagBank envia notificações com charge_id
    const { charge_id } = body;

    if (!charge_id) {
      console.error('❌ charge_id não fornecido no body');
      return NextResponse.json(
        { error: 'charge_id não fornecido' },
        { status: 400 }
      );
    }

    console.log('🔍 Consultando status do pagamento para charge_id:', charge_id);
    
    // Consultar status do pagamento
    const payment = await getPaymentStatus(charge_id);
    console.log('✅ Status do pagamento obtido:', {
      status: payment.status,
      has_customer: !!payment.customer,
      customer_email: payment.customer?.email || 'N/A',
      customer_name: payment.customer?.name || 'N/A',
    });

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

      console.log('💾 Salvando/atualizando registro WDL3 no Supabase:', {
        charge_id,
        status: payment.status,
        has_customer: !!payment.customer,
        has_email: !!payment.customer?.email,
      });

      const supabaseResult = await upsertWDL3Registration(registrationData);
      
      if (supabaseResult.success) {
        console.log('✅ Registro WDL3 atualizado no Supabase com sucesso:', {
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
      // Pagamento confirmado - apenas registrar no Supabase (emails serão enviados pela plataforma Mundo Pódium)
      console.log('✅ Pagamento confirmado e registrado no Supabase:', {
        charge_id,
        reference_id: payment.reference_id,
        customer_email: payment.customer?.email,
        customer_name: payment.customer?.name,
      });
      console.log('ℹ️ Email de confirmação será enviado pela plataforma Mundo Pódium');
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

