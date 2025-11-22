import { NextRequest, NextResponse } from 'next/server';

/**
 * Rota de callback para redirecionamento após pagamento
 * Esta rota recebe os parâmetros do PagBank e redireciona para a página de obrigado
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // Parâmetros que podem vir do PagBank
  const chargeId = searchParams.get('charge_id');
  const status = searchParams.get('status');
  const referenceId = searchParams.get('reference_id');
  
  // URL base do site
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002';
  
  // Construir URL de redirecionamento com parâmetros
  const redirectUrl = new URL('/workshop-destrava-ligacoes/obrigado', baseUrl);
  
  if (chargeId) {
    redirectUrl.searchParams.set('charge_id', chargeId);
  }
  if (status) {
    redirectUrl.searchParams.set('status', status);
  }
  if (referenceId) {
    redirectUrl.searchParams.set('reference_id', referenceId);
  }
  
  // Redirecionar para a página de obrigado
  return NextResponse.redirect(redirectUrl.toString());
}


