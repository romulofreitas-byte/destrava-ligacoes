import { NextRequest, NextResponse } from 'next/server';
import { sendImmediateEmail, sendOneDayBeforeEmail, sendDayOfEmail, getEmailRecord } from '@/lib/email-cadence';
import { getPaymentStatus } from '@/lib/pagbank';
import { updateEmailStatus } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { chargeId, type } = body;

    if (!chargeId) {
      return NextResponse.json(
        { error: 'chargeId é obrigatório' },
        { status: 400 }
      );
    }

    // Buscar dados do pagamento no PagBank
    const payment = await getPaymentStatus(chargeId);
    
    const customerEmail = payment.customer?.email;
    const customerName = payment.customer?.name || 'Participante';

    if (!customerEmail) {
      return NextResponse.json(
        { error: 'Email do cliente não encontrado' },
        { status: 400 }
      );
    }

    const emailData = {
      email: customerEmail,
      nome: customerName,
      chargeId: chargeId,
      referenceId: payment.reference_id,
    };

    let result;
    
    switch (type) {
      case 'immediate':
        result = await sendImmediateEmail(emailData);
        break;
      case 'oneDayBefore':
        result = await sendOneDayBeforeEmail(emailData);
        break;
      case 'dayOf':
      case 'oneHourBefore':
        result = await sendDayOfEmail(emailData);
        break;
      default:
        return NextResponse.json(
          { error: 'Tipo de email inválido. Use: immediate, oneDayBefore, dayOf ou oneHourBefore' },
          { status: 400 }
        );
    }

    if (result.success) {
      // Atualizar Supabase após envio bem-sucedido
      try {
        await updateEmailStatus(chargeId, true);
      } catch (supabaseError: any) {
        console.warn('⚠️ Erro ao atualizar status de email no Supabase (não crítico):', supabaseError?.message);
        // Não falhar a requisição se o Supabase falhar
      }
      
      return NextResponse.json({ 
        success: true,
        message: 'Email enviado com sucesso',
        type,
      });
    } else {
      return NextResponse.json(
        { error: result.error || 'Erro ao enviar email' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao enviar email' },
      { status: 500 }
    );
  }
}

// GET para consultar status de emails enviados
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const chargeId = searchParams.get('charge_id');

    if (!chargeId) {
      return NextResponse.json(
        { error: 'charge_id é obrigatório' },
        { status: 400 }
      );
    }

    const record = getEmailRecord(chargeId);

    if (!record) {
      return NextResponse.json({
        found: false,
        message: 'Nenhum registro encontrado para este charge_id',
      });
    }

    return NextResponse.json({
      found: true,
      email: record.email,
      chargeId: record.chargeId,
      referenceId: record.referenceId,
      emailsSent: record.emailsSent,
      sentAt: record.sentAt,
    });
  } catch (error: any) {
    console.error('Erro ao consultar status:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao consultar status' },
      { status: 500 }
    );
  }
}

