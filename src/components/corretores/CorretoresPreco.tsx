'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { OfertaCorretores } from '@/lib/workshop-corretores-estado';
import { trackCustomEvent, trackInitiateCheckout } from '@/lib/metaPixel';
import { CORRETORES_INSTAGRAM_URL } from '@/content/workshop-corretores';

const CTA_CLASS =
  'group relative w-full inline-flex items-center justify-center min-h-11 px-5 py-3.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-black text-sm sm:text-base rounded-full hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/40 hover:scale-[1.02] button-shine-effect focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

const DISABLED_CLASS =
  'w-full inline-flex items-center justify-center px-5 py-3.5 bg-gray-700 text-gray-400 font-black text-sm sm:text-base rounded-full cursor-not-allowed';

export function registrarCliqueCorretores(oferta: OfertaCorretores) {
  if (!oferta.ctaEnabled || oferta.amountBRL == null || oferta.onda == null) return;
  try {
    sessionStorage.setItem('wdl_corretores_valor', String(oferta.amountBRL));
    sessionStorage.setItem('wdl_corretores_onda', String(oferta.onda));
  } catch {
    // storage blocked
  }
  trackInitiateCheckout(oferta.amountBRL, 'BRL', {
    contentId: 'workshop-corretores',
    contentName: 'Workshop Destrava Ligações Corretores',
  });
  trackCustomEvent('WDLCorretoresCheckout', {
    onda: oferta.onda,
    content_id: 'workshop-corretores',
    value: oferta.amountBRL,
    currency: 'BRL',
  });
}

export function CorretoresCta({
  oferta,
  rotulo,
}: {
  oferta: OfertaCorretores;
  rotulo?: string;
}) {
  if (oferta.estado === 'encerrada') {
    return (
      <a
        href={CORRETORES_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center px-5 py-3.5 border border-yellow-400/60 text-yellow-300 font-bold text-sm sm:text-base rounded-full hover:bg-yellow-400/10 transition-colors"
      >
        Avisos da próxima edição
      </a>
    );
  }

  if (!oferta.ctaEnabled || !oferta.checkoutUrl) {
    return (
      <button type="button" disabled className={DISABLED_CLASS}>
        Link de inscrição em breve
      </button>
    );
  }

  return (
    <a
      href={oferta.checkoutUrl}
      onClick={() => registrarCliqueCorretores(oferta)}
      className={CTA_CLASS}
    >
      {rotulo ?? 'QUERO ENTRAR NO WORKSHOP'}
    </a>
  );
}

function partes(fimIso: string, now: number) {
  const diff = new Date(fimIso).getTime() - now;
  const clamped = Math.max(0, diff);
  return {
    expired: diff <= 0,
    days: Math.floor(clamped / 86400000),
    hours: Math.floor((clamped / 3600000) % 24),
    minutes: Math.floor((clamped / 60000) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

export function CorretoresContagem({
  oferta,
  compact = false,
}: {
  oferta: OfertaCorretores;
  compact?: boolean;
}) {
  const router = useRouter();
  const refreshed = useRef(false);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (!oferta.fimIso) return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [oferta.fimIso]);

  useEffect(() => {
    if (!oferta.fimIso || now == null || oferta.simulado || refreshed.current) return;
    if (new Date(oferta.fimIso).getTime() - now > 0) return;
    refreshed.current = true;
    router.refresh();
  }, [now, oferta.fimIso, oferta.simulado, router]);

  if (!oferta.fimIso || !oferta.contagemLegenda || now == null) return null;

  const left = partes(oferta.fimIso, now);
  if (left.expired && oferta.simulado) return null;

  const boxes = [
    { label: 'DIAS', value: left.days },
    { label: 'HRS', value: left.hours },
    { label: 'MIN', value: left.minutes },
    { label: 'SEG', value: left.seconds },
  ];

  return (
    <div className="w-full">
      <p className={`text-[#CDCDD2] ${compact ? 'text-xs mb-1.5' : 'text-sm mb-2'}`}>
        {oferta.contagemLegenda}
      </p>
      <div className="flex items-center gap-1.5">
        {boxes.map((box) => (
          <div
            key={box.label}
            className={`flex flex-col items-center rounded-lg border border-yellow-400/20 bg-gray-950/70 ${
              compact ? 'min-w-[2.35rem] px-1.5 py-1' : 'min-w-[3rem] px-2 py-2'
            }`}
          >
            <span
              className={`text-yellow-400 font-bold tabular-nums leading-none ${
                compact ? 'text-sm' : 'text-base'
              }`}
            >
              {String(box.value).padStart(2, '0')}
            </span>
            <span
              className={`uppercase tracking-wide text-[#CDCDD2] mt-1 ${
                compact ? 'text-[10px]' : 'text-xs'
              }`}
            >
              {box.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrecoAncorado({
  oferta,
  grande = false,
}: {
  oferta: OfertaCorretores;
  grande?: boolean;
}) {
  return (
    <div>
      <p className="mb-2 inline-flex items-center rounded-full bg-gray-950 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-yellow-400">
        Black Friday
      </p>
      {oferta.rotulo ? <p className="mb-2 text-sm text-[#CDCDD2]">{oferta.rotulo}</p> : null}
      <p className="flex items-baseline gap-3">
        {oferta.precoCheio ? (
          <span className="text-base font-semibold tabular-nums text-[#969EAE] line-through">
            {oferta.precoCheio}
          </span>
        ) : null}
        <span
          className={`font-black tabular-nums leading-none text-yellow-400 ${
            grande ? 'text-4xl sm:text-5xl' : 'text-4xl'
          }`}
        >
          {oferta.precoLabel}
        </span>
      </p>
    </div>
  );
}

export function CorretoresPrecoHero({ oferta }: { oferta: OfertaCorretores }) {
  if (oferta.estado === 'encerrada') {
    return (
      <div className="mt-8 w-full max-w-sm">
        <p className="text-white font-semibold text-base leading-snug mb-4">{oferta.rotulo}</p>
        <CorretoresCta oferta={oferta} />
      </div>
    );
  }

  const rotulo = oferta.precoLabel ? `Quero entrar · ${oferta.precoLabel}` : undefined;

  return (
    <div className="mt-4 w-full max-w-sm lg:mt-8">
      <div className="mb-4">
        <PrecoAncorado oferta={oferta} grande />
      </div>
      <CorretoresCta oferta={oferta} rotulo={rotulo} />
      <p className="mt-3 hidden text-xs leading-relaxed text-[#CDCDD2] sm:block">
        {oferta.pixLinhas.join(' ')}{' '}
        <span className="font-semibold text-yellow-400">Vagas limitadas.</span>
      </p>
      <div className="mt-3 hidden sm:block">
        <CorretoresContagem oferta={oferta} compact />
      </div>
    </div>
  );
}

export function CorretoresPreco({
  oferta,
  mostrarUrgencia = false,
  destaque = false,
}: {
  oferta: OfertaCorretores;
  mostrarUrgencia?: boolean;
  destaque?: boolean;
}) {
  return (
    <div
      className={
        destaque
          ? 'w-full max-w-sm rounded-3xl border-2 border-yellow-400/70 bg-gray-800/50 p-6 shadow-2xl shadow-yellow-400/10 backdrop-blur-xl'
          : 'w-full max-w-sm rounded-2xl border border-gray-700/50 bg-gray-800/40 p-5 backdrop-blur-xl'
      }
    >
      {oferta.estado === 'encerrada' ? (
        <p className="text-white font-semibold text-base leading-snug mb-4">{oferta.rotulo}</p>
      ) : (
        <>
          <div className="mb-4">
            <PrecoAncorado oferta={oferta} />
          </div>
          <div className="mb-4 space-y-1">
            {oferta.pixLinhas.map((linha) => (
              <p key={linha} className="text-[#CDCDD2] text-xs leading-relaxed">
                {linha}
              </p>
            ))}
          </div>
        </>
      )}
      <CorretoresCta oferta={oferta} />
      {mostrarUrgencia && oferta.urgencia.length > 0 && (
        <div className="mt-3 space-y-1">
          {oferta.urgencia.map((linha) => (
            <p key={linha} className="text-[#CDCDD2] text-xs leading-relaxed">
              {linha}
            </p>
          ))}
        </div>
      )}
      {mostrarUrgencia && oferta.estado !== 'encerrada' && (
        <p className="mt-2 text-yellow-400/90 text-xs font-semibold">Vagas limitadas.</p>
      )}
      <div className="mt-4">
        <CorretoresContagem oferta={oferta} />
      </div>
    </div>
  );
}
