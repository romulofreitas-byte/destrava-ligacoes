'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

interface SubtleCTAProps {
  text?: string;
  className?: string;
}

export const SubtleCTA: React.FC<SubtleCTAProps> = ({ 
  text = 'Garantir vaga',
  className = ''
}) => {
  const handleClick = () => {
    const element = document.getElementById('inscricao');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`flex justify-center mt-8 ${className}`}>
      <button
        onClick={handleClick}
        className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-800/40 border border-yellow-400/30 text-yellow-400 text-sm font-medium rounded-full hover:bg-yellow-400/10 hover:border-yellow-400/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-yellow-400/20"
      >
        <span>{text}</span>
        <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
      </button>
    </div>
  );
};

