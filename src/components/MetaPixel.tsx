'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

// Get Meta Pixel ID from environment variable
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '687023637552068';

export const MetaPixel: React.FC = () => {
  useEffect(() => {
    // Don't initialize if Pixel ID is not configured
    if (!META_PIXEL_ID) {
      console.warn('⚠️ Meta Pixel ID not configured. Set NEXT_PUBLIC_META_PIXEL_ID environment variable.');
      return;
    }

    // Defer initialization using requestIdleCallback to not block rendering
    const initializePixel = () => {
      // Check if in development/test mode
      const isDevelopment = 
        window.location.hostname === 'localhost' ||
        window.location.hostname.includes('vercel.app') ||
        window.location.search.includes('test_pixel=true');

      let consent: string | null = null;
      try {
        consent = localStorage.getItem('cookie-consent');
      } catch (error) {
        // localStorage might not be available (e.g., in private browsing)
        if (isDevelopment) {
          console.warn('⚠️ Meta Pixel: localStorage not available', error);
        }
        return;
      }
      
      // In production, require consent. In development, skip consent check.
      if (!isDevelopment) {
        if (!consent) {
          // If no consent yet, wait for it
          return;
        }

        let parsedConsent: { marketing?: boolean } | null = null;
        try {
          parsedConsent = JSON.parse(consent);
        } catch (error) {
          // Invalid JSON in localStorage, treat as no consent
          if (isDevelopment) {
            console.warn('⚠️ Meta Pixel: Invalid consent data in localStorage', error);
          }
          return;
        }
        
        // Validate consent structure
        if (!parsedConsent || typeof parsedConsent !== 'object' || typeof parsedConsent.marketing !== 'boolean') {
          if (isDevelopment) {
            console.warn('⚠️ Meta Pixel: Invalid consent structure');
          }
          return;
        }
        
        // Only initialize if marketing consent is granted
        if (!parsedConsent.marketing) {
          return;
        }
      }

      // Check if already initialized
      if (window.fbq && typeof window.fbq === 'function') {
        return;
      }

      // Log debug info in development
      if (isDevelopment) {
        console.log('🔥 Meta Pixel: Initializing in TEST MODE');
        console.log('📍 Pixel ID:', META_PIXEL_ID);
      }

      // Meta Pixel Code
      (function(f: any, b: any, e: string, v: string, n: any, t: any, s: any) {
        if (f.fbq) return;
        n = f.fbq = function(...args: any[]) {
          n.callMethod
            ? n.callMethod.apply(n, args)
            : n.queue.push(args);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode?.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js', null, null, null);

      // Initialize and track
      const fbq = (window as any).fbq as (...args: any[]) => void;
      if (fbq) {
        fbq('init', META_PIXEL_ID);
        fbq('track', 'PageView');
        
        // Debug logging
        const isDev = window.location.hostname === 'localhost' || 
                      window.location.hostname.includes('vercel.app') ||
                      window.location.search.includes('test_pixel=true');
        
        if (isDev) {
          console.log('✅ Meta Pixel: Initialized successfully');
          console.log('✅ PageView event tracked');
          console.log('💡 Tip: Open Meta Pixel Helper to verify events');
        }
      }
    };

    // Defer initialization to idle time to improve initial page load
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        initializePixel();
      }, { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(initializePixel, 2000);
    }

    // Listen for consent changes
    const handleConsentChange = () => {
      initializePixel();
    };

    window.addEventListener('cookieConsentChange', handleConsentChange);

    return () => {
      window.removeEventListener('cookieConsentChange', handleConsentChange);
    };
  }, []);

  return (
    <>
      {/* Noscript tracking image */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
};

