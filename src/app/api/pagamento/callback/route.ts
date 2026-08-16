import { NextRequest, NextResponse } from 'next/server';
import { WORKSHOP_PUBLIC_SITE_URL, WORKSHOP_SUCCESS_PATH } from '@/lib/constants';

/**
 * Normaliza o retorno do Asaas (e provedores antigos) e envia o aluno
 * para a página de obrigado, onde o Meta Pixel dispara Purchase.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || WORKSHOP_PUBLIC_SITE_URL;

  const redirectUrl = new URL(WORKSHOP_SUCCESS_PATH, baseUrl);

  const chargeId =
    searchParams.get('charge_id') ||
    searchParams.get('paymentId') ||
    searchParams.get('id');
  const status = searchParams.get('status') || 'PAID';
  const referenceId =
    searchParams.get('reference_id') ||
    searchParams.get('externalReference');
  const source = searchParams.get('source') || 'asaas';

  if (chargeId) {
    redirectUrl.searchParams.set('charge_id', chargeId);
  }
  redirectUrl.searchParams.set('status', status);
  if (referenceId) {
    redirectUrl.searchParams.set('reference_id', referenceId);
  }
  redirectUrl.searchParams.set('source', source);

  return NextResponse.redirect(redirectUrl.toString());
}
