'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Aula } from '@/content/aulas';

function parseStat(valor: string): { amount: number; suffix: string } {
  const match = valor.match(/^(\d+)(.*)$/);
  if (!match) return { amount: 0, suffix: valor };
  return { amount: Number(match[1]), suffix: match[2] };
}

function CountUp({ valor }: { valor: string }) {
  const { amount, suffix } = parseStat(valor);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(amount);
      return undefined;
    }

    const duration = 800;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(amount * progress));
      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [amount, started]);

  return (
    <div ref={ref} className="text-3xl font-bold text-yellow-400 sm:text-4xl">
      {display}
      {suffix}
    </div>
  );
}

export function AulaStatsSection({ aula }: { aula: Aula }) {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl border-y border-gray-800 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {aula.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <CountUp valor={stat.valor} />
              <div className="mt-1 text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
        {aula.depoimentoPrints.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {aula.depoimentoPrints.map((src) => (
              <div key={src} className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gray-700">
                <Image src={src} alt="Depoimento de piloto da comunidade" fill className="object-cover" />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
