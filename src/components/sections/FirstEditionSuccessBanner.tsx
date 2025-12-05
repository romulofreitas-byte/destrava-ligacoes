'use client';

import React from 'react';
import { CheckCircle, Video } from 'lucide-react';

export const FirstEditionSuccessBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-8 md:py-10 bg-gradient-to-br from-green-500/10 via-green-400/5 to-transparent border-b border-green-400/20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-500/20 via-green-400/15 to-green-500/20 border-2 border-green-400/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl hover:shadow-green-400/30 transition-all duration-300 relative overflow-hidden group">
            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 via-transparent to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Left - Icon and Badge */}
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-400/20 border-2 border-green-400/60 rounded-full">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                </div>

                {/* Center - Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center px-3 py-1 bg-green-400/20 border border-green-400/40 rounded-full mb-3 backdrop-blur-md">
                    <span className="text-green-400 font-bold text-xs tracking-wide">🎉 Primeira Edição: Sucesso Total!</span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-tight">
                    A primeira edição do Workshop foi um{' '}
                    <span className="bg-gradient-to-r from-green-400 via-green-300 to-green-400 bg-clip-text text-transparent">sucesso absoluto!</span>
                  </h3>
                  
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                    Em breve, a <strong className="text-green-400">versão gravada</strong> estará disponível para acesso. 
                    Fique atento às novidades!
                  </p>

                  {/* Video Icon Hint */}
                  <div className="flex items-center justify-center md:justify-start gap-2 text-green-400/80">
                    <Video className="w-4 h-4" />
                    <span className="text-xs font-semibold">Versão gravada em breve</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};











