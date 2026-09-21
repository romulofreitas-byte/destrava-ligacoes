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

/** Data civil em America/Sao_Paulo. Sem Hoje/Amanhã, para servir qualquer lançamento. */
export function getRelativeDayLabel(dataISO: string, now: Date = new Date()): string {
  const target = new Date(dataISO);
  if (Number.isNaN(target.getTime()) || now.getTime() >= target.getTime()) {
    return 'Encerrada';
  }
  return formatAulaDayMonth(dataISO);
}

export function formatAulaQuandoLabel(dataISO: string, now: Date = new Date()): string {
  const day = getRelativeDayLabel(dataISO, now);
  if (day === 'Encerrada') return day;
  return `${day}, ${formatAulaTime(dataISO)}`;
}
