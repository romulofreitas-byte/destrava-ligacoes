'use client';

import React, { useEffect, useRef } from 'react';
import { Award, Users, TrendingUp, Video, Briefcase } from 'lucide-react';
import { ProtectedImage } from '@/components/ui/ProtectedImage';
import { trackViewContent } from '@/lib/metaPixel';

export const AboutRomuloWorkshopSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView.current) {
          trackViewContent('About Romulo Workshop Section', 'about-romulo');
          hasTrackedView.current = true;
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: TrendingUp, label: 'Anos de Experiência', value: '12+' },
    { icon: Briefcase, label: 'CEO da Combustível', value: 'Marketing e Vendas' },
    { icon: Award, label: 'Criador do Método', value: 'Pódium' },
    { icon: Video, label: 'Pilotos na Comunidade', value: '100+' }
  ];

  return (
    <section 
      ref={sectionRef}
      id="quem-e-romulo" 
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <span className="text-yellow-400 font-semibold text-xs tracking-wide">Quem É o Rômulo</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Autoridade em{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">Vendas</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="flex justify-center lg:justify-start animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="relative w-64 sm:w-80 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-yellow-400/30 shadow-2xl">
                <ProtectedImage 
                  src="/romulo-mentor-destrava.jpg"
                  alt="Rômulo Freitas"
                  fill
                  className="object-cover"
                  quality={90}
                  priority
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl">
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                  <span className="text-white font-bold">Rômulo Freitas</span> é criador do <span className="text-yellow-400 font-semibold">Método Pódium</span> e autoridade em vendas com mais de 12 anos de experiência. CEO da <span className="text-yellow-400 font-semibold">Combustível Marketing e Vendas</span>, passou 5 anos na operação à frente da Gestão e Vendas antes de ensinar.
                </p>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Faz lives e ligações ao vivo no YouTube - é &quot;skin in the game&quot;. Atualmente é mentor e lidera a Comunidade Pódium com mais de 100 pilotos focada em resultados reais.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  
                  return (
                    <div
                      key={index}
                      className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center justify-center mb-2">
                        <Icon className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="text-center">
                        <div className="text-yellow-400 font-bold text-lg sm:text-xl mb-1">{stat.value}</div>
                        <div className="text-gray-400 text-xs">{stat.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

