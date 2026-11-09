/** Copy da edição Corretores. Sem a 14ª edição. */

export const CORRETORES_OG = {
  title: 'Workshop Destrava Ligações · Corretores',
  description:
    'Segunda 09/11 e quarta 11/11, 13h, ao vivo, 3h30 por encontro. Para corretores de saúde, seguros e consórcio.',
  image: '/og/workshop-corretores.png',
  imageAlt: 'Workshop ao vivo para corretores. Aprenda a ligar para quem não te conhece.',
};

export const CORRETORES_INSTAGRAM_URL = 'https://instagram.com/romulodebh';

export const CORRETORES_PLATAFORMA_PADRAO = 'https://casa.mundopodium.com.br';

export const CORRETORES_WHATSAPP_URL = 'https://chat.whatsapp.com/F82ZRlJ0NSf9TQ7kz03nAj';

/** P6: revisão jurídica. Esvazie a string para tirar o bloco da página. */
export const CORRETORES_AVISO_REGRAS =
  'Inclui o que pode e o que não pode na ligação: aviso de gravação, listas de bloqueio e, no consórcio, nada de promessa de contemplação.';

export const CORRETORES_PARA_QUEM = [
  'Vende saúde, seguros ou consórcio por telefone e WhatsApp.',
  'Tem carteira, renovações ou uma lista de empresas e pessoas para ligar.',
  'Quer ligar para empresa (PME), para quem tem CNPJ ou para pessoa física.',
  'Topa ligar de verdade e ouvir como a sua ligação soa.',
];

export const CORRETORES_NAO_E = [
  'Quer um texto mágico que dispense ligar.',
  'Acha que WhatsApp substitui o telefone.',
  'Vai só assistir e não vai ligar.',
];

export const CORRETORES_DORES = [
  {
    fala: 'Já tenho plano',
    texto:
      'Costuma ser resposta automática, não decisão. O que você fala depois dela define se a ligação continua.',
  },
  {
    fala: 'Me manda a cotação',
    texto:
      'Ele pediu, você mandou, ele sumiu. A mensagem deixa a decisão na mão dele. A ligação, não.',
  },
  {
    fala: 'O silêncio depois da cotação',
    texto:
      'Ele não desistiu. Está resolvendo vários problemas, e a sua cotação ficou no meio.',
  },
];

export const CORRETORES_LEVA = [
  {
    titulo: 'Abrir a ligação sem soar como telemarketing.',
    texto:
      'Nome com energia, apresentação, motivo e a especialidade certa, sem "desculpa incomodar" e sem cair na primeira objeção.',
  },
  {
    titulo: 'Conduzir até um próximo passo com data e hora.',
    texto: 'Gancho de dor, pergunta direcionada, empatia e o convite fechado.',
  },
  {
    titulo: 'Responder "já tenho" sem brigar.',
    texto:
      'Concordar primeiro, reconectar depois. Cada "não" termina em um desfecho, como a data de renovação e o retorno marcado.',
  },
  {
    titulo: 'Voltar no cliente sem cobrar.',
    texto: 'Primeiro a ligação, depois a mensagem em bloco, em quatro passos.',
  },
  {
    titulo: 'Ligar para a sua carteira.',
    texto:
      'Renovação e cross-sell como primeiras ligações: menos medo, mais chance de a conversa render.',
  },
];

export const CORRETORES_PROGRAMA: {
  quando: string;
  destaque?: string;
  itens: string[];
}[] = [
  {
    quando: 'Segunda, 09/11 · 13h',
    itens: [
      'Abertura e as dores da turma',
      'Mentalidade enxuta: meta, ansiedade, a regra dos 5 minutos',
      'Estudo de mercado da sua vertical, rodado com IA, com fonte conferida',
      'A Anatomia da Ligação: abertura e gancho montados com o seu estudo',
      'Treino da abertura em trios',
      'Tarefa de terça: 5 ligações reais com a sua lista',
    ],
  },
  {
    quando: 'Terça, 10/11 · horário comercial',
    destaque:
      '5 ligações reais, com a sua lista. Você publica o resultado dentro do evento, na plataforma.',
    itens: [
      'Você faz as 5 ligações da sua lista e anota as objeções. As ligações são transcritas e avaliadas.',
    ],
  },
  {
    quando: 'Quarta, 11/11 · 13h',
    itens: [
      'Revisão e banco de objeções da turma',
      'Simulação com cliente difícil',
      'A ligação de retorno e a mensagem em bloco',
      'Ligação ao vivo com feedback na hora',
      'Reescrita da abertura de cada um',
      'Plano de 30 dias',
    ],
  },
];

export const CORRETORES_ABERTURAS = [
  {
    id: 'saude',
    rotulo: 'Saúde',
    exemplo: 'Oi, [Nome]. Aqui é o [seu nome], da [corretora]. O plano de saúde da empresa está com você?',
  },
  {
    id: 'seguros',
    rotulo: 'Seguros',
    exemplo: 'Oi, [Nome]. Aqui é o [seu nome], da [corretora]. O seguro de vocês vence quando?',
  },
  {
    id: 'consorcio',
    rotulo: 'Consórcio',
    exemplo:
      'Oi, [Nome]. Aqui é o [seu nome], da [corretora]. Vocês estão pensando em comprar [imóvel, carro ou máquina]?',
  },
] as const;

export const CORRETORES_TRILHAS = [
  {
    nome: 'Empresa',
    quem: 'Quem atende',
    muda: 'Secretária. O papo é com o decisor.',
  },
  {
    nome: 'Profissional com CNPJ',
    quem: 'Quem atende',
    muda: 'A secretária filtra. Quem decide é ele.',
  },
  {
    nome: 'Pessoa física',
    quem: 'Quem atende',
    muda: 'A família entra na conversa.',
  },
];

export const CORRETORES_OFERTA_ITENS: { texto: string; destaque?: boolean }[] = [
  { texto: 'Dois encontros ao vivo (09 e 11/11)' },
  { texto: 'Manual de destravamento' },
  { texto: 'Prompts prontos' },
  { texto: 'Planilha de metas' },
  { texto: 'Treino em trios e ligação ao vivo com feedback' },
  { texto: 'Avaliação das 5 ligações da tarefa de terça' },
  { texto: 'Gravação dos encontros na plataforma', destaque: true },
  {
    texto: 'Acesso à plataforma exclusiva do Mundo Pódium por 90 dias, com a Sala de Ligação',
    destaque: true,
  },
];

export const CORRETORES_FAQ = [
  {
    pergunta: 'Quando e onde é?',
    resposta:
      'Segunda, 09/11, e quarta, 11/11, a partir das 13h, ao vivo, com cerca de 3h30 por encontro, dentro da plataforma exclusiva do Mundo Pódium. O acesso chega por e-mail e no grupo da turma no WhatsApp.',
  },
  {
    pergunta: 'Serve para saúde, seguros e consórcio?',
    resposta:
      'Sim. A ordem da ligação é a mesma. Muda a linguagem de cada um, e você trabalha com a sua vertical.',
  },
  {
    pergunta: 'Preciso ter experiência com ligação?',
    resposta:
      'Não. Quem tem medo de ligar sai com a abertura pronta e a primeira rodada de ligações feita.',
  },
  {
    pergunta: 'Vou ter que ligar ao vivo?',
    resposta:
      'Nos encontros, uma parte da turma liga ao vivo e os outros avaliam, e todo mundo treina em trio. Na terça você liga para a sua própria lista.',
  },
  {
    pergunta: 'O que é a tarefa de terça?',
    resposta:
      'Cinco ligações reais, em horário comercial, para a sua lista ou carteira. As ligações são transcritas e avaliadas.',
  },
  {
    pergunta: 'Posso ligar para a minha carteira?',
    resposta:
      'Sim, e recomendamos. Renovação e consórcio para quem já tem seguro são boas primeiras ligações.',
  },
  {
    pergunta: 'Preciso ter lista pronta?',
    resposta:
      'Não precisa estar pronta. Traga o que tiver: carteira, cotações paradas, empresas que você queria ligar.',
  },
  {
    pergunta: 'Como pago?',
    resposta: 'Pix ou cartão, pelo checkout seguro. A confirmação do Pix e do cartão é imediata.',
  },
  {
    pergunta: 'Tem garantia?',
    resposta:
      'Sim. Se você participar dos dois encontros e fizer as simulações e as ligações, pode pedir a devolução. O prazo é o do vídeo da garantia.',
  },
  {
    pergunta: 'Vai ter gravação?',
    resposta: 'Sim. Os encontros ficam gravados na plataforma.',
  },
  {
    pergunta: 'E depois dos dois encontros?',
    resposta:
      'Você fica com acesso à plataforma exclusiva do Mundo Pódium por 90 dias e continua ligando com a turma na Sala de Ligação.',
  },
  {
    pergunta: 'Até quando posso me inscrever?',
    resposta:
      'O preço de R$597 vale até quarta, 11/11, às 13h. As inscrições encerram nesse horário.',
  },
];

export const CORRETORES_PROVA = [
  {
    id: 'gleice',
    imageSrc:
      '/depoimentos-2026-ready/gallery/gallery_workshop_gleice-souza-agradece-o-workshop-elogian.png',
    imageAlt:
      'Depoimento de Gleice Souza: workshop cobriu cada nicho com exemplos práticos e aumentou a confiança',
    highlight: 'Não teve um nicho sequer que você não soubesse explicar',
    name: 'Gleice Souza',
    company: 'Participante do Workshop',
    bodyQuote:
      'Você é um cara extremamente inteligente e dinâmico. Não teve um nicho sequer que você não soubesse explicar como abordar; sempre trazendo exemplos práticos e reais que facilitam muito o entendimento. Saí do workshop muito mais confiante, com a mente mais aberta e cheia de novas estratégias para aplicar no dia a dia.',
  },
  {
    id: 'igor',
    imageSrc: '/depoimentos/depoimento-igor-carvalhosa.png',
    imageAlt: 'Depoimento real de Igor Carvalhosa sobre o Workshop Destrava Ligações',
    highlight: 'Vale mais de 2 mil reais fácil',
    name: 'Igor Carvalhosa',
  },
];

// TODO: depoimento de corretor (saúde, seguros ou consórcio), só com autorização confirmada pelo dono
