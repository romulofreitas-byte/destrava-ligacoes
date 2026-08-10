'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WORKSHOP_INFO, WORKSHOP_MODULE_2_INFO, WORKSHOP_SALES } from '@/lib/constants';
import { WorkshopProofCard } from '@/components/ui/WorkshopProofCard';

const featuredWorkshopTestimonials = [
  {
    id: 'gleice',
    imageSrc:
      '/depoimentos-2026-ready/gallery/gallery_workshop_gleice-souza-agradece-o-workshop-elogian.png',
    imageAlt:
      'Depoimento de Gleice Souza: workshop cobriu cada nicho com exemplos práticos e aumentou a confiança',
    highlight: 'Não teve um nicho sequer que você não soubesse explicar',
    name: 'Gleice Souza',
    company: 'Participante do Workshop',
    bodyQuote:
      'Você é um cara extremamente inteligente e dinâmico. Não teve um nicho sequer que você não soubesse explicar como abordar; sempre trazendo exemplos práticos e reais que facilitam muito o entendimento. Saí do workshop muito mais confiante, com a mente mais aberta e cheia de novas estratégias para aplicar no dia a dia.',
    priority: true,
  },
  {
    id: 'regularize',
    imageSrc:
      '/depoimentos-2026-ready/hero/hero_metricas_regularize-triplicou-faturamento.png',
    imageAlt:
      'Depoimento do cliente Regularize Health: faturamento triplicado após aplicar o método de follow-up do Workshop Destrava Ligações',
    highlight: 'Triplicamos o faturamento no mês seguinte',
    name: 'Robson Vieira',
    company: 'Regularize Health',
    companyUrl: 'https://www.regularizehealth.com.br',
    bodyQuote:
      'Desde que começamos a colocar em prática os conceitos do Rômulo Freitas, aplicando no inbound e no follow-up, triplicamos nosso faturamento já no mês seguinte.',
  },
  {
    id: 'igor',
    imageSrc: '/depoimentos/depoimento-igor-carvalhosa.png',
    imageAlt:
      'Depoimento real de Igor Carvalhosa sobre o Workshop Destrava Ligações — mais de 9h de conteúdo ao vivo, superou expectativas',
    highlight: 'Vale mais de 2 mil reais fácil',
    name: 'Igor Carvalhosa',
  },
];

export const WorkshopTestimonialBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-8 md:py-10 bg-gradient-to-br from-yellow-500/10 via-green-400/5 to-transparent border-b border-yellow-400/20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-500/20 via-green-400/15 to-yellow-500/20 border-2 border-yellow-400/50 rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>

            <div className="relative z-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 border border-yellow-400/40 rounded-full backdrop-blur-md mb-4">
                  <MessageCircle className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-yellow-400 font-bold text-xs tracking-wide">
                    Depoimentos reais — Workshop
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-6 leading-tight">
                  O que dizem os participantes das{' '}
                  <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                    edições anteriores
                  </span>
                </h3>
              </div>

              <div className="flex flex-col gap-8 max-w-3xl mx-auto mb-6">
                {featuredWorkshopTestimonials.map((t) => (
                  <WorkshopProofCard
                    key={t.id}
                    imageSrc={t.imageSrc}
                    imageAlt={t.imageAlt}
                    highlight={t.highlight}
                    name={t.name}
                    company={t.company}
                    companyUrl={t.companyUrl}
                    bodyQuote={t.bodyQuote}
                    priority={t.priority}
                  />
                ))}
              </div>

              <div className="text-center">
                <p className="text-gray-300 text-sm sm:text-base">
                  <span className="text-yellow-400 font-semibold">
                    {WORKSHOP_SALES.edition}ª Edição aberta!
                  </span>{' '}
                  Módulo 1 em {WORKSHOP_INFO.dateDisplayShort} e módulo 2 em{' '}
                  {WORKSHOP_MODULE_2_INFO.dateDisplayShort} —{' '}
                  {WORKSHOP_SALES.filledSpots} de {WORKSHOP_SALES.maxSpots} vagas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
