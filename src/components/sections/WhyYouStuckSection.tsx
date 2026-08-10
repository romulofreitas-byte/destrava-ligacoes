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
      description: 'Medo de parecer invasivo ou ser rejeitado paralisa você.',
      solution: 'Transforme rejeição em qualificação. Cada "não" vira informação valiosa.',
    },
    {
      icon: MessageSquare,
      title: 'Falta de Protocolo',
      description: 'Não sabe como começar, o que dizer. Não existe um roteiro claro e testado.',
      solution: 'Script de ligação adaptável que funciona em qualquer nicho.',
    },
    {
      icon: Shield,
      title: 'Falta de Previsibilidade',
      description: 'Cada ligação é uma aposta. Não há processo ou estrutura.',
      solution: 'Métricas e ferramentas para transformar faturamento em missão diária previsível.',
    },
    {
      icon: AlertTriangle,
      title: 'Perda de Oportunidades',
      description: 'Enquanto você trava, clientes fecham com concorrentes.',
      solution: 'Em 48h após o workshop, você estará marcando reuniões de alto valor.',
    },
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
      id="por-que-trava"
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-10 w-80 h-80 bg-gray-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20">
            <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">
              Por Que Você Trava
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            A VERDADE: Por que você trava no{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              telefone?
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Falta de método, discurso e mentalidade. Você vai aprender a superar todas essas travas em 2
            módulos complementares.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className={`bg-gray-800/40 border border-gray-600/40 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:border-yellow-400/40 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-700/50 border border-gray-500/40 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-gray-300" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{reason.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-3">{reason.description}</p>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-medium">
                  <span className="text-green-400 font-semibold">✓ Solução:</span> {reason.solution}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Todas essas travas têm solução prática. Em 2 módulos complementares, você terá o protocolo para
            transformar medo em reuniões qualificadas.
          </p>
        </div>

        <div className="mt-8">
          <SubtleCTA />
        </div>
      </div>
    </section>
  );
};
