import { NextRequest, NextResponse } from 'next/server';
import { requireCronAuth } from '@/lib/api-security';
import { sendAulaLembretes } from '@/lib/aula-lembretes';

export const maxDuration = 60;

async function run() {
  const results = await sendAulaLembretes();
  return NextResponse.json({ ok: true, results });
}

export async function GET(request: NextRequest) {
  const authError = requireCronAuth(request);
  if (authError) return authError;
  try {
    return await run();
  } catch (error) {
    console.error('[aula-lembrete] cron falhou:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
