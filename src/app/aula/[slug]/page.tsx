import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AulaPageContent } from '@/components/aula/AulaPageContent';
import { getAulaBySlug, getAulaSlugs, resolveAulaLinks } from '@/content/aulas';
import { WORKSHOP_PUBLIC_SITE_URL } from '@/lib/constants';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAulaSlugs().map((slug) => ({ slug }));
}

function oneLine(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

export function generateMetadata({ params }: PageProps): Metadata {
  const aula = getAulaBySlug(params.slug);
  if (!aula) return {};

  const title = `${aula.titulo} — Mundo Pódium`;
  const description = oneLine(aula.subtitulo);
  const url = `${WORKSHOP_PUBLIC_SITE_URL}/aula/${aula.slug}`;
  const ogImage = aula.ogImage
    ? `${WORKSHOP_PUBLIC_SITE_URL}${aula.ogImage}`
    : `${url}/opengraph-image`;

  return {
    title,
    description,
    keywords: [],
    robots: { index: false, follow: false },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Mundo Pódium',
      locale: 'pt_BR',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: aula.titulo }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function AulaPage({ params }: PageProps) {
  const aula = getAulaBySlug(params.slug);
  if (!aula) notFound();

  return <AulaPageContent aula={resolveAulaLinks(aula)} />;
}
