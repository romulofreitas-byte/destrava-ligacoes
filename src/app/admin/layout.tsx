import { ReactNode, Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Destrava Ligações',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}
