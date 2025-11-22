import { NextRequest, NextResponse } from 'next/server';
import { getPaymentStatus } from '@/lib/pagbank';
import { sendImmediateEmail } from '@/lib/email-cadence';

/**
 * Rota para testar envio de email após pagamento
 * 
 * Pode ser usado de duas formas:
 * 1. Com chargeId real: GET /api/pagamento/test-email?charge_id=CHARGE_ID
 * 2. Com dados de teste: POST /api/pagamento/test-email com { email, nome, chargeId?, referenceId? }
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const chargeId = searchParams.get('charge_id');

    if (!chargeId) {
      return NextResponse.json(
        { 
          error: 'charge_id é obrigatório',
          usage: 'Use: /api/pagamento/test-email?charge_id=CHARGE_ID'
        },
        { status: 400 }
      );
    }

    // Buscar dados do pagamento no PagBank
    let payment;
    try {
      payment = await getPaymentStatus(chargeId);
    } catch (error: any) {
      return NextResponse.json(
        { 
          error: 'Erro ao consultar pagamento no PagBank',
          details: error.message,
          suggestion: 'Verifique se o charge_id é válido e se PAGBANK_TOKEN está configurado'
        },
        { status: 400 }
      );
    }

    const customerEmail = payment.customer?.email;
    const customerName = payment.customer?.name || 'Participante';

    if (!customerEmail) {
      return NextResponse.json(
        { 
          error: 'Email do cliente não encontrado no pagamento',
          payment_data: {
            charge_id: chargeId,
            reference_id: payment.reference_id,
            status: payment.status,
            has_customer: !!payment.customer,
          }
        },
        { status: 400 }
      );
    }

    // Enviar email de teste
    console.log(`🧪 TESTE: Enviando email para ${customerEmail} (charge_id: ${chargeId})...`);
    
    const emailResult = await sendImmediateEmail({
      email: customerEmail,
      nome: customerName,
      chargeId: chargeId,
      referenceId: payment.reference_id,
    });

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        message: `✅ Email de teste enviado com sucesso!`,
        details: {
          email: customerEmail,
          nome: customerName,
          charge_id: chargeId,
          reference_id: payment.reference_id,
          payment_status: payment.status,
        },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: emailResult.error || 'Erro ao enviar email',
          details: {
            email: customerEmail,
            charge_id: chargeId,
          },
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Erro ao testar envio de email:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Erro ao testar envio de email',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * POST para testar com dados customizados (sem precisar de chargeId real)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, nome, chargeId, referenceId } = body;

    if (!email) {
      return NextResponse.json(
        { 
          error: 'email é obrigatório',
          usage: {
            email: 'Email do destinatário',
            nome: 'Nome do participante (opcional)',
            chargeId: 'ID do pagamento para teste (opcional)',
            referenceId: 'ID de referência para teste (opcional)',
          }
        },
        { status: 400 }
      );
    }

    const testChargeId = chargeId || `TEST_${Date.now()}`;
    const testReferenceId = referenceId || `REF_${Date.now()}`;
    const testNome = nome || email.split('@')[0];

    console.log(`🧪 TESTE: Enviando email de teste para ${email}...`);
    
    const emailResult = await sendImmediateEmail({
      email,
      nome: testNome,
      chargeId: testChargeId,
      referenceId: testReferenceId,
    });

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        message: `✅ Email de teste enviado com sucesso!`,
        details: {
          email,
          nome: testNome,
          charge_id: testChargeId,
          reference_id: testReferenceId,
          note: 'Este é um teste - os IDs são fictícios',
        },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: emailResult.error || 'Erro ao enviar email',
          details: {
            email,
            charge_id: testChargeId,
          },
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Erro ao testar envio de email:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Erro ao testar envio de email',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}


