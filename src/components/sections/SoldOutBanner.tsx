'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const SoldOutBanner: React.FC = () => {
  return (
    <div className="sticky top-0 z-50 bg-red-500/10 border-b border-red-500/30 backdrop-blur-sm">
      <div className="container-custom py-1.5 sm:py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 flex-shrink-0" />
          <span className="text-[10px] sm:text-xs text-red-300 truncate max-w-[55vw] sm:max-w-none">
            Vagas esgotadas — entre na lista de espera para a próxima turma
          </span>
        </div>
        <a
          href="https://forms.gle/G3uCBJChkXk65K8i9"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors flex-shrink-0"
        >
          Entrar na Lista de Espera
        </a>
      </div>
    </div>
  );
};


