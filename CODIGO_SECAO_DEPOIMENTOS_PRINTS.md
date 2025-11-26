# Código Completo - Seção de Depoimentos com Prints

Este arquivo contém todo o código necessário para replicar a seção de depoimentos com prints em outra página do mundo pódium.

## 📁 Arquivo 1: TestimonialsScrollSection.tsx

```tsx
'use client';

import React, { useState, useRef, useMemo } from 'react';
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

  // Gerar posições iniciais aleatórias para cada coluna (apenas desktop)
  const initialPositions = useMemo(() => {
    // Valores aleatórios entre 0% e 50% (já que a animação vai de 0% a -50%)
    return {
      col1: Math.random() * 50,
      col2: Math.random() * 50,
      col3: Math.random() * 50,
    };
  }, []); // Gerar apenas uma vez quando o componente monta

  // Toggle pause/resume - funciona com onMouseDown para capturar o evento imediatamente
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
              isPaused ? 'border-yellow-400/50' : 'border-gray-700/50'
            }`}
            onMouseEnter={() => {
              // Pause apenas no desktop (lg+)
              if (window.innerWidth >= 1024) {
                setIsPaused(true);
              }
            }}
            onMouseLeave={() => {
              // Resume apenas no desktop (lg+)
              if (window.innerWidth >= 1024) {
                setIsPaused(false);
              }
            }}
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
                    className={`testimonials-scroll testimonials-scroll-mobile testimonials-scroll-col1 ${isPaused ? 'paused' : ''}`}
                    style={{
                      '--initial-offset': `-${initialPositions.col1}%`
                    } as React.CSSProperties}
                  >
                    {duplicatedTestimonials.map((testimonial, index) => (
                      <div
                        key={`col1-${index}`}
                        className="mb-2 sm:mb-3 lg:mb-6 bg-gray-900/50 border border-gray-700/30 rounded-xl p-2 sm:p-3 lg:p-3 cursor-pointer select-none"
                        onMouseDown={handleTogglePause}
                      >
                        <div className="relative w-full flex justify-center sm:justify-start md:justify-center">
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
                    className={`testimonials-scroll testimonials-scroll-col2 ${isPaused ? 'paused' : ''}`}
                    style={{
                      '--initial-offset': `-${initialPositions.col2}%`
                    } as React.CSSProperties}
                  >
                    {duplicatedTestimonials.map((testimonial, index) => (
                      <div
                        key={`col2-${index}`}
                        className="mb-2 sm:mb-3 lg:mb-6 bg-gray-900/50 border border-gray-700/30 rounded-xl p-2 sm:p-3 lg:p-3 cursor-pointer select-none"
                        onMouseDown={handleTogglePause}
                      >
                        <div className="relative w-full flex justify-center sm:justify-start md:justify-center">
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
                    className={`testimonials-scroll testimonials-scroll-col3 ${isPaused ? 'paused' : ''}`}
                    style={{
                      '--initial-offset': `-${initialPositions.col3}%`
                    } as React.CSSProperties}
                  >
                    {duplicatedTestimonials.map((testimonial, index) => (
                      <div
                        key={`col3-${index}`}
                        className="mb-2 sm:mb-3 lg:mb-6 bg-gray-900/50 border border-gray-700/30 rounded-xl p-2 sm:p-3 lg:p-3 cursor-pointer select-none"
                        onMouseDown={handleTogglePause}
                      >
                        <div className="relative w-full flex justify-center sm:justify-start md:justify-center">
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
          animation-fill-mode: both;
        }

        /* Aplicar offset inicial apenas no desktop */
        @media (min-width: 1024px) {
          .testimonials-scroll-col1,
          .testimonials-scroll-col2,
          .testimonials-scroll-col3 {
            transform: translateY(var(--initial-offset, 0%));
          }
        }

        .testimonials-scroll.paused {
          animation-play-state: paused !important;
        }

        /* Durações para desktop/tablet (aumentadas em 40%) */
        @media (min-width: 768px) {
          .testimonials-scroll-col1 {
            animation-duration: 140s;
          }
          .testimonials-scroll-col2 {
            animation-duration: 164s;
          }
          .testimonials-scroll-col3 {
            animation-duration: 186s;
          }
        }

        @keyframes scroll-up {
          0% {
            transform: translateY(var(--initial-offset, 0%));
          }
          100% {
            transform: translateY(calc(var(--initial-offset, 0%) - 50%));
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
```

## 📁 Arquivo 2: ProtectedImage.tsx

```tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';

interface ProtectedImageProps extends Omit<ImageProps, 'onContextMenu' | 'onDragStart' | 'onSelectStart' | 'onCopy' | 'alt'> {
  className?: string;
  alt: string;
}

export const ProtectedImage: React.FC<ProtectedImageProps> = ({ 
  className = '', 
  alt,
  fill,
  ...props 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Prevent drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Prevent text selection around image
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Prevent copy
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    // Prevent screenshot attempts (limited protection)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block common screenshot shortcuts (limited effectiveness)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
      }
      // Block Print Screen (limited effectiveness)
      if (e.key === 'PrintScreen') {
        e.preventDefault();
      }
    };

    // Add overlay to prevent direct image access
    const handleMouseDown = (e: MouseEvent) => {
      // Prevent image selection on click
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    container.addEventListener('contextmenu', handleContextMenu);
    container.addEventListener('dragstart', handleDragStart);
    container.addEventListener('selectstart', handleSelectStart);
    container.addEventListener('copy', handleCopy);
    container.addEventListener('keydown', handleKeyDown);
    container.addEventListener('mousedown', handleMouseDown);

    // CSS-based protection
    container.style.userSelect = 'none';
    container.style.webkitUserSelect = 'none';
    (container.style as any).webkitUserDrag = 'none';
    container.style.pointerEvents = 'auto';

    return () => {
      container.removeEventListener('contextmenu', handleContextMenu);
      container.removeEventListener('dragstart', handleDragStart);
      container.removeEventListener('selectstart', handleSelectStart);
      container.removeEventListener('copy', handleCopy);
      container.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const imageStyle: React.CSSProperties & { WebkitUserDrag?: string; userDrag?: string; WebkitTouchCallout?: string } = {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    WebkitUserDrag: 'none',
    userDrag: 'none',
    pointerEvents: 'none',
    WebkitTouchCallout: 'none',
  };

  if (fill) {
    return (
      <div 
        ref={containerRef}
        className="relative w-full h-full select-none protected-image"
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        {/* Transparent overlay to make direct image access harder */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
        <Image
          {...props}
          alt={alt}
          fill={fill}
          className={className}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          style={imageStyle}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative select-none protected-image ${className}`}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Transparent overlay to make direct image access harder */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />
      <Image
        {...props}
        alt={alt}
        fill={fill}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        style={imageStyle}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
```

## 📋 Estilos Globais Necessários (globals.css)

Certifique-se de que seu arquivo `globals.css` contém as seguintes classes e animações:

```css
/* Container customizado */
.container-custom {
  @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Animação fade-in-up */
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}

/* Animação shimmer */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

/* Animação float */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

/* Proteção de imagens */
.protected-image {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}

.protected-image img {
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}
```

## 📦 Dependências Necessárias

Certifique-se de ter instalado:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "next": "^14.0.0",
    "lucide-react": "^0.294.0",
    "tailwindcss": "^3.0.0"
  }
}
```

## 🎯 Como Usar

1. **Copie o componente `TestimonialsScrollSection.tsx`** para a pasta `src/components/sections/` (ou onde você organiza seus componentes)

2. **Copie o componente `ProtectedImage.tsx`** para a pasta `src/components/ui/` (ou ajuste o import no TestimonialsScrollSection)

3. **Ajuste o caminho das imagens** no array `testimonials` conforme a estrutura de pastas do seu projeto

4. **Importe e use o componente** na sua página:

```tsx
import { TestimonialsScrollSection } from '@/components/sections/TestimonialsScrollSection';

export default function MinhaPage() {
  return (
    <>
      {/* Outros componentes */}
      <TestimonialsScrollSection />
      {/* Outros componentes */}
    </>
  );
}
```

## 📱 Responsividade

- **Mobile (< 768px)**: 1 coluna, altura 450px, scroll mais lento (168s)
- **Tablet (768px - 1023px)**: 2 colunas, altura 600px, velocidades diferentes (140s/164s)
- **Desktop (≥ 1024px)**: 3 colunas, altura 650px, 3 velocidades diferentes (140s/164s/186s)

## ✨ Funcionalidades

- ✅ Scroll infinito vertical automático
- ✅ Pausa ao passar o mouse (apenas desktop)
- ✅ Velocidades diferentes por coluna para efeito natural
- ✅ Posições iniciais aleatórias (desktop)
- ✅ Imagens protegidas contra download/cópia
- ✅ Responsivo completo (mobile, tablet, desktop)
- ✅ Animações suaves e efeitos visuais
- ✅ Performance otimizada com lazy loading

## 🔧 Personalização

Você pode personalizar:

- **Cores**: Altere as classes `yellow-400`, `yellow-500` para outras cores
- **Velocidades**: Ajuste os valores de `animation-duration` no `<style jsx>`
- **Altura das colunas**: Modifique os valores de `height` nas media queries
- **Texto do header**: Altere os textos dentro do componente
- **Lista de imagens**: Modifique o array `testimonials` com seus próprios caminhos






