import { ImageResponse } from 'next/og';
import { getAulaBySlug } from '@/content/aulas';
import { formatAulaDayMonth, formatAulaTime } from '@/lib/aula-date';

export const runtime = 'edge';
export const alt = 'Aula ao vivo Mundo Pódium';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const aula = getAulaBySlug(params.slug);
  const line1 = aula?.tituloLinha1 ?? 'AULA AO VIVO';
  const line2 = (aula?.tituloLinha2 ?? '').replace(/\u00A0/g, ' ');
  const dateLine = aula
    ? `AULA AO VIVO · ${formatAulaDayMonth(aula.data)} · ${formatAulaTime(aula.data)} · GRÁTIS · SEM GRAVAÇÃO`
    : 'AULA AO VIVO · GRÁTIS · SEM GRAVAÇÃO';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#0D0D0F',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ width: 12, height: '100%', backgroundColor: '#F5B301' }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '72px 80px',
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              whiteSpace: 'pre-line',
              letterSpacing: '-0.02em',
            }}
          >
            {`${line1}\n${line2}`}
          </div>
          <div style={{ marginTop: 36, fontSize: 26, color: '#CDCDD2', fontWeight: 400 }}>{dateLine}</div>
        </div>
      </div>
    ),
    size
  );
}
