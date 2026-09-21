'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import type { Aula } from '@/content/aulas';
import { getAulaQuandoLabel, isAulaEncerrada } from '@/content/aulas';
import { maskBrazilianWhatsApp, validateBrazilianWhatsApp, validateFullName } from '@/lib/phone';

type FieldErrors = Partial<Record<'nome' | 'whatsapp' | 'email' | 'consentimento' | 'form', string>>;

export function AulaSignupCard({ aula }: { aula: Aula }) {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [consentimento, setConsentimento] = useState(false);
  const [website, setWebsite] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [closed, setClosed] = useState(() => isAulaEncerrada(aula));

  useEffect(() => {
    if (closed) return undefined;
    const id = window.setInterval(() => {
      if (isAulaEncerrada(aula)) {
        setClosed(true);
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [aula, closed]);

  const validateClient = (): FieldErrors => {
    const next: FieldErrors = {};
    const nameCheck = validateFullName(nome);
    if (!nameCheck.ok) next.nome = nameCheck.error;
    const phoneCheck = validateBrazilianWhatsApp(whatsapp);
    if (!phoneCheck.ok) next.whatsapp = phoneCheck.error;
    if (!email.trim()) {
      next.email = 'Informe um e-mail para receber a confirmação.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'E-mail inválido.';
    }
    if (!consentimento) next.consentimento = 'Autorize o contato pelo WhatsApp.';
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateClient();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/inscricao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          whatsapp,
          email: email.trim(),
          slug: aula.slug,
          consentimento,
          website,
        }),
      });

      if (response.status === 400) {
        const data = (await response.json()) as { fieldErrors?: FieldErrors; error?: string };
        setErrors(data.fieldErrors ?? { form: data.error || 'Dados inválidos.' });
        setSubmitting(false);
        return;
      }

      if (response.status === 429) {
        setErrors({ form: 'Muitas tentativas. Espere um minuto e tente de novo.' });
        setSubmitting(false);
        return;
      }

      const data = (await response.json().catch(() => null)) as { redirectTo?: string } | null;
      const dest = data?.redirectTo || `/aula/${aula.slug}/obrigado`;
      router.push(dest.includes('?') ? `${dest}&inscrito=1` : `${dest}?inscrito=1`);
    } catch {
      router.push(`/aula/${aula.slug}/obrigado?inscrito=1`);
    }
  };

  const phoneValid = validateBrazilianWhatsApp(whatsapp).ok;

  if (closed) {
    return (
      <div id="cadastro" className="aula-panel border-yellow-400/50 p-4 shadow-lg shadow-yellow-500/10 sm:p-8 lg:border-yellow-400/30">
        <h2 className="text-2xl font-bold text-white">{aula.form.closedTitle}</h2>
        <a
          href={aula.linkComunidade}
          target="_blank"
          rel="noopener noreferrer"
          className="aula-cta mt-6"
        >
          {aula.form.closedCta}
        </a>
      </div>
    );
  }

  return (
    <div id="cadastro" className="aula-panel border-yellow-400/50 p-4 shadow-lg shadow-yellow-500/10 sm:p-8 lg:border-yellow-400/30">
      <p className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-yellow-400">
        {getAulaQuandoLabel(aula)} · ao vivo
      </p>
      <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{aula.form.title}</h2>
      <p className="mt-2 text-sm text-gray-400">1h30 no Meet. Grátis. Sem cartão. Sem gravação.</p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="aula-website">Website</label>
          <input
            id="aula-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="aula-nome" className="mb-1.5 block text-sm font-bold text-gray-300">
            {aula.form.nomeLabel}
          </label>
          <input
            id="aula-nome"
            name="nome"
            autoComplete="name"
            required
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            className="aula-input"
            aria-invalid={Boolean(errors.nome)}
            aria-describedby={errors.nome ? 'aula-nome-error' : undefined}
          />
          {errors.nome ? (
            <p id="aula-nome-error" className="mt-1 text-sm text-red-400">
              {errors.nome}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="aula-whatsapp" className="mb-1.5 block text-sm font-bold text-gray-300">
            {aula.form.whatsappLabel}
          </label>
          <div className="relative">
            <input
              id="aula-whatsapp"
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
              aria-describedby={errors.whatsapp ? 'aula-whatsapp-error' : undefined}
            />
            {phoneValid ? (
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-green-400" aria-hidden="true">
                ✓
              </span>
            ) : null}
          </div>
          {errors.whatsapp ? (
            <p id="aula-whatsapp-error" className="mt-1 text-sm text-red-400">
              {errors.whatsapp}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="aula-email" className="mb-1.5 block text-sm font-bold text-gray-300">
            {aula.form.emailLabel}
          </label>
          <input
            id="aula-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="aula-input"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'aula-email-error' : undefined}
          />
          {errors.email ? (
            <p id="aula-email-error" className="mt-1 text-sm text-red-400">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="aula-consent" className="flex items-start gap-3 text-sm text-gray-300">
            <input
              id="aula-consent"
              name="consentimento"
              type="checkbox"
              checked={consentimento}
              onChange={(event) => setConsentimento(event.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-yellow-400"
              aria-invalid={Boolean(errors.consentimento)}
            />
            <span>{aula.form.consentLabel}</span>
          </label>
          {errors.consentimento ? (
            <p className="mt-1 text-sm text-red-400">{errors.consentimento}</p>
          ) : null}
        </div>

        {errors.form ? <p className="text-sm text-red-400">{errors.form}</p> : null}

        <button type="submit" className="aula-cta" disabled={submitting}>
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <span className="aula-spin h-4 w-4 rounded-full border-2 border-gray-900/30 border-t-gray-900" />
              Enviando…
            </span>
          ) : (
            aula.form.submitLabel
          )}
        </button>
        <p className="text-xs leading-relaxed text-gray-500">{aula.form.microcopy}</p>
      </form>
    </div>
  );
}
