import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { CORRETORES_WHATSAPP_URL } from '@/content/workshop-corretores';
import { CorretoresFooter } from '@/components/corretores/CorretoresFooter';
import { CorretoresCompraPixel } from '@/components/corretores/CorretoresCompraPixel';
import { CorretoresObrigadoAgenda } from '@/components/corretores/CorretoresObrigadoAgenda';

export const metadata: Metadata = {
  title: 'Você está dentro · Workshop Corretores',
  robots: { index: false, follow: false },
};

const DUVIDAS_WHATSAPP_URL = 'https://wa.me/553194293099';

export default function CorretoresObrigadoPage() {
  const grupo =
    process.env.NEXT_PUBLIC_WDL_TURMA_WHATSAPP_URL?.trim() || CORRETORES_WHATSAPP_URL;

  return (
    <main className="min-h-screen bg-gray-900">
      <Suspense fallback={null}>
        <CorretoresCompraPixel />
      </Suspense>
      <div className="container-custom py-16 md:py-24 max-w-2xl">
        <p className="text-yellow-400 text-xs font-semibold tracking-[0.14em] mb-4">
          WORKSHOP · CORRETORES
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
          <span className="block">Você está dentro.</span>
          <span className="block">Nos vemos segunda, 13h.</span>
        </h1>
        <CorretoresObrigadoAgenda />
        <section className="mt-8">
          <h2 className="text-white text-lg font-bold">Onde acompanhar</h2>
          <p className="mt-3 text-gray-300 text-sm sm:text-base leading-relaxed">
            Entra no grupo da turma. É por lá que a gente comunica os movimentos das aulas: avisos
            e o que vai acontecer no workshop.
          </p>
          <p className="mt-3 text-gray-300 text-sm sm:text-base leading-relaxed">
            Dúvida pontual, fala direto comigo no WhatsApp: +55 31 9429-3099.
          </p>
        </section>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={grupo}
            className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-black text-sm rounded-full"
          >
            Grupo da turma
          </a>
          <a
            href={DUVIDAS_WHATSAPP_URL}
            className="inline-flex items-center justify-center px-6 py-3.5 border border-yellow-400/60 text-yellow-300 font-bold text-sm rounded-full"
          >
            Fale direto com o Rômulo
          </a>
        </div>
      </div>
      <CorretoresFooter />
    </main>
  );
}
