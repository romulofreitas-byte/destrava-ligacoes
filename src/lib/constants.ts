// Constantes do Google Meet
export interface GoogleMeetInfo {
  link: string;
  phone: string;
  pin: string;
  phoneLink: string;
}

export function getGoogleMeetInfo(): GoogleMeetInfo {
  return {
    link: process.env.GOOGLE_MEET_LINK?.trim() || '',
    phone: process.env.GOOGLE_MEET_PHONE?.trim() || '',
    pin: process.env.GOOGLE_MEET_PIN?.trim() || '',
    phoneLink: process.env.GOOGLE_MEET_PHONE_LINK?.trim() || '',
  };
}

export const PLATAFORMA_CASA_URL = 'https://casa.mundopodium.com.br/';
/** Checkout Asaas do Workshop (CTA final) */
export const WORKSHOP_CHECKOUT_URL = 'https://www.asaas.com/c/uerfngbtl0fkdga1';
/** Âncora do card de compra no fim da landing */
export const WORKSHOP_CHECKOUT_SECTION_ID = 'inscricao';
/** Domínio público do workshop — precisa ser o mesmo cadastrado no Asaas */
export const WORKSHOP_PUBLIC_SITE_URL = 'https://workshop.mundopodium.com.br';
export const WORKSHOP_SUCCESS_PATH = '/workshop-destrava-ligacoes/obrigado';
/**
 * URL de retorno após pagamento aprovado no Asaas (PIX/cartão).
 * Colar em: Link de pagamento → URL de redirecionamento / callback.successUrl
 * com autoRedirect = true.
 */
export const WORKSHOP_SUCCESS_URL = `${WORKSHOP_PUBLIC_SITE_URL}${WORKSHOP_SUCCESS_PATH}?status=PAID&source=asaas`;
export const WORKSHOP_SALES = {
  isOpen: true,
  /** Abertura das vendas (exibição em CTAs) */
  opensOnDisplay: '11/08',
  /** Número da edição atual (ex.: 11 → "11ª") */
  edition: 11,
  /** Vagas já preenchidas (hero + CTA final — números absolutos) */
  filledSpots: 12,
  /** Capacidade máxima da turma */
  maxSpots: 20,
  /** Percentual da barra (filledSpots / maxSpots) */
  progressPercent: 60,
  /**
   * No dia do Módulo 1: esconde “X de 20” e a barra.
   * Urgência passa a ser horário (ao vivo hoje), não capacidade restante.
   */
  showSpotsProgress: false,
} as const;

/** Preço de venda + ancoragem (hero e CTA final devem usar a mesma fonte) */
export const WORKSHOP_PRICING = {
  current: 'R$ 897,00',
  /** Valor numérico em reais (APIs de pagamento — nunca confiar no client) */
  amountBRL: 897,
  amountCents: 89700,
  /** Preço “de” riscado — ancoragem visual */
  anchor: 'R$ 1.497,00',
  savingsLabel: 'Economia de R$ 600 nesta edição',
} as const;

/** Copy do botão quando vendas ainda não abriram */
export const WORKSHOP_CLOSED_COPY = {
  heroCta: `Vendas abrem em ${WORKSHOP_SALES.opensOnDisplay}`,
  finalCta: `Vendas abrem em ${WORKSHOP_SALES.opensOnDisplay}`,
} as const;

// Informações do Workshop
export const WORKSHOP_INFO = {
  title: 'WORKSHOP DESTRAVA LIGAÇÕES | MUNDO PÓDIUM',
  /** Nome curto do produto (site, SEO, e-mails) */
  productName: 'Workshop Destrava Ligações',
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

/** Copy do dia D: urgência de horário, sem denominador de vagas */
export const WORKSHOP_LAST_CALL = {
  heroCta: 'Entrar na turma de hoje',
  finalCta: `Garantir vaga antes das ${WORKSHOP_INFO.timeStartBadge}`,
  subtleCta: 'Entrar na turma de hoje',
  spotsLine: 'Últimas vagas para entrar hoje',
  liveToday: `Ao vivo hoje às ${WORKSHOP_INFO.timeStartBadge}`,
  countdownCaption: `Começa hoje às ${WORKSHOP_INFO.timeStartBadge}`,
  bannerLine: `Módulo 1 hoje às ${WORKSHOP_INFO.timeStartBadge} — últimas entradas`,
  closingLine: 'Últimas vagas para entrar no ao vivo de hoje.',
} as const;

/** WhatsApp — fonte única para CTAs do funil */
export const WORKSHOP_WHATSAPP = {
  phoneE164: '5531994293099',
  /** DM comercial (footer / floating na landing) */
  dmUrl: `https://wa.me/5531994293099?text=${encodeURIComponent(
    `Rômulo, quero saber mais sobre o Workshop Destrava Ligações (${WORKSHOP_SALES.edition}ª edição)!`
  )}`,
  /** Grupo da comunidade (página obrigado / pós-compra) */
  communityUrl: 'https://chat.whatsapp.com/L4camOPOJMxDb8et6M80oN',
} as const;

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
  recordingsHighlight: `Workshop + Sala ficam gravados na Mundo Pódium durante o acesso incluso.`,

  /** FAQ: acesso + prazo (fundido) */
  faqHowPlatformWorks: `Acesso imediato à Mundo Pódium no Circle (módulos ao vivo, materiais e gravações). Incluso por 60 dias a partir da compra; depois, continuidade a partir de ${ALUMNI_MONTHLY_PRICE}/mês para participantes.`,

  /** @deprecated Prefer faqHowPlatformWorks — mantido por compatibilidade */
  faqHowLongAccess: `60 dias a partir da compra, com gravações na plataforma. Continuidade a partir de ${ALUMNI_MONTHLY_PRICE}/mês para participantes.`,

  /** Página obrigado — complemento ao bloco de acesso */
  obrigadoPlatformAccessNote: `O acesso incluso no ingresso é de 60 dias a partir da compra. Para continuar na plataforma, há condição para participantes a partir de ${ALUMNI_MONTHLY_PRICE} por mês.`,
} as const;

/** Copy da seção Plataforma Mundo Pódium (uma fonte → SSR e cliente sempre alinhados) */
export const PLATAFORMA_MUNDO_PODIUM_COPY = {
  eyebrow: 'Plataforma Mundo Pódium · a casa no Circle',
  headlineBefore: 'Não é mais um curso.',
  headlineAccent: 'É a casa',
  headlineAfter: 'que sustenta o destravamento.',
  subhead:
    'Workshop na ligação. Na casa você treina ao vivo, acompanha mentorias e mantém o ritmo com outros Pilotos.',
  mayconVideoSubtitle:
    'Relato do Maycon + tour da Mundo Pódium no Circle com o Rômulo.',
  videoHighlightSupporting:
    'Sala, módulos, materiais e acervo — no mesmo vídeo do depoimento.',
  circleScreenshotsNote: 'O mesmo ambiente no Circle onde você treina depois do workshop.',
  tourInsightLine: 'Rômulo mostra a interface no Circle no mesmo vídeo.',
  mayconVideoMobileCompactLine:
    'Relato do Maycon e tour da Mundo Pódium no Circle.',
  arsenalEyebrow: 'Dentro da casa',
  arsenalTitleBefore: 'Tudo que entra no seu',
  arsenalTitleAccent: 'arsenal',
  arsenalTitleAfter: 'com o ingresso',
  arsenalHelper: 'Toque em cada frente. Tudo hospedado no Circle.',
  accessCta: 'Ver a casa por dentro',
  accessBlurbLead: 'No ingresso: acesso incluso por',
  accessBlurbMid: 'Continuidade a partir de',
  accessBlurbTail: 'para participantes — detalhes após o evento.',
} as const;

/**
 * GRID — bônus 2 da 11ª edição (depois dos 60 dias de Plataforma).
 * Fonte única de datas, copy e FAQ. Não promover no hero.
 */
export const WORKSHOP_GRID_BONUS = {
  badge: 'Bônus 2 · Acesso de Fundador',
  headlineBefore: 'Você vai sair destravado.',
  headlineAccent: 'Mas vai ligar pra quem?',
  subheadline:
    'Todo mundo que faz o Workshop trava no mesmo ponto na segunda-feira seguinte: não tem lista. O GRID resolve isso — e quem entra nesta edição recebe acesso antes de todo mundo.',

  bodyLead: 'Segunda de manhã. Você está destravado, decidido, com o gatilho na mão.',
  bodyEmpty: 'Aí abre o notebook e não tem pra quem ligar.',
  bodyFriction:
    'Vai no Google Maps. Copia um nome. Copia um telefone. Entra no site da Receita pra descobrir quem é o dono. Volta. Copia outro. Quarenta minutos depois você tem três leads — e já não tem mais a coragem que tinha às oito da manhã.',
  bodyInsight: 'Não é falta de vontade. É atrito. E atrito mata mais prospecção que objeção.',
  bodyPromise: 'O GRID existe pra isso não acontecer com você.',
  bodyHow:
    'Você escolhe o nicho e a região. Ele devolve a lista com o telefone da empresa, o nome do sócio que decide e a ordem de quem ligar primeiro — P1, P2, P3, como um grid de largada.',
  bodyAccounting:
    'E ele faz uma coisa que nenhuma ferramenta do mercado faz: avisa quando o telefone é do escritório de contabilidade. Aquele número que você liga e cai numa moça que não faz ideia de quem você é — porque o telefone do cadastro nunca foi da empresa, era do contador que abriu o CNPJ.',
  bodyDefault: 'O GRID identifica esses números e tira eles da sua lista. Por padrão.',

  screenshotSrc: '/grid/grid-lista-preview.png',
  screenshotWidth: 1024,
  screenshotHeight: 493,
  screenshotAlt:
    'Prévia do GRID: lista de resultados com posição de largada, empresa, telefone e nome do decisor.',
  screenshotCaption: 'Uma lista gerada no GRID — ligar de cima para baixo.',
  previewBadge: 'Prévia',
  previewNote: 'Dados de demonstração',

  highlights: [
    'P1, P2, P3 — ordem de quem ligar primeiro',
    'Telefone e nome do sócio-administrador na mesma linha',
    'Filtro de telefone de contabilidade, ligado por padrão',
    'Export pronto: Excel, CSV e PDF',
  ],

  deliverablesTitle: 'O que você recebe',
  deliverablesNow: [
    {
      title: 'Lista pronta por nicho e região',
      detail: '16 nichos abertos em segmentos específicos, Brasil inteiro',
    },
    {
      title: 'Telefone e nome do sócio-administrador',
      detail: 'Sem entrar na Receita, sem garimpar o QSA',
    },
    {
      title: 'Ordem de largada',
      detail: 'Cada lead numa posição, do mais quente pro mais frio. Você liga de cima pra baixo',
    },
    {
      title: 'Filtro de telefone de contabilidade',
      detail: 'Ligado por padrão, com o aviso de em quantas empresas aquele número aparece',
    },
    {
      title: 'Contagem ao vivo do seu mercado',
      detail: 'Antes de gastar qualquer coisa',
    },
    {
      title: 'Export pronto pro CRM',
      detail: 'Excel, CSV mapeado e PDF',
    },
  ],
  deliverablesLater: [
    {
      title: 'Telefone conferido no site oficial',
      detail: 'da empresa',
    },
    {
      title: 'Auditoria digital',
      detail: 'Se tem site, pixel, anúncio, Instagram, WhatsApp',
    },
    {
      title: 'Minuto de Ouro montado',
      detail: 'Com o contexto real do lead',
    },
  ],

  /** Liberação em duas etapas — Acesso de Fundador */
  stage1DateDisplay: '15 de setembro',
  stage1DateShort: '15/09',
  stage1Year: 2026,
  stage1Detail:
    'Você recebe o acesso com lista, decisor e filtro de contabilidade funcionando',
  stage2DateDisplay: 'Outubro',
  stage2Year: 2026,
  stage2Detail:
    'Libera a auditoria digital, o telefone conferido no site e o Minuto de Ouro montado',

  accessDays: 60,
  planLevel: 'Piloto',
  leadsPerMonth: 500,
  marketAnchorPrice: 'R$ 590 por mês',

  anchorMarket:
    'Ferramenta de prospecção equivalente no mercado brasileiro custa a partir de R$ 590 por mês, com venda por formulário e fidelidade de 12 meses.',
  anchorOfferLead: 'Quem entra nesta edição do Workshop recebe',
  anchorOfferMid: '60 dias de GRID no nível Piloto — 500 leads por mês',
  anchorOfferTail: 'junto com os 60 dias de Plataforma. Sem custo adicional. Sem fidelidade.',

  accessTitle: 'Como funciona o Acesso de Fundador',
  accessIntro: 'O GRID está em construção. Não vou te vender print de tela e promessa vaga.',
  accessFoundersLead: 'Quem entra na',
  accessFoundersTail: 'edição do Workshop entra na primeira turma de fundadores:',
  accessDuration: '60 dias de acesso no nível Piloto, contados a partir da liberação.',
  accessCloser: 'Fundador entra antes, paga zero e ajuda a decidir o que vem depois.',

  warningTitle: 'Uma coisa que precisa estar clara:',
  warningLead: 'o GRID monta o grid de largada. Ele não liga por você.',
  warningBody:
    'Lista pronta não fecha contrato. Quem fecha é quem disca. O Workshop te dá o método, a Plataforma te dá a prática, o GRID tira o atrito do caminho.',
  warningClose: 'A volta rápida é você que dá.',

  cta: 'Quero minha vaga na 11ª edição',

  afterWorkshopTitle: 'GRID — acesso de fundador',
  afterWorkshopDetail: 'Lista, decisor e ordem de quem ligar primeiro',

  termosLine:
    'Acesso de fundador ao GRID (lista de prospecção): 60 dias no nível Piloto a partir da liberação. Etapa 1 em 15 de setembro de 2026 (lista, decisor e filtro de contabilidade); etapa 2 em outubro de 2026 (auditoria digital, telefone conferido no site e Minuto de Ouro). O GRID monta a lista — não realiza ligações.',

  faq: [
    {
      question: 'O GRID é um robô que liga sozinho?',
      answer:
        'Não. Ele monta a lista e organiza a ordem. Discar é com você — e é isso que o Workshop te ensina a fazer.',
    },
    {
      question: 'De onde vêm os dados do GRID?',
      answer:
        'Da base pública de CNPJ da Receita Federal, mais informações públicas do site das próprias empresas. Nada de lista comprada, nada de dado vazado.',
    },
    {
      question: 'O GRID serve pro meu nicho?',
      answer:
        'São 16 nichos abertos em segmentos específicos, cobrindo de clínica de estética a indústria de alimentos. Se o seu nicho tem CNPJ, o GRID acha.',
    },
    {
      question: 'Preciso pagar alguma coisa a mais pelo GRID?',
      answer:
        'Não. 60 dias no nível Piloto entram junto com o Workshop, sem custo adicional e sem fidelidade.',
    },
    {
      question: 'E depois dos 60 dias do GRID?',
      answer:
        'Você decide se continua. Não tem cobrança automática surpresa e não tem contrato de 12 meses.',
    },
    {
      question: 'Por que o GRID não está disponível hoje?',
      answer:
        'Porque está sendo construído e eu prefiro te dar data do que te dar promessa. Quem entra nesta edição entra como fundador — antes de estar aberto pra todo mundo.',
    },
  ],
} as const;

