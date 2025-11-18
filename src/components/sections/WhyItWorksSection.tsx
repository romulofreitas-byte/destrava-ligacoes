'use client';

import React, { useEffect, useRef } from 'react';
import { CheckCircle, Target, Zap, TrendingUp } from 'lucide-react';
import { trackViewContent } from '@/lib/metaPixel';

export const WhyItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView.current) {
          trackViewContent('Why It Works Section', 'why-it-works');
          hasTrackedView.current = true;
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const reasons = [
    {
      icon: Target,
      title: 'Método Validado',
      description: 'Já transformou mais de 100 profissionais. Prática comprovada que funciona em qualquer nicho.'
    },
    {
      icon: Zap,
      title: 'Para Todos os Níveis',
      description: 'Funciona para quem está travado e para quem quer aumentar conversão. Se adapta ao seu nível.'
    },
    {
      icon: TrendingUp,
      title: 'Resultados Imediatos',
      description: 'Você sai sabendo exatamente o que fazer. Pode começar a marcar Reuniões de Vendas em até 48h.'
    },
    {
      icon: CheckCircle,
      title: 'Universal',
      description: 'Funciona para freelancers, SDRs, consultores, advogados, donos de agência — qualquer um que vende serviços.'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="por-que-funciona" 
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400/20 to-green-500/10 border border-green-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-green-400/20 hover:shadow-green-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-green-400 font-semibold text-xs tracking-wide drop-shadow-sm">Por Que Isso Funciona</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Para freelancers{' '}
            <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">E profissionais avançados</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            O método é validado, funciona em qualquer nicho e serve tanto para quem está travado quanto para quem quer aumentar sua conversão.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            
            return (
              <div
                key={index}
                className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-green-400/50 hover:shadow-green-400/20 hover:scale-[1.02] animate-fade-in-up"
                style={{transitionDelay: `${300 + index * 100}ms`}}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-400/10 border border-green-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{reason.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{reason.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <div className="inline-block bg-green-400/10 border border-green-400/30 rounded-2xl p-6 backdrop-blur-sm max-w-2xl">
            <p className="text-white font-semibold text-base sm:text-lg">
              <span className="text-green-400">Não importa seu nível.</span> Se você vende serviços e trava no telefone, este workshop é para você.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
