'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/metaPixel';

export const WhatsAppContactCard: React.FC = () => {
  const handleClick = () => {
    trackWhatsAppClick('WhatsApp Card', 'Contact Section');
  };

  return (
    <section className="py-12 bg-gray-900">
      <div className="container-custom">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Fale conosco
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Tem dúvidas sobre o programa? Estamos aqui para ajudar!
          </p>
          <a 
            href="https://wa.me/5531994293099?text=Rômulo,%20quero%20saber%20mais%20sobre%20a%20Escuderia%20Pódium!"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex items-center px-6 sm:px-12 py-4 sm:py-6 bg-green-500 text-white font-bold text-base sm:text-xl rounded-full hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-green-500/30 hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
            <span className="whitespace-nowrap">Falar no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
