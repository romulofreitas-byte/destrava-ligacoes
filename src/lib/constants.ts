// Constantes do Google Meet
export interface GoogleMeetInfo {
  link: string;
  phone: string;
  pin: string;
  phoneLink: string;
}

export function getGoogleMeetInfo(): GoogleMeetInfo {
  return {
    link: process.env.GOOGLE_MEET_LINK || 'https://meet.google.com/awb-vxqu-xnm',
    phone: process.env.GOOGLE_MEET_PHONE || '(BR) +55 21 4560-7556',
    pin: process.env.GOOGLE_MEET_PIN || '523 187 755#',
    phoneLink: process.env.GOOGLE_MEET_PHONE_LINK || 'https://tel.meet/awb-vxqu-xnm?pin=4122161251082',
  };
}

// Informações do Workshop
export const WORKSHOP_INFO = {
  title: 'WORKSHOP DESTRAVE SUAS LIGAÇÕES | MUNDO PÓDIUM',
  date: '15 de abril de 2026',
  dateObj: new Date('2026-04-15T13:00:00-03:00'),
  /** Cabeçalho / hero (sem ano, capitalização do mês) */
  dateDisplayLong: '15 de Abril',
  dateDisplayShort: '15/04',
  /** Texto completo para e-mails (com dia da semana) */
  dateEmailLine: 'Quarta-feira, 15 de abril de 2026',
  time: '13:00 – 17:00',
  timezone: 'America/Sao_Paulo',
  duration: '4 horas',
  format: 'Online • Ao vivo',
};

/** Segundo módulo (Sala de Ligação) — dia distinto do módulo 1 */
export const WORKSHOP_MODULE_2_INFO = {
  date: '22 de abril de 2026',
  dateObj: new Date('2026-04-22T13:00:00-03:00'),
  dateDisplayLong: '22 de Abril',
  dateDisplayShort: '22/04',
  dateEmailLine: 'Quarta-feira, 22 de abril de 2026',
  time: '13:00 – 17:00',
} as const;

