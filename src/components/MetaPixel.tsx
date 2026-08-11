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

function hasMarketingConsent(): boolean {
  try {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return false;
    const parsed = JSON.parse(consent) as { marketing?: boolean };
    return parsed?.marketing === true;
  } catch {
    return false;
  }
}

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

      // Always require marketing consent (banner already promises Meta Pixel only after accept)
      if (!hasMarketingConsent()) {
        if (isDevelopment) {
          console.log('⏳ Meta Pixel: waiting for marketing cookie consent');
        }
        return;
      }

      // Check if already initialized
      if (window.fbq && typeof window.fbq === 'function') {
        return;
      }

      // Log debug info in development
      if (isDevelopment) {
        console.log('🔥 Meta Pixel: Initializing');
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
        
        if (isDevelopment) {
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

  // Noscript fallback only after marketing consent (SSR-safe: no pixel without JS consent path)
  return null;
};

