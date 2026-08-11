/** Extract an 11-char YouTube video ID from a URL or raw ID. */
export function extractYouTubeId(raw: string | null | undefined): string | null {
  if (!raw?.trim()) return null;
  const value = raw.trim();
  const fromWatch = value.match(/[?&]v=([\w-]{11})/);
  if (fromWatch) return fromWatch[1];
  const fromShort = value.match(/youtu\.be\/([\w-]{11})/);
  if (fromShort) return fromShort[1];
  const fromEmbed = value.match(/youtube\.com\/embed\/([\w-]{11})/);
  if (fromEmbed) return fromEmbed[1];
  const fromLive = value.match(/youtube\.com\/live\/([\w-]{11})/);
  if (fromLive) return fromLive[1];
  if (/^[\w-]{11}$/.test(value)) return value;
  return null;
}

export type YouTubeThumbQuality = 'maxresdefault' | 'hqdefault' | 'mqdefault' | 'sddefault';

/** Prefer hqdefault — always exists. maxresdefault 404s when the video has no HD thumb. */
export function youtubeThumbnailUrl(
  videoId: string,
  quality: YouTubeThumbQuality = 'hqdefault'
): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

export const YOUTUBE_THUMB_FALLBACKS: YouTubeThumbQuality[] = [
  'maxresdefault',
  'hqdefault',
  'mqdefault',
];
