'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { trackCTAClick } from '@/lib/metaPixel';
import {
  PLATAFORMA_CASA_URL,
  WORKSHOP_INFO,
  WORKSHOP_MODULE_2_INFO,
  WORKSHOP_PLATFORM_RULES,
} from '@/lib/constants';

const STORAGE_KEY = 'workshop-closed-modal-dismissed';

export const WorkshopClosedModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
  };

  const handlePlatformClick = () => {
    trackCTAClick('Workshop Closed Modal - Plataforma', 'workshop-closed-modal');
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[90] max-w-[320px] sm:max-w-[380px] w-full animate-slide-in-left">
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-4 sm:p-5 backdrop-blur-sm">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1.5 hover:bg-gray-800 rounded-lg transition-colors duration-200 z-10"
          aria-label="Fechar"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-white" />
        </button>

        <div className="space-y-3 sm:space-y-4 pr-6">
          <h3 className="text-white font-bold text-sm sm:text-base leading-tight">
            Vagas encerradas
          </h3>

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            A próxima turma será em julho — módulo 1 em {WORKSHOP_INFO.dateDisplayLong},
            módulo 2 em {WORKSHOP_MODULE_2_INFO.dateDisplayLong}. Enquanto isso, treine cold
            call ao vivo na Plataforma Mundo Pódium: Sala de Ligação, mentorias 2x por semana
            e comunidade no Circle.
          </p>

          <a
            href={PLATAFORMA_CASA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handlePlatformClick}
            className="group relative flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-xs sm:text-sm rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/40 hover:scale-[1.02] cursor-pointer"
          >
            <span>
              Entrar na Plataforma — {WORKSHOP_PLATFORM_RULES.platformPublicPriceLabel}/mês
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
