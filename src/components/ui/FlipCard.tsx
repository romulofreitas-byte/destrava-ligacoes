"use client";

import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface FlipCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export const FlipCard: React.FC<FlipCardProps> = ({ icon: IconComponent, title, description, delay = 0 }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="group perspective-1000 cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
      onClick={handleFlip}
    >
      <div 
        className={`relative w-full h-64 transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-gray-800/30 border border-gray-700 rounded-xl p-6 backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-300">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-yellow-400/10 border border-yellow-400/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <IconComponent className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">
              {title}
            </h3>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-yellow-400/10 to-yellow-500/5 border border-yellow-400/50 rounded-xl p-6 backdrop-blur-sm rotate-y-180">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-400/20 border border-yellow-400/40 rounded-xl flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-yellow-400" />
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                ✕
              </button>
            </div>
            <h3 className="text-lg font-bold text-white mb-3">
              {title}
            </h3>
            <p className="text-gray-300 leading-relaxed flex-1">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
