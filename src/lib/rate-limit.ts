import { NextRequest, NextResponse } from 'next/server';

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip') || 'unknown';
}

type RateBucket = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateBucket>();

/**
 * Simple in-memory rate limit (best-effort on serverless; still slows abuse).
 * Edge-compatible (no Node crypto).
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): NextResponse | null {
  const now = Date.now();
  const bucket = rateBuckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return NextResponse.json(
      { error: 'Muitas requisições. Tente novamente em breve.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((bucket.resetAt - now) / 1000)),
        },
      }
    );
  }

  return null;
}
