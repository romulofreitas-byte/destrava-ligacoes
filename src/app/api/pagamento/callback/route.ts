import { NextRequest, NextResponse } from 'next/server';

/**
 * Rota de callback desativada
 * O checkout agora é gerenciado pela plataforma Mundo Pódium
 * Esta rota retorna 404 para indicar que não está mais em uso
 */
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Esta rota não está mais em uso. O checkout é gerenciado pela plataforma Mundo Pódium.',
      redirect: 'https://plataforma.mundopodium.com.br/checkout/workshop-destrava-ligacoes'
    },
    { status: 404 }
  );
}
