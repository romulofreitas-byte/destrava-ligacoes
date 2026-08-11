import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, getAdminCookieOptions } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, '', { ...getAdminCookieOptions(0), maxAge: 0 });
  return response;
}
