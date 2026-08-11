"use client";

import React, { useState, useEffect, useRef } from 'react';
import { comparison } from '@/data/comparison';
import { CheckCircle, XCircle, MessageCircle, Sparkles, ArrowRight, TrendingUp, Award, Zap } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  useEffect(() => {
    if (isVisible) {
      rowRefs.current.forEach((ref, index) => {
        if (ref) {
          setTimeout(() => {
            ref.style.opacity = '1';
            ref.style.transform = 'translateY(0)';
          }, index * 100);
        }
      });
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      id="comparacao" 
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">Comparativo</span>
          </div>
          
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Seu Estado Atual vs{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">Escuderia Pódium</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Veja a transformação que a Escuderia Pódium pode fazer na sua carreira comercial
          </p>
        </div>

        {/* Comparison Table - Desktop */}
        <div className="hidden lg:block max-w-5xl mx-auto mb-20">
          <div className="bg-gray-800/30 border border-gray-700/50 shadow-2xl rounded-3xl overflow-hidden animate-fade-in-up backdrop-blur-xl" style={{animationDelay: '0.4s'}}>
            {/* Header with glow effect */}
            <div className="grid grid-cols-3 bg-gradient-to-r from-gray-700/60 via-gray-700/50 to-yellow-400/10 border-b border-yellow-400/20">
              <div className="p-6 text-center border-r border-gray-600/50">
                <h3 className="text-lg font-semibold text-white flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Característica
                </h3>
              </div>
              <div className="p-6 text-center border-r border-gray-600/50">
                <h3 className="text-lg font-semibold text-white">Seu Estado Atual</h3>
                <p className="text-sm text-gray-400 mt-1">Funcionário de agência</p>
              </div>
              <div className="p-6 text-center bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 relative overflow-hidden">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-shimmer"></div>
                <h3 className="text-lg font-semibold text-yellow-400 relative z-10">Escuderia Pódium</h3>
                <p className="text-sm text-gray-300 mt-1 relative z-10">Empreendedor independente</p>
                {/* Floating sparkles */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400/20 rounded-full animate-float"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
              </div>
            </div>

            {/* Rows with interactive effects */}
            {comparison.map((item, index) => {
              const isHovered = hoveredRow === index;
              const isSelected = selectedRow === index;
              
              return (
                <div 
                  key={index} 
                  ref={(el) => { rowRefs.current[index] = el; }}
                  className={`grid grid-cols-3 transition-all duration-500 cursor-pointer ${
                    index % 2 === 0 ? 'bg-gray-800/20' : 'bg-gray-700/10'
                  } ${
                    isHovered ? 'bg-gray-800/60 scale-[1.01] shadow-2xl shadow-yellow-400/20 border-l-4 border-yellow-400/50' : ''
                  } ${
                    isSelected ? 'bg-yellow-400/5 border-l-4 border-yellow-400' : ''
                  }`}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onClick={() => setSelectedRow(isSelected ? null : index)}
                  style={{
                    opacity: 0,
                    transform: 'translateY(20px)',
                    transition: 'opacity 0.5s, transform 0.5s'
                  }}
                >
                  {/* Feature Column */}
                  <div className="p-6 border-r border-gray-600/50 flex items-center">
                    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                      {item.feature}
                    </span>
                  </div>
                  
                  {/* Estado Atual Column */}
                  <div className="p-6 border-r border-gray-600/50 text-center flex items-center justify-center">
                    <div className={`transition-all duration-500 ${
                      isHovered ? 'scale-125' : ''
                    }`}>
                      {typeof item.atual === 'boolean' ? (
                        item.atual ? (
                          <CheckCircle className="w-6 h-6 text-green-400 mx-auto animate-bounce-subtle" />
                        ) : (
                          <XCircle className="w-6 h-6 text-gray-500 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-300">{item.atual}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Escuderia Pódium Column */}
                  <div className="p-6 text-center flex items-center justify-center relative group">
                    {/* Glow effect on hover */}
                    {isHovered && (
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent animate-shimmer"></div>
                    )}
                    
                    {/* Arrow animation on hover */}
                    {isHovered && typeof item.escuderia !== 'boolean' && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full transition-all duration-500">
                        <ArrowRight className="w-8 h-8 text-yellow-400 animate-bounce-horizontal" />
                      </div>
                    )}
                    
                    <div className={`transition-all duration-500 relative z-10 ${
                      isHovered ? 'scale-125' : ''
                    }`}>
                      {typeof item.escuderia === 'boolean' ? (
                        item.escuderia ? (
                          <div className="relative">
                            <CheckCircle className="w-6 h-6 text-green-400 mx-auto animate-bounce-subtle" />
                            {/* Sparkles around check */}
                            {isHovered && (
                              <>
                                <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-400 animate-spin-slow" style={{animationDuration: '3s'}} />
                                <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-yellow-400 animate-spin-slow" style={{animationDuration: '4s', animationDirection: 'reverse'}} />
                              </>
                            )}
                          </div>
                        ) : (
                          <XCircle className="w-6 h-6 text-gray-500 mx-auto" />
                        )
                      ) : (
                        <span className="text-white font-semibold">{item.escuderia}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Mobile Cards */}
        <div className="lg:hidden space-y-6 mb-20">
          {comparison.map((item, index) => {
            const isExpanded = expandedCards.has(index);
            
            return (
              <div 
                key={index} 
                className="bg-gray-800/30 border border-gray-700/50 rounded-2xl overflow-hidden animate-fade-in-up backdrop-blur-xl transition-all duration-500 hover:border-yellow-400/30 hover:shadow-2xl hover:shadow-yellow-400/10"
                style={{
                  animationDelay: `${0.4 + index * 0.05}s`,
                  opacity: 0,
                  transform: 'translateY(20px)'
                }}
              >
                {/* Card Header */}
                <div 
                  className="p-4 sm:p-6 cursor-pointer"
                  onClick={() => {
                    const newExpanded = new Set(expandedCards);
                    if (isExpanded) {
                      newExpanded.delete(index);
                    } else {
                      newExpanded.add(index);
                    }
                    setExpandedCards(newExpanded);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-white">{item.feature}</h4>
                    <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                      <ArrowRight className="w-5 h-5 text-yellow-400" />
                    </div>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className={`px-4 sm:px-6 transition-all duration-500 ${isExpanded ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                  {/* Estado Atual */}
                  <div className="flex items-center justify-between p-4 mb-3 bg-gray-700/30 border border-gray-600/50 rounded-xl">
                    <span className="text-sm font-medium text-gray-400">Estado Atual</span>
                    <span className="text-white">
                      {typeof item.atual === 'boolean' ? (
                        item.atual ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-500" />
                        )
                      ) : (
                        <span className="text-sm">{item.atual}</span>
                      )}
                    </span>
                  </div>
                  
                  {/* Transformation Arrow */}
                  <div className="flex justify-center my-3">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-5 h-5 text-yellow-400 animate-bounce-horizontal" />
                    </div>
                  </div>
                  
                  {/* Escuderia Pódium */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-xl relative overflow-hidden">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-shimmer"></div>
                    <span className="text-sm font-medium text-yellow-400 relative z-10">Escuderia Pódium</span>
                    <span className="text-white font-semibold relative z-10">
                      {typeof item.escuderia === 'boolean' ? (
                        item.escuderia ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-500" />
                        )
                      ) : (
                        <span className="text-sm">{item.escuderia}</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/80 border border-yellow-400/30 rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl backdrop-blur-xl overflow-hidden group hover:border-yellow-400/50 transition-all duration-500">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 animate-shimmer"></div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 shadow-[0_0_100px_rgba(234,179,8,0.3)] opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-yellow-500/30 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <MessageCircle className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Ainda Não Tem Certeza?
              </h3>
              <p className="text-gray-300 text-lg mb-8 text-center leading-relaxed">
                Entre em contato conosco para uma conversa personalizada sobre qual programa 
                é ideal para seus objetivos
              </p>
              <div className="flex justify-center">
                <a 
                  href="https://wa.me/5531994293099" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 hover:-translate-y-1"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Falar com Consultor no WhatsApp
                </a>
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

        @keyframes bounce-horizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        .animate-bounce-horizontal {
          animation: bounce-horizontal 1.5s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 0.5s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </section>
  );
};
