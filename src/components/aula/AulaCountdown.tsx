'use client';

import { useEffect, useState } from 'react';
import type { Aula } from '@/content/aulas';
import { isAulaEncerrada } from '@/content/aulas';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

export function AulaCountdown({
  aula,
  onClosed,
}: {
  aula: Aula;
  onClosed?: () => void;
}) {
  const [left, setLeft] = useState<TimeLeft>(() => getTimeLeft(new Date(aula.data)));
  const [closed, setClosed] = useState(() => isAulaEncerrada(aula));
  const [tickKey, setTickKey] = useState(0);

  useEffect(() => {
    if (closed) return undefined;

    const tick = () => {
      setLeft(getTimeLeft(new Date(aula.data)));
      setTickKey((key) => key + 1);
      if (isAulaEncerrada(aula)) {
        setClosed(true);
        onClosed?.();
      }
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [aula, closed, onClosed]);

  if (closed) return null;

  const units: Array<{ label: string; value: string; ticks?: boolean }> = [
    { label: 'dias', value: pad(left.days) },
    { label: 'horas', value: pad(left.hours) },
    { label: 'min', value: pad(left.minutes) },
    { label: 'seg', value: pad(left.seconds), ticks: true },
  ];

  return (
    <div
      className="flex flex-wrap items-center gap-1.5"
      role="timer"
      aria-live="polite"
      aria-label="Tempo até o início da aula"
    >
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex min-w-[3rem] flex-col items-center rounded-lg border border-yellow-400/20 bg-gray-950/70 px-2 py-2 shadow-inner sm:min-w-[3.75rem] sm:px-3 sm:py-2.5"
        >
          <span
            key={unit.ticks ? tickKey : unit.value}
            className={`text-base font-bold tabular-nums leading-none text-yellow-400 sm:text-xl ${
              unit.ticks ? 'aula-tick' : ''
            }`}
          >
            {unit.value}
          </span>
          <span className="mt-0.5 text-[8px] uppercase tracking-wide text-gray-500 sm:text-[9px]">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
