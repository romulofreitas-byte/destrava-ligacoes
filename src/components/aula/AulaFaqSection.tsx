'use client';

import { useState } from 'react';
import type { Aula } from '@/content/aulas';
import { AulaReveal } from './AulaReveal';

export function AulaFaqSection({ aula }: { aula: Aula }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <AulaReveal>
          <h2 className="aula-section-title text-2xl sm:text-4xl">{aula.faqTitulo}</h2>
        </AulaReveal>
        <div className="mt-8 divide-y divide-gray-800 border-y border-gray-800">
          {aula.faq.map((item, index) => {
            const open = openIndex === index;
            const panelId = `aula-faq-panel-${index}`;
            const buttonId = `aula-faq-button-${index}`;
            return (
              <div key={item.pergunta}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left font-bold text-white transition-colors hover:text-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
                    onClick={() => setOpenIndex(open ? null : index)}
                  >
                    <span className="text-pretty">{item.pergunta}</span>
                    <span
                      aria-hidden="true"
                      className={`text-yellow-400 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 text-sm leading-relaxed text-gray-300">{item.resposta}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
