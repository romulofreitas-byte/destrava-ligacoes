'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Calendar,
  CalendarDays,
  Check,
  MessageCircle,
  MessageSquare,
  MonitorPlay,
  Phone,
  PhoneCall,
  RotateCcw,
  Users,
  Video,
  X,
  type LucideIcon,
} from 'lucide-react';
import { ProtectedImage } from '@/components/ui/ProtectedImage';
import { HeroProofVideoSlot } from '@/components/ui/HeroProofVideoSlot';
import { AboutRomuloWorkshopSection } from '@/components/sections/AboutRomuloWorkshopSection';
import { PlataformaMundoPodiumSection } from '@/components/sections/PlataformaMundoPodiumSection';
import { TestimonialsVideoSection } from '@/components/sections/TestimonialsVideoSection';
import { WorkshopFullTestimonialsSection } from '@/components/sections/WorkshopFullTestimonialsSection';
import { WorkshopTestimonialBanner } from '@/components/sections/WorkshopTestimonialBanner';
import { trackViewContent } from '@/lib/metaPixel';
import type { OfertaCorretores } from '@/lib/workshop-corretores-estado';
import {
  CORRETORES_AVISO_REGRAS,
  CORRETORES_DORES,
  CORRETORES_FAQ,
  CORRETORES_LEVA,
  CORRETORES_NAO_E,
  CORRETORES_OFERTA_ITENS,
  CORRETORES_PARA_QUEM,
  CORRETORES_PROGRAMA,
} from '@/content/workshop-corretores';
import { CorretoresCta, CorretoresPreco, CorretoresPrecoHero } from '@/components/corretores/CorretoresPreco';
import { CorretoresGarantia } from '@/components/corretores/CorretoresGarantia';
import { CorretoresFooter } from '@/components/corretores/CorretoresFooter';
import { CorretoresBarraFixa } from '@/components/corretores/CorretoresBarraFixa';

const AUDIO_URL = process.env.NEXT_PUBLIC_WDL_AUDIO_URL?.trim() ?? '';

const LEVA_ICONES: LucideIcon[] = [PhoneCall, CalendarDays, MessageCircle, RotateCcw, Users];

const FAIXA_AMARELA: { icon: LucideIcon; texto: string }[] = [
  { icon: Video, texto: '2 encontros ao vivo' },
  { icon: Phone, texto: '5 ligações reais' },
  { icon: MonitorPlay, texto: 'Gravação na plataforma' },
  { icon: Users, texto: 'Saúde, seguros e consórcio' },
  { icon: PhoneCall, texto: 'Treino com a sua lista' },
  { icon: CalendarDays, texto: '90 dias na plataforma' },
];

const DORES_ICONES: LucideIcon[] = [MessageSquare, MessageCircle, Phone];

function CorretoresFaixaAmarela() {
  const itens = [...FAIXA_AMARELA, ...FAIXA_AMARELA];

  return (
    <div
      className="overflow-hidden bg-yellow-400 py-4 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
      aria-hidden
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes corretores-faixa {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .corretores-faixa {
            animation: corretores-faixa 36s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .corretores-faixa { animation: none; }
          }
        `,
        }}
      />
      <div className="corretores-faixa flex w-max whitespace-nowrap">
        {itens.map((item, index) => {
          const Icone = item.icon;
          return (
            <div key={`${item.texto}-${index}`} className="mx-8 inline-flex items-center">
              <Icone className="mr-3 h-5 w-5 shrink-0 text-gray-900" />
              <span className="whitespace-nowrap text-sm font-semibold text-gray-900">{item.texto}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Fold({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative overflow-hidden py-16 md:py-20 bg-gray-900 ${className}`}>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-16 right-8 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl animate-float" />
        <div
          className="absolute bottom-10 left-8 h-64 w-64 rounded-full bg-yellow-400/5 blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
      </div>
      <div className="container-custom relative z-10 animate-fade-in-up">{children}</div>
    </section>
  );
}

function Eyebrow({ children, icon: Icon }: { children: React.ReactNode; icon?: LucideIcon }) {
  return (
    <div className="mb-5 inline-flex items-center rounded-full border border-yellow-400/30 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 px-4 py-2 shadow-lg shadow-yellow-400/20 backdrop-blur-md">
      {Icon ? <Icon className="mr-2 h-4 w-4 text-yellow-400" aria-hidden /> : null}
      <span className="text-xs font-semibold tracking-wide text-yellow-400">{children}</span>
    </div>
  );
}

function CorretoresFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Fold id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <Eyebrow>Perguntas frequentes</Eyebrow>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
            Antes de <span className="text-yellow-400">entrar</span>
          </h2>
        </div>
        <div className="space-y-3">
          {CORRETORES_FAQ.map((item, index) => {
            const aberto = openIndex === index;
            return (
              <div
                key={item.pergunta}
                className="overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/40 shadow-lg transition-all duration-300 hover:border-yellow-400/40 hover:shadow-yellow-400/10"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(aberto ? -1 : index)}
                  className="w-full min-h-11 text-left px-5 py-4 flex items-center justify-between gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-400"
                  aria-expanded={aberto}
                >
                  <span className="text-white font-semibold text-sm sm:text-base">{item.pergunta}</span>
                  <span className={`text-yellow-400 text-xl leading-none ${aberto ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {aberto && (
                  <p className="px-5 pb-5 text-gray-300 text-sm leading-relaxed">{item.resposta}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Fold>
  );
}

function CorretoresAudio() {
  if (!AUDIO_URL) return null;

  return (
    <figure className="mt-6 rounded-2xl border border-gray-700/50 bg-gray-800/40 p-5">
      <figcaption className="text-white font-semibold text-sm sm:text-base mb-3">
        Ouça 30 segundos de uma ligação real em que o cliente desliga.
      </figcaption>
      <audio className="w-full" controls preload="none" src={AUDIO_URL} />
    </figure>
  );
}

function CorretoresPrograma() {
  const [abertos, setAbertos] = useState<Record<number, boolean>>({});

  return (
    <Fold>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-8">
          Como funciona
        </h2>
        <ol className="relative">
          {CORRETORES_PROGRAMA.map((bloco, index) => {
            const aberto = Boolean(abertos[index]);
            const visiveis = aberto ? bloco.itens : bloco.itens.slice(0, 4);
            const temMais = bloco.itens.length > 4;
            const ultimo = index === CORRETORES_PROGRAMA.length - 1;
            return (
              <li key={bloco.quando} className={`relative pl-10 ${ultimo ? '' : 'pb-6'}`}>
                {ultimo ? null : (
                  <span className="absolute bottom-0 left-[9px] top-6 w-0.5 bg-gradient-to-b from-yellow-400/70 to-yellow-400/20" aria-hidden />
                )}
                <span
                  className="absolute left-0 top-6 h-5 w-5 rounded-full border-4 border-gray-900 bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg"
                  aria-hidden
                />
                <article className="rounded-2xl border border-gray-700/50 bg-gray-800/40 p-5 shadow-lg transition-all duration-500 hover:scale-[1.02] hover:border-yellow-400/70 hover:shadow-yellow-400/10">
                  <h3 className="font-bold text-yellow-400">{bloco.quando}</h3>
                  {bloco.destaque ? (
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-white">{bloco.destaque}</p>
                  ) : null}
                  <ul className="mt-3 space-y-2">
                    {visiveis.map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-[#CDCDD2]">
                        {item}
                      </li>
                    ))}
                  </ul>
                  {temMais ? (
                    <button
                      type="button"
                      className="mt-2 min-h-11 text-sm font-semibold text-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
                      aria-expanded={aberto}
                      onClick={() => setAbertos((atual) => ({ ...atual, [index]: !aberto }))}
                    >
                      {aberto ? 'Ver menos' : 'Ver tudo'}
                    </button>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ol>
        <p className="mt-8 inline-flex rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300">
          Os encontros ficam gravados na plataforma.
        </p>
        <p className="mt-4 text-[#CDCDD2] text-sm leading-relaxed">
          Com a turma cheia, nem todo mundo liga ao vivo. Quem avalia também treina, e todo mundo
          liga na tarefa de terça.
        </p>
      </div>
    </Fold>
  );
}

export function CorretoresPage({ oferta }: { oferta: OfertaCorretores }) {
  const tracked = useRef(false);
  const barraAtiva =
    oferta.estado !== 'encerrada' && oferta.ctaEnabled && Boolean(oferta.precoLabel);

  useEffect(() => {
    const send = () => {
      if (tracked.current) return;
      trackViewContent('Workshop Corretores', 'workshop-corretores', {
        contentId: 'workshop-corretores',
        wait: true,
      });
      tracked.current = true;
    };
    send();
    const onConsent = () => {
      tracked.current = false;
      send();
    };
    window.addEventListener('cookieConsentChange', onConsent);
    return () => window.removeEventListener('cookieConsentChange', onConsent);
  }, []);

  const subtituloFinal =
    oferta.estado === 'encerrada' || !oferta.precoLabel
      ? oferta.rotulo
      : `${oferta.rotulo}. ${oferta.precoLabel}.`;

  return (
    <main className={`min-h-screen bg-gray-900 overflow-x-hidden ${barraAtiva ? 'pb-28 min-[769px]:pb-0' : ''}`}>
      <section id="topo" className="relative flex flex-col overflow-hidden bg-gray-900 lg:min-h-[100svh]">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-10 top-24 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl animate-float" />
          <div
            className="absolute bottom-24 right-10 h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl animate-float"
            style={{ animationDelay: '2s' }}
          />
        </div>
        <div className="relative z-10 border-b border-gray-800">
          <div className="container-custom flex items-center justify-between gap-3 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <div className="relative h-6 w-6 shrink-0">
                <ProtectedImage
                  src="/logos-mundo-podium/simbolo_cor.png"
                  alt="Mundo Pódium"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <span className="truncate text-xs font-light tracking-wide text-white sm:text-sm">
                Workshop Destrava Ligações
              </span>
            </div>
            <p
              className="flex shrink-0 items-center gap-1.5 text-right text-[10px] font-bold tabular-nums text-white sm:text-sm"
              style={{ fontFamily: 'var(--font-ubuntu), sans-serif' }}
            >
              <Calendar className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
              <span className="hidden sm:inline">09 de Novembro e 11 de Novembro · 13h</span>
              <span className="sm:hidden">09/11 e 11/11 · 13h</span>
            </p>
          </div>
        </div>

        <div className="container-custom relative z-10 flex flex-1 items-center py-8 lg:py-10">
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="mb-5 inline-flex rounded-2xl border border-yellow-400/30 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 px-4 py-2 shadow-lg shadow-yellow-400/10">
                <span className="text-xs font-semibold leading-snug text-yellow-400">
                  Corretores de plano de saúde, seguros e consórcio
                </span>
              </div>
              <h1 className="max-w-full text-[1.7rem] font-bold leading-[1.08] tracking-tight text-white sm:text-4xl xl:text-[2.5rem]">
                <span className="block">Aprenda a ligar</span>
                <span className="mt-1 block bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent xl:whitespace-nowrap">
                  para quem não te conhece.
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base font-normal leading-relaxed text-white sm:text-lg">
                Para quem vende plano de saúde, seguros ou consórcio. Você sabe o produto. O que
                trava é a ligação.
              </p>
              <CorretoresPrecoHero oferta={oferta} />
            </div>
            <HeroProofVideoSlot />
          </div>
        </div>
        <div className="relative z-10 mt-auto">
          <CorretoresFaixaAmarela />
        </div>
      </section>

      <Fold>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-700/50 bg-gray-800/40 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-yellow-400/50 hover:shadow-yellow-400/20 sm:p-8">
            <h2 className="mb-5 text-xl font-bold text-white sm:text-2xl">É pra você</h2>
            <ul className="space-y-2">
              {CORRETORES_PARA_QUEM.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl px-2 py-1.5 text-sm leading-relaxed text-[#CDCDD2] transition-colors duration-300 hover:bg-yellow-400/10"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-700/50 bg-gray-800/40 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-yellow-400/50 hover:shadow-yellow-400/20 sm:p-8">
            <h2 className="mb-5 text-xl font-bold text-white sm:text-2xl">Não perde tempo</h2>
            <ul className="space-y-2">
              {CORRETORES_NAO_E.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl px-2 py-1.5 text-sm leading-relaxed text-[#CDCDD2] transition-colors duration-300 hover:bg-yellow-400/10"
                >
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-[#969EAE]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Fold>

      <Fold>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-8">
            Três falas que a ligação <span className="text-yellow-400">escuta direto</span>
          </h2>
          <div className="space-y-4">
            {CORRETORES_DORES.map((dor, index) => {
              const Icone = DORES_ICONES[index] ?? MessageCircle;
              return (
                <article
                  key={dor.fala}
                  className="rounded-2xl border border-gray-700/50 bg-gray-800/40 p-5 shadow-lg transition-all duration-500 hover:border-yellow-400/50 hover:shadow-yellow-400/15"
                >
                  <h3 className="mb-2 flex items-center gap-3 text-lg font-bold text-yellow-400">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400/15">
                      <Icone className="h-5 w-5" aria-hidden />
                    </span>
                    &ldquo;{dor.fala}&rdquo;
                  </h3>
                  <p className="pl-[3.25rem] text-sm leading-relaxed text-[#CDCDD2]">{dor.texto}</p>
                </article>
              );
            })}
          </div>
          <CorretoresAudio />
          <p className="mt-6 text-white font-semibold">Quem liga do mesmo jeito ouve o mesmo não.</p>
        </div>
      </Fold>

      <Fold>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-8">
            Depois dos dois encontros, você sabe:
          </h2>
          <ol className="space-y-4">
            {CORRETORES_LEVA.map((item, index) => {
              const Icone = LEVA_ICONES[index] ?? Check;
              return (
                <li
                  key={item.titulo}
                  className="rounded-2xl border border-gray-700/50 bg-gray-800/40 p-5 shadow-lg transition-all duration-500 hover:border-yellow-400/50 hover:shadow-yellow-400/15"
                >
                  <p className="flex items-start gap-3 text-white font-semibold text-sm sm:text-base">
                    <Icone className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" aria-hidden />
                    <span>{item.titulo}</span>
                  </p>
                  <p className="mt-2 pl-7 text-[#CDCDD2] text-sm leading-relaxed">{item.texto}</p>
                </li>
              );
            })}
          </ol>
          <div className="mt-8 rounded-2xl border-2 border-yellow-400/60 bg-gradient-to-br from-yellow-400/15 via-yellow-500/5 to-transparent p-6 shadow-2xl shadow-yellow-400/10 sm:p-8">
            <p className="text-lg font-semibold leading-relaxed text-white sm:text-xl">
              Não é teoria sobre vendas. É a ligação, do começo ao fim, treinada e corrigida.
            </p>
            {CORRETORES_AVISO_REGRAS ? (
              <p className="mt-4 text-sm leading-relaxed text-white sm:text-base">{CORRETORES_AVISO_REGRAS}</p>
            ) : null}
          </div>
        </div>
      </Fold>

      <CorretoresPrograma />
      <TestimonialsVideoSection />
      <WorkshopFullTestimonialsSection />
      <PlataformaMundoPodiumSection mostrarLinkCasa={false} />

      <AboutRomuloWorkshopSection />
      <WorkshopTestimonialBanner showEditionLine={false} />

      <Fold id="inscricao" className="scroll-mt-6">
        <div className="max-w-3xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_22rem] gap-8 items-start">
          <div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
              Entre na edição de 09 e 11 de novembro.
            </h2>
            <ul className="space-y-3">
              {CORRETORES_OFERTA_ITENS.map((item) => (
                <li
                  key={item.texto}
                  className={`flex gap-3 text-sm leading-relaxed ${
                    item.destaque ? 'text-white font-semibold' : 'text-[#CDCDD2]'
                  }`}
                >
                  <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                  <span>{item.texto}</span>
                </li>
              ))}
            </ul>
          </div>
          <CorretoresPreco oferta={oferta} mostrarUrgencia destaque />
        </div>
      </Fold>

      <CorretoresGarantia />
      <CorretoresFaq />

      <Fold>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            <span className="block">Ninguém liga por você.</span>
            <span className="block text-yellow-400">Liga você.</span>
          </h2>
          <p className="mt-4 text-[#CDCDD2] text-sm sm:text-base">{subtituloFinal}</p>
          <div className="mt-6 mx-auto w-full max-w-sm">
            <CorretoresCta oferta={oferta} />
          </div>
        </div>
      </Fold>

      <CorretoresFooter />
      <CorretoresBarraFixa oferta={oferta} />
    </main>
  );
}
