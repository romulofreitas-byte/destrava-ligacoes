'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const CONTENT_ID = 'workshop-corretores';
const DEDUPE_KEY = 'meta_purchase_workshop_corretores';

function pagamentoConfirmado(params: URLSearchParams): boolean {
  const status = params.get('status');
  const pago =
    status === 'PAID' ||
    status === 'paid' ||
    status === 'CONFIRMED' ||
    status === 'RECEIVED' ||
    status === '3';
  return Boolean(
    params.get('charge_id') ||
      params.get('paymentId') ||
      params.get('id') ||
      params.get('transaction_id') ||
      pago ||
      params.get('source') === 'asaas'
  );
}

export function CorretoresCompraPixel() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams || !pagamentoConfirmado(searchParams)) return;
    let cancelled = false;
    const started = Date.now();

    const tick = () => {
      if (cancelled) return;
      const fbq = window.fbq;
      let consent = false;
      try {
        const raw = localStorage.getItem('cookie-consent');
        consent = Boolean(raw && (JSON.parse(raw) as { marketing?: boolean }).marketing);
      } catch {
        consent = false;
      }
      if (typeof fbq !== 'function' || !consent) {
        if (Date.now() - started < 8000) window.setTimeout(tick, 200);
        return;
      }

      const eventId =
        searchParams.get('charge_id') ||
        searchParams.get('paymentId') ||
        searchParams.get('id') ||
        `asaas_${Date.now()}`;

      try {
        if (sessionStorage.getItem(DEDUPE_KEY)) return;
        sessionStorage.setItem(DEDUPE_KEY, eventId);
      } catch {
        // segue sem dedupe
      }

      const stored = Number(sessionStorage.getItem('wdl_corretores_valor'));
      const value = stored === 497 || stored === 597 ? stored : undefined;
      const params: Record<string, unknown> = {
        content_name: 'Workshop Destrava Ligações Corretores',
        content_type: 'product',
        content_ids: [CONTENT_ID],
        num_items: 1,
        currency: 'BRL',
      };
      if (value) params.value = value;
      fbq('track', 'Purchase', params, { eventID: eventId });
    };

    tick();
    const onConsent = () => tick();
    window.addEventListener('cookieConsentChange', onConsent);
    return () => {
      cancelled = true;
      window.removeEventListener('cookieConsentChange', onConsent);
    };
  }, [searchParams]);

  return null;
}
