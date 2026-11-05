'use client';

import React, { useCallback, useRef, useState } from 'react';
import { Maximize, Play, ShieldCheck, Video } from 'lucide-react';
import { YouTubeThumbnail } from '@/components/ui/YouTubeThumbnail';
import { extractYouTubeId } from '@/lib/youtube';

const YOUTUBE_ID = extractYouTubeId(process.env.NEXT_PUBLIC_GARANTIA_YOUTUBE_URL);

export function CorretoresGarantia() {
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
    <section id="garantia" className="relative overflow-hidden py-16 md:py-20 bg-gray-900">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-16 left-10 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl animate-float" />
        <div
          className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
      </div>
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 border border-yellow-400/30 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide">
              Garantia condicionada à execução
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            Participou dos dois encontros, fez as simulações e as ligações, e{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              quer o valor de volta?
            </span>
          </h2>
          <p className="text-sm text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            A devolução vale para quem participar dos dois encontros e fizer as simulações e as
            ligações da tarefa. O prazo e o procedimento são os do vídeo.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div
            ref={containerRef}
            className="relative overflow-hidden bg-black rounded-2xl border-2 border-yellow-400/35 shadow-xl shadow-yellow-400/10"
          >
            <div className="relative w-full aspect-video bg-gray-950">
              {YOUTUBE_ID && iframeLoaded ? (
                <iframe
                  title="Garantia e termos do Workshop Destrava Ligações"
                  src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : YOUTUBE_ID ? (
                <>
                  <YouTubeThumbnail
                    videoId={YOUTUBE_ID}
                    alt="Vídeo da garantia e termos"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                  <div className="absolute inset-0 bg-gray-950/40" />
                  <button
                    type="button"
                    onClick={() => setIframeLoaded(true)}
                    className="absolute inset-0 flex items-center justify-center group"
                    aria-label="Assistir vídeo da garantia"
                  >
                    <span className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-yellow-400 text-gray-900 ring-4 ring-yellow-400/35 shadow-xl group-hover:scale-105 transition-transform">
                      <Play className="h-8 w-8 ml-1" fill="currentColor" />
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={enterFullscreen}
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors"
                    aria-label="Tela cheia"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6">
                  <Video className="w-7 h-7 text-yellow-400" />
                  <p className="text-white font-semibold text-sm text-center">
                    Vídeo da garantia e dos termos
                  </p>
                </div>
              )}
            </div>
          </div>
          <p className="mt-4 text-center text-[#CDCDD2] text-xs leading-relaxed max-w-lg mx-auto">
            Os termos completos da garantia são os descritos neste vídeo.
          </p>
        </div>
      </div>
    </section>
  );
}
