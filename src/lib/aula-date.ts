const TIME_ZONE = 'America/Sao_Paulo';

function civilDateKey(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE }).format(date);
}

function civilNoon(key: string): Date {
  return new Date(`${key}T12:00:00-03:00`);
}

function civilHour(date: Date): number {
  return Number(
    new Intl.DateTimeFormat('en-GB', {
      hour: 'numeric',
      hourCycle: 'h23',
      timeZone: TIME_ZONE,
    }).format(date)
  );
}

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

/** Compara por dia civil em America/Sao_Paulo, não por diferença de horas. */
export function getRelativeDayLabel(dataISO: string, now: Date = new Date()): string {
  const target = new Date(dataISO);
  if (Number.isNaN(target.getTime()) || now.getTime() >= target.getTime()) {
    return 'Encerrada';
  }

  const today = civilNoon(civilDateKey(now));
  const classDay = civilNoon(civilDateKey(target));
  const diffDays = Math.round((classDay.getTime() - today.getTime()) / 86_400_000);

  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return civilHour(now) >= 23 ? 'Hoje' : 'Amanhã';
  if (diffDays >= 7) return formatAulaDayMonth(dataISO);

  const weekday = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    timeZone: TIME_ZONE,
  }).format(target);
  const short = weekday.split('-')[0];
  return short.charAt(0).toUpperCase() + short.slice(1);
}

export function formatAulaQuandoLabel(dataISO: string, now: Date = new Date()): string {
  const day = getRelativeDayLabel(dataISO, now);
  if (day === 'Encerrada') return day;
  return `${day}, ${formatAulaTime(dataISO)}`;
}
