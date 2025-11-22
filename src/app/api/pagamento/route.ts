import { NextRequest, NextResponse } from 'next/server';
import { createPayment, createPixPayment, createCreditCardPayment } from '@/lib/pagbank';
import { upsertWorkshopRegistration } from '@/lib/supabase';

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

    // Salvar registro inicial no Supabase
    try {
      const amountInCents = Math.round(amount * 100); // Converter para centavos
      
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
        amount: amountInCents,
        amount_brl: amount,
        payment_method: type,
        installments: installments,
        description: description,
      };

      console.log('💾 Criando registro inicial no Supabase:', {
        charge_id: payment.id,
        reference_id: referenceId,
        email: customer?.email,
        amount: amount,
        payment_method: type,
      });

      const supabaseResult = await upsertWorkshopRegistration(registrationData);
      
      if (supabaseResult.success) {
        console.log('✅ Registro inicial criado no Supabase com sucesso:', {
          charge_id: payment.id,
          reference_id: referenceId,
          email: customer?.email,
          status: payment.status || 'PENDING',
        });
      } else {
        console.error('⚠️ Erro ao salvar no Supabase (não crítico - fluxo continua):', {
          charge_id: payment.id,
          error: supabaseResult.error,
        });
        // Não quebrar o fluxo se houver erro no Supabase
      }
    } catch (supabaseError: any) {
      console.error('⚠️ Erro inesperado ao salvar no Supabase (não crítico - fluxo continua):', {
        charge_id: payment.id,
        error: supabaseError?.message || supabaseError,
        stack: process.env.NODE_ENV === 'development' ? supabaseError?.stack : undefined,
      });
      // Não quebrar o fluxo se houver erro no Supabase
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


