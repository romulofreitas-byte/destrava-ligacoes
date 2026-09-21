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
    <section>
      <div className="relative isolate min-h-[280px] overflow-hidden lg:hidden">
        <Image
          src={aula.host.foto}
          alt={aula.host.nome}
          fill
          priority
          className="object-cover object-[center_18%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/55 to-black/25" />
        <div className="relative z-10 flex min-h-[280px] flex-col items-center justify-end px-4 pb-5 pt-8 text-center lg:hidden">
          <p
            aria-hidden="true"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-yellow-400 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-gray-900"
          >
            <span className="aula-pulse" />
            {aula.eyebrow} · {quando}
          </p>
          <p aria-hidden="true" className="mt-3 text-[clamp(1.85rem,9vw,2.55rem)] font-bold leading-[1.05] text-white">
            <span className="block">{aula.tituloLinha1}</span>
            <span className="aula-title-shimmer mt-1 block">{aula.tituloLinha2}</span>
          </p>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 px-4 pb-10 pt-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8 lg:pb-14 lg:pt-8">
        <div className="text-center lg:text-left">
          <p className="sr-only lg:not-sr-only lg:whitespace-nowrap lg:text-xs lg:font-bold lg:tracking-wider lg:text-yellow-400">
            {aula.eyebrow} · {quando}
          </p>
          <h1 className="mt-0 text-[clamp(1.85rem,9vw,2.55rem)] font-bold leading-[1.05] text-white max-lg:sr-only lg:text-[clamp(1.55rem,6.4vw,3.15rem)] lg:leading-[1.1]">
            <span className="block">{aula.tituloLinha1}</span>
            <span className="aula-title-shimmer mt-1 block lg:whitespace-nowrap">{aula.tituloLinha2}</span>
          </h1>

          <p className="text-lg font-bold leading-snug text-gray-100 lg:hidden">{aula.ganchoMobile}</p>
          <p className="mt-5 hidden max-w-xl whitespace-pre-line text-xl font-bold leading-snug text-gray-300 lg:block">
            {aula.subtitulo}
          </p>
          <p className="mt-1 text-sm font-medium text-gray-400 lg:hidden">Ainda em 2026. Grátis. 1h30 no Meet.</p>

          <div className="mt-4 hidden max-w-xl space-y-3 text-base leading-relaxed text-gray-300 lg:block">
            {aula.paragrafosHero.map((paragrafo) => (
              <p key={paragrafo.slice(0, 28)}>{paragrafo}</p>
            ))}
          </div>

          {prova ? (
            <figure className="mt-4 rounded-2xl border border-yellow-400/35 bg-gray-800/70 p-4 text-center shadow-lg shadow-yellow-400/5 lg:mt-6 lg:max-w-xl lg:rounded-none lg:border-0 lg:border-l-2 lg:border-yellow-400 lg:bg-transparent lg:p-0 lg:pl-4 lg:text-left lg:shadow-none">
              <blockquote className="text-[15px] font-medium leading-snug text-white lg:text-lg">
                “{prova.texto}”
              </blockquote>
              <figcaption className="mt-2 text-xs font-black uppercase tracking-wide text-yellow-400 lg:text-sm lg:font-bold lg:normal-case lg:tracking-normal">
                {prova.nome}
              </figcaption>
            </figure>
          ) : null}

          <div className="mt-6 hidden items-center gap-3 lg:flex">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-yellow-400/40">
              <Image src={aula.host.foto} alt={aula.host.nome} fill className="object-cover" sizes="48px" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{aula.host.nome}</p>
              <p className="text-xs text-gray-400">{aula.host.cargo}</p>
            </div>
          </div>

          {!closed ? (
            <div className="mt-5 flex flex-col items-center lg:mt-8 lg:items-start">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                {aula.form.countdownLabel}
              </p>
              <AulaCountdown aula={aula} onClosed={() => setClosed(true)} />
            </div>
          ) : null}
        </div>

        <AulaSignupCard aula={aula} />
      </div>
    </section>
  );
}
