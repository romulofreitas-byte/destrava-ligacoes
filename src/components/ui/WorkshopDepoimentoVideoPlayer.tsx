'use client';

import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Maximize, Play } from 'lucide-react';

/** Depoimento hospedado no YouTube: https://youtu.be/FyR0wVqGXKY */
const DEFAULT_YOUTUBE_ID = 'FyR0wVqGXKY';

function resolveYouTubeId(): string {
  const raw = process.env.NEXT_PUBLIC_DEPOIMENTO_MAYCON_YOUTUBE_URL?.trim();
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

const YOUTUBE_ID = resolveYouTubeId();
const POSTER_SRC = `https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;
const WATCH_URL = `https://www.youtube.com/watch?v=${YOUTUBE_ID}`;

type WorkshopDepoimentoVideoPlayerProps = {
  /** Estilo mais impactante: bordas maiores, play central maior */
  variant?: 'default' | 'hero';
  className?: string;
};

export const WorkshopDepoimentoVideoPlayer: React.FC<
  WorkshopDepoimentoVideoPlayerProps
> = ({ variant = 'default', className = '' }) => {
  const isHero = variant === 'hero';
  const containerRef = useRef<HTMLDivElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const embedSrc = `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  const enterFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void el.requestFullscreen().catch(() => {});
    }
  }, []);

  const frameClass = isHero
    ? 'rounded-3xl border-[3px] border-yellow-400/40 shadow-2xl shadow-yellow-400/25 ring-1 ring-yellow-400/20'
    : 'rounded-2xl border-2 border-yellow-400/30 shadow-2xl shadow-yellow-400/10';

  const playBtnClass = isHero
    ? 'h-24 w-24 sm:h-28 sm:w-28 ring-[6px] ring-yellow-400/35 shadow-2xl shadow-yellow-500/40'
    : 'h-16 w-16 sm:h-20 sm:w-20 ring-4 ring-yellow-400/30 shadow-lg shadow-yellow-400/40';

  const playIconClass = isHero
    ? 'h-12 w-12 sm:h-14 sm:w-14 ml-1'
    : 'h-8 w-8 sm:h-10 sm:w-10 ml-1';

  const aspectBoxClass = isHero
    ? 'aspect-video min-h-[200px] sm:min-h-[280px] md:min-h-[360px]'
    : 'aspect-video';

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-black group ${frameClass} ${className}`}
    >
      <div className={`relative w-full bg-gray-950 ${aspectBoxClass}`}>
        {iframeLoaded ? (
          <iframe
            title="Depoimento de Maycon Ferraz sobre o Workshop Destrava Ligações"
            src={embedSrc}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <>
            <Image
              src={POSTER_SRC}
              alt="Miniatura do depoimento em vídeo no YouTube"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1152px"
              priority={isHero}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            <button
              type="button"
              onClick={() => setIframeLoaded(true)}
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 hover:bg-black/25 transition-colors"
              aria-label="Carregar e reproduzir vídeo do depoimento no YouTube"
            >
              <span
                className={`flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 scale-100 group-hover:scale-105 transition-transform ${playBtnClass}`}
              >
                <span
                  className={`absolute rounded-full border-2 border-yellow-300/40 animate-pulse ${isHero ? 'inset-0' : 'inset-0'}`}
                />
                <Play className={`relative z-10 ${playIconClass}`} fill="currentColor" />
              </span>
            </button>
          </>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/95 via-black/75 to-transparent pt-10 sm:pt-12 pb-3 px-3 sm:px-5 pointer-events-none">
        <div className="flex items-center justify-center gap-3 sm:gap-4 pointer-events-auto">
          <a
            href={WATCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-xl bg-gray-800/95 text-white hover:bg-gray-700 border border-gray-600/80 transition-colors ${
              isHero ? 'px-4 py-3.5 text-sm' : 'px-3 py-2.5 text-sm'
            }`}
          >
            <ExternalLink className={isHero ? 'w-5 h-5' : 'w-4 h-4'} />
            YouTube
          </a>
          <button
            type="button"
            onClick={enterFullscreen}
            className={`rounded-xl bg-gray-800/95 text-white hover:bg-gray-700 border border-gray-600/80 transition-colors ${
              isHero ? 'p-3.5' : 'p-2.5'
            }`}
            aria-label="Tela cheia"
          >
            <Maximize className={isHero ? 'w-6 h-6' : 'w-5 h-5'} />
          </button>
        </div>
      </div>
    </div>
  );
};
