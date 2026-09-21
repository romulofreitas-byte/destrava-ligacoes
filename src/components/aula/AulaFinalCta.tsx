'use client';

import type { Aula } from '@/content/aulas';
import { AulaReveal } from './AulaReveal';
import { useAulaQuandoLabel } from './useAulaQuandoLabel';

export function AulaFinalCta({ aula }: { aula: Aula }) {
  const quando = useAulaQuandoLabel(aula);

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <AulaReveal>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="whitespace-pre-line text-3xl font-bold leading-tight text-white drop-shadow-[0_0_28px_rgba(250,204,21,0.18)] sm:text-5xl">
            {aula.ctaFinal.titulo}
          </h2>
          <p className="mt-5 text-base font-bold text-gray-300 sm:text-xl">
            {quando}. Grátis. Google Meet. Sem gravação.
          </p>
          <a href="#cadastro" className="aula-cta mx-auto mt-8 max-w-md">
            {aula.ctaFinal.botao}
          </a>
        </div>
      </AulaReveal>
    </section>
  );
}
