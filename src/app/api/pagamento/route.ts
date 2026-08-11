import { NextRequest, NextResponse } from 'next/server';
import { createPayment, createPixPayment } from '@/lib/pagbank';
import { upsertWorkshopRegistration } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/api-security';
import { WORKSHOP_PRICING } from '@/lib/constants';

/**
 * Criação de cobrança PagBank.
 * Checkout público usa link hospedado (WORKSHOP_CHECKOUT_URL).
 * Esta API exige admin e ignora amount/notificationUrl do client.
 */
export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { type, description, referenceId, customer } = body;

    if (!type || !description || !referenceId) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: type, description, referenceId' },
        { status: 400 }
      );
    }

    if (type === 'CREDIT_CARD') {
      return NextResponse.json(
        {
          error:
            'Pagamento com cartão via API desabilitado. Use o checkout hospedado PagBank.',
        },
        { status: 403 }
      );
    }

    if (type !== 'PIX') {
      return NextResponse.json(
        { error: 'Tipo de pagamento não suportado. Use: PIX' },
        { status: 400 }
      );
    }

    const amount = WORKSHOP_PRICING.amountBRL;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const webhookUrl = `${baseUrl}/api/pagamento/webhook`;

    const paymentRequest = createPixPayment(
      referenceId,
      description,
      amount,
      webhookUrl,
      undefined,
      customer
    );

    const payment = await createPayment(paymentRequest);

    try {
      const registrationData = {
        charge_id: payment.id,
        reference_id: referenceId,
        nome: customer?.name,
        email: customer?.email,
        tax_id: customer?.tax_id,
        telefone_country: customer?.phone?.country,
        telefone_area: customer?.phone?.area,
        telefone_number: customer?.phone?.number,
        status: payment.status || 'PENDING',
        amount: WORKSHOP_PRICING.amountCents,
        amount_brl: amount,
        payment_method: type,
        description,
      };

      await upsertWorkshopRegistration(registrationData);
    } catch (supabaseError: any) {
      console.error('⚠️ Erro ao salvar no Supabase:', supabaseError?.message);
    }

    return NextResponse.json({
      success: true,
      payment,
    });
  } catch (error: any) {
    console.error('Erro ao processar pagamento:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
}
