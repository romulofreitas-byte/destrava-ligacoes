import { AULAS, isAulaEncerrada, resolveAulaLinks, type Aula } from '@/content/aulas';
import { aulaLembreteCutoff, aulaLembreteKindAt, type AulaLembreteKind } from '@/lib/aula-date';
import { sendAulaLembreteEmail } from '@/lib/aula-email';
import { supabase } from '@/lib/supabase';

const SLUG_LEMBRETES_DO_DIA = 'por-que-o-cliente-desliga';
const LEMBRETES_SO_DESSA_AULA = new Set<AulaLembreteKind>(['meio-dia', 'trinta', 'inicio']);

type InscricaoRow = {
  id: string | number;
  nome: string;
  email: string | null;
  created_at: string;
  respostas?: Record<string, unknown> | null;
};

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  return `${(local || '?')[0]}***@${domain}`;
}

function columnFor(kind: AulaLembreteKind): string {
  if (kind === 'vespera') return 'lembrete_vespera_em';
  if (kind === 'meio-dia') return 'lembrete_meio_dia_em';
  if (kind === 'trinta') return 'lembrete_trinta_em';
  if (kind === 'inicio') return 'lembrete_inicio_em';
  return 'lembrete_dia_em';
}

function lembreteStamp(respostas: InscricaoRow['respostas'], kind: AulaLembreteKind): string | null {
  const bag = respostas?.lembretes;
  if (!bag || typeof bag !== 'object') return null;
  const stamp = (bag as Record<string, unknown>)[kind];
  return typeof stamp === 'string' ? stamp : null;
}

function withLembreteStamp(
  respostas: InscricaoRow['respostas'],
  kind: AulaLembreteKind,
  stamp: string | null,
): Record<string, unknown> {
  const base = respostas && typeof respostas === 'object' ? { ...respostas } : {};
  const bag = base.lembretes && typeof base.lembretes === 'object' ? { ...(base.lembretes as object) } : {};
  if (stamp) (bag as Record<string, string>)[kind] = stamp;
  else delete (bag as Record<string, string>)[kind];
  return { ...base, lembretes: bag };
}

async function sendForAula(aula: Aula, kind: AulaLembreteKind, now: Date) {
  if (!supabase) return { slug: aula.slug, kind, sent: 0, failed: 0, error: 'Supabase ausente' };

  const cutoff = aulaLembreteCutoff(aula.data, kind).toISOString();
  const column = columnFor(kind);
  const usesRespostas = LEMBRETES_SO_DESSA_AULA.has(kind);
  let query = supabase
    .from('inscricoes')
    .select(usesRespostas ? 'id, nome, email, created_at, respostas' : 'id, nome, email, created_at')
    .eq('slug', aula.slug)
    .eq('consentimento', true)
    .lt('created_at', cutoff)
    .not('email', 'is', null);
  if (!usesRespostas) query = query.is(column, null);
  const { data, error } = await query;

  if (error) {
    return { slug: aula.slug, kind, sent: 0, failed: 0, error: error.message };
  }

  const rows = (data ?? []) as InscricaoRow[];
  let sent = 0;
  let failed = 0;

  for (const row of rows) {
    const email = row.email?.trim();
    if (!email) continue;
    if (usesRespostas && lembreteStamp(row.respostas, kind)) continue;

    const claimedAt = now.toISOString();
    const claim = usesRespostas
      ? await supabase
          .from('inscricoes')
          .update({ respostas: withLembreteStamp(row.respostas, kind, claimedAt) })
          .eq('id', row.id)
          .select('id')
      : await supabase
          .from('inscricoes')
          .update({ [column]: claimedAt })
          .eq('id', row.id)
          .is(column, null)
          .select('id');

    if (claim.error || !claim.data?.length) continue;

    const result = await sendAulaLembreteEmail(resolveAulaLinks(aula), row.nome, email, kind);
    if (result.success) {
      sent += 1;
      continue;
    }

    failed += 1;
    console.error('[aula-lembrete] envio falhou:', {
      id: row.id,
      email: maskEmail(email),
      kind,
      error: result.error,
    });
    if (usesRespostas) {
      await supabase
        .from('inscricoes')
        .update({ respostas: withLembreteStamp(row.respostas, kind, null) })
        .eq('id', row.id);
    } else {
      await supabase.from('inscricoes').update({ [column]: null }).eq('id', row.id).eq(column, claimedAt);
    }
  }

  return { slug: aula.slug, kind, sent, failed };
}

export async function sendAulaLembretes(now: Date = new Date()) {
  const results = [];

  for (const aula of Object.values(AULAS)) {
    const kind = aulaLembreteKindAt(aula.data, now);
    if (!kind) continue;
    if (kind !== 'inicio' && isAulaEncerrada(aula, now)) continue;
    if (LEMBRETES_SO_DESSA_AULA.has(kind) && aula.slug !== SLUG_LEMBRETES_DO_DIA) continue;
    results.push(await sendForAula(aula, kind, now));
  }

  return results;
}
