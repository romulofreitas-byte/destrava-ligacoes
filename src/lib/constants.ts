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
  date: '21 de janeiro de 2026',
  dateObj: new Date('2026-01-21T13:00:00-03:00'), // 21 de janeiro de 2026, 13:00 BRT
  time: '13:00 – 17:00',
  timezone: 'America/Sao_Paulo',
  duration: '4 horas',
  format: 'Online • Ao vivo',
};

