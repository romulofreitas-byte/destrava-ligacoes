'use client';

import React, { useEffect, useState } from 'react';
import { WORKSHOP_INFO, WORKSHOP_SALES, WORKSHOP_LAST_CALL } from '@/lib/constants';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function computeTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

type WorkshopCountdownProps = {
  className?: string;
  withDate?: boolean;
  align?: 'center' | 'start';
  compactLine?: boolean;
  hideCaption?: boolean;
  size?: 'default' | 'sm';
  /** Hero: boxes (dias/hrs/min/seg) in a row, no caption */
  inlineBoxes?: boolean;
};

export const WorkshopCountdown: React.FC<WorkshopCountdownProps> = ({
  className = '',
  withDate = false,
  align = 'center',
  compactLine = false,
  hideCaption = false,
  size = 'default',
  inlineBoxes = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const target = WORKSHOP_INFO.dateObj;
    const tick = () => setTimeLeft(computeTimeLeft(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) {
    return (
      <div className={`text-gray-400 text-xs ${className}`} suppressHydrationWarning>
        …
      </div>
    );
  }

  if (timeLeft.expired) {
    return (
      <div className={`text-yellow-400 text-xs font-semibold ${className}`}>
        Módulo 1 iniciado
      </div>
    );
  }

  if (compactLine) {
    const short = `${String(timeLeft.days).padStart(2, '0')}d ${String(timeLeft.hours).padStart(2, '0')}h`;
    return (
      <p
        className={`text-gray-400 text-[10px] sm:text-xs font-medium tabular-nums ${className}`}
        suppressHydrationWarning
      >
        <span className="text-yellow-400/90 font-semibold">{short}</span>
        <span className="mx-1.5 text-gray-600">·</span>
        {WORKSHOP_SALES.showSpotsProgress ? (
          <>
            <span className="text-white font-semibold">
              {WORKSHOP_SALES.filledSpots}/{WORKSHOP_SALES.maxSpots}
            </span>
            <span className="text-gray-500"> vagas</span>
          </>
        ) : (
          <span className="text-white font-semibold">{WORKSHOP_LAST_CALL.spotsLine}</span>
        )}
      </p>
    );
  }

  if (inlineBoxes) {
    const parts = [
      { label: 'DIAS', value: timeLeft.days },
      { label: 'HRS', value: timeLeft.hours },
      { label: 'MIN', value: timeLeft.minutes },
      { label: 'SEG', value: timeLeft.seconds },
    ];
    return (
      <div className={`flex items-center gap-1.5 shrink-0 ${className}`} suppressHydrationWarning>
        {parts.map((p) => (
          <div
            key={p.label}
            className="flex flex-col items-center justify-center min-w-[2.4rem] sm:min-w-[2.6rem] px-1.5 py-1 rounded-md bg-gray-800/80 border border-gray-700/60"
          >
            <span className="text-white font-bold text-sm sm:text-base tabular-nums leading-none">
              {String(p.value).padStart(2, '0')}
            </span>
            <span className="text-gray-500 text-[8px] uppercase tracking-wide mt-0.5 leading-none">
              {p.label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  const parts = [
    { label: 'dias', value: timeLeft.days },
    { label: 'horas', value: timeLeft.hours },
    { label: 'min', value: timeLeft.minutes },
    { label: 'seg', value: timeLeft.seconds },
  ];

  const justifyClass = align === 'start' ? 'justify-center sm:justify-start' : 'justify-center';
  const alignClass = align === 'start' ? 'items-center sm:items-start' : 'items-center';
  const isSm = size === 'sm';

  return (
    <div className={`flex flex-col gap-1.5 ${alignClass} ${className}`} suppressHydrationWarning>
      {!hideCaption &&
        (withDate ? (
          <p
            className={`text-gray-400 text-[10px] sm:text-xs font-medium ${
              align === 'start' ? 'text-center sm:text-left' : 'text-center'
            }`}
          >
            {WORKSHOP_SALES.showSpotsProgress
              ? `Módulo 1 — ${WORKSHOP_INFO.dateDisplayLong}`
              : WORKSHOP_LAST_CALL.countdownCaption}
          </p>
        ) : (
          <p className="text-gray-400 text-[10px] sm:text-xs text-center sm:text-left">
            {WORKSHOP_SALES.showSpotsProgress
              ? `Contagem para o Módulo 1 (${WORKSHOP_INFO.dateDisplayShort})`
              : WORKSHOP_LAST_CALL.countdownCaption}
          </p>
        ))}
      <div className={`flex items-center gap-1 sm:gap-1.5 ${justifyClass}`}>
        {parts.map((p) => (
          <div
            key={p.label}
            className={`flex flex-col items-center rounded-lg border border-yellow-400/20 bg-gray-950/70 shadow-inner ${
              isSm
                ? 'min-w-[2.25rem] px-1.5 py-1'
                : 'min-w-[2.5rem] sm:min-w-[3rem] px-1.5 sm:px-2.5 py-1.5 sm:py-2'
            }`}
          >
            <span
              className={`text-yellow-400 font-bold tabular-nums leading-none ${
                isSm ? 'text-xs sm:text-sm' : 'text-sm sm:text-lg'
              }`}
            >
              {String(p.value).padStart(2, '0')}
            </span>
            <span
              className={`text-gray-500 uppercase tracking-wide mt-0.5 ${
                isSm ? 'text-[7px] sm:text-[8px]' : 'text-[8px] sm:text-[9px]'
              }`}
            >
              {p.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
