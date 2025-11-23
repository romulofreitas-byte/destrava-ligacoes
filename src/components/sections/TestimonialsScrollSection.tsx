'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { ProtectedImage } from '@/components/ui/ProtectedImage';

// Lista de todos os depoimentos da pasta Testimonials Pódium
const testimonials = [
  '/Testimonials Pódium/IMG_0336.PNG',
  '/Testimonials Pódium/IMG_0337.PNG',
  '/Testimonials Pódium/IMG_0339.PNG',
  '/Testimonials Pódium/IMG_0417.PNG',
  '/Testimonials Pódium/IMG_0450.PNG',
  '/Testimonials Pódium/IMG_0464.PNG',
  '/Testimonials Pódium/IMG_0549.PNG',
  '/Testimonials Pódium/IMG_0576.PNG',
  '/Testimonials Pódium/IMG_0609.PNG',
  '/Testimonials Pódium/IMG_0932.PNG',
  '/Testimonials Pódium/IMG_1241.PNG',
  '/Testimonials Pódium/IMG_1742.PNG',
  '/Testimonials Pódium/IMG_1743.PNG',
  '/Testimonials Pódium/IMG_1867.PNG',
  '/Testimonials Pódium/IMG_2323.PNG',
  '/Testimonials Pódium/IMG_2526.PNG',
  '/Testimonials Pódium/IMG_2695.PNG',
  '/Testimonials Pódium/IMG_2865.PNG',
  '/Testimonials Pódium/IMG_2867.PNG',
  '/Testimonials Pódium/IMG_2868.PNG',
  '/Testimonials Pódium/IMG_2869.PNG',
  '/Testimonials Pódium/IMG_2870.PNG',
  '/Testimonials Pódium/IMG_2872.PNG',
  '/Testimonials Pódium/IMG_3486.PNG',
  '/Testimonials Pódium/IMG_6039.PNG',
  '/Testimonials Pódium/IMG_6301.PNG',
  '/Testimonials Pódium/IMG_7911.PNG',
  '/Testimonials Pódium/IMG_8052.PNG',
  '/Testimonials Pódium/IMG_8264.PNG',
  '/Testimonials Pódium/IMG_8264(1).PNG',
  '/Testimonials Pódium/IMG_8291.PNG',
  '/Testimonials Pódium/IMG_8735.PNG',
  '/Testimonials Pódium/IMG_9469.PNG',
  '/Testimonials Pódium/IMG_9470.PNG',
  '/Testimonials Pódium/IMG_9510.PNG',
  '/Testimonials Pódium/IMG_9582.PNG',
  '/Testimonials Pódium/IMG_9583.PNG',
  '/Testimonials Pódium/IMG_9584.PNG',
  '/Testimonials Pódium/IMG_9755.PNG',
  '/Testimonials Pódium/IMG_9874.PNG',
];

export const TestimonialsScrollSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Duplicar array para criar loop infinito sem "pulo"
  const duplicatedTestimonials = useMemo(() => [...testimonials, ...testimonials], []);

  // Gerar posições iniciais aleatórias para cada coluna (apenas desktop)
  const initialPositions = useMemo(() => {
    // Valores aleatórios entre 0% e 50% (animação vai de 0% a -50%)
    return {
      col1: Math.random() * 50,
      col2: Math.random() * 50,
      col3: Math.random() * 50,
    };
  }, []);

  // IntersectionObserver para detectar quando a seção entra na viewport
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Flag para prevenir duplo toggle entre touch e click
  const touchHandledRef = useRef(false);

  // Toggle pause/resume manual - funciona com clique e touch
  const handleTogglePause = () => {
    setIsManuallyPaused(prev => {
      const newState = !prev;
      setIsPaused(newState);
      return newState;
    });
  };

  // Handle click (funciona em mobile e desktop)
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Se foi touch, não processar click
    if (touchHandledRef.current) {
      touchHandledRef.current = false;
      return;
    }
    handleTogglePause();
  };

  // Handle touch (para mobile)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    touchHandledRef.current = true;
    handleTogglePause();
    // Reset flag após um tempo
    setTimeout(() => {
      touchHandledRef.current = false;
    }, 300);
  };

  // Controlar pause baseado em hover apenas no desktop, mas não interferir com clique manual
  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024 && !isManuallyPaused) {
      setIsHovered(true);
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024 && !isManuallyPaused) {
      setIsHovered(false);
      setIsPaused(false);
    }
  };

  // Determinar se deve estar pausado: manual tem prioridade sobre hover
  const shouldBePaused = isPaused;

  return (
    <section 
      ref={sectionRef}
      id="depoimentos-scroll" 
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <MessageSquare className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">Depoimentos Reais</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            O que{' '}
            <span className="text-yellow-400 drop-shadow-md">pilotos da comunidade</span>
            {' '}estão dizendo
          </h2>

          <p className="text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Depoimentos reais de pilotos, mentorados e audiência do YouTube que transformaram suas ligações
          </p>
        </div>

        {/* Scroll Card Container */}
        <div className="max-w-6xl mx-auto">
          <div 
            ref={containerRef}
            className={`bg-gray-800/40 border-2 rounded-3xl p-3 sm:p-6 lg:p-12 backdrop-blur-xl shadow-2xl transition-all duration-300 relative overflow-hidden group ${
              shouldBePaused ? 'border-yellow-400/50' : 'border-gray-700/50'
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Animated border glow */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 transition-opacity duration-500 animate-shimmer ${
              shouldBePaused ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}></div>
            
            {/* Scroll Container */}
            <div className="relative z-10 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {/* Column 1 */}
                <div className="testimonials-column" style={{ animationDelay: '0s' }}>
                  <div 
                    className={`testimonials-scroll testimonials-scroll-mobile testimonials-scroll-col1 ${shouldBePaused ? 'paused' : 'running'} ${isVisible ? 'visible' : ''}`}
                    style={{
                      '--initial-offset': `-${initialPositions.col1}%`
                    } as React.CSSProperties}
                  >
                    {duplicatedTestimonials.map((testimonial, index) => (
                      <div
                        key={`col1-${index}`}
                        className="mb-2 sm:mb-3 lg:mb-6 bg-gray-900/50 border border-gray-700/30 rounded-xl p-2 sm:p-3 lg:p-3 cursor-pointer select-none"
                        onClick={handleClick}
                        onTouchStart={handleTouchStart}
                      >
                        <div className="relative w-full flex justify-center sm:justify-start md:justify-center">
                          <ProtectedImage
                            src={testimonial}
                            alt={`Depoimento ${index + 1}`}
                            width={250}
                            height={375}
                            className="w-full h-auto rounded-lg object-contain max-w-[250px] sm:max-w-[350px] md:max-w-[400px] mx-auto sm:mx-0 testimonial-image-mobile"
                            loading={index < 25 ? 'eager' : 'lazy'}
                            priority={index < 3}
                            quality={70}
                            sizes="(max-width: 640px) 250px, (max-width: 1024px) 350px, 400px"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2 */}
                <div className="hidden md:block testimonials-column" style={{ animationDelay: '33s' }}>
                  <div 
                    className={`testimonials-scroll testimonials-scroll-col2 ${shouldBePaused ? 'paused' : 'running'} ${isVisible ? 'visible' : ''}`}
                    style={{
                      '--initial-offset': `-${initialPositions.col2}%`
                    } as React.CSSProperties}
                  >
                    {duplicatedTestimonials.map((testimonial, index) => (
                      <div
                        key={`col2-${index}`}
                        className="mb-2 sm:mb-3 lg:mb-6 bg-gray-900/50 border border-gray-700/30 rounded-xl p-2 sm:p-3 lg:p-3 cursor-pointer select-none"
                        onClick={handleClick}
                        onTouchStart={handleTouchStart}
                      >
                        <div className="relative w-full flex justify-center sm:justify-start md:justify-center">
                          <ProtectedImage
                            src={testimonial}
                            alt={`Depoimento ${index + 1}`}
                            width={250}
                            height={375}
                            className="w-full h-auto rounded-lg object-contain max-w-[250px] sm:max-w-[350px] md:max-w-[400px] mx-auto sm:mx-0 testimonial-image-mobile"
                            loading={index < 25 ? 'eager' : 'lazy'}
                            priority={index < 3}
                            quality={70}
                            sizes="(max-width: 640px) 250px, (max-width: 1024px) 350px, 400px"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 3 - Only on desktop */}
                <div className="hidden lg:block testimonials-column" style={{ animationDelay: '67s' }}>
                  <div 
                    className={`testimonials-scroll testimonials-scroll-col3 ${shouldBePaused ? 'paused' : 'running'} ${isVisible ? 'visible' : ''}`}
                    style={{
                      '--initial-offset': `-${initialPositions.col3}%`
                    } as React.CSSProperties}
                  >
                    {duplicatedTestimonials.map((testimonial, index) => (
                      <div
                        key={`col3-${index}`}
                        className="mb-2 sm:mb-3 lg:mb-6 bg-gray-900/50 border border-gray-700/30 rounded-xl p-2 sm:p-3 lg:p-3 cursor-pointer select-none"
                        onClick={handleClick}
                        onTouchStart={handleTouchStart}
                      >
                        <div className="relative w-full flex justify-center sm:justify-start md:justify-center">
                          <ProtectedImage
                            src={testimonial}
                            alt={`Depoimento ${index + 1}`}
                            width={250}
                            height={375}
                            className="w-full h-auto rounded-lg object-contain max-w-[250px] sm:max-w-[350px] md:max-w-[400px] mx-auto sm:mx-0 testimonial-image-mobile"
                            loading={index < 25 ? 'eager' : 'lazy'}
                            priority={index < 3}
                            quality={70}
                            sizes="(max-width: 640px) 250px, (max-width: 1024px) 350px, 400px"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonials-column {
          height: 650px;
          overflow: hidden;
          position: relative;
        }

        .testimonials-scroll {
          display: flex;
          flex-direction: column;
          animation: scroll-up linear infinite;
          will-change: transform;
          animation-fill-mode: both;
          /* Garantir que a animação inicie automaticamente */
          animation-play-state: running;
        }

        /* Aplicar offset inicial apenas no desktop */
        @media (min-width: 1024px) {
          .testimonials-scroll-col1,
          .testimonials-scroll-col2,
          .testimonials-scroll-col3 {
            transform: translateY(var(--initial-offset, 0%));
          }
        }

        /* No mobile, garantir que comece em 0% (sem offset) */
        @media (max-width: 1023px) {
          .testimonials-scroll-col1,
          .testimonials-scroll-col2,
          .testimonials-scroll-col3 {
            transform: translateY(0%);
          }
        }

        /* Estado running - prioridade alta */
        .testimonials-scroll.running {
          animation-play-state: running !important;
        }

        /* Estado paused - prioridade alta */
        .testimonials-scroll.paused {
          animation-play-state: paused !important;
        }

        /* Quando visível, garantir que está rodando (a menos que esteja pausado) */
        .testimonials-scroll.visible:not(.paused) {
          animation-play-state: running !important;
        }

        /* Durações para desktop/tablet */
        @media (min-width: 768px) {
          .testimonials-scroll-col1 {
            animation-duration: 140s;
          }
          .testimonials-scroll-col2 {
            animation-duration: 164s;
          }
          .testimonials-scroll-col3 {
            animation-duration: 186s;
          }
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(var(--initial-offset, 0%));
          }
          100% {
            /* Com 2x o array, animamos 50% para loop perfeito */
            transform: translateY(calc(var(--initial-offset, 0%) - 50%));
          }
        }

        @media (max-width: 1024px) {
          .testimonials-column {
            height: 600px;
          }
        }

        @media (max-width: 768px) {
          .testimonials-column {
            height: 450px;
          }
          
          .testimonials-scroll-mobile {
            animation-duration: 168s !important;
            /* Garantir que a animação inicie automaticamente no mobile */
            animation-play-state: running !important;
          }

          /* No mobile, garantir que sempre esteja rodando quando visível */
          .testimonials-scroll-mobile.visible:not(.paused) {
            animation-play-state: running !important;
          }
        }
      `}</style>
    </section>
  );
};

