'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { CookieConsent } from '@/components/CookieConsent';
import { MetaPixel } from '@/components/MetaPixel';
import { Clarity } from '@/components/Clarity';
import { PageViewTracker } from '@/components/PageViewTracker';

export const ClientComponents: React.FC = () => {
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

