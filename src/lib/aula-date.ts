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
