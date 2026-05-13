'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Crown,
  Library,
  Video,
  Users,
  ExternalLink,
  Key,
  Calendar,
  Gift,
  Mic2,
  Layers,
  Sparkles,
  Brain,
  BookOpen,
  Gem,
  Laptop,
  TrendingUp,
  Zap,
  Target,
  MonitorPlay,
} from 'lucide-react';
import { WorkshopDepoimentoVideoPlayer } from '@/components/ui/WorkshopDepoimentoVideoPlayer';
import { trackViewContent } from '@/lib/metaPixel';
import { PLATAFORMA_MUNDO_PODIUM_COPY, WORKSHOP_PLATFORM_RULES } from '@/lib/constants';

const CHECKOUT_URL =
  'https://plataforma.mundopodium.com.br/checkout/plataforma-mundo-podium';

const highlights = [
  { k: '~80', unit: '/sem.', label: 'contatos na prática', glow: 'from-yellow-400/20 to-amber-600/10' },
  { k: 'Nicho', unit: '', label: 'marmoraria + discurso técnico', glow: 'from-purple-400/20 to-pink-500/10' },
  { k: 'R1', unit: '', label: 'foco no ganho do cliente', glow: 'from-blue-400/20 to-cyan-500/10' },
];

const mayconInsights = [
  {
    Icon: Brain,
    title: 'Mentalidade',
    line: 'Quem precisa da solução é o cliente — reduz medo da rejeição.',
    accent: 'group-hover:shadow-amber-500/25 border-amber-500/30',
    iconBg: 'from-amber-400/25 to-orange-500/15',
    iconColor: 'text-amber-300',
  },
  {
    Icon: BookOpen,
    title: 'Preparação',
    line: 'Módulo 1 como base: o discurso na ligação é a conclusão do trabalho prévio.',
    accent: 'group-hover:shadow-yellow-400/20 border-yellow-500/30',
    iconBg: 'from-yellow-400/25 to-yellow-600/10',
    iconColor: 'text-yellow-300',
  },
  {
    Icon: Gem,
    title: 'Especialização',
    line: 'De generalista a linguagem do cliente: pedras, margens, parcerias.',
    accent: 'group-hover:shadow-purple-400/25 border-purple-400/35',
    iconBg: 'from-purple-400/25 to-violet-600/15',
    iconColor: 'text-purple-300',
  },
  {
    Icon: Laptop,
    title: 'Playbook',
    line: 'NotebookLM com áudios de reunião para dores e argumentos do setor.',
    accent: 'group-hover:shadow-blue-400/25 border-blue-400/35',
    iconBg: 'from-blue-400/25 to-indigo-600/15',
    iconColor: 'text-blue-300',
  },
  {
    Icon: Target,
    title: 'Ganho na R1',
    line: 'Discurso no que o cliente quer ganhar — mais retenção na primeira reunião.',
    accent: 'group-hover:shadow-green-400/20 border-green-400/30',
    iconBg: 'from-green-400/20 to-emerald-600/15',
    iconColor: 'text-green-300',
  },
  {
    Icon: TrendingUp,
    title: 'Volume',
    line: 'Pico de contatos em uma semana que antes não batia em um mês.',
    accent: 'group-hover:shadow-orange-400/20 border-orange-400/30',
    iconBg: 'from-orange-400/20 to-red-500/10',
    iconColor: 'text-orange-300',
  },
  {
    Icon: Zap,
    title: 'Método',
    line: 'Prático e profissional — metas, mercado e ICP, sem “pitch de coach”.',
    accent: 'group-hover:shadow-yellow-400/30 border-yellow-400/40',
    iconBg: 'from-yellow-400/30 to-amber-500/15',
    iconColor: 'text-yellow-200',
  },
  {
    Icon: MonitorPlay,
    title: 'Tour na Mundo Pódium',
    line: PLATAFORMA_MUNDO_PODIUM_COPY.tourInsightLine,
    accent: 'group-hover:shadow-fuchsia-500/30 border-fuchsia-400/40',
    iconBg: 'from-fuchsia-500/25 to-purple-700/20',
    iconColor: 'text-fuchsia-200',
  },
];

const platformBenefits = [
  {
    id: 'flix',
    short: 'Flix',
    Icon: Library,
    title: 'Pódium Flix',
    tagline: 'Seu catálogo estratégico',
    description:
      'Aulas e trilhas no funil inteiro: recuperação de clientes, multi-canal (e-mail, LinkedIn, WhatsApp, DM), objeções e fechamento — quando a ligação não é o canal certo.',
    panelGradient: 'from-purple-600/20 via-gray-900/40 to-yellow-500/10',
    iconRing: 'from-purple-400 to-yellow-400',
  },
  {
    id: 'reais',
    short: 'Reais',
    Icon: Video,
    title: 'Reuniões reais gravadas',
    tagline: 'Sala de guerra em vídeo',
    description:
      'Decisores de grandes contas na tela: pergunta, silêncio, objeção e fechamento — para perder o medo do “big player”.',
    panelGradient: 'from-blue-600/20 via-gray-900/40 to-cyan-500/10',
    iconRing: 'from-blue-400 to-cyan-400',
  },
  {
    id: 'mentorias',
    short: 'Ao vivo',
    Icon: Users,
    title: 'Mentorias e comunidade',
    tagline: 'Ritmo de piloto',
    description:
      'Segunda, 11h, ao vivo + Apresente-se Piloto: novos membros expõem contexto e a comunidade responde.',
    panelGradient: 'from-amber-600/15 via-gray-900/40 to-orange-500/10',
    iconRing: 'from-amber-400 to-orange-400',
  },
  {
    id: 'circle',
    short: 'Circle',
    Icon: Layers,
    title: 'Hospedado no Circle',
    tagline: 'Ecossistema sério',
    description:
      'Área de membros profissional: método, materiais e rituais — não substituto de grupo solto de WhatsApp.',
    panelGradient: 'from-emerald-600/15 via-gray-900/40 to-teal-500/10',
    iconRing: 'from-emerald-400 to-teal-400',
  },
];

const PLATFORM_CIRCLE_SCREENSHOTS = [
  {
    src: '/Plataforma 1.png',
    alt: 'Captura da plataforma Mundo Pódium no Circle — área de membros e navegação.',
    caption: 'Plataforma no Circle — visão geral',
  },
  {
    src: '/Plataforma 2.png',
    alt: 'Outra captura do ambiente Mundo Pódium no Circle — conteúdos e estrutura.',
    caption: 'Mesmo ecossistema — materiais e rituais',
  },
] as const;

export const PlataformaMundoPodiumSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);
  const [activeBenefit, setActiveBenefit] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            trackViewContent('Plataforma Mundo Podium Section', 'plataforma-mundo-podium');
            hasTrackedView.current = true;
          }
        });
      },
      { threshold: 0.25 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const active = platformBenefits[activeBenefit];
  const ActiveIcon = active.Icon;

  return (
    <section
      ref={sectionRef}
      id="plataforma-mundo-podium"
      className="relative overflow-hidden py-10 sm:py-14 md:py-24 bg-gray-900"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,640px)] h-[min(90vw,640px)] bg-gradient-to-r from-yellow-400/6 to-purple-500/8 rounded-full blur-3xl animate-float pointer-events-none"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="container-custom relative z-10 max-w-6xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-purple-500/15 border border-yellow-400/35 rounded-full backdrop-blur-md shadow-lg shadow-yellow-400/15">
              <Crown className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-yellow-400 font-bold text-sm tracking-wide">
                Mundo Pódium
              </span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.08] drop-shadow-lg">
            O ecossistema que{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-purple-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              sustenta
            </span>{' '}
            o destravamento
          </h2>

          <p className="text-lg sm:text-xl text-gray-400 mb-12 md:mb-14 max-w-2xl mx-auto leading-relaxed">
            Workshop na ligação. Plataforma no Circle para profundidade, ritmo e
            mercado.
          </p>
        </div>

        <div className="mb-12 sm:mb-14 md:mb-20">
          <div className="relative bg-gray-800/30 border-2 border-yellow-400/35 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl backdrop-blur-xl max-w-6xl mx-auto overflow-hidden hover:border-yellow-400/50 hover:shadow-yellow-400/15 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/[0.06] via-transparent to-purple-500/[0.07] pointer-events-none" />
            <div className="relative z-10 text-center mb-5 sm:mb-6 md:mb-8">
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                  <div className="inline-flex items-center gap-2 text-yellow-400/90 text-[11px] sm:text-xs font-bold tracking-widest uppercase">
                    <Mic2 className="w-4 h-4 shrink-0" />
                    Depoimento
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-purple-400/60 bg-purple-950/80 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-purple-200 shadow-md shadow-purple-500/25 backdrop-blur-md">
                    <MonitorPlay className="h-3.5 w-3.5 text-purple-300 shrink-0" />
                    <span className="hidden sm:inline">Com demo da plataforma</span>
                    <span className="sm:hidden">Tour no Circle</span>
                  </div>
                </div>
                <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-white leading-tight px-1">
                  Maycon Ferraz —{' '}
                  <span className="bg-gradient-to-r from-yellow-400 to-amber-200 bg-clip-text text-transparent">
                    depois do workshop
                  </span>
                </h3>
                <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed px-1 hidden md:block">
                  {PLATAFORMA_MUNDO_PODIUM_COPY.mayconVideoSubtitle}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed px-1 md:hidden">
                  {PLATAFORMA_MUNDO_PODIUM_COPY.mayconVideoMobileCompactLine}
                </p>
              </div>

              <div className="mx-auto mt-6 max-w-2xl hidden md:block">
                <div className="relative overflow-hidden rounded-2xl border-2 border-purple-400/55 bg-gradient-to-br from-purple-500/20 via-purple-900/30 to-gray-900/80 p-4 sm:p-5 shadow-xl shadow-purple-500/25 ring-1 ring-purple-400/20">
                  <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,rgba(250,204,21,0.08)_50%,transparent_60%)] animate-shimmer bg-[length:200%_100%] pointer-events-none" />
                  <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-fuchsia-600 shadow-lg shadow-purple-500/40">
                      <MonitorPlay className="h-8 w-8 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="text-purple-200 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-1">
                        Destaque neste vídeo
                      </p>
                      <p className="text-white text-base sm:text-lg font-bold leading-snug">
                        Demonstração da{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-purple-200">
                          plataforma Mundo Pódium
                        </span>{' '}
                        no Circle
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm mt-1.5 max-w-md">
                        {PLATAFORMA_MUNDO_PODIUM_COPY.videoHighlightSupporting}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-10 -mx-1 px-0 sm:mx-0 sm:px-0">
              <WorkshopDepoimentoVideoPlayer variant="hero" />
            </div>
            <div className="relative z-10 mt-4 sm:mt-6">
              <div className="rounded-xl sm:rounded-2xl border border-emerald-400/35 bg-emerald-500/10 px-4 py-3 sm:px-5 sm:py-4 text-left shadow-lg shadow-emerald-500/10">
                <p className="text-emerald-200 text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-1">
                  Observação importante
                </p>
                <p className="text-white text-sm sm:text-base leading-relaxed">
                  {WORKSHOP_PLATFORM_RULES.recordingsHighlight}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-3 text-center">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest">
            No depoimento — caso real
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-8 max-w-4xl mx-auto">
          {highlights.map((h) => (
            <div
              key={h.label}
              className={`relative overflow-hidden rounded-2xl border border-gray-600/50 bg-gradient-to-br ${h.glow} p-6 text-center backdrop-blur-md shadow-lg hover:border-yellow-400/40 hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-yellow-400/5 to-transparent pointer-events-none" />
              <p className="relative text-3xl sm:text-4xl font-black text-white tracking-tight">
                {h.k}
                {h.unit ? (
                  <span className="text-lg sm:text-xl font-bold text-yellow-400/90">{h.unit}</span>
                ) : null}
              </p>
              <p className="relative text-gray-400 text-xs sm:text-sm mt-2 font-medium leading-snug">
                {h.label}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 origin-center scale-x-100 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-xs font-semibold uppercase tracking-widest mb-4">
          O que mudou na prática — resumo do relato
        </p>

        <div className="mb-12 md:mb-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {mayconInsights.map((item) => {
            const InsightIcon = item.Icon;
            return (
              <div
                key={item.title}
                className={`group relative min-w-0 rounded-2xl border bg-gray-900/50 backdrop-blur-xl p-3.5 sm:p-5 cursor-default ${item.accent} shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300`}
              >
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.iconBg} opacity-40 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none`}
                />
                <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div
                    className={`mb-2.5 sm:mb-4 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.iconBg} border border-white/10 shadow-inner shrink-0`}
                  >
                    <InsightIcon className={`h-5 w-5 sm:h-7 sm:w-7 ${item.iconColor}`} strokeWidth={1.75} />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white mb-1 leading-tight">{item.title}</h4>
                  <p className="text-gray-400 text-[11px] sm:text-xs leading-snug sm:text-sm sm:leading-relaxed">
                    {item.line}
                  </p>
                </div>
                <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-yellow-400/40 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
              </div>
            );
          })}
        </div>

        <div className="max-w-6xl mx-auto mb-14 md:mb-16">
          <div className="relative rounded-[28px] p-[1px] bg-gradient-to-br from-purple-500/60 via-yellow-500/35 to-amber-600/40 shadow-2xl shadow-purple-500/10">
            <div className="relative overflow-hidden rounded-[27px] bg-gray-950/90 backdrop-blur-2xl">
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-yellow-500/15 blur-3xl pointer-events-none" />

              <div className="relative z-10 px-4 pt-6 pb-5 sm:px-6 sm:pt-8 md:px-10 md:pt-10 md:pb-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-6 md:mb-8 text-center md:text-left">
                  <div className="mx-auto md:mx-0 max-w-xl md:max-w-none">
                    <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/35 bg-purple-500/10 px-3 py-1.5 mb-3 md:mb-4">
                      <Sparkles className="h-4 w-4 text-purple-300 shrink-0" />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-purple-200/90">
                        Plataforma Mundo Pódium
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                      O que entra no seu{' '}
                      <span className="bg-gradient-to-r from-purple-300 to-yellow-300 bg-clip-text text-transparent">
                        arsenal
                      </span>{' '}
                      depois do workshop
                    </h3>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto md:mx-0 md:text-gray-400 md:text-sm md:text-right leading-relaxed md:max-w-sm">
                    <span className="md:hidden">Escolha um pilar abaixo. Tudo no Circle.</span>
                    <span className="hidden md:inline">
                      Toque em cada pilar para ver o benefício. Tudo no Circle, integrado ao que você
                      vive nos dois módulos ao vivo.
                    </span>
                  </p>
                </div>

                <nav className="md:hidden space-y-2 mb-6" aria-label="Pilares da plataforma">
                  {platformBenefits.map((b, i) => {
                    const RowIcon = b.Icon;
                    const rowOn = i === activeBenefit;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        aria-current={rowOn ? 'true' : undefined}
                        onClick={() => setActiveBenefit(i)}
                        className={`flex w-full min-w-0 items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm font-semibold transition-all ${
                          rowOn
                            ? 'border-yellow-400/55 bg-yellow-400/10 text-white shadow-md shadow-yellow-500/10'
                            : 'border-gray-600/70 bg-gray-800/45 text-gray-300 active:bg-gray-800/70'
                        }`}
                      >
                        <RowIcon
                          className={`h-5 w-5 shrink-0 ${rowOn ? 'text-yellow-400' : 'text-gray-500'}`}
                        />
                        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <span className="truncate">{b.title}</span>
                          <span className="text-[11px] font-normal text-gray-500">{b.tagline}</span>
                        </span>
                      </button>
                    );
                  })}
                </nav>

                <div
                  className="hidden md:flex flex-wrap gap-2 mb-8"
                  role="tablist"
                  aria-label="Pilares da plataforma"
                >
                  {platformBenefits.map((b, i) => {
                    const TabIcon = b.Icon;
                    const isOn = i === activeBenefit;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        role="tab"
                        aria-selected={isOn}
                        onClick={() => setActiveBenefit(i)}
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                          isOn
                            ? 'border-yellow-400/60 bg-yellow-400/15 text-white shadow-lg shadow-yellow-500/15 scale-[1.02]'
                            : 'border-gray-600/60 bg-gray-800/40 text-gray-400 hover:border-purple-400/35 hover:text-gray-200'
                        }`}
                      >
                        <TabIcon className={`h-4 w-4 ${isOn ? 'text-yellow-400' : 'text-gray-500'}`} />
                        {b.short}
                      </button>
                    );
                  })}
                </div>

                <div className="relative min-h-[200px] md:min-h-[220px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id}
                      role="tabpanel"
                      initial={false}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative overflow-hidden rounded-2xl border border-gray-700/60 bg-gradient-to-br ${active.panelGradient} p-6 md:p-8`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                        <div className="flex justify-center md:justify-start">
                          <div
                            className={`relative flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br ${active.iconRing} p-[3px] shadow-2xl`}
                          >
                            <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-gray-950/95">
                              <ActiveIcon className="h-14 w-14 text-white" strokeWidth={1.25} />
                            </div>
                            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-30 blur-md pointer-events-none" />
                          </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <p className="text-yellow-400/90 text-xs font-bold uppercase tracking-widest mb-2">
                            {active.tagline}
                          </p>
                          <h4 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            {active.title}
                          </h4>
                          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl">
                            {active.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-center md:justify-start gap-1.5">
                        {platformBenefits.map((_, dot) => (
                          <button
                            key={dot}
                            type="button"
                            aria-label={`Pilar ${dot + 1}`}
                            onClick={() => setActiveBenefit(dot)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              dot === activeBenefit
                                ? 'w-8 bg-yellow-400'
                                : 'w-2 bg-gray-600 hover:bg-gray-500'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-700/50">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
                    <div>
                      <p className="text-emerald-300/90 text-[11px] font-bold uppercase tracking-widest mb-1">
                        Circle na prática
                      </p>
                      <p className="text-white text-base sm:text-lg font-semibold">
                        Prints do ambiente real da Mundo Pódium
                      </p>
                    </div>
                    <p className="text-gray-500 text-xs sm:text-sm max-w-md sm:text-right leading-relaxed">
                      {PLATAFORMA_MUNDO_PODIUM_COPY.circleScreenshotsNote}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    {PLATFORM_CIRCLE_SCREENSHOTS.map((shot) => (
                      <figure
                        key={shot.src}
                        className="group relative overflow-hidden rounded-2xl border border-gray-700/60 bg-gray-900/80 shadow-lg shadow-black/30 ring-1 ring-white/5 transition-all duration-300 hover:border-yellow-400/25 hover:ring-yellow-400/10"
                      >
                        <div className="relative aspect-[16/10] w-full bg-gray-950">
                          <Image
                            src={shot.src}
                            alt={shot.alt}
                            fill
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
                          />
                        </div>
                        <figcaption className="border-t border-gray-800/80 px-4 py-3 text-center md:text-left">
                          <span className="text-gray-400 text-xs font-medium leading-snug">
                            {shot.caption}
                          </span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-12 rounded-2xl border border-gray-700/50 bg-gray-800/30 p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed text-center sm:text-left">
            Na vitrine, a assinatura avulsa da plataforma costuma aparecer por volta de{' '}
            <span className="text-gray-200 font-medium">
              {WORKSHOP_PLATFORM_RULES.platformPublicPriceLabel}
            </span>
            — só para calibrar o que o ecossistema vale fora do pacote do workshop.
          </p>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-center sm:text-left">
            No workshop você entra no mesmo ambiente no Circle com o foco do evento, além
            das horas ao vivo — por isso o ingresso se compara bem a quem pagaria a
            assinatura avulsa só pela plataforma.
          </p>
          <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-4 py-4 text-center sm:text-left">
            <p className="text-white text-sm font-semibold mb-1">Quer seguir na plataforma?</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Participantes do workshop podem continuar na Mundo Pódium por{' '}
              <span className="text-yellow-400/95 font-semibold">
                {WORKSHOP_PLATFORM_RULES.alumniMonthlyPriceLabel}
              </span>{' '}
              por mês, com condições informadas após o evento.
            </p>
          </div>
          <div className="flex justify-center sm:justify-start pt-1">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-500 hover:text-yellow-400/90 transition-colors border-b border-transparent hover:border-yellow-400/40 pb-0.5"
            >
              Conferir assinatura avulsa na vitrine
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-700/50 bg-gray-800/30 px-4 py-4 backdrop-blur-sm transition-transform hover:scale-[1.02]">
            <Key className="w-8 h-8 text-green-400 shrink-0" />
            <div>
              <p className="text-white font-bold text-sm">Acesso imediato</p>
              <p className="text-gray-500 text-xs">Após a compra</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-gray-700/50 bg-gray-800/30 px-4 py-4 backdrop-blur-sm transition-transform hover:scale-[1.02]">
            <Calendar className="w-8 h-8 text-yellow-400 shrink-0" />
            <div>
              <p className="text-white font-bold text-sm">
                {WORKSHOP_PLATFORM_RULES.includedAccessEndsTitle}
              </p>
              <p className="text-gray-500 text-xs leading-snug">
                {WORKSHOP_PLATFORM_RULES.includedAccessEndsDetail}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-gray-700/50 bg-gray-800/30 px-4 py-4 backdrop-blur-sm transition-transform hover:scale-[1.02]">
            <Gift className="w-8 h-8 text-purple-400 shrink-0" />
            <div>
              <p className="text-white font-bold text-sm">Continuidade</p>
              <p className="text-gray-500 text-xs leading-snug">
                A partir de {WORKSHOP_PLATFORM_RULES.alumniMonthlyPriceLabel}/mês para quem
                participou
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
