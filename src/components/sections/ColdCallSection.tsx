'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Phone, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import Image from 'next/image';
import { VideoModal } from '@/components/ui/VideoModal';
import { trackViewContent, trackVideoOpen } from '@/lib/metaPixel';

export const ColdCallSection: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);

  // Track section view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            trackViewContent('Cold Call Section', 'cold-call');
            hasTrackedView.current = true;
          }
        });
      },
      { threshold: 0.3 }
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleVideoOpen = () => {
    setIsVideoOpen(true);
    trackVideoOpen('Cold Calls que Fecham Contratos', 'cold-call-video');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const painPoints = [
    {
      icon: AlertTriangle,
      text: "Travado na hora da ligação?",
      description: "Você sabe que precisa ligar, mas fica procrastinando"
    },
    {
      icon: Phone,
      text: "Não sabe o que dizer?",
      description: "Fica sem palavras quando o cliente atende"
    },
    {
      icon: AlertTriangle,
      text: "Medo da rejeição?",
      description: "Prefere não ligar do que ouvir um 'não'"
    }
  ];

  return (
    <section ref={sectionRef} id="cold-call" className="relative overflow-hidden py-12 md:py-[75px] bg-gray-900">
      {/* Background with purple/blue glassmorphism */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-400/8 to-blue-400/8 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <motion.div 
        className="container-custom relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-400/20 to-blue-400/10 border border-purple-400/30 rounded-full backdrop-blur-md shadow-lg shadow-purple-400/20 hover:shadow-purple-400/40 transition-all duration-300">
              <Zap className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-purple-400 font-bold text-sm tracking-wide drop-shadow-sm">Aprenda a Ligar</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h2 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight drop-shadow-lg"
          >
            O Segredo Que{' '}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md animate-shimmer bg-[length:200%_auto]">
              Transforma
            </span>{' '}
            Suas Ligações
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 mb-12 leading-relaxed drop-shadow-md max-w-3xl mx-auto"
          >
            A Cold Call é o coração do Método Pódium. Enquanto outros evitam ligações, 
            você vai dominar essa habilidade e fechar contratos que outros só sonham.
          </motion.p>

          {/* Pain Points Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {painPoints.map((point, index) => {
              const IconComponent = point.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 text-center hover:border-purple-400/50 transition-all duration-300 backdrop-blur-xl hover:shadow-lg hover:shadow-purple-400/20"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400/20 to-blue-400/10 border border-purple-400/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <IconComponent className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{point.text}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{point.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Video Section */}
          <motion.div 
            variants={itemVariants}
            className="mb-16"
          >
            <div className="bg-gray-800/30 border-2 border-purple-400/30 rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl backdrop-blur-xl hover:border-purple-400/50 hover:shadow-purple-400/30 transition-all duration-300 relative overflow-hidden">
              {/* Glassmorphism glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-blue-400/5 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Veja Como Eu Faço{' '}
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Cold Calls Reais</span>
                  </h3>
                  <p className="text-gray-300 text-lg">
                    Compilado das minhas melhores ligações de vendas no YouTube
                  </p>
                </div>

              {/* Video Thumbnail */}
              <div className="relative group cursor-pointer" onClick={handleVideoOpen}>
                <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-purple-400/40 hover:border-purple-400/70 transition-all duration-300 shadow-xl shadow-purple-400/20">
                  {/* Video Thumbnail Image */}
                  <Image
                    src="/thumb-cold-call.jpg"
                    alt="Compilado de Cold Calls - Método Pódium"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    quality={80}
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 group-hover:scale-110 group-hover:shadow-purple-500/70 transition-all duration-300 relative">
                      {/* Yellow accent ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-yellow-400/30 animate-pulse"></div>
                      <Play className="w-8 h-8 text-white ml-1 relative z-10" fill="currentColor" />
                    </div>
                  </div>

                  {/* Video Info - Hidden on mobile */}
                  <div className="absolute bottom-6 left-6 right-6 hidden md:block">
                    <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4">
                      <h4 className="text-white font-semibold text-lg mb-2">
                        Cold Calls que Fecham Contratos
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Técnicas reais aplicadas em ligações de vendas
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">+100</div>
                  <div className="text-gray-300 text-sm">Ligações Reais</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">100%</div>
                  <div className="text-gray-300 text-sm">Técnicas Aplicadas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">Real</div>
                  <div className="text-gray-300 text-sm">Sem Roteiros</div>
                </div>
              </div>
              </div>
            </div>
          </motion.div>

          {/* Solution Section */}
          <motion.div 
            variants={itemVariants}
            className="mb-16"
          >
            <div className="bg-gray-800/40 border-2 border-purple-400/30 rounded-3xl p-12 max-w-4xl mx-auto backdrop-blur-xl shadow-xl hover:shadow-purple-400/20 transition-all duration-300 relative overflow-hidden">
              {/* Glassmorphism effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-blue-400/10"></div>
              <div className="relative z-10">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-6">
                    No Método Pódium, Você Vai{' '}
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Dominar</span> o Cold Call
                  </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-white font-semibold mb-2">Scripts que Funcionam</h4>
                        <p className="text-gray-300 text-sm">Frases testadas que abrem portas e geram interesse</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-white font-semibold mb-2">Técnicas de Persuasão</h4>
                        <p className="text-gray-300 text-sm">Como convencer sem ser invasivo ou agressivo</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-white font-semibold mb-2">Superar Objeções</h4>
                        <p className="text-gray-300 text-sm">Respostas para as principais objeções de mercado</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-white font-semibold mb-2">Prática Real</h4>
                        <p className="text-gray-300 text-sm">Sala de ligação para treinar com mentoria</p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div 
            variants={itemVariants}
            className="mb-12"
          >
            <a 
              href="https://forms.gle/G3uCBJChkXk65K8i9"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-6 md:px-12 py-3 md:py-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-base md:text-xl rounded-full transition-all duration-300 hover:from-purple-600 hover:to-blue-600 shadow-lg md:shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 backdrop-blur-sm border border-yellow-400/20"
            >
              <span className="relative drop-shadow-sm">Entrar na Lista de Espera</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <p className="text-gray-400 mt-4 text-sm">
              Vagas esgotadas — entre na lista e seja avisado da próxima
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="https://youtu.be/lqhlmMbF7HI"
        title="Cold Calls que Fecham Contratos - Compilado"
      />
    </section>
  );
};
