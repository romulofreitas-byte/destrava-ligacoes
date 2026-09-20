import type { Metadata } from 'next';
import { existsSync } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { AulaPageContent } from '@/components/aula/AulaPageContent';
import { getAulaBySlug, getAulaSlugs, resolveAulaLinks } from '@/content/aulas';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAulaSlugs().map((slug) => ({ slug }));
}

function resolveOgImage(slug: string, configured: string): string | undefined {
  const staticFile = path.join(process.cwd(), 'public', 'og', `${slug}.png`);
  if (existsSync(staticFile)) return `/og/${slug}.png`;
  if (configured && existsSync(path.join(process.cwd(), 'public', configured.replace(/^\//, '')))) {
    return configured;
  }
  return undefined;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const aula = getAulaBySlug(params.slug);
  if (!aula) return {};

  const title = `${aula.titulo} — Mundo Pódium`;
  const ogImage = resolveOgImage(aula.slug, aula.ogImage);

  return {
    title,
    description: aula.subtitulo,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description: aula.subtitulo,
      locale: 'pt_BR',
      type: 'website',
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: aula.titulo }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: aula.subtitulo,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default function AulaPage({ params }: PageProps) {
  const aula = getAulaBySlug(params.slug);
  if (!aula) notFound();

  return <AulaPageContent aula={resolveAulaLinks(aula)} />;
}
