'use client';

import React, { useEffect, useRef } from 'react';
import { DollarSign, Target, Zap, Shield } from 'lucide-react';

export const WhyPriceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const reasons = [
    {
      icon: Shield,
      title: 'Não é Funil Isca Gratuito',
      description: 'Workshops gratuitos prometem tudo e entregam pouco. Este valor simbólico garante que você está comprometido e receberá entrega real, não apenas teoria.'
    },
    {
      icon: Target,
      title: 'Não é Palestra Rasa',
      description: 'Não é um webinário genérico onde você só ouve. É um treinamento prático em 2 módulos com demonstração real, construção ao vivo e material implementável.'
    },
    {
      icon: Zap,
      title: 'Treinamento Prático com Entrega Real',
      description: '2 módulos intensivos onde você constrói seu script, pratica ao vivo, assiste demonstrações e sai com tudo pronto para implementar.'
    },
    {
      icon: DollarSign,
      title: 'Valor Simbólico para Filtrar Comprometimento',
      description: 'O investimento garante que apenas pessoas realmente interessadas em transformar participem. Isso eleva a qualidade do evento e seu aprendizado.'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="por-que-preco" 
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <DollarSign className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">Por Que Custa R$ 149,99</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Por que custa{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">R$ 149,99</span>?
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Este não é um workshop gratuito. Este é um investimento simbólico que garante entrega real e comprometimento de transformação.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              
              return (
                <div
                  key={index}
                  className="bg-gray-800/40 border border-yellow-400/30 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-yellow-400/50 hover:shadow-yellow-400/20 hover:scale-[1.02] animate-fade-in-up"
                  style={{transitionDelay: `${300 + index * 100}ms`}}
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{reason.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mensagem final sobre investimento */}
        <div className="max-w-4xl mx-auto animate-fade-in-up" style={{transitionDelay: '0.7s'}}>
          <div className="bg-gradient-to-r from-yellow-400/10 to-green-400/10 border border-yellow-400/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <div className="text-center space-y-4">
              <p className="text-white font-semibold text-base sm:text-lg leading-relaxed">
                <span className="text-yellow-400">Ensino direto e implementável.</span> Este é o primeiro investimento simbólico para entrar na mentalidade empresarial de quem transforma conhecimento em resultados.
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                2 módulos que valem mais que cursos de 30 horas. Porque aqui você não apenas aprende — você pratica, constrói e sai pronto para implementar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

