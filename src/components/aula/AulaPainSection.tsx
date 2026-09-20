import type { Aula } from '@/content/aulas';
import { AulaReveal } from './AulaReveal';

export function AulaPainSection({ aula }: { aula: Aula }) {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AulaReveal>
          <h2 className="aula-section-title max-w-4xl text-2xl sm:text-4xl">{aula.doresTitulo}</h2>
        </AulaReveal>
        <div className="-mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:mt-10 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {aula.dores.map((dor, index) => (
            <AulaReveal key={dor.titulo} delay={index * 0.06} className="w-[80vw] shrink-0 snap-center md:w-auto">
              <article className="aula-panel aula-panel-hover h-full p-5 sm:p-6">
                <h3 className="text-lg font-bold leading-snug text-yellow-400">{dor.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">{dor.texto}</p>
              </article>
            </AulaReveal>
          ))}
        </div>
        <AulaReveal delay={0.12}>
          <p className="mt-8 max-w-3xl text-base font-bold leading-relaxed text-white">
            {aula.doresFecho}
          </p>
        </AulaReveal>
      </div>
    </section>
  );
}
