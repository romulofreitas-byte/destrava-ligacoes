import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AulaFooter } from '@/components/aula/AulaFooter';
import { AulaObrigado } from '@/components/aula/AulaObrigado';
import { AulaStickyBar } from '@/components/aula/AulaStickyBar';
import { getAulaBySlug, getAulaSlugs, resolveAulaLinks } from '@/content/aulas';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: { slug: string };
  searchParams?: { inscrito?: string | string[] };
};

export function generateStaticParams() {
  return getAulaSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const aula = getAulaBySlug(params.slug);
  if (!aula) return {};

  return {
    title: `Inscrição confirmada — ${aula.titulo}`,
    description: aula.obrigado.titulo,
    robots: { index: false, follow: false },
  };
}

export default function AulaObrigadoPage({ params, searchParams }: PageProps) {
  const aula = getAulaBySlug(params.slug);
  if (!aula) notFound();

  const resolved = resolveAulaLinks(aula);
  const inscrito = searchParams?.inscrito;
  const confirmed = (Array.isArray(inscrito) ? inscrito[0] : inscrito) === '1';

  return (
    <>
      <AulaStickyBar aula={resolved} />
      <AulaObrigado aula={resolved} confirmed={confirmed} />
      <AulaFooter aula={resolved} />
    </>
  );
}
