import Image from 'next/image';
import type { Aula } from '@/content/aulas';
import { AulaReveal } from './AulaReveal';

export function AulaHostSection({ aula }: { aula: Aula }) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AulaReveal>
          <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-950 sm:aspect-[3/4] lg:aspect-auto lg:min-h-[34rem]">
              <Image
                src={aula.host.foto}
                alt={aula.host.nome}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 92vw, 460px"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent lg:hidden" />
            </div>

            <div className="flex flex-col justify-center border-t-2 border-yellow-400 pt-8 lg:border-l-2 lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-yellow-400">{aula.host.titulo}</p>
              <h2 className="aula-section-title mt-3 text-4xl sm:text-5xl">{aula.host.nome}</h2>
              <p className="mt-2 text-sm font-bold uppercase tracking-wide text-gray-400">{aula.host.cargo}</p>

              <p className="aula-title-shimmer mt-8 max-w-md text-pretty text-2xl font-bold leading-snug sm:text-3xl">
                {aula.host.destaque}
              </p>

              <div className="mt-6 max-w-lg space-y-4 text-pretty text-base leading-relaxed text-gray-300">
                {aula.host.paragrafos.map((paragrafo) => (
                  <p key={paragrafo.slice(0, 24)}>{paragrafo}</p>
                ))}
              </div>

              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-gray-800 pt-8">
                {aula.host.fatos.map((fato) => (
                  <div key={fato.label}>
                    <dt className="text-[11px] font-bold uppercase tracking-wide text-gray-500">{fato.label}</dt>
                    <dd className="mt-1 text-2xl font-bold text-yellow-400 sm:text-3xl">{fato.valor}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </AulaReveal>
      </div>
    </section>
  );
}
