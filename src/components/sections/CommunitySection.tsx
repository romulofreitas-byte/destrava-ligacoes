'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Users, MessageCircle, Lightbulb, Zap, CheckCircle } from 'lucide-react';
import { trackViewContent, trackCommunityJoin } from '@/lib/metaPixel';

export const CommunitySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);

  // Track section view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            trackViewContent('Community Section', 'community');
            hasTrackedView.current = true;
          }
        });
      },
      { threshold: 0.3 }
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleCommunityClick = () => {
    trackCommunityJoin();
  };

  const benefits = [
    {
      icon: Users,
      title: 'Networking',
      description: 'Conecte-se com outros profissionais e empresários'
    },
    {
      icon: Lightbulb,
      title: 'Dicas Exclusivas',
      description: 'Receba estratégias e conteúdos semanais'
    },
    {
      icon: MessageCircle,
      title: 'Suporte',
      description: 'Tire dúvidas e compartilhe experiências'
    },
    {
      icon: Zap,
      title: 'Conteúdos Gratuitos',
      description: 'Acesso a recursos e materiais exclusivos'
    }
  ];

  return (
    <section ref={sectionRef} id="comunidade-podium" className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-400/8 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400/20 to-green-500/10 border border-green-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-green-400/20 hover:shadow-green-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <MessageCircle className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-green-400 font-semibold text-xs tracking-wide drop-shadow-sm">Comunidade Gratuita</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Junte-se à{' '}
            <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent drop-shadow-md animate-shimmer bg-[length:200%_auto]">Comunidade Pódium</span>
          </h2>

          {/* Subheadline */}
          <p className="text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Conecte-se com outros pilotos e receba conteúdos exclusivos gratuitamente no WhatsApp
          </p>

          {/* Sold-out notice */}
          <p className="text-sm text-red-300 mt-3 animate-fade-in-up" style={{animationDelay: '0.35s'}}>
            Perdeu a Promo BF da 1ª turma? Entre na comunidade para ser avisado das próximas.
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-4xl mx-auto animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="relative bg-gray-800/40 border-2 border-green-400/30 rounded-3xl p-8 md:p-12 backdrop-blur-xl overflow-hidden group hover:border-green-400/50 hover:shadow-2xl hover:shadow-green-400/20 transition-all duration-500 cursor-pointer">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 via-green-400/5 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/20 via-transparent to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>

            <div className="relative z-10">
              <div className="text-center mb-10">
                {/* WhatsApp Icon */}
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400/20 to-green-500/10 border-2 border-green-400/30 rounded-3xl mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-green-400/30">
                  <MessageCircle className="w-12 h-12 text-green-400 animate-pulse" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                  Comunidade Pódium no WhatsApp
                </h3>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Acesse uma comunidade ativa de profissionais compartilhando experiências, dicas e estratégias de vendas
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all duration-300 group-hover:scale-105"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400/20 to-green-500/10 border border-green-400/30 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white mb-1">{benefit.title}</h4>
                        <p className="text-sm text-gray-300 leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <a
                  href="https://chat.whatsapp.com/L4camOPOJMxDb8et6M80oN"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCommunityClick}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-2xl shadow-green-400/30 hover:shadow-green-400/50 hover:scale-105"
                >
                  <MessageCircle className="w-6 h-6 mr-3" />
                  <span>Entrar na Comunidade Gratuita</span>
                </a>
                <p className="text-gray-400 text-sm mt-3 sm:mt-4">
                  100% gratuito • 100% exclusivo
                </p>
                <p className="text-gray-400 text-[11px] sm:text-xs mt-2">
                  Preferir lista de espera?{' '}
                  <a
                    href="https://forms.gle/G3uCBJChkXk65K8i9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 underline hover:text-red-300"
                  >
                    Entrar na Lista de Espera
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <p className="text-gray-400 text-sm">
            <CheckCircle className="w-4 h-4 inline mr-2 text-green-400" />
            Centenas de profissionais já fazem parte da nossa comunidade
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

