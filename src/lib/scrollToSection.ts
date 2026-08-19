import { WORKSHOP_CHECKOUT_SECTION_ID } from '@/lib/constants';

let activeFrame = 0;
let settleTimer = 0;

function getScroller(): HTMLElement {
  return (document.scrollingElement as HTMLElement) || document.documentElement;
}

function sectionTop(el: HTMLElement, scroller: HTMLElement): number {
  return el.getBoundingClientRect().top + scroller.scrollTop;
}

/**
 * Native `behavior: 'smooth'` crawls on this long landing (~20k px) and can
 * look like the CTA did nothing. Animate the real scroller in ~550ms instead,
 * tracking the target so late-loading images don't leave the card off-screen.
 */
export function scrollToSection(id: string): void {
  if (typeof window === 'undefined') return;

  const el = document.getElementById(id);
  if (!el) return;

  const scroller = getScroller();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (activeFrame) {
    cancelAnimationFrame(activeFrame);
    activeFrame = 0;
  }
  if (settleTimer) {
    window.clearTimeout(settleTimer);
    settleTimer = 0;
  }

  const previousBehavior = scroller.style.scrollBehavior;
  scroller.style.scrollBehavior = 'auto';

  const restore = () => {
    scroller.style.scrollBehavior = previousBehavior;
    activeFrame = 0;
  };

  const snapToSection = () => {
    scroller.scrollTop = sectionTop(el, scroller);
  };

  if (reduceMotion) {
    snapToSection();
    restore();
    return;
  }

  const start = scroller.scrollTop;
  const duration = 550;
  const startTime = performance.now();
  const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

  const tick = (now: number) => {
    const t = Math.min(1, (now - startTime) / duration);
    const target = sectionTop(el, scroller);
    scroller.scrollTop = start + (target - start) * easeOutCubic(t);
    if (t < 1) {
      activeFrame = requestAnimationFrame(tick);
    } else {
      snapToSection();
      restore();
      // Images above the card may still decode after the jump; follow twice.
      settleTimer = window.setTimeout(() => {
        const prev = scroller.style.scrollBehavior;
        scroller.style.scrollBehavior = 'auto';
        snapToSection();
        scroller.style.scrollBehavior = prev;
        settleTimer = window.setTimeout(() => {
          const prevInner = scroller.style.scrollBehavior;
          scroller.style.scrollBehavior = 'auto';
          snapToSection();
          scroller.style.scrollBehavior = prevInner;
          settleTimer = 0;
        }, 350);
      }, 180);
    }
  };

  activeFrame = requestAnimationFrame(tick);
}

export function scrollToCheckoutCard(
  event?: Pick<Event, 'preventDefault'>
): void {
  event?.preventDefault();
  scrollToSection(WORKSHOP_CHECKOUT_SECTION_ID);
}
