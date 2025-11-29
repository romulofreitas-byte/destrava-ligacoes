import React from 'react';
import { ProtectedImage } from '@/components/ui/ProtectedImage';

export const LogoSeparator: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-12 md:py-16 bg-gray-900">
      <div className="container-custom">
        <div className="flex justify-center items-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
            <ProtectedImage 
              src="/logos/Escuderia Branco.png"
              alt="Escuderia Pódium"
              width={128}
              height={128}
              className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
