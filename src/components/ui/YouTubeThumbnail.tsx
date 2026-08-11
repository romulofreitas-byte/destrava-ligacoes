'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  YOUTUBE_THUMB_FALLBACKS,
  youtubeThumbnailUrl,
  type YouTubeThumbQuality,
} from '@/lib/youtube';

type YouTubeThumbnailProps = {
  videoId: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
};

/**
 * YouTube poster with cascade: maxres → hq → mq.
 * Avoids broken images when maxresdefault.jpg is missing.
 */
export const YouTubeThumbnail: React.FC<YouTubeThumbnailProps> = ({
  videoId,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
  loading,
}) => {
  const [qualityIndex, setQualityIndex] = useState(0);
  const quality = (YOUTUBE_THUMB_FALLBACKS[qualityIndex] ??
    'mqdefault') as YouTubeThumbQuality;
  const src = youtubeThumbnailUrl(videoId, quality);

  const onError = () => {
    if (qualityIndex < YOUTUBE_THUMB_FALLBACKS.length - 1) {
      setQualityIndex((i) => i + 1);
    }
  };

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        unoptimized
        onError={onError}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 480}
      height={height ?? 360}
      className={className}
      sizes={sizes}
      priority={priority}
      loading={loading}
      unoptimized
      onError={onError}
    />
  );
};
