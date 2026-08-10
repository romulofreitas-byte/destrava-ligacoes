'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Crown,
  Library,
  Users,
  ExternalLink,
  Key,
  Calendar,
  Gift,
  Mic2,
  Phone,
  Sparkles,
  MonitorPlay,
  ArrowRight,
  Trophy,
} from 'lucide-react';
import { WorkshopDepoimentoVideoPlayer } from '@/components/ui/WorkshopDepoimentoVideoPlayer';
import { trackViewContent } from '@/lib/metaPixel';
import {
  PLATAFORMA_MUNDO_PODIUM_COPY,
  WORKSHOP_PLATFORM_RULES,
  PLATAFORMA_CASA_URL,
} from '@/lib/constants';

const CASA_URL = PLATAFORMA_CASA_URL;
const copy = PLATAFORMA_MUNDO_PODIUM_COPY;

const proofBeats = [
  {
    k: 'Veja',
    label: 'Ligações reais ao vivo — sem ator, sem corte',
  },
  {
    k: 'Pratique',
    label: 'A Sala de Ligação é sua para treinar',
  },
  {
    k: 'Evolua',
    label: 'Feedback ao vivo + comunidade que cobra',
  },
] as const;

const platformBenefits = [
  {
    id: 'sala',
    short: 'Sala',
    Icon: Phone,
    title: 'Sala de Ligação ao vivo',
    tagline: 'O coração da casa',
    description:
      'Cold call de verdade: cliente real do outro lado, correção na hora. Você não assiste — você liga.',
    panelGradient: 'from-green-600/20 via-gray-900/40 to-emerald-500/10',
    iconRing: 'from-green-400 to-emerald-400',
  },
  {
    id: 'mentorias',
    short: 'Mentorias',
    Icon: Users,
    title: 'Mentorias Segunda e Quinta, 11h',
    tagline: 'Acompanhamento ao vivo',
    description:
      'Dois encontros por semana com o Rômulo e a turma — dúvidas reais, análise de ligação e ritmo pra não cair no limbo.',
    panelGradient: 'from-yellow-600/20 via-gray-900/40 to-yellow-500/10',
    iconRing: 'from-yellow-400 to-yellow-500',
  },
  {
    id: 'flix',
    short: 'Flix',
    Icon: Library,
    title: 'PódiumFlix',
    tagline: 'Biblioteca de aulas',
    description:
      'Catálogo estratégico: funil, objeções, fechamento e o que rever quando a ligação não é o canal.',
    panelGradient: 'from-amber-600/15 via-gray-900/40 to-yellow-500/10',
    iconRing: 'from-amber-400 to-yellow-400',
  },
  {
    id: 'comunidade',
    short: 'Casa',
    Icon: Trophy,
    title: 'Comunidade e Corrida ao Vivo',
    tagline: 'Ritmo de Piloto',
    description:
      'Central, chat e gamificação: interagir, participar e postar conquista viram pontos — e pontos viram brindes.',
    panelGradient: 'from-gray-600/15 via-gray-900/40 to-gray-700/10',
    iconRing: 'from-gray-400 to-gray-500',
  },
];

const PLATFORM_CIRCLE_SCREENSHOTS = [
  {
    src: '/Plataforma 1.png',
    alt: 'Captura da Plataforma Mundo Pódium no Circle — área de membros e navegação.',
  },
  {
    src: '/Plataforma 2.png',
    alt: 'Outra captura do ambiente Mundo Pódium no Circle — conteúdos e estrutura.',
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
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container-custom relative z-10 max-w-6xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-yellow-500/15 border border-yellow-400/35 rounded-full backdrop-blur-md shadow-lg shadow-yellow-400/15">
              <Crown className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-yellow-400 font-bold text-sm tracking-wide">
                {copy.eyebrow}
              </span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.08] drop-shadow-lg">
            {copy.headlineBefore}{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              {copy.headlineAccent}
            </span>{' '}
            {copy.headlineAfter}
          </h2>

          <p className="text-lg sm:text-xl text-gray-400 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            {copy.subhead}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-12 md:mb-16 max-w-3xl mx-auto">
            {proofBeats.map((beat) => (
              <div
                key={beat.k}
                className="rounded-2xl border border-gray-700/60 bg-gray-800/25 px-4 py-4 text-center backdrop-blur-md"
              >
                <p className="text-yellow-400 font-bold text-sm tracking-wide mb-1">{beat.k}</p>
                <p className="text-gray-400 text-xs leading-snug">{beat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12 sm:mb-14 md:mb-16">
          <div className="relative bg-gray-800/30 border-2 border-yellow-400/35 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl max-w-6xl mx-auto overflow-hidden hover:border-yellow-400/50 hover:shadow-yellow-400/15 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/[0.06] via-transparent to-yellow-500/[0.07] pointer-events-none" />
            <div className="relative z-10 text-center mb-5 sm:mb-6">
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                  <div className="inline-flex items-center gap-2 text-yellow-400/90 text-[11px] sm:text-xs font-bold tracking-widest uppercase">
                    <Mic2 className="w-4 h-4 shrink-0" />
                    Depoimento
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-yellow-400/60 bg-yellow-950/80 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-yellow-200 shadow-md shadow-yellow-500/25 backdrop-blur-md">
                    <MonitorPlay className="h-3.5 w-3.5 text-yellow-300 shrink-0" />
                    <span className="hidden sm:inline">Com demo da casa</span>
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
                  {copy.mayconVideoSubtitle}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed px-1 md:hidden">
                  {copy.mayconVideoMobileCompactLine}
                </p>
              </div>
            </div>
            <div className="relative z-10">
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

        <div className="max-w-6xl mx-auto mb-12 md:mb-14">
          <div className="relative rounded-[28px] p-[1px] bg-gradient-to-br from-yellow-500/60 via-yellow-500/35 to-amber-600/40 shadow-2xl shadow-yellow-500/10">
            <div className="relative overflow-hidden rounded-[27px] bg-gray-950/90 backdrop-blur-2xl">
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-yellow-500/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-yellow-500/15 blur-3xl pointer-events-none" />

              <div className="relative z-10 px-4 pt-6 pb-5 sm:px-6 sm:pt-8 md:px-10 md:pt-10 md:pb-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-6 md:mb-8 text-center md:text-left">
                  <div className="mx-auto md:mx-0 max-w-xl md:max-w-none">
                    <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/35 bg-yellow-500/10 px-3 py-1.5 mb-3 md:mb-4">
                      <Sparkles className="h-4 w-4 text-yellow-300 shrink-0" />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-yellow-200/90">
                        {copy.arsenalEyebrow}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                      {copy.arsenalTitleBefore}{' '}
                      <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                        {copy.arsenalTitleAccent}
                      </span>{' '}
                      {copy.arsenalTitleAfter}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto md:mx-0 md:text-gray-400 md:text-right leading-relaxed md:max-w-sm">
                    {copy.arsenalHelper}
                  </p>
                </div>

                <nav className="md:hidden space-y-2 mb-6" aria-label="Frentes da casa">
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
                  aria-label="Frentes da casa"
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
                            : 'border-gray-600/60 bg-gray-800/40 text-gray-400 hover:border-yellow-400/35 hover:text-gray-200'
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
                            aria-label={`Frente ${dot + 1}`}
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
                  <p className="text-center text-gray-500 text-xs mb-5">
                    {copy.circleScreenshotsNote}
                  </p>
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
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-10 rounded-2xl border border-yellow-400/30 bg-gradient-to-br from-yellow-400/10 via-gray-800/40 to-gray-800/20 p-5 sm:p-7 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="text-center sm:text-left">
              <p className="text-gray-300 text-sm leading-relaxed">
                {copy.accessBlurbLead}{' '}
                <span className="text-white font-medium">
                  {WORKSHOP_PLATFORM_RULES.includedAccessEndsDetail}
                </span>
                . {copy.accessBlurbMid}{' '}
                <span className="text-yellow-400 font-semibold">
                  {WORKSHOP_PLATFORM_RULES.alumniMonthlyPriceLabel}/mês
                </span>{' '}
                {copy.accessBlurbTail}
              </p>
            </div>
            <a
              href={CASA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 shrink-0 rounded-xl border border-yellow-400/50 bg-yellow-400/15 px-5 py-3 text-sm font-bold text-yellow-200 hover:bg-yellow-400/25 hover:border-yellow-400/70 hover:text-white transition-all shadow-lg shadow-yellow-500/10"
            >
              {copy.accessCta}
              <ArrowRight className="w-4 h-4" />
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-700/50 bg-gray-800/30 px-4 py-4 backdrop-blur-sm transition-transform hover:scale-[1.02]">
            <Key className="w-8 h-8 text-green-400 shrink-0" />
            <div>
              <p className="text-white font-bold text-sm">Acesso imediato</p>
              <p className="text-gray-500 text-xs">Após a compra do ingresso</p>
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
            <Gift className="w-8 h-8 text-yellow-400 shrink-0" />
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
