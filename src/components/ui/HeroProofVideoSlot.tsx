'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { YouTubeThumbnail } from '@/components/ui/YouTubeThumbnail';
import { extractYouTubeId } from '@/lib/youtube';

/**
 * Hero proof video slot.
 * Set NEXT_PUBLIC_HERO_PROOF_YOUTUBE_URL (or VIDEO_URL for mp4) when ready.
 */
const YOUTUBE_ID = extractYouTubeId(process.env.NEXT_PUBLIC_HERO_PROOF_YOUTUBE_URL);
const MP4_SRC = process.env.NEXT_PUBLIC_HERO_PROOF_VIDEO_URL?.trim() || null;
const YOUTUBE_EMBED = YOUTUBE_ID
  ? `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
  : null;

type HeroProofVideoSlotProps = {
  className?: string;
  /** Smaller on mobile */
  compact?: boolean;
};

export const HeroProofVideoSlot: React.FC<HeroProofVideoSlotProps> = ({
  className = '',
  compact = false,
}) => {
  const [playing, setPlaying] = useState(false);
  const canPlay = Boolean(YOUTUBE_ID || MP4_SRC);

  const frameClass = [
    'relative w-full overflow-hidden bg-gray-950 aspect-video',
    canPlay
      ? 'rounded-2xl border-2 border-solid border-yellow-400/40 shadow-xl shadow-yellow-400/10'
      : 'rounded-2xl border-2 border-dashed border-yellow-400/50',
    className,
  ].join(' ');

  if (MP4_SRC && playing) {
    return (
      <div className={frameClass}>
        <video
          src={MP4_SRC}
          className="absolute inset-0 h-full w-full object-cover"
          controls
          autoPlay
          playsInline
        />
      </div>
    );
  }

  if (YOUTUBE_EMBED && playing) {
    return (
      <div className={frameClass}>
        <iframe
          title="Prova em vídeo — ligação real ao vivo"
          src={YOUTUBE_EMBED}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <div className={frameClass}>
      {YOUTUBE_ID ? (
        <>
          <YouTubeThumbnail
            videoId={YOUTUBE_ID}
            alt="Miniatura do vídeo de prova — ligação real ao vivo"
            fill
            className="object-cover"
            sizes={compact ? '(max-width: 768px) 90vw, 420px' : '(max-width: 1024px) 90vw, 560px'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.06),transparent_65%)]" />
        </>
      )}

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-5 text-center">
        {!canPlay && (
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 opacity-90">
            <Image
              src="/logos-mundo-podium/simbolo_cor.png"
              alt=""
              fill
              className="object-contain"
              sizes="56px"
            />
          </div>
        )}

        <button
          type="button"
          onClick={() => canPlay && setPlaying(true)}
          disabled={!canPlay}
          className={[
            'flex items-center justify-center rounded-full',
            compact ? 'h-14 w-14' : 'h-16 w-16 sm:h-20 sm:w-20',
            canPlay
              ? 'bg-yellow-400 text-gray-900 ring-4 ring-yellow-400/35 shadow-xl hover:scale-105 cursor-pointer'
              : 'bg-yellow-400/12 border border-yellow-400/40 cursor-default',
            'transition-transform',
          ].join(' ')}
          aria-label={canPlay ? 'Reproduzir vídeo de prova' : 'Vídeo em produção'}
        >
          <Play
            className={`${compact ? 'h-6 w-6' : 'h-7 w-7 sm:h-8 sm:w-8'} ${canPlay ? 'text-gray-900' : 'text-yellow-400'} ml-0.5`}
            fill="currentColor"
          />
        </button>

        {!canPlay && (
          <div className="space-y-1">
            <p className="text-yellow-400 font-bold text-[11px] sm:text-xs tracking-[0.18em] uppercase">
              Vídeo em produção
            </p>
            <p className="text-gray-400 text-[10px] sm:text-xs max-w-[14rem] leading-relaxed">
              Ligação real ao vivo — sem corte, sem ator
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
