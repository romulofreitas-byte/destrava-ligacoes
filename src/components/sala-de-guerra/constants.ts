export const SALA_SLUG = 'sala-de-guerra-pos-eleicao';

export const SALA_TITLE = 'Sala de Guerra Pós-Eleição';

export const SALA_PAGE_TITLE = 'Sala de Guerra Pós-Eleição | Mundo Pódium';

export const SALA_DESCRIPTION =
  'Aula gratuita e ao vivo, sábado, 31/10, às 10h. Como ligar, ofertar e fazer downsell pra quem está com medo de investir.';

export const SALA_MEET_URL = 'https://meet.google.com/gsf-eqeb-sjp';

export const SALA_TRAVES = [
  'Acesso ao decisor',
  'Objeção',
  'Oferta',
  'Follow-up',
  'Outra',
] as const;

export type SalaTrava = (typeof SALA_TRAVES)[number];

export const SALA_PROMISES = [
  'Como ligar pra quem está com medo de investir.',
  'Como reposicionar sua oferta pra quem quer proteger caixa.',
  'Quando fazer downsell em vez de desconto.',
] as const;
