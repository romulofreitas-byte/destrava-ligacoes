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
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Detectar se está em mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar no mount
    checkMobile();

    // Adicionar listener para resize
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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

  // IntersectionObserver para detectar quando a seção entra na viewport (com margem antecipada)
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
        threshold: 0,
        rootMargin: '300px',
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle touch start - pausa quando o usuário toca/segura
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPaused(true);
  };

  // Handle touch end - retoma quando o usuário solta
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPaused(false);
  };

  // Handle mouse down - pausa quando o usuário clica/segura (desktop)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPaused(true);
  };

  // Handle mouse up - retoma quando o usuário solta (desktop)
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPaused(false);
  };

  // Também retomar quando o mouse sai do elemento (caso o usuário arraste para fora)
  const handleMouseLeave = () => {
    setIsPaused(false);
  };

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

          <p className="text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up mb-4" style={{animationDelay: '0.3s'}}>
            Depoimentos reais de pilotos, mentorados e audiência do YouTube que transformaram suas ligações
          </p>
          
          <p className="text-xs text-gray-400 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.35s'}}>
            <span className="text-blue-400">Profissionais de mercados regulamentados usam cold call diariamente.</span> Quando aprendem a ligar com estrutura, agenda qualifica mais rápido.
          </p>
          
          {/* Placeholder para futuros prints de prova social */}
          {/* TODO: Adicionar prints de ligação, alunos, ROI, agendas cheias quando disponíveis */}
        </div>

        {/* Scroll Card Container */}
        <div className="max-w-6xl mx-auto">
          <div 
            ref={containerRef}
            className={`bg-gray-800/40 border-2 rounded-3xl p-3 sm:p-6 lg:p-12 backdrop-blur-xl shadow-2xl transition-all duration-300 relative overflow-hidden group ${
              isPaused ? 'border-yellow-400/50' : 'border-gray-700/50'
            }`}
            onMouseLeave={handleMouseLeave}
          >
            {/* Animated border glow */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 transition-opacity duration-500 animate-shimmer ${
              isPaused ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}></div>
            
            {/* Scroll Container */}
            <div className="relative z-10 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {/* Column 1 */}
                <div className="testimonials-column" style={{ animationDelay: '0s' }}>
                  <div 
                    className={`testimonials-scroll testimonials-scroll-mobile testimonials-scroll-col1 ${isPaused ? 'paused' : 'running'}`}
                    style={{
                      '--initial-offset': `-${initialPositions.col1}%`
                    } as React.CSSProperties}
                  >
                    {duplicatedTestimonials.map((testimonial, index) => (
                      <div
                        key={`col1-${index}`}
                        className="mb-2 sm:mb-3 lg:mb-6 bg-gray-900/50 border border-gray-700/30 rounded-xl p-2 sm:p-3 lg:p-3 cursor-pointer select-none"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                      >
                        <div className="relative w-full flex justify-center sm:justify-start md:justify-center">
                          <ProtectedImage
                            src={testimonial}
                            alt={`Depoimento ${index + 1}`}
                            width={250}
                            height={375}
                            className="w-full h-auto rounded-lg object-contain max-w-[250px] sm:max-w-[350px] md:max-w-[400px] mx-auto sm:mx-0 testimonial-image-mobile"
                            loading={isMobile ? (index < 50 ? 'eager' : 'lazy') : (index < 25 ? 'eager' : 'lazy')}
                            priority={isMobile ? index < 10 : index < 3}
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
                    className={`testimonials-scroll testimonials-scroll-col2 ${isPaused ? 'paused' : 'running'}`}
                    style={{
                      '--initial-offset': `-${initialPositions.col2}%`
                    } as React.CSSProperties}
                  >
                    {duplicatedTestimonials.map((testimonial, index) => (
                      <div
                        key={`col2-${index}`}
                        className="mb-2 sm:mb-3 lg:mb-6 bg-gray-900/50 border border-gray-700/30 rounded-xl p-2 sm:p-3 lg:p-3 cursor-pointer select-none"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                      >
                        <div className="relative w-full flex justify-center sm:justify-start md:justify-center">
                          <ProtectedImage
                            src={testimonial}
                            alt={`Depoimento ${index + 1}`}
                            width={250}
                            height={375}
                            className="w-full h-auto rounded-lg object-contain max-w-[250px] sm:max-w-[350px] md:max-w-[400px] mx-auto sm:mx-0 testimonial-image-mobile"
                            loading={isMobile ? (index < 50 ? 'eager' : 'lazy') : (index < 25 ? 'eager' : 'lazy')}
                            priority={isMobile ? index < 10 : index < 3}
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
                    className={`testimonials-scroll testimonials-scroll-col3 ${isPaused ? 'paused' : 'running'}`}
                    style={{
                      '--initial-offset': `-${initialPositions.col3}%`
                    } as React.CSSProperties}
                  >
                    {duplicatedTestimonials.map((testimonial, index) => (
                      <div
                        key={`col3-${index}`}
                        className="mb-2 sm:mb-3 lg:mb-6 bg-gray-900/50 border border-gray-700/30 rounded-xl p-2 sm:p-3 lg:p-3 cursor-pointer select-none"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                      >
                        <div className="relative w-full flex justify-center sm:justify-start md:justify-center">
                          <ProtectedImage
                            src={testimonial}
                            alt={`Depoimento ${index + 1}`}
                            width={250}
                            height={375}
                            className="w-full h-auto rounded-lg object-contain max-w-[250px] sm:max-w-[350px] md:max-w-[400px] mx-auto sm:mx-0 testimonial-image-mobile"
                            loading={isMobile ? (index < 50 ? 'eager' : 'lazy') : (index < 25 ? 'eager' : 'lazy')}
                            priority={isMobile ? index < 10 : index < 3}
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
        }
      `}</style>
    </section>
  );
};

