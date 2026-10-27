import { AULAS, isAulaEncerrada, resolveAulaLinks, type Aula } from '@/content/aulas';
import { aulaLembreteCutoff, aulaLembreteKindAt, type AulaLembreteKind } from '@/lib/aula-date';
import { sendAulaLembreteEmail } from '@/lib/aula-email';
import { supabase } from '@/lib/supabase';

type InscricaoRow = {
  id: string | number;
  nome: string;
  email: string | null;
  created_at: string;
};

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  return `${(local || '?')[0]}***@${domain}`;
}

function columnFor(kind: AulaLembreteKind): 'lembrete_vespera_em' | 'lembrete_dia_em' {
  return kind === 'vespera' ? 'lembrete_vespera_em' : 'lembrete_dia_em';
}

async function sendForAula(aula: Aula, kind: AulaLembreteKind, now: Date) {
  if (!supabase) return { slug: aula.slug, kind, sent: 0, failed: 0, error: 'Supabase ausente' };

  const cutoff = aulaLembreteCutoff(aula.data, kind).toISOString();
  const column = columnFor(kind);
  const { data, error } = await supabase
    .from('inscricoes')
    .select('id, nome, email, created_at')
    .eq('slug', aula.slug)
    .eq('consentimento', true)
    .lt('created_at', cutoff)
    .is(column, null)
    .not('email', 'is', null);

  if (error) {
    return { slug: aula.slug, kind, sent: 0, failed: 0, error: error.message };
  }

  const rows = (data ?? []) as InscricaoRow[];
  let sent = 0;
  let failed = 0;

  for (const row of rows) {
    const email = row.email?.trim();
    if (!email) continue;

    const claimedAt = now.toISOString();
    const claim = await supabase
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
    await supabase.from('inscricoes').update({ [column]: null }).eq('id', row.id).eq(column, claimedAt);
  }

  return { slug: aula.slug, kind, sent, failed };
}

export async function sendAulaLembretes(now: Date = new Date()) {
  const results = [];

  for (const aula of Object.values(AULAS)) {
    if (isAulaEncerrada(aula, now)) continue;
    const kind = aulaLembreteKindAt(aula.data, now);
    if (!kind) continue;
    results.push(await sendForAula(aula, kind, now));
  }

  return results;
}
