'use client';

import React, { useEffect, useState } from 'react';
import type { OfertaCorretores } from '@/lib/workshop-corretores-estado';
import { registrarCliqueCorretores } from '@/components/corretores/CorretoresPreco';

export function CorretoresBarraFixa({ oferta }: { oferta: OfertaCorretores }) {
  const ativa =
    oferta.estado !== 'encerrada' &&
    oferta.ctaEnabled &&
    Boolean(oferta.checkoutUrl) &&
    Boolean(oferta.precoLabel);
  const [passouHero, setPassouHero] = useState(false);
  const [ofertaNaTela, setOfertaNaTela] = useState(false);

  useEffect(() => {
    if (!ativa) return;
    const hero = document.getElementById('topo');
    const bloco = document.getElementById('inscricao');
    if (!hero || !bloco) return;

    const ioHero = new IntersectionObserver(
      ([entry]) => setPassouHero(!entry.isIntersecting),
      { threshold: 0 }
    );
    const ioOferta = new IntersectionObserver(
      ([entry]) => setOfertaNaTela(entry.isIntersecting),
      { threshold: 0.15 }
    );
    ioHero.observe(hero);
    ioOferta.observe(bloco);
    return () => {
      ioHero.disconnect();
      ioOferta.disconnect();
    };
  }, [ativa]);

  if (!ativa || !passouHero || ofertaNaTela || !oferta.checkoutUrl || !oferta.precoLabel) {
    return null;
  }

  return (
    <div className="min-[769px]:hidden fixed inset-x-0 bottom-0 z-40 border-t border-gray-700 bg-gray-900/95 backdrop-blur px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <a
        href={oferta.checkoutUrl}
        onClick={() => registrarCliqueCorretores(oferta)}
        className="w-full min-h-11 inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-black text-sm rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Quero entrar · {oferta.precoLabel}
      </a>
      <p className="mt-1.5 text-center text-[11px] text-[#CDCDD2] leading-snug">{oferta.rotulo}</p>
    </div>
  );
}
