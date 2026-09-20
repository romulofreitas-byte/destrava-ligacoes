import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAulaBySlug, resolveAulaLinks } from '@/content/aulas';
import { sendAulaConfirmationEmail } from '@/lib/aula-email';
import { persistAulaInscricao } from '@/lib/aula-persist';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { validateBrazilianWhatsApp, validateFullName } from '@/lib/phone';

const inscricaoSchema = z.object({
  nome: z.string().trim().min(3, 'Informe nome e sobrenome.'),
  whatsapp: z.string().trim().min(1, 'Informe um WhatsApp.'),
  email: z.string().trim().email('E-mail inválido.'),
  slug: z.string().trim().min(1, 'Aula inválida.'),
  consentimento: z.literal(true, {
    errorMap: () => ({ message: 'Autorize o contato pelo WhatsApp.' }),
  }),
  website: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limited = checkRateLimit(`inscricao:${ip}`, 10, 60_000);
  if (limited) return limited;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 });
  }

  const parsed = inscricaoSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ error: 'Dados inválidos.', fieldErrors }, { status: 400 });
  }

  const { nome, whatsapp, email, slug, consentimento, website } = parsed.data;

  if (website) {
    return NextResponse.json({
      ok: true,
      redirectTo: `/aula/${slug}/obrigado`,
    });
  }

  const aula = getAulaBySlug(slug);
  if (!aula) {
    return NextResponse.json({ error: 'Aula não encontrada.', fieldErrors: { slug: 'Aula inválida.' } }, { status: 400 });
  }

  const nameCheck = validateFullName(nome);
  if (!nameCheck.ok) {
    return NextResponse.json(
      { error: nameCheck.error, fieldErrors: { nome: nameCheck.error } },
      { status: 400 }
    );
  }

  const phoneCheck = validateBrazilianWhatsApp(whatsapp);
  if (!phoneCheck.ok) {
    return NextResponse.json(
      { error: phoneCheck.error, fieldErrors: { whatsapp: phoneCheck.error } },
      { status: 400 }
    );
  }

  const redirectTo = `/aula/${slug}/obrigado`;

  const resolvedAula = resolveAulaLinks(aula);
  const trimmedEmail = email.trim();

  try {
    await persistAulaInscricao({
      slug,
      nome: nome.trim(),
      whatsapp: phoneCheck.e164,
      email: trimmedEmail,
      consentimento,
    });
  } catch (error) {
    console.error('[inscricao] Persistência falhou:', error);
  }

  try {
    const emailResult = await sendAulaConfirmationEmail(resolvedAula, nome.trim(), trimmedEmail);
    if (!emailResult.success) {
      console.error('[inscricao] E-mail de confirmação não enviado:', emailResult.error);
    }
  } catch (error) {
    console.error('[inscricao] E-mail de confirmação falhou:', error);
  }

  return NextResponse.json({ ok: true, redirectTo });
}
