import { NextRequest, NextResponse } from 'next/server';
import { requireCronAuth } from '@/lib/api-security';
import { enviarUltimaChamada } from '@/lib/corretores-ultima-chamada';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  const authError = requireCronAuth(request);
  if (authError) return authError;
  const dry = request.nextUrl.searchParams.get('dry') === '1';
  try {
    const result = await enviarUltimaChamada(dry);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error('[corretores-ultima-chamada]', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
