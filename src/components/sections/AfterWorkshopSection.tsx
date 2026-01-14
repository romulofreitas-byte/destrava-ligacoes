'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Rocket, Calendar, Gift } from 'lucide-react';
import { SubtleCTA } from '@/components/ui/SubtleCTA';

export const AfterWorkshopSection: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const transformations = [
    'Fazer sua primeira (ou próxima) cold call sem travar',
    'Marcar suas primeiras Reuniões de Vendas em até 48h',
    'Ter segurança para abordar decisores',
    'Saber exatamente o que dizer em cada momento',
    'Começar um pipeline previsível',
    'Superar a vergonha e o medo de ligar'
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
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-400/20 to-purple-500/10 border border-purple-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-purple-400/20 hover:shadow-purple-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <Rocket className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-400 font-semibold text-xs tracking-wide drop-shadow-sm">O Que Você Sai Capaz de Fazer</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Transformações reais{' '}
            <span className="bg-gradient-to-r from-purple-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">após os 2 módulos</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Não são promessas vazias. São resultados concretos que você pode alcançar imediatamente após o workshop.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {transformations.map((item, index) => {
              const isHovered = hoveredItem === index;
              
              return (
                <div
                  key={index}
                  className={`bg-gray-800/40 border border-gray-700/50 rounded-2xl p-5 sm:p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-purple-400/50 hover:shadow-purple-400/20 ${
                    isHovered ? 'scale-[1.02] -translate-y-1' : 'hover:scale-[1.01]'
                  } ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{transitionDelay: `${300 + index * 100}ms`}}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 bg-purple-400/10 border border-purple-400/30 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isHovered ? 'scale-125 bg-purple-400/20' : ''
                    }`}>
                      <CheckCircle2 className={`w-5 h-5 text-purple-400 transition-all duration-300 ${
                        isHovered ? 'scale-110' : ''
                      }`} />
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base flex-1">{item}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <div className="inline-block bg-gradient-to-r from-purple-400/10 to-yellow-400/10 border border-purple-400/30 rounded-2xl p-6 backdrop-blur-sm max-w-2xl">
            <p className="text-white font-bold text-base sm:text-lg">
              <span className="text-purple-400">2 módulos</span> que mudam tudo. <span className="text-yellow-400">Resultados</span> que começam imediatamente.
            </p>
          </div>
        </div>

        {/* Bônus Inclusos */}
        <div className="mt-8 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.95s'}}>
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-400/20 to-purple-500/10 border border-purple-400/30 rounded-full backdrop-blur-md shadow-lg shadow-purple-400/20">
              <Gift className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-purple-400 font-semibold text-xs tracking-wide">Bônus Inclusos</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-400/10 to-yellow-400/10 border-2 border-green-400/30 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-400/10 border border-green-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-1">Acesso à Plataforma + Gravação</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">Acesso imediato à plataforma Mundo Pódium até 7 dias após o workshop</p>
                </div>
              </div>
              
              <div className="hidden sm:block w-px h-12 bg-gray-700/50"></div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-1">Cupom Promocional</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">Continue na comunidade com valor especial</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 animate-fade-in-up" style={{animationDelay: '1s'}}>
          <SubtleCTA />
        </div>
      </div>
    </section>
  );
};

