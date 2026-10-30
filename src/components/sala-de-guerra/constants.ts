export const SALA_SLUG = 'sala-de-guerra-pos-eleicao';

export const SALA_TITLE = 'Sala de Guerra Pós-Eleição';

export const SALA_PAGE_TITLE = 'Sala de Guerra Pós-Eleição | Mundo Pódium';

export const SALA_DESCRIPTION =
  'Garanta sua vaga na Sala de Guerra e entre na Mundo Pódium. Sábado, 31/10, às 10h, ao vivo.';

export const SALA_JOIN_URL =
  'https://plataforma.mundopodium.com.br/join?invitation_token=6081e7a74f962c19c99765d9cdb9dc73ad39107b-37028ed2-b88b-4870-8c95-b76bffcd4cdb';

export const SALA_UNLOCK_URL =
  'https://plataforma.mundopodium.com.br/checkout/plataforma-mundo-podium-casa';

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
  'Entre na Mundo Pódium e acompanhe a sala com aulas abertas, eventos e a comunidade.',
] as const;
