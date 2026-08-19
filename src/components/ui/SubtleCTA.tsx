'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';
import { WORKSHOP_SALES, WORKSHOP_CLOSED_COPY, WORKSHOP_LAST_CALL } from '@/lib/constants';
import { scrollToCheckoutCard } from '@/lib/scrollToSection';

interface SubtleCTAProps {
  text?: string;
  className?: string;
}

export const SubtleCTA: React.FC<SubtleCTAProps> = ({
  text,
  className = '',
}) => {
  const label =
    text ??
    (WORKSHOP_SALES.isOpen
      ? WORKSHOP_SALES.showSpotsProgress
        ? 'Garantir vaga'
        : WORKSHOP_LAST_CALL.subtleCta
      : WORKSHOP_CLOSED_COPY.finalCta);
  const handleClick = () => {
    scrollToCheckoutCard();
  };

  return (
    <div className={`flex justify-center mt-8 ${className}`}>
      <button
        onClick={handleClick}
        className="group inline-flex items-center gap-2 px-6 py-3 bg-yellow-400/15 border-2 border-yellow-400/60 text-yellow-300 text-sm font-semibold rounded-full hover:bg-yellow-400/25 hover:border-yellow-400 hover:text-yellow-200 transition-all duration-300 backdrop-blur-sm shadow-lg shadow-yellow-400/15 hover:shadow-yellow-400/30 button-shine-effect"
      >
        <span>{label}</span>
        <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
      </button>
    </div>
  );
};

