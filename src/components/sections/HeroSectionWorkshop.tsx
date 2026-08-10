'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ProtectedImage } from '@/components/ui/ProtectedImage';
import { trackCTAClick, trackViewContent } from '@/lib/metaPixel';
import { PainPointsMarquee } from './PainPointsMarquee';
import { HeroFeaturesBadge } from '@/components/ui/HeroFeaturesBadge';
import { HeroProofVideoSlot } from '@/components/ui/HeroProofVideoSlot';
import { WorkshopCountdown } from '@/components/ui/WorkshopCountdown';
import {
  WORKSHOP_INFO,
  WORKSHOP_MODULE_2_INFO,
  WORKSHOP_DURATION,
  PLATAFORMA_CASA_URL,
  WORKSHOP_SALES,
  WORKSHOP_PRICING,
  WORKSHOP_CLOSED_COPY,
} from '@/lib/constants';

export const HeroSectionWorkshop: React.FC = () => {
  const [progressWidth, setProgressWidth] = useState<number>(WORKSHOP_SALES.progressPercent);
  const hasTrackedView = useRef(false);
  const salesOpen = WORKSHOP_SALES.isOpen;

  useEffect(() => {
    if (!salesOpen) return;
    setProgressWidth(0);
    const timer = setTimeout(() => {
      setProgressWidth(WORKSHOP_SALES.progressPercent);
    }, 120);
    return () => clearTimeout(timer);
  }, [salesOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasTrackedView.current) {
        trackViewContent('Hero Section Workshop', 'hero-workshop');
        hasTrackedView.current = true;
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCTAClick = () => {
    trackCTAClick(
      salesOpen
        ? 'Hero Section Workshop - CTA Button'
        : 'Hero Section Workshop - Plataforma CTA',
      'hero-workshop'
    );
  };

  const ctaHref = salesOpen ? '#inscricao' : PLATAFORMA_CASA_URL;
  const ctaExternal = !salesOpen;
  const ctaLabel = salesOpen
    ? `Garantir vaga por ${WORKSHOP_PRICING.current}`
    : WORKSHOP_CLOSED_COPY.heroCta;
  const ctaClassName =
    'group relative w-full inline-flex items-center justify-center px-5 py-3 sm:py-3.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-black text-sm sm:text-base rounded-full hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/40 hover:scale-[1.02] button-shine-effect cursor-pointer pointer-events-auto z-10';

  const handleCtaClickWithScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleCTAClick();
    if (salesOpen) {
      e.preventDefault();
      document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const priceBlock = salesOpen ? (
    <div className="inline-flex items-baseline gap-2.5 sm:gap-3">
      <span className="text-gray-500 line-through text-sm sm:text-base font-semibold tabular-nums">
        {WORKSHOP_PRICING.anchor}
      </span>
      <span className="text-yellow-400 font-black text-2xl sm:text-3xl tabular-nums leading-none">
        {WORKSHOP_PRICING.current}
      </span>
    </div>
  ) : (
    <div className="flex flex-col items-center sm:items-start gap-1.5">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-400/10 border border-yellow-400/30 rounded-xl">
        <span className="text-yellow-400 font-bold text-sm sm:text-base">Vagas encerradas</span>
      </div>
      <span className="text-gray-400 text-[9px] sm:text-xs text-center sm:text-left">
        Próxima turma: {WORKSHOP_INFO.dateDisplayLong} e {WORKSHOP_MODULE_2_INFO.dateDisplayLong}
      </span>
    </div>
  );

  /** Preço + CTA + urgência — mesma largura */
  const conversionBlock = (align: 'center' | 'start') => (
    <div
      className={`w-full max-w-[20rem] sm:max-w-sm ${
        align === 'center' ? 'mx-auto' : 'mx-auto sm:mx-0'
      } relative z-10`}
    >
      <div
        className={`flex flex-col gap-3.5 ${
          align === 'center' ? 'items-center' : 'items-center sm:items-start'
        }`}
      >
        {priceBlock}
        <a
          href={ctaHref}
          target={ctaExternal ? '_blank' : undefined}
          rel={ctaExternal ? 'noopener noreferrer' : undefined}
          onClick={handleCtaClickWithScroll}
          className={ctaClassName}
        >
          <span className="relative drop-shadow-sm">{ctaLabel}</span>
        </a>
        {salesOpen && (
          <p
            className={`text-gray-500 text-[9px] sm:text-[10px] leading-relaxed ${
              align === 'center' ? 'text-center' : 'text-center sm:text-left'
            }`}
          >
            Inclui 60 dias na Plataforma + gravação dos módulos
          </p>
        )}
      </div>

      {salesOpen && (
        <div className="mt-5 flex items-end gap-2.5 sm:gap-3 w-full">
          <WorkshopCountdown inlineBoxes />
          <div className="flex-1 min-w-0 pb-0.5 space-y-1.5">
            <p className="text-[10px] sm:text-xs leading-none">
              <span className="text-gray-400">Vagas: </span>
              <span className="text-yellow-400 font-semibold tabular-nums">
                {WORKSHOP_SALES.filledSpots} de {WORKSHOP_SALES.maxSpots}
              </span>
            </p>
            <div className="w-full h-[3px] bg-gray-700/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressWidth}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section className="relative overflow-hidden flex flex-col bg-gray-900 min-h-[85vh] lg:min-h-[calc(100vh-64px)] lg:pb-32">
      {/* Header */}
      <div className="relative z-10 border-b border-gray-800 shrink-0">
        <div className="relative z-30 container-custom py-2.5 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-5 h-5 sm:w-7 sm:h-7 relative flex-shrink-0">
                <ProtectedImage
                  src="/logos-mundo-podium/simbolo_cor.png"
                  alt="Mundo Pódium"
                  width={28}
                  height={28}
                  className="object-contain opacity-100 hover:opacity-70 transition-opacity duration-300"
                  quality={90}
                />
              </div>
              <span className="text-white text-[10px] sm:text-sm font-light tracking-wide">
                <span className="hidden sm:inline">Workshop Destrava Ligações</span>
                <span className="sm:hidden">Workshop</span>
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 text-white relative z-[100]">
              <div className="flex items-center gap-1 relative z-[100]">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span
                  className="text-[10px] sm:text-sm font-bold relative z-[100] tabular-nums"
                  style={{ fontFamily: 'var(--font-ubuntu), sans-serif' }}
                >
                  <span className="hidden sm:inline">
                    {WORKSHOP_INFO.dateDisplayLong}
                    <span className="text-gray-400 font-medium"> e </span>
                    {WORKSHOP_MODULE_2_INFO.dateDisplayLong}
                  </span>
                  <span className="sm:hidden">
                    {WORKSHOP_INFO.dateDisplayShort}
                    <span className="text-gray-400 font-medium"> · </span>
                    {WORKSHOP_MODULE_2_INFO.dateDisplayShort}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-1 relative z-[100]" title="Duração total do workshop">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span
                  className="text-[10px] sm:text-sm font-bold relative z-[100]"
                  style={{ fontFamily: 'var(--font-ubuntu), sans-serif' }}
                >
                  <span className="hidden sm:inline">{WORKSHOP_DURATION.headerLine}</span>
                  <span className="sm:hidden">8h · 2×4h</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile — coluna única centralizada */}
      <div className="lg:hidden relative flex flex-col px-4 pt-8 pb-28">
        <div className="flex flex-col items-center text-center gap-5 mb-8">
          <HeroFeaturesBadge />
          <div className="w-full max-w-[200px]">
            <HeroProofVideoSlot compact />
          </div>
          <h1 className="text-[17px] sm:text-xl font-bold text-white leading-snug drop-shadow-lg max-w-md">
            Transforme o medo de ligar em{' '}
            <span className="text-yellow-400 drop-shadow-md">reuniões qualificadas em 48h</span>
          </h1>
          <p className="text-[11px] text-gray-300 font-light leading-relaxed max-w-md">
            Para quem depende do telefone para fechar negócios. Aprenda a ciência que transforma ligações em
            reuniões. Assista ligações reais ao vivo e saia dominando a Anatomia da Ligação.
          </p>
        </div>
        {conversionBlock('center')}
      </div>

      {/* Desktop — grid 2 colunas + respiro vertical */}
      <div className="hidden lg:flex container-custom relative z-30 flex-1 items-center pb-12 pt-8">
        <div className="grid grid-cols-2 gap-12 xl:gap-16 items-center w-full">
          {/* Coluna copy */}
          <div className="max-w-xl text-left relative z-30">
            <div className="space-y-5">
              <HeroFeaturesBadge className="hover:shadow-yellow-400/20 transition-all duration-300" />
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg">
                Transforme o medo de ligar em{' '}
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                  reuniões qualificadas em 48h
                </span>
              </h1>
              <p className="text-[13px] sm:text-sm text-gray-300 font-light leading-relaxed max-w-lg">
                Para quem depende do telefone para fechar negócios. Aprenda a ciência que transforma ligações em
                reuniões. Assista ligações reais ao vivo e saia dominando a Anatomia da Ligação.
              </p>
            </div>

            <div className="mt-8">{conversionBlock('start')}</div>
          </div>

          {/* Coluna vídeo */}
          <div className="flex justify-end items-center">
            <div className="w-full max-w-sm xl:max-w-md">
              <HeroProofVideoSlot />
            </div>
          </div>
        </div>
      </div>

      <PainPointsMarquee />
    </section>
  );
};
