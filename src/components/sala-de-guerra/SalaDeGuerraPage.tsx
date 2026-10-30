'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import { trackAulaLead } from '@/lib/metaPixel';
import { maskBrazilianWhatsApp, validateBrazilianWhatsApp } from '@/lib/phone';
import {
  SALA_MEET_URL,
  SALA_PAGE_TITLE,
  SALA_PROMISES,
  SALA_SLUG,
  SALA_TITLE,
  SALA_TRAVES,
  type SalaTrava,
} from './constants';

type FieldKey = 'nome' | 'whatsapp' | 'email' | 'nicho' | 'fraseLead' | 'maiorTrava' | 'consentimento' | 'form';
type FieldErrors = Partial<Record<FieldKey, string>>;

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function readUtms(): Partial<Record<(typeof UTM_KEYS)[number], string>> {
  const params = new URLSearchParams(window.location.search);
  const utms: Partial<Record<(typeof UTM_KEYS)[number], string>> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) utms[key] = value;
  }
  return utms;
}

function icsEscape(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

function buildIcs(): string {
  const description = `Ao vivo no Google Meet: ${SALA_MEET_URL}`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mundo Podium//Sala de Guerra//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE',
    'TZID:America/Sao_Paulo',
    'X-LIC-LOCATION:America/Sao_Paulo',
    'BEGIN:STANDARD',
    'TZOFFSETFROM:-0300',
    'TZOFFSETTO:-0300',
    'TZNAME:BRT',
    'DTSTART:19700101T000000',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    'UID:sala-de-guerra-pos-eleicao@mundopodium.com.br',
    'DTSTART;TZID=America/Sao_Paulo:20261031T100000',
    'DTEND;TZID=America/Sao_Paulo:20261031T120000',
    `SUMMARY:${icsEscape(SALA_PAGE_TITLE)}`,
    `DESCRIPTION:${icsEscape(description)}`,
    `LOCATION:${icsEscape(SALA_MEET_URL)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return `${lines.join('\r\n')}\r\n`;
}

function downloadIcs() {
  const blob = new Blob([buildIcs()], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sala-de-guerra-pos-eleicao.ics';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-red-400">
      {message}
    </p>
  );
}

export function SalaDeGuerraPage() {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successTitleRef = useRef<HTMLHeadingElement>(null);
  const submittingRef = useRef(false);
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [nicho, setNicho] = useState('');
  const [fraseLead, setFraseLead] = useState('');
  const [maiorTrava, setMaiorTrava] = useState<SalaTrava | ''>('');
  const [consentimento, setConsentimento] = useState(false);
  const [website, setWebsite] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const phoneValid = validateBrazilianWhatsApp(whatsapp).ok;

  useEffect(() => {
    if (!success) return;
    trackAulaLead(SALA_SLUG, SALA_TITLE);
    successTitleRef.current?.focus();
  }, [success]);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return undefined;
    const stopNativeSubmit = (event: Event) => {
      event.preventDefault();
    };
    form.addEventListener('submit', stopNativeSubmit);
    return () => form.removeEventListener('submit', stopNativeSubmit);
  }, [success]);

  const validateClient = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!nome.trim()) next.nome = 'Informe seu nome.';
    const phoneCheck = validateBrazilianWhatsApp(whatsapp);
    if (!phoneCheck.ok) next.whatsapp = phoneCheck.error;
    if (!email.trim()) next.email = 'Informe um e-mail.';
    else if (!isEmail(email)) next.email = 'E-mail inválido.';
    if (!nicho.trim()) next.nicho = 'Informe o nicho de quem você prospecta.';
    if (!fraseLead.trim()) next.fraseLead = 'Cole a frase que seus leads estão dizendo.';
    if (!maiorTrava) next.maiorTrava = 'Escolha sua maior trava.';
    if (!consentimento) next.consentimento = 'É preciso concordar para receber o link da aula.';
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const nextErrors = validateClient();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    submittingRef.current = true;
    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/inscricao/sala-de-guerra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          whatsapp,
          email: email.trim(),
          nicho: nicho.trim(),
          fraseLead: fraseLead.trim(),
          maiorTrava,
          consentimento,
          website,
          ...readUtms(),
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
      } | null;

      if (response.status === 400) {
        setErrors(data?.fieldErrors ?? { form: data?.error || 'Dados inválidos.' });
        return;
      }

      if (response.status === 429) {
        setErrors({ form: 'Muitas tentativas. Espere um minuto e tente de novo.' });
        return;
      }

      if (!response.ok || !data?.ok) {
        setErrors({
          form: data?.error || 'Não conseguimos salvar agora. Seus dados continuam aqui. Tente de novo.',
        });
        return;
      }

      setSuccess(true);
    } catch {
      setErrors({
        form: 'Não conseguimos salvar agora. Seus dados continuam aqui. Tente de novo.',
      });
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {success ? (
        <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-4 py-16 text-center">
          <h1
            ref={successTitleRef}
            tabIndex={-1}
            className="text-3xl font-bold leading-tight text-white outline-none sm:text-4xl"
          >
            Você está dentro.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-gray-300 sm:text-lg">
            Sábado, 31/10, às 10h. Chega cedo e liga a câmera.
          </p>
          <a
            href={SALA_MEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="aula-cta mt-6"
          >
            Entrar na sala (Google Meet)
          </a>
          <button
            type="button"
            onClick={downloadIcs}
            className="mt-3 inline-flex w-full items-center justify-center rounded-full border-2 border-white px-5 py-3.5 text-sm font-bold text-white hover:bg-white hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
          >
            Adicionar ao calendário
          </button>
          <p className="mt-8 text-sm leading-relaxed text-gray-300">
            Fica de olho no grupo da Comunidade. Os avisos saem por lá.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            Segunda é feriado e vai ter sala mesmo assim. Terça, 9h, todo mundo ligando junto.
          </p>
        </main>
      ) : (
        <main className="mx-auto grid w-full max-w-6xl flex-1 items-start gap-6 px-4 pb-10 pt-6 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-8 lg:pb-14 lg:pt-10">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-gray-900">
              <span className="aula-pulse" aria-hidden="true" />
              AULA AO VIVO · GRATUITA
            </p>
            <h1 className="mt-4 text-[clamp(1.85rem,9vw,3.25rem)] font-bold leading-[1.05] text-white">
              Sala de Guerra Pós-Eleição
            </h1>
            <p className="mt-4 text-lg font-bold leading-snug text-white sm:text-xl">
              O empresário travou. Você não pode travar.
            </p>
            <p className="mt-3 text-base text-gray-300">Sábado, 31/10, às 10h. Ao vivo no Google Meet.</p>
            <ul className="mx-auto mt-6 max-w-md space-y-3 text-left lg:mx-0">
              {SALA_PROMISES.map((promise, index) => (
                <li key={promise} className="flex items-start gap-3 text-sm leading-snug text-gray-200 sm:text-base">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-xs font-black text-gray-900"
                  >
                    {index + 1}
                  </span>
                  {promise}
                </li>
              ))}
            </ul>
          </div>

          <div className="aula-panel border-yellow-400/50 p-4 text-center shadow-lg shadow-yellow-500/10 sm:p-8 lg:border-yellow-400/30 lg:text-left">
            <form
              ref={formRef}
              className="space-y-4"
              method="post"
              action="/api/inscricao/sala-de-guerra"
              onSubmit={handleSubmit}
              noValidate
              aria-busy={submitting}
            >
              <div className="sr-only" aria-hidden="true">
                <label htmlFor={`${formId}-website`}>Website</label>
                <input
                  id={`${formId}-website`}
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </div>

              <div>
                <label htmlFor={`${formId}-nome`} className="mb-1.5 block text-sm font-bold text-gray-300">
                  Nome
                </label>
                <input
                  id={`${formId}-nome`}
                  name="nome"
                  type="text"
                  autoComplete="name"
                  required
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  className="aula-input"
                  aria-invalid={Boolean(errors.nome)}
                  aria-describedby={errors.nome ? `${formId}-nome-error` : undefined}
                />
                <FieldError id={`${formId}-nome-error`} message={errors.nome} />
              </div>

              <div>
                <label htmlFor={`${formId}-whatsapp`} className="mb-1.5 block text-sm font-bold text-gray-300">
                  WhatsApp com DDD
                </label>
                <div className="relative">
                  <input
                    id={`${formId}-whatsapp`}
                    name="whatsapp"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    required
                    placeholder="(00) 00000-0000"
                    value={whatsapp}
                    onChange={(event) => setWhatsapp(maskBrazilianWhatsApp(event.target.value))}
                    className={`aula-input pr-10 ${phoneValid ? 'border-green-500/70' : ''}`}
                    aria-invalid={Boolean(errors.whatsapp)}
                    aria-describedby={errors.whatsapp ? `${formId}-whatsapp-error` : undefined}
                  />
                  {phoneValid ? (
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-green-400" aria-hidden="true">
                      ✓
                    </span>
                  ) : null}
                </div>
                <FieldError id={`${formId}-whatsapp-error`} message={errors.whatsapp} />
              </div>

              <div>
                <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm font-bold text-gray-300">
                  E-mail
                </label>
                <input
                  id={`${formId}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="aula-input"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                />
                <FieldError id={`${formId}-email-error`} message={errors.email} />
              </div>

              <div>
                <label htmlFor={`${formId}-nicho`} className="mb-1.5 block text-sm font-bold text-gray-300">
                  Seu nicho: quem você prospecta?
                </label>
                <input
                  id={`${formId}-nicho`}
                  name="nicho"
                  type="text"
                  required
                  value={nicho}
                  onChange={(event) => setNicho(event.target.value)}
                  className="aula-input"
                  aria-invalid={Boolean(errors.nicho)}
                  aria-describedby={errors.nicho ? `${formId}-nicho-error` : undefined}
                />
                <FieldError id={`${formId}-nicho-error`} message={errors.nicho} />
              </div>

              <div>
                <label htmlFor={`${formId}-frase`} className="mb-1.5 block text-sm font-bold text-gray-300">
                  O que seus leads estão dizendo agora? Cola a frase literal.
                </label>
                <textarea
                  id={`${formId}-frase`}
                  name="fraseLead"
                  required
                  rows={3}
                  value={fraseLead}
                  onChange={(event) => setFraseLead(event.target.value)}
                  className="aula-input"
                  aria-invalid={Boolean(errors.fraseLead)}
                  aria-describedby={errors.fraseLead ? `${formId}-frase-error` : undefined}
                />
                <FieldError id={`${formId}-frase-error`} message={errors.fraseLead} />
              </div>

              <div>
                <label htmlFor={`${formId}-trava`} className="mb-1.5 block text-sm font-bold text-gray-300">
                  Sua maior trava hoje
                </label>
                <select
                  id={`${formId}-trava`}
                  name="maiorTrava"
                  required
                  value={maiorTrava}
                  onChange={(event) => setMaiorTrava(event.target.value as SalaTrava | '')}
                  className="aula-input"
                  aria-invalid={Boolean(errors.maiorTrava)}
                  aria-describedby={errors.maiorTrava ? `${formId}-trava-error` : undefined}
                >
                  <option value="">Selecione</option>
                  {SALA_TRAVES.map((trava) => (
                    <option key={trava} value={trava}>
                      {trava}
                    </option>
                  ))}
                </select>
                <FieldError id={`${formId}-trava-error`} message={errors.maiorTrava} />
              </div>

              <div>
                <label htmlFor={`${formId}-consent`} className="flex items-start gap-3 text-left text-sm text-gray-300">
                  <input
                    id={`${formId}-consent`}
                    name="consentimento"
                    type="checkbox"
                    checked={consentimento}
                    onChange={(event) => setConsentimento(event.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-yellow-400"
                    aria-invalid={Boolean(errors.consentimento)}
                    aria-describedby={errors.consentimento ? `${formId}-consent-error` : undefined}
                  />
                  <span>
                    Concordo em receber o link da aula e comunicações do Mundo Pódium por WhatsApp e e-mail.{' '}
                    <a href="/privacidade" className="font-bold text-yellow-400 underline underline-offset-2">
                      Política de Privacidade
                    </a>
                  </span>
                </label>
                <FieldError id={`${formId}-consent-error`} message={errors.consentimento} />
              </div>

              {errors.form ? (
                <p className="text-sm text-red-400" role="alert">
                  {errors.form}
                </p>
              ) : null}

              <button type="submit" className="aula-cta" disabled={submitting}>
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="aula-spin h-4 w-4 rounded-full border-2 border-gray-900/30 border-t-gray-900" />
                    Enviando…
                  </span>
                ) : (
                  'Quero entrar na sala'
                )}
              </button>
              <p className="text-sm leading-relaxed text-gray-300">
                170+ lives e 400+ horas de ligação real. Ao vivo. Sem corte.
              </p>
              <p className="text-xs leading-relaxed text-gray-500">
                Quanto mais real o que você escrever, melhor a sala fica.
              </p>
            </form>
          </div>
        </main>
      )}

      <footer className="border-t border-yellow-400/20 px-4 py-8 text-center">
        <Image
          src="/logos-mundo-podium/logo_horizontal_claro.png"
          alt="Mundo Pódium"
          width={140}
          height={32}
          className="mx-auto h-8 w-auto"
        />
        <p className="mt-4 text-xs leading-relaxed text-gray-400">Mundo Pódium LTDA · CNPJ 68.349.974/0001-19</p>
        <p className="text-xs leading-relaxed text-gray-400">Belo Horizonte, MG</p>
      </footer>
    </div>
  );
}
