'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/metaPixel';
import { useModalContext } from '@/contexts/ModalContext';
import { WORKSHOP_WHATSAPP } from '@/lib/constants';

export const FloatingWhatsAppButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const { isModalOpen } = useModalContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterInView(entry.isIntersecting);
      },
      { root: null, threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    trackWhatsAppClick('Floating WhatsApp Button', 'Workshop DM CTA');
  };

  const shouldShow = isVisible && !isModalOpen && !footerInView;

  return (
    <a
      href={WORKSHOP_WHATSAPP.dmUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`
        fixed bottom-24 right-3 sm:bottom-6 sm:right-6 z-[80]
        group flex items-center justify-center gap-2 sm:gap-3
        h-12 w-12 sm:h-auto sm:w-auto
        sm:px-5 sm:py-4
        bg-gradient-to-r from-green-500 to-green-600
        text-white font-bold text-base
        rounded-full shadow-2xl
        hover:from-green-600 hover:to-green-700
        hover:shadow-green-500/50
        hover:scale-105
        transition-all duration-300
        ${shouldShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      aria-label="Entrar na Comunidade Gratuita de Vendas no WhatsApp"
      title="Comunidade Gratuita de Vendas"
    >
      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
      <span className="whitespace-nowrap hidden sm:inline">
        Comunidade Gratuita de Vendas
      </span>
    </a>
  );
};
