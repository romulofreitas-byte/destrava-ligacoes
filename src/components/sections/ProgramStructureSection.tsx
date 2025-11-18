"use client";

import React, { useState } from 'react';
import { programWeeks, phases, programModules } from '@/data/program';
import { Calendar, Clock, Users, User, ChevronDown, Target, Rocket, TrendingUp, Award } from 'lucide-react';
import Image from 'next/image';

export const ProgramStructureSection: React.FC = () => {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  // Get phase color and icon
  const getPhaseConfig = (phase: string) => {
    switch (phase) {
      case 'Fundação':
        return { color: 'bg-blue-500/20 border-blue-400/30 text-blue-400', icon: Target };
      case 'Execução':
        return { color: 'bg-green-500/20 border-green-400/30 text-green-400', icon: Rocket };
      case 'Fechamento':
        return { color: 'bg-red-500/20 border-red-400/30 text-red-400', icon: TrendingUp };
      case 'Consolidação':
        return { color: 'bg-purple-500/20 border-purple-400/30 text-purple-400', icon: Award };
      default:
        return { color: 'bg-gray-500/20 border-gray-400/30 text-gray-400', icon: Target };
    }
  };

  const handleWeekToggle = (weekNumber: number) => {
    setExpandedWeek(expandedWeek === weekNumber ? null : weekNumber);
  };

  // Group weeks by phase for separators
  let currentPhase = '';
  const weeksWithPhaseMarkers = programWeeks.map((week, index) => {
    const showPhaseSeparator = week.phase !== currentPhase;
    if (showPhaseSeparator) {
      currentPhase = week.phase;
    }
    return { ...week, showPhaseSeparator, phaseIndex: index };
  });

  return (
    <section id="estrutura-programa" className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900">
      {/* Background with gradient similar to hero */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/70"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-sm shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">Estrutura do Programa</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Saia da teoria e{' '}
            <span className="text-yellow-400 drop-shadow-md animate-pulse">feche seu primeiro contrato</span>
            {' '}em 6 semanas
          </h2>

          {/* Subheadline */}
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            O Método Pódium é uma trilha de progressão para você aprender a vender e crescer como empresário.
          </p>
        </div>

        {/* Floating Logo */}
        <div className="absolute top-8 left-8 z-10 hidden lg:block">
          <div className="w-16 h-16 relative">
            <Image 
              src="/logos/icon-escuderia.png"
              alt="Escuderia Pódium"
              width={64}
              height={64}
              className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Timeline and Weeks */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400/50 via-yellow-400/30 to-purple-400/30 hidden md:block"></div>

          {/* Weeks Accordion */}
          <div className="space-y-6">
            {weeksWithPhaseMarkers.map((week, index) => {
              const isExpanded = expandedWeek === week.week;
              const phaseConfig = getPhaseConfig(week.phase);
              const IconComponent = phaseConfig.icon;

              return (
                <React.Fragment key={week.week}>
                  {/* Phase Separator */}
                  {week.showPhaseSeparator && (
                    <div className="relative animate-fade-in-up" style={{animationDelay: `${0.4 + index * 0.05}s`}}>
                      {/* Timeline Dot */}
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full border-4 border-gray-900 shadow-lg hidden md:block z-10"></div>
                      
                      {/* Phase Badge */}
                      <div className="ml-8 md:ml-0 md:pl-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/60 border border-gray-700 rounded-xl backdrop-blur-lg">
                          <IconComponent className="w-4 h-4" />
                          <span className="font-semibold text-white">{week.phase}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Week Card */}
                  <div 
                    className={`relative ml-8 md:ml-0 md:pl-16 animate-fade-in-up transition-all duration-500 ${
                      isExpanded ? 'mb-8' : ''
                    }`}
                    style={{animationDelay: `${0.4 + index * 0.05}s`}}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-6 top-6 -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full border-4 border-gray-900 shadow-lg hidden md:block z-10"></div>

                    {/* Week Card */}
                    <div 
                      className={`bg-gray-800/40 border border-gray-700/50 rounded-xl p-4 sm:p-6 transition-all duration-500 backdrop-blur-lg cursor-pointer hover:bg-gray-800/60 hover:border-yellow-400/50 ${
                        isExpanded 
                          ? 'shadow-2xl shadow-yellow-400/20 scale-[1.02] border-yellow-400/70' 
                          : 'hover:shadow-lg hover:shadow-yellow-400/10'
                      }`}
                      onClick={() => handleWeekToggle(week.week)}
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          {/* Week Number and Title */}
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 text-black rounded-xl flex items-center justify-center font-bold text-sm shadow-lg">
                              {week.week}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-white">{week.title}</h3>
                              <p className="text-xs text-gray-400">Semana {week.week} de 10</p>
                            </div>
                          </div>

                          {/* Phase Badge and Format */}
                          <div className="flex items-center gap-2 mt-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${phaseConfig.color}`}>
                              {week.phase}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              {week.format === 'Grupo' ? (
                                <><Users className="w-3 h-3" /> <span>Grupo</span></>
                              ) : (
                                <><User className="w-3 h-3" /> <span>Individual</span></>
                              )}
                            </div>
                            <span className="text-xs text-gray-400">•</span>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Clock className="w-3 h-3" /> <span>{week.duration}</span>
                            </div>
                          </div>
                        </div>

                        {/* Expand/Collapse Icon */}
                        <ChevronDown 
                          className={`w-6 h-6 text-gray-400 transition-all duration-500 flex-shrink-0 ${
                            isExpanded ? 'rotate-180 text-yellow-400' : ''
                          }`}
                        />
                      </div>

                      {/* Expanded Content */}
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isExpanded ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'
                      }`}>
                        {/* Theme */}
                        <div className="mb-4">
                          <p className="text-yellow-400 font-medium text-sm">{week.theme}</p>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          {/* Content */}
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                              <span className="w-1 h-4 bg-yellow-400 rounded-full"></span>
                              Conteúdo
                            </h4>
                            <div className="space-y-2">
                              {week.content.map((item, idx) => (
                                <div key={idx} className="text-sm text-gray-300 flex items-start">
                                  <span className="text-yellow-400 mr-2 mt-0.5 text-xs">•</span>
                                  <span className="leading-relaxed">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Deliverables */}
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                              <span className="w-1 h-4 bg-green-400 rounded-full"></span>
                              Entregáveis
                            </h4>
                            <div className="space-y-2">
                              {week.deliverables.map((item, idx) => (
                                <div key={idx} className="text-sm text-gray-300 flex items-start">
                                  <span className="text-green-400 mr-2 mt-0.5 text-xs flex-shrink-0">✓</span>
                                  <span className="leading-relaxed">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Tools */}
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                            <span className="w-1 h-4 bg-purple-400 rounded-full"></span>
                            Ferramentas
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {week.tools.map((tool, idx) => (
                              <span key={idx} className="px-3 py-1.5 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 rounded-full text-xs font-medium backdrop-blur-sm">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-20 animate-fade-in-up" style={{animationDelay: '1.4s'}}>
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-500/5 border border-yellow-400/30 rounded-2xl p-6 sm:p-12 backdrop-blur-sm">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-8">
                Resumo do Programa
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <div className="flex items-center justify-center space-x-3">
                  <Calendar className="w-6 h-6 text-yellow-400" />
                  <span className="text-gray-300 font-medium">6 semanas intensivas + 4 sessões mensais</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Clock className="w-6 h-6 text-yellow-400" />
                  <span className="text-gray-300 font-medium">16 horas de mentoria</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Users className="w-6 h-6 text-yellow-400" />
                  <span className="text-gray-300 font-medium">Turma limitada (5-10 pilotos)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
