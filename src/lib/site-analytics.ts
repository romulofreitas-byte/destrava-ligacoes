import { supabase } from './supabase';

export type DeviceType = 'mobile' | 'desktop' | 'tablet' | 'unknown';

export type PageviewInput = {
  path: string;
  referrer?: string | null;
  sessionId?: string | null;
  deviceType?: DeviceType | null;
};

export type AccessReport = {
  rangeDays: number;
  since: string;
  until: string;
  totals: {
    pageviews: number;
    visitors: number;
  };
  daily: Array<{
    date: string;
    pageviews: number;
    visitors: number;
  }>;
  topPages: Array<{
    path: string;
    pageviews: number;
    visitors: number;
  }>;
  devices: Array<{
    deviceType: string;
    pageviews: number;
  }>;
  referrers: Array<{
    referrer: string;
    pageviews: number;
  }>;
  source: 'supabase' | 'unavailable';
  message?: string;
};

function normalizePath(path: string): string | null {
  if (!path || typeof path !== 'string') return null;
  const trimmed = path.trim();
  if (!trimmed.startsWith('/')) return null;
  if (trimmed.startsWith('/admin') || trimmed.startsWith('/api')) return null;
  if (trimmed.length > 300) return null;
  return trimmed.split('?')[0].split('#')[0] || '/';
}

export async function recordPageview(input: PageviewInput): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase não configurado' };
  }

  const path = normalizePath(input.path);
  if (!path) {
    return { success: false, error: 'Path inválido' };
  }

  const { error } = await supabase.from('site_pageviews').insert({
    path,
    referrer: input.referrer?.slice(0, 500) || null,
    session_id: input.sessionId?.slice(0, 80) || null,
    device_type: input.deviceType || 'unknown',
  });

  if (error) {
    if (error.code === '42P01' || error.message.includes('does not exist')) {
      return {
        success: false,
        error: 'Tabela site_pageviews não existe. Execute supabase-site-pageviews-schema.sql',
      };
    }
    return { success: false, error: error.message };
  }

  return { success: true };
}

function startOfDayISO(daysAgo: number): string {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d.toISOString();
}

function dateKey(iso: string): string {
  return iso.slice(0, 10);
}

export async function getAccessReport(rangeDays = 30): Promise<AccessReport> {
  const days = Math.min(Math.max(rangeDays, 1), 90);
  const since = startOfDayISO(days - 1);
  const until = new Date().toISOString();

  const empty: AccessReport = {
    rangeDays: days,
    since,
    until,
    totals: { pageviews: 0, visitors: 0 },
    daily: [],
    topPages: [],
    devices: [],
    referrers: [],
    source: 'unavailable',
  };

  if (!supabase) {
    return { ...empty, message: 'Supabase não configurado' };
  }

  const { data, error } = await supabase
    .from('site_pageviews')
    .select('path, referrer, session_id, device_type, created_at')
    .gte('created_at', since)
    .lte('created_at', until)
    .order('created_at', { ascending: true })
    .limit(20000);

  if (error) {
    if (error.code === '42P01' || error.message.includes('does not exist')) {
      return {
        ...empty,
        message: 'Tabela site_pageviews não existe. Execute supabase-site-pageviews-schema.sql no Supabase.',
      };
    }
    return { ...empty, message: error.message };
  }

  const rows = data || [];
  const visitorSet = new Set<string>();
  const dailyMap = new Map<string, { pageviews: number; visitors: Set<string> }>();
  const pageMap = new Map<string, { pageviews: number; visitors: Set<string> }>();
  const deviceMap = new Map<string, number>();
  const referrerMap = new Map<string, number>();

  for (let i = 0; i < days; i++) {
    const key = dateKey(startOfDayISO(days - 1 - i));
    dailyMap.set(key, { pageviews: 0, visitors: new Set() });
  }

  for (const row of rows) {
    const visitorKey = row.session_id || `anon-${row.created_at}-${row.path}`;
    visitorSet.add(visitorKey);

    const day = dateKey(row.created_at);
    const dayBucket = dailyMap.get(day) || { pageviews: 0, visitors: new Set<string>() };
    dayBucket.pageviews += 1;
    dayBucket.visitors.add(visitorKey);
    dailyMap.set(day, dayBucket);

    const pageBucket = pageMap.get(row.path) || { pageviews: 0, visitors: new Set<string>() };
    pageBucket.pageviews += 1;
    pageBucket.visitors.add(visitorKey);
    pageMap.set(row.path, pageBucket);

    const device = row.device_type || 'unknown';
    deviceMap.set(device, (deviceMap.get(device) || 0) + 1);

    let refLabel = 'Direto / desconhecido';
    if (row.referrer) {
      try {
        refLabel = new URL(row.referrer).hostname || row.referrer;
      } catch {
        refLabel = row.referrer.slice(0, 80);
      }
    }
    referrerMap.set(refLabel, (referrerMap.get(refLabel) || 0) + 1);
  }

  return {
    rangeDays: days,
    since,
    until,
    totals: {
      pageviews: rows.length,
      visitors: visitorSet.size,
    },
    daily: Array.from(dailyMap.entries()).map(([date, value]) => ({
      date,
      pageviews: value.pageviews,
      visitors: value.visitors.size,
    })),
    topPages: Array.from(pageMap.entries())
      .map(([path, value]) => ({
        path,
        pageviews: value.pageviews,
        visitors: value.visitors.size,
      }))
      .sort((a, b) => b.pageviews - a.pageviews)
      .slice(0, 15),
    devices: Array.from(deviceMap.entries())
      .map(([deviceType, pageviews]) => ({ deviceType, pageviews }))
      .sort((a, b) => b.pageviews - a.pageviews),
    referrers: Array.from(referrerMap.entries())
      .map(([referrer, pageviews]) => ({ referrer, pageviews }))
      .sort((a, b) => b.pageviews - a.pageviews)
      .slice(0, 10),
    source: 'supabase',
  };
}

type VercelTotals = {
  pageviews: number;
  visitors: number;
} | null;

export async function getVercelAccessTotals(rangeDays = 30): Promise<{
  configured: boolean;
  data: VercelTotals;
  error?: string;
}> {
  const token = process.env.VERCEL_TOKEN?.trim();
  const projectId = process.env.VERCEL_PROJECT_ID?.trim();
  const teamId = process.env.VERCEL_TEAM_ID?.trim();

  if (!token || !projectId) {
    return { configured: false, data: null };
  }

  const until = new Date();
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - (rangeDays - 1));
  since.setUTCHours(0, 0, 0, 0);

  const params = new URLSearchParams({
    projectId,
    since: since.toISOString(),
    until: until.toISOString(),
  });
  if (teamId) params.set('teamId', teamId);

  try {
    const response = await fetch(
      `https://api.vercel.com/v1/query/web-analytics/visits/count?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      const body = await response.text();
      return {
        configured: true,
        data: null,
        error: `Vercel API ${response.status}: ${body.slice(0, 200)}`,
      };
    }

    const json = await response.json();
    return {
      configured: true,
      data: {
        pageviews: Number(json?.data?.pageviews || 0),
        visitors: Number(json?.data?.visitors || 0),
      },
    };
  } catch (error: any) {
    return {
      configured: true,
      data: null,
      error: error?.message || 'Falha ao consultar Vercel Analytics',
    };
  }
}
