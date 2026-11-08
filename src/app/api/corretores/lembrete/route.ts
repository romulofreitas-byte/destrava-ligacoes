import { NextRequest, NextResponse } from 'next/server';
import { requireCronAuth } from '@/lib/api-security';
import { enviarLembretesDoMeioDia } from '@/lib/corretores-compra';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const authError = requireCronAuth(request);
  if (authError) return authError;
  try {
    const result = await enviarLembretesDoMeioDia(new Date());
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error('[corretores-lembrete]', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
