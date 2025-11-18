'use client';

import React, { useState } from 'react';
import { Linkedin, Instagram, Youtube, Mail, Phone, Award, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { ProtectedImage } from '@/components/ui/ProtectedImage';

export const AboutMentorSection: React.FC = () => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <section id="sobre-mentor" className="py-[75px] bg-gray-900 relative overflow-hidden">
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
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-8 backdrop-blur-md shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <Award className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm uppercase">Sobre o Mentor</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Conheça{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">Rômulo Freitas</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Criador do Método Pódium e especialista em vendas digitais
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Hero Section - Centered Photo */}
          <div className="text-center mb-16 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="relative w-64 h-64 sm:w-96 sm:h-96 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-3xl blur-2xl animate-pulse -z-10"></div>
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-yellow-400/30 shadow-2xl shadow-yellow-400/20 hover:border-yellow-400/60 hover:shadow-yellow-400/40 transition-all duration-300">
                <ProtectedImage 
                  src="/romulo-mentor-destrava.jpg" 
                  alt="Rômulo Freitas" 
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                  quality={85}
                  priority
                />
              </div>
            </div>

            <h3 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Rômulo Freitas
            </h3>
            <p className="text-xl sm:text-2xl text-yellow-400 mb-6 font-semibold">
              Criador do Método Pódium • Fundador e CEO da Combustível Marketing e Vendas
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <a 
                href="https://linkedin.com/in/romulocsfreitas" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-300 hover:text-yellow-400 hover:border-yellow-400/50 hover:bg-yellow-400/10 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                <Linkedin className="w-5 h-5" />
                <span className="font-medium">LinkedIn</span>
              </a>
              <a 
                href="https://instagram.com/romulocsfreitas" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-300 hover:text-yellow-400 hover:border-yellow-400/50 hover:bg-yellow-400/10 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                <Instagram className="w-5 h-5" />
                <span className="font-medium">Instagram</span>
              </a>
              <a 
                href="https://youtube.com/@combustivelmv" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-300 hover:text-yellow-400 hover:border-yellow-400/50 hover:bg-yellow-400/10 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                <Youtube className="w-5 h-5" />
                <span className="font-medium">YouTube</span>
              </a>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-6 sm:gap-12 mb-12">
              {[
                { icon: Award, value: '12+', label: 'Anos de Experiência' },
                { icon: Users, value: '100+', label: 'Pilotos Treinados' },
                { icon: TrendingUp, value: '95%', label: 'Taxa de Sucesso' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center group/stat cursor-pointer"
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 border-2 border-yellow-400/30 rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover/stat:scale-125 group-hover/stat:shadow-lg group-hover/stat:shadow-yellow-400/30 transition-all duration-300">
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                  </div>
                  <p className="text-lg sm:text-2xl font-bold text-white group-hover/stat:text-yellow-400 transition-colors duration-300">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
                  {hoveredStat === index && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-yellow-400/50 animate-ping pointer-events-none"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Bio Card */}
            <div className="bg-gray-800/30 border-2 border-gray-700/50 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 group animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 border-2 border-yellow-400/30 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                    Sobre
                  </h4>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Especialista em vendas digitais com mais de 12 anos de experiência em processos comerciais estruturados. Criador do Método Pódium, uma metodologia comprovada para acelerar vendas em qualquer nicho.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Atua como mentor e consultor para profissionais que querem estruturar seu processo comercial e aumentar suas vendas de forma consistente e escalável.
                </p>
              </div>
            </div>

            {/* Credentials Card */}
            <div className="bg-gray-800/30 border-2 border-gray-700/50 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 group animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 border-2 border-yellow-400/30 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                    Credenciais
                  </h4>
                </div>
                <ul className="space-y-3">
                  {[
                    'Criador do Método Pódium de Vendas',
                    'Founder e CEO da Combustível Marketing e Vendas',
                    'TEDx Organizer',
                    'Especialista em Cold Call e Prospecção',
                    'Consultor em Processos Comerciais',
                    'Fundador da Comunidade Pódium'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 group/item">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5 group-hover/item:scale-125 group-hover/item:shadow-lg group-hover/item:shadow-green-400/30 transition-all duration-300" />
                      <span className="text-gray-300 text-sm group-hover/item:text-white transition-colors duration-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Philosophy Card */}
            <div className="bg-gray-800/30 border-2 border-gray-700/50 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 group animate-fade-in-up" style={{animationDelay: '0.7s'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 border-2 border-yellow-400/30 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                    Filosofia
                  </h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-lg font-semibold text-yellow-400 mb-2">Missão</h5>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Democratizar o acesso a técnicas de vendas de alta performance.
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="text-lg font-semibold text-yellow-400 mb-2">Valores</h5>
                    <ul className="space-y-2">
                      {[
                        'Transparência e honestidade',
                        'Resultados práticos',
                        'Suporte contínuo'
                      ].map((value, index) => (
                        <li key={index} className="flex items-start gap-2 group/item">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5 group-hover/item:scale-125 transition-all duration-300" />
                          <span className="text-gray-300 text-sm group-hover/item:text-white transition-colors duration-300">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-gray-300 text-sm leading-relaxed italic">
                      &ldquo;Vendas é uma habilidade que pode ser aprendida e dominada por qualquer pessoa.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-gray-800/40 border-2 border-yellow-400/30 rounded-3xl p-12 backdrop-blur-xl relative overflow-hidden hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 group animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-yellow-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-3xl font-bold text-white mb-8 group-hover:text-yellow-400 transition-colors duration-300">
                Entre em <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Contato Direto</span>
              </h3>
              <a 
                href="https://wa.me/5531994293099?text=Rômulo,%20quero%20saber%20mais%20sobre%20a%20Escuderia%20Pódium!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-xl rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105"
              >
                <Phone className="w-6 h-6 mr-3" />
                Falar no WhatsApp
              </a>
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
