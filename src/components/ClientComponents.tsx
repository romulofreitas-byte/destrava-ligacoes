'use client';

import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { CookieConsent } from '@/components/CookieConsent';
import { MetaPixel } from '@/components/MetaPixel';

export const ClientComponents: React.FC = () => {
  return (
    <ErrorBoundary>
      <MetaPixel />
      <CookieConsent />
    </ErrorBoundary>
  );
};

