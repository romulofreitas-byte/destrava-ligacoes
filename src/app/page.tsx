import React from 'react';
import type { Metadata } from 'next';
import { WorkshopPageContent } from '@/components/sections/WorkshopPageContent';

export const metadata: Metadata = {
  title: 'Workshop Destrava Ligações | Aprenda Cold Call e Marque Reuniões de Vendas em 48h',
  description: 'Workshop em dois encontros ao vivo (16 e 18 de novembro, cerca de 3h30 cada) onde você aprende a destravar ligações, a Anatomia da Ligação e faz ligações reais com acompanhamento direto.',
  keywords: 'workshop cold call, destravar ligações, como fazer cold call, anatomia da ligação, marcar reunião, reuniões de vendas, vendas por telefone',
  authors: [{ name: 'Rômulo Freitas' }],
  icons: {
    icon: '/logos-mundo-podium/favicon_256.png',
    shortcut: '/logos-mundo-podium/favicon_256.png',
    apple: '/logos-mundo-podium/favicon_256.png',
  },
  openGraph: {
    title: 'Workshop Destrava Ligações | Aprenda Cold Call e Marque Reuniões de Vendas em 48h',
    description: 'Workshop em dois encontros ao vivo (16 e 18 de novembro, cerca de 3h30 cada) onde você aprende a destravar ligações, a Anatomia da Ligação e faz ligações reais com acompanhamento direto.',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/og-mundo-podium.png',
        width: 1080,
        height: 1080,
        alt: 'Mundo Pódium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workshop Destrava Ligações | Aprenda Cold Call e Marque Reuniões de Vendas em 48h',
    description: 'Workshop em dois encontros ao vivo (16 e 18 de novembro, cerca de 3h30 cada) onde você aprende a destravar ligações, a Anatomia da Ligação e faz ligações reais com acompanhamento direto.',
    images: [
      {
        url: '/og-mundo-podium.png',
        width: 1080,
        height: 1080,
        alt: 'Mundo Pódium',
      },
    ],
  },
};

export default function HomePage() {
  return <WorkshopPageContent />;
}
