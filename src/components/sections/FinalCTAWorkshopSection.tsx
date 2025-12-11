'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Zap, Clock, Users, Key } from 'lucide-react';
import { trackCTAClick, trackViewContent } from '@/lib/metaPixel';
import { useModalContext } from '@/contexts/ModalContext';

export const FinalCTAWorkshopSection: React.FC = () => {
  const [progressWidth, setProgressWidth] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);
  // Usar contexto com fallback seguro - retorna função vazia se não estiver disponível
  const { setCtaButtonClicked } = useModalContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth(6); // 6% preenchido
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackCTAClick('Final CTA Workshop - Garantir Vaga', 'final-cta');
    
    // Atualizar contexto para indicar que o botão foi clicado (apenas se contexto disponível)
    setCtaButtonClicked(true);
    
    // The button links to external payment page, so we don't prevent default
    // Just ensure tracking works correctly
  };

  return (
    <section 
      ref={sectionRef}
      id="inscricao" 
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800/40 border-2 border-green-400/50 rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-sm shadow-2xl hover:shadow-green-400/30 transition-all duration-300 relative overflow-hidden group">
            {/* Animated border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/20 via-transparent to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400/20 to-green-500/10 border border-green-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-green-400/20 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                <Zap className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-green-400 font-semibold text-xs tracking-wide">Última Chance</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                Garanta sua vaga{' '}
                <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">agora</span>
              </h2>

              <p className="text-sm text-green-400 font-medium mb-3 animate-fade-in-up" style={{animationDelay: '0.25s'}}>
                Investimento Estratégico: R$ 99,99 • 3 horas intensivas • Ferramentas Exclusivas
              </p>

              <p className="hidden sm:block text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-4 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                Este não é um workshop gratuito. É um investimento estratégico que garante entrega real, demonstração prática, construção ao vivo e <span className="text-yellow-400 font-semibold">ferramentas exclusivas</span> (Calculadoras de Ligações e Precificação). Vagas limitadas. Evento ao vivo, sem replay.
              </p>

              {/* Pricing Info */}
              <div className="mb-6 animate-fade-in-up" style={{animationDelay: '0.35s'}}>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-800/50 border border-yellow-400/30 rounded-xl">
                  <span className="text-gray-400 text-sm line-through">De R$ 297</span>
                  <span className="text-yellow-400 font-bold text-lg">R$ 99,99</span>
                </div>
                <p className="hidden sm:block text-gray-400 text-xs mt-2 max-w-md mx-auto">
                  Investimento estratégico para destravar sua prospecção e receber as <span className="text-yellow-400 font-semibold">ferramentas exclusivas</span>. Não é funil isca gratuito — é treinamento prático com entrega real. 3 horas que valem mais que cursos de 30 horas.
                </p>
              </div>

              {/* Urgency Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <div className="flex items-center justify-center space-x-2 p-3 bg-green-400/10 border border-green-400/30 rounded-xl">
                  <Users className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-semibold text-sm">Vagas Limitadas</span>
                </div>
                <div className="flex items-center justify-center space-x-2 p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-xl">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold text-sm">Sem Replay</span>
                </div>
                <div className="flex items-center justify-center space-x-2 p-3 bg-purple-400/10 border border-purple-400/30 rounded-xl">
                  <Key className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-semibold text-sm">Acesso Imediato</span>
                </div>
              </div>

              {/* Platform Access Benefit */}
              <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.45s'}}>
                <div className="bg-gradient-to-r from-purple-400/10 to-blue-400/10 border border-purple-400/30 rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <Key className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    <div className="text-center sm:text-left">
                      <p className="text-gray-300 text-sm sm:text-base">
                        <span className="text-purple-400 font-semibold">Acesso imediato</span> à plataforma Mundo Pódium — o ecossistema oficial do Método Pódium
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm mt-1">
                        Seções exclusivas • Gravação do workshop • Acesso até 7 dias • Cupom promocional
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mb-6 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                <a
                  href="https://plataforma.mundopodium.com.br/checkout/workshop-destrava-ligacoes"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCTAClick}
                  className="group relative w-full max-w-md mx-auto inline-flex items-center justify-center px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-black text-lg sm:text-xl rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-2xl hover:shadow-green-500/40 hover:scale-105 button-shine-effect"
                  title="Checkout Mundo Pódium"
                >
                  <span className="relative drop-shadow-sm scale-[0.8] sm:scale-100">
                    Garantir vaga por R$ 99,99
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-300">Vagas preenchidas</span>
                  <span className="text-green-400 font-semibold animate-pulse">6%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden relative shadow-inner">
                  {/* Filled portion */}
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg transition-all duration-1000" style={{width: `${progressWidth}%`}}></div>
                  {/* Continuous flow animation */}
                  <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-green-300/40 to-transparent animate-progress-flow"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

