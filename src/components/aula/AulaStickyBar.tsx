'use client';

import { useEffect, useState } from 'react';
import type { Aula } from '@/content/aulas';
import { getAulaQuandoLabel } from '@/content/aulas';

const SHOW_CTA_BELOW = 0.02;
const HIDE_CTA_ABOVE = 0.2;

export function AulaStickyBar({ aula }: { aula: Aula }) {
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const form = document.getElementById('cadastro');
    if (!form) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const ratio = entry.intersectionRatio;
        setShowCta((prev) => (prev ? ratio < HIDE_CTA_ABOVE : ratio < SHOW_CTA_BELOW));
      },
      { threshold: [0, SHOW_CTA_BELOW, HIDE_CTA_ABOVE, 1] }
    );

    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="sticky top-0 z-40 bg-yellow-400 text-gray-900">
        <div className="mx-auto flex min-h-[2.75rem] max-w-6xl items-center justify-center gap-3 px-4 py-2 sm:justify-between">
          <p className="flex min-w-0 items-center justify-center gap-2 text-center text-[11px] font-bold leading-snug sm:text-sm">
            <span className="aula-pulse shrink-0" aria-hidden="true" />
            <span className={showCta ? 'truncate' : undefined}>
              {aula.stickyBar} · {getAulaQuandoLabel(aula)}
            </span>
          </p>
          <a
            href="#cadastro"
            aria-hidden={!showCta}
            tabIndex={showCta ? undefined : -1}
            className={`hidden shrink-0 rounded-full bg-gray-900 px-3 py-1.5 text-[11px] font-black text-yellow-400 sm:inline-flex ${
              showCta ? '' : 'invisible pointer-events-none'
            }`}
          >
            {aula.ctaLabel}
          </a>
        </div>
      </div>

      {showCta ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-yellow-400/40 bg-gray-950/95 px-4 pt-3 shadow-[0_-12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md lg:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <a href="#cadastro" className="aula-cta">
            {aula.ctaLabel}
          </a>
        </div>
      ) : null}
    </>
  );
}
