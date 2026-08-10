'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

/**
 * Hero proof video slot.
 * Set NEXT_PUBLIC_HERO_PROOF_YOUTUBE_URL (or VIDEO_URL for mp4) when ready.
 */
function resolveYouTubeId(): string | null {
  const raw = process.env.NEXT_PUBLIC_HERO_PROOF_YOUTUBE_URL?.trim();
  if (!raw) return null;
  const fromWatch = raw.match(/[?&]v=([\w-]{11})/);
  if (fromWatch) return fromWatch[1];
  const fromShort = raw.match(/youtu\.be\/([\w-]{11})/);
  if (fromShort) return fromShort[1];
  const fromEmbed = raw.match(/youtube\.com\/embed\/([\w-]{11})/);
  if (fromEmbed) return fromEmbed[1];
  if (/^[\w-]{11}$/.test(raw)) return raw;
  return null;
}

const YOUTUBE_ID = resolveYouTubeId();
const MP4_SRC = process.env.NEXT_PUBLIC_HERO_PROOF_VIDEO_URL?.trim() || null;

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

  const frameClass = [
    'relative w-full overflow-hidden bg-gray-950/80',
    compact
      ? 'aspect-[3/4] max-h-[min(280px,36vh)]'
      : 'aspect-[3/4] max-h-[min(420px,48vh)]',
    'rounded-2xl border-2 border-dashed border-yellow-400/50',
    className,
  ].join(' ');

  if (MP4_SRC && playing) {
    return (
      <div className={frameClass.replace('border-dashed', 'border-solid')}>
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

  if (YOUTUBE_ID && playing) {
    return (
      <div className={frameClass.replace('border-dashed', 'border-solid')}>
        <iframe
          title="Prova em vídeo — ligação real ao vivo"
          src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  const canPlay = Boolean(YOUTUBE_ID || MP4_SRC);

  return (
    <div className={frameClass}>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.06),transparent_65%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-5 text-center">
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 opacity-90">
          <Image
            src="/logos-mundo-podium/simbolo_cor.png"
            alt=""
            fill
            className="object-contain"
            sizes="56px"
          />
        </div>

        <button
          type="button"
          onClick={() => canPlay && setPlaying(true)}
          disabled={!canPlay}
          className={[
            'flex items-center justify-center rounded-full',
            compact ? 'h-14 w-14' : 'h-16 w-16 sm:h-20 sm:w-20',
            'bg-yellow-400/12 border border-yellow-400/40',
            canPlay ? 'hover:bg-yellow-400/20 cursor-pointer' : 'cursor-default',
            'transition-colors',
          ].join(' ')}
          aria-label={canPlay ? 'Reproduzir vídeo de prova' : 'Vídeo em produção'}
        >
          <Play
            className={`${compact ? 'h-6 w-6' : 'h-7 w-7 sm:h-8 sm:w-8'} text-yellow-400 ml-0.5`}
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
