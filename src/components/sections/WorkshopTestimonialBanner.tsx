'use client';

import React, { useState } from 'react';
import { MessageCircle, Star } from 'lucide-react';
import Image from 'next/image';
import { WORKSHOP_INFO, WORKSHOP_MODULE_2_INFO } from '@/lib/constants';

type FeaturedWorkshopTestimonial = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  highlight: string;
  name: string;
  company?: string;
  companyUrl?: string;
  bodyQuote?: string;
  imagePriority?: boolean;
};

const featuredWorkshopTestimonials: FeaturedWorkshopTestimonial[] = [
  {
    id: 'igor',
    imageSrc: '/depoimentos/depoimento-igor-carvalhosa.png',
    imageAlt:
      'Depoimento real de Igor Carvalhosa sobre o Workshop Destrava Ligações — mais de 9h de conteúdo ao vivo, superou expectativas',
    highlight: 'Vale mais de 2 mil reais fácil',
    name: 'Igor Carvalhosa',
    imagePriority: true,
  },
  {
    id: 'robson',
    imageSrc: '/depoimentos/depoimento-regularize-health-crm.png',
    imageAlt:
      'Print do CRM enviado por Robson Vieira (Regularize Health): gráfico de barras por mês em 2026 com série Recebidas e salto de faturamento recebido',
    highlight: 'Triplicamos o faturamento no mês seguinte',
    name: 'Robson Vieira',
    company: 'Regularize Health',
    companyUrl: 'https://www.regularizehealth.com.br',
    bodyQuote:
      'Desde que começamos a colocar em prática os conceitos do Rômulo Freitas, aplicando no inbound e no follow-up, triplicamos nosso faturamento já no mês seguinte.',
  },
];

function FeaturedWorkshopCard({
  testimonial,
}: {
  testimonial: FeaturedWorkshopTestimonial;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-full bg-gray-800/30 rounded-2xl p-4 sm:p-5 border-2 border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-yellow-400/20 group/card">
      <div className="relative w-full aspect-[16/10] rounded-xl bg-gray-900/40 overflow-hidden">
        {!imgError ? (
          <Image
            src={testimonial.imageSrc}
            alt={testimonial.imageAlt}
            fill
            className="object-contain p-2 sm:p-3"
            quality={90}
            priority={testimonial.imagePriority ?? false}
            unoptimized
            sizes="(max-width: 768px) 100vw, 768px"
            onError={() => setImgError(true)}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- fallback when next/image fails
          <img
            src={testimonial.imageSrc}
            alt={testimonial.imageAlt}
            className="absolute inset-0 m-auto max-h-full max-w-full object-contain p-2 sm:p-3"
          />
        )}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-yellow-400/20 to-green-400/20 border border-yellow-400/30 rounded-xl">
        <div className="flex items-start gap-2">
          <Star
            className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5"
            fill="currentColor"
          />
          <p className="text-white text-sm sm:text-base font-semibold leading-relaxed">
            <span className="text-yellow-400">
              &ldquo;{testimonial.highlight}&rdquo;
            </span>
          </p>
        </div>
      </div>

      <div className="mt-4 text-center sm:text-left">
        <p className="text-white font-semibold text-sm sm:text-base">
          {testimonial.name}
        </p>
        {testimonial.company && testimonial.companyUrl && (
          <a
            href={testimonial.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400/90 hover:text-green-400 text-sm underline-offset-2 hover:underline inline-block mt-0.5"
          >
            {testimonial.company}
          </a>
        )}
      </div>

      {testimonial.bodyQuote && (
        <blockquote className="mt-4 text-left text-sm text-gray-400 leading-relaxed border-l-2 border-yellow-400/30 pl-3">
          &ldquo;{testimonial.bodyQuote}&rdquo;
        </blockquote>
      )}
    </div>
  );
}

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

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                  O que dizem os participantes das{' '}
                  <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">
                    edições anteriores
                  </span>
                </h3>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                  Depoimentos reais de quem aplicou o método nas edições anteriores
                  do Workshop Destrava Ligações.
                </p>
              </div>

              <div className="flex flex-col gap-8 max-w-3xl mx-auto mb-6">
                {featuredWorkshopTestimonials.map((t) => (
                  <FeaturedWorkshopCard key={t.id} testimonial={t} />
                ))}
              </div>

              <div className="text-center">
                <p className="text-gray-300 text-sm sm:text-base mb-4">
                  <span className="text-yellow-400 font-semibold">
                    8ª Edição aberta!
                  </span>{' '}
                  Módulo 1 em {WORKSHOP_INFO.dateDisplayShort} e módulo 2 em{' '}
                  {WORKSHOP_MODULE_2_INFO.dateDisplayShort} — garanta sua vaga
                </p>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Transforme suas ligações como centenas de participantes já
                  fizeram
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
