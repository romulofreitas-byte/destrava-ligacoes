"use client";

import React, { useState, useEffect, useRef } from 'react';
import { bonuses } from '@/data/benefits';
import { Bot, Phone, Users, Award, Wrench, Timer, CheckCircle, Car, Zap } from 'lucide-react';

export const BonusesSection: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const icons = {
    Bot: Bot,
    Phone: Phone,
    Users: Users,
    Award: Award,
    Wrench: Wrench,
    Timer: Timer,
    RacingCar: Car
  };

  const getGlowColor = (color?: string) => {
    const glows = {
      green: 'shadow-green-400/50',
      orange: 'shadow-orange-400/50',
      blue: 'shadow-blue-400/50',
      purple: 'shadow-purple-400/50',
      yellow: 'shadow-yellow-400/50'
    };
    return glows[color as keyof typeof glows] || 'shadow-yellow-400/50';
  };

  const getBorderColor = (color?: string) => {
    const borders = {
      green: 'border-green-400/30',
      orange: 'border-orange-400/30',
      blue: 'border-blue-400/30',
      purple: 'border-purple-400/30',
      yellow: 'border-yellow-400/30'
    };
    return borders[color as keyof typeof borders] || 'border-yellow-400/30';
  };

  const getBgGradient = (color?: string) => {
    const gradients = {
      green: 'from-green-400/20 to-green-500/10',
      orange: 'from-orange-400/20 to-orange-500/10',
      blue: 'from-blue-400/20 to-blue-500/10',
      purple: 'from-purple-400/20 to-purple-500/10',
      yellow: 'from-yellow-400/20 to-yellow-500/10'
    };
    return gradients[color as keyof typeof gradients] || 'from-yellow-400/20 to-yellow-500/10';
  };

  const getTextColor = (color?: string) => {
    const colors = {
      green: 'text-green-400',
      orange: 'text-orange-400',
      blue: 'text-blue-400',
      purple: 'text-purple-400',
      yellow: 'text-yellow-400'
    };
    return colors[color as keyof typeof colors] || 'text-yellow-400';
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

  return (
    <section 
      ref={sectionRef}
      id="bonus" 
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
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <Award className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">Bônus Exclusivos da Escuderia</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Ferramentas que{' '}
            <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">aceleram</span>
            {' '}seus resultados
          </h2>
          
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Recursos exclusivos criados para transformar sua jornada comercial
          </p>
        </div>

        {/* Hero Card - Sala de Ligação (Pit Stop) */}
        {bonuses[0].featured && (
          <div className={`mb-12 animate-fade-in-up ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '0.4s' }}>
            <div 
              className={`relative bg-gray-800/40 border ${getBorderColor(bonuses[0].color)} rounded-3xl p-8 md:p-12 backdrop-blur-xl transition-all duration-500 overflow-hidden group cursor-pointer ${
                hoveredCard === 0 ? 'scale-[1.02] shadow-2xl ' + getGlowColor(bonuses[0].color) : ''
              }`}
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setExpandedCard(expandedCard === 0 ? null : 0)}
            >
              {/* Checkered pattern overlay for pit stop theme */}
              <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,0.1) 10px,rgba(255,255,255,0.1) 20px)]"></div>
              
              {/* Racing stripes */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 animate-shimmer"></div>
              
              {/* Glow effect on hover */}
              {hoveredCard === 0 && (
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-yellow-400/5 animate-shimmer pointer-events-none"></div>
              )}

              <div className="relative z-10">
                {/* Header with icon and subtitle */}
                <div className="flex items-start gap-6 mb-6">
                  <div className={`w-24 h-24 bg-gradient-to-br ${getBgGradient(bonuses[0].color)} border-2 ${getBorderColor(bonuses[0].color)} rounded-3xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                    hoveredCard === 0 ? 'scale-110 shadow-2xl shadow-green-400/30' : ''
                  }`}>
                    <Phone className={`w-12 h-12 ${getTextColor(bonuses[0].color)} animate-pulse`} />
                  </div>
                  
                  <div className="flex-1">
                    {bonuses[0].subtitle && (
                      <div className="inline-flex items-center px-3 py-1 bg-green-400/20 border border-green-400/30 rounded-full mb-3">
                        <Car className="w-3 h-3 text-green-400 mr-2" />
                        <span className="text-xs font-semibold text-green-400">{bonuses[0].subtitle}</span>
                      </div>
                    )}
                    <h3 className="text-3xl font-bold text-white mb-2">{bonuses[0].title}</h3>
                    <p className="text-lg text-gray-300">{bonuses[0].description}</p>
                  </div>

                  {/* Timer icon for real-time feedback */}
                  <div className="hidden md:block">
                    <div className="w-16 h-16 bg-green-400/10 border border-green-400/30 rounded-xl flex items-center justify-center">
                      <Timer className="w-8 h-8 text-green-400" />
                    </div>
                  </div>
                </div>

                {/* Stats */}
                {bonuses[0].stat && (
                  <div className="flex items-center gap-6 mb-6">
                    <div className="px-4 py-2 bg-green-400/10 border border-green-400/30 rounded-xl">
                      <div className="text-2xl font-bold text-green-400">{bonuses[0].stat.value}</div>
                      <div className="text-xs text-gray-400">{bonuses[0].stat.label}</div>
                    </div>
                  </div>
                )}

                {/* Details - Expandable */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  expandedCard === 0 ? 'max-h-[500px]' : 'max-h-0'
                }`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {bonuses[0].details.map((detail, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                      >
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300 leading-relaxed">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Click indicator */}
                <div className={`flex items-center justify-center mt-6 transition-all ${
                  expandedCard === 0 ? 'opacity-0 h-0' : 'opacity-100'
                }`}>
                  <span className="text-xs text-gray-400">Clique para ver mais detalhes</span>
                  <Zap className="w-4 h-4 text-yellow-400 ml-2" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Bonus Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bonuses.slice(1).map((bonus, index) => {
            const IconComponent = icons[bonus.icon as keyof typeof icons];
            const actualIndex = index + 1; // Offset for Sala de Ligação
            const isHovered = hoveredCard === actualIndex;
            const isExpanded = expandedCard === actualIndex;
            
            return (
              <div
                key={actualIndex}
                className={`relative transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${(index + 1) * 150}ms`
                }}
              >
                <div
                  className={`relative bg-gray-800/40 border ${getBorderColor(bonus.color)} rounded-2xl p-8 backdrop-blur-xl transition-all duration-500 cursor-pointer overflow-hidden group h-full flex flex-col ${
                    isHovered ? 'scale-105 -translate-y-2 shadow-2xl ' + getGlowColor(bonus.color) : 'shadow-lg'
                  }`}
                  onMouseEnter={() => setHoveredCard(actualIndex)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setExpandedCard(isExpanded ? null : actualIndex)}
                >
                  {/* Glow effect on hover */}
                  {isHovered && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${getBgGradient(bonus.color)} opacity-30 pointer-events-none animate-shimmer`}></div>
                  )}

                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${getBgGradient(bonus.color)} border ${getBorderColor(bonus.color)} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 ${
                    isHovered ? 'scale-110 shadow-lg' : ''
                  }`}>
                    <IconComponent className={`w-10 h-10 ${getTextColor(bonus.color)} transition-transform duration-500 ${
                      isHovered ? 'animate-bounce-subtle' : ''
                    }`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 text-center">{bonus.title}</h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed text-center mb-4 flex-1">{bonus.description}</p>

                  {/* Stats (if available) */}
                  {bonus.stat && (
                    <div className="text-center mb-4">
                      <div className={`inline-flex items-center px-3 py-1 bg-${bonus.color}-400/10 border border-${bonus.color}-400/30 rounded-full`}>
                        <span className={`text-xs font-semibold ${getTextColor(bonus.color)}`}>
                          {bonus.stat.value} {bonus.stat.label}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Details - Expandable */}
                  <div className={`overflow-hidden transition-all duration-500 ${
                    isExpanded ? 'max-h-96' : 'max-h-0'
                  }`}>
                    <div className="space-y-2 mt-4">
                      {bonus.details.map((detail, idx) => (
                        <div 
                          key={idx}
                          className="flex items-start p-2 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-300 leading-relaxed">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className={`flex items-center justify-center mt-4 transition-all ${
                    isExpanded || !isHovered ? 'opacity-0 h-0' : 'opacity-100'
                  }`}>
                    <span className="text-xs text-gray-400">Clique para detalhes</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Investment Value CTA */}
        <div className="mt-20 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/80 border border-yellow-400/30 rounded-3xl p-10 text-center backdrop-blur-xl overflow-hidden group hover:border-yellow-400/50 transition-all duration-500">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 animate-shimmer"></div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 shadow-[0_0_100px_rgba(234,179,8,0.3)] opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-8">
                Ganhe R$ 5.000 em Bônus Gratuitos
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                  { label: "Sala de Ligação", value: "R$ 1.500", color: "green" },
                  { label: "Comunidade", value: "R$ 1.000", color: "orange" },
                  { label: "Certificação", value: "R$ 500", color: "blue" },
                  { label: "Agente Pódium", value: "R$ 2.000", color: "purple" }
                ].map((item, idx) => (
                  <div key={idx} className="text-center p-4 bg-gray-800/40 rounded-xl">
                    <p className="text-gray-400 text-sm mb-2">{item.label}</p>
                    <p className="text-xl font-bold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-yellow-400/20 pt-6">
                <p className="text-gray-300 mb-2">Valor Total dos Bônus:</p>
                <p className="text-4xl font-bold text-yellow-400">R$ 5.000</p>
                <p className="text-gray-300 mt-2">
                  Inclusos gratuitamente na Escuderia Pódium
                </p>
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
          50% { transform: scale(1.2); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 0.6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
