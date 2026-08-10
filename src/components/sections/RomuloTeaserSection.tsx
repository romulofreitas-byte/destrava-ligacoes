'use client';

import React from 'react';
import { Phone } from 'lucide-react';
import { ProtectedImage } from '@/components/ui/ProtectedImage';

/** Compact trust teaser for paid traffic — full bio stays in AboutRomuloWorkshopSection */
export const RomuloTeaserSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-10 md:py-12 bg-gray-900 border-y border-yellow-400/10">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-yellow-400/40 flex-shrink-0 shadow-lg shadow-yellow-400/10">
            <ProtectedImage
              src="/romulo-mentor-destrava.jpg"
              alt="Rômulo Freitas"
              fill
              className="object-cover object-top"
              quality={80}
            />
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-lg mb-2">
              <Phone className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-yellow-400 text-[10px] sm:text-xs font-semibold tracking-wide">
                Ligações reais ao vivo
              </span>
            </div>
            <p className="text-white font-semibold text-sm sm:text-base leading-snug mb-1">
              Rômulo Freitas — criador do Método Pódium
            </p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              CEO da Mundo Pódium. Ensina prospecção ativa com skin in the game: faz ligações ao vivo
              com clientes reais — você aprende com quem executa.
            </p>
            <a
              href="#quem-e-romulo"
              className="inline-block mt-2 text-yellow-400 text-xs font-semibold hover:text-yellow-300 transition-colors"
            >
              Conhecer o Rômulo →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
