'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
  }
}

// Clarity Project ID
const CLARITY_ID = 'ua737ghoeb';

export const Clarity: React.FC = () => {
  useEffect(() => {
    // Check if already initialized
    if (window.clarity) {
      return;
    }

    // Initialize Clarity
    (function(c: any, l: any, a: string, r: string, i: string, t?: any, y?: any) {
      c[a] = c[a] || function() {
        (c[a].q = c[a].q || []).push(arguments);
      };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_ID);
  }, []);

  return null;
};

