'use client';

import React, { useRef } from 'react';
import { Sparkles, Target, Zap, Shield } from 'lucide-react';

export const WhyDifferentWorkshopSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const differences = [
    {
      icon: Target,
      title: 'Demonstração Real, Não Teoria',
      description: 'Você assiste ligações reais ao vivo, não promessas vazias. Construção prática, resultados reais.'
    },
    {
      icon: Zap,
      title: '8h Práticas + Demonstração + Construção',
      description: 'Você constrói seu script, pratica ao vivo e sai com material implementável no dia seguinte.'
    },
    {
      icon: Shield,
      title: 'Aplicável a Qualquer Nicho',
      description: 'Funciona para seguros, jurídico, contabilidade, serviços, agências e mercados regulados. Você adapta para seu contexto.'
    },
    {
      icon: Sparkles,
      title: 'Entrega Completa por R$ 897,00',
      description: '2 módulos práticos, ligações ao vivo, script pronto e 60 dias na Plataforma Mundo Pódium. Não é funil isca — é treinamento com profundidade.'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="por-que-diferente" 
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20">
            <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">Por Que Este Workshop é Diferente</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            Por que este workshop é{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">diferente</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Entrega real, prática real, resultados reais. Investimento de R$ 897,00 pela qualidade do treinamento — não por um filtro simbólico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-12">
          {differences.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <div
                key={index}
                className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-yellow-400/50 hover:shadow-yellow-400/20 hover:scale-[1.02]"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-700/50 border border-gray-500/40 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-gray-300" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/40 border border-yellow-400/25 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <p className="text-white text-center text-sm sm:text-base leading-relaxed">
              <span className="text-yellow-400 font-semibold">Para investimentos:</span> Técnicas de rapport, autoridade e convite para reunião que funcionam com decisores, respeitando regulações do mercado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
