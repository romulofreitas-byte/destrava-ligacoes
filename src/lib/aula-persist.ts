import { appendFile, mkdir } from 'fs/promises';
import path from 'path';
import { supabase } from '@/lib/supabase';

export type AulaInscricao = {
  slug: string;
  nome: string;
  whatsapp: string;
  email: string | null;
  consentimento: boolean;
};

export type PersistResult = {
  stored: boolean;
  destination: 'webhook' | 'supabase' | 'log';
  error?: string;
};

async function persistWebhook(payload: AulaInscricao): Promise<PersistResult> {
  const url = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!url) {
    return { stored: false, destination: 'webhook', error: 'LEAD_WEBHOOK_URL ausente' };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Webhook respondeu ${response.status}`);
  }

  return { stored: true, destination: 'webhook' };
}

async function persistSupabase(payload: AulaInscricao): Promise<PersistResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !key || !supabase) {
    return { stored: false, destination: 'supabase', error: 'Supabase ausente' };
  }

  const { error } = await supabase.from('inscricoes').upsert(
    {
      slug: payload.slug,
      nome: payload.nome,
      email: payload.email,
      whatsapp: payload.whatsapp,
      consentimento: payload.consentimento,
    },
    { onConflict: 'slug,whatsapp' }
  );

  if (error) {
    throw new Error(error.message);
  }

  return { stored: true, destination: 'supabase' };
}

async function persistLocalLog(payload: AulaInscricao): Promise<PersistResult> {
  if (process.env.NODE_ENV === 'development') {
    const dir = path.join(process.cwd(), '.data');
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, 'inscricoes.jsonl'),
      `${JSON.stringify({ ...payload, createdAt: new Date().toISOString() })}\n`,
      'utf8'
    );
  }

  console.warn('[inscricao] Persistência remota indisponível. Lead registrado no log.', {
    slug: payload.slug,
    nome: payload.nome,
    whatsapp: payload.whatsapp,
  });

  return { stored: false, destination: 'log' };
}

export async function persistAulaInscricao(payload: AulaInscricao): Promise<PersistResult> {
  if (process.env.LEAD_WEBHOOK_URL?.trim()) {
    try {
      return await persistWebhook(payload);
    } catch (error) {
      console.error('[inscricao] Webhook falhou:', error);
    }
  }

  const hasSupabase =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || process.env.SUPABASE_URL?.trim()) &&
    Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());

  if (hasSupabase) {
    try {
      return await persistSupabase(payload);
    } catch (error) {
      console.error('[inscricao] Supabase falhou:', error);
    }
  }

  try {
    return await persistLocalLog(payload);
  } catch (error) {
    console.error('[inscricao] Log local falhou:', error);
    return { stored: false, destination: 'log', error: 'log-failed' };
  }
}
