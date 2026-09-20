import { ImageResponse } from 'next/og';
import { getAulaBySlug } from '@/content/aulas';

export const runtime = 'edge';
export const alt = 'Aula ao vivo Mundo Pódium';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadHeadingFont(): Promise<ArrayBuffer | null> {
  try {
    const response = await fetch(
      'https://cdn.jsdelivr.net/fontsource/fonts/ubuntu@latest/latin-700-normal.ttf'
    );
    if (!response.ok) return null;
    return await response.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: { slug: string } }) {
  const aula = getAulaBySlug(params.slug);
  const title = aula?.titulo ?? 'AULA AO VIVO';
  const dateLine = aula?.metaLine ?? 'Aula ao vivo · Grátis';
  const fontData = await loadHeadingFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#111827',
          padding: '72px',
          color: '#FFFFFF',
          fontFamily: fontData ? 'Ubuntu' : 'sans-serif',
        }}
      >
        <div
          style={{
            width: 80,
            height: 8,
            backgroundColor: '#facc15',
            marginBottom: 36,
          }}
        />
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            color: '#facc15',
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          MUNDO PÓDIUM
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: '#d1d5db',
            maxWidth: 900,
          }}
        >
          {dateLine}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: 'Ubuntu', data: fontData, style: 'normal', weight: 700 }]
        : [],
    }
  );
}
