import type { Aula } from '@/content/aulas';

function toGoogleUtcStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

export function buildGoogleCalendarUrl(aula: Aula): string {
  const start = new Date(aula.data);
  const end = new Date(start.getTime() + aula.duracaoMin * 60 * 1000);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: aula.titulo,
    dates: `${toGoogleUtcStamp(start)}/${toGoogleUtcStamp(end)}`,
    details: aula.linkMeet
      ? `${aula.subtitulo}\n\n${aula.plataforma}: ${aula.linkMeet}`
      : aula.subtitulo,
    location: aula.linkMeet || aula.plataforma,
    ctz: 'America/Sao_Paulo',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
