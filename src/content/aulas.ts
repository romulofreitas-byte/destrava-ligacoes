import { formatAulaQuandoLabel } from '@/lib/aula-date';

/** Grupo de aulas e anúncios. Troca por env `NEXT_PUBLIC_AULA_COMMUNITY_URL` quando a estratégia mudar. */
const AULA_WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/B6kQhkMPdQuEMGumjA4Rkm';

export type AulaStatus = 'aberta' | 'encerrada';

/** Update here when the YouTube live count changes — bio + stats stay in sync. */
export const AULA_SOCIAL_PROOF = {
  livesYoutube: 170,
  hoursLive: 400,
  pilots: 700,
} as const;

export type Aula = {
  slug: string;
  titulo: string;
  tituloLinha1: string;
  tituloLinha2: string;
  subtitulo: string;
  ganchoMobile: string;
  paragrafosHero: string[];
  chips: string[];
  historiasTitulo: string;
  historiasApoio: string;
  historiasVideos: { nome: string; titulo: string; url: string; poster?: string }[];
  historias: { nome: string; resultado: string; texto: string }[];
  data: string;
  duracaoMin: number;
  plataforma: string;
  temGravacao: boolean;
  status: AulaStatus;
  heroImage: string;
  ogImage: string;
  meetEnvKey: string;
  linkMeet: string;
  linkComunidade: string;
  stickyBar: string;
  eyebrow: string;
  metaLine: string;
  ctaLabel: string;
  form: {
    title: string;
    nomeLabel: string;
    whatsappLabel: string;
    emailLabel: string;
    consentLabel: string;
    submitLabel: string;
    microcopy: string;
    closedTitle: string;
    closedCta: string;
    gratisPill: string;
    countdownLabel: string;
  };
  doresTitulo: string;
  dores: { titulo: string; texto: string }[];
  doresFecho: string;
  entregasTitulo: string;
  entregas: { titulo: string; texto: string }[];
  paraQuemSecaoTitulo: string;
  paraQuemTitulo: string;
  paraQuem: string[];
  naoEhParaTitulo: string;
  naoEhPara: string[];
  faqTitulo: string;
  host: {
    titulo: string;
    nome: string;
    cargo: string;
    foto: string;
    destaque: string;
    paragrafos: string[];
    fatos: { valor: string; label: string }[];
  };
  stats: { valor: string; label: string }[];
  depoimentoPrints: string[];
  faq: { pergunta: string; resposta: string }[];
  ctaFinal: {
    titulo: string;
    subtitulo: string;
    botao: string;
  };
  footer: {
    brand: string;
    razao: string;
    cnpj: string;
    cidade: string;
    instagramUrl: string;
    youtubeUrl: string;
  };
  obrigado: {
    titulo: string;
    grupoMotivo: string;
    ctaComunidade: string;
    ctaAgenda: string;
    meetLabel: string;
    aviso: string;
    emailLine: string;
    copiar: string;
    copiado: string;
  };
  email: {
    subject: string;
  };
};

const LEAD_ANTIGO: Aula = {
  slug: 'lead-antigo-nao-e-lead-morto',
  titulo: 'Lead antigo não é lead morto',
  tituloLinha1: 'Lead antigo',
  tituloLinha2: 'não é lead\u00A0morto.',
  subtitulo: 'Como reativar leads antigos\ne fechar contratos.',
  ganchoMobile: 'Reativa leads antigos. Fecha contratos.',
  paragrafosHero: [
    'Você tem nomes que pediram e-mail, pediram proposta ou sumiram. Essa aula mostra como voltar neles: primeiro por ligação, depois no WhatsApp.',
  ],
  chips: [],
  historiasTitulo: 'Quem ligou de novo.\nE o que aconteceu.',
  historiasApoio: 'Reunião e venda de quem voltou a ligar.',
  historiasVideos: [
    {
      nome: '35 minutos',
      titulo: 'Gente que ligou.\nO que aconteceu depois.',
      url: 'https://www.youtube.com/watch?v=HKqIZtlBz6I',
      poster: '/videos/depoimentos-reais-thumb.png',
    },
  ],
  historias: [
    {
      nome: 'Otávio',
      resultado: 'Das 5 reuniões, 3 vieram\nde voltar no contato',
      texto: 'Das 5 reuniões que marquei, 3 foi voltando no contato. Quem não faz tá perdendo oportunidade.',
    },
    {
      nome: 'Jonathan',
      resultado: 'Ligou, mandou WhatsApp\ne fechou um site no mesmo dia',
      texto: 'Acabamos de fechar uma venda de 1 site agora. Ligação do zero, depois WhatsApp.',
    },
  ],
  data: '2026-09-21T20:30:00-03:00',
  duracaoMin: 90,
  plataforma: 'Google Meet',
  temGravacao: false,
  status: 'aberta',
  heroImage: '/romulo-mentor-destrava.jpg',
  ogImage: '/og/lead-antigo-nao-e-lead-morto.png',
  meetEnvKey: 'NEXT_PUBLIC_AULA_LEAD_ANTIGO_MEET_URL',
  linkMeet: 'https://meet.google.com/zkv-gvbg-zqa',
  linkComunidade: AULA_WHATSAPP_GROUP_URL,
  stickyBar: 'AO VIVO · GRÁTIS',
  eyebrow: 'AULA AO VIVO',
  metaLine: 'Segunda, 21/09 · 20:30 às 22:00 · 1h30 · Google Meet · Sem gravação · Grátis',
  ctaLabel: 'QUERO O LINK GRÁTIS',
  form: {
    title: 'Garante sua vaga',
    nomeLabel: 'Nome',
    whatsappLabel: 'WhatsApp',
    emailLabel: 'E-mail',
    consentLabel: 'Autorizo o contato do Mundo\u00A0Pódium por WhatsApp e e-mail.',
    submitLabel: 'QUERO O LINK GRÁTIS',
    microcopy: 'Aula gratuita. Sem cartão. Link na hora + e-mail de confirmação.',
    closedTitle: 'A aula já começou.',
    closedCta: 'Entrar no grupo do WhatsApp',
    gratisPill: '100% gratuita · sem cartão',
    countdownLabel: 'Aula começa em',
  },
  doresTitulo: 'A sua lista não está fria.\nEla está parada.',
  dores: [
    {
      titulo: '"Me manda por e-mail"',
      texto: 'Onde a oportunidade morre se ninguém liga de novo.',
    },
    {
      titulo: '"Agora não é o momento"',
      texto: 'Quase nunca é não. É a hora. E a hora muda sozinha, em 3, 6 ou 12 meses.',
    },
    {
      titulo: 'O silêncio depois da proposta',
      texto: 'Ele não sumiu. Ele te esqueceu. Porque você deixou.',
    },
  ],
  doresFecho:
    'A maioria vai começar 2027 caçando nome novo com a lista antiga intacta. Isso é caro. E é burro.',
  entregasTitulo: 'O que você sai\nsabendo fazer',
  entregas: [
    {
      titulo: 'Separar o que vale ligar do que é lixo',
      texto: 'Em 20 minutos você sabe em quem gastar tempo na lista antiga.',
    },
    {
      titulo: 'A abertura certa pra voltar a ligar',
      texto: '“Oi, lembra de mim?” mata a chamada nos primeiros 4 segundos. Tem um jeito certo de voltar.',
    },
    {
      titulo: 'WhatsApp depois da ligação.\nNunca antes.',
      texto: 'Primeiro liga. A mensagem no WhatsApp vem depois.',
    },
    {
      titulo: 'Fechar ainda em 2026, sem soar desesperado',
      texto: 'Como usar o fim do ano como motivo real, sem pressão barata.',
    },
  ],
  paraQuemSecaoTitulo: 'Essa aula é pra\nquem vai ligar.',
  paraQuemTitulo: 'É pra você',
  paraQuem: [
    'Vive de marcar reunião e precisa da agenda cheia.',
    'Tem uma lista antiga parada. E nunca voltou nela de verdade.',
    'Quer fechar contrato ainda este ano, não “ano que vem”.',
    'Aguenta ouvir a verdade sobre como você vende.',
  ],
  naoEhParaTitulo: 'Não perde tempo',
  naoEhPara: [
    'Quer um script mágico para não precisar ligar.',
    'Acha que WhatsApp substitui o telefone.',
    'Veio só assistir e não vai ligar.',
  ],
  faqTitulo: 'Perguntas frequentes',
  host: {
    titulo: 'Quem conduz',
    nome: 'Rômulo Freitas',
    cargo: 'Liga ao vivo, com cliente real',
    foto: '/romulo-mentor-destrava.jpg',
    destaque: 'Eu já travei no telefone.',
    paragrafos: [
      '12 anos vendendo pra empresa. Sete com a própria empresa: do zero, com um computador e uma mesa.',
      'Passei anos desistindo antes da hora. Foi isso que eu tive que quebrar pra ligar todo dia.',
    ],
    fatos: [
      { valor: '12+', label: 'anos vendendo' },
      { valor: `${AULA_SOCIAL_PROOF.livesYoutube}+`, label: 'lives no YouTube' },
      { valor: `${AULA_SOCIAL_PROOF.hoursLive}h+`, label: 'de ligação\nao vivo' },
    ],
  },
  stats: [
    { valor: `${AULA_SOCIAL_PROOF.livesYoutube}+`, label: 'lives no YouTube' },
    { valor: `${AULA_SOCIAL_PROOF.hoursLive}h+`, label: 'de ligação ao vivo' },
    { valor: `${AULA_SOCIAL_PROOF.pilots}+`, label: 'pessoas no WhatsApp' },
  ],
  depoimentoPrints: [],
  faq: [
    {
      pergunta: 'É pago?',
      resposta: 'Não. 100% gratuita. Sem cartão.',
    },
    {
      pergunta: 'Vai ter gravação?',
      resposta: 'Não. Essa aula não fica gravada. Quem não estiver às 20:30, perdeu.',
    },
    {
      pergunta: 'Preciso ter lista pronta?',
      resposta: 'Não. Traz o que você tem, mesmo que seja uma planilha bagunçada.',
    },
    {
      pergunta: 'Preciso ligar durante a aula?',
      resposta: 'Não, mas quem já chega com a lista aberta sai na frente.',
    },
    {
      pergunta: 'Quanto tempo dura?',
      resposta: '1 hora e 30 minutos, a partir das 20:30.',
    },
    {
      pergunta: 'O que eu recebo agora?',
      resposta: 'O link do Meet e o grupo no WhatsApp. Se acontecer qualquer imprevisto, o aviso chega lá.',
    },
  ],
  ctaFinal: {
    titulo: 'Ninguém liga por você.\nLiga você.',
    subtitulo: 'Segunda, 20:30. Grátis. Google Meet. Sem gravação.',
    botao: 'QUERO O LINK GRÁTIS',
  },
  footer: {
    brand: 'Mundo Pódium',
    razao: 'Mundo Pódium LTDA',
    cnpj: '68.349.974/0001-19',
    cidade: 'Belo Horizonte, MG',
    instagramUrl: 'https://instagram.com/romulocsfreitas',
    youtubeUrl: 'https://www.youtube.com/@mundopodium',
  },
  obrigado: {
    titulo: 'Inscrição confirmada.\nTe vejo na segunda, 20:30.',
    grupoMotivo: 'É nesse grupo que avisamos se o horário mudar e onde saem as próximas aulas.',
    ctaComunidade: 'ENTRAR NO GRUPO DO WHATSAPP',
    ctaAgenda: 'ADICIONAR NA AGENDA',
    meetLabel: 'Link do Google Meet',
    aviso: 'Não vai ter gravação. Se o horário mudar, o aviso chega no WhatsApp.',
    emailLine: 'Mandamos um e-mail de confirmação com o horário, o Meet e o grupo no WhatsApp.',
    copiar: 'Copiar',
    copiado: 'Copiado',
  },
  email: {
    subject: 'Sua vaga: Lead antigo não é lead morto — segunda, 20:30',
  },
};

export const AULAS: Record<string, Aula> = {
  [LEAD_ANTIGO.slug]: LEAD_ANTIGO,
};

export function getAulaSlugs(): string[] {
  return Object.keys(AULAS);
}

export function getAulaBySlug(slug: string): Aula | null {
  return AULAS[slug] ?? null;
}

export function resolveAulaLinks(aula: Aula): Aula {
  const meetFromNamedEnv = process.env[aula.meetEnvKey]?.trim() || '';
  /** Grupo de aulas/anúncios. Nome da env legado; não é o WhatsApp da comunidade do workshop. */
  const communityFromEnv = process.env.NEXT_PUBLIC_AULA_COMMUNITY_URL?.trim() || '';

  return {
    ...aula,
    linkMeet: meetFromNamedEnv || aula.linkMeet,
    linkComunidade: communityFromEnv || aula.linkComunidade,
  };
}

export function isAulaEncerrada(aula: Aula, now: Date = new Date()): boolean {
  if (aula.status === 'encerrada') return true;
  return now.getTime() >= new Date(aula.data).getTime();
}

/** "Hoje, 20:30" no dia da aula; senão data civil em America/Sao_Paulo. */
export function getAulaQuandoLabel(aula: Aula, now: Date = new Date()): string {
  return formatAulaQuandoLabel(aula.data, now);
}
