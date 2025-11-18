"use client";

import React, { useState } from 'react';
import { Calendar, CheckCircle, TrendingUp, Rocket } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const milestones = [
    {
      week: 6,
      title: "Após 6 Semanas",
      items: [
        "Primeiro contrato fechado",
        "Processo comercial estruturado", 
        "Scripts validados",
        "Confiança para ligações"
      ],
      icon: Rocket
    },
    {
      week: 10,
      title: "Após 10 Semanas",
      items: [
        "2-3 contratos fechados",
        "Pipeline estruturado",
        "Processo replicável", 
        "Pronto para escalar"
      ],
      icon: TrendingUp
    }
  ];

  return (
    <section id="cronograma-resultados" className="relative overflow-hidden py-12 md:py-[75px] bg-gray-900">
      {/* Background with glassmorphism */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {/* Floating yellow orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/8 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <Calendar className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">Cronograma de Resultados</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Sua <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-md animate-shimmer bg-[length:200%_auto]">jornada</span> em números
          </h2>
          
          <p className="text-gray-300 max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            O que você vai conquistar em cada etapa
          </p>
        </div>

        {/* Timeline with connector line */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical progress line */}
          <div className="hidden md:block absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-yellow-400/30 via-yellow-400/50 to-yellow-500/30 rounded-full"></div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              const isHovered = hoveredCard === index;
              
              return (
                <div 
                  key={index} 
                  className="relative group"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-8 transform -translate-x-1/2 top-6 w-6 h-6 bg-yellow-400 rounded-full border-4 border-gray-900 shadow-lg shadow-yellow-400/30 z-10 group-hover:scale-125 group-hover:shadow-yellow-400/50 transition-all duration-300"></div>
                  
                  {/* Card */}
                  <div className="md:ml-24">
                    <div className="bg-gray-800/30 border-2 border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden hover:border-yellow-400/60 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${0.4 + index * 0.1}s`}}>
                      {/* Glassmorphism glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      
                      {/* Animated border glow */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-shimmer"></div>
                      
                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 border-2 border-yellow-400/30 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-yellow-400/30 transition-all duration-300">
                              <span className="text-yellow-400 font-bold text-2xl">{milestone.week}</span>
                            </div>
                            {/* Pulsing ring on hover */}
                            {isHovered && (
                              <div className="absolute inset-0 rounded-2xl border-2 border-yellow-400/50 animate-ping"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <IconComponent className="w-5 h-5 text-yellow-400" />
                              <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                                {milestone.title}
                              </h3>
                            </div>
                          </div>
                        </div>
                        
                        {/* Items */}
                        <ul className="space-y-3">
                          {milestone.items.map((item, itemIndex) => (
                            <li 
                              key={itemIndex} 
                              className="flex items-start gap-3 group/item"
                            >
                              <div className="w-6 h-6 bg-green-400/20 border border-green-400/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:scale-110 group-hover/item:shadow-lg group-hover/item:shadow-green-400/30 transition-all duration-300">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              </div>
                              <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-12 text-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="bg-gray-800/40 border-2 border-yellow-400/30 rounded-2xl p-6 max-w-2xl mx-auto backdrop-blur-xl relative overflow-hidden group hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500">
            {/* Glassmorphism glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-yellow-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-6">
                Resumo da <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Jornada</span>
              </h3>
              <div className="flex justify-center gap-12">
                <div className="flex items-center gap-3 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 border-2 border-yellow-400/30 rounded-full flex items-center justify-center group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-yellow-400/30 transition-all duration-300">
                    <span className="text-yellow-400 text-xl font-bold">6</span>
                  </div>
                  <span className="text-gray-300 font-medium">Primeiro contrato</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 border-2 border-yellow-400/30 rounded-full flex items-center justify-center group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-yellow-400/30 transition-all duration-300">
                    <span className="text-yellow-400 text-xl font-bold">10</span>
                  </div>
                  <span className="text-gray-300 font-medium">Pronto para escalar</span>
                </div>
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
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
