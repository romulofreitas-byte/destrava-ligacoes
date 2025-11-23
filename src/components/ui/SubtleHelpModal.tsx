'use client';

import React, { useState, useEffect } from 'react';
import { X, Youtube, MessageCircle } from 'lucide-react';
import { trackWhatsAppClick, trackCustomEvent } from '@/lib/metaPixel';

export const SubtleHelpModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Aparece após 45 segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 45000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleYouTubeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackCustomEvent('YouTubeClick', {
      content_name: 'Subtle Help Modal - YouTube',
      content_category: 'help-modal',
      content_type: 'youtube-link'
    });
  };

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackWhatsAppClick('Subtle Help Modal - WhatsApp', 'help-modal');
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div 
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[55] max-w-[320px] sm:max-w-[380px] w-full animate-slide-in-left"
    >
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-4 sm:p-5 backdrop-blur-sm">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1.5 hover:bg-gray-800 rounded-lg transition-colors duration-200 z-10"
          aria-label="Fechar"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-white" />
        </button>

        {/* Content */}
        <div className="space-y-3 sm:space-y-4 pr-6">
          {/* Title */}
          <h3 className="text-white font-bold text-sm sm:text-base leading-tight">
            Ainda com dúvidas?
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Veja mais ligações reais ou entre na nossa comunidade gratuita
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-2 sm:gap-2.5">
            {/* YouTube Button */}
            <a
              href="https://youtube.com/@combustivelmv"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleYouTubeClick}
              className="group relative flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-xs sm:text-sm rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/40 hover:scale-[1.02] cursor-pointer"
            >
              <Youtube className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Ver mais ligações no YouTube</span>
            </a>

            {/* WhatsApp Button with FREE badge */}
            <a
              href="https://chat.whatsapp.com/L4camOPOJMxDb8et6M80oN"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="group relative flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-xs sm:text-sm rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/40 hover:scale-[1.02] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="flex items-center gap-1.5">
                Acessar comunidade
                <span className="inline-flex items-center px-1.5 py-0.5 bg-yellow-400 text-gray-900 text-[10px] font-black rounded uppercase leading-none">
                  GRÁTIS
                </span>
              </span>
            </a>
          </div>

          {/* Free badge text */}
          <p className="text-yellow-400 text-[10px] sm:text-xs font-semibold text-center">
            100% Gratuita • Sem custos
          </p>
        </div>
      </div>
    </div>
  );
};

