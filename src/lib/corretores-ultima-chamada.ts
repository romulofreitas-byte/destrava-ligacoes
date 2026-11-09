import { supabase } from '@/lib/supabase';
import {
  CORRETORES_REF,
  htmlUltimaChamada,
  ULTIMA_CHAMADA_SUBJECT,
} from '@/lib/corretores-compra-copy';

const SLUG_AULA = 'por-que-o-cliente-desliga';

type Inscricao = { nome: string | null; email: string | null; consentimento: boolean | null };
type Comprador = { email: string | null; reference_id: string | null; description: string | null };

export type UltimaChamadaResult = {
  inscritos: number;
  comEmail: number;
  jaCompraram: number;
  destinatarios: number;
  enviados: number;
  falhas: number;
  dry: boolean;
};

function emailLimpo(value: string | null | undefined): string | null {
  const email = value?.trim().toLowerCase() || '';
  if (!email.includes('@') || email.includes(' ')) return null;
  return email;
}

function remetente(): string {
  const raw =
    process.env.FROM_EMAIL && !process.env.FROM_EMAIL.includes('escuderiapodium')
      ? process.env.FROM_EMAIL.trim()
      : 'noreply@pitstop.mundopodium.com.br';
  return raw.includes('<') ? raw : `Rômulo, Pódium <${raw}>`;
}

async function enviarEmLotes(fila: Array<{ email: string; nome: string }>) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) throw new Error('RESEND_API_KEY ausente');
  let enviados = 0;
  let falhas = 0;
  const from = remetente();
  for (let i = 0; i < fila.length; i += 100) {
    const lote = fila.slice(i, i + 100);
    const res = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `wdl-ultima-chamada-2026-11-09-${i}`,
      },
      body: JSON.stringify(
        lote.map((pessoa) => ({
          from,
          to: [pessoa.email],
          subject: ULTIMA_CHAMADA_SUBJECT,
          html: htmlUltimaChamada(pessoa.nome),
        }))
      ),
    });
    if (!res.ok) {
      falhas += lote.length;
      console.error('[corretores-ultima-chamada] lote', i, res.status);
      continue;
    }
    const json = (await res.json()) as { data?: Array<{ id?: string }> };
    const ok = Array.isArray(json.data) ? json.data.length : lote.length;
    enviados += ok;
    falhas += Math.max(0, lote.length - ok);
  }
  return { enviados, falhas };
}

function primeiroNome(nome: string | null, email: string): string {
  const parte = nome?.trim().split(/\s+/)[0];
  return parte || email.split('@')[0] || 'oi';
}

async function listarInscritos(): Promise<Inscricao[]> {
  if (!supabase) throw new Error('Supabase ausente');
  const rows: Inscricao[] = [];
  let from = 0;
  for (;;) {
    const { data, error } = await supabase
      .from('inscricoes')
      .select('nome,email,consentimento')
      .eq('slug', SLUG_AULA)
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    const chunk = (data || []) as Inscricao[];
    rows.push(...chunk);
    if (chunk.length < 1000) break;
    from += 1000;
  }
  return rows;
}

async function emailsCompradores(): Promise<Set<string>> {
  if (!supabase) throw new Error('Supabase ausente');
  const { data, error } = await supabase
    .from('workshop_registrations')
    .select('email,reference_id,description')
    .eq('status', 'PAID');
  if (error) throw new Error(error.message);
  const emails = new Set<string>();
  for (const row of (data || []) as Comprador[]) {
    const blob = `${row.reference_id || ''} ${row.description || ''}`;
    if (!blob.includes(CORRETORES_REF)) continue;
    const email = emailLimpo(row.email);
    if (email) emails.add(email);
  }
  return emails;
}

export async function enviarUltimaChamada(dry: boolean): Promise<UltimaChamadaResult> {
  const inscritos = await listarInscritos();
  const compradores = await emailsCompradores();
  const vistos = new Set<string>();
  const fila: Array<{ email: string; nome: string }> = [];
  let comEmail = 0;
  let jaCompraram = 0;

  for (const row of inscritos) {
    if (row.consentimento === false) continue;
    const email = emailLimpo(row.email);
    if (!email) continue;
    comEmail += 1;
    if (compradores.has(email)) {
      jaCompraram += 1;
      continue;
    }
    if (vistos.has(email)) continue;
    vistos.add(email);
    fila.push({ email, nome: primeiroNome(row.nome, email) });
  }

  if (dry) {
    return {
      inscritos: inscritos.length,
      comEmail,
      jaCompraram,
      destinatarios: fila.length,
      enviados: 0,
      falhas: 0,
      dry: true,
    };
  }

  const envio = await enviarEmLotes(fila);
  const enviados = envio.enviados;
  const falhas = envio.falhas;

  return {
    inscritos: inscritos.length,
    comEmail,
    jaCompraram,
    destinatarios: fila.length,
    enviados,
    falhas,
    dry: false,
  };
}
