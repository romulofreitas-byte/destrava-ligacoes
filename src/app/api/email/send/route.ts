import { NextRequest, NextResponse } from 'next/server';
import { sendImmediateEmail, sendOneDayBeforeEmail, sendDayOfEmail, getEmailRecord } from '@/lib/email-cadence';
import { getPaymentStatus } from '@/lib/pagbank';
import { updateEmailStatus } from '@/lib/supabase';
import {
  checkRateLimit,
  getClientIp,
  requireAdminAuth,
  hashChargeId,
} from '@/lib/api-security';

/**
 * Envia e-mail de confirmação após pagamento.
 * Público apenas com chargeId de cobrança PAID (fluxo /obrigado).
 * Rate-limited por IP + charge.
 */
export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limited = checkRateLimit(`email-send:${ip}`, 10, 60_000);
  if (limited) return limited;

  try {
    const body = await request.json();
    const { chargeId, type } = body;

    if (!chargeId) {
      return NextResponse.json(
        { error: 'chargeId é obrigatório' },
        { status: 400 }
      );
    }

    const chargeLimited = checkRateLimit(
      `email-send-charge:${hashChargeId(chargeId)}`,
      3,
      300_000
    );
    if (chargeLimited) return chargeLimited;

    const payment = await getPaymentStatus(chargeId);

    if (payment.status !== 'PAID') {
      return NextResponse.json(
        { error: 'Pagamento não confirmado' },
        { status: 403 }
      );
    }

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
          {
            error:
              'Tipo de email inválido. Use: immediate, oneDayBefore, dayOf ou oneHourBefore',
          },
          { status: 400 }
        );
    }

    if (result.success) {
      try {
        await updateEmailStatus(chargeId, true);
      } catch (supabaseError: any) {
        console.warn(
          '⚠️ Erro ao atualizar status de email no Supabase:',
          supabaseError?.message
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Email enviado com sucesso',
        type,
      });
    }

    return NextResponse.json(
      { error: result.error || 'Erro ao enviar email' },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao enviar email' },
      { status: 500 }
    );
  }
}

/** Consulta status de e-mails — admin only (expõe PII). */
export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

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
