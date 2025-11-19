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

// Get base URL from environment or use default
// In production, this should be set to your actual domain
function getBaseUrl(): string {
  // Try to get from environment variable
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  
  // Try to get from Vercel URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Fallback to default
  return 'https://destrava-ligacoes.vercel.app';
}

function getValidUrl(baseUrl: string): URL {
  try {
    // Validate URL format
    const url = new URL(baseUrl);
    // Ensure it's HTTPS in production
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      throw new Error('Invalid protocol');
    }
    return url;
  } catch (error) {
    // If URL is invalid, return a safe default
    console.warn('Invalid base URL provided, using default:', error);
    return new URL('https://destrava-ligacoes.vercel.app');
  }
}

// Get base URL and validate - execute lazily to avoid build-time issues
function getMetadataBase(): URL {
  try {
    const baseUrl = getBaseUrl();
    return getValidUrl(baseUrl);
  } catch (error) {
    console.error('Error getting metadata base URL:', error);
    return new URL('https://destrava-ligacoes.vercel.app');
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
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
    url: getBaseUrl(),
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
