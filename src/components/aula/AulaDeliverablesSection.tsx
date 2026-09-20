import type { Aula } from '@/content/aulas';
import { AulaReveal } from './AulaReveal';

export function AulaDeliverablesSection({ aula }: { aula: Aula }) {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AulaReveal>
          <h2 className="aula-section-title max-w-3xl text-2xl sm:text-4xl">{aula.entregasTitulo}</h2>
        </AulaReveal>
        <div className="mt-10 space-y-5">
          {aula.entregas.map((item, index) => (
            <AulaReveal key={item.titulo} delay={index * 0.05}>
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-4 border-b border-gray-800 pb-5">
                <span className="text-xl font-bold text-yellow-400">{index + 1}</span>
                <h3 className="whitespace-pre-line text-lg font-bold leading-snug text-white">{item.titulo}</h3>
              </div>
            </AulaReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
