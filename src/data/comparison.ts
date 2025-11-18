export interface Comparison {
  feature: string;
  atual: string | boolean;
  escuderia: string | boolean;
}

export const comparison: Comparison[] = [
  {
    feature: "Situação Atual",
    atual: "Funcionário de agência",
    escuderia: "Empreendedor independente"
  },
  {
    feature: "Processo Comercial",
    atual: "Sem processo estruturado",
    escuderia: "Método Pódium completo"
  },
  {
    feature: "Controle sobre Vendas",
    atual: "Dependente de terceiros",
    escuderia: "Autonomia total"
  },
  {
    feature: "Renda",
    atual: "Salário fixo limitado",
    escuderia: "Primeiro contrato fechado"
  },
  {
    feature: "Conhecimento",
    atual: "Sem metodologia própria",
    escuderia: "Método validado e testado"
  },
  {
    feature: "Networking",
    atual: "Limitado ao ambiente atual",
    escuderia: "Comunidade de pilotos"
  },
  {
    feature: "Crescimento",
    atual: "Estagnado na posição atual",
    escuderia: "Trajetória ascendente"
  },
  {
    feature: "Certificação",
    atual: false,
    escuderia: "Piloto Pódium - Escuderia"
  }
];

export interface MethodStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export const methodSteps: MethodStep[] = [
  {
    step: 1,
    title: "Definição de ICP",
    description: "Escolher o cliente certo",
    icon: "Target"
  },
  {
    step: 2,
    title: "Construção de Lista",
    description: "Encontrar os clientes",
    icon: "Users"
  },
  {
    step: 3,
    title: "Cold Call",
    description: "Fazer contato inicial",
    icon: "Phone"
  },
  {
    step: 4,
    title: "Reunião de Levantamento",
    description: "Entender a necessidade",
    icon: "MessageCircle"
  },
  {
    step: 5,
    title: "Reunião de Proposta",
    description: "Apresentar solução",
    icon: "Presentation"
  },
  {
    step: 6,
    title: "Fechamento",
    description: "Fechar o contrato",
    icon: "UserCheck"
  }
];
