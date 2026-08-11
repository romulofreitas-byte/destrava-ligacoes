'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  ExternalLink,
  LogOut,
  MonitorSmartphone,
  RefreshCw,
  TrendingUp,
  Users,
  Eye,
} from 'lucide-react';

type AccessReport = {
  rangeDays: number;
  since: string;
  until: string;
  totals: { pageviews: number; visitors: number };
  daily: Array<{ date: string; pageviews: number; visitors: number }>;
  topPages: Array<{ path: string; pageviews: number; visitors: number }>;
  devices: Array<{ deviceType: string; pageviews: number }>;
  referrers: Array<{ referrer: string; pageviews: number }>;
  source: 'supabase' | 'unavailable';
  message?: string;
};

type AcessosResponse = {
  success: boolean;
  error?: string;
  report?: AccessReport;
  vercel?: {
    configured: boolean;
    data: { pageviews: number; visitors: number } | null;
    error?: string;
  };
  external?: {
    clarityUrl: string;
    vercelAnalyticsHint: string;
  };
};

function formatNumber(value: number) {
  return new Intl.NumberFormat('pt-BR').format(value);
}

function formatDateLabel(isoDate: string) {
  const [, month, day] = isoDate.split('-');
  return `${day}/${month}`;
}

export default function AdminAcessosPage() {
  const router = useRouter();
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [payload, setPayload] = useState<AcessosResponse | null>(null);

  const load = useCallback(async (range: number) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/acessos?days=${range}`, {
        cache: 'no-store',
      });

      if (response.status === 401) {
        router.replace(`/admin/login?next=${encodeURIComponent('/admin/acessos')}`);
        return;
      }

      const data: AcessosResponse = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || 'Falha ao carregar relatório');
        setPayload(null);
        return;
      }

      setPayload(data);
    } catch {
      setError('Erro de conexão ao carregar acessos');
      setPayload(null);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void load(days);
  }, [days, load]);

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
  }

  const report = payload?.report;
  const maxDaily = useMemo(() => {
    if (!report?.daily?.length) return 1;
    return Math.max(...report.daily.map((d) => d.pageviews), 1);
  }, [report]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-yellow-400">Admin</p>
          <h1 className="mt-1 font-heading text-3xl text-white sm:text-4xl">Acessos ao site</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-400">
            Relatório interno de pageviews (com consentimento de analytics). Use Clarity e Vercel
            Analytics para visão complementar.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[7, 30, 90].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setDays(value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                days === value
                  ? 'bg-yellow-400 text-gray-900'
                  : 'border border-gray-600 text-gray-300 hover:border-yellow-400/60'
              }`}
            >
              {value}d
            </button>
          ))}
          <button
            type="button"
            onClick={() => void load(days)}
            className="inline-flex items-center gap-2 rounded-full border border-gray-600 px-4 py-2 text-sm text-gray-200 hover:border-yellow-400/60"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
          <button
            type="button"
            onClick={() => void logout()}
            className="inline-flex items-center gap-2 rounded-full border border-gray-600 px-4 py-2 text-sm text-gray-200 hover:border-red-400/50"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </header>

      {error ? (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-100">
          {error}
        </div>
      ) : null}

      {loading && !report ? (
        <div className="rounded-3xl border border-gray-700 bg-gray-900/50 px-6 py-16 text-center text-gray-400">
          Carregando relatório…
        </div>
      ) : null}

      {report ? (
        <div className="space-y-6">
          {report.message ? (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
              {report.message}
            </div>
          ) : null}

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              icon={<Eye className="h-5 w-5" />}
              label="Pageviews"
              value={formatNumber(report.totals.pageviews)}
              hint={`Últimos ${report.rangeDays} dias`}
            />
            <MetricCard
              icon={<Users className="h-5 w-5" />}
              label="Visitantes (sessões)"
              value={formatNumber(report.totals.visitors)}
              hint="Estimativa por session id"
            />
            <MetricCard
              icon={<TrendingUp className="h-5 w-5" />}
              label="Vercel Analytics"
              value={
                payload?.vercel?.data
                  ? formatNumber(payload.vercel.data.pageviews)
                  : payload?.vercel?.configured
                    ? 'Erro'
                    : '—'
              }
              hint={
                payload?.vercel?.data
                  ? `${formatNumber(payload.vercel.data.visitors)} visitantes`
                  : payload?.vercel?.error || 'Configure VERCEL_TOKEN + VERCEL_PROJECT_ID'
              }
            />
            <MetricCard
              icon={<MonitorSmartphone className="h-5 w-5" />}
              label="Dispositivo #1"
              value={report.devices[0]?.deviceType || '—'}
              hint={
                report.devices[0]
                  ? `${formatNumber(report.devices[0].pageviews)} pageviews`
                  : 'Sem dados ainda'
              }
            />
          </section>

          <section className="rounded-3xl border border-gray-700/80 bg-gray-900/50 p-5 sm:p-6">
            <h2 className="mb-4 font-heading text-xl text-white">Tendência diária</h2>
            {report.daily.every((d) => d.pageviews === 0) ? (
              <p className="text-sm text-gray-400">
                Ainda não há pageviews registrados neste período. Depois do SQL e do consentimento de
                analytics, os acessos passam a aparecer aqui.
              </p>
            ) : (
              <div className="flex h-40 items-end gap-1 sm:gap-1.5">
                {report.daily.map((day) => (
                  <div key={day.date} className="group relative flex min-w-0 flex-1 flex-col items-center justify-end">
                    <div
                      className="w-full rounded-t-md bg-yellow-400/80 transition group-hover:bg-yellow-300"
                      style={{ height: `${Math.max((day.pageviews / maxDaily) * 100, day.pageviews > 0 ? 6 : 2)}%` }}
                      title={`${formatDateLabel(day.date)}: ${day.pageviews} pageviews`}
                    />
                    <span className="mt-2 hidden text-[10px] text-gray-500 sm:block">
                      {formatDateLabel(day.date)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-gray-700/80 bg-gray-900/50 p-5 sm:p-6">
              <h2 className="mb-4 font-heading text-xl text-white">Páginas mais acessadas</h2>
              {report.topPages.length === 0 ? (
                <p className="text-sm text-gray-400">Sem dados ainda.</p>
              ) : (
                <ul className="space-y-3">
                  {report.topPages.map((page) => (
                    <li
                      key={page.path}
                      className="flex items-center justify-between gap-3 border-b border-gray-800 pb-3 last:border-0 last:pb-0"
                    >
                      <code className="truncate text-sm text-yellow-100/90">{page.path}</code>
                      <div className="shrink-0 text-right text-sm text-gray-300">
                        <div>{formatNumber(page.pageviews)} views</div>
                        <div className="text-xs text-gray-500">{formatNumber(page.visitors)} sessões</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="rounded-3xl border border-gray-700/80 bg-gray-900/50 p-5 sm:p-6">
              <h2 className="mb-4 font-heading text-xl text-white">Origens (referrer)</h2>
              {report.referrers.length === 0 ? (
                <p className="text-sm text-gray-400">Sem dados ainda.</p>
              ) : (
                <ul className="space-y-3">
                  {report.referrers.map((item) => (
                    <li
                      key={item.referrer}
                      className="flex items-center justify-between gap-3 border-b border-gray-800 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="truncate text-sm text-gray-200">{item.referrer}</span>
                      <span className="shrink-0 text-sm text-gray-400">
                        {formatNumber(item.pageviews)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          <section className="rounded-3xl border border-gray-700/80 bg-gray-900/50 p-5 sm:p-6">
            <h2 className="mb-3 font-heading text-xl text-white">Dashboards externos</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={payload?.external?.clarityUrl || 'https://clarity.microsoft.com/'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-600 px-5 py-3 text-sm font-semibold text-white hover:border-yellow-400/70"
              >
                Abrir Microsoft Clarity
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://vercel.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-600 px-5 py-3 text-sm font-semibold text-white hover:border-yellow-400/70"
              >
                Abrir Vercel Analytics
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              {payload?.external?.vercelAnalyticsHint}
            </p>
          </section>
        </div>
      ) : null}
    </main>
  );
}

function MetricCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-3xl border border-gray-700/80 bg-gray-900/50 p-5">
      <div className="mb-3 inline-flex rounded-xl bg-yellow-400/10 p-2 text-yellow-400">{icon}</div>
      <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-1 font-heading text-2xl text-white">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{hint}</p>
    </div>
  );
}
