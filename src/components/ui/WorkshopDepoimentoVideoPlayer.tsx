'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

/** Local: arquivo em `public/`. Produção: defina URL absoluta (ex. storage/CDN) — o .mp4 local é ~1GB e não versionamos. */
const VIDEO_SRC =
  process.env.NEXT_PUBLIC_DEPOIMENTO_MAYCON_VIDEO_URL?.trim() ||
  '/Depoimento%20Maycon.mp4';

type WorkshopDepoimentoVideoPlayerProps = {
  /** Estilo mais impactante: bordas maiores, play central maior */
  variant?: 'default' | 'hero';
  className?: string;
};

export const WorkshopDepoimentoVideoPlayer: React.FC<
  WorkshopDepoimentoVideoPlayerProps
> = ({ variant = 'default', className = '' }) => {
  const isHero = variant === 'hero';
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => {
      setPlaying(true);
      setOverlayVisible(false);
    };
    const onPause = () => {
      setPlaying(false);
      setOverlayVisible(true);
    };
    const onEnded = () => {
      setPlaying(false);
      setOverlayVisible(true);
      setProgressPct(100);
    };
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('ended', onEnded);
    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      if (v.ended) {
        v.currentTime = 0;
        setProgressPct(0);
      }
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration) || v.duration <= 0) return;
    setProgressPct((v.currentTime / v.duration) * 100);
  }, []);

  const onProgressBarPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const v = videoRef.current;
      const bar = e.currentTarget;
      if (!v || !Number.isFinite(v.duration)) return;

      const seek = (clientX: number) => {
        const rect = bar.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
        v.currentTime = ratio * v.duration;
      };

      seek(e.clientX);
      const move = (ev: PointerEvent) => seek(ev.clientX);
      const up = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    },
    []
  );

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

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-black group ${frameClass} ${className}`}
    >
      <video
        ref={videoRef}
        className={`w-full bg-gray-950 object-cover ${
          isHero ? 'aspect-video min-h-[200px] sm:min-h-[280px] md:min-h-[360px]' : 'aspect-video'
        }`}
        src={VIDEO_SRC}
        playsInline
        preload="metadata"
        title="Depoimento de Maycon Ferraz sobre o Workshop Destrava Ligações"
        onTimeUpdate={onTimeUpdate}
        onClick={togglePlay}
        onLoadedMetadata={onTimeUpdate}
      />

      {overlayVisible && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 hover:bg-black/40 transition-colors"
          aria-label="Reproduzir depoimento em vídeo"
        >
          <span
            className={`flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 scale-100 group-hover:scale-105 transition-transform ${playBtnClass}`}
          >
            <div
              className={`absolute rounded-full border-2 border-yellow-300/40 animate-pulse ${isHero ? 'inset-0' : 'inset-0'}`}
            />
            <Play className={`relative z-10 ${playIconClass}`} fill="currentColor" />
          </span>
        </button>
      )}

      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/95 via-black/75 to-transparent pt-12 sm:pt-14 pb-3 px-3 sm:px-5">
        <div
          className={`rounded-full bg-gray-800/90 cursor-pointer mb-3 touch-none ${
            isHero ? 'h-2' : 'h-1.5'
          }`}
          onPointerDown={(e) => {
            e.stopPropagation();
            onProgressBarPointerDown(e);
          }}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressPct)}
          aria-label="Posição no vídeo"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 pointer-events-none"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className={`rounded-xl bg-gray-800/95 text-white hover:bg-gray-700 border border-gray-600/80 transition-colors ${
              isHero ? 'p-3.5' : 'p-2.5'
            }`}
            aria-label={playing ? 'Pausar' : 'Reproduzir'}
          >
            {playing ? (
              <Pause className={isHero ? 'w-6 h-6' : 'w-5 h-5'} />
            ) : (
              <Play className={isHero ? 'w-6 h-6' : 'w-5 h-5'} />
            )}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className={`rounded-xl bg-gray-800/95 text-white hover:bg-gray-700 border border-gray-600/80 transition-colors ${
              isHero ? 'p-3.5' : 'p-2.5'
            }`}
            aria-label={muted ? 'Ativar som' : 'Silenciar'}
          >
            {muted ? (
              <VolumeX className={isHero ? 'w-6 h-6' : 'w-5 h-5'} />
            ) : (
              <Volume2 className={isHero ? 'w-6 h-6' : 'w-5 h-5'} />
            )}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              enterFullscreen();
            }}
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
