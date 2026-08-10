'use client';

import React from 'react';

const HIGHLIGHT = new Set(['Aumentar Vendas', 'Fechar Negócios', 'Destravar Ligações']);

export const PainPointsMarquee: React.FC = () => {
  const painPoints = [
    'Vende Mais',
    'Fechar Contratos',
    'Ganhar Confiança',
    'Superar Medo',
    'Marcar Reuniões',
    'Gerar Resultados',
    'Destravar Ligações',
    'Aumentar Vendas',
    'Fechar Negócios',
    'Conquistar Clientes',
    'Vender Mais',
    'Transformar Vendas',
  ];

  return (
    <div className="relative lg:absolute lg:bottom-0 left-0 right-0 z-[35] overflow-hidden w-full pointer-events-none">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes pain-points-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .pain-points-marquee-animation {
            animation: pain-points-marquee 60s linear infinite;
          }
        `,
        }}
      />
      <div
        className="relative border-t border-b border-yellow-400/15 py-3 sm:py-3.5"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 z-10 bg-gradient-to-r from-gray-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 z-10 bg-gradient-to-l from-gray-900 to-transparent" />

        <div className="flex pain-points-marquee-animation whitespace-nowrap w-max">
          {[...painPoints, ...painPoints, ...painPoints].map((point, index) => {
            const highlight = HIGHLIGHT.has(point);
            return (
              <div key={`${point}-${index}`} className="inline-flex items-center gap-3 sm:gap-4 mx-3 sm:mx-5">
                <span
                  className={`whitespace-nowrap text-sm sm:text-base ${
                    highlight
                      ? 'text-yellow-400 font-bold'
                      : 'text-white/55 font-medium'
                  }`}
                  style={{ fontFamily: 'var(--font-ubuntu), sans-serif' }}
                >
                  {point}
                </span>
                <span className="text-yellow-400/60 text-sm leading-none" aria-hidden>
                  ·
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
