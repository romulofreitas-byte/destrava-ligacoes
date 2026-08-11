export const ADMIN_COOKIE = 'dl_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getAdminPassword(): string | null {
  const password = process.env.ADMIN_PASSWORD?.trim();
  return password && password.length >= 8 ? password : null;
}

function getSigningSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET?.trim() || getAdminPassword();
}

export function isAdminPasswordConfigured(): boolean {
  return Boolean(getAdminPassword());
}

function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export function verifyAdminPassword(password: string): boolean {
  const expected = getAdminPassword();
  if (!expected) return false;
  return timingSafeEqualString(password, expected);
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function sign(payload: string): Promise<string | null> {
  const secret = getSigningSecret();
  if (!secret) return null;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(payload)
  );

  return toHex(signature);
}

function encodeToken(payload: string, signature: string): string {
  const raw = `${payload}.${signature}`;
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(raw).toString('base64url');
  }
  const bytes = new TextEncoder().encode(raw);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeToken(token: string): string | null {
  try {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(token, 'base64url').toString('utf8');
    }
    const padded = token.replace(/-/g, '+').replace(/_/g, '/');
    const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
    return atob(padded + pad);
  } catch {
    return null;
  }
}

export async function createAdminSessionToken(): Promise<string | null> {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `admin:${exp}`;
  const signature = await sign(payload);
  if (!signature) return null;
  return encodeToken(payload, signature);
}

export async function verifyAdminSessionToken(
  token: string | undefined | null
): Promise<boolean> {
  if (!token) return false;

  try {
    const decoded = decodeToken(token);
    if (!decoded) return false;

    const [payload, signature] = decoded.split('.');
    if (!payload || !signature) return false;

    const expected = await sign(payload);
    if (!expected || !timingSafeEqualString(signature, expected)) return false;

    const [, expRaw] = payload.split(':');
    const exp = Number(expRaw);
    if (!Number.isFinite(exp) || Date.now() > exp) return false;

    return true;
  } catch {
    return false;
  }
}

export function getAdminCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}
