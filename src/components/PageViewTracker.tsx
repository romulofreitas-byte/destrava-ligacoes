'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const SESSION_KEY = 'dl_analytics_session';

function hasAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem('cookie-consent');
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed?.analytics);
  } catch {
    return false;
  }
}

function getOrCreateSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `s_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return `s_${Date.now()}`;
  }
}

async function sendPageview(path: string) {
  if (!hasAnalyticsConsent()) return;

  try {
    await fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path,
        referrer: document.referrer || null,
        sessionId: getOrCreateSessionId(),
      }),
      keepalive: true,
    });
  } catch {
    // silent — analytics must never break UX
  }
}

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastSent = useRef<string>('');

  useEffect(() => {
    const onConsent = () => {
      if (!pathname || pathname.startsWith('/admin')) return;
      const key = `${pathname}?${searchParams?.toString() || ''}`;
      lastSent.current = '';
      // re-send current page after consent
      lastSent.current = key;
      void sendPageview(pathname);
    };

    window.addEventListener('cookieConsentChange', onConsent);
    return () => window.removeEventListener('cookieConsentChange', onConsent);
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return;

    const key = `${pathname}?${searchParams?.toString() || ''}`;
    if (lastSent.current === key) return;
    lastSent.current = key;

    void sendPageview(pathname);
  }, [pathname, searchParams]);

  return null;
}
