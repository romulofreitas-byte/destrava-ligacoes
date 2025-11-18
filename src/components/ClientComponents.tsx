'use client';

import { CookieConsent } from '@/components/CookieConsent';
import { MetaPixel } from '@/components/MetaPixel';

export const ClientComponents: React.FC = () => {
  return (
    <>
      <MetaPixel />
      <CookieConsent />
    </>
  );
};

