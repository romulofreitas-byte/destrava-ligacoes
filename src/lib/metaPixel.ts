import { WORKSHOP_PRICING, WORKSHOP_INFO } from '@/lib/constants';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

/**
 * Check if Meta Pixel is available and marketing consent is granted
 */
function isPixelAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  if (typeof window.fbq !== 'function') return false;

  try {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return false;
    const parsedConsent = JSON.parse(consent) as { marketing?: boolean };
    return parsedConsent?.marketing === true;
  } catch {
    return false;
  }
}

/**
 * Log debug information in development with enhanced formatting
 */
function logDebug(eventName: string, params?: Record<string, any>): void {
  const isDevelopment = 
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
     window.location.hostname.includes('vercel.app') ||
     window.location.search.includes('test_pixel=true'));

  if (isDevelopment) {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    console.log(`\n🎯 [${timestamp}] Meta Pixel Event: ${eventName}`);
    if (params && Object.keys(params).length > 0) {
      console.table(params);
    }
  }
}

/**
 * Generic event tracking
 */
export function trackEvent(eventName: string, params?: Record<string, any>): void {
  if (!isPixelAvailable()) return;
  
  const fbq = (window as any).fbq as (...args: any[]) => void;
  if (fbq) {
    fbq('track', eventName, params);
    logDebug(eventName, params);
  }
}

/**
 * Track WhatsApp button clicks (Contact event)
 */
export function trackWhatsAppClick(contentName?: string, sectionName?: string): void {
  if (!isPixelAvailable()) return;
  
  const params: Record<string, any> = {
    content_category: 'contact',
    content_type: 'whatsapp-button'
  };
  
  if (contentName) params.content_name = contentName;
  if (sectionName) params.section = sectionName;
  
  const fbq = (window as any).fbq as (...args: any[]) => void;
  if (fbq) {
    fbq('track', 'Contact', params);
    logDebug('Contact', params);
  }
}

/**
 * Track CTA button clicks (Lead event)
 */
export function trackCTAClick(ctaName?: string, contentCategory?: string): void {
  if (!isPixelAvailable()) return;
  
  const params: Record<string, any> = {
    content_type: 'button',
    content_category: contentCategory || 'cta'
  };
  
  if (ctaName) params.content_name = ctaName;
  
  const fbq = (window as any).fbq as (...args: any[]) => void;
  if (fbq) {
    fbq('track', 'Lead', params);
    logDebug('Lead', params);
  }
}

const CHECKOUT_INTENT_KEY = 'workshop_checkout_started';
const PURCHASE_DEDUPE_KEY = 'meta_purchase_workshop_11';
const PIXEL_READY_MAX_MS = 8000;

export function markCheckoutStarted(): void {
  try {
    sessionStorage.setItem(CHECKOUT_INTENT_KEY, String(Date.now()));
  } catch {
    // sessionStorage may be unavailable
  }
}

export function hasCheckoutIntent(): boolean {
  try {
    return Boolean(sessionStorage.getItem(CHECKOUT_INTENT_KEY));
  } catch {
    return false;
  }
}

function whenPixelReady(callback: () => void): void {
  if (typeof window === 'undefined') return;

  const startedAt = Date.now();
  const tick = () => {
    if (isPixelAvailable()) {
      callback();
      return;
    }
    if (Date.now() - startedAt >= PIXEL_READY_MAX_MS) return;
    window.setTimeout(tick, 200);
  };

  tick();
}

/**
 * Track pricing CTA clicks (InitiateCheckout event)
 */
export function trackInitiateCheckout(
  value: number = WORKSHOP_PRICING.amountBRL,
  currency: string = 'BRL'
): void {
  markCheckoutStarted();

  const params: Record<string, any> = {
    content_name: WORKSHOP_INFO.productName,
    content_type: 'product',
    content_ids: ['workshop-destrava-ligacoes'],
    num_items: 1,
    value,
    currency,
  };

  whenPixelReady(() => {
    const fbq = window.fbq;
    if (!fbq) return;
    fbq('track', 'InitiateCheckout', params);
    logDebug('InitiateCheckout', params);
  });
}

/**
 * Track completed purchase on the thank-you page after Asaas redirect.
 */
export function trackPurchase(options?: {
  eventId?: string;
  value?: number;
  currency?: string;
}): void {
  const eventId = options?.eventId || `purchase_${Date.now()}`;
  const params: Record<string, any> = {
    content_name: WORKSHOP_INFO.productName,
    content_type: 'product',
    content_ids: ['workshop-destrava-ligacoes'],
    num_items: 1,
    value: options?.value ?? WORKSHOP_PRICING.amountBRL,
    currency: options?.currency ?? 'BRL',
  };

  whenPixelReady(() => {
    try {
      if (sessionStorage.getItem(PURCHASE_DEDUPE_KEY)) return;
      sessionStorage.setItem(PURCHASE_DEDUPE_KEY, eventId);
    } catch {
      // continue without dedupe if storage is blocked
    }

    const fbq = window.fbq;
    if (!fbq) return;
    fbq('track', 'Purchase', params, { eventID: eventId });
    logDebug('Purchase', { ...params, eventID: eventId });
  });
}

/**
 * Track content views (ViewContent event)
 */
export function trackViewContent(contentName?: string, contentCategory?: string): void {
  if (!isPixelAvailable()) return;
  
  const params: Record<string, any> = {
    content_type: 'page-section'
  };
  
  if (contentName) params.content_name = contentName;
  if (contentCategory) params.content_category = contentCategory;
  
  const fbq = (window as any).fbq as (...args: any[]) => void;
  if (fbq) {
    fbq('track', 'ViewContent', params);
    logDebug('ViewContent', params);
  }
}

/**
 * Track FAQ expansion (Lead event)
 */
export function trackFAQExpansion(questionNumber?: number, questionText?: string): void {
  if (!isPixelAvailable()) return;
  
  const params: Record<string, any> = {
    content_type: 'faq',
    content_category: 'engagement'
  };
  
  if (questionNumber !== undefined) params.content_id = questionNumber;
  if (questionText) params.content_name = questionText;
  
  const fbq = (window as any).fbq as (...args: any[]) => void;
  if (fbq) {
    fbq('track', 'Lead', params);
    logDebug('FAQExpansion', params);
  }
}

/**
 * Track community join (Lead event)
 */
export function trackCommunityJoin(): void {
  if (!isPixelAvailable()) return;
  
  const params: Record<string, any> = {
    content_type: 'community',
    content_name: 'Join WhatsApp Community',
    content_category: 'engagement'
  };
  
  const fbq = (window as any).fbq as (...args: any[]) => void;
  if (fbq) {
    fbq('track', 'Lead', params);
    logDebug('CommunityJoin', params);
  }
}

/**
 * Track video modal open (Lead event)
 */
export function trackVideoOpen(videoName?: string, contentType?: string): void {
  if (!isPixelAvailable()) return;
  
  const params: Record<string, any> = {
    content_type: contentType || 'video'
  };
  
  if (videoName) params.content_name = videoName;
  
  const fbq = (window as any).fbq as (...args: any[]) => void;
  if (fbq) {
    fbq('track', 'Lead', params);
    logDebug('VideoOpen', params);
  }
}

/**
 * Track custom events
 */
export function trackCustomEvent(eventName: string, params?: Record<string, any>): void {
  if (!isPixelAvailable()) return;
  
  const fbq = (window as any).fbq as (...args: any[]) => void;
  if (fbq) {
    fbq('trackCustom', eventName, params);
    logDebug(`Custom: ${eventName}`, params);
  }
}

