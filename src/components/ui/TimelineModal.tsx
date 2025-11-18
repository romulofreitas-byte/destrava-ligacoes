"use client";

import React, { useEffect, useState } from 'react';
import { X, CheckCircle, Clock, Calendar } from 'lucide-react';

interface TimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TimelineModal: React.FC<TimelineModalProps> = ({ isOpen, onClose }) => {
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Animate items sequentially
      const timeouts = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500].map((delay, index) =>
        setTimeout(() => {
          setAnimatedItems(prev => [...prev, index]);
        }, delay)
      );

      return () => timeouts.forEach(clearTimeout);
    } else {
      setAnimatedItems([]);
    }
  }, [isOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const milestones = [
    {
      week: 6,
      title: "Após 6 Semanas Intensivas",
      items: [
        "Primeiro contrato fechado (ou muito perto)",
        "Processo comercial estruturado", 
        "Scripts validados e funcionando",
        "Confiança para fazer ligações"
      ],
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-400/30",
      iconColor: "text-blue-400"
    },
    {
      week: 10,
      title: "Após 10 Semanas Completas",
      items: [
        "2-3 contratos fechados",
        "Pipeline estruturado",
        "Processo replicável", 
        "Pronto para escalar"
      ],
      color: "from-yellow-500/20 to-yellow-600/20",
      borderColor: "border-yellow-400/30",
      iconColor: "text-yellow-400"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-400/10 border border-yellow-400/30 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Cronograma de Resultados
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400/50 to-yellow-400/50 rounded-full"></div>
            
            {/* Milestones */}
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br ${milestone.color} border ${milestone.borderColor} rounded-full flex items-center justify-center z-10 ${
                    animatedItems.includes(index) ? 'scale-110' : 'scale-0'
                  } transition-transform duration-500`}>
                    <span className={`text-lg font-bold ${milestone.iconColor}`}>
                      {milestone.week}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div className={`w-5/12 ${
                    index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'
                  }`}>
                    <div className={`bg-gray-800/30 border border-gray-700 rounded-xl p-6 backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-300 ${
                      animatedItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    } transition-all duration-500`}>
                      <div className="flex items-center space-x-3 mb-4">
                        <Clock className={`w-5 h-5 ${milestone.iconColor}`} />
                        <h3 className="text-xl font-bold text-white">
                          {milestone.title}
                        </h3>
                      </div>
                      
                      <ul className="space-y-3">
                        {milestone.items.map((item, itemIndex) => (
                          <li 
                            key={itemIndex}
                            className={`flex items-center space-x-3 ${
                              index % 2 === 0 ? 'flex-row-reverse space-x-reverse' : ''
                            } ${
                              animatedItems.includes(index + 2 + itemIndex) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                            } transition-all duration-300`}
                            style={{ transitionDelay: `${(index + 2 + itemIndex) * 100}ms` }}
                          >
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-12 bg-gradient-to-r from-yellow-400/10 to-yellow-500/5 border border-yellow-400/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 text-center">
              Resumo da Jornada
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-6 h-6 bg-blue-400/20 border border-blue-400/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-400 text-sm font-bold">6</span>
                </div>
                <span className="text-gray-300">Primeiro contrato fechado</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-6 h-6 bg-yellow-400/20 border border-yellow-400/30 rounded-full flex items-center justify-center">
                  <span className="text-yellow-400 text-sm font-bold">10</span>
                </div>
                <span className="text-gray-300">Pronto para escalar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
