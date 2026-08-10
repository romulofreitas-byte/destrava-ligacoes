'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Target, Phone, Zap, Clock, CheckCircle2, ChevronDown } from 'lucide-react';
import { WORKSHOP_DURATION, WORKSHOP_INFO, WORKSHOP_MODULE_2_INFO } from '@/lib/constants';

export const WorkshopModulesSection: React.FC = () => {
  const [openModule, setOpenModule] = useState<number | null>(null);
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
      duration: WORKSHOP_DURATION.perModuleLabel,
      scheduleLine: `${WORKSHOP_INFO.dateDisplayShort} · ${WORKSHOP_INFO.time} (BRT)`,
      theme:
        'Metas, ansiedade, mercado e construção da Anatomia da Ligação.',
      colorScheme: {
        border: 'border-green-400/50',
        iconBg: 'bg-green-400/20 border-green-400/30',
        icon: 'text-green-400',
        badge: 'bg-green-400/20 border-green-400/30 text-green-400',
        hoverBorder: 'hover:border-green-400/70',
      },
      icon: Target,
      content: [
        'Metas pessoais e objetivos comerciais',
        'Técnicas de destravamento e controle de ansiedade',
        'ICP e Anatomia da Ligação',
        'Calculadoras de ligações e precificação',
      ],
      benefitLine: 'Sai com base, mentalidade e Anatomia pronta para aplicar.',
    },
    {
      id: 2,
      title: 'Módulo 2',
      subtitle: 'Sala de Ligação',
      duration: WORKSHOP_DURATION.perModuleLabel,
      scheduleLine: `${WORKSHOP_MODULE_2_INFO.dateDisplayShort} · ${WORKSHOP_MODULE_2_INFO.time} (BRT)`,
      theme: 'Ligações ao vivo com feedback em tempo real e simulações.',
      colorScheme: {
        border: 'border-yellow-400/50',
        iconBg: 'bg-yellow-400/20 border-yellow-400/30',
        icon: 'text-yellow-400',
        badge: 'bg-yellow-400/20 border-yellow-400/30 text-yellow-400',
        hoverBorder: 'hover:border-yellow-400/70',
      },
      icon: Phone,
      content: [
        'Ligações ao vivo dos participantes',
        'Acompanhamento direto do Rômulo',
        'Feedback em tempo real',
        'Simulações e correções na hora',
      ],
      benefitLine: 'Prática real, feedback personalizado e confiança para ligar sozinho.',
    },
  ];

  const toggleModule = (id: number) => {
    setOpenModule((current) => (current === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      id="modulos-workshop"
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400/20 to-yellow-400/20 border border-green-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-green-400/20">
            <Zap className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-green-400 font-semibold text-xs tracking-wide drop-shadow-sm">
              Estrutura do Workshop
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            Dois módulos{' '}
            <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              complementares
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Preparação no primeiro. Prática no segundo. Módulo 1 à tarde e módulo 2 pela
            manhã — em dias diferentes ({WORKSHOP_DURATION.detailLine}).
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {modules.map((module, index) => {
            const Icon = module.icon;
            const isOpen = openModule === module.id;

            return (
              <div
                key={module.id}
                className={`bg-gray-800/40 border-2 ${module.colorScheme.border} rounded-2xl backdrop-blur-xl transition-all duration-300 ${module.colorScheme.hoverBorder} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleModule(module.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-start gap-4"
                >
                  <div
                    className={`w-12 h-12 ${module.colorScheme.iconBg} border rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-6 h-6 ${module.colorScheme.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 ${module.colorScheme.badge} border rounded-full font-semibold text-xs`}
                      >
                        {module.title}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-gray-400 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        {module.duration}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                      {module.subtitle}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-2">{module.scheduleLine}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{module.theme}</p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 mt-1 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-gray-700/40">
                    <ul className="space-y-2 mt-4 mb-4">
                      {module.content.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2
                            className={`w-4 h-4 ${module.colorScheme.icon} flex-shrink-0 mt-0.5`}
                          />
                          <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className={`text-sm font-medium ${module.colorScheme.icon}`}>
                      {module.benefitLine}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
