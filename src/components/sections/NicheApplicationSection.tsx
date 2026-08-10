'use client';

import React, { useId, useState } from 'react';
import {
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Shield,
  Scale,
  Calculator,
  Megaphone,
  Users,
  type LucideIcon,
} from 'lucide-react';

type NicheCard = {
  icon: LucideIcon;
  /** Rótulo curto no chip */
  chipLabel: string;
  title: string;
  audience: string;
  bullets: { label: string; text: string }[];
  objections: { quote: string; turn: string }[];
};

/** Ordem: público majoritário primeiro */
const niches: NicheCard[] = [
  {
    icon: Megaphone,
    chipLabel: 'Tráfego',
    title: 'Marketing e Tráfego Pago',
    audience: 'Gestores de tráfego, social media e agências de performance que vendem serviço recorrente.',
    bullets: [
      {
        label: 'Linguagem',
        text: 'Fala de resultado do cliente (leads, CAC, ROI) — não de "postagem" ou "criativo".',
      },
      {
        label: 'Oferta',
        text: 'Abre com diagnóstico rápido da conta/perfil do lead, não com pacote de serviço fechado.',
      },
      {
        label: 'ICP',
        text: 'Adapta para dono de e-commerce, clínica, loja física ou infoprodutor — quem contrata tráfego.',
      },
    ],
    objections: [
      { quote: 'Já tenho um gestor de tráfego', turn: 'Como criar diferencial sem atacar o atual' },
      { quote: 'Não sei se vale o investimento', turn: 'Como conectar a estrutura a resultado, não a preço' },
      { quote: 'Me manda uma proposta', turn: 'Como qualificar antes de gerar orçamento' },
    ],
  },
  {
    icon: Users,
    chipLabel: 'SDR',
    title: 'Agências e Times Comerciais / SDR',
    audience: 'Times comerciais estruturados, SDRs e closers que ligam em volume dentro de uma operação.',
    bullets: [
      {
        label: 'Linguagem',
        text: 'Direta e objetiva — foco em qualificação rápida, não em relacionamento longo.',
      },
      {
        label: 'Processo',
        text: 'Ligação como etapa de um funil com meta e métrica, não conversa isolada.',
      },
      {
        label: 'ICP',
        text: 'Anatomia adaptável para diferentes verticais atendidas pela agência ou time.',
      },
    ],
    objections: [
      { quote: 'Não é hora, me liga depois', turn: 'Como manter o controle do follow-up' },
      { quote: 'Isso já foi decidido por outra área', turn: 'Como identificar o decisor real' },
      { quote: 'Manda um e-mail', turn: 'Como manter a ligação como canal principal' },
    ],
  },
  {
    icon: Shield,
    chipLabel: 'Seguros',
    title: 'Seguros e Planos de Saúde',
    audience: 'Corretores e consultores que vendem por telefone e WhatsApp.',
    bullets: [
      {
        label: 'Linguagem',
        text: 'Foco em proteção, clareza e confiança — sem pressão de “fechar agora” que gera desconfiança.',
      },
      {
        label: 'Abordagem',
        text: 'Diagnóstico rápido da carteira atual e da lacuna de cobertura antes de falar de produto.',
      },
      {
        label: 'Virada',
        text: 'Transforma “manda a cotação” em conversa de valor com o decisor no telefone.',
      },
    ],
    objections: [
      { quote: 'Já tenho corretor', turn: 'Como criar diferencial sem atacar o concorrente' },
      { quote: 'Isso é golpe?', turn: 'Como estabelecer credibilidade em segundos' },
      { quote: 'Me manda a cotação por WhatsApp', turn: 'Como manter a conversa no telefone' },
    ],
  },
  {
    icon: Scale,
    chipLabel: 'Jurídico',
    title: 'Jurídico',
    audience: 'Advogados captando clientes no digital e no telefone.',
    bullets: [
      {
        label: 'Linguagem',
        text: 'Tom profissional e ético — sem “vendedor agressivo”, com foco em orientação e encaixe.',
      },
      {
        label: 'Abordagem',
        text: 'Qualificação de urgência e tipo de demanda antes de propor reunião.',
      },
      {
        label: 'Posicionamento',
        text: 'Prospecção ativa como extensão do atendimento, não como “empurrar processo”.',
      },
    ],
    objections: [
      { quote: 'Isso é permitido pela OAB?', turn: 'Como enquadrar a abordagem dentro do ético' },
      { quote: 'Advogado bom não precisa ligar', turn: 'Como reframear prospecção como serviço' },
      { quote: 'Já tenho advogado', turn: 'Como abrir espaço sem desqualificar o atual' },
    ],
  },
  {
    icon: Calculator,
    chipLabel: 'Contabilidade',
    title: 'Contabilidade',
    audience: 'Contadores e escritórios que precisam gerar agenda de reuniões.',
    bullets: [
      {
        label: 'Linguagem',
        text: 'Consultiva e técnica — fala a língua do empresário sem soar “vendedor de pacote”.',
      },
      {
        label: 'Oferta',
        text: 'Abre conversa por dor fiscal/operacional concreta, não por “venha conhecer o escritório”.',
      },
      {
        label: 'ICP',
        text: 'Anatomia adaptável para MEI, PME e empresas em crescimento com dores distintas.',
      },
    ],
    objections: [
      { quote: 'Meu contador atual já resolve', turn: 'Como gerar curiosidade sem atacar' },
      { quote: 'Isso é coisa de vendedor, não de contador', turn: 'Como reposicionar a ligação' },
      { quote: 'Me manda no WhatsApp', turn: 'Como manter o telefone como canal principal' },
    ],
  },
  {
    icon: TrendingUp,
    chipLabel: 'Investimentos',
    title: 'Investimentos',
    audience: 'Assessores, agentes autônomos, AAIs...',
    bullets: [
      {
        label: 'Gera curiosidade sem promessas',
        text: 'A Anatomia evita promessas financeiras e foca em educação',
      },
      {
        label: 'Respeita regulações',
        text: 'Linguagem adequada para mercados regulamentados',
      },
      {
        label: 'ICP',
        text: 'Abordagem adaptável a decisores com agenda apertada e já assessorados.',
      },
    ],
    objections: [
      { quote: 'Já tenho assessor', turn: 'Como criar valor diferencial' },
      { quote: 'Não tenho tempo', turn: 'Como gerar urgência e interesse' },
      { quote: 'Me manda no WhatsApp', turn: 'Como manter a conversa no telefone' },
    ],
  },
];

export const NicheApplicationSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [panelKey, setPanelKey] = useState(0);
  const baseId = useId();
  const niche = niches[activeIndex];
  const Icon = niche.icon;

  const selectNiche = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setPanelKey((k) => k + 1);
  };

  return (
    <section id="aplicacao-nicho" className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-10 w-80 h-80 bg-gray-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20">
            <Briefcase className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">
              Aplicação no Seu Nicho
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            Como o método se adapta ao{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              seu nicho
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            A estrutura é a mesma. A linguagem, as objeções e a virada de jogo mudam conforme o seu mercado.
            Escolha o seu nicho abaixo.
          </p>
        </div>

        {/* Chips / tabs */}
        <div
          role="tablist"
          aria-label="Nichos de aplicação"
          className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto mb-8"
        >
          {niches.map((n, index) => {
            const ChipIcon = n.icon;
            const selected = index === activeIndex;
            const tabId = `${baseId}-tab-${index}`;
            const panelId = `${baseId}-panel`;
            return (
              <button
                key={n.title}
                type="button"
                role="tab"
                id={tabId}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectNiche(index)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const dir = e.key === 'ArrowRight' ? 1 : -1;
                    const next = (index + dir + niches.length) % niches.length;
                    selectNiche(next);
                    document.getElementById(`${baseId}-tab-${next}`)?.focus();
                  }
                }}
                className={[
                  'inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-200',
                  'border backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/60',
                  selected
                    ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400 shadow-md shadow-yellow-400/15'
                    : 'bg-gray-800/50 border-gray-600/40 text-gray-300 hover:border-gray-500/60 hover:text-white',
                ].join(' ')}
              >
                <ChipIcon className="w-3.5 h-3.5 shrink-0 opacity-90" aria-hidden />
                {n.chipLabel}
              </button>
            );
          })}
        </div>

        {/* Painel único */}
        <div
          key={panelKey}
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${activeIndex}`}
          className="max-w-3xl mx-auto animate-fade-in-up"
        >
          <div className="bg-gray-800/40 border border-yellow-400/25 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/30 rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">{niche.title}</h3>
            </div>

            <p className="text-gray-300 text-sm mb-5 leading-relaxed">{niche.audience}</p>

            <div className="space-y-3 mb-5">
              {niche.bullets.map((b) => (
                <div key={b.label} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <strong className="text-white">{b.label}:</strong> {b.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-5 border-t border-gray-700/50">
              <p className="text-yellow-400 font-semibold text-sm mb-3">
                Objeções comuns que você vai aprender a quebrar:
              </p>
              <ul className="space-y-2.5 text-gray-300 text-sm">
                {niche.objections.map((o) => (
                  <li key={o.quote} className="flex items-start space-x-2">
                    <span className="text-yellow-400 shrink-0">•</span>
                    <span>
                      &quot;{o.quote}&quot; → {o.turn}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
