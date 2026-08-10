'use client';

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { WORKSHOP_PLATFORM_RULES, WORKSHOP_DURATION } from '@/lib/constants';

export const WorkshopFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'O workshop e a Sala de Ligação ficam gravados?',
      answer:
        'Sim. Ficam gravados na Mundo Pódium durante o período de acesso incluso (60 dias).',
    },
    {
      question: 'E se eu não puder participar no horário ao vivo?',
      answer:
        'Horário de Brasília. As gravações ficam disponíveis na plataforma pelos 60 dias inclusos.',
    },
    {
      question: 'Preciso ter experiência em vendas?',
      answer:
        'Não. Serve para quem depende de ligações para gerar negócios, em qualquer nível.',
    },
    {
      question: 'Funciona para meu nicho?',
      answer:
        'Sim. O método se adapta a seguros, saúde, jurídico, contabilidade, serviços, agências e mercados regulados.',
    },
    {
      question: 'Vou realmente fazer ligações durante o workshop?',
      answer:
        'Sim. Você pratica ao vivo, monta a Anatomia da Ligação e liga com suporte em tempo real.',
    },
    {
      question: 'Por que custa R$ 897,00?',
      answer: `Porque é prática de verdade: ${WORKSHOP_DURATION.detailLine}, ligações ao vivo, Anatomia da Ligação e 60 dias na Mundo Pódium — não funil isca.`,
    },
    {
      question: 'Há garantia?',
      answer:
        'Sim — condicionada à execução. Os termos estão no vídeo da seção Garantia desta página.',
    },
    {
      question: 'Como funciona o acesso à plataforma?',
      answer: WORKSHOP_PLATFORM_RULES.faqHowPlatformWorks,
    },
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq-workshop"
      className="relative overflow-hidden py-16 md:py-20 bg-gray-900"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20">
            <HelpCircle className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">
              Perguntas Frequentes
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            Dúvidas{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              Frequentes
            </span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-xl transition-colors hover:border-yellow-400/40"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="w-full text-left px-5 sm:px-6 py-4 flex items-center justify-between gap-4"
                    aria-expanded={isOpen}
                  >
                    <span className="text-white font-semibold text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <span
                      className={`text-yellow-400 text-xl leading-none transition-transform ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-5 sm:px-6 pb-5 text-gray-300 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
