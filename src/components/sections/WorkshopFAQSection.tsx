'use client';

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export const WorkshopFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'O workshop tem replay?',
      answer: 'Não. O workshop é 100% ao vivo, sem replay. Isso garante que apenas pessoas comprometidas participem e eleva a qualidade do evento.'
    },
    {
      question: 'Preciso ter experiência em vendas?',
      answer: 'Não. O workshop é para qualquer profissional que depende de ligações para gerar negócios, independente do nível de experiência.'
    },
    {
      question: 'Funciona para meu nicho?',
      answer: 'Sim. O método é universal e se adapta a qualquer nicho: serviços, produtos, agências, consultorias e até mercados regulados como investimentos.'
    },
    {
      question: 'Vou realmente fazer ligações durante o workshop?',
      answer: 'Sim. Você vai praticar ao vivo, construir seu script e fazer suas primeiras ligações com suporte e análise em tempo real.'
    },
    {
      question: 'Por que custa R$ 99,99?',
      answer: 'É um investimento simbólico que garante comprometimento e entrega real. Não é funil isca gratuito — é treinamento prático de 3 horas com demonstração real.'
    }
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq-workshop" 
      className="relative overflow-hidden py-16 md:py-20 bg-gray-900"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <HelpCircle className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">Perguntas Frequentes</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Dúvidas{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">Frequentes</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              
              return (
                <div
                  key={index}
                  className="bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-yellow-400/50 transition-all duration-300 shadow-lg backdrop-blur-xl animate-fade-in-up"
                  style={{transitionDelay: `${300 + index * 100}ms`}}
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-900/20 transition-colors duration-200"
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-white pr-4">
                      {faq.question}
                    </h3>
                    <div
                      className={`w-6 h-6 flex items-center justify-center transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-4">
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
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












