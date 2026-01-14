'use client';

import React, { useEffect, useRef } from 'react';
import { Phone, Eye, TrendingUp, Award } from 'lucide-react';
import { trackViewContent } from '@/lib/metaPixel';

export const LiveCallsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView.current) {
          trackViewContent('Live Calls Section', 'live-calls');
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

  const benefits = [
    {
      icon: Eye,
      title: 'Acompanhamento Direto',
      description: 'Feedback em tempo real durante suas ligações.'
    },
    {
      icon: TrendingUp,
      title: 'Feedback Imediato',
      description: 'Análise na hora do que funcionou e o que melhorar.'
    },
    {
      icon: Award,
      title: 'Prática Real',
      description: 'Ligações reais com suporte. Simulações para quem tem receio.'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="ligacoes-ao-vivo" 
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-red-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Card - Premium */}
          <div className="bg-gray-800/30 border-2 border-yellow-400/50 rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-sm shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 relative overflow-hidden group mb-12">
            {/* Animated border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20">
                  <Phone className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-yellow-400 font-semibold text-xs tracking-wide">Módulo 2 - Sala de Ligação</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                  Ligações reais{' '}
                  <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">ao vivo</span>
                </h2>
              </div>

              <div className="bg-gray-900/50 rounded-2xl p-6 border border-yellow-400/20">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-400 font-semibold text-sm">AO VIVO</span>
                </div>
                <p className="text-center text-gray-300 text-sm sm:text-base">
                  Faça ligações reais com acompanhamento direto e feedback em tempo real.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              
              return (
                <div
                  key={index}
                  className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-yellow-400/50 hover:shadow-yellow-400/20 hover:scale-[1.02] animate-fade-in-up"
                  style={{animationDelay: `${400 + index * 100}ms`}}
                >
                  <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/30 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

