import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sala de Guerra Pós-Eleição';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
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
              letterSpacing: '-0.02em',
            }}
          >
            Sala de Guerra Pós-Eleição
          </div>
          <div style={{ marginTop: 36, fontSize: 26, color: '#CDCDD2', fontWeight: 400 }}>
            AULA AO VIVO · 31/10 · 10H · GRÁTIS
          </div>
        </div>
      </div>
    ),
    size
  );
}
