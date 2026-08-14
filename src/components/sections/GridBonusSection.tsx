'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Flag, Calendar, Gift, AlertTriangle, Check } from 'lucide-react';
import { trackCTAClick, trackViewContent } from '@/lib/metaPixel';
import { WORKSHOP_GRID_BONUS, WORKSHOP_SALES } from '@/lib/constants';

const copy = WORKSHOP_GRID_BONUS;

export const GridBonusSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            trackViewContent('GRID Bonus Section', 'grid-bonus');
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

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackCTAClick('GRID Bonus Section - Quero minha vaga', 'grid-bonus');
    document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={sectionRef}
      id="grid-bonus"
      className="relative overflow-hidden py-10 sm:py-14 md:py-24 bg-gray-900"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-16 right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-16 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container-custom relative z-10 max-w-6xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-10">
          <div className="mb-6">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400/20 to-yellow-500/15 border border-yellow-400/35 rounded-full backdrop-blur-md shadow-lg shadow-yellow-400/15">
              <Flag className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-yellow-400 font-bold text-sm tracking-wide uppercase">
                {copy.badge}
              </span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-[1.08] drop-shadow-lg">
            {copy.headlineBefore}{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              {copy.headlineAccent}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {copy.subheadline}
          </p>
        </div>

        <figure className="relative mb-8 md:mb-10">
          <div className="relative rounded-[20px] sm:rounded-[28px] p-[1px] bg-gradient-to-br from-yellow-500/60 via-yellow-500/35 to-amber-600/40 shadow-2xl shadow-yellow-500/15">
            <div className="relative overflow-hidden rounded-[19px] sm:rounded-[27px] bg-gray-950">
              <div className="absolute top-0 inset-x-0 z-10 flex justify-center pointer-events-none">
                <span className="rounded-b-lg bg-yellow-400 px-4 py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-900 shadow-lg">
                  {copy.previewBadge} · {copy.previewNote}
                </span>
              </div>
              <div className="overflow-x-auto">
                <Image
                  src={copy.screenshotSrc}
                  alt={copy.screenshotAlt}
                  width={copy.screenshotWidth}
                  height={copy.screenshotHeight}
                  className="h-auto w-full min-w-[640px]"
                  sizes="(max-width: 1152px) 100vw, 1152px"
                />
              </div>
            </div>
          </div>
          <figcaption className="mt-3 text-center text-gray-500 text-xs sm:text-sm">
            {copy.screenshotCaption}{' '}
            <span className="text-gray-600">· {copy.previewNote}</span>
          </figcaption>
        </figure>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-w-4xl mx-auto mb-10 md:mb-12">
          {copy.highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 rounded-xl border border-gray-700/50 bg-gray-800/30 px-4 py-3"
            >
              <Check className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <span className="text-gray-200 text-sm leading-snug">{item}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto mb-6">
          <div className="rounded-2xl border border-yellow-400/40 bg-yellow-400/10 px-5 py-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Calendar className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-300 font-bold text-xs uppercase tracking-wide">
                {copy.stage1DateDisplay}
              </span>
            </div>
            <p className="text-white text-sm leading-snug">{copy.stage1Detail}</p>
          </div>
          <div className="rounded-2xl border border-gray-600/60 bg-gray-800/40 px-5 py-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Gift className="w-4 h-4 text-amber-300" />
              <span className="text-amber-200 font-bold text-xs uppercase tracking-wide">
                {copy.stage2DateDisplay}
              </span>
            </div>
            <p className="text-white text-sm leading-snug">{copy.stage2Detail}</p>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm max-w-2xl mx-auto mb-8">
          {copy.anchorOfferLead}{' '}
          <strong className="text-yellow-300">{copy.anchorOfferMid}</strong> — {copy.anchorOfferTail}
        </p>

        <div className="max-w-2xl mx-auto mb-8 rounded-2xl border border-emerald-400/35 bg-emerald-500/10 px-5 py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
            <p className="text-emerald-50 text-sm leading-relaxed">
              <strong className="text-white">{copy.warningTitle}</strong> {copy.warningLead}{' '}
              {copy.warningClose}
            </p>
          </div>
        </div>

        <div className="text-center">
          <a
            href="#inscricao"
            onClick={handleCtaClick}
            className="group relative inline-flex items-center justify-center px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-black text-base sm:text-lg rounded-full hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/40 hover:scale-105 button-shine-effect"
          >
            <span className="relative drop-shadow-sm">
              Quero minha vaga na {WORKSHOP_SALES.edition}ª edição
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
