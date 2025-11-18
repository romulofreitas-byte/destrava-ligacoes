"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Database, Zap, UserCheck, User, Users, Target, TrendingUp, Bot, Brain, Sparkles, Linkedin, MapPin, Building, Workflow } from 'lucide-react';

export const TechnologyToolsSection: React.FC = () => {
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [expandedMobilePhase, setExpandedMobilePhase] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const qualificationPhases = [
    {
      level: 1,
      title: 'Nome e Telefone',
      description: 'Contato inicial identificado',
      details: 'Identificação básica do contato com informações de contato. Base para toda a estratégia de prospecção.',
      icon: User,
      color: 'from-blue-400 to-blue-500',
      borderColor: 'border-blue-400/30',
      glowColor: 'shadow-blue-400/50',
      metrics: '100% dos leads'
    },
    {
      level: 2,
      title: 'Qualificação Técnica',
      description: 'Fit técnico validado',
      details: 'Análise do perfil da empresa, necessidades, budget e timing. Separação de leads qualificados dos não qualificados.',
      icon: Target,
      color: 'from-yellow-400 to-yellow-500',
      borderColor: 'border-yellow-400/30',
      glowColor: 'shadow-yellow-400/50',
      metrics: '60-80% chegam aqui'
    },
    {
      level: 3,
      title: 'Decisor Identificado',
      description: 'Nome do decisor confirmado',
      details: 'Identificação e contato estabelecido com o decisor final. Condição essencial para fechamento de vendas complexas.',
      icon: Users,
      color: 'from-green-400 to-green-500',
      borderColor: 'border-green-400/30',
      glowColor: 'shadow-green-400/50',
      metrics: '30-50% alcançam'
    }
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
      id="tecnologia-ferramentas" 
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          {/* Badge with glow */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">Tecnologia & Ferramentas</span>
          </div>

          {/* Main Headline with animated gradient */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Infraestrutura{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">profissional</span>
            {' '}para vendas escaláveis
          </h2>

          {/* Subheadline */}
          <p className="text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Use IA, CRM e metodologias comprovadas para transformar sua abordagem de vendas
          </p>
        </div>

        {/* AI-Powered Hero Showcase */}
        <div className="mb-20 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 border border-yellow-400/30 rounded-3xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden group hover:border-yellow-400/50 transition-all duration-500">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 animate-shimmer absolute"></div>
            
            {/* Pulsing orb effect */}
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Agente Pódium Icon with animation */}
                <div className="flex-shrink-0 relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-yellow-400/30 to-yellow-500/20 border-4 border-yellow-400/50 rounded-3xl flex items-center justify-center shadow-2xl shadow-yellow-400/30 group-hover:scale-110 group-hover:shadow-yellow-400/50 transition-all duration-500 animate-pulse">
                    <Bot className="w-16 h-16 text-yellow-400 group-hover:animate-bounce" />
                  </div>
                  
                  {/* Rotating ring */}
                  <div className="absolute inset-0 border-4 border-transparent border-t-yellow-400/30 rounded-3xl animate-spin-slow"></div>
                  <div className="absolute inset-0 border-4 border-transparent border-l-yellow-400/20 rounded-3xl animate-spin-slow" style={{animationDirection: 'reverse', animationDuration: '3s'}}></div>
                  
                  {/* Floating particles */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400/60 rounded-full animate-float"></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-400/40 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-1/2 -right-4 w-5 h-5 bg-purple-400/40 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-3xl font-bold text-white">Agente Pódium</h3>
                    <div className="px-3 py-1 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 rounded-full">
                      <span className="text-yellow-400 text-xs font-semibold">AI-POWERED</span>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    Seu assistente inteligente que automatiza prospecção, qualificação e construção de listas usando IA (ChatGPT).
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3 p-3 bg-gray-800/40 rounded-xl backdrop-blur-sm hover:bg-gray-800/60 transition-all">
                      <Brain className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white text-sm">Análise Inteligente</div>
                        <div className="text-xs text-gray-400">Qualificação automática</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-gray-800/40 rounded-xl backdrop-blur-sm hover:bg-gray-800/60 transition-all">
                      <Workflow className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white text-sm">Extração de Dados</div>
                        <div className="text-xs text-gray-400">Listas automatizadas</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-gray-800/40 rounded-xl backdrop-blur-sm hover:bg-gray-800/60 transition-all">
                      <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white text-sm">ChatGPT Powered</div>
                        <div className="text-xs text-gray-400">Pesquisa avançada</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-gray-800/40 rounded-xl backdrop-blur-sm hover:bg-gray-800/60 transition-all">
                      <Target className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-white text-sm">Segmentação</div>
                        <div className="text-xs text-gray-400">Targeting preciso</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* CRM Card with Glassmorphism */}
          <div 
            className="relative bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-xl transition-all duration-500 hover:border-blue-400/50 group overflow-hidden"
            onMouseEnter={() => setExpandedCard('crm')}
            onMouseLeave={() => setExpandedCard(null)}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 shadow-[0_0_80px_rgba(59,130,246,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-blue-500/20 border border-blue-400/30 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-400/50 transition-all duration-500">
                  <Database className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Sistemas CRM</h3>
                  <p className="text-xs text-gray-400">Gestão profissional</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Controle total de leads com sistemas CRM profissionais. Acompanhamento de contatos, histórico de interações, pipeline de vendas e relatórios de performance.
              </p>
              
              <div className="space-y-3">
                {[
                  'Gestão centralizada de todos os leads',
                  'Histórico completo de cada interação',
                  'Visualização do pipeline de vendas',
                  'Relatórios de produtividade e resultados'
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start p-3 bg-gray-800/40 rounded-xl backdrop-blur-sm group-hover:bg-gray-800/60 transition-all"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 group-hover:scale-150 transition-transform"></div>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Prospecting Card */}
          <div 
            className="relative bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-xl transition-all duration-500 hover:border-purple-400/50 group overflow-hidden"
            onMouseEnter={() => setExpandedCard('ai')}
            onMouseLeave={() => setExpandedCard(null)}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 via-purple-400/5 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 shadow-[0_0_80px_rgba(168,85,247,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400/20 to-purple-500/20 border border-purple-400/30 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-400/50 transition-all duration-500">
                  <Zap className="w-8 h-8 text-purple-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">IA na Prospecção</h3>
                  <p className="text-xs text-gray-400">Automação Inteligente</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Acelere a construção de listas com IA. Use ferramentas como ChatGPT para pesquisa e automação de qualificação, além de extractors de dados para montar listas eficientes.
              </p>
              
              <div className="space-y-3">
                {[
                  'IA para pesquisa e qualificação (ChatGPT)',
                  'Ferramentas de extração de listas profissionais',
                  'Automação na construção de databases qualificadas',
                  'Economia de tempo em prospecção'
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start p-3 bg-gray-800/40 rounded-xl backdrop-blur-sm group-hover:bg-gray-800/60 transition-all"
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2 group-hover:scale-150 transition-transform"></div>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3-Phase Qualification - Strategic Framework */}
        <div className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-green-400/20 border border-yellow-400/30 rounded-full mb-4">
              <Target className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-xs">Metodologia Estratégica do Pódium</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Os 3 Níveis de Qualificação de Leads
            </h3>
            <p className="text-sm text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Sistema estruturado e progressivo que garante alta taxa de conversão em vendas complexas. 
              Diferencie-se com uma metodologia comprovada.
            </p>
          </div>

          {/* Interactive Timeline Desktop */}
          <div className="hidden lg:grid grid-cols-3 gap-6 mb-12">
            {qualificationPhases.map((phase, index) => {
              const IconComponent = phase.icon;
              const isHovered = hoveredPhase === phase.level;
              const isExpanded = isHovered;
              
              return (
                <div 
                  key={phase.level}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredPhase(phase.level)}
                  onMouseLeave={() => setHoveredPhase(null)}
                >
                  {/* Animated connector line */}
                  {index < qualificationPhases.length - 1 && (
                    <div className="absolute top-6 -right-3 w-full h-0.5 bg-gradient-to-r from-yellow-400/50 via-yellow-400/30 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-shimmer"></div>
                    </div>
                  )}
                  
                  {/* Main card */}
                  <div className={`relative bg-gray-800/40 border ${
                    isHovered ? phase.borderColor + ' border-opacity-100' : 'border-gray-700/50'
                  } rounded-2xl p-6 backdrop-blur-xl transition-all duration-500 ${
                    isHovered ? 'scale-105 shadow-2xl' : 'hover:scale-102'
                  }`}>
                    {/* Glow effect */}
                    {isHovered && (
                      <div className={`absolute inset-0 shadow-[0_0_60px_-10px] ${
                        phase.color.replace('from-', '').replace('to-', '')
                      }/30 rounded-2xl`}></div>
                    )}
                    
                    {/* Level badge with animation */}
                    <div className={`w-14 h-14 bg-gradient-to-br ${phase.color} rounded-full flex items-center justify-center mb-4 shadow-lg mx-auto relative ${
                      isHovered ? 'animate-bounce' : ''
                    }`}>
                      <span className="text-black font-bold text-lg">{phase.level}</span>
                      {/* Pulsing ring */}
                      {isHovered && (
                        <div className={`absolute inset-0 border-2 ${phase.borderColor.replace('/30', '/50')} rounded-full animate-ping`}></div>
                      )}
                    </div>
                    
                    {/* Icon with animation */}
                    <div className={`w-20 h-20 bg-gradient-to-br ${phase.color} border-2 ${phase.borderColor} rounded-2xl flex items-center justify-center mb-4 mx-auto ${
                      isHovered ? 'scale-110 rotate-12' : ''
                    } transition-all duration-500`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-lg font-bold text-white mb-2 text-center">{phase.title}</h4>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-400 text-center mb-4">{phase.description}</p>
                    
                    {/* Expanded details */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="text-xs text-gray-300 leading-relaxed mb-3 bg-gray-800/40 p-3 rounded-lg backdrop-blur-sm">
                        {phase.details}
                      </div>
                      <div className="text-xs font-semibold text-yellow-400 text-center">
                        {phase.metrics}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Timeline Mobile */}
          <div className="lg:hidden space-y-6">
            {qualificationPhases.map((phase, index) => {
              const IconComponent = phase.icon;
              const isExpanded = expandedMobilePhase === phase.level;
              
              return (
                <div key={phase.level} className="relative">
                  {/* Connector Line */}
                  {index < qualificationPhases.length - 1 && (
                    <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400/50 via-yellow-400/30 to-transparent opacity-50"></div>
                  )}
                  
                  <div 
                    className="bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-xl transition-all cursor-pointer hover:border-yellow-400/30"
                    onClick={() => setExpandedMobilePhase(isExpanded ? null : phase.level)}
                  >
                    <div className="p-6">
                      <div className="flex items-start">
                        {/* Level Badge */}
                        <div className={`w-12 h-12 bg-gradient-to-br ${phase.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg relative`}>
                          <span className="text-black font-bold">{phase.level}</span>
                        </div>
                        
                        {/* Content */}
                        <div className="ml-4 flex-1">
                          <div className="flex items-center mb-2">
                            <div className={`w-10 h-10 bg-gradient-to-br ${phase.color} border ${phase.borderColor} rounded-xl flex items-center justify-center mr-3`}>
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <h4 className="text-lg font-bold text-white">{phase.title}</h4>
                          </div>
                          <p className="text-sm text-gray-400 mb-3">{phase.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded details */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-6 pb-6 pt-0">
                        <div className="text-xs text-gray-300 leading-relaxed mb-3 bg-gray-800/60 p-3 rounded-lg">
                          {phase.details}
                        </div>
                        <div className="text-xs font-semibold text-yellow-400 text-center">
                          {phase.metrics}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action with enhanced effects */}
        <div className="mt-20 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <div className="relative bg-gradient-to-r from-yellow-400/10 via-yellow-500/10 to-yellow-400/10 border border-yellow-400/30 rounded-3xl p-10 text-center backdrop-blur-xl overflow-hidden group hover:border-yellow-400/50 transition-all duration-500">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 animate-shimmer"></div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 shadow-[0_0_100px_rgba(234,179,8,0.3)] opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-yellow-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <TrendingUp className="w-8 h-8 text-yellow-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Ferramentas Profissionais = Vendas Profissionais
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
                Aprenda a usar CRM, IA e metodologias estratégicas para escalar sua operação comercial e fechar mais vendas.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="px-4 py-2 bg-gray-800/40 rounded-full text-gray-300">CRM Profissional</div>
                <div className="px-4 py-2 bg-gray-800/40 rounded-full text-gray-300">IA + Gemini</div>
                <div className="px-4 py-2 bg-gray-800/40 rounded-full text-gray-300">Extração de Dados</div>
                <div className="px-4 py-2 bg-gray-800/40 rounded-full text-gray-300">3 Níveis de Qualificação</div>
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

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        .animate-scale-102 {
          transition: transform 0.3s;
        }

        .animate-scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
};
