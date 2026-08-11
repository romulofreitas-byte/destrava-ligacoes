import { NextRequest, NextResponse } from 'next/server';
import {
  createAdminSessionToken,
  getAdminCookieOptions,
  isAdminPasswordConfigured,
  verifyAdminPassword,
  ADMIN_COOKIE,
} from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error: 'ADMIN_PASSWORD não configurada. Defina no .env.local (mín. 8 caracteres).',
      },
      { status: 503 }
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'JSON inválido' }, { status: 400 });
  }

  const password = body.password || '';
  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ success: false, error: 'Senha incorreta' }, { status: 401 });
  }

  const token = await createAdminSessionToken();
  if (!token) {
    return NextResponse.json({ success: false, error: 'Não foi possível criar sessão' }, { status: 500 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, token, getAdminCookieOptions());
  return response;
}
