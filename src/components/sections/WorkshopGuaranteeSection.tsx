'use client';

import React, { useCallback, useRef, useState } from 'react';
import { Maximize, Play, ShieldCheck, Video } from 'lucide-react';
import { YouTubeThumbnail } from '@/components/ui/YouTubeThumbnail';
import { extractYouTubeId } from '@/lib/youtube';

/**
 * ID do vídeo de garantia/termos.
 * Defina NEXT_PUBLIC_GARANTIA_YOUTUBE_URL (URL completa ou ID de 11 chars).
 * Enquanto vazio, exibe o slot placeholder.
 */
const YOUTUBE_ID = extractYouTubeId(process.env.NEXT_PUBLIC_GARANTIA_YOUTUBE_URL);

export const WorkshopGuaranteeSection: React.FC = () => {
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
      id="garantia"
      className="relative overflow-hidden py-16 md:py-20 bg-gray-900"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-16 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-float" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20">
            <ShieldCheck className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide">
              Garantia condicionada à execução
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            E se eu fizer o que o workshop pede e{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              não evoluir?
            </span>
          </h2>

          <p className="text-sm text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            A garantia da Mundo Pódium é condicionada à execução — não é promessa vaga de resultado.
            Assista ao vídeo com os termos explicados pelo Rômulo.
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
                /* Slot vazio — aguardando URL do vídeo de termos */
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center">
                    <Video className="w-7 h-7 text-yellow-400" />
                  </div>
                  <p className="text-white font-semibold text-sm sm:text-base text-center">
                    Vídeo da garantia e dos termos
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm text-center max-w-sm leading-relaxed">
                    Em breve: o Rômulo explica aqui, em vídeo, a garantia condicionada à execução e as condições.
                  </p>
                </div>
              )}
            </div>
          </div>

          <p className="mt-4 text-center text-gray-500 text-xs leading-relaxed max-w-lg mx-auto">
            Os termos completos da garantia condicionada à execução são os descritos neste vídeo.
            Em caso de dúvida, fale com o suporte antes da compra.
          </p>
        </div>
      </div>
    </section>
  );
};
