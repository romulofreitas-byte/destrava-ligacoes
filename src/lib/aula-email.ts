import type { Aula } from '@/content/aulas';
import { getAulaQuandoLabel } from '@/content/aulas';
import { WORKSHOP_PUBLIC_SITE_URL } from '@/lib/constants';
import { buildGoogleCalendarUrl } from '@/lib/aula-calendar';
import { sendEmail } from '@/lib/email';
import { escapeHtml } from '@/lib/escape-html';

const LOGO_URL = `${WORKSHOP_PUBLIC_SITE_URL}/logos-mundo-podium/logo_horizontal_claro.png`;

function safeName(nome: string): string {
  return escapeHtml(nome.trim() || 'Participante');
}

function aulaFromAddress(): string {
  const raw =
    process.env.FROM_EMAIL && !process.env.FROM_EMAIL.includes('escuderiapodium')
      ? process.env.FROM_EMAIL.trim()
      : 'noreply@pitstop.mundopodium.com.br';
  return raw.includes('<') ? raw : `Mundo Pódium <${raw}>`;
}

export function getAulaConfirmationHtml(aula: Aula, nome: string): string {
  const calendarUrl = buildGoogleCalendarUrl(aula);
  const quando = getAulaQuandoLabel(aula);
  const meetUrl = aula.linkMeet;
  const whatsappUrl = aula.linkComunidade;
  const siteUrl = `${WORKSHOP_PUBLIC_SITE_URL}/aula/${aula.slug}`;

  const meetButton = meetUrl
    ? `<a href="${escapeHtml(meetUrl)}" style="display:block;background:#eab308;color:#111827;text-decoration:none;font-weight:800;font-size:14px;letter-spacing:0.04em;padding:14px 20px;border-radius:999px;text-align:center;">ABRIR O GOOGLE MEET</a>`
    : `<p style="margin:0;color:#d1d5db;font-size:15px;line-height:1.5;">O link do Meet chega no grupo do WhatsApp.</p>`;

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>${escapeHtml(aula.email.subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#111827;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${escapeHtml(quando)}. Grátis. Google Meet. Sem gravação.
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#111827" style="background-color:#111827;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#111827" style="max-width:600px;background-color:#111827;">
          <tr>
            <td align="center" style="padding:8px 8px 20px;">
              <a href="${escapeHtml(siteUrl)}" style="text-decoration:none;">
                <img src="${escapeHtml(LOGO_URL)}" alt="Mundo Pódium" width="168" height="38" style="display:block;width:168px;height:auto;border:0;" />
              </a>
            </td>
          </tr>
          <tr>
            <td bgcolor="#1f2937" style="background-color:#1f2937;border:1px solid #374151;border-radius:16px;overflow:hidden;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td bgcolor="#eab308" style="background-color:#eab308;padding:10px 24px;text-align:center;color:#111827;font-size:12px;font-weight:800;letter-spacing:0.12em;">
                    AO VIVO · GRÁTIS · ${escapeHtml(quando).toUpperCase()}
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 24px 8px;">
                    <p style="margin:0 0 8px;color:#facc15;font-size:11px;font-weight:700;letter-spacing:0.18em;">AULA AO VIVO</p>
                    <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.15;font-weight:800;">${escapeHtml(aula.tituloLinha1)}<br />${escapeHtml(aula.tituloLinha2)}</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px 0;color:#d1d5db;font-size:16px;line-height:1.55;">
                    <p style="margin:0 0 16px;color:#ffffff;">Olá, <strong>${safeName(nome)}</strong>.</p>
                    <p style="margin:0;">Inscrição confirmada. Te vejo ${escapeHtml(quando)} no Google Meet.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#111827" style="background-color:#111827;border:1px solid #374151;border-radius:12px;">
                      <tr>
                        <td style="padding:18px 20px;">
                          <p style="margin:0 0 6px;color:#facc15;font-size:11px;font-weight:700;letter-spacing:0.14em;">QUANDO</p>
                          <p style="margin:0 0 14px;color:#ffffff;font-size:16px;font-weight:700;">${escapeHtml(quando)} · 1h30 · Sem gravação</p>
                          <p style="margin:0;color:#9ca3af;font-size:14px;line-height:1.45;">Segunda, 21/09 · 20:30 às 22:00 · horário de Brasília</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 24px 12px;">${meetButton}</td>
                </tr>
                <tr>
                  <td style="padding:0 24px 12px;">
                    <a href="${escapeHtml(whatsappUrl)}" style="display:block;background-color:#111827;color:#facc15;text-decoration:none;font-weight:800;font-size:14px;letter-spacing:0.04em;padding:13px 20px;border-radius:999px;text-align:center;border:2px solid #facc15;">ENTRAR NO GRUPO DO WHATSAPP</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 24px 24px;">
                    <a href="${escapeHtml(calendarUrl)}" style="display:block;background-color:#111827;color:#ffffff;text-decoration:none;font-weight:800;font-size:14px;letter-spacing:0.04em;padding:13px 20px;border-radius:999px;text-align:center;border:2px solid #ffffff;">ADICIONAR NA AGENDA</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 24px 28px;color:#9ca3af;font-size:13px;line-height:1.5;">
                    <p style="margin:0;">Não vai ter gravação. Se o horário mudar, o aviso chega no WhatsApp.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:22px 12px 8px;color:#6b7280;font-size:12px;line-height:1.6;">
              <p style="margin:0 0 4px;color:#d1d5db;font-weight:700;">${escapeHtml(aula.footer.brand)}</p>
              <p style="margin:0;">${escapeHtml(aula.footer.razao)} · CNPJ ${escapeHtml(aula.footer.cnpj)}</p>
              <p style="margin:4px 0 0;">${escapeHtml(aula.footer.cidade)}</p>
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
    from: aulaFromAddress(),
  });
}
