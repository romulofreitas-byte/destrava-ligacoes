import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { SalaDeGuerraPage } from '@/components/sala-de-guerra/SalaDeGuerraPage';
import { SALA_DESCRIPTION, SALA_PAGE_TITLE, SALA_SLUG, SALA_TITLE } from '@/components/sala-de-guerra/constants';
import { WORKSHOP_PUBLIC_SITE_URL } from '@/lib/constants';

/** WhatsApp e o Facebook não montam prévia em página com noindex. O Google continua noindex. */
const PREVIEW_BOT =
  /facebookexternalhit|facebot|whatsapp|twitterbot|linkedinbot|slackbot|telegrambot|discordbot|pinterest|embedly|redditbot/i;

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  const url = `${WORKSHOP_PUBLIC_SITE_URL}/aula/${SALA_SLUG}`;
  const ogImage = `${url}/opengraph-image`;
  const userAgent = headers().get('user-agent') || '';
  const previewBot = PREVIEW_BOT.test(userAgent);

  return {
    title: SALA_PAGE_TITLE,
    description: SALA_DESCRIPTION,
    keywords: [],
    robots: previewBot ? { index: true, follow: true } : { index: false, follow: false },
    alternates: { canonical: url },
    openGraph: {
      title: SALA_PAGE_TITLE,
      description: SALA_DESCRIPTION,
      url,
      siteName: 'Mundo Pódium',
      locale: 'pt_BR',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: SALA_TITLE }],
    },
    twitter: {
      card: 'summary_large_image',
      title: SALA_PAGE_TITLE,
      description: SALA_DESCRIPTION,
      images: [ogImage],
    },
  };
}

export default function Page() {
  return <SalaDeGuerraPage />;
}
