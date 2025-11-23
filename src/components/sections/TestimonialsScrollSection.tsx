'use client';

import React, { useState, useRef } from 'react';
import { MessageSquare } from 'lucide-react';
import { ProtectedImage } from '@/components/ui/ProtectedImage';

// Lista de todos os depoimentos da pasta Testimonials Pódium
const testimonials = [
  '/Testimonials Pódium/IMG_0336.PNG',
  '/Testimonials Pódium/IMG_0337.PNG',
  '/Testimonials Pódium/IMG_0339.PNG',
  '/Testimonials Pódium/IMG_0417.PNG',
  '/Testimonials Pódium/IMG_0450.PNG',
  '/Testimonials Pódium/IMG_0464.PNG',
  '/Testimonials Pódium/IMG_0549.PNG',
  '/Testimonials Pódium/IMG_0576.PNG',
  '/Testimonials Pódium/IMG_0609.PNG',
  '/Testimonials Pódium/IMG_0932.PNG',
  '/Testimonials Pódium/IMG_1241.PNG',
  '/Testimonials Pódium/IMG_1742.PNG',
  '/Testimonials Pódium/IMG_1743.PNG',
  '/Testimonials Pódium/IMG_1867.PNG',
  '/Testimonials Pódium/IMG_2323.PNG',
  '/Testimonials Pódium/IMG_2526.PNG',
  '/Testimonials Pódium/IMG_2695.PNG',
  '/Testimonials Pódium/IMG_2865.PNG',
  '/Testimonials Pódium/IMG_2867.PNG',
  '/Testimonials Pódium/IMG_2868.PNG',
  '/Testimonials Pódium/IMG_2869.PNG',
  '/Testimonials Pódium/IMG_2870.PNG',
  '/Testimonials Pódium/IMG_2872.PNG',
  '/Testimonials Pódium/IMG_3486.PNG',
  '/Testimonials Pódium/IMG_6039.PNG',
  '/Testimonials Pódium/IMG_6301.PNG',
  '/Testimonials Pódium/IMG_7911.PNG',
  '/Testimonials Pódium/IMG_8052.PNG',
  '/Testimonials Pódium/IMG_8264.PNG',
  '/Testimonials Pódium/IMG_8264(1).PNG',
  '/Testimonials Pódium/IMG_8291.PNG',
  '/Testimonials Pódium/IMG_8735.PNG',
  '/Testimonials Pódium/IMG_9469.PNG',
  '/Testimonials Pódium/IMG_9470.PNG',
  '/Testimonials Pódium/IMG_9510.PNG',
  '/Testimonials Pódium/IMG_9582.PNG',
  '/Testimonials Pódium/IMG_9583.PNG',
  '/Testimonials Pódium/IMG_9584.PNG',
  '/Testimonials Pódium/IMG_9755.PNG',
  '/Testimonials Pódium/IMG_9874.PNG',
];

export const TestimonialsScrollSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicar array para criar loop infinito sem "pulo"
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  // Toggle pause/resume - funciona tanto no mobile (onClick) quanto desktop (onMouseEnter/onMouseLeave)
  const handleTogglePause = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPaused(prev => !prev);
  };

  return (
    <section 
      id="depoimentos-scroll" 
      className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 transition-all duration-300 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <MessageSquare className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-xs tracking-wide drop-shadow-sm">Depoimentos Reais</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            O que{' '}
            <span className="text-yellow-400 drop-shadow-md">pilotos da comunidade</span>
            {' '}estão dizendo
          </h2>

          <p className="text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Depoimentos reais de pilotos, mentorados e audiência do YouTube que transformaram suas ligações
          </p>
        </div>

        {/* Scroll Card Container */}
        <div className="max-w-6xl mx-auto">
          <div 
            ref={containerRef}
            className={`bg-gray-800/40 border-2 rounded-3xl p-3 sm:p-6 lg:p-12 backdrop-blur-xl shadow-2xl transition-all duration-300 relative overflow-hidden group ${
              isPaused ? 'border-yellow-400/50' : 'border-gray-700/50 hover:border-yellow-400/50'
            }`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Animated border glow */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 transition-opacity duration-500 animate-shimmer ${
              isPaused ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}></div>
            
            {/* Scroll Container */}
            <div className="relative z-10 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {/* Column 1 */}
                <div className="testimonials-column" style={{ animationDelay: '0s' }}>
                  <div 
                    className={`testimonials-scroll testimonials-scroll-mobile ${isPaused ? 'paused' : ''}`}
                    style={{ animationDuration: '100s' }}
                  >
                    {duplicatedTestimonials.map((testimonial, index) => (
                      <div
                        key={`col1-${index}`}
                        className="mb-2 sm:mb-3 lg:mb-6 bg-gray-900/50 border border-gray-700/30 rounded-xl p-2 sm:p-3 lg:p-3 cursor-pointer select-none"
                        onClick={handleTogglePause}
                      >
                        <div className="relative w-full flex justify-center sm:justify-start">
                          <ProtectedImage
                            src={testimonial}
                            alt={`Depoimento ${index + 1}`}
                            width={250}
                            height={375}
                            className="w-full h-auto rounded-lg object-contain max-w-[250px] sm:max-w-[350px] md:max-w-[400px] mx-auto sm:mx-0 testimonial-image-mobile"
                            loading={index < 25 ? 'eager' : 'lazy'}
                            priority={index < 3}
                            quality={70}
                            sizes="(max-width: 640px) 250px, (max-width: 1024px) 350px, 400px"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2 */}
                <div className="hidden md:block testimonials-column" style={{ animationDelay: '33s' }}>
                  <div 
                    className={`testimonials-scroll ${isPaused ? 'paused' : ''}`}
                    style={{ animationDuration: '117s' }}
                  >
                    {duplicatedTestimonials.map((testimonial, index) => (
                      <div
                        key={`col2-${index}`}
                        className="mb-2 sm:mb-3 lg:mb-6 bg-gray-900/50 border border-gray-700/30 rounded-xl p-2 sm:p-3 lg:p-3 cursor-pointer select-none"
                        onClick={handleTogglePause}
                      >
                        <div className="relative w-full flex justify-center sm:justify-start">
                          <ProtectedImage
                            src={testimonial}
                            alt={`Depoimento ${index + 1}`}
                            width={250}
                            height={375}
                            className="w-full h-auto rounded-lg object-contain max-w-[250px] sm:max-w-[350px] md:max-w-[400px] mx-auto sm:mx-0 testimonial-image-mobile"
                            loading={index < 25 ? 'eager' : 'lazy'}
                            priority={index < 3}
                            quality={70}
                            sizes="(max-width: 640px) 250px, (max-width: 1024px) 350px, 400px"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 3 - Only on desktop */}
                <div className="hidden lg:block testimonials-column" style={{ animationDelay: '67s' }}>
                  <div 
                    className={`testimonials-scroll ${isPaused ? 'paused' : ''}`}
                    style={{ animationDuration: '133s' }}
                  >
                    {duplicatedTestimonials.map((testimonial, index) => (
                      <div
                        key={`col3-${index}`}
                        className="mb-2 sm:mb-3 lg:mb-6 bg-gray-900/50 border border-gray-700/30 rounded-xl p-2 sm:p-3 lg:p-3 cursor-pointer select-none"
                        onClick={handleTogglePause}
                      >
                        <div className="relative w-full flex justify-center sm:justify-start">
                          <ProtectedImage
                            src={testimonial}
                            alt={`Depoimento ${index + 1}`}
                            width={250}
                            height={375}
                            className="w-full h-auto rounded-lg object-contain max-w-[250px] sm:max-w-[350px] md:max-w-[400px] mx-auto sm:mx-0 testimonial-image-mobile"
                            loading={index < 25 ? 'eager' : 'lazy'}
                            priority={index < 3}
                            quality={70}
                            sizes="(max-width: 640px) 250px, (max-width: 1024px) 350px, 400px"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonials-column {
          height: 650px;
          overflow: hidden;
          position: relative;
        }

        .testimonials-scroll {
          display: flex;
          flex-direction: column;
          animation: scroll-up linear infinite;
          will-change: transform;
        }

        .testimonials-scroll.paused {
          animation-play-state: paused;
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @media (max-width: 1024px) {
          .testimonials-column {
            height: 600px;
          }
        }

        @media (max-width: 768px) {
          .testimonials-column {
            height: 450px;
          }
          
          .testimonials-scroll-mobile {
            animation-duration: 168s !important;
          }
        }
      `}</style>
    </section>
  );
};

