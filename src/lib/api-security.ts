import { NextRequest, NextResponse } from 'next/server';
import { createHash, timingSafeEqual, createHmac } from 'crypto';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { escapeHtml } from '@/lib/escape-html';

export { checkRateLimit, getClientIp, escapeHtml };

/** Admin / ops endpoints (email manual, guests, test, upsert). */
export function getAdminSecret(): string | undefined {
  return (
    process.env.ADMIN_API_SECRET?.trim() ||
    process.env.EMAIL_CRON_SECRET?.trim() ||
    undefined
  );
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function extractBearerToken(request: NextRequest): string | null {
  const header = request.headers.get('authorization');
  if (!header) return null;
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
}

/**
 * Requires Authorization: Bearer <ADMIN_API_SECRET|EMAIL_CRON_SECRET>.
 * Returns a 401/503 response when unauthorized or secret missing.
 */
export function requireAdminAuth(request: NextRequest): NextResponse | null {
  const expected = getAdminSecret();
  if (!expected) {
    return NextResponse.json(
      {
        error: 'Endpoint bloqueado',
        message:
          'Configure ADMIN_API_SECRET (ou EMAIL_CRON_SECRET) no ambiente do servidor.',
      },
      { status: 503 }
    );
  }

  const token = extractBearerToken(request);
  if (!token || !safeEqual(token, expected)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  return null;
}

/** Cron: requires EMAIL_CRON_SECRET or ADMIN_API_SECRET (never optional). */
export function requireCronAuth(request: NextRequest): NextResponse | null {
  const expected =
    process.env.EMAIL_CRON_SECRET?.trim() ||
    process.env.ADMIN_API_SECRET?.trim();

  const cronSecret = process.env.CRON_SECRET?.trim();
  const token = extractBearerToken(request);

  if (!expected && !cronSecret) {
    return NextResponse.json(
      {
        error: 'Endpoint bloqueado',
        message: 'Configure EMAIL_CRON_SECRET no ambiente do servidor.',
      },
      { status: 503 }
    );
  }

  if (token && expected && safeEqual(token, expected)) return null;
  if (token && cronSecret && safeEqual(token, cronSecret)) return null;

  return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
}

export function hashChargeId(chargeId: string): string {
  return createHash('sha256').update(chargeId).digest('hex').slice(0, 16);
}

/** PagBank webhook optional shared secret (header x-pagbank-token or Authorization). */
export function requirePagBankWebhookAuth(
  request: NextRequest
): NextResponse | null {
  const expected = process.env.PAGBANK_WEBHOOK_SECRET?.trim();
  if (!expected) {
    return null;
  }

  const headerToken =
    request.headers.get('x-pagbank-token') ||
    extractBearerToken(request) ||
    '';

  if (!headerToken || !safeEqual(headerToken, expected)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }
  return null;
}

/** Efí webhook HMAC (hex) of raw body with EFI_WEBHOOK_SECRET. */
export function verifyEfiWebhookHmac(
  rawBody: string,
  signature: string | null | undefined
): boolean {
  const secret = process.env.EFI_WEBHOOK_SECRET?.trim();
  if (!secret) {
    return process.env.NODE_ENV !== 'production';
  }
  if (!signature) return false;

  const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
  const provided = signature.replace(/^sha256=/i, '');
  try {
    return safeEqual(provided, expected);
  } catch {
    return false;
  }
}

