import type { Metadata } from 'next'
import { Ubuntu, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ClientComponents } from '@/components/ClientComponents'

const ubuntu = Ubuntu({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ubuntu',
  display: 'swap',
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://destrava-ligacoes.vercel.app'

export const metadata: Metadata = {
  title: 'Workshop Destrava Ligações | Aprenda Cold Call e Marque Reuniões de Vendas em 48h',
  description: 'Workshop de 3 horas onde você aprende a destravar ligações, construir discurso de cold call e assiste ligações reais feitas ao vivo. Transforme medo em coragem e travas em resultados.',
  keywords: 'workshop cold call, destravar ligações, como fazer cold call, discurso de vendas, marcar reunião, reuniões de vendas, vendas por telefone',
  authors: [{ name: 'Rômulo Freitas' }],
  icons: {
    icon: [
      { url: '/icon-escuderia.png', type: 'image/png' },
      { url: '/icon-escuderia.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/icon-escuderia.png',
    apple: '/icon-escuderia.png',
  },
  openGraph: {
    title: 'Workshop Destrava Ligações | Aprenda Cold Call e Marque Reuniões de Vendas em 48h',
    description: 'Workshop de 3 horas onde você aprende a destravar ligações, construir discurso de cold call e assiste ligações reais feitas ao vivo. Transforme medo em coragem e travas em resultados.',
    type: 'website',
    locale: 'pt_BR',
    url: baseUrl,
    siteName: 'Workshop Destrava Ligações',
    images: [
      {
        url: `${baseUrl}/workshop-metodo.png`,
        width: 1200,
        height: 630,
        alt: 'Workshop Destrava Ligações - Rômulo Freitas',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workshop Destrava Ligações | Aprenda Cold Call e Marque Reuniões de Vendas em 48h',
    description: 'Workshop de 3 horas onde você aprende a destravar ligações, construir discurso de cold call e assiste ligações reais feitas ao vivo. Transforme medo em coragem e travas em resultados.',
    images: [
      {
        url: `${baseUrl}/workshop-metodo.png`,
        width: 1200,
        height: 630,
        alt: 'Workshop Destrava Ligações - Rômulo Freitas',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${ubuntu.variable} ${montserrat.variable} font-body`}>
        <ClientComponents />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
