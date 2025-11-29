'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Heart, Shield, MessageSquare } from 'lucide-react';
import { SubtleCTA } from '@/components/ui/SubtleCTA';

export const WhyYouStuckSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const reasons = [
    {
      icon: Heart,
      title: 'Vergonha e Medo',
      description: 'O coração acelera, o corpo trava. O medo de parecer invasivo ou ser rejeitado paralisa você. A vergonha de "incomodar" fala mais alto.',
      color: 'red'
    },
    {
      icon: MessageSquare,
      title: 'Falta de Discurso',
      description: 'Você pega o telefone e... silêncio. Não sabe como começar, o que dizer. Fica sem palavras porque não existe um roteiro claro e testado.',
      color: 'yellow'
    },
    {
      icon: Shield,
      title: 'Falta de Método',
      description: 'Cada ligação é uma aposta. Não há processo, não há estrutura. Você improvisa na esperança de que funcione, mas a insegurança cresce.',
      color: 'blue'
    },
    {
      icon: AlertTriangle,
      title: 'Perda de Oportunidades',
      description: 'Enquanto você trava e adia, clientes reais estão fechando com concorrentes. Oportunidades que poderiam transformar sua receita desaparecem.',
      color: 'orange'
    }
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

  const getColorClasses = (color: string) => {
    const classes = {
      red: 'bg-red-400/10 border-red-400/30 text-red-400 hover:border-red-400/50 hover:shadow-red-400/20',
      yellow: 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400 hover:border-yellow-400/50 hover:shadow-yellow-400/20',
      blue: 'bg-blue-400/10 border-blue-400/30 text-blue-400 hover:border-blue-400/50 hover:shadow-blue-400/20',
      orange: 'bg-orange-400/10 border-orange-400/30 text-orange-400 hover:border-orange-400/50 hover:shadow-orange-400/20'
    };
    return classes[color as keyof typeof classes] || classes.red;
  };

  return (
    <section 
      ref={sectionRef}
      id="por-que-trava" 
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-red-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-400/20 to-red-500/10 border border-red-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-red-400/20 hover:shadow-red-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
            <span className="text-red-400 font-semibold text-xs tracking-wide drop-shadow-sm">Por Que Você Trava</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Por que você trava no{' '}
            <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">telefone?</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Não é falta de coragem — é falta de método, discurso e mentalidade. Todas essas travas têm solução prática e imediata.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            const colorClass = getColorClasses(reason.color);
            const iconBgClass = reason.color === 'red' ? 'bg-red-400/20 border-red-400/30' :
                               reason.color === 'yellow' ? 'bg-yellow-400/20 border-yellow-400/30' :
                               reason.color === 'blue' ? 'bg-blue-400/20 border-blue-400/30' :
                               'bg-orange-400/20 border-orange-400/30';
            const iconColorClass = reason.color === 'red' ? 'text-red-400' :
                                  reason.color === 'yellow' ? 'text-yellow-400' :
                                  reason.color === 'blue' ? 'text-blue-400' :
                                  'text-orange-400';
            
            return (
              <div
                key={index}
                className={`bg-gray-800/40 border ${colorClass} rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{transitionDelay: `${300 + index * 100}ms`}}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`w-12 h-12 ${iconBgClass} border rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${iconColorClass}`} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{reason.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{reason.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            <span className="text-yellow-400 font-semibold">A boa notícia:</span> Você vai aprender a superar todas essas travas em 3 horas.
          </p>
        </div>

        <div className="mt-8 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <SubtleCTA />
        </div>
      </div>
    </section>
  );
};

