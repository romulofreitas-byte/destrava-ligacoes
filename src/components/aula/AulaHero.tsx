'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Aula } from '@/content/aulas';
import { getAulaQuandoLabel, isAulaEncerrada } from '@/content/aulas';
import { trackAulaViewContent } from '@/lib/metaPixel';
import { AulaCountdown } from './AulaCountdown';
import { AulaSignupCard } from './AulaSignupCard';

export function AulaHero({ aula }: { aula: Aula }) {
  const [closed, setClosed] = useState(() => isAulaEncerrada(aula));
  const quando = getAulaQuandoLabel(aula);
  const prova = aula.historias.find((historia) => historia.nome && historia.texto);

  useEffect(() => {
    trackAulaViewContent(aula.slug, aula.titulo);
  }, [aula.slug, aula.titulo]);

  useEffect(() => {
    if (closed) return undefined;
    const id = window.setInterval(() => {
      if (isAulaEncerrada(aula)) setClosed(true);
    }, 1000);
    return () => window.clearInterval(id);
  }, [aula, closed]);

  return (
    <section className="px-4 pb-14 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="animate-fade-in-up text-[11px] font-bold tracking-[0.18em] text-yellow-400 sm:text-xs">
            {aula.eyebrow} · {quando}
          </p>
          <h1
            className="animate-fade-in-up mt-4 text-pretty text-[clamp(1.55rem,6.4vw,3.15rem)] font-bold leading-[1.1] text-white"
            style={{ animationDelay: '80ms' }}
          >
            <span className="block">{aula.tituloLinha1}</span>
            <span className="aula-title-shimmer mt-1 block whitespace-nowrap">{aula.tituloLinha2}</span>
          </h1>
          <p
            className="animate-fade-in-up mt-5 max-w-xl text-pretty text-lg font-bold leading-snug text-gray-300 sm:text-xl"
            style={{ animationDelay: '160ms' }}
          >
            {aula.subtitulo}
          </p>
          <div
            className="animate-fade-in-up mt-4 max-w-xl space-y-3 text-pretty text-sm leading-relaxed text-gray-300 sm:text-base"
            style={{ animationDelay: '220ms' }}
          >
            {aula.paragrafosHero.map((paragrafo) => (
              <p key={paragrafo.slice(0, 28)}>{paragrafo}</p>
            ))}
          </div>

          {prova ? (
            <figure
              className="animate-fade-in-up mt-6 max-w-xl border-l-2 border-yellow-400 pl-4"
              style={{ animationDelay: '260ms' }}
            >
              <blockquote className="text-pretty text-base font-medium leading-snug text-white sm:text-lg">
                “{prova.texto}”
              </blockquote>
              <figcaption className="mt-2 text-sm font-bold text-yellow-400">{prova.nome}</figcaption>
            </figure>
          ) : null}

          <div
            className="animate-fade-in-up mt-6 flex items-center gap-3"
            style={{ animationDelay: '300ms' }}
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-yellow-400/40">
              <Image src={aula.host.foto} alt={aula.host.nome} fill className="object-cover" sizes="48px" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{aula.host.nome}</p>
              <p className="text-xs text-gray-400">{aula.host.cargo}</p>
            </div>
          </div>

          {!closed ? (
            <div className="animate-fade-in-up mt-8" style={{ animationDelay: '340ms' }}>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                {aula.form.countdownLabel}
              </p>
              <AulaCountdown aula={aula} onClosed={() => setClosed(true)} />
            </div>
          ) : null}
          {!closed ? (
            <a
              href="#cadastro"
              className="aula-cta animate-fade-in-up mt-7 max-w-md lg:hidden"
              style={{ animationDelay: '380ms' }}
            >
              {aula.ctaLabel}
            </a>
          ) : null}
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '180ms' }}>
          <AulaSignupCard aula={aula} />
        </div>
      </div>
    </section>
  );
}
