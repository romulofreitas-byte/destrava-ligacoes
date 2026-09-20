import type { Aula } from '@/content/aulas';
import { buildGoogleCalendarUrl } from '@/lib/aula-calendar';
import { sendEmail } from '@/lib/email';
import { escapeHtml } from '@/lib/escape-html';

function safeName(nome: string): string {
  return escapeHtml(nome.trim() || 'Participante');
}

export function getAulaConfirmationHtml(aula: Aula, nome: string): string {
  const calendarUrl = buildGoogleCalendarUrl(aula);
  const meet = aula.linkMeet
    ? `<a href="${escapeHtml(aula.linkMeet)}" style="color:#facc15;font-weight:700;">${escapeHtml(aula.linkMeet)}</a>`
    : 'O link do Meet também está na página de confirmação e no grupo do WhatsApp.';

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(aula.email.subject)}</title>
</head>
<body style="margin:0;padding:0;background:#111827;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#111827;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:600px;background:#1f2937;border:1px solid #374151;border-radius:16px;">
          <tr>
            <td style="padding:28px 28px 16px;border-left:4px solid #facc15;">
              <p style="margin:0 0 8px;color:#facc15;font-size:12px;letter-spacing:2px;font-weight:700;">MUNDO PÓDIUM</p>
              <h1 style="margin:0;color:#ffffff;font-size:24px;line-height:1.2;">${escapeHtml(aula.titulo)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px;color:#cdcdd2;font-size:16px;line-height:1.6;">
              <p style="margin:0 0 16px;color:#ffffff;">Olá, <strong>${safeName(nome)}</strong>.</p>
              <p style="margin:0 0 16px;">Sua inscrição está confirmada. Te vejo na segunda, 21/09, às 20:30 (horário de Brasília).</p>
              <p style="margin:0 0 8px;color:#ffffff;"><strong>Quando:</strong> ${escapeHtml(aula.metaLine)}</p>
              <p style="margin:0 0 8px;color:#ffffff;"><strong>Google Meet:</strong> ${meet}</p>
              <p style="margin:0 0 24px;color:#ffffff;"><strong>Grupo no WhatsApp:</strong> <a href="${escapeHtml(aula.linkComunidade)}" style="color:#facc15;">entrar no grupo</a></p>
              <p style="margin:0 0 24px;">
                <a href="${escapeHtml(calendarUrl)}" style="display:inline-block;background:#eab308;color:#111827;text-decoration:none;font-weight:800;padding:12px 18px;border-radius:999px;">ADICIONAR NA AGENDA</a>
              </p>
              <p style="margin:0;color:#7a7a80;font-size:14px;">Não vai ter gravação. Se o horário mudar, o aviso chega no WhatsApp.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

export async function sendAulaConfirmationEmail(aula: Aula, nome: string, email: string) {
  return sendEmail({
    to: email,
    subject: aula.email.subject,
    html: getAulaConfirmationHtml(aula, nome),
  });
}
