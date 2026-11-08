export const CORRETORES_REF = 'workshop-corretores';
export const CORRETORES_PLATAFORMA_URL = 'https://casa.mundopodium.com.br';
const CORRETORES_WHATSAPP_URL = 'https://chat.whatsapp.com/F82ZRlJ0NSf9TQ7kz03nAj';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const LINK_CODES = ['ybyrv6lwt1805z4e', 'goqsiy1wfafoegfx'];

const ENCONTROS = {
  '2026-11-09': 'segunda, 09/11',
  '2026-11-11': 'quarta, 11/11',
} as const;

export type CorretoresEncontro = keyof typeof ENCONTROS;

export type AsaasPayment = {
  id?: string;
  customer?: string | { id?: string; email?: string; name?: string };
  paymentLink?: string;
  description?: string;
  externalReference?: string;
  value?: number;
  billingType?: string;
  status?: string;
};

export type AsaasNotice = {
  event?: string;
  payment?: AsaasPayment;
};

export function encontroDoDia(now: Date): CorretoresEncontro | null {
  const ymd = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
  const hour = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    hourCycle: 'h23',
  }).format(now);
  if (hour !== '12') return null;
  if (ymd === '2026-11-09' || ymd === '2026-11-11') return ymd;
  return null;
}

export function descricaoComDia(description: string | undefined, dia: CorretoresEncontro): string {
  const base = description?.trim() || CORRETORES_REF;
  if (base.includes(dia)) return base;
  return `${base}|${dia}`;
}

export function jaAvisouNoDia(description: string | undefined, dia: CorretoresEncontro): boolean {
  return Boolean(description?.includes(dia));
}

const PAID_EVENTS = new Set(['PAYMENT_RECEIVED', 'PAYMENT_CONFIRMED']);

export function isPaidEvent(event: string | undefined): boolean {
  return Boolean(event && PAID_EVENTS.has(event));
}

export function customerIdOf(payment: AsaasPayment | undefined): string | null {
  const customer = payment?.customer;
  if (!customer) return null;
  if (typeof customer === 'string') return customer;
  return customer.id || null;
}

export function emailNoPagamento(payment: AsaasPayment | undefined): string | null {
  const customer = payment?.customer;
  if (customer && typeof customer === 'object' && customer.email?.includes('@')) {
    return customer.email.trim();
  }
  return null;
}

export function nomeNoPagamento(payment: AsaasPayment | undefined): string | null {
  const customer = payment?.customer;
  if (customer && typeof customer === 'object' && customer.name?.trim()) {
    return customer.name.trim();
  }
  return null;
}

export function pareceDestaEdicao(payment: AsaasPayment | undefined, linkUrl?: string | null): boolean {
  const blob = `${payment?.paymentLink || ''} ${payment?.description || ''} ${payment?.externalReference || ''} ${linkUrl || ''}`.toLowerCase();
  return LINK_CODES.some((code) => blob.includes(code)) || blob.includes('corretor');
}

function button(href: string, label: string): string {
  return `<a href="${escapeHtml(href)}" style="display:inline-block;background:#eab308;color:#111827;text-decoration:none;font-weight:800;font-size:14px;padding:14px 22px;border-radius:999px;">${escapeHtml(label)}</a>`;
}

export function htmlConfirmacao(nome: string): string {
  const safe = escapeHtml(nome.trim() || 'oi');
  return `<!DOCTYPE html><html lang="pt-BR"><body style="margin:0;background:#111827;font-family:Arial,sans-serif;">
  <table role="presentation" width="100%" style="background:#111827;padding:32px 16px;"><tr><td align="center">
  <table role="presentation" width="100%" style="max-width:560px;background:#1f2937;border-radius:16px;padding:32px;">
  <tr><td style="color:#fbbf24;font-size:13px;font-weight:700;letter-spacing:0.08em;">WORKSHOP DESTRAVA LIGAÇÕES</td></tr>
  <tr><td style="color:#ffffff;font-size:28px;font-weight:800;padding-top:12px;">Sua vaga está confirmada.</td></tr>
  <tr><td style="color:#e5e7eb;font-size:16px;line-height:1.6;padding-top:16px;">Olá, ${safe}. A compra foi concluída. O acesso à plataforma do Mundo Pódium chega por e-mail, no Circle.</td></tr>
  <tr><td style="color:#e5e7eb;font-size:16px;line-height:1.6;padding-top:12px;">Lá, à direita, em Eventos futuros, estão os dois encontros: segunda, 09/11, e quarta, 11/11, às 13h. Confirma a participação nos dois.</td></tr>
  <tr><td style="color:#e5e7eb;font-size:16px;line-height:1.6;padding-top:12px;">Na terça, 10/11, em horário comercial, são as 5 ligações reais.</td></tr>
  <tr><td style="color:#e5e7eb;font-size:16px;line-height:1.6;padding-top:12px;">Entra no grupo da turma. É por lá que a gente comunica os movimentos das aulas: avisos, dúvidas e o que vai acontecer no workshop.</td></tr>
  <tr><td style="padding-top:24px;">${button(CORRETORES_WHATSAPP_URL, 'Entrar no grupo da turma')}</td></tr>
  <tr><td style="padding-top:12px;">${button(CORRETORES_PLATAFORMA_URL, 'Abrir a plataforma')}</td></tr>
  </table></td></tr></table></body></html>`;
}

export function htmlMeioDia(nome: string, dia: CorretoresEncontro): string {
  const safe = escapeHtml(nome.trim() || 'oi');
  const quando = ENCONTROS[dia];
  return `<!DOCTYPE html><html lang="pt-BR"><body style="margin:0;background:#111827;font-family:Arial,sans-serif;">
  <table role="presentation" width="100%" style="background:#111827;padding:32px 16px;"><tr><td align="center">
  <table role="presentation" width="100%" style="max-width:560px;background:#1f2937;border-radius:16px;padding:32px;">
  <tr><td style="color:#fbbf24;font-size:13px;font-weight:700;letter-spacing:0.08em;">FALTA UMA HORA</td></tr>
  <tr><td style="color:#ffffff;font-size:28px;font-weight:800;padding-top:12px;">O encontro de hoje começa às 13h.</td></tr>
  <tr><td style="color:#e5e7eb;font-size:16px;line-height:1.6;padding-top:16px;">Olá, ${safe}. Hoje é ${quando}. Entra na plataforma do Mundo Pódium e confirma a participação em Eventos futuros, à direita.</td></tr>
  <tr><td style="color:#e5e7eb;font-size:16px;line-height:1.6;padding-top:12px;">O grupo da turma é onde a gente comunica os movimentos das aulas.</td></tr>
  <tr><td style="padding-top:24px;">${button(CORRETORES_PLATAFORMA_URL, 'Abrir a plataforma')}</td></tr>
  <tr><td style="padding-top:12px;">${button(CORRETORES_WHATSAPP_URL, 'Grupo da turma')}</td></tr>
  </table></td></tr></table></body></html>`;
}
