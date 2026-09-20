'use client';

import { useEffect, useState } from 'react';
import type { Aula } from '@/content/aulas';
import { getAulaQuandoLabel } from '@/content/aulas';

export function AulaStickyBar({ aula }: { aula: Aula }) {
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const form = document.getElementById('cadastro');
    if (!form) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowCta(!entry?.isIntersecting);
      },
      { threshold: 0.12 }
    );

    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-0 z-40 bg-yellow-400 text-gray-900">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2 sm:justify-between">
        <p className="flex min-w-0 items-center justify-center gap-2 text-center text-[11px] font-bold leading-snug sm:text-sm">
          <span className="aula-pulse shrink-0" aria-hidden="true" />
          <span className={showCta ? 'truncate' : undefined}>
            {aula.stickyBar} · {getAulaQuandoLabel(aula)}
          </span>
        </p>
        {showCta ? (
          <a
            href="#cadastro"
            className="shrink-0 rounded-full bg-gray-900 px-2.5 py-1 text-[10px] font-black text-yellow-400 sm:px-3 sm:py-1.5 sm:text-[11px]"
          >
            <span className="sm:hidden">LINK</span>
            <span className="hidden sm:inline">{aula.ctaLabel}</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
