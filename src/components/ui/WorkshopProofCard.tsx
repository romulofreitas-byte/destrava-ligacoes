'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

export type WorkshopProofCardProps = {
  /** Omit for quote-only cards (e.g. Maycon — already on video elsewhere) */
  imageSrc?: string;
  imageAlt?: string;
  highlight: string;
  name: string;
  company?: string;
  companyUrl?: string;
  bodyQuote?: string;
  priority?: boolean;
  /** Lighter chrome for embedding inside another section card */
  compact?: boolean;
  className?: string;
};

/**
 * Proof cards always size to the print's intrinsic aspect ratio —
 * no fixed aspect box, no letterboxing empty space.
 */
export const WorkshopProofCard: React.FC<WorkshopProofCardProps> = ({
  imageSrc,
  imageAlt = '',
  highlight,
  name,
  company,
  companyUrl,
  bodyQuote,
  priority = false,
  compact = false,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(imageSrc) && !imgError;

  return (
    <div
      className={[
        'relative w-full rounded-2xl border-2 transition-all duration-300 group/card',
        compact
          ? 'bg-gray-900/40 p-3 sm:p-4 border-yellow-400/25 hover:border-yellow-400/45 shadow-lg'
          : 'bg-gray-800/30 p-4 sm:p-5 border-yellow-400/30 hover:border-yellow-400/50 shadow-xl hover:shadow-2xl hover:shadow-yellow-400/20',
        className,
      ].join(' ')}
    >
      {imageSrc && showImage && (
        <div className="relative w-full overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element -- intrinsic sizing so each print sets its own card height */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className="block h-auto w-full"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setImgError(true)}
          />
        </div>
      )}

      {imageSrc && imgError && (
        <div className="relative w-full overflow-hidden rounded-xl bg-gray-900/40 px-3 py-6 text-center text-sm text-gray-500">
          Print indisponível
        </div>
      )}

      <div
        className={[
          'p-3 bg-gradient-to-r from-yellow-400/20 to-green-400/20 border border-yellow-400/30 rounded-xl',
          imageSrc ? 'mt-3 sm:mt-4' : '',
          compact && imageSrc ? 'mt-3' : '',
        ].join(' ')}
      >
        <div className="flex items-start gap-2">
          <Star
            className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5"
            fill="currentColor"
          />
          <p className="text-white text-sm sm:text-base font-semibold leading-relaxed">
            <span className="text-yellow-400">&ldquo;{highlight}&rdquo;</span>
          </p>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 text-center sm:text-left">
        <p className="text-white font-semibold text-sm sm:text-base">{name}</p>
        {company && companyUrl && (
          <a
            href={companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400/90 hover:text-green-400 text-sm underline-offset-2 hover:underline inline-block mt-0.5"
          >
            {company}
          </a>
        )}
        {company && !companyUrl && (
          <p className="text-green-400/90 text-sm mt-0.5">{company}</p>
        )}
      </div>

      {bodyQuote && (
        <blockquote className="mt-3 sm:mt-4 text-left text-sm text-gray-400 leading-relaxed border-l-2 border-yellow-400/30 pl-3">
          &ldquo;{bodyQuote}&rdquo;
        </blockquote>
      )}
    </div>
  );
};
