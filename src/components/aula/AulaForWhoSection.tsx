import type { Aula } from '@/content/aulas';
import { AulaReveal } from './AulaReveal';

export function AulaForWhoSection({ aula }: { aula: Aula }) {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AulaReveal>
          <p className="text-center text-[11px] font-bold uppercase tracking-wider text-yellow-400 lg:text-left">Pra quem é</p>
          <h2 className="aula-section-title mx-auto mt-3 max-w-2xl text-3xl sm:text-5xl lg:mx-0">{aula.paraQuemSecaoTitulo}</h2>
        </AulaReveal>

        <div className="mt-8 grid lg:mt-12 lg:grid-cols-2">
          <AulaReveal>
            <div className="border-t-2 border-yellow-400 py-8 text-center lg:pr-14 lg:text-left">
              <h3 className="whitespace-nowrap text-sm font-bold uppercase tracking-wider text-yellow-400">{aula.paraQuemTitulo}</h3>
              <ul className="mt-8 space-y-6">
                {aula.paraQuem.map((item, index) => (
                  <li key={item} className="flex flex-col items-center gap-2 lg:flex-row lg:items-start lg:gap-4">
                    <span className="w-7 shrink-0 text-sm font-bold tabular-nums text-yellow-400" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-base font-medium leading-snug text-white sm:text-lg">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </AulaReveal>

          <AulaReveal delay={0.08}>
            <div className="border-t-2 border-gray-700 py-8 text-center lg:border-l lg:border-t-2 lg:border-gray-700 lg:pl-14 lg:text-left">
              <h3 className="whitespace-nowrap text-sm font-bold uppercase tracking-wider text-gray-500">{aula.naoEhParaTitulo}</h3>
              <ul className="mt-8 space-y-6">
                {aula.naoEhPara.map((item) => (
                  <li key={item} className="flex flex-col items-center gap-2 lg:flex-row lg:items-start lg:gap-4">
                    <span className="h-px w-5 shrink-0 bg-gray-600 lg:mt-2" aria-hidden="true" />
                    <p className="text-base leading-snug text-gray-500 sm:text-lg">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </AulaReveal>
        </div>
      </div>
    </section>
  );
}
