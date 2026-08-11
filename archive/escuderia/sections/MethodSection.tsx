"use client";

import React, { useState, useEffect, useRef } from 'react';
import { methodSteps } from '@/data/comparison';
import { Target, Users, Phone, MessageCircle, Presentation, UserCheck, Sparkles, ArrowRight } from 'lucide-react';

export const MethodSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const icons = {
    Target: Target,
    Users: Users,
    Phone: Phone,
    MessageCircle: MessageCircle,
    Presentation: Presentation,
    UserCheck: UserCheck
  };

  // Get stage color based on step number
  const getStageColor = (step: number) => {
    if (step <= 2) return 'blue'; // Prospecção
    if (step <= 4) return 'yellow'; // Qualificação
    return 'green'; // Fechamento
  };

  const getStageColors = (color: string) => {
    const colors = {
      blue: {
        bg: 'from-blue-400/20 to-blue-500/10',
        border: 'border-blue-400/30',
        icon: 'text-blue-400',
        glow: 'shadow-blue-400/50'
      },
      yellow: {
        bg: 'from-yellow-400/20 to-yellow-500/10',
        border: 'border-yellow-400/30',
        icon: 'text-yellow-400',
        glow: 'shadow-yellow-400/50'
      },
      green: {
        bg: 'from-green-400/20 to-green-500/10',
        border: 'border-green-400/30',
        icon: 'text-green-400',
        glow: 'shadow-green-400/50'
      }
    };
    return colors[color as keyof typeof colors] || colors.yellow;
  };

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

  // Observe each card for visibility
  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps(prev => [...prev, index]);
          }
        },
        { threshold: 0.5 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, [isVisible]);



  return (
    <section 
      ref={sectionRef}
      id="metodo-podium" 
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        
        {/* Stage-specific floating orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">O Método Pódium Completo</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            6 etapas do{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">primeiro contato</span>
            {' '}ao fechamento
          </h2>

          {/* Subheadline */}
          <p className="text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Metodologia estruturada e testada em múltiplos nichos para acelerar suas vendas de forma consistente e escalável.
          </p>
        </div>

        {/* Method Steps with Enhanced Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20 relative">
          {/* Connecting lines on desktop */}
          <svg viewBox="0 0 1000 100" className="absolute top-1/2 left-0 right-0 h-2 hidden lg:block z-0 opacity-20">
            <defs>
              <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <path 
              d="M 50 50 Q 150 45, 250 45 T 500 45 T 750 45 T 950 50" 
              stroke="url(#path-gradient)" 
              strokeWidth="2" 
              fill="none"
              className="animate-draw"
            />
          </svg>

          {methodSteps.map((step, index) => {
            const IconComponent = icons[step.icon as keyof typeof icons];
            const isHovered = hoveredCard === index;
            const isVisible = visibleSteps.includes(index);
            const stageColor = getStageColor(step.step);
            const colors = getStageColors(stageColor);
            
            return (
              <div 
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`relative transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{transitionDelay: `${index * 100}ms`}}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div 
                  className={`relative bg-gray-800/40 border rounded-2xl p-6 md:p-8 transition-all duration-500 backdrop-blur-xl overflow-hidden ${
                    isHovered ? `scale-105 -translate-y-2 shadow-2xl ${colors.glow}` : 'hover:scale-102 shadow-lg'
                  } border-gray-700/50 hover:${colors.border} hover:border-opacity-50`}
                >
                  {/* Glow effect on hover */}
                  {isHovered && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-30 pointer-events-none animate-shimmer`}></div>
                  )}

                  {/* Step Number Badge with enhanced design */}
                  <div className="relative flex justify-end mb-4">
                    <div className={`relative w-12 h-12 bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-full flex items-center justify-center ${
                      isHovered ? 'scale-110 shadow-lg' : ''
                    } transition-all duration-500`}>
                      <span className="text-lg font-bold text-white z-10">{step.step}</span>
                      {/* Pulsing ring on hover */}
                      {isHovered && (
                        <div className="absolute inset-0 border-2 border-current rounded-full animate-ping"></div>
                      )}
                    </div>
                  </div>
                  
                  {/* Icon with enhanced design */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
                    isHovered ? 'scale-110 shadow-lg' : ''
                  }`}>
                    <IconComponent className={`w-8 h-8 ${colors.icon} transition-all duration-500 ${
                      isHovered ? 'animate-bounce-subtle' : ''
                    }`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  
                  {/* Description - enhanced reveal */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    isHovered ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="flex items-start mb-2">
                      <ArrowRight className={`w-4 h-4 ${colors.icon} mr-2 flex-shrink-0 mt-1`} />
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>


                </div>
              </div>
            );
          })}
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

        @keyframes draw {
          from {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 0.6s ease-in-out infinite;
        }

        .animate-draw {
          animation: draw 3s ease-in-out forwards;
        }

        @media (hover: hover) {
          .hover\:scale-102:hover {
            transform: scale(1.02);
          }
        }
      `}</style>
    </section>
  );
};
