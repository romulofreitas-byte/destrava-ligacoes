'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import { trackAulaLead, trackCustomEvent } from '@/lib/metaPixel';
import { maskBrazilianWhatsApp, validateBrazilianWhatsApp } from '@/lib/phone';
import {
  SALA_JOIN_URL,
  SALA_PAGE_TITLE,
  SALA_PROMISES,
  SALA_SLUG,
  SALA_TITLE,
  SALA_TRAVES,
  SALA_UNLOCK_URL,
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
  const description = `Sala de Guerra no Treino Livre | Aulas Abertas. Entre na Mundo Pódium: ${SALA_JOIN_URL}`;
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
    'DTEND;TZID=America/Sao_Paulo:20261031T130000',
    `SUMMARY:${icsEscape(SALA_PAGE_TITLE)}`,
    `DESCRIPTION:${icsEscape(description)}`,
    `LOCATION:${icsEscape('Treino Livre | Aulas Abertas, Mundo Pódium')}`,
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

const ACCESS_CARDS = [
  {
    title: 'Treino Livre | Aulas Abertas',
    text: 'Aulas abertas e eventos ao vivo, como a Sala de Guerra.',
  },
  { title: 'Comece aqui!', text: 'Sua apresentação e os primeiros passos da jornada.' },
  { title: 'Desafio Pódium', text: 'Desafios simples pra você dar sua primeira ação.' },
  { title: 'Chegada ao Pódium', text: 'A vitrine de resultados e conquistas dos Pilotos.' },
  { title: 'Rádio Pódium', text: 'O chat da comunidade.' },
  { title: 'Torre de Controle', text: 'Os avisos da plataforma.' },
] as const;

const HOW_STEPS = [
  'Garanta sua vaga. Preenche o cadastro acima.',
  'Crie seu acesso. Você entra na plataforma e se apresenta no "Comece aqui!".',
  'Entre na sala. Sábado, 10h, ao vivo, no Treino Livre | Aulas Abertas.',
] as const;

const FAQ = [
  {
    question: 'Preciso pagar pra entrar?',
    answer: 'Não. O acesso à plataforma e à Sala de Guerra é gratuito.',
  },
  {
    question: 'Pra quem é?',
    answer: 'Pra quem vive de marcar reunião: vendedor, SDR e dono de pequena empresa.',
  },
] as const;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-red-400">
      {message}
    </p>
  );
}

function FaqList() {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {FAQ.map((item, index) => {
        const expanded = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.question} className="aula-panel overflow-hidden">
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
              >
                {item.question}
                <span aria-hidden="true" className="text-yellow-400">
                  {expanded ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded}>
              <p className="px-5 pb-4 text-sm leading-relaxed text-gray-300">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
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

  const scrollToForm = () => {
    trackCustomEvent('ClickCTAFinal', { content_name: SALA_SLUG });
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const field = document.getElementById(`${formId}-nome`);
    window.setTimeout(() => {
      if (field instanceof HTMLElement) field.focus({ preventScroll: true });
    }, 400);
  };

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
    <div className="sala-fit flex min-h-dvh flex-col">
      <style>{`
        .sala-fit .sala-input {
          border-radius: 1rem;
          padding-top: 0.7rem;
          padding-bottom: 0.7rem;
        }
      `}</style>
      {success ? (
        <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-4 py-16 text-center">
          <h1
            ref={successTitleRef}
            tabIndex={-1}
            className="text-3xl font-bold leading-tight text-white outline-none sm:text-4xl"
          >
            Seu acesso à Mundo Pódium está liberado, Piloto!
          </h1>
          <p className="mt-6 text-base leading-relaxed text-gray-300 sm:text-lg">
            Agora você faz parte da Mundo Pódium. Entre na plataforma para acessar o{' '}
            <span className="whitespace-nowrap">Treino Livre | Aulas Abertas</span>, acompanhar a Sala de Guerra e começar sua jornada.
          </p>
          <p className="mt-3 text-sm font-bold text-white">Sábado, 31/10, às 10h. 3 horas.</p>
          <a href={SALA_JOIN_URL} className="aula-cta mt-6">
            Entrar na Mundo Pódium
          </a>
          <button
            type="button"
            onClick={downloadIcs}
            className="mt-3 inline-flex w-full items-center justify-center rounded-full border-2 border-white px-5 py-3.5 text-sm font-bold text-white hover:bg-white hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
          >
            Adicionar ao calendário
          </button>
          <p className="mt-8 text-sm leading-relaxed text-gray-300">
            Você já pode acessar aulas abertas, eventos e os primeiros espaços da comunidade. Quando estiver pronto para acelerar, desbloqueie a experiência completa da Plataforma Mundo Pódium.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-gray-300">
            Você já entrou na pista. Agora, desbloqueie a estrutura completa para evoluir com método, acompanhamento, treinamentos, mentorias e prática comercial.
          </p>
          <a
            href={SALA_UNLOCK_URL}
            className="mt-4 inline-flex w-full items-center justify-center rounded-full border-2 border-yellow-400 px-5 py-3.5 text-sm font-bold text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
          >
            Desbloquear a Plataforma Mundo Pódium
          </a>
        </main>
      ) : (
        <>
        <main className="mx-auto grid w-full max-w-6xl flex-1 items-start gap-6 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-6 lg:py-10 lg:px-8">
          <div className="text-center lg:col-start-1 lg:row-start-1 lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-gray-900">
              <span className="aula-pulse" aria-hidden="true" />
              SALA AO VIVO · GRATUITA
            </p>
            <h1 className="mt-4 whitespace-pre-line text-[clamp(1.9rem,8vw,3.15rem)] font-bold leading-[1.05] text-white">
              {'Sala de Guerra\nPós-Eleição'}
            </h1>
            <p className="mt-3 text-lg font-bold leading-snug text-white">
              O empresário travou. Você não pode travar.
            </p>
            <p className="mt-2 text-base text-gray-300">Sábado, 31/10, às 10h. 3 horas.</p>
            <p className="text-base text-gray-300">
              Dentro da plataforma Mundo Pódium, no espaço{' '}
              <span className="whitespace-nowrap">Treino Livre | Aulas Abertas</span>.
            </p>
          </div>

          <div className="aula-panel border-yellow-400/50 p-4 text-left shadow-lg shadow-yellow-500/10 sm:p-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:border-yellow-400/30">
            <form
              ref={formRef}
              className="space-y-3"
              method="post"
              action="/api/inscricao/sala-de-guerra"
              onSubmit={handleSubmit}
              noValidate
              aria-busy={submitting}
            >
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor={`${formId}-website`}>Website</label>
                <input
                  id={`${formId}-website`}
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </div>

              <div>
                <label htmlFor={`${formId}-nome`} className="mb-1 block text-sm font-bold text-gray-300">
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
                  className="aula-input sala-input"
                  aria-invalid={Boolean(errors.nome)}
                  aria-describedby={errors.nome ? `${formId}-nome-error` : undefined}
                />
                <FieldError id={`${formId}-nome-error`} message={errors.nome} />
              </div>

              <div>
                <label htmlFor={`${formId}-whatsapp`} className="mb-1 block text-sm font-bold text-gray-300">
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
                    className={`aula-input sala-input pr-10 ${phoneValid ? 'border-green-500/70' : ''}`}
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
                <label htmlFor={`${formId}-email`} className="mb-1 block text-sm font-bold text-gray-300">
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
                  className="aula-input sala-input"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                />
                <FieldError id={`${formId}-email-error`} message={errors.email} />
              </div>

              <div>
                <label htmlFor={`${formId}-nicho`} className="mb-1 block text-sm font-bold text-gray-300">
                  Seu nicho: quem você prospecta?
                </label>
                <input
                  id={`${formId}-nicho`}
                  name="nicho"
                  type="text"
                  required
                  value={nicho}
                  onChange={(event) => setNicho(event.target.value)}
                  className="aula-input sala-input"
                  aria-invalid={Boolean(errors.nicho)}
                  aria-describedby={errors.nicho ? `${formId}-nicho-error` : undefined}
                />
                <FieldError id={`${formId}-nicho-error`} message={errors.nicho} />
              </div>

              <div>
                <label htmlFor={`${formId}-frase`} className="mb-1 block text-sm font-bold text-gray-300">
                  O que seus leads estão dizendo agora? Cola a frase literal.
                </label>
                <textarea
                  id={`${formId}-frase`}
                  name="fraseLead"
                  required
                  rows={2}
                  value={fraseLead}
                  onChange={(event) => setFraseLead(event.target.value)}
                  className="aula-input sala-input"
                  aria-invalid={Boolean(errors.fraseLead)}
                  aria-describedby={errors.fraseLead ? `${formId}-frase-error` : undefined}
                />
                <FieldError id={`${formId}-frase-error`} message={errors.fraseLead} />
              </div>

              <div>
                <label htmlFor={`${formId}-trava`} className="mb-1 block text-sm font-bold text-gray-300">
                  Sua maior trava hoje
                </label>
                <select
                  id={`${formId}-trava`}
                  name="maiorTrava"
                  required
                  value={maiorTrava}
                  onChange={(event) => setMaiorTrava(event.target.value as SalaTrava | '')}
                  className="aula-input sala-input"
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
                <label htmlFor={`${formId}-consent`} className="flex items-start gap-3 text-left text-sm leading-snug text-gray-300">
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
                    Concordo em receber o acesso à Mundo Pódium e comunicações por WhatsApp e e-mail.{' '}
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
                  'Garantir minha vaga'
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

          <ul className="aula-panel mx-auto w-full max-w-md space-y-4 p-4 sm:p-5 lg:col-start-1 lg:row-start-2 lg:mx-0 lg:max-w-none">
            {SALA_PROMISES.map((promise, index) => (
              <li
                key={promise}
                className="flex items-start gap-3 text-left text-sm leading-snug text-gray-200 sm:text-base"
              >
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-xs font-black text-gray-900"
                >
                  {index + 1}
                </span>
                {promise}
              </li>
            ))}
          </ul>
        </main>

        <div className="mx-auto w-full max-w-6xl space-y-14 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <section className="mx-auto max-w-3xl space-y-4 text-center lg:text-left" aria-labelledby="sala-plataforma">
            <h2 id="sala-plataforma" className="text-2xl font-bold leading-tight text-white sm:text-3xl">
              O que é a plataforma Mundo Pódium
            </h2>
            <p className="text-base leading-relaxed text-gray-300">
              A Mundo Pódium é uma plataforma de desenvolvimento comercial para quem vive de gerar oportunidades, ligar, negociar e fechar contrato. É onde o Rômulo Freitas ensina cold call e prospecção ativa com ligação real, ao vivo, sem corte. Quem entra é chamado de Piloto.
            </p>
          </section>

          <section className="mx-auto max-w-3xl space-y-5" aria-labelledby="sala-como">
            <h2 id="sala-como" className="text-center text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-left">
              Como funciona
            </h2>
            <ol className="space-y-4">
              {HOW_STEPS.map((step, index) => (
                <li key={step} className="flex items-start gap-3 text-left text-base leading-relaxed text-gray-200">
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-xs font-black text-gray-900"
                  >
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-5" aria-labelledby="sala-acessa">
            <h2 id="sala-acessa" className="text-center text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-left">
              O que você acessa ao criar sua conta
            </h2>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {ACCESS_CARDS.map((card) => (
                <li key={card.title} className="aula-panel p-5 text-left">
                  <h3 className="text-base font-bold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">{card.text}</p>
                </li>
              ))}
            </ul>
            <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-gray-300 lg:mx-0 lg:text-left">
              Quando quiser acelerar, dá pra desbloquear a experiência completa: treinamentos, mentorias, Sala de Ligação e revisões.
            </p>
          </section>

          <section className="mx-auto max-w-3xl space-y-5" aria-labelledby="sala-faq">
            <h2 id="sala-faq" className="text-center text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-left">
              Perguntas rápidas
            </h2>
            <FaqList />
          </section>

          <div className="mx-auto max-w-md">
            <button type="button" className="aula-cta" onClick={scrollToForm}>
              Garantir minha vaga
            </button>
          </div>
        </div>
      </>
      )}

      <footer className="mt-auto flex flex-col items-center gap-2 border-t border-yellow-400/20 px-4 py-5 text-center sm:flex-row sm:justify-center sm:gap-4">
        <Image
          src="/logos-mundo-podium/logo_horizontal_claro.png"
          alt="Mundo Pódium"
          width={120}
          height={28}
          className="h-6 w-auto"
        />
        <p className="text-xs leading-relaxed text-gray-400">
          Mundo Pódium LTDA · CNPJ 68.349.974/0001-19 · Belo Horizonte, MG
        </p>
      </footer>
    </div>
  );
}
