import { sendEmail } from '@/lib/email';
import {
  getWorkshopRegistration,
  supabase,
  upsertWorkshopRegistration,
  type WorkshopRegistration,
} from '@/lib/supabase';
import {
  CORRETORES_REF,
  encontroDoDia,
  descricaoComDia,
  htmlConfirmacao,
  htmlMeioDia,
  jaAvisouNoDia,
} from '@/lib/corretores-compra-copy';

export {
  CORRETORES_REF,
  customerIdOf,
  emailNoPagamento,
  isPaidEvent,
  nomeNoPagamento,
  pareceDestaEdicao,
} from '@/lib/corretores-compra-copy';
export type { AsaasNotice } from '@/lib/corretores-compra-copy';

export async function registrarEEnviarConfirmacao(input: {
  paymentId: string;
  email: string;
  nome: string;
  valor?: number;
  billingType?: string;
}): Promise<{ sent: boolean; skipped?: string }> {
  const existing = await getWorkshopRegistration(input.paymentId);
  if (existing.success && existing.data?.email_sent) {
    return { sent: false, skipped: 'já enviado' };
  }

  const saved = await upsertWorkshopRegistration({
    charge_id: input.paymentId,
    reference_id: CORRETORES_REF,
    description: existing.data?.description || CORRETORES_REF,
    nome: input.nome,
    email: input.email,
    status: 'PAID',
    amount_brl: input.valor,
    payment_method: input.billingType,
    paid_at: new Date().toISOString(),
    email_sent: false,
  });
  if (!saved.success) return { sent: false, skipped: saved.error || 'não salvou' };

  const result = await sendEmail({
    to: input.email,
    subject: 'Sua vaga no Workshop Destrava Ligações está confirmada',
    html: htmlConfirmacao(input.nome),
  });
  if (!result.success) return { sent: false, skipped: result.error || 'envio falhou' };

  await upsertWorkshopRegistration({
    charge_id: input.paymentId,
    reference_id: CORRETORES_REF,
    description: existing.data?.description || CORRETORES_REF,
    nome: input.nome,
    email: input.email,
    status: 'PAID',
    amount_brl: input.valor,
    payment_method: input.billingType,
    email_sent: true,
    email_sent_at: new Date().toISOString(),
  });
  return { sent: true };
}

export async function enviarLembretesDoMeioDia(now: Date): Promise<{ dia: string | null; sent: number; failed: number }> {
  const dia = encontroDoDia(now);
  if (!dia || !supabase) return { dia, sent: 0, failed: 0 };

  const { data, error } = await supabase
    .from('workshop_registrations')
    .select('*')
    .eq('reference_id', CORRETORES_REF)
    .eq('status', 'PAID')
    .not('email', 'is', null);

  if (error || !data) return { dia, sent: 0, failed: 0 };

  let sent = 0;
  let failed = 0;
  for (const row of data as WorkshopRegistration[]) {
    if (!row.email || !row.charge_id || jaAvisouNoDia(row.description, dia)) continue;
    const next = descricaoComDia(row.description, dia);
    const claim = await supabase
      .from('workshop_registrations')
      .update({ description: next })
      .eq('charge_id', row.charge_id)
      .eq('description', row.description || CORRETORES_REF)
      .select('charge_id');
    if (claim.error || !claim.data?.length) continue;

    const result = await sendEmail({
      to: row.email,
      subject: 'Falta uma hora para o encontro de hoje',
      html: htmlMeioDia(row.nome || '', dia),
    });
    if (result.success) sent += 1;
    else {
      failed += 1;
      await supabase
        .from('workshop_registrations')
        .update({ description: row.description || CORRETORES_REF })
        .eq('charge_id', row.charge_id);
    }
  }
  return { dia, sent, failed };
}
