const TIME_ZONE = 'America/Sao_Paulo';

export function formatAulaTime(dataISO: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: TIME_ZONE,
  }).format(new Date(dataISO));
}

export function formatAulaDayMonth(dataISO: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    timeZone: TIME_ZONE,
  }).format(new Date(dataISO));
}

function civilYmd(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function nextCivilYmd(ymd: string): string {
  const next = new Date(`${ymd}T12:00:00-03:00`);
  return civilYmd(new Date(next.getTime() + 24 * 60 * 60 * 1000));
}

/** Data civil em America/Sao_Paulo. Hoje/Amanhã no dia da aula. */
export function getRelativeDayLabel(dataISO: string, now: Date = new Date()): string {
  const target = new Date(dataISO);
  if (Number.isNaN(target.getTime()) || now.getTime() >= target.getTime()) {
    return 'Encerrada';
  }
  const nowYmd = civilYmd(now);
  const targetYmd = civilYmd(target);
  if (nowYmd === targetYmd) return 'Hoje';
  if (nextCivilYmd(nowYmd) === targetYmd) return 'Amanhã';
  return formatAulaDayMonth(dataISO);
}

export function formatAulaQuandoLabel(dataISO: string, now: Date = new Date()): string {
  const day = getRelativeDayLabel(dataISO, now);
  if (day === 'Encerrada') return day;
  return `${day}, ${formatAulaTime(dataISO)}`;
}

const WEEKDAY_LABEL: Record<string, string> = {
  Sun: 'Domingo',
  Mon: 'Segunda',
  Tue: 'Terça',
  Wed: 'Quarta',
  Thu: 'Quinta',
  Fri: 'Sexta',
  Sat: 'Sábado',
};

/** "Segunda, 21/09 · 20:30 às 22:00 · horário de Brasília" */
export function formatAulaJanelaEmail(dataISO: string, duracaoMin: number): string {
  const start = new Date(dataISO);
  const end = new Date(start.getTime() + duracaoMin * 60 * 1000);
  const weekdayKey = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    timeZone: TIME_ZONE,
  }).format(start);
  const weekday = WEEKDAY_LABEL[weekdayKey] ?? weekdayKey;
  return `${weekday}, ${formatAulaDayMonth(dataISO)} · ${formatAulaTime(dataISO)} às ${formatAulaTime(end.toISOString())} · horário de Brasília`;
}
