import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { CORRETORES_OG } from '@/content/workshop-corretores';
import { CorretoresPage } from '@/components/corretores/CorretoresPage';
import { resolveOfertaCorretores } from '@/lib/workshop-corretores-estado';

export const dynamic = 'force-dynamic';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://workshop.mundopodium.com.br';

export const metadata: Metadata = {
  title: CORRETORES_OG.title,
  description: CORRETORES_OG.description,
  openGraph: {
    title: CORRETORES_OG.title,
    description: CORRETORES_OG.description,
    type: 'website',
    locale: 'pt_BR',
    url: `${baseUrl}/corretores`,
    images: [
      {
        url: `${baseUrl}${CORRETORES_OG.image}`,
        width: 1200,
        height: 630,
        alt: CORRETORES_OG.imageAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: CORRETORES_OG.title,
    description: CORRETORES_OG.description,
    images: [`${baseUrl}${CORRETORES_OG.image}`],
  },
};

export default function CorretoresRoute({
  searchParams,
}: {
  searchParams?: { estado?: string };
}) {
  const oferta = resolveOfertaCorretores({
    now: new Date(),
    onda1Fim: process.env.NEXT_PUBLIC_WDL_ONDA1_FIM,
    onda2Fim: process.env.NEXT_PUBLIC_WDL_ONDA2_FIM,
    checkoutOnda1: process.env.NEXT_PUBLIC_WDL_CHECKOUT_ONDA1_URL,
    checkoutOnda2: process.env.NEXT_PUBLIC_WDL_CHECKOUT_ONDA2_URL,
    estadoForcado: searchParams?.estado,
    permitirForcar: process.env.NODE_ENV !== 'production',
  });

  return (
    <Suspense fallback={null}>
      <CorretoresPage oferta={oferta} />
    </Suspense>
  );
}
