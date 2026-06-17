'use client';

import React from 'react';

export const HeroFeaturesBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`inline-flex flex-col items-center gap-0.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-2xl backdrop-blur-sm shadow-lg ${className}`}
    >
      <span className="text-yellow-400 font-semibold text-[10px] sm:text-xs tracking-wide text-center leading-snug">
        2 módulos • 3h cada • Dias diferentes
      </span>
      <span className="text-yellow-400 font-semibold text-[10px] sm:text-xs tracking-wide text-center leading-snug">
        Ferramentas Exclusivas • Gravação na plataforma
      </span>
    </div>
  );
};
