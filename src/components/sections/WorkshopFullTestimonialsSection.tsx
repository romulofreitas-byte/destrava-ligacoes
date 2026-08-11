'use client';

import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { Clock, Maximize, Play, Users } from 'lucide-react';

/**
 * Compilado ~35 min de depoimentos do Módulo 1.
 * Aprofundamento pós depoimentos curtos — não compete pela primeira atenção.
 * NEXT_PUBLIC_MODULO1_TESTIMONIALS_YOUTUBE_URL (URL ou ID de 11 chars).
 */
const DEFAULT_YOUTUBE_ID = 'HKqIZtlBz6I';
const CUSTOM_POSTER = '/videos/modulo1-depoimentos-thumb.png';

function resolveModulo1YouTubeId(): string {
  const raw = process.env.NEXT_PUBLIC_MODULO1_TESTIMONIALS_YOUTUBE_URL?.trim();
  if (!raw) return DEFAULT_YOUTUBE_ID;
  const fromWatch = raw.match(/[?&]v=([\w-]{11})/);
  if (fromWatch) return fromWatch[1];
  const fromShort = raw.match(/youtu\.be\/([\w-]{11})/);
  if (fromShort) return fromShort[1];
  const fromEmbed = raw.match(/youtube\.com\/embed\/([\w-]{11})/);
  if (fromEmbed) return fromEmbed[1];
  if (/^[\w-]{11}$/.test(raw)) return raw;
  return DEFAULT_YOUTUBE_ID;
}

const YOUTUBE_ID = resolveModulo1YouTubeId();
const EMBED_SRC = `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

export const WorkshopFullTestimonialsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const enterFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void el.requestFullscreen().catch(() => {});
    }
  }, []);

  return (
    <section
      id="depoimentos-modulo1"
      className="relative overflow-hidden py-16 md:py-20 bg-gray-950"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,transparent_15%,black)]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[36rem] h-72 bg-yellow-400/8 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-5 backdrop-blur-md shadow-lg shadow-yellow-400/15">
            <Users className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide">
              Aprofundamento · Módulo 1
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            Quer ver o processo inteiro, com vários alunos,{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
              no mesmo módulo?
            </span>
          </h2>

          <p className="text-sm text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Assista o compilado completo do Módulo 1 — cerca de 35 depoimentos reais
            gravados durante a edição. É prova de profundidade pra quem já está inclinado
            e quer mais confiança antes de decidir.
          </p>
        </div>

        {/* Card maior que os depoimentos individuais curtos */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="relative overflow-hidden bg-black rounded-2xl sm:rounded-3xl border-2 sm:border-[3px] border-yellow-400/40 shadow-2xl shadow-yellow-400/15 ring-1 ring-yellow-400/10"
          >
            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 rounded-full bg-black/70 border border-yellow-400/35 px-3 py-1.5 backdrop-blur-sm">
              <Clock className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-yellow-400 text-[11px] sm:text-xs font-bold tracking-wide uppercase">
                35 min — depoimentos completos
              </span>
            </div>

            <div className="relative w-full aspect-video bg-gray-950">
              {iframeLoaded ? (
                <iframe
                  title="Compilado de depoimentos — Módulo 1 do Workshop Destrava Ligações"
                  src={EMBED_SRC}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <>
                  <Image
                    src={CUSTOM_POSTER}
                    alt="Depoimentos reais — Módulo 1 do Workshop Destrava Ligações"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setIframeLoaded(true)}
                    className="absolute inset-0 z-10 flex items-center justify-center group"
                    aria-label="Assistir compilado completo de depoimentos do Módulo 1"
                  >
                    <span className="flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-yellow-400 text-gray-900 ring-4 sm:ring-[6px] ring-yellow-400/35 shadow-xl group-hover:scale-105 transition-transform">
                      <Play className="h-8 w-8 sm:h-10 sm:w-10 ml-1" fill="currentColor" />
                    </span>
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  enterFullscreen();
                }}
                className="absolute bottom-3 right-3 z-20 p-2 rounded-lg bg-black/55 text-white border border-white/15 hover:bg-black/70 transition-colors backdrop-blur-sm"
                aria-label="Tela cheia"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="mt-4 text-center text-gray-500 text-xs leading-relaxed max-w-xl mx-auto">
            Compilado gravado ao vivo no Módulo 1 — vários alunos, no mesmo processo.
            Ideal se você quer ver a profundidade antes de garantir a vaga.
          </p>
        </div>
      </div>
    </section>
  );
};
