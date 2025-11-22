import { NextRequest, NextResponse } from 'next/server';
import { sendWorkshopEmailManual, sendOneDayBeforeEmailManual, sendOneHourBeforeEmailManual } from '@/lib/email-cadence';

// Endpoint para enviar manualmente emails do workshop
// Aceita type: 'payment' (padrão), 'oneDayBefore' ou 'oneHourBefore'
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, nome, type = 'payment' } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'email é obrigatório' },
        { status: 400 }
      );
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    let result;
    let messageType;

    switch (type) {
      case 'payment':
      case 'immediate':
        result = await sendWorkshopEmailManual(email, nome);
        messageType = 'pagamento';
        break;
      case 'oneDayBefore':
        result = await sendOneDayBeforeEmailManual(email, nome);
        messageType = 'lembrete de 1 dia antes';
        break;
      case 'oneHourBefore':
        result = await sendOneHourBeforeEmailManual(email, nome);
        messageType = 'lembrete de 1 hora antes';
        break;
      default:
        return NextResponse.json(
          { error: 'Tipo de email inválido. Use: payment, immediate, oneDayBefore ou oneHourBefore' },
          { status: 400 }
        );
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Email de ${messageType} enviado com sucesso para ${email}`,
        messageId: result.messageId,
        type: messageType,
      });
    } else {
      return NextResponse.json(
        { 
          success: false,
          error: result.error || 'Erro ao enviar email' 
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Erro ao enviar email manual:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao enviar email' },
      { status: 500 }
    );
  }
}

