'use client';

import React from 'react';
import { Video, FileText, Lock, Crown, Key, Calendar, Gift, Monitor, X } from 'lucide-react';

export const PlataformaMundoPodiumSection: React.FC = () => {

  return (
    <section 
      id="plataforma-mundo-podium" 
      className="relative overflow-hidden py-16 md:py-20 bg-gray-900"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Premium */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-purple-400/20 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <Crown className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">Acesso Premium Exclusivo</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Plataforma Mundo Pódium{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">Onde tudo acontece</span>
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/40 border border-gray-700/50 rounded-xl">
                <X className="w-4 h-4 text-gray-500" />
                <span className="text-gray-400 text-xs sm:text-sm">Não é o grupo do WhatsApp</span>
              </div>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <span className="text-yellow-400 text-xs sm:text-sm font-semibold">Plataforma premium paga</span>
            </div>
          </div>

          {/* Conteúdo Exclusivo - 3 Cards Premium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Reuniões e Mentorias */}
            <div className="bg-gradient-to-br from-purple-400/10 to-purple-600/5 border-2 border-purple-400/30 rounded-2xl p-6 backdrop-blur-sm shadow-xl hover:shadow-purple-400/20 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up"
            style={{animationDelay: '0.4s'}}>
              <div className="w-14 h-14 bg-purple-400/20 border border-purple-400/40 rounded-xl flex items-center justify-center mb-4">
                <Video className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Reuniões e Mentorias</h3>
              <p className="text-gray-300 text-sm">
                Gravações exclusivas que não existem em nenhum outro lugar.
              </p>
            </div>

            {/* Documentos e Materiais */}
            <div className="bg-gradient-to-br from-blue-400/10 to-blue-600/5 border-2 border-blue-400/30 rounded-2xl p-6 backdrop-blur-sm shadow-xl hover:shadow-blue-400/20 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up"
            style={{animationDelay: '0.5s'}}>
              <div className="w-14 h-14 bg-blue-400/20 border border-blue-400/40 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Documentos Exclusivos</h3>
              <p className="text-gray-300 text-sm">
                Frameworks, templates e materiais exclusivos da plataforma.
              </p>
            </div>

            {/* Acesso Premium */}
            <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-600/5 border-2 border-yellow-400/30 rounded-2xl p-6 backdrop-blur-sm shadow-xl hover:shadow-yellow-400/20 transition-all duration-300 hover:scale-[1.02] animate-fade-in-up"
            style={{animationDelay: '0.6s'}}>
              <div className="w-14 h-14 bg-yellow-400/20 border border-yellow-400/40 rounded-xl flex items-center justify-center mb-4">
                <Lock className="w-7 h-7 text-yellow-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Acesso Único</h3>
              <p className="text-gray-300 text-sm">
                Conteúdo protegido. Apenas membros pagos têm acesso.
              </p>
            </div>
          </div>

          {/* Valor Premium - Destaque Central */}
          <div className="mb-12 animate-fade-in-up"
          style={{animationDelay: '0.7s'}}>
            <div className="bg-gradient-to-r from-yellow-400/10 via-purple-400/10 to-yellow-400/10 border-2 border-yellow-400/30 rounded-3xl p-6 sm:p-8 backdrop-blur-sm text-center">
              <Crown className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
              <p className="text-white font-bold text-lg mb-3">
                Plataforma onde todos os cursos e mentorias acontecem
              </p>
              <p className="text-gray-300 text-sm mb-4">
                Acesso exclusivo: <span className="text-yellow-400 font-semibold">Membros pagos</span> • <span className="text-yellow-400 font-semibold">Elite</span> • <span className="text-yellow-400 font-semibold">Escuderia</span>
              </p>
              <p className="text-gray-400 text-xs">
                Com o workshop: acesso temporário + gravação do workshop disponível durante o período
              </p>
            </div>
          </div>

          {/* Acesso e Benefícios - Compacto */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up"
          style={{animationDelay: '0.8s'}}>
            <div className="flex items-center space-x-3 p-4 bg-gray-800/40 border border-gray-700/50 rounded-xl">
              <Key className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm">Acesso Imediato</p>
                <p className="text-gray-400 text-xs">Após a compra</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-800/40 border border-gray-700/50 rounded-xl">
              <Calendar className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm">7 Dias de Acesso</p>
                <p className="text-gray-400 text-xs">Até 7 dias após o workshop</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-800/40 border border-gray-700/50 rounded-xl">
              <Gift className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm">Cupom Promocional</p>
                <p className="text-gray-400 text-xs">Para continuidade na comunidade</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
