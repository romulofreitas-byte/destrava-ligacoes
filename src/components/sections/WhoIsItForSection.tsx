"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, Target } from 'lucide-react';

export const WhoIsItForSection: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const idealProfile = [
    'Quer aprender a vender de forma consistente',
    'PJ que quer se tornar empresário',
    'Quer aprender Método Pódium',
    'Tem medo de fazer cold call',
    'Quer precificar como empresário',
    'Tem tempo para dedicar (5-10h/semana)'
  ];

  const notForYou = [
    'Não está disposto a agir e sair da zona de conforto',
    'Quer apenas consumir conteúdo sem aplicar',
    'Está confortável sendo funcionário',
    'Não quer transformar sua situação atual'
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
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <Target className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">Para Quem É</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Perfil Ideal do{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">Piloto</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Identifique se você está pronto para essa transformação
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 max-w-5xl mx-auto">
          {/* Ideal Profile - Green Theme */}
          <div 
            className={`bg-gray-800/40 border border-gray-700/50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:border-green-400/50 hover:shadow-green-400/20 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{transitionDelay: '0.3s'}}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 via-green-400/5 to-green-400/0 rounded-2xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400/20 to-green-500/10 border border-green-400/30 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-green-400/30">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  É Para Você Se...
                </h3>
              </div>
              
              <div className="space-y-4">
                {idealProfile.map((item, index) => {
                  const itemId = `ideal-${index}`;
                  const isHovered = hoveredItem === itemId;
                  
                  return (
                    <div 
                      key={index}
                      className={`flex items-start space-x-3 p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                        isHovered ? 'bg-green-400/10 scale-[1.02] shadow-lg shadow-green-400/20' : 'hover:bg-green-400/5'
                      } ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{transitionDelay: `${400 + index * 100}ms`}}
                      onMouseEnter={() => setHoveredItem(itemId)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <CheckCircle className={`w-5 h-5 text-green-400 flex-shrink-0 mt-0.5 transition-all duration-300 ${
                        isHovered ? 'animate-bounce-subtle scale-125' : ''
                      }`} />
                      <span className="text-gray-300 leading-relaxed">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Not For You - Red Theme */}
          <div 
            className={`bg-gray-800/40 border border-gray-700/50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:border-red-400/50 hover:shadow-red-400/20 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{transitionDelay: '0.4s'}}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/0 via-red-400/5 to-red-400/0 rounded-2xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-400/20 to-red-500/10 border border-red-400/30 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-red-400/30">
                  <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  Não É Para Você Se...
                </h3>
              </div>
              
              <div className="space-y-4">
                {notForYou.map((item, index) => {
                  const itemId = `not-${index}`;
                  const isHovered = hoveredItem === itemId;
                  
                  return (
                    <div 
                      key={index}
                      className={`flex items-start space-x-3 p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                        isHovered ? 'bg-red-400/10 scale-[1.02] shadow-lg shadow-red-400/20' : 'hover:bg-red-400/5'
                      } ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{transitionDelay: `${400 + index * 100}ms`}}
                      onMouseEnter={() => setHoveredItem(itemId)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <XCircle className={`w-5 h-5 text-red-400 flex-shrink-0 mt-0.5 transition-all duration-300 ${
                        isHovered ? 'animate-bounce-subtle scale-125' : ''
                      }`} />
                      <span className="text-gray-300 leading-relaxed">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 0.4s ease-in-out;
        }
      `}</style>
    </section>
  );
};
