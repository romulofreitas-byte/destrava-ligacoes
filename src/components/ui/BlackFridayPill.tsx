import { WORKSHOP_PROMO } from '@/lib/constants';

export function BlackFridayPill({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-gray-950 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-yellow-400 ${className}`}
    >
      {WORKSHOP_PROMO.badge}
    </span>
  );
}
