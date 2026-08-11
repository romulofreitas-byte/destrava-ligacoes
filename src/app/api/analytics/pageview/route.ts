import { NextRequest, NextResponse } from 'next/server';
import { recordPageview, type DeviceType } from '@/lib/site-analytics';

export const dynamic = 'force-dynamic';

function detectDevice(ua: string): DeviceType {
  const value = ua.toLowerCase();
  if (/ipad|tablet/.test(value)) return 'tablet';
  if (/mobi|iphone|android/.test(value)) return 'mobile';
  if (ua) return 'desktop';
  return 'unknown';
}

export async function POST(request: NextRequest) {
  let body: {
    path?: string;
    referrer?: string;
    sessionId?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'JSON inválido' }, { status: 400 });
  }

  const result = await recordPageview({
    path: body.path || '',
    referrer: body.referrer,
    sessionId: body.sessionId,
    deviceType: detectDevice(request.headers.get('user-agent') || ''),
  });

  if (!result.success) {
    const status = result.error?.includes('não existe') ? 503 : 400;
    return NextResponse.json(result, { status });
  }

  return NextResponse.json({ success: true });
}
