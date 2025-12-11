'use client';

import React from 'react';
import { MessageCircle, Star } from 'lucide-react';
import { ProtectedImage } from '@/components/ui/ProtectedImage';

export const WorkshopTestimonialBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-8 md:py-10 bg-gradient-to-br from-yellow-500/10 via-green-400/5 to-transparent border-b border-yellow-400/20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-500/20 via-green-400/15 to-yellow-500/20 border-2 border-yellow-400/50 rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 relative overflow-hidden group">
            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
            
            <div className="relative z-10">
              {/* Badge */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 border border-yellow-400/40 rounded-full backdrop-blur-md mb-4">
                  <MessageCircle className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-yellow-400 font-bold text-xs tracking-wide">Depoimento Real - 2ª Edição</span>
                </div>
                
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                  O que dizem os participantes das{' '}
                  <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">edições anteriores</span>
                </h3>
                
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                  A <strong className="text-yellow-400">3ª Edição</strong> está chegando! Veja o que um participante da 2ª Edição disse sobre o Workshop.
                </p>
              </div>

              {/* Testimonial Image */}
              <div className="flex justify-center mb-6">
                <div className="relative max-w-md w-full bg-gray-800/30 rounded-2xl p-4 border-2 border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-yellow-400/20 group-hover:scale-[1.02]">
                  <ProtectedImage 
                    src="/Depoimento Workshop Destrava Ligações 2ª Edição.png"
                    alt="Depoimento real de participante da 2ª Edição do Workshop Destrava Ligações - Se tu me cobrasse 500 conto eu pagaria"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-xl object-contain"
                    quality={90}
                  />
                  
                  {/* Highlight Quote */}
                  <div className="mt-4 p-3 bg-gradient-to-r from-yellow-400/20 to-green-400/20 border border-yellow-400/30 rounded-xl">
                    <div className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" />
                      <p className="text-white text-sm sm:text-base font-semibold leading-relaxed">
                        <span className="text-yellow-400">&ldquo;Se tu me cobrasse 500 conto eu pagaria&rdquo;</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <p className="text-gray-300 text-sm sm:text-base mb-4">
                  <span className="text-yellow-400 font-semibold">3ª Edição</span> - 07 de Janeiro de 2026
                </p>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Garanta sua vaga e transforme suas ligações como centenas de participantes já fizeram
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

