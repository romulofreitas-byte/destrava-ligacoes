'use client';

import React from 'react';

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
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pain-points-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .pain-points-marquee-animation {
            animation: pain-points-marquee 40s linear infinite;
          }
        `
      }} />
      <div className="bg-white border-t border-gray-200 py-3 sm:py-5">
        <div className="flex pain-points-marquee-animation whitespace-nowrap w-max">
          {/* Triplicate for seamless loop */}
          {[...painPoints, ...painPoints, ...painPoints].map((point, index) => (
            <div key={index} className="inline-flex items-center mx-6 sm:mx-8">
              <span className="text-gray-900 font-semibold text-sm sm:text-base whitespace-nowrap" style={{fontFamily: 'var(--font-ubuntu), sans-serif'}}>
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

