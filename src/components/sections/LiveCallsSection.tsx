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
    { icon: Eye, title: 'Acompanhamento direto', description: 'Feedback em tempo real.' },
    { icon: TrendingUp, title: 'Correção na hora', description: 'O que funcionou e o que melhorar.' },
    { icon: Award, title: 'Prática real', description: 'Ligações reais ou simulações.' },
  ];

  return (
    <section
      ref={sectionRef}
      id="ligacoes-ao-vivo"
      className="relative overflow-hidden py-16 md:py-20 bg-gray-900"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-5 backdrop-blur-md">
            <Phone className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide">
              Módulo 2 — Sala de Ligação
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
            Ligações reais{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              ao vivo
            </span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            Faça ligações com acompanhamento direto e feedback em tempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-xl hover:border-yellow-400/50 transition-colors"
              >
                <div className="w-10 h-10 bg-yellow-400/10 border border-yellow-400/30 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-yellow-400" />
                </div>
                <h3 className="text-white font-bold text-base mb-1">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
