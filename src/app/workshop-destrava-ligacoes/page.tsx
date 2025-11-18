import React from 'react';
import type { Metadata } from 'next';
import { WorkshopPageContent } from '@/components/sections/WorkshopPageContent';

export const metadata: Metadata = {
  title: 'Workshop Destrava Ligações | Aprenda Cold Call e Marque Reuniões de Vendas em 48h',
  description: 'Workshop de 3 horas onde você aprende a destravar ligações, construir discurso de cold call e assiste ligações reais feitas ao vivo. Transforme medo em coragem e travas em resultados.',
  keywords: 'workshop cold call, destravar ligações, como fazer cold call, discurso de vendas, marcar reunião, reuniões de vendas, vendas por telefone',
  authors: [{ name: 'Rômulo Freitas' }],
  icons: {
    icon: '/icon-escuderia.png',
    shortcut: '/icon-escuderia.png',
    apple: '/icon-escuderia.png',
  },
  openGraph: {
    title: 'Workshop Destrava Ligações | Aprenda Cold Call e Marque Reuniões de Vendas em 48h',
    description: 'Workshop de 3 horas onde você aprende a destravar ligações, construir discurso de cold call e assiste ligações reais feitas ao vivo. Transforme medo em coragem e travas em resultados.',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/imagens/romulo-hero.png',
        width: 1200,
        height: 630,
        alt: 'Workshop Destrava Ligações - Rômulo Freitas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workshop Destrava Ligações | Aprenda Cold Call e Marque Reuniões de Vendas em 48h',
    description: 'Workshop de 3 horas onde você aprende a destravar ligações, construir discurso de cold call e assiste ligações reais feitas ao vivo.',
  },
};

export default function WorkshopDestravaLigacoesPage() {
  return <WorkshopPageContent />;
}

