export interface Bonus {
  title: string;
  description: string;
  icon: string;
  details: string[];
  color?: string;
  theme?: 'pitstop' | 'community' | 'certification' | 'ai';
  featured?: boolean;
  stat?: { label: string; value: string };
  subtitle?: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
  color?: string;
  details?: string[];
  stat?: { label: string; value: string };
}

export interface Result {
  title: string;
  description: string;
  icon: string;
}

// Reordered: Sala de Ligação first, Agente Pódium last
export const bonuses: Bonus[] = [
  {
    title: "Sala de Ligação da Escuderia",
    subtitle: "O Pit Stop da Sua Jornada Comercial",
    description: "Ligações reais com feedback instantâneo e destravamento em grupo",
    icon: "Phone",
    color: "green",
    theme: "pitstop",
    featured: true,
    stat: { label: "Sessões de Treino", value: "10+" },
    details: [
      "Role play entre pilotos da turma",
      "Feedback em tempo real como pit stop",
      "Ajustes e otimizações ao vivo",
      "Suporte de toda a equipe Escuderia",
      "Destravamento de objeções e bloqueios",
      "Simulações completas de R1 e R2",
      "Treino seguro antes da venda real"
    ]
  },
  {
    title: "Comunidade Pódium Exclusiva",
    description: "Plataforma Circle com acessos exclusivos e networking",
    icon: "Users",
    color: "orange",
    theme: "community",
    details: [
      "Acesso a reuniões gravadas",
      "Mentorias exclusivas",
      "Networking com outros pilotos",
      "Sessões de treinamento",
      "Mentorias da comunidade Pódium",
      "Espaço para compartilhar experiências"
    ]
  },
  {
    title: "Certificação Piloto Pódium",
    description: "Reconhecimento oficial do domínio do Método Pódium",
    icon: "Award",
    color: "blue",
    theme: "certification",
    details: [
      "Certificado oficial 'Piloto Pódium - Escuderia'",
      "Reconhecimento na comunidade",
      "Credibilidade para seus clientes",
      "Badge para redes sociais",
      "Acesso a eventos exclusivos"
    ]
  },
  {
    title: "Agente Pódium",
    description: "Assistente de IA exclusivo para pilotos da Escuderia",
    icon: "Bot",
    color: "purple",
    theme: "ai",
    details: [
      "Pesquisa de mercado automatizada",
      "Geração de scripts personalizados",
      "Criação de propostas sob medida",
      "Preparação de reuniões",
      "Suporte contínuo durante todo o programa"
    ]
  }
];

export interface Benefit {
  title: string;
  description: string;
  icon: string;
  color?: string;
  details?: string[];
  stat?: { label: string; value: string };
}

export const benefits: Benefit[] = [
  {
    title: "Método Comprovado",
    description: "Método Pódium completo testado em múltiplos nichos, do ICP ao fechamento",
    icon: "Target",
    color: "yellow",
    details: [
      "6 etapas estruturadas do primeiro contato ao fechamento",
      "Testado em múltiplos nichos e mercados",
      "Framework replicável e escalável",
      "Acelera o aprendizado em vendas B2B",
      "Metodologia validada em centenas de vendas"
    ],
    stat: { label: "Taxa de Sucesso", value: "87%" }
  },
  {
    title: "Agente Pódium IA",
    description: "Assistente inteligente para pesquisa, scripts e propostas personalizadas",
    icon: "Bot",
    color: "purple",
    details: [
      "Automação de pesquisa de mercado",
      "Geração de scripts personalizados por nicho",
      "Criação de propostas sob medida",
      "Preparação inteligente de reuniões",
      "Integração com ferramentas de IA avançadas"
    ],
    stat: { label: "Economia de Tempo", value: "70%" }
  },
  {
    title: "Sala de Ligação",
    description: "Treino real entre pilotos com feedback em tempo real",
    icon: "Phone",
    color: "green",
    details: [
      "Role play entre pilotos da Escuderia",
      "Feedback em tempo real durante treinos",
      "Simulação completa de reuniões R1 e R2",
      "Treino de técnicas de fechamento",
      "Ambiente seguro para prática e aprendizado"
    ],
    stat: { label: "Média de Sessões", value: "10+" }
  },
  {
    title: "Comunidade Ativa",
    description: "Suporte contínuo de outros pilotos e networking profissional",
    icon: "Users",
    color: "orange",
    details: [
      "Comunidade exclusiva de pilotos",
      "Networking com empreendedores",
      "Acesso a mentoria da comunidade Pódium",
      "Sessões mensais de acompanhamento",
      "Espaço para compartilhar experiências"
    ],
    stat: { label: "Pilotos", value: "150+" }
  }
];

export interface Result {
  title: string;
  description: string;
  icon: string;
}

export const expectedResults: Result[] = [
  {
    title: "Primeiro Contrato Fechado",
    description: "Ou muito próximo disso ao final das 6 semanas",
    icon: "CheckCircle"
  },
  {
    title: "Processo Comercial Estruturado",
    description: "Metodologia completa do ICP ao fechamento",
    icon: "Workflow"
  },
  {
    title: "Scripts Validados",
    description: "Scripts de cold call, R1 e R2 testados e funcionando",
    icon: "FileText"
  },
  {
    title: "Confiança em Ligações",
    description: "Habilidade para fazer ligações estratégicas sem medo",
    icon: "Phone"
  },
  {
    title: "Habilidade em Reuniões",
    description: "Capacidade para conduzir R1 e R2 com maestria",
    icon: "Users"
  },
  {
    title: "Experiência em Negociação",
    description: "Técnicas para lidar com objeções e fechar vendas",
    icon: "UserCheck"
  },
  {
    title: "2-3 Contratos Fechados",
    description: "Ao final das 10 semanas completas",
    icon: "TrendingUp"
  },
  {
    title: "Pipeline Estruturado",
    description: "Processo replicável para escalar suas vendas",
    icon: "BarChart3"
  }
];
