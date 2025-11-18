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

const baseUrl = getBaseUrl();
const metadataBaseUrl = getValidUrl(baseUrl);

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl,
  title: 'Escuderia Pódium - Mentoria em Grupo | Do Zero ao Primeiro Contrato',
  description: 'Transforme-se em um piloto de vendas de alta performance. 6 semanas intensivas + 4 encontros mensais para estruturar seu processo comercial e fechar seu primeiro contrato.',
  keywords: 'mentoria vendas, processo comercial, cold call, fechamento vendas, método pódium',
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
    title: 'Escuderia Pódium - Mentoria em Grupo',
    description: 'Do Zero ao Primeiro Contrato Fechado - Juntos no Pódium',
    type: 'website',
    locale: 'pt_BR',
    url: baseUrl,
    images: [
      {
        url: '/romulo-hero-2.png',
        width: 1200,
        height: 630,
        alt: 'Escuderia Pódium - Mentoria em Grupo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Escuderia Pódium - Mentoria em Grupo',
    description: 'Do Zero ao Primeiro Contrato Fechado - Juntos no Pódium',
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
