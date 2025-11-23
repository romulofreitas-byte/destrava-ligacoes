'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/metaPixel';
import { useModalContext } from '@/contexts/ModalContext';

export const FloatingWhatsAppButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  // Usar contexto com fallback seguro - retorna false se não estiver disponível
  const { isModalOpen } = useModalContext();

  useEffect(() => {
    // Animar entrada após montagem
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    trackWhatsAppClick('Floating WhatsApp Button', 'Community CTA');
  };

  // Esconder quando o modal estiver aberto (apenas se contexto disponível)
  const shouldShow = isVisible && !isModalOpen;

  return (
    <a
      href="https://chat.whatsapp.com/L4camOPOJMxDb8et6M80oN"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`
        fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60]
        group flex items-center gap-2 sm:gap-3
        px-4 py-3 sm:px-5 sm:py-4
        bg-gradient-to-r from-green-500 to-green-600
        text-white font-bold text-xs sm:text-base
        rounded-full shadow-2xl
        hover:from-green-600 hover:to-green-700
        hover:shadow-green-500/50
        hover:scale-105
        transition-all duration-300
        ${shouldShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none hidden'}
      `}
      aria-label="Entrar na Comunidade Gratuita de Vendas no WhatsApp"
    >
      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
      <span className="whitespace-nowrap hidden sm:inline">
        Comunidade Gratuita de Vendas
      </span>
      <span className="whitespace-nowrap sm:hidden">
        Comunidade Gratuita
      </span>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </a>
  );
};

