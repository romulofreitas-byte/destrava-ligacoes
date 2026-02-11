'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ProtectedImage } from '@/components/ui/ProtectedImage';
import { trackCTAClick, trackViewContent } from '@/lib/metaPixel';
import { PainPointsMarquee } from './PainPointsMarquee';

export const HeroSectionWorkshop: React.FC = () => {
  const [progressWidth, setProgressWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setProgressWidth(18); // 18% preenchido
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Track hero section view
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasTrackedView.current) {
        trackViewContent('Hero Section Workshop', 'hero-workshop');
        hasTrackedView.current = true;
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      trackCTAClick('Hero Section Workshop - CTA Button', 'hero-workshop');
      
      // Find the target section
      const targetSection = document.getElementById('inscricao');
      
      if (targetSection) {
        // Prevent default only if we can scroll smoothly
        e.preventDefault();
        // Smooth scroll to the section
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        // If section not found, let the default anchor behavior work
        // Don't prevent default - let browser handle the navigation
        console.warn('Section #inscricao not found, using default anchor behavior');
      }
    } catch (error) {
      // If any error occurs, let the default anchor behavior work
      console.error('Error in CTA click handler:', error);
      // Don't prevent default - let browser handle the navigation
    }
  };

  return (
    <section className="relative overflow-hidden flex flex-col bg-gray-900 min-h-[85vh] lg:min-h-[calc(100vh-64px)] lg:pt-0 lg:pb-20">

      {/* Header */}
      <div className="relative z-10 border-b border-gray-800">
        <div className="relative z-30 container-custom py-1.5 sm:py-2">
          <div className="flex items-center justify-between">
            {/* Left - Logo + Title */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-5 h-5 sm:w-7 sm:h-7 relative flex-shrink-0">
                <ProtectedImage 
                  src="/icon-escuderia.png"
                  alt="Escuderia Pódium"
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

            {/* Right - Date and Time */}
            <div className="flex items-center gap-2 sm:gap-3 text-white relative z-[100]">
              <div className="flex items-center gap-1 relative z-[100]">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[10px] sm:text-sm font-bold relative z-[100]" style={{fontFamily: 'var(--font-ubuntu), sans-serif'}}>
                  <span className="hidden sm:inline">04 de Março</span>
                  <span className="sm:hidden">04/03</span>
                </span>
              </div>
              <div className="flex items-center gap-1 relative z-[100]">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[10px] sm:text-sm font-bold relative z-[100]" style={{fontFamily: 'var(--font-ubuntu), sans-serif'}}>
                  13h
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Hero - Sequential Layout */}
      <div className="lg:hidden relative flex flex-col">
        {/* Badge - Above Image */}
        <div className="px-4 pt-4 pb-2 text-center">
          <div className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full backdrop-blur-sm shadow-lg animate-fade-in-up" style={{animationDelay: '0.05s'}}>
            <span className="text-yellow-400 font-semibold text-[10px] leading-tight tracking-wide drop-shadow-sm whitespace-nowrap">2 módulos • 3h cada • Dias diferentes • Ferramentas Exclusivas • <span className="text-red-400 font-bold">Sem Replay</span></span>
          </div>
        </div>

        {/* Mobile Image Section */}
        <div className="relative w-full" style={{height: '50vh', minHeight: '350px'}}>
          <div className="absolute inset-0 bg-gray-900">
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-transparent"></div>
            
            {/* Mentor Image */}
            <div className="absolute inset-0 flex items-start justify-center" style={{top: '0px', transform: 'translateX(10px)'}}>
              <div className="relative" style={{width: 'calc(60% * 1.3)', height: 'auto'}}>
                <ProtectedImage 
                  src="/romulo-hero.png"
                  alt="Rômulo Freitas"
                  width={650}
                  height={650}
                  className="w-full h-auto object-contain"
                  priority
                  quality={75}
                  sizes="(max-width: 768px) 50vw, 100vw"
                />
                {/* Gradiente aplicado diretamente na imagem */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent pointer-events-none z-10"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Text Content - After Image */}
        <div className="px-4 pb-4 lg:hidden" style={{marginTop: '-60px'}}>
          <div className="max-w-md mx-auto text-center space-y-4">
            {/* Main Headline */}
            <h1 className="text-[17px] sm:text-xl font-bold text-white leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Transforme o medo de ligar em{' '}
              <span className="text-yellow-400 drop-shadow-md animate-pulse">reuniões qualificadas em 48h</span>
            </h1>

            {/* Subheadline */}
            <p className="text-[11px] text-gray-300 font-light leading-relaxed drop-shadow-md animate-fade-in-up mb-6" style={{animationDelay: '0.15s'}}>
              Para quem depende do telefone para fechar negócios. Aprenda a ciência que transforma ligações em reuniões. Assista ligações reais ao vivo e saia com seu script pronto.
            </p>

            {/* Price Display */}
            <div className="mb-4 animate-fade-in-up" style={{animationDelay: '0.17s'}}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 border border-yellow-400/30 rounded-xl">
                <span className="text-gray-400 text-[10px] line-through">De R$ 497</span>
                <span className="text-yellow-400 font-bold text-sm">R$ 297,99</span>
              </div>
              <div className="mt-1.5 flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-400 text-[9px] font-semibold">04 de Março • Sem Replay</span>
                </div>
                {/* Bônus Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-400/10 border border-purple-400/30 rounded-lg">
                  <span className="text-purple-400 text-[9px] font-semibold">🎁 Bônus: Plataforma + Gravação</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="inline-flex flex-col items-center space-y-3 animate-fade-in-up relative z-10" style={{animationDelay: '0.2s'}}>
              <a 
                href="#inscricao"
                onClick={handleCTAClick}
                className="group relative inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-black text-xs rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-2xl hover:shadow-green-500/40 hover:scale-105 button-shine-effect cursor-pointer pointer-events-auto z-10"
              >
                <span className="relative drop-shadow-sm">Garantir vaga por R$ 297,99</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              {/* Progress Bar */}
              <div className="space-y-2 w-full mb-8 animate-fade-in-up" style={{animationDelay: '0.25s'}}>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-300 drop-shadow-sm">Vagas preenchidas</span>
                  <span className="text-green-400 font-semibold drop-shadow-sm animate-pulse">18%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden relative shadow-inner">
                  {/* Filled portion */}
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg transition-all duration-1000" style={{width: isMounted ? `${progressWidth}%` : '0%'}} suppressHydrationWarning></div>
                  {/* Continuous flow animation */}
                  <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-green-300/40 to-transparent animate-progress-flow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop Hero - Original Layout */}
      <div className="hidden lg:flex container-custom relative z-30 flex-1 items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Text Content */}
          <div className="max-w-2xl text-left relative z-30">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-4 backdrop-blur-sm shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.05s'}}>
              <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm whitespace-nowrap">2 módulos • 3h cada • Dias diferentes • Ferramentas Exclusivas • <span className="text-red-400 font-bold">Sem Replay</span></span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-white mb-5 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Transforme o medo de ligar em{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto] drop-shadow-md">reuniões qualificadas em 48h</span>
            </h1>

            {/* Subheadline */}
            <p className="text-[13px] sm:text-sm text-gray-300 font-light leading-relaxed mb-6 drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.15s'}}>
              Para quem depende do telefone para fechar negócios. Aprenda a ciência que transforma ligações em reuniões. Assista ligações reais ao vivo e saia com seu script pronto.
            </p>

            {/* Price Display */}
            <div className="mb-4 animate-fade-in-up" style={{animationDelay: '0.17s'}}>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-800/50 border border-yellow-400/30 rounded-xl">
                <span className="text-gray-400 text-sm line-through">De R$ 497</span>
                <span className="text-yellow-400 font-bold text-xl">R$ 297,99</span>
              </div>
              <div className="mt-2 flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-400 text-xs font-semibold">04 de Março • Sem Replay</span>
                </div>
                {/* Bônus Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-400/10 border border-purple-400/30 rounded-lg">
                  <span className="text-purple-400 text-xs font-semibold">🎁 Bônus: Plataforma + Gravação</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="inline-flex flex-col items-start space-y-2 animate-fade-in-up relative z-10" style={{animationDelay: '0.2s'}}>
              <a 
                href="#inscricao"
                onClick={handleCTAClick}
                className="group relative inline-flex items-center justify-center px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-black text-sm sm:text-base rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-2xl hover:shadow-green-500/40 hover:scale-105 button-shine-effect cursor-pointer pointer-events-auto z-10"
              >
                <span className="relative drop-shadow-sm">Garantir vaga por R$ 297,99</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              {/* Progress Bar */}
              <div className="space-y-2 w-full mb-8 animate-fade-in-up" style={{animationDelay: '0.25s'}}>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-300 drop-shadow-sm">Vagas preenchidas</span>
                  <span className="text-green-400 font-semibold drop-shadow-sm animate-pulse">18%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden relative shadow-inner">
                  {/* Filled portion */}
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg transition-all duration-1000" style={{width: isMounted ? `${progressWidth}%` : '0%'}} suppressHydrationWarning></div>
                  {/* Continuous flow animation */}
                  <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-green-300/40 to-transparent animate-progress-flow"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div className="hidden lg:flex justify-end items-end -mb-32 animate-mentor-fade-in" style={{marginTop: '-120px', animationDelay: '0.8s'}}>
            <div className="relative w-full max-w-[70rem] overflow-visible">
              <div className="relative rounded-2xl overflow-visible">
                <ProtectedImage 
                  src="/romulo-hero.png"
                  alt="Rômulo Freitas"
                  width={1318}
                  height={1318}
                  className="w-full h-auto object-contain hero-image-blend-natural"
                  priority
                  quality={75}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Gradiente aplicado diretamente na imagem - limitado à largura da foto */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent pointer-events-none z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradiente aplicado diretamente na imagem - fora do grid */}
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent pointer-events-none z-[25]"></div>
      
      {/* Pain Points Marquee - Faixa com looping infinito */}
      <PainPointsMarquee />
    </section>
  );
};

