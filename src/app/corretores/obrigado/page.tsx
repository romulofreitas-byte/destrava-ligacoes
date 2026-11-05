import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { CORRETORES_PLATAFORMA_PADRAO } from '@/content/workshop-corretores';
import { CorretoresFooter } from '@/components/corretores/CorretoresFooter';
import { CorretoresCompraPixel } from '@/components/corretores/CorretoresCompraPixel';

export const metadata: Metadata = {
  title: 'Você está dentro · Workshop Corretores',
  robots: { index: false, follow: false },
};

export default function CorretoresObrigadoPage() {
  const plataforma =
    process.env.NEXT_PUBLIC_WDL_PLATAFORMA_URL?.trim() || CORRETORES_PLATAFORMA_PADRAO;
  const grupo = process.env.NEXT_PUBLIC_WDL_TURMA_WHATSAPP_URL?.trim() || '';

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
        <ul className="mt-8 space-y-2 text-gray-300 text-sm sm:text-base">
          <li>Segunda, 09/11, às 13h: Dia 1</li>
          <li>Terça, 10/11, em horário comercial: 5 ligações reais</li>
          <li>Quarta, 11/11, às 13h: Dia 2</li>
        </ul>
        <p className="mt-6 text-gray-300 text-sm sm:text-base leading-relaxed">
          Os encontros acontecem dentro da plataforma exclusiva do Mundo Pódium. O acesso chega por
          e-mail.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={plataforma}
            className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-black text-sm rounded-full"
          >
            Acessar a plataforma
          </a>
          {grupo ? (
            <a
              href={grupo}
              className="inline-flex items-center justify-center px-6 py-3.5 border border-yellow-400/60 text-yellow-300 font-bold text-sm rounded-full"
            >
              Grupo da turma
            </a>
          ) : null}
        </div>
      </div>
      <CorretoresFooter />
    </main>
  );
}
