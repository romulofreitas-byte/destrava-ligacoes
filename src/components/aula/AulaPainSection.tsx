import type { Aula } from '@/content/aulas';
import { AulaReveal } from './AulaReveal';

export function AulaPainSection({ aula }: { aula: Aula }) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AulaReveal>
          <h2 className="aula-section-title max-w-4xl text-2xl sm:text-4xl">{aula.doresTitulo}</h2>
        </AulaReveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {aula.dores.map((dor, index) => (
            <AulaReveal key={dor.titulo} delay={index * 0.06}>
              <article className="aula-panel aula-panel-hover h-full p-6">
                <h3 className="text-pretty text-lg font-bold text-yellow-400">{dor.titulo}</h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-gray-300">{dor.texto}</p>
              </article>
            </AulaReveal>
          ))}
        </div>
        <AulaReveal delay={0.12}>
          <p className="mt-8 max-w-3xl text-pretty text-base font-bold leading-relaxed text-white">
            {aula.doresFecho}
          </p>
        </AulaReveal>
      </div>
    </section>
  );
}
