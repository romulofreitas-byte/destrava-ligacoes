'use client';

import React, { useEffect, useRef } from 'react';
import { Zap, Users, Video, Mail, MessageCircle, Calendar, Check, X } from 'lucide-react';
import { markCheckoutTier, trackCTAClick, trackInitiateCheckout, trackViewContent } from '@/lib/metaPixel';
import { useModalContext } from '@/contexts/ModalContext';
import {
  WORKSHOP_INFO,
  WORKSHOP_SALES,
  WORKSHOP_CLOSED_COPY,
  WORKSHOP_LAST_CALL,
  WORKSHOP_CHECKOUT_SECTION_ID,
  WORKSHOP_OFFER,
  SHOW_UPGRADE_NOTE,
} from '@/lib/constants';
import { WorkshopCountdown } from '@/components/ui/WorkshopCountdown';

type OfferTier = typeof WORKSHOP_OFFER.entender | typeof WORKSHOP_OFFER.destravar;

function FeatureList({
  items,
  included,
}: {
  items: readonly string[];
  included: boolean;
}) {
  if (items.length === 0) return null;
  const Icon = included ? Check : X;
  return (
    <ul className="space-y-2 text-left">
      {items.map((item) => (
        <li key={`${included ? 'in' : 'out'}-${item}`} className="flex items-start gap-2 text-sm text-gray-200">
          <Icon
            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${included ? 'text-green-400' : 'text-gray-400'}`}
            aria-hidden
          />
          <span>
            <span className="text-gray-400">{included ? 'Inclui: ' : 'Não inclui: '}</span>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export const FinalCTAWorkshopSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);
  const { setCtaButtonClicked } = useModalContext();
  const salesOpen = WORKSHOP_SALES.isOpen;
  const { entender, destravar } = WORKSHOP_OFFER;

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

  const handleTierClick = (tier: OfferTier) => {
    if (salesOpen) {
      markCheckoutTier(tier.id);
      trackInitiateCheckout(tier.amountBRL, 'BRL', {
        contentId: tier.contentId,
        contentName: tier.contentName,
      });
    }
    trackCTAClick(
      salesOpen ? `Oferta ${tier.name}` : `Oferta ${tier.name} - vendas fechadas`,
      `oferta-${tier.id}`
    );
    setCtaButtonClicked(true);
  };

  const ctaClass = (dominant: boolean) =>
    dominant
      ? 'group relative w-full inline-flex items-center justify-center min-h-12 px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-black text-base sm:text-lg rounded-full hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/40 hover:scale-[1.02] button-shine-effect'
      : 'group relative w-full inline-flex items-center justify-center min-h-12 px-6 py-4 border-2 border-gray-500 text-white font-bold text-base rounded-full hover:border-yellow-400/70 hover:text-yellow-300 transition-all duration-300';

  const renderCta = (tier: OfferTier, dominant: boolean) => {
    if (!salesOpen) {
      return (
        <button
          type="button"
          disabled
          aria-disabled="true"
          className={`${ctaClass(dominant)} cursor-not-allowed opacity-80 hover:scale-100`}
        >
          {WORKSHOP_CLOSED_COPY.finalCta}
        </button>
      );
    }

    return (
      <a
        href={tier.checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleTierClick(tier)}
        className={ctaClass(dominant)}
      >
        {tier.cta}
      </a>
    );
  };

  return (
    <section
      ref={sectionRef}
      id={WORKSHOP_CHECKOUT_SECTION_ID}
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900 scroll-mt-4"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20">
              <Zap className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-yellow-400 font-semibold text-xs tracking-wide">
                {WORKSHOP_SALES.showSpotsProgress
                  ? `${WORKSHOP_SALES.edition}ª Edição — ${WORKSHOP_INFO.dateDisplayShort}`
                  : WORKSHOP_LAST_CALL.liveToday}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
              {WORKSHOP_OFFER.sectionTitle}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mb-6">{WORKSHOP_OFFER.sectionSubtitle}</p>
            <div className="flex justify-center">
              <WorkshopCountdown withDate />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <article className="order-1 lg:order-2 bg-gray-800/50 border-2 border-yellow-400/70 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-yellow-400/10 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-black rounded-full tracking-wide">
                  Recomendado
                </span>
              </div>
              <h3 className="text-white font-black text-2xl mt-2 mb-1">{destravar.name}</h3>
              <p className="text-gray-300 text-sm mb-4">{destravar.support}</p>
              <div className="mb-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-gray-500 line-through text-lg font-semibold">{destravar.anchor}</span>
                  <span className="text-yellow-400 font-black text-3xl">{destravar.priceLabel}</span>
                </div>
                <p className="text-green-400 text-xs font-semibold mt-1">{destravar.savingsLabel}</p>
              </div>
              <FeatureList items={destravar.includes} included />
              <div className="mt-4 flex items-center gap-2 p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-xl">
                <Users className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-yellow-400 font-semibold text-sm">
                  {WORKSHOP_SALES.showSpotsProgress
                    ? `${WORKSHOP_SALES.filledSpots} de ${WORKSHOP_SALES.maxSpots} vagas preenchidas`
                    : WORKSHOP_LAST_CALL.spotsLine}
                </span>
              </div>
              <div className="mt-2 mb-5 flex items-center gap-2 p-3 bg-gray-700/40 border border-gray-500/40 rounded-xl">
                <Video className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <span className="text-gray-300 font-semibold text-sm">Gravação na plataforma</span>
              </div>
              {renderCta(destravar, true)}
              <div className="mt-6 text-left rounded-2xl border border-gray-600/50 bg-gray-900/40 p-5">
                <h4 className="text-white font-bold text-base mb-3">O que acontece depois que você compra o Destravar</h4>
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
              <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                Você sai com a <span className="text-yellow-400 font-semibold">Anatomia da Ligação</span>,{' '}
                <span className="text-yellow-400 font-semibold">primeiras ligações feitas</span> e{' '}
                <span className="text-yellow-400 font-semibold">60 dias na Plataforma</span>. Nesta edição, quem entra leva também{' '}
                <a href="#grid-bonus" className="text-yellow-400 font-semibold hover:text-yellow-300 underline underline-offset-2">
                  acesso de fundador ao GRID
                </a>
                . {WORKSHOP_SALES.showSpotsProgress ? (
                  <>
                    Restam{' '}
                    <span className="text-white font-semibold">
                      {WORKSHOP_SALES.maxSpots - WORKSHOP_SALES.filledSpots} de {WORKSHOP_SALES.maxSpots}
                    </span>{' '}
                    vagas nesta turma.
                  </>
                ) : (
                  <span className="text-white font-semibold">{WORKSHOP_LAST_CALL.closingLine}</span>
                )}
              </p>
            </article>

            <article className="order-2 lg:order-1 bg-gray-800/30 border border-gray-600/70 rounded-3xl p-6 sm:p-8">
              <h3 className="text-white font-bold text-2xl mb-1">{entender.name}</h3>
              <p className="text-gray-300 text-sm mb-4">{entender.support}</p>
              <p className="text-white font-black text-3xl mb-5">{entender.priceLabel}</p>
              <div className="space-y-4 mb-5">
                <FeatureList items={entender.includes} included />
                <FeatureList items={entender.excludes} included={false} />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{entender.deliveryLine}</p>
              {renderCta(entender, false)}
            </article>
          </div>

          <p className="mt-8 text-center text-gray-200 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            {WORKSHOP_OFFER.decisionLine}
          </p>

          {SHOW_UPGRADE_NOTE && (
            <p className="mt-4 text-center text-yellow-200/90 text-sm leading-relaxed max-w-3xl mx-auto">
              {WORKSHOP_OFFER.upgradeNote}
            </p>
          )}

          <div className="mt-8 text-center">
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
        </div>
      </div>
    </section>
  );
};
