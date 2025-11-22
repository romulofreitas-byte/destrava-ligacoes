import { NextRequest, NextResponse } from 'next/server';
import { createPayment, createPixPayment, createCreditCardPayment } from '@/lib/pagbank';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, amount, description, referenceId, cardData, installments, notificationUrl, customer } = body;

    // Validações básicas
    if (!type || !amount || !description || !referenceId) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: type, amount, description, referenceId' },
        { status: 400 }
      );
    }

    // Validação: email do cliente é obrigatório para envio de emails
    if (!customer?.email) {
      console.warn('⚠️ ATENÇÃO: Email do cliente não fornecido. O email de confirmação pode não ser enviado.');
    }

    // Montar URL de notificação
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002';
    const webhookUrl = notificationUrl || `${baseUrl}/api/pagamento/webhook`;

    let paymentRequest;

    if (type === 'PIX') {
      paymentRequest = createPixPayment(
        referenceId,
        description,
        amount,
        webhookUrl,
        undefined, // callbackUrl (opcional)
        customer // Passar dados do cliente
      );
    } else if (type === 'CREDIT_CARD') {
      if (!cardData || !installments) {
        return NextResponse.json(
          { error: 'Para pagamento com cartão, são necessários: cardData e installments' },
          { status: 400 }
        );
      }
      paymentRequest = createCreditCardPayment(
        referenceId,
        description,
        amount,
        installments,
        cardData,
        webhookUrl,
        undefined, // callbackUrl (opcional)
        customer // Passar dados do cliente
      );
    } else {
      return NextResponse.json(
        { error: 'Tipo de pagamento não suportado. Use: PIX ou CREDIT_CARD' },
        { status: 400 }
      );
    }

    const payment = await createPayment(paymentRequest);

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


