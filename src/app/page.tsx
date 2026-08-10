import React from 'react';
import type { Metadata } from 'next';
import { WorkshopPageContent } from '@/components/sections/WorkshopPageContent';

export const metadata: Metadata = {
  title: 'Workshop Destrava Ligações | Aprenda Cold Call e Marque Reuniões de Vendas em 48h',
  description: 'Workshop em 2 módulos (8 horas no total — 4h cada) onde você aprende a destravar ligações, construir discurso de cold call e faz ligações reais na Sala de Ligação com acompanhamento direto. Transforme medo em coragem e travas em resultados.',
  keywords: 'workshop cold call, destravar ligações, como fazer cold call, discurso de vendas, marcar reunião, reuniões de vendas, vendas por telefone',
  authors: [{ name: 'Rômulo Freitas' }],
  icons: {
    icon: '/logos-mundo-podium/favicon_256.png',
    shortcut: '/logos-mundo-podium/favicon_256.png',
    apple: '/logos-mundo-podium/favicon_256.png',
  },
  openGraph: {
    title: 'Workshop Destrava Ligações | Aprenda Cold Call e Marque Reuniões de Vendas em 48h',
    description: 'Workshop em 2 módulos (8 horas no total — 4h cada) onde você aprende a destravar ligações, construir discurso de cold call e faz ligações reais na Sala de Ligação com acompanhamento direto. Transforme medo em coragem e travas em resultados.',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/workshop-metodo.png',
        width: 1200,
        height: 630,
        alt: 'Workshop Destrava Ligações - Rômulo Freitas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workshop Destrava Ligações | Aprenda Cold Call e Marque Reuniões de Vendas em 48h',
    description: 'Workshop em 2 módulos (8 horas no total — 4h cada) onde você aprende a destravar ligações, construir discurso de cold call e faz ligações reais na Sala de Ligação com acompanhamento direto.',
    images: [
      {
        url: '/workshop-metodo.png',
        width: 1200,
        height: 630,
        alt: 'Workshop Destrava Ligações - Rômulo Freitas',
      },
    ],
  },
};

export default function HomePage() {
  return <WorkshopPageContent />;
}
