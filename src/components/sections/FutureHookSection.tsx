'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export const FutureHookSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sectionRef}
      id="gancho-futuro" 
      className="relative overflow-hidden py-16 md:py-20 bg-gray-900"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm text-center animate-fade-in-up">
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Esse Workshop é a primeira etapa para quem deseja dominar prospecção ativa com consistência.{' '}
              <span className="text-yellow-400 font-semibold">No final, você terá clareza sobre o próximo passo.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

