import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-session';
import { getAccessReport, getVercelAccessTotals } from '@/lib/site-analytics';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ success: false, error: 'Não autorizado' }, { status: 401 });
  }

  const rangeParam = Number(request.nextUrl.searchParams.get('days') || '30');
  const days = Number.isFinite(rangeParam) ? rangeParam : 30;

  const [report, vercel] = await Promise.all([
    getAccessReport(days),
    getVercelAccessTotals(days),
  ]);

  return NextResponse.json({
    success: true,
    report,
    vercel,
    external: {
      clarityUrl: 'https://clarity.microsoft.com/projects/view/ua737ghoeb/',
      vercelAnalyticsHint:
        'Vercel Dashboard → Project → Analytics (números oficiais do Web Analytics)',
    },
  });
}
