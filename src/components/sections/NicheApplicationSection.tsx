'use client';

import React, { useEffect, useRef } from 'react';
import { Briefcase, TrendingUp, CheckCircle2 } from 'lucide-react';

export const NicheApplicationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sectionRef}
      id="aplicacao-nicho" 
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400/20 to-green-500/10 border border-green-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-green-400/20 hover:shadow-green-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <Briefcase className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-green-400 font-semibold text-xs tracking-wide drop-shadow-sm">Exemplo de Aplicação no Seu Nicho</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Como o método se adapta ao{' '}
            <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">seu nicho</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            A estrutura é universal, mas você adapta linguagem, oferta e ICP para o seu mercado específico.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Bloco A: Para Serviços */}
          <div className="bg-gray-800/40 border border-green-400/30 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl hover:border-green-400/50 hover:shadow-green-400/20 transition-all duration-500 animate-fade-in-up" style={{transitionDelay: '0.3s'}}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-400/10 border border-green-400/30 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Para Quem Trabalha com Serviços</h3>
            </div>
            
            <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
              Freelancers, tráfego pago, social media, agência, consultoria...
            </p>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  <strong className="text-white">Linguagem:</strong> Você ajusta o tom e vocabulário para o seu ICP específico
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  <strong className="text-white">Oferta:</strong> O script se adapta à sua proposta de valor única
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  <strong className="text-white">ICP:</strong> A estrutura funciona para qualquer perfil de decisor no seu nicho
                </p>
              </div>
            </div>
          </div>

          {/* Bloco B: Para Investimentos */}
          <div className="bg-gray-800/40 border border-blue-400/30 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl hover:border-blue-400/50 hover:shadow-blue-400/20 transition-all duration-500 animate-fade-in-up" style={{transitionDelay: '0.4s'}}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-400/10 border border-blue-400/30 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Para Quem Trabalha com Investimentos</h3>
            </div>
            
            <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
              Assessores, agentes autônomos, AAIs...
            </p>

            <div className="space-y-3 mb-4">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  <strong className="text-white">Gera curiosidade sem promessas:</strong> O script evita promessas financeiras e foca em educação
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  <strong className="text-white">Respeita regulações:</strong> Linguagem adequada para mercados regulamentados
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <p className="text-blue-400 font-semibold text-sm mb-2">Objeções comuns que você vai aprender a quebrar:</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400">•</span>
                  <span>'Já tenho assessor' → Como criar valor diferencial</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400">•</span>
                  <span>'Não tenho tempo' → Como gerar urgência e interesse</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400">•</span>
                  <span>'Me manda no WhatsApp' → Como manter a conversa no telefone</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};










