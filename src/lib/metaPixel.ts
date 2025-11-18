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
  
  // Check if in development/test mode
  const isDevelopment = 
    window.location.hostname === 'localhost' ||
    window.location.hostname.includes('vercel.app') ||
    window.location.search.includes('test_pixel=true');

  // In development, only check if fbq exists
  if (isDevelopment) {
    return typeof window.fbq === 'function';
  }

  // In production, check consent
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) return false;
  
  const parsedConsent = JSON.parse(consent);
  return parsedConsent.marketing === true && typeof window.fbq === 'function';
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

/**
 * Track pricing CTA clicks (InitiateCheckout event)
 */
export function trackInitiateCheckout(value?: number, currency: string = 'BRL'): void {
  if (!isPixelAvailable()) return;
  
  const params: Record<string, any> = {
    content_name: 'Escuderia Podium',
    content_type: 'product',
    num_items: 1,
    currency: currency
  };
  
  if (value) params.value = value;
  
  const fbq = (window as any).fbq as (...args: any[]) => void;
  if (fbq) {
    fbq('track', 'InitiateCheckout', params);
    logDebug('InitiateCheckout', params);
  }
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

