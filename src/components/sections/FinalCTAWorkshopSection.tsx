'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Zap, Clock, Users, Video, AlertTriangle, Mail, MessageCircle, Calendar } from 'lucide-react';
import { trackCTAClick, trackViewContent } from '@/lib/metaPixel';
import { useModalContext } from '@/contexts/ModalContext';
import {
  WORKSHOP_INFO,
  PLATAFORMA_CASA_URL,
  WORKSHOP_SALES,
  WORKSHOP_PRICING,
  WORKSHOP_CLOSED_COPY,
} from '@/lib/constants';
import { WorkshopCountdown } from '@/components/ui/WorkshopCountdown';

const CHECKOUT_URL = 'https://pag.ae/81MRtAvM5';

export const FinalCTAWorkshopSection: React.FC = () => {
  const [progressWidth, setProgressWidth] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);
  const { setCtaButtonClicked } = useModalContext();
  const salesOpen = WORKSHOP_SALES.isOpen;

  useEffect(() => {
    if (!salesOpen) return;

    const timer = setTimeout(() => {
      setProgressWidth(WORKSHOP_SALES.progressPercent);
    }, 100);

    return () => clearTimeout(timer);
  }, [salesOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView.current) {
          trackViewContent('Final CTA Workshop Section', 'final-cta');
          hasTrackedView.current = true;
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCTAClick = () => {
    trackCTAClick(
      salesOpen ? 'Final CTA Workshop - Garantir Vaga' : 'Final CTA Workshop - Plataforma',
      'final-cta'
    );
    setCtaButtonClicked(true);
  };

  const cardBorderClass = salesOpen
    ? 'border-2 border-yellow-400/50 hover:shadow-yellow-400/30'
    : 'border-2 border-yellow-400/40 hover:shadow-yellow-400/20';

  const ctaButtonClass =
    'group relative w-full max-w-md mx-auto inline-flex items-center justify-center px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-black text-lg sm:text-xl rounded-full hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/40 hover:scale-105 button-shine-effect';

  return (
    <section
      ref={sectionRef}
      id="inscricao"
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto">
          <div
            className={`bg-gray-800/40 ${cardBorderClass} rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-sm shadow-2xl transition-all duration-300 relative overflow-hidden group`}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 text-center">
              {salesOpen ? (
                <>
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20">
                    <Zap className="w-4 h-4 text-yellow-400 mr-2" />
                    <span className="text-yellow-400 font-semibold text-xs tracking-wide">
                      {WORKSHOP_SALES.edition}ª Edição — Vagas Abertas — {WORKSHOP_INFO.dateDisplayShort}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                    Garanta sua vaga na{' '}
                    <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                      {WORKSHOP_SALES.edition}ª edição
                    </span>
                  </h2>

                  <p className="text-sm text-gray-300 font-medium mb-4">
                    <span className="text-gray-500 line-through">De {WORKSHOP_PRICING.anchor}</span>{' '}
                    <span className="text-yellow-400">por {WORKSHOP_PRICING.current}</span>{' '}
                    <span className="text-gray-400">• 2 módulos • Entrega real</span>
                  </p>

                  <div className="mb-6">
                    <div className="inline-flex flex-col sm:flex-row sm:items-baseline sm:justify-center gap-1 sm:gap-4 px-5 py-3 bg-gray-800/50 border border-yellow-400/30 rounded-xl">
                      <div className="flex items-baseline justify-center gap-3">
                        <span className="text-gray-500 line-through text-lg sm:text-xl font-semibold">{WORKSHOP_PRICING.anchor}</span>
                        <span className="text-yellow-400 font-black text-2xl sm:text-3xl">{WORKSHOP_PRICING.current}</span>
                      </div>
                      <span className="text-center text-green-400 text-xs sm:text-sm font-semibold sm:self-center sm:pl-2 sm:border-l sm:border-gray-600">
                        {WORKSHOP_PRICING.savingsLabel}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6 flex justify-center">
                    <WorkshopCountdown withDate />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center justify-center space-x-2 p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-xl">
                      <Users className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold text-sm">
                        {WORKSHOP_SALES.filledSpots} de {WORKSHOP_SALES.maxSpots} vagas preenchidas
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 p-3 bg-gray-700/40 border border-gray-500/40 rounded-xl">
                      <Video className="w-5 h-5 text-gray-300" />
                      <span className="text-gray-300 font-semibold text-sm">Gravação na plataforma</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                    <span className="text-yellow-400 font-semibold text-xs tracking-wide">
                      {WORKSHOP_CLOSED_COPY.badgeEdition}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                    {WORKSHOP_CLOSED_COPY.finalHeadline}
                  </h2>

                  <p className="text-sm text-gray-300 font-medium mb-8 max-w-xl mx-auto">
                    {WORKSHOP_CLOSED_COPY.finalSubheadline}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center justify-center space-x-2 p-3 bg-gray-700/40 border border-gray-500/40 rounded-xl">
                      <Video className="w-5 h-5 text-gray-300" />
                      <span className="text-gray-300 font-semibold text-sm">Gravações disponíveis</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-xl">
                      <Clock className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold text-sm">Mentorias 2x por semana</span>
                    </div>
                  </div>
                </>
              )}

              <div className="mb-6">
                <a
                  href={salesOpen ? CHECKOUT_URL : PLATAFORMA_CASA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCTAClick}
                  className={ctaButtonClass}
                  title={salesOpen ? 'Pagar com PagBank' : 'Plataforma Mundo Pódium'}
                >
                  <span className="relative drop-shadow-sm scale-[0.8] sm:scale-100">
                    {salesOpen ? 'Garantir Minha Vaga Agora' : WORKSHOP_CLOSED_COPY.finalCta}
                  </span>
                </a>
              </div>

              {salesOpen && (
                <>
                  <div className="mb-6">
                    <p className="text-gray-400 text-xs mb-3">Formas de pagamento:</p>
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                      <div className="inline-flex items-center px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <span className="text-green-400 font-semibold text-xs">Pix</span>
                      </div>
                      <div className="inline-flex items-center px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <span className="text-yellow-400 font-semibold text-xs">Boleto</span>
                      </div>
                      <div className="inline-flex items-center px-3 py-1.5 bg-gray-700/50 border border-gray-500/40 rounded-lg">
                        <span className="text-gray-300 font-semibold text-xs">Cartão de Crédito</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-8">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-300">Vagas preenchidas</span>
                      <span className="text-yellow-400 font-semibold">
                        {WORKSHOP_SALES.filledSpots} de {WORKSHOP_SALES.maxSpots}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden relative shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full shadow-lg transition-all duration-1000"
                        style={{ width: `${progressWidth}%` }}
                      />
                    </div>
                    <p className="text-yellow-400/90 text-xs font-semibold">
                      Turma limitada a {WORKSHOP_SALES.maxSpots} participantes
                    </p>
                  </div>

                  {/* Pós-compra */}
                  <div className="mb-8 text-left rounded-2xl border border-gray-600/50 bg-gray-900/40 p-5 sm:p-6">
                    <h3 className="text-white font-bold text-base sm:text-lg mb-3 text-center sm:text-left">
                      O que acontece depois que você compra
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Você recebe <strong className="text-white">e-mail de confirmação</strong> com os próximos passos.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <MessageCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Entra na <strong className="text-white">comunidade no WhatsApp</strong> da turma para interagir antes do evento.
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300 text-sm leading-relaxed">
                          O <strong className="text-white">link de acesso</strong> ao workshop chega por e-mail e na comunidade alguns dias antes.
                        </p>
                      </li>
                    </ul>
                  </div>
                </>
              )}

              <div className="mt-2 pt-8 border-t border-gray-700/50">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {salesOpen ? (
                    <>
                      Você sai do Workshop com a <span className="text-yellow-400 font-semibold">Anatomia da Ligação</span>,{' '}
                      <span className="text-yellow-400 font-semibold">primeiras ligações feitas</span> e{' '}
                      <span className="text-yellow-400 font-semibold">60 dias na Plataforma</span> pra continuar.{' '}
                      Restam{' '}
                      <span className="text-white font-semibold">
                        {WORKSHOP_SALES.maxSpots - WORKSHOP_SALES.filledSpots} de {WORKSHOP_SALES.maxSpots}
                      </span>{' '}
                      vagas nesta turma.
                    </>
                  ) : (
                    <>
                      O workshop volta em breve. Enquanto isso,{' '}
                      <span className="text-yellow-400 font-semibold">
                        você pode treinar ligações reais na Plataforma Mundo Pódium.
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
