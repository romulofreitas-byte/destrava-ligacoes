'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Target } from 'lucide-react';

export const WhoIsItForWorkshopSection: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const profiles = [
    'Freelancers e prestadores de serviço travados em cold call',
    'Donos de agência e líderes comerciais que precisam melhorar resultados',
    'SDRs e BDRs que querem aumentar conversão em ligações',
    'Assessores de investimento que precisam gerar agenda qualificada e quebrar objeções'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="para-quem-e" 
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <Target className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">Pra Quem É Este Workshop</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Para Quem é o Workshop
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Para qualquer profissional que depende de Cold Call ou prospecção ativa para gerar resultados.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div 
            className={`bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-yellow-400/50 hover:shadow-yellow-400/20 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{transitionDelay: '0.3s'}}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profiles.map((item, index) => {
                const itemId = `profile-${index}`;
                const isHovered = hoveredItem === itemId;
                
                return (
                  <div 
                    key={index}
                    className={`flex items-start space-x-3 p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                      isHovered ? 'bg-yellow-400/10 scale-[1.02] shadow-lg shadow-yellow-400/20' : 'hover:bg-yellow-400/5'
                    } ${
                      isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{transitionDelay: `${400 + index * 50}ms`}}
                    onMouseEnter={() => setHoveredItem(itemId)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <CheckCircle className={`w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5 transition-all duration-300 ${
                      isHovered ? 'animate-bounce-subtle scale-125' : ''
                    }`} />
                    <span className="text-gray-300 leading-relaxed text-sm sm:text-base">{item}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700/50">
              <p className="text-center text-yellow-400 font-semibold text-base">
                Se você depende do telefone para gerar negócios, este workshop é para você.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

