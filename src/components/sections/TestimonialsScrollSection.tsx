'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { WorkshopProofCard } from '@/components/ui/WorkshopProofCard';

const curatedProofs = [
  {
    id: 'regularize',
    imageSrc: '/depoimentos-2026-ready/hero/hero_metricas_regularize-triplicou-faturamento.png',
    imageAlt:
      'Depoimento do cliente Regularize Health: faturamento triplicado após aplicar o método',
    highlight: 'Triplicamos o faturamento no mês seguinte',
    name: 'Robson Vieira',
    company: 'Regularize Health',
    companyUrl: 'https://www.regularizehealth.com.br',
    bodyQuote:
      'Desde que começamos a colocar em prática os conceitos do Rômulo Freitas, aplicando no inbound e no follow-up, triplicamos nosso faturamento já no mês seguinte.',
  },
  {
    id: 'izabela',
    imageSrc: '/depoimentos-2026-ready/hero/hero_metricas_izabela-4-reunioes-na-semana_parte-2.png',
    imageAlt: 'Depoimento de Izabela: 4 reuniões agendadas na mesma semana após live de cold call',
    highlight: 'Essa semana foram 4 reuniões agendadas por ligação',
    name: 'Izabela',
    bodyQuote:
      'Romulo, acompanhei a tua última Live de ligação que teve essa semana e você conseguiu me destravar.',
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
    imageSrc: '/depoimentos-2026-ready/hero/hero_metricas_alanis-marcou-reuniao.png',
    imageAlt: 'Depoimento de Alanis: marcou reunião após aplicar o método',
    highlight: 'Marcou reunião aplicando o método',
    name: 'Alanis',
    company: 'Participante',
  },
  {
    id: 'ciclo',
    imageSrc: '/depoimentos-2026-ready/hero/hero_metricas_ciclo-vendas-15-21-para-1-7-dias.png',
    imageAlt: 'Depoimento: ciclo de vendas reduzido de 15–21 dias para 1–7 dias',
    highlight: 'Ciclo de 15–21 dias → 1–7 dias',
    name: 'Resultado na comunidade',
    company: 'Métricas reais',
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
            Resultados legíveis, com nome e contexto — não uma grade de prints minúsculos.
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
              companyUrl={t.companyUrl}
              bodyQuote={t.bodyQuote}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
