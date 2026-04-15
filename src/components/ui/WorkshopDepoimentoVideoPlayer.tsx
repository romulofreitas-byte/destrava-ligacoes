'use client';

import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { Maximize, Play } from 'lucide-react';

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
    ? 'rounded-2xl sm:rounded-3xl border-2 sm:border-[3px] border-yellow-400/40 shadow-2xl shadow-yellow-400/20 ring-1 ring-yellow-400/15'
    : 'rounded-xl sm:rounded-2xl border-2 border-yellow-400/30 shadow-xl shadow-yellow-400/10';

  const playBtnClass = isHero
    ? 'h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 ring-4 sm:ring-[6px] ring-yellow-400/35 shadow-xl sm:shadow-2xl shadow-yellow-500/35'
    : 'h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 ring-4 ring-yellow-400/30 shadow-lg shadow-yellow-400/40';

  const playIconClass = isHero
    ? 'h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 ml-0.5 sm:ml-1'
    : 'h-7 w-7 sm:h-8 sm:w-8 ml-0.5';

  /** Mobile: só proporção 16:9 pela largura (sem min-height que estica o bloco). */
  const aspectBoxClass = 'relative w-full aspect-video bg-gray-950';

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-black group ${frameClass} ${className}`}
    >
      <div className={aspectBoxClass}>
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
              alt="Miniatura do depoimento em vídeo"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 1152px"
              priority={isHero}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />
            <button
              type="button"
              onClick={() => setIframeLoaded(true)}
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 active:bg-black/25 transition-colors"
              aria-label="Reproduzir vídeo do depoimento nesta página"
            >
              <span
                className={`flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 scale-100 active:scale-95 sm:group-hover:scale-105 transition-transform ${playBtnClass}`}
              >
                <span className="absolute inset-0 rounded-full border-2 border-yellow-300/40 animate-pulse" />
                <Play className={`relative z-10 ${playIconClass}`} fill="currentColor" />
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
          className="absolute top-2 right-2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-white/15 bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/70 active:bg-black/80"
          aria-label="Tela cheia"
        >
          <Maximize className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
        </button>
      </div>
    </div>
  );
};
