'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Zap } from 'lucide-react';
import { SubtleCTA } from '@/components/ui/SubtleCTA';

export const WhatYouWillLearnSection: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const learnings = [
    {
      text: 'Calculadora de Ligações: Transforme sua meta de faturamento em um número exato de ligações diárias (ex: R$ 50k/mês = 127 ligações/semana)',
      isExclusive: true
    },
    {
      text: 'Calculadora de Precificação Inteligente: Aprenda a justificar seu high-ticket e vender valor estratégico (não preço)',
      isExclusive: true
    },
    {
      text: 'Mentalidade Pódium: Pense como dono e aplique a responsabilidade radical para agir com autoridade',
      isExclusive: false
    },
    {
      text: '5 Técnicas de Destravamento: Use a Regra dos 5 Segundos e a Respiração de Empresário para dissolver a ansiedade no ato',
      isExclusive: false
    },
    {
      text: 'Anatomia de um Script de Ligação: Estrutura adaptável que funciona em qualquer nicho e garante a R1 em 15 minutos',
      isExclusive: false
    },
    {
      text: 'Execução ao Vivo: Veja ligações reais sendo feitas e analisadas ao vivo',
      isExclusive: false
    },
    {
      text: 'Clareza de metas e ICP: defina exatamente o que você quer conquistar e conheça seu cliente ideal',
      isExclusive: false
    },
    {
      text: 'Técnicas comprovadas: 5 minutos, 2 ligações e não antecipação para marcar reuniões',
      isExclusive: false
    },
    {
      text: 'Script para investimentos: versão segura e efetiva para mercados regulados',
      isExclusive: false
    },
    {
      text: 'Construção de discurso: monte sua fala perfeita do zero',
      isExclusive: false
    },
    {
      text: 'Prática real: faça suas primeiras ligações durante o workshop',
      isExclusive: false
    },
    {
      text: 'Estratégias de follow-up e uso de IA para acelerar prospecção',
      isExclusive: false
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

  return (
    <section 
      ref={sectionRef}
      id="o-que-vai-aprender" 
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
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400/20 to-green-500/10 border border-green-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-green-400/20 hover:shadow-green-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <Zap className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-green-400 font-semibold text-xs tracking-wide drop-shadow-sm">O Que Você Vai Aprender</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Transformações{' '}
            <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">reais em 3 horas</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Conteúdo prático, direto ao ponto, focado em resultados imediatos.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {learnings.map((item, index) => {
              const isHovered = hoveredItem === index;
              
              return (
                <div
                  key={index}
                  className={`bg-gray-800/40 border ${
                    item.isExclusive 
                      ? 'border-yellow-400/50 shadow-yellow-400/20' 
                      : 'border-gray-700/50'
                  } rounded-2xl p-5 sm:p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-green-400/50 hover:shadow-green-400/20 ${
                    isHovered ? 'scale-[1.02] -translate-y-1' : 'hover:scale-[1.01]'
                  } ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{transitionDelay: `${300 + index * 100}ms`}}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 ${
                      item.isExclusive
                        ? 'bg-yellow-400/20 border-yellow-400/50'
                        : 'bg-green-400/10 border-green-400/30'
                    } border rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isHovered ? `scale-125 ${item.isExclusive ? 'bg-yellow-400/30' : 'bg-green-400/20'}` : ''
                    }`}>
                      <CheckCircle2 className={`w-5 h-5 ${
                        item.isExclusive ? 'text-yellow-400' : 'text-green-400'
                      } transition-all duration-300 ${
                        isHovered ? 'scale-110' : ''
                      }`} />
                    </div>
                    <div className="flex-1">
                      {item.isExclusive && (
                        <span className="inline-block mb-1 px-2 py-0.5 bg-yellow-400/20 border border-yellow-400/50 rounded text-yellow-400 text-[10px] font-bold uppercase tracking-wide">
                          Ferramenta Exclusiva
                        </span>
                      )}
                      <p className="text-gray-300 leading-relaxed text-sm sm:text-base mt-1">{item.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center animate-fade-in-up" style={{animationDelay: '1s'}}>
          <div className="inline-block bg-green-400/10 border border-green-400/30 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-white font-semibold text-base sm:text-lg">
              <span className="text-green-400">100% prático.</span> Sem teoria desnecessária. Apenas o que funciona.
            </p>
          </div>
        </div>

        <div className="mt-8 animate-fade-in-up" style={{animationDelay: '1.1s'}}>
          <SubtleCTA />
        </div>
      </div>
    </section>
  );
};

