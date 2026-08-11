"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  fullContent?: string;
  company?: string;
  results?: string[];
}

interface TestimonialCarouselProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials: Testimonial[] = [
    {
      name: "Thiago Rosa",
      role: "Gestor de Tráfego",
      content: "A mentoria é muito melhor que os vídeos do Youtube, muito diferente, sinto que o Rômulo pega na mão da gente mesmo",
      fullContent: "A mentoria é muito melhor que os vídeos do Youtube, muito diferente, sinto que o Rômulo pega na mão da gente mesmo. O acompanhamento é personalizado e ele realmente se importa com o sucesso de cada piloto. Recomendo para quem quer resultados reais.",
      rating: 5,
      avatar: "/depoimentos/mentoria-thiago-rosa-live.jpg",
      company: "Agência Digital",
      results: ["Primeiro contrato fechado em 4 semanas", "Aumento de 300% na confiança", "Processo comercial estruturado"]
    },
    {
      name: "Vinícius Nascimento", 
      role: "Web Development",
      content: "Mestre, olha só o tanto de problema que você me arrumou",
      fullContent: "Mestre, olha só o tanto de problema que você me arrumou! Mas são problemas bons, problemas de crescimento. Antes eu não sabia nem por onde começar, agora tenho um processo claro e já fechei meu primeiro projeto grande.",
      rating: 5,
      avatar: "/depoimentos/depoimento-vinicius.jpg",
      company: "Freelancer",
      results: ["Primeiro projeto de R$ 15.000", "Pipeline de 5 clientes potenciais", "Confiança para negociar valores altos"]
    },
    {
      name: "Marina Marchiolli",
      role: "Branding Specialist",
      content: "Hoje eu me sinto Empresária. Com sinceridade, eu nunca achei que eu iria conseguir fechar um contrato sozinha, e eu consegui!",
      fullContent: "Hoje eu me sinto Empresária. Com sinceridade, eu nunca achei que eu iria conseguir fechar um contrato sozinha, e eu consegui! A transformação foi incrível - de freelancer insegura para empresária confiante. O Método Pódium mudou minha vida profissional.",
      rating: 5,
      avatar: "/depoimentos/depoimento-marina.jpg",
      company: "Agência de Branding",
      results: ["3 contratos fechados em 8 semanas", "Aumento de 200% na receita", "Confiança total para fazer ligações"]
    }
  ];

  const nextTestimonial = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, testimonials.length]);

  const prevTestimonial = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, testimonials.length]);

  const goToTestimonial = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowLeft') {
        prevTestimonial();
      } else if (e.key === 'ArrowRight') {
        nextTestimonial();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, nextTestimonial, prevTestimonial]);

  // Close modal on escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            Depoimentos de Pilotos
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Testimonial Card */}
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-8 backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-300">
              {/* Profile */}
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-yellow-400/30">
                  <Image 
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{currentTestimonial.name}</h3>
                  <p className="text-yellow-400 text-lg mb-2">{currentTestimonial.role}</p>
                  {currentTestimonial.company && (
                    <p className="text-gray-400 text-sm">{currentTestimonial.company}</p>
                  )}
                  <div className="flex space-x-1 mt-2">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mb-8">
                <blockquote className="text-gray-300 text-lg leading-relaxed italic mb-6">
                  &ldquo;{currentTestimonial.fullContent || currentTestimonial.content}&rdquo;
                </blockquote>
                
                {/* Results */}
                {currentTestimonial.results && (
                  <div>
                    <h4 className="text-white font-semibold mb-4">Principais Resultados:</h4>
                    <ul className="space-y-2">
                      {currentTestimonial.results.map((result, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="text-gray-300">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Previous Button */}
            <button
              onClick={prevTestimonial}
              disabled={isAnimating}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-yellow-400/50 transition-all duration-300 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">Anterior</span>
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-yellow-400 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextTestimonial}
              disabled={isAnimating}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-yellow-400/50 transition-all duration-300 disabled:opacity-50"
            >
              <span className="text-gray-400">Próximo</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Counter */}
          <div className="text-center mt-4">
            <span className="text-gray-400 text-sm">
              {currentIndex + 1} de {testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
