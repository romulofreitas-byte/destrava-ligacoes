'use client';

import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { CookieConsent } from '@/components/CookieConsent';
import { MetaPixel } from '@/components/MetaPixel';
import { Clarity } from '@/components/Clarity';

export const ClientComponents: React.FC = () => {
  return (
    <ErrorBoundary>
      <MetaPixel />
      <Clarity />
      <CookieConsent />
    </ErrorBoundary>
  );
};

