export type EstadoCorretores = 'onda1' | 'onda2' | 'encerrada';

export const ONDA1_FIM_PADRAO = '2026-11-06T23:59:59-03:00';
export const ONDA2_FIM_PADRAO = '2026-11-09T11:59:59-03:00';

const PRECO = {
  onda1: { label: 'R$497', amountBRL: 497, onda: 1 as const },
  onda2: { label: 'R$597', amountBRL: 597, onda: 2 as const },
};

const PRECO_CHEIO = 'R$897';

const ROTULO: Record<EstadoCorretores, string> = {
  onda1: 'Black Friday até sexta, 06/11, 23h59',
  onda2: 'Até segunda, 09/11, às 12h',
  encerrada: 'As inscrições desta edição foram encerradas.',
};

const FRASE_ENCERRAMENTO =
  'As inscrições encerram segunda, 09/11, às 12h, uma hora antes do início.';

const URGENCIA: Record<Exclude<EstadoCorretores, 'encerrada'>, string[]> = {
  onda1: ['O preço muda no sábado, 07/11.', FRASE_ENCERRAMENTO],
  onda2: ['Última chamada.', FRASE_ENCERRAMENTO],
};

const CONTAGEM: Record<Exclude<EstadoCorretores, 'encerrada'>, string> = {
  onda1: 'Esse preço acaba em',
  onda2: 'Última chance de entrar nesta edição',
};

export type OfertaCorretores = {
  estado: EstadoCorretores;
  precoLabel: string | null;
  /** Valor cheio desta edição, riscado ao lado do preço promocional. */
  precoCheio: string | null;
  amountBRL: number | null;
  rotulo: string;
  urgencia: string[];
  contagemLegenda: string | null;
  fimIso: string | null;
  pixLinhas: string[];
  checkoutUrl: string | null;
  ctaEnabled: boolean;
  onda: 1 | 2 | null;
  /** Query de teste fora de produção. Não dispara refresh do relógio. */
  simulado: boolean;
};

export type ResolverOfertaInput = {
  now: Date;
  onda1Fim?: string;
  onda2Fim?: string;
  checkoutOnda1?: string;
  checkoutOnda2?: string;
  estadoForcado?: string | null;
  permitirForcar?: boolean;
};

function parseFim(value: string | undefined, fallback: string): Date {
  const raw = value?.trim() || fallback;
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return new Date(fallback);
  return parsed;
}

function estadoNoInstante(now: Date, onda1Fim: Date, onda2Fim: Date): EstadoCorretores {
  if (now.getTime() <= onda1Fim.getTime()) return 'onda1';
  if (now.getTime() <= onda2Fim.getTime()) return 'onda2';
  return 'encerrada';
}

function estadoForcadoValido(value: string | null | undefined): EstadoCorretores | null {
  if (value === 'onda1' || value === 'onda2' || value === 'encerrada') return value;
  return null;
}

function urlLimpa(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function resolveOfertaCorretores(input: ResolverOfertaInput): OfertaCorretores {
  const onda1Fim = parseFim(input.onda1Fim, ONDA1_FIM_PADRAO);
  const onda2Fim = parseFim(input.onda2Fim, ONDA2_FIM_PADRAO);
  const forcado = input.permitirForcar ? estadoForcadoValido(input.estadoForcado) : null;
  const estado = forcado ?? estadoNoInstante(input.now, onda1Fim, onda2Fim);

  if (estado === 'encerrada') {
    return {
      estado,
      precoLabel: null,
      precoCheio: null,
      amountBRL: null,
      rotulo: ROTULO.encerrada,
      urgencia: [],
      contagemLegenda: null,
      fimIso: null,
      pixLinhas: [],
      checkoutUrl: null,
      ctaEnabled: false,
      onda: null,
      simulado: Boolean(forcado),
    };
  }

  const checkoutUrl =
    estado === 'onda1' ? urlLimpa(input.checkoutOnda1) : urlLimpa(input.checkoutOnda2);
  const fim = estado === 'onda1' ? onda1Fim : onda2Fim;
  const preco = PRECO[estado];

  return {
    estado,
    precoLabel: preco.label,
    precoCheio: PRECO_CHEIO,
    amountBRL: preco.amountBRL,
    rotulo: ROTULO[estado],
    urgencia: URGENCIA[estado],
    contagemLegenda: CONTAGEM[estado],
    fimIso: fim.toISOString(),
    pixLinhas:
      estado === 'onda2'
        ? ['Pix ou cartão.', 'Prefira Pix ou cartão: a confirmação é imediata.']
        : ['Pix ou cartão.'],
    checkoutUrl,
    ctaEnabled: Boolean(checkoutUrl),
    onda: preco.onda,
    simulado: Boolean(forcado),
  };
}
