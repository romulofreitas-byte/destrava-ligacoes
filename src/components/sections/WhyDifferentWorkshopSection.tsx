'use client';

import React, { useEffect, useRef } from 'react';
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
      title: '3h Práticas + Demonstração + Construção',
      description: 'Você constrói seu script, pratica ao vivo e sai com material implementável no dia seguinte.'
    },
    {
      icon: Shield,
      title: 'Aplicável a Qualquer Nicho',
      description: 'Funciona para serviços, produtos, agências e mercados regulados. Você adapta para seu contexto.'
    },
    {
      icon: Sparkles,
      title: 'Investimento Simbólico, Entrega Real',
      description: 'R$ 297,99 garante comprometimento e entrega real. Não é funil isca gratuito — é treinamento prático.'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="por-que-diferente" 
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
            <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-400 font-semibold text-xs tracking-wide drop-shadow-sm">Por Que Este Workshop é Diferente</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Por que este workshop é{' '}
            <span className="bg-gradient-to-r from-purple-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">diferente</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Entrega real, prática real, resultados reais. Investimento simbólico de R$ 297,99 para garantir comprometimento e qualidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-12">
          {differences.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <div
                key={index}
                className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-purple-400/50 hover:shadow-purple-400/20 hover:scale-[1.02] animate-fade-in-up"
                style={{transitionDelay: `${300 + index * 100}ms`}}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-purple-400/10 border border-purple-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Copy especial para investimentos */}
        <div className="max-w-4xl mx-auto animate-fade-in-up" style={{transitionDelay: '0.7s'}}>
          <div className="bg-gradient-to-r from-blue-400/10 to-purple-400/10 border border-blue-400/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <p className="text-white text-center text-sm sm:text-base leading-relaxed">
              <span className="text-blue-400 font-semibold">Para investimentos:</span> Técnicas de rapport, autoridade e convite para reunião que funcionam com decisores, respeitando regulações do mercado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

