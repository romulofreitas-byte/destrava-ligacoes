'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { CookieConsent } from '@/components/CookieConsent';
import { MetaPixel } from '@/components/MetaPixel';
import { Clarity } from '@/components/Clarity';
import { PageViewTracker } from '@/components/PageViewTracker';

export const ClientComponents: React.FC = () => {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <ErrorBoundary>
      <MetaPixel />
      <Clarity />
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      <CookieConsent />
    </ErrorBoundary>
  );
};

