'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { YouTubeThumbnail } from '@/components/ui/YouTubeThumbnail';
import type { Aula } from '@/content/aulas';
import { extractYouTubeId } from '@/lib/youtube';
import { AulaReveal } from './AulaReveal';

export function AulaStoriesSection({ aula }: { aula: Aula }) {
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AulaReveal>
          <p className="text-center text-[11px] font-bold uppercase tracking-wider text-yellow-400 lg:text-left">
            <span className="lg:hidden">Depoimentos reais · 35 min</span>
            <span className="hidden lg:inline">Assiste depois de garantir o link</span>
          </p>
          <h2 className="aula-section-title mx-auto mt-3 max-w-xl text-[1.75rem] leading-[1.15] sm:max-w-3xl sm:text-5xl lg:mx-0">
            {aula.historiasTitulo}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base leading-snug text-gray-300 lg:mx-0 lg:text-left">{aula.historiasApoio}</p>
        </AulaReveal>

        <div className={`mt-10 ${aula.historiasVideos.length > 1 ? 'grid gap-6 md:grid-cols-2' : 'mx-auto max-w-4xl'}`}>
          {aula.historiasVideos.map((video, index) => {
            const videoId = extractYouTubeId(video.url);
            if (!videoId) return null;
            const playing = playingUrl === video.url;
            const embed = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

            return (
              <AulaReveal key={video.url} delay={index * 0.06}>
                <article>
                  <div className="relative aspect-video overflow-hidden rounded-2xl border border-yellow-400/30 bg-gray-950 shadow-xl shadow-yellow-400/10">
                    {playing ? (
                      <iframe
                        title={video.titulo}
                        src={embed}
                        className="absolute inset-0 h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    ) : (
                      <>
                        {video.poster ? (
                          <Image
                            src={video.poster}
                            alt={video.titulo}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 92vw, 896px"
                          />
                        ) : (
                          <YouTubeThumbnail
                            videoId={videoId}
                            alt={video.titulo}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 92vw, 896px"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                        <button
                          type="button"
                          onClick={() => setPlayingUrl(video.url)}
                          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3"
                          aria-label={`Reproduzir ${video.titulo}`}
                        >
                          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-gray-900 shadow-xl ring-4 ring-yellow-400/30 transition-transform hover:scale-105 sm:h-20 sm:w-20">
                            <Play className="ml-0.5 h-7 w-7 fill-current sm:h-8 sm:w-8" />
                          </span>
                          <span className="rounded-full bg-gray-950/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-yellow-400">
                            {video.nome}
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                  <h3 className="mt-4 whitespace-pre-line text-center text-lg font-bold leading-snug text-white sm:text-xl lg:text-left">{video.titulo}</h3>
                </article>
              </AulaReveal>
            );
          })}
        </div>

        <div className="mt-14 space-y-8 border-t border-gray-800 pt-10">
          {aula.historias.map((historia, index) => (
            <AulaReveal key={historia.resultado} delay={index * 0.05}>
              {historia.nome ? (
                <figure className="mx-auto max-w-2xl border-t-2 border-yellow-400 pt-4 text-center lg:mx-0 lg:border-l-2 lg:border-t-0 lg:pl-4 lg:pt-0 lg:text-left">
                  <blockquote className="text-lg font-medium leading-snug text-white">
                    “{historia.texto}”
                  </blockquote>
                  <figcaption className="mt-3 text-sm font-bold text-yellow-400">
                    {historia.nome}
                    <span className="ml-2 whitespace-pre-line font-medium text-gray-500">{historia.resultado}</span>
                  </figcaption>
                </figure>
              ) : (
                <article className="text-center lg:text-left">
                  <p className="whitespace-pre-line text-lg font-bold leading-snug text-yellow-400">{historia.resultado}</p>
                  <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-gray-300 lg:mx-0">{historia.texto}</p>
                </article>
              )}
            </AulaReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
