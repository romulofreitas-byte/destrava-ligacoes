import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { SALA_SLUG, SALA_TRAVES } from '@/components/sala-de-guerra/constants';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { validateBrazilianWhatsApp } from '@/lib/phone';
import { supabase } from '@/lib/supabase';

function requiredText(message: string) {
  return z.string({ required_error: message, invalid_type_error: message }).trim().min(1, message);
}

const inscricaoSchema = z.object({
  nome: requiredText('Informe seu nome.'),
  whatsapp: requiredText('Informe um WhatsApp.'),
  email: requiredText('Informe um e-mail.').email('E-mail inválido.'),
  nicho: requiredText('Informe o nicho de quem você prospecta.'),
  fraseLead: requiredText('Cole a frase que seus leads estão dizendo.'),
  maiorTrava: z.enum(SALA_TRAVES, {
    errorMap: () => ({ message: 'Escolha sua maior trava.' }),
  }),
  consentimento: z.literal(true, {
    errorMap: () => ({ message: 'É preciso concordar para receber o link da aula.' }),
  }),
  website: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
});

function fieldErrorsFromZod(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form');
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

function cleanUtm(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, 200);
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limited = checkRateLimit(`inscricao-sala:${ip}`, 10, 60_000);
  if (limited) return limited;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 });
  }

  const parsed = inscricaoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Dados inválidos.', fieldErrors: fieldErrorsFromZod(parsed.error) },
      { status: 400 }
    );
  }

  const { nome, whatsapp, email, nicho, fraseLead, maiorTrava, consentimento, website } = parsed.data;

  if (website?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const phoneCheck = validateBrazilianWhatsApp(whatsapp);
  if (!phoneCheck.ok) {
    return NextResponse.json(
      { error: phoneCheck.error, fieldErrors: { whatsapp: phoneCheck.error } },
      { status: 400 }
    );
  }

  if (!supabase) {
    return NextResponse.json(
      { error: 'Não conseguimos salvar agora. Seus dados continuam aqui. Tente de novo.' },
      { status: 500 }
    );
  }

  const respostas: Record<string, string> = {
    nicho,
    frase_lead: fraseLead,
    maior_trava: maiorTrava,
  };
  const utmSource = cleanUtm(parsed.data.utm_source);
  const utmMedium = cleanUtm(parsed.data.utm_medium);
  const utmCampaign = cleanUtm(parsed.data.utm_campaign);
  const utmContent = cleanUtm(parsed.data.utm_content);
  if (utmSource) respostas.utm_source = utmSource;
  if (utmMedium) respostas.utm_medium = utmMedium;
  if (utmCampaign) respostas.utm_campaign = utmCampaign;
  if (utmContent) respostas.utm_content = utmContent;

  const { error } = await supabase.from('inscricoes').upsert(
    {
      slug: SALA_SLUG,
      nome,
      email,
      whatsapp: phoneCheck.e164,
      consentimento,
      respostas,
    },
    { onConflict: 'slug,whatsapp' }
  );

  if (error) {
    console.error('[inscricao-sala] Supabase falhou:', error.message);
    return NextResponse.json(
      { error: 'Não conseguimos salvar agora. Seus dados continuam aqui. Tente de novo.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
