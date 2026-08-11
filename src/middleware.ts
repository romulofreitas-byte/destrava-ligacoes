import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

/**
 * Edge rate limit for /api/* — slows automated abuse.
 * Admin/webhook auth still enforced inside route handlers.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const isWebhook =
    pathname.includes('/webhook') || pathname.includes('/efi-webhook');
  const limit = isWebhook ? 120 : 40;
  const windowMs = 60_000;
  const ip = getClientIp(request);
  const limited = checkRateLimit(`mw:${pathname}:${ip}`, limit, windowMs);

  if (limited) return limited;
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
