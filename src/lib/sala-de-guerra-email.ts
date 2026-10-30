import { SALA_MEET_URL, SALA_TITLE } from '../components/sala-de-guerra/constants';
import { getRelativeDayLabel } from './aula-date';
import { WORKSHOP_PUBLIC_SITE_URL } from './constants';
import { sendEmail } from './email';
import { escapeHtml } from './escape-html';

const SALA_START = '2026-10-31T10:00:00-03:00';
const LOGO_URL = `${WORKSHOP_PUBLIC_SITE_URL}/logos-mundo-podium/logo_horizontal_claro.png`;

function fromAddress(): string {
  const raw =
    process.env.FROM_EMAIL && !process.env.FROM_EMAIL.includes('escuderiapodium')
      ? process.env.FROM_EMAIL.trim()
      : 'noreply@pitstop.mundopodium.com.br';
  return raw.includes('<') ? raw : `Mundo Pódium <${raw}>`;
}

function firstName(nome: string): string {
  const trimmed = nome.trim() || 'Participante';
  return escapeHtml(trimmed.split(/\s+/)[0] || trimmed);
}

export function salaQuandoLabel(now: Date = new Date()): string {
  const relative = getRelativeDayLabel(SALA_START, now);
  if (relative === 'Amanhã') return 'Amanhã, sábado, 31/10, às 10h';
  if (relative === 'Hoje') return 'Hoje, sábado, 31/10, às 10h';
  return 'Sábado, 31/10, às 10h';
}

export function salaConfirmationSubject(now: Date = new Date()): string {
  const relative = getRelativeDayLabel(SALA_START, now);
  if (relative === 'Amanhã' || relative === 'Hoje') {
    return `${relative}, 10h: ${SALA_TITLE}`;
  }
  return `Sábado, 31/10, 10h: ${SALA_TITLE}`;
}

export function getSalaDeGuerraConfirmationHtml(nome: string, now: Date = new Date()): string {
  const quando = salaQuandoLabel(now);
  const subject = salaConfirmationSubject(now);
  const meetUrl = escapeHtml(SALA_MEET_URL);

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#111827;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${escapeHtml(quando)}. O link da sala está aqui.
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#111827" style="background-color:#111827;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td align="center" style="padding:8px 8px 20px;">
              <img src="${escapeHtml(LOGO_URL)}" alt="Mundo Pódium" width="168" height="38" style="display:block;width:168px;height:auto;border:0;" />
            </td>
          </tr>
          <tr>
            <td bgcolor="#1f2937" style="background-color:#1f2937;border:1px solid #374151;border-radius:16px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td bgcolor="#eab308" style="background-color:#eab308;padding:10px 24px;text-align:center;color:#111827;font-size:12px;font-weight:800;letter-spacing:0.12em;">
                    AO VIVO · GRÁTIS · ${escapeHtml(quando).toUpperCase()}
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 24px 8px;">
                    <p style="margin:0 0 8px;color:#facc15;font-size:11px;font-weight:700;letter-spacing:0.18em;">AULA AO VIVO</p>
                    <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.15;font-weight:800;">${escapeHtml(SALA_TITLE)}</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px 0;color:#d1d5db;font-size:16px;line-height:1.55;">
                    <p style="margin:0 0 16px;color:#ffffff;">Olá, <strong>${firstName(nome)}</strong>.</p>
                    <p style="margin:0;">Inscrição confirmada. ${escapeHtml(quando)}. Chega cedo e liga a câmera.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 24px 8px;">
                    <a href="${meetUrl}" style="display:block;background:#eab308;color:#111827;text-decoration:none;font-weight:800;font-size:14px;letter-spacing:0.04em;padding:14px 20px;border-radius:999px;text-align:center;">ENTRAR NA SALA</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 24px 28px;color:#9ca3af;font-size:14px;line-height:1.5;">
                    <p style="margin:0;">Se o botão não abrir, copia este link:<br />
                    <a href="${meetUrl}" style="color:#facc15;word-break:break-all;">${meetUrl}</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:22px 12px 8px;color:#6b7280;font-size:12px;line-height:1.6;">
              <p style="margin:0 0 4px;color:#d1d5db;font-weight:700;">Mundo Pódium</p>
              <p style="margin:0;">Mundo Pódium LTDA · CNPJ 68.349.974/0001-19</p>
              <p style="margin:4px 0 0;">Belo Horizonte, MG</p>
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

export async function sendSalaDeGuerraConfirmationEmail(nome: string, email: string) {
  const now = new Date();
  return sendEmail({
    to: email,
    subject: salaConfirmationSubject(now),
    html: getSalaDeGuerraConfirmationHtml(nome, now),
    from: fromAddress(),
  });
}
