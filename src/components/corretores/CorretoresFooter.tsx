'use client';

import React from 'react';
import { ProtectedImage } from '@/components/ui/ProtectedImage';
import { CORRETORES_INSTAGRAM_URL } from '@/content/workshop-corretores';

export function CorretoresFooter() {
  return (
    <footer className="bg-gray-900 border-t border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center pb-8">
          <a
            href="https://www.mundopodium.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex h-8 w-[140px] items-center sm:h-9 sm:w-[160px]"
          >
            <ProtectedImage
              src="/logos-mundo-podium/logo_horizontal_claro.png"
              alt="Mundo Pódium"
              width={160}
              height={36}
              className="object-contain opacity-90"
            />
          </a>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div className="text-center md:text-left space-y-1">
            <p>© {new Date().getFullYear()} Mundo Pódium. Todos os direitos reservados.</p>
            <p>Mundo Pódium LTDA · CNPJ 68.349.974/0001-19 · Belo Horizonte, MG</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="/privacidade" className="hover:text-yellow-400 transition-colors">
              Política de Privacidade
            </a>
            <a href="/termos" className="hover:text-yellow-400 transition-colors">
              Termos de Uso
            </a>
            <a
              href={CORRETORES_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
