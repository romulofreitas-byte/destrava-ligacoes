'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import {
  PLATAFORMA_CASA_URL,
  WORKSHOP_INFO,
  WORKSHOP_MODULE_2_INFO,
} from '@/lib/constants';

export const SoldOutBanner: React.FC = () => {
  return (
    <div className="sticky top-0 z-50 bg-red-500/10 border-b border-red-500/30 backdrop-blur-sm">
      <div className="container-custom py-1.5 sm:py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 flex-shrink-0" />
          <span className="text-[10px] sm:text-xs text-red-300 sm:max-w-none">
            <span className="sm:hidden">Vagas encerradas — próxima turma em julho</span>
            <span className="hidden sm:inline">
              Vagas encerradas — próxima turma: módulo 1 em {WORKSHOP_INFO.dateDisplayLong},{' '}
              módulo 2 em {WORKSHOP_MODULE_2_INFO.dateDisplayLong}
            </span>
          </span>
        </div>
        <a
          href={PLATAFORMA_CASA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors flex-shrink-0"
        >
          Entrar na Plataforma
        </a>
      </div>
    </div>
  );
};
