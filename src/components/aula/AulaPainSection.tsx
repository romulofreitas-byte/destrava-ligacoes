import type { Aula } from '@/content/aulas';
import { AulaReveal } from './AulaReveal';

export function AulaPainSection({ aula }: { aula: Aula }) {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AulaReveal>
          <h2 className="aula-section-title mx-auto max-w-4xl text-2xl sm:text-4xl lg:mx-0">{aula.doresTitulo}</h2>
        </AulaReveal>
        <div className="mt-6 grid gap-4 lg:mt-10 lg:grid-cols-3 lg:gap-5">
          {aula.dores.map((dor, index) => (
            <AulaReveal key={dor.titulo} delay={index * 0.06}>
              <article className="aula-panel aula-panel-hover h-full p-5 text-center sm:p-6 lg:text-left">
                <h3 className="text-lg font-bold leading-snug text-yellow-400">{dor.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">{dor.texto}</p>
              </article>
            </AulaReveal>
          ))}
        </div>
        <AulaReveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-3xl text-center text-base font-bold leading-relaxed text-white lg:mx-0 lg:text-left">
            {aula.doresFecho}
          </p>
        </AulaReveal>
      </div>
    </section>
  );
}
