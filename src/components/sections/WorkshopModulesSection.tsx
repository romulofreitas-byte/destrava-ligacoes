'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Target, Brain, Book, FileText, Phone, Users, Radio, Zap, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const WorkshopModulesSection: React.FC = () => {
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const modules = [
    {
      id: 1,
      title: 'Módulo 1',
      subtitle: 'Preparação e Fundação',
      duration: '3 horas',
      theme: 'Análise de metas pessoais, controle de ansiedade, estudo de mercado e construção do Script de Cold Call',
      colorScheme: {
        bg: 'from-green-400/20 to-yellow-400/10',
        border: 'border-green-400/50',
        iconBg: 'bg-green-400/20 border-green-400/30',
        icon: 'text-green-400',
        glow: 'shadow-green-400/30',
        badge: 'bg-green-400/20 border-green-400/30 text-green-400',
        hoverBorder: 'hover:border-green-400/70',
        hoverGlow: 'hover:shadow-green-400/40'
      },
      icon: Target,
      content: [
        'Análise de metas pessoais e objetivos comerciais',
        'Controle de ansiedade e técnicas de destravamento',
        'Estudo de mercado e identificação do ICP',
        'Construção do Script de Cold Call personalizado',
        'Preparação psicológica para ligações',
        'Ferramentas de cálculo de ligações e precificação'
      ],
      benefits: [
        'Base sólida para fazer ligações',
        'Script pronto para usar',
        'Mentalidade preparada',
        'Clareza sobre seu mercado'
      ]
    },
    {
      id: 2,
      title: 'Módulo 2',
      subtitle: 'Sala de Ligação',
      duration: '3 horas',
      theme: 'Ligações ao vivo com acompanhamento direto, feedback em tempo real e simulações',
      colorScheme: {
        bg: 'from-yellow-400/20 to-red-400/10',
        border: 'border-yellow-400/50',
        iconBg: 'bg-yellow-400/20 border-yellow-400/30',
        icon: 'text-yellow-400',
        glow: 'shadow-yellow-400/30',
        badge: 'bg-yellow-400/20 border-yellow-400/30 text-yellow-400',
        hoverBorder: 'hover:border-yellow-400/70',
        hoverGlow: 'hover:shadow-yellow-400/40'
      },
      icon: Phone,
      content: [
        'Ligações ao vivo dos participantes',
        'Acompanhamento direto do Rômulo',
        'Feedback em tempo real durante as ligações',
        'Simulações para quem ainda está com receio',
        'Análise detalhada de cada ligação',
        'Correções práticas e melhorias imediatas'
      ],
      benefits: [
        'Experiência prática real',
        'Feedback personalizado',
        'Superação do medo na prática',
        'Confiança para ligar sozinho'
      ]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="modulos-workshop" 
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400/20 to-yellow-400/20 border border-green-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-green-400/20 hover:shadow-green-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <Zap className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-green-400 font-semibold text-xs tracking-wide drop-shadow-sm">Estrutura do Workshop</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Dois módulos{' '}
            <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">complementares</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up mb-4" style={{animationDelay: '0.3s'}}>
            Preparação completa no primeiro módulo. Prática real no segundo. Cada módulo em dias diferentes.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {modules.map((module, index) => {
              const Icon = module.icon;
              const isHovered = hoveredModule === index;
              
              return (
                <div
                  key={module.id}
                  className={`bg-gray-800/40 border-2 ${module.colorScheme.border} rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl transition-all duration-500 ${module.colorScheme.hoverBorder} ${module.colorScheme.hoverGlow} ${
                    isHovered ? 'scale-[1.02] -translate-y-1' : 'hover:scale-[1.01]'
                  } ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  } relative overflow-hidden group`}
                  style={{transitionDelay: `${400 + index * 150}ms`}}
                  onMouseEnter={() => setHoveredModule(index)}
                  onMouseLeave={() => setHoveredModule(null)}
                >
                  {/* Animated border effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${module.colorScheme.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 ${module.colorScheme.iconBg} border rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isHovered ? 'scale-110' : ''
                        }`}>
                          <Icon className={`w-7 h-7 ${module.colorScheme.icon} transition-all duration-300 ${
                            isHovered ? 'scale-110' : ''
                          }`} />
                        </div>
                        <div>
                          <div className={`inline-flex items-center px-3 py-1 ${module.colorScheme.badge} border rounded-full mb-2 backdrop-blur-sm`}>
                            <span className="font-semibold text-xs tracking-wide">{module.title}</span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white">{module.subtitle}</h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 border border-gray-600/50 rounded-lg">
                        <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-300 font-semibold text-sm whitespace-nowrap">{module.duration}</span>
                      </div>
                    </div>

                    {/* Theme Description */}
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                      {module.theme}
                    </p>

                    {/* Content List */}
                    <div className="mb-6">
                      <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wide">O que você vai aprender:</h4>
                      <ul className="space-y-2">
                        {module.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <CheckCircle2 className={`w-5 h-5 ${module.colorScheme.icon} flex-shrink-0 mt-0.5`} />
                            <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div className="pt-6 border-t border-gray-700/50">
                      <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wide">Benefícios:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {module.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 ${module.colorScheme.icon.replace('text-', 'bg-')} rounded-full`}></div>
                            <span className="text-gray-300 text-xs">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Connection Arrow (desktop only) */}
        <div className="hidden lg:flex items-center justify-center mt-8 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <div className="flex items-center gap-4 text-gray-400">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-green-400/50 to-green-400/50"></div>
            <ArrowRight className="w-6 h-6 text-green-400" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent via-yellow-400/50 to-yellow-400/50"></div>
          </div>
        </div>

        {/* Summary Note */}
        <div className="mt-12 text-center animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <div className="inline-block bg-gradient-to-r from-green-400/10 to-yellow-400/10 border border-green-400/30 rounded-2xl p-6 backdrop-blur-sm max-w-2xl">
            <p className="text-white font-semibold text-base sm:text-lg">
              <span className="text-green-400">Preparação + Prática</span> = <span className="text-yellow-400">Resultados em 48h</span>
            </p>
            <p className="text-gray-300 text-xs sm:text-sm mt-2">
              Os dois módulos acontecem em dias diferentes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
