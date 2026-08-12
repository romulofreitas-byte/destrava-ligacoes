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

const workshopMetaDescription =
  'Workshop em 2 módulos (8 horas no total — 4h cada) onde você aprende a destravar ligações, a Anatomia da Ligação e faz ligações reais na Sala de Ligação com acompanhamento direto. Transforme medo em coragem e travas em resultados.';

export const metadata: Metadata = {
  title: 'Workshop Destrava Ligações | Aprenda Cold Call e Marque Reuniões de Vendas em 48h',
  description: workshopMetaDescription,
  keywords: 'workshop cold call, destravar ligações, como fazer cold call, anatomia da ligação, marcar reunião, reuniões de vendas, vendas por telefone',
  authors: [{ name: 'Rômulo Freitas' }],
  icons: {
    icon: [
      { url: '/logos-mundo-podium/favicon_256.png', type: 'image/png' },
      { url: '/logos-mundo-podium/favicon_256.png', sizes: '256x256', type: 'image/png' },
    ],
    shortcut: '/logos-mundo-podium/favicon_256.png',
    apple: '/logos-mundo-podium/favicon_256.png',
  },
  openGraph: {
    title: 'Workshop Destrava Ligações | Aprenda Cold Call e Marque Reuniões de Vendas em 48h',
    description: workshopMetaDescription,
    type: 'website',
    locale: 'pt_BR',
    url: baseUrl,
    siteName: 'Workshop Destrava Ligações',
    images: [
      {
        url: `${baseUrl}/og-mundo-podium.png`,
        width: 1080,
        height: 1080,
        alt: 'Mundo Pódium',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workshop Destrava Ligações | Aprenda Cold Call e Marque Reuniões de Vendas em 48h',
    description: workshopMetaDescription,
    images: [
      {
        url: `${baseUrl}/og-mundo-podium.png`,
        width: 1080,
        height: 1080,
        alt: 'Mundo Pódium',
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
