import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#111827',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AulaLayout({ children }: { children: React.ReactNode }) {
  return <div className="aula-root">{children}</div>;
}
