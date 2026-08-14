'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Rocket, Calendar, Gift, Flag } from 'lucide-react';
import { WORKSHOP_PLATFORM_RULES, WORKSHOP_GRID_BONUS } from '@/lib/constants';

export const AfterWorkshopSection: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const transformations = [
    'Fazer cold call sem travar',
    'Marcar reuniões em até 48h',
    'Abordar decisores com segurança',
    'Saber o que dizer em cada momento',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="apos-workshop"
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20">
            <Rocket className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">
              O Que Você Sai Capaz de Fazer
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            Depois dos{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              2 módulos
            </span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {transformations.map((item, index) => {
              const isHovered = hoveredItem === index;

              return (
                <div
                  key={item}
                  className={`bg-gray-800/40 border border-gray-700/50 rounded-2xl p-5 sm:p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-yellow-400/50 ${
                    isHovered ? 'scale-[1.02]' : ''
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${200 + index * 80}ms` }}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-400/10 border border-green-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base flex-1">
                      {item}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-green-400/10 to-yellow-400/10 border border-green-400/30 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-400/10 border border-green-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-bold text-sm sm:text-base mb-0.5">
                    Bônus 1 · Plataforma + gravação
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm">
                    {WORKSHOP_PLATFORM_RULES.includedAccessEndsDetail}.{' '}
                    <a
                      href="#plataforma-mundo-podium"
                      className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2"
                    >
                      Ver Mundo Pódium
                    </a>
                  </p>
                </div>
              </div>

              <div className="hidden lg:block w-px h-10 bg-gray-700/50" />

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-400/10 border border-yellow-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Flag className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-bold text-sm sm:text-base mb-0.5">
                    {WORKSHOP_GRID_BONUS.afterWorkshopTitle}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm">
                    {WORKSHOP_GRID_BONUS.afterWorkshopDetail}.{' '}
                    <a
                      href="#grid-bonus"
                      className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2"
                    >
                      Ver GRID
                    </a>
                  </p>
                </div>
              </div>

              <div className="hidden lg:block w-px h-10 bg-gray-700/50" />

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-400/10 border border-yellow-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Gift className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-bold text-sm sm:text-base mb-0.5">
                    Cupom promocional
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm">
                    Continuidade na comunidade com valor especial
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
