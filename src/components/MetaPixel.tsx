'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export const MetaPixel: React.FC = () => {
  useEffect(() => {
    // Defer initialization using requestIdleCallback to not block rendering
    const initializePixel = () => {
      // Check if in development/test mode
      const isDevelopment = 
        window.location.hostname === 'localhost' ||
        window.location.hostname.includes('vercel.app') ||
        window.location.search.includes('test_pixel=true');

      const consent = localStorage.getItem('cookie-consent');
      
      // In production, require consent. In development, skip consent check.
      if (!isDevelopment) {
        if (!consent) {
          // If no consent yet, wait for it
          return;
        }

        const parsedConsent = JSON.parse(consent);
        
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
        console.log('📍 Pixel ID: 2971488916372606');
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
        fbq('init', '2971488916372606');
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
          src="https://www.facebook.com/tr?id=2971488916372606&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
};

