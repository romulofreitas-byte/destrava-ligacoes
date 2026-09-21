import type { Metadata, Viewport } from 'next';
import { WORKSHOP_PUBLIC_SITE_URL } from '@/lib/constants';

export const viewport: Viewport = {
  themeColor: '#111827',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(WORKSHOP_PUBLIC_SITE_URL),
  keywords: [],
  robots: { index: false, follow: false },
};

export default function AulaLayout({ children }: { children: React.ReactNode }) {
  return <div className="aula-root">{children}</div>;
}
