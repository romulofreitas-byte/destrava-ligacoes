import { NextRequest, NextResponse } from 'next/server';
import { getPaymentStatus } from '@/lib/pagbank';

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
    return NextResponse.json({ success: true, payment });
  } catch (error: any) {
    console.error('Erro ao consultar status:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao consultar status do pagamento' },
      { status: 500 }
    );
  }
}


