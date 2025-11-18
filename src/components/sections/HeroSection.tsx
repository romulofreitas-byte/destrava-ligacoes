'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ProtectedImage } from '@/components/ui/ProtectedImage';
import { trackCTAClick, trackViewContent } from '@/lib/metaPixel';

export const HeroSection: React.FC = () => {
  const [progressWidth, setProgressWidth] = useState(0);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    // Small delay to ensure animation is visible
    const timer = setTimeout(() => {
      setProgressWidth(110);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Track hero section view
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasTrackedView.current) {
        trackViewContent('Hero Section', 'hero');
        hasTrackedView.current = true;
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCTAClick = () => {
    trackCTAClick('Hero Section - CTA Button', 'hero');
  };

  return (
    <section className="relative overflow-hidden flex flex-col bg-gray-900 min-h-[85vh] lg:min-h-[calc(100vh-64px)] pt-10 lg:pt-0">

      {/* Header */}
      <div className="relative z-10 border-b border-gray-800">
        <div className="relative z-30 container-custom py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Left - Logo + Title */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 relative flex-shrink-0">
                <ProtectedImage 
                  src="/icon-escuderia.png"
                  alt="Escuderia Pódium"
                  width={32}
                  height={32}
                  className="object-contain opacity-100 hover:opacity-70 transition-opacity duration-300"
                  quality={90}
                />
              </div>
              <span className="text-white text-xs sm:text-sm font-light tracking-wide">
                <span className="hidden sm:inline">Escuderia Pódium | Mentoria em Grupo</span>
                <span className="sm:hidden">Escuderia Pódium</span>
              </span>
            </div>

            {/* Right - Date */}
            <div className="flex items-center gap-1 sm:gap-2 text-white">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs sm:text-sm font-bold" style={{fontFamily: 'var(--font-ubuntu), sans-serif'}}>
                <span className="hidden sm:inline">1º encontro 30/10</span>
                <span className="sm:hidden">30/10</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Hero - Full Viewport Layout */}
      <div className="lg:hidden relative flex-1 flex flex-col">
        {/* Mobile Image Section with Top Padding */}
        <div className="mobile-hero-vignette flex-1 relative pt-8" style={{flexBasis: '70%'}}>
          <div className="relative w-full h-full">
            {/* Background - Same as rest of page */}
            <div className="absolute inset-0 bg-gray-900"></div>
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-transparent"></div>
            
            {/* Mentor Image */}
            <div className="absolute inset-0 flex items-start justify-center" style={{top: '-10px', transform: 'translateX(100px)'}}>
              <div className="relative">
                <ProtectedImage 
                  src="/romulo-hero.png"
                  alt="Rômulo Freitas"
                  width={500}
                  height={500}
                  className="w-3/5 h-auto object-contain"
                  priority
                  quality={80}
                  sizes="(max-width: 768px) 50vw, 100vw"
                />
                {/* Gradiente aplicado diretamente na imagem */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent pointer-events-none z-10"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Text Content Overlay - Positioned over bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 lg:hidden" style={{zIndex: 20, bottom: '30px'}}>
          <div className="max-w-md mx-auto text-center space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center px-2 py-1 bg-red-500/10 border border-red-500/30 rounded-full backdrop-blur-sm shadow-lg animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <span className="text-red-400 font-semibold text-[10px] leading-tight tracking-wide drop-shadow-sm">Vagas Esgotadas • Promo BF 1ª Turma Encerrada</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[17px] sm:text-xl font-bold text-white leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Uma mentoria em grupo{' '}
              <span className="text-yellow-400 drop-shadow-md animate-pulse">híbrida</span>
              {' '}pra você vender e se sentir como um{' '}
              <span className="text-yellow-400 drop-shadow-md animate-pulse" style={{animationDelay: '0.5s'}}>empresário</span>
            </h1>

            {/* Subheadline */}
            <p className="text-[11px] text-gray-300 font-light leading-relaxed drop-shadow-md animate-fade-in-up mb-6" style={{animationDelay: '0.3s'}}>
              6 semanas em grupo + 4 sessões individuais
              <br />
              para fechar seu primeiro contrato antes do fim do ano!
            </p>

            {/* CTA Button with Progress */}
            <div className="flex flex-col items-center space-y-3 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <a 
                href="https://forms.gle/G3uCBJChkXk65K8i9"
                onClick={handleCTAClick}
                className="group relative inline-flex items-center justify-center px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 font-semibold rounded-full transition-all duration-300 hover:bg-red-500 hover:text-white backdrop-blur-sm shadow-lg hover:shadow-red-500/30 hover:scale-[1.01] animate-bounce-subtle text-xs"
              >
                <span className="relative drop-shadow-sm">Entrar na Lista de Espera</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              {/* Progress Bar */}
              <div className="space-y-1 w-full animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                <div className="flex items-center justify-between text-[10px] sm:text-xs">
                  <span className="text-gray-300 drop-shadow-sm">Vagas esgotadas</span>
                  <span className="text-red-400 font-semibold drop-shadow-sm animate-pulse">110%</span>
                </div>
                <div className="w-full h-[2px] sm:h-0.5 bg-gray-800 rounded-full overflow-hidden relative shadow-inner">
                  {/* Filled portion */}
                  <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg transition-all duration-1000" style={{width: `${progressWidth}%`}}></div>
                  {/* Continuous flow animation across entire bar */}
                  <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-red-300/40 to-transparent animate-progress-flow"></div>
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
            <div className="inline-flex items-center px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-4 backdrop-blur-sm shadow-lg hover:shadow-red-500/20 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <span className="text-red-400 font-semibold text-xs tracking-wide drop-shadow-sm">Vagas Esgotadas • Promo BF 1ª Turma Encerrada</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Uma mentoria em grupo{' '}
              <span className="text-yellow-400 drop-shadow-md animate-pulse">híbrida</span>
              {' '}pra você vender e se sentir como um{' '}
              <span className="text-yellow-400 drop-shadow-md animate-pulse" style={{animationDelay: '0.5s'}}>empresário</span>
            </h1>

            {/* Subheadline */}
            <p className="text-[13px] sm:text-base text-gray-300 font-light leading-relaxed mb-6 drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              6 semanas em grupo + 4 sessões individuais para fechar seu primeiro contrato antes do fim do ano e começar a vender como empresário.
            </p>

            {/* CTA Button with Progress */}
            <div className="flex flex-col items-center lg:items-start space-y-2 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <a 
                href="https://forms.gle/G3uCBJChkXk65K8i9"
                onClick={handleCTAClick}
                className="group relative inline-flex items-center justify-center px-4 sm:px-8 py-3 bg-red-500/10 border border-red-500/30 text-red-400 font-semibold rounded-full transition-all duration-300 hover:bg-red-500 hover:text-white backdrop-blur-sm shadow-lg hover:shadow-red-500/30 hover:scale-[1.01] animate-bounce-subtle"
              >
                <span className="relative drop-shadow-sm text-xs sm:text-base">Entrar na Lista de Espera</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              {/* Progress Bar */}
              <div className="space-y-1 w-full animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                <div className="flex items-center justify-between text-[11px] sm:text-sm">
                  <span className="text-gray-300 drop-shadow-sm">Vagas esgotadas</span>
                  <span className="text-red-400 font-semibold drop-shadow-sm animate-pulse">110%</span>
                </div>
                <div className="w-full h-[2px] sm:h-0.5 bg-gray-800 rounded-full overflow-hidden relative shadow-inner">
                  {/* Filled portion */}
                  <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg transition-all duration-1000" style={{width: `${progressWidth}%`}}></div>
                  {/* Continuous flow animation across entire bar */}
                  <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-red-300/40 to-transparent animate-progress-flow"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div className="hidden lg:flex justify-end items-end -mb-20 animate-mentor-fade-in" style={{marginTop: '-160px', animationDelay: '0.8s'}}>
            <div className="relative w-full max-w-lg overflow-visible">
              {/* Gradiente radial circular laranja para disfarçar recorte */}
              <div className="absolute inset-0 -z-10 overflow-visible">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-orange-500/80 via-orange-400/60 to-transparent rounded-full"></div>
              </div>
              
              <div className="relative rounded-2xl overflow-visible">
                <ProtectedImage 
                  src="/romulo-hero.png"
                  alt="Rômulo Freitas"
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain hero-image-blend-natural"
                  priority
                  quality={80}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradiente aplicado diretamente na imagem - fora do grid */}
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent pointer-events-none z-[25]"></div>
    </section>
  );
};
