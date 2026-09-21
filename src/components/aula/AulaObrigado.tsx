'use client';

import { useEffect, useState } from 'react';
import type { Aula } from '@/content/aulas';
import { buildGoogleCalendarUrl } from '@/lib/aula-calendar';
import { trackAulaLead, trackCommunityJoin } from '@/lib/metaPixel';

export function AulaObrigado({ aula, confirmed = false }: { aula: Aula; confirmed?: boolean }) {
  const [copied, setCopied] = useState(false);
  const calendarUrl = buildGoogleCalendarUrl(aula);

  useEffect(() => {
    if (!confirmed) return;
    trackAulaLead(aula.slug, aula.titulo);
  }, [aula.slug, aula.titulo, confirmed]);

  const copyMeet = async () => {
    if (!aula.linkMeet) return;
    try {
      await navigator.clipboard.writeText(aula.linkMeet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-xl flex-col justify-center px-4 py-16">
      <h1 className="whitespace-pre-line text-3xl font-bold leading-tight text-white sm:text-4xl">
        {aula.obrigado.titulo}
      </h1>

      <a
        href={aula.linkComunidade}
        target="_blank"
        rel="noopener noreferrer"
        className="aula-cta mt-10"
        onClick={() => trackCommunityJoin()}
      >
        {aula.obrigado.ctaComunidade}
      </a>

      <a
        href={calendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex w-full items-center justify-center rounded-full border-2 border-white px-5 py-3.5 text-sm font-bold text-white hover:bg-white hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
      >
        {aula.obrigado.ctaAgenda}
      </a>

      <div className="mt-8">
        <label htmlFor="aula-meet-link" className="mb-2 block text-sm font-bold text-gray-300">
          {aula.obrigado.meetLabel}
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="aula-meet-link"
            readOnly
            value={aula.linkMeet || 'Se o Meet ainda não estiver aqui, o link chega no WhatsApp.'}
            className="aula-input font-mono text-xs sm:text-sm"
          />
          <button
            type="button"
            onClick={copyMeet}
            disabled={!aula.linkMeet}
            className="shrink-0 rounded-full border border-yellow-400 px-4 py-3 text-sm font-bold text-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 disabled:opacity-40"
          >
            {copied ? aula.obrigado.copiado : aula.obrigado.copiar}
          </button>
        </div>
      </div>

      <p className="mt-8 text-sm leading-relaxed text-gray-300">{aula.obrigado.emailLine}</p>
      <p className="mt-3 text-sm leading-relaxed text-gray-500">{aula.obrigado.aviso}</p>
    </main>
  );
}
