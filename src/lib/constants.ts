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

export const PLATAFORMA_CASA_URL = 'https://casa.mundopodium.com.br/';
export const WORKSHOP_SALES = {
  isOpen: true,
  /** Número da edição atual (ex.: 11 → "11ª") */
  edition: 11,
  /** Vagas já preenchidas (hero + CTA final — números absolutos) */
  filledSpots: 6,
  /** Capacidade máxima da turma */
  maxSpots: 20,
  /** Percentual da barra (filledSpots / maxSpots) */
  progressPercent: 30,
} as const;

/** Preço de venda + ancoragem (hero e CTA final devem usar a mesma fonte) */
export const WORKSHOP_PRICING = {
  current: 'R$ 897,00',
  /** Preço “de” riscado — ancoragem visual */
  anchor: 'R$ 1.497,00',
  savingsLabel: 'Economia de R$ 600 nesta edição',
} as const;

/** Copy quando vendas fechadas (CTAs, badges) */
export const WORKSHOP_CLOSED_COPY = {
  heroCta: 'Entrar na Plataforma Mundo Pódium',
  finalCta: 'Entrar na Plataforma — R$ 89,90/mês',
  finalHeadline: 'Treine cold call na Plataforma Mundo Pódium',
  finalSubheadline:
    'Sala de Ligação ao vivo, mentorias 2x por semana e gravações para rever quando quiser.',
  statusLine: 'Vagas encerradas • Próxima turma em breve',
  badgeEdition: 'Vagas encerradas — próxima turma em breve',
} as const;

// Informações do Workshop
export const WORKSHOP_INFO = {
  title: 'WORKSHOP DESTRAVE SUAS LIGAÇÕES | MUNDO PÓDIUM',
  date: '19 de agosto de 2026',
  dateObj: new Date('2026-08-19T13:00:00-03:00'),
  /** Cabeçalho / hero (sem ano, capitalização do mês) */
  dateDisplayLong: '19 de Agosto',
  dateDisplayShort: '19/08',
  /** Texto completo para e-mails (com dia da semana) */
  dateEmailLine: 'Quarta-feira, 19 de agosto de 2026',
  time: '13:00 – 17:00',
  /** Início do módulo 1 (atalho para UI compacta) */
  timeStartBadge: '13h',
  timezone: 'America/Sao_Paulo',
  duration: '4 horas',
  format: 'Online • Ao vivo',
};

/** Segundo módulo (Sala de Ligação) — dia distinto do módulo 1 */
export const WORKSHOP_MODULE_2_INFO = {
  date: '25 de agosto de 2026',
  dateObj: new Date('2026-08-25T08:00:00-03:00'),
  dateDisplayLong: '25 de Agosto',
  dateDisplayShort: '25/08',
  dateEmailLine: 'Terça-feira, 25 de agosto de 2026',
  time: '08:00 – 12:00',
  /** Zero à esquerda: evita ler como “8h de duração” */
  timeStartBadge: '08h',
} as const;

/**
 * Duração do workshop (não confundir com horário de início do módulo 2 às 08h).
 * Total: 8 horas · 2 módulos de 4h em dias diferentes.
 */
export const WORKSHOP_DURATION = {
  hoursPerModule: 4,
  totalHours: 8,
  perModuleLabel: '4 horas',
  totalLabel: '8 horas',
  /** Badge do hero */
  badgeLine: '2 módulos • 4h cada • Dias diferentes',
  /** Relógio no header (duração total, não horário) */
  headerLine: '8h no total · 2×4h',
  /** Cards / FAQ / e-mail */
  detailLine: '8 horas no total (2 módulos de 4h)',
} as const;

const PLATFORM_PUBLIC_PRICE = 'R$ 89,90';
const ALUMNI_MONTHLY_PRICE = 'R$ 59,90';

/** Copy única: prazo do acesso incluso + referências de preço (plataforma / pós-workshop) */
export const WORKSHOP_PLATFORM_RULES = {
  platformPublicPriceLabel: PLATFORM_PUBLIC_PRICE,
  alumniMonthlyPriceLabel: ALUMNI_MONTHLY_PRICE,

  /** Cards / strip — título curto + detalhe */
  includedAccessEndsTitle: 'Acesso incluso',
  includedAccessEndsDetail: '60 dias após a compra',

  /** Destaque de gravação: workshop + sala ficam na plataforma */
  recordingsHighlight: `Workshop + Sala de Ligação ficam gravados na Mundo Pódium para você rever depois, dentro do período de acesso incluso.`,

  /** FAQ: como funciona o acesso */
  faqHowPlatformWorks: `Após a compra, você recebe acesso imediato à plataforma Mundo Pódium no Circle, onde acontecem os dois módulos ao vivo e ficam materiais e ferramentas do workshop. O Workshop e a Sala de Ligação também ficam gravados na própria plataforma para acesso posterior durante o período incluso. O acesso incluso no pacote do workshop permanece por 60 dias a partir da data da compra. Quem quiser seguir na plataforma com acesso completo pode utilizar a oferta de continuidade a partir de ${ALUMNI_MONTHLY_PRICE} por mês (detalhes após o evento).`,

  /** FAQ: por quanto tempo */
  faqHowLongAccess: `60 dias a partir da compra. Nesse período, você mantém acesso aos conteúdos e às gravações do Workshop + Sala de Ligação dentro da plataforma. Depois desse prazo, o acesso incluso encerra; para continuar na comunidade, há condição especial para participantes a partir de ${ALUMNI_MONTHLY_PRICE} por mês.`,

  /** Página obrigado — complemento ao bloco de acesso */
  obrigadoPlatformAccessNote: `O acesso incluso no ingresso é de 60 dias a partir da compra. Para continuar na plataforma, há condição para participantes a partir de ${ALUMNI_MONTHLY_PRICE} por mês.`,
} as const;

/** Copy da seção Plataforma Mundo Pódium (uma fonte → SSR e cliente sempre alinhados) */
export const PLATAFORMA_MUNDO_PODIUM_COPY = {
  mayconVideoSubtitle:
    'Mentalidade, preparação e volume na prática com Maycon — no mesmo vídeo, Rômulo conduz um tour pela interface da Mundo Pódium no Circle.',
  videoHighlightSupporting:
    'Rômulo mostra na prática o ambiente onde rodam os módulos, materiais e o acervo; Maycon traz o relato e os resultados na ligação.',
  circleScreenshotsNote:
    'É o mesmo tipo de interface que Rômulo demonstra nesse vídeo — hospedada no Circle.',
  tourInsightLine:
    'No mesmo vídeo do depoimento, Rômulo abre a interface no Circle e mostra o ambiente em ação.',
  /** Uma linha no mobile (evita caixa roxa + título longo empilhados) */
  mayconVideoMobileCompactLine:
    'No vídeo abaixo: relato do Maycon e tour da Mundo Pódium no Circle com o Rômulo.',
} as const;

