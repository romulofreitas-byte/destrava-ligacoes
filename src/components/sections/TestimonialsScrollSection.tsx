'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { WorkshopProofCard } from '@/components/ui/WorkshopProofCard';

type CuratedProof = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  highlight: string;
  name: string;
  company?: string;
  bodyQuote?: string;
  fitToImage?: boolean;
};

const curatedProofs: CuratedProof[] = [
  {
    id: 'gilson',
    imageSrc:
      '/depoimentos-2026-ready/hero/hero_workshop_participantes-exaltam-o-workshop-como-o_parte-3.png',
    imageAlt:
      'Depoimento de Gilson Cas: o workshop é o melhor conteúdo visto — a maioria é só 3 CPLs com pitch no final',
    highlight: 'A maioria é só 3 CPLs com pitch no final',
    name: 'Gilson Cas',
    company: 'Participante do Workshop',
    bodyQuote:
      'Já vi muita coisa por aí, mas o teu foi o melhor. A maioria é só 3 CPLs com pitch no final.',
  },
  {
    id: 'otavio',
    imageSrc:
      '/depoimentos-2026-ready/hero/hero_workshop_otavio-lopes-freelancer-sai-empresario.png',
    imageAlt: 'Depoimento de Otavio Lopes sobre o workshop e a comunidade',
    highlight: 'Entra freelancer e sai empresário',
    name: 'Otavio Lopes',
    company: 'Participante do Workshop',
    bodyQuote:
      'Workshop não é apenas um produto pra te monetizar, é um braço estendido pra quem está travado. Preço comparado ao valor que se gera é praticamente insignificante.',
    fitToImage: true,
  },
  {
    id: 'lucas',
    imageSrc: '/depoimentos-2026-ready/hero/hero_metricas_lucas-30-ligacoes-3-reunioes-1-venda.png',
    imageAlt: 'Depoimento de Lucas Ribeiro: 30 ligações, 3 reuniões e 1 venda no mesmo dia',
    highlight: '30 ligações → 3 reuniões → 1 venda no mesmo dia',
    name: 'Lucas Ribeiro',
    company: 'Mentorado',
    bodyQuote:
      'Fiz 30 ligações, 10 atenderam, falei com 5 decisores e marquei 3 reuniões. Dessas ligações de hoje fiz uma reunião hoje pela tarde e 1 venda já foi feita.',
  },
  {
    id: 'joao',
    imageSrc: '/depoimentos-2026-ready/hero/hero_metricas_joao-8-ligacoes-2-compras-1-upsell.png',
    imageAlt: 'Depoimento: 8 ligações, 2 compras e 1 upsell',
    highlight: '8 ligações → 2 compras + 1 upsell',
    name: 'João',
    company: 'Piloto da comunidade',
  },
  {
    id: 'alanis',
    imageSrc:
      '/depoimentos-2026-ready/gallery/gallery_metricas_alanis-almeida-diz-que-o-workshop-de-lig_comp-a.png',
    imageAlt:
      'Depoimento de Alanis Almeida: o Workshop de ligações realmente funciona e gera destravamento',
    highlight: 'Workshop de ligações REALMENTE funciona',
    name: 'Alanis Almeida',
    company: 'Participante do Workshop',
    bodyQuote:
      'Terminou agora o Workshop de ligações e eu venho com propriedade dizer que REALMENTE funciona. Teve choro, teve risada, teve ligação e acima de tudo teve destravamento.',
  },
  {
    id: 'maycon-quote',
    imageSrc:
      '/depoimentos-2026-ready/gallery/gallery_metricas_maycon-ferraz-diz-que-so-aplicou-o-works.png',
    imageAlt:
      'Depoimento de Maycon Ferraz: aplicou o workshop e virou divisor de águas',
    highlight: 'Foi um divisor de águas pra mim',
    name: 'Maycon Ferraz',
    company: 'Participante do Workshop',
    bodyQuote:
      'Eu simplesmente só fiz o que aprendi no workshop e com os vídeos. 10% eu adaptei pro meu nicho. Foi um divisor de águas pra mim.',
  },
];

export const TestimonialsScrollSection: React.FC = () => {
  return (
    <section
      id="depoimentos-scroll"
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20">
            <MessageSquare className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">
              Depoimentos Reais
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            O que{' '}
            <span className="text-yellow-400 drop-shadow-md">pilotos da comunidade</span> estão
            dizendo
          </h2>

          <p className="text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Resultados com nome e contexto.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {curatedProofs.map((t) => (
            <WorkshopProofCard
              key={t.id}
              imageSrc={t.imageSrc}
              imageAlt={t.imageAlt}
              highlight={t.highlight}
              name={t.name}
              company={t.company}
              bodyQuote={t.bodyQuote}
              fitToImage={t.fitToImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
