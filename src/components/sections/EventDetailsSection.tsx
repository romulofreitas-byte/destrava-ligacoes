'use client';

import React from 'react';
import { Calendar, Clock, Video, MapPin } from 'lucide-react';

export const EventDetailsSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-12 md:py-16 bg-gray-900">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800/40 border-2 border-yellow-400/50 rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-sm shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 relative overflow-hidden group">
            {/* Animated border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20">
                  <span className="text-yellow-400 font-semibold text-xs tracking-wide">Informações do Evento</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  Detalhes do{' '}
                  <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">Workshop</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Data */}
                <div className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Data</h3>
                    <p className="text-gray-300 text-sm">10 de Dezembro de 2025</p>
                  </div>
                </div>

                {/* Duração */}
                <div className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Duração</h3>
                    <p className="text-gray-300 text-sm">3 horas intensas</p>
                  </div>
                </div>

                {/* Formato */}
                <div className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Formato</h3>
                    <p className="text-gray-300 text-sm">Online • Transmissão ao vivo</p>
                  </div>
                </div>

                {/* Horário */}
                <div className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Horário</h3>
                    <p className="text-gray-300 text-sm">13h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

