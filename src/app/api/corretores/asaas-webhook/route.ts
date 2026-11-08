import { NextRequest, NextResponse } from 'next/server';
import { safeEqualToken } from '@/lib/corretores-asaas';
import {
  customerIdOf,
  emailNoPagamento,
  isPaidEvent,
  nomeNoPagamento,
  pareceDestaEdicao,
  registrarEEnviarConfirmacao,
  type AsaasNotice,
} from '@/lib/corretores-compra';

export const dynamic = 'force-dynamic';

async function asaasGet(path: string): Promise<Record<string, unknown> | null> {
  const key = process.env.ASAAS_API_KEY?.trim();
  if (!key) return null;
  const base = process.env.ASAAS_API_BASE?.trim() || 'https://api.asaas.com/v3';
  const res = await fetch(`${base}${path}`, { headers: { access_token: key } });
  if (!res.ok) return null;
  return (await res.json()) as Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  const expected = process.env.ASAAS_WEBHOOK_TOKEN?.trim();
  if (!expected) {
    return NextResponse.json({ ok: false, error: 'ASAAS_WEBHOOK_TOKEN ausente' }, { status: 503 });
  }
  const token = request.headers.get('asaas-access-token') || '';
  if (!safeEqualToken(token, expected)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as AsaasNotice | null;
  if (!body?.payment?.id || !isPaidEvent(body.event)) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const payment = body.payment;
  let linkUrl: string | null = null;
  if (payment.paymentLink && process.env.ASAAS_API_KEY?.trim()) {
    const link = await asaasGet(`/paymentLinks/${payment.paymentLink}`);
    linkUrl = typeof link?.url === 'string' ? link.url : null;
  }
  if (!pareceDestaEdicao(payment, linkUrl)) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  let email = emailNoPagamento(payment);
  let nome = nomeNoPagamento(payment) || 'oi';
  const customerId = customerIdOf(payment);
  if (!email && customerId) {
    const customer = await asaasGet(`/customers/${customerId}`);
    if (typeof customer?.email === 'string' && customer.email.includes('@')) {
      email = customer.email.trim();
    }
    if (typeof customer?.name === 'string' && customer.name.trim()) {
      nome = customer.name.trim();
    }
  }
  if (!email) {
    return NextResponse.json({ ok: false, error: 'pagamento sem e-mail' }, { status: 503 });
  }

  const result = await registrarEEnviarConfirmacao({
    paymentId: payment.id,
    email,
    nome,
    valor: typeof payment.value === 'number' ? payment.value : undefined,
    billingType: payment.billingType,
  });
  if (!result.sent && result.skipped && result.skipped !== 'já enviado') {
    return NextResponse.json({ ok: false, error: result.skipped }, { status: 502 });
  }
  return NextResponse.json({ ok: true, sent: result.sent });
}
