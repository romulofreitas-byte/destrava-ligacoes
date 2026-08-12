'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { ImageLightbox } from '@/components/ui/ImageLightbox';

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
  /** Frame height follows the print (no fixed aspect / letterboxing) */
  fitToImage?: boolean;
  className?: string;
};

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
  fitToImage = false,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const showImage = Boolean(imageSrc) && !imgError;

  const openLightbox = () => {
    if (imageSrc) setLightboxOpen(true);
  };

  const framedButtonClass = [
    'relative w-full rounded-xl bg-gray-900/40 overflow-hidden cursor-zoom-in',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70',
    compact
      ? 'aspect-[4/5] sm:aspect-[16/11]'
      : 'aspect-[4/5] sm:aspect-[16/10]',
  ].join(' ');

  const fitButtonClass = [
    'relative block w-full rounded-xl bg-gray-900/40 overflow-hidden cursor-zoom-in',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70',
  ].join(' ');

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
      {imageSrc && showImage && fitToImage && (
        <button
          type="button"
          onClick={openLightbox}
          className={fitButtonClass}
          aria-label={`Ver print ampliado: ${imageAlt || name}`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1200}
            height={900}
            className="h-auto w-full object-contain"
            quality={compact ? 80 : 90}
            priority={priority}
            unoptimized
            sizes="(max-width: 768px) 100vw, 768px"
            onError={() => setImgError(true)}
          />
        </button>
      )}

      {imageSrc && showImage && !fitToImage && (
        <button
          type="button"
          onClick={openLightbox}
          className={framedButtonClass}
          aria-label={`Ver print ampliado: ${imageAlt || name}`}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain object-top p-1 sm:p-3"
            quality={compact ? 80 : 90}
            priority={priority}
            unoptimized
            sizes="(max-width: 768px) 100vw, 768px"
            onError={() => setImgError(true)}
          />
        </button>
      )}

      {imageSrc && imgError && (
        <button
          type="button"
          onClick={openLightbox}
          className={fitToImage ? fitButtonClass : framedButtonClass}
          aria-label={`Ver print ampliado: ${imageAlt || name}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- fallback when next/image fails */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className={
              fitToImage
                ? 'block h-auto w-full object-contain'
                : 'absolute inset-0 m-auto max-h-full max-w-full object-contain object-top p-1 sm:p-3'
            }
          />
        </button>
      )}

      {imageSrc && (
        <ImageLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          src={imageSrc}
          alt={imageAlt}
        />
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
