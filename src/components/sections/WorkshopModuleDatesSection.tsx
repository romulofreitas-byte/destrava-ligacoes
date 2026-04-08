'use client';

import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { WORKSHOP_INFO, WORKSHOP_MODULE_2_INFO } from '@/lib/constants';

export const WorkshopModuleDatesSection: React.FC = () => {
  return (
    <section
      id="datas-modulos"
      className="relative overflow-hidden py-16 md:py-20 bg-gray-900 border-t border-gray-800/80"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400/20 to-yellow-400/20 border border-green-400/30 rounded-full mb-5 backdrop-blur-md shadow-lg shadow-green-400/10">
            <Calendar className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-green-400 font-semibold text-xs tracking-wide drop-shadow-sm">
              Calendário dos módulos
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
            Quando acontece{' '}
            <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
              cada módulo
            </span>
          </h2>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            O workshop é em dois encontros ao vivo, em dias diferentes, sempre no mesmo horário.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border-2 border-green-400/40 bg-gray-800/40 backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-green-400/5 hover:border-green-400/60 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-400/15 border border-green-400/35 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-green-400 text-xs font-semibold tracking-wide uppercase">Módulo 1</p>
                <p className="text-white font-bold text-lg">Preparação e fundação</p>
              </div>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-white mb-1 tabular-nums">
              {WORKSHOP_INFO.dateDisplayShort}
            </p>
            <p className="text-gray-300 text-sm mb-4">{WORKSHOP_INFO.date}</p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock className="w-4 h-4 text-green-400/80 flex-shrink-0" />
              <span>{WORKSHOP_INFO.time} (BRT)</span>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-yellow-400/40 bg-gray-800/40 backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-yellow-400/5 hover:border-yellow-400/60 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-400/15 border border-yellow-400/35 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-yellow-400 text-xs font-semibold tracking-wide uppercase">Módulo 2</p>
                <p className="text-white font-bold text-lg">Sala de ligação</p>
              </div>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-white mb-1 tabular-nums">
              {WORKSHOP_MODULE_2_INFO.dateDisplayShort}
            </p>
            <p className="text-gray-300 text-sm mb-4">{WORKSHOP_MODULE_2_INFO.date}</p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock className="w-4 h-4 text-yellow-400/80 flex-shrink-0" />
              <span>{WORKSHOP_MODULE_2_INFO.time} (BRT)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
