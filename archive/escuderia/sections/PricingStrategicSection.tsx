'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Users, Award, Bot, Phone, Zap, Shield, TrendingUp, Calculator, Star, AlertTriangle, MessageCircle, CreditCard, Banknote } from 'lucide-react';
import Image from 'next/image';
import { trackViewContent, trackWhatsAppClick } from '@/lib/metaPixel';

export const PricingStrategicSection: React.FC = () => {
  const [progressWidth, setProgressWidth] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    // Small delay to ensure animation is visible
    const timer = setTimeout(() => {
      setProgressWidth(110);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Track section view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            trackViewContent('Pricing Strategic Section', 'pricing');
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

  const includedFeatures = [
    '6 encontros em grupo (2 horas cada = 12 horas)',
    '4 sessões individuais (1 hora cada = 4 horas)',
    'Acesso ao Agente Pódium durante todo o programa',
    'Acesso à Sala de Ligação da Escuderia',
    'Materiais e templates do Método Pódium',
    'Comunidade de pilotos para networking',
    'Suporte contínuo durante 10 semanas',
    'Certificação "Piloto Pódium - Escuderia"'
  ];

  const bonusValues = [
    { name: 'Agente Pódium', value: 'R$ 2.000', icon: Bot },
    { name: 'Sala de Ligação', value: 'R$ 1.500', icon: Phone },
    { name: 'Comunidade', value: 'R$ 1.000', icon: Users },
    { name: 'Certificação', value: 'R$ 500', icon: Award }
  ];

  // Checkout tracking removido no estado esgotado

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Pricing Strategic Section', 'Pricing WhatsApp');
  };

  return (
    <section ref={sectionRef} id="investimento-estrategico" className="relative overflow-hidden py-20 md:py-[75px] bg-gray-900">
      {/* Background with gradient similar to hero */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/70"></div>
      </div>

      <motion.div 
        className="container-custom relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header com Urgência */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-6 backdrop-blur-sm shadow-lg animate-pulse">
            <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
            <span className="text-red-400 font-semibold text-xs tracking-wide">Vagas Esgotadas — Promo BF 1ª Turma Encerrada</span>
          </div>
          
          <h2 className="text-xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Sua Jornada Para o{' '}
            <span className="text-yellow-400 animate-pulse">Primeiro&nbsp;Contrato</span>
            {' '}Começa&nbsp;Agora
          </h2>
          
          <p className="text-sm sm:text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Junte-se à primeira turma da Escuderia Pódium e transforme seu processo comercial em apenas{' '}
            <span className="text-yellow-400 font-semibold">6&nbsp;semanas intensivas</span>
            {' '}+ 4 encontros mensais
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between text-[11px] sm:text-sm mb-2">
              <span className="text-gray-300">Vagas esgotadas</span>
              <span className="text-red-400 font-semibold animate-pulse">110%</span>
            </div>
            <div className="w-full h-[6px] sm:h-2 bg-gray-800 rounded-full overflow-hidden relative shadow-inner">
              {/* Filled portion */}
              <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000" style={{width: `${progressWidth}%`}}></div>
              {/* Continuous flow animation across entire bar */}
              <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-red-300/40 to-transparent animate-progress-flow"></div>
            </div>
          </div>
        </motion.div>

        {/* Card Principal de Preço */}
        <motion.div 
          variants={itemVariants}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gray-800/30 border-2 border-yellow-400/50 rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-sm shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 relative overflow-hidden">
            {/* Borda animada */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                {/* Ancoragem */}
                <div className="flex justify-center items-center gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Elite Pódium Individual</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-500 line-through">R$ 10.000</p>
                  </div>
                  <div className="text-center">
                    <p className="text-yellow-400 text-sm font-semibold">Escuderia Pódium (Grupo)</p>
                    <p className="text-3xl sm:text-5xl font-black text-yellow-400">R$ 1.850</p>
                  </div>
                </div>
                
                {/* Payment Information */}
                <div className="mb-6 space-y-3">
                  <p className="text-gray-300 text-xl font-semibold">
                    ou 12x de <span className="text-yellow-400">R$ 154,17</span> no cartão de crédito
                  </p>
                  
                  {/* Payment Methods */}
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/40 rounded-lg border border-gray-600">
                      <CreditCard className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300 text-xs">Cartão de Crédito</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/40 rounded-lg border border-gray-600">
                      <Banknote className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300 text-xs">Cartão de Débito</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/40 rounded-lg border border-gray-600">
                      <Phone className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300 text-xs">PIX</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/40 rounded-lg border border-gray-600">
                      <Banknote className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300 text-xs">Boleto</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm">
                    Pagamento processado pela Hotmart
                  </p>
                </div>
                
                <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-4">
                  <span className="text-green-400 font-bold text-sm">Economize R$ 8.150 (81% OFF)</span>
                </div>
                
                <p className="text-gray-300 text-lg mb-2">
                  <span className="text-yellow-400 font-semibold">Mesmo método</span>, formato em grupo
                </p>
              </div>

              {/* Grid de Benefícios Visuais */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                  <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-white font-bold text-lg">16h</p>
                  <p className="text-gray-400 text-xs">Mentoria</p>
                </div>
                <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                  <Bot className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-white font-bold text-lg">R$ 2.000</p>
                  <p className="text-gray-400 text-xs">Agente IA</p>
                </div>
                <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                  <Phone className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-white font-bold text-lg">R$ 1.500</p>
                  <p className="text-gray-400 text-xs">Sala Ligação</p>
                </div>
                <div className="text-center p-4 bg-gray-700/30 rounded-xl">
                  <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-white font-bold text-lg">R$ 1.000</p>
                  <p className="text-gray-400 text-xs">Comunidade</p>
                </div>
              </div>

              {/* Total de Bônus */}
              <div className="text-center mb-8 p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-xl">
                <p className="text-gray-300 mb-1">Valor Total dos Bônus:</p>
                <p className="text-3xl font-bold text-yellow-400">R$ 5.000</p>
                <p className="text-gray-400 text-sm">Inclusos gratuitamente</p>
              </div>

              {/* CTA Principal - Lista de Espera */}
              <div className="text-center mb-8">
                <a 
                  href="https://forms.gle/G3uCBJChkXk65K8i9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-red-500 to-red-600 text-white font-black text-base sm:text-xl rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-2xl hover:shadow-red-500/40 hover:scale-105"
                >
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  <span>Entrar na Lista de Espera</span>
                </a>
                
                {/* Payment Info Near CTA */}
                <div className="mt-4 space-y-2">
                  <p className="text-gray-400 text-xs sm:text-base">
                    Promoção da 1ª turma encerrada • Preço exibido para referência
                  </p>
                  
                  {/* Compact Payment Methods */}
                  <div className="hidden sm:flex flex-wrap items-center justify-center gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-700/40 rounded border border-gray-600">
                      <CreditCard className="w-3 h-3 text-yellow-400" />
                      <span className="text-gray-400 text-xs">Crédito</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-700/40 rounded border border-gray-600">
                      <Banknote className="w-3 h-3 text-yellow-400" />
                      <span className="text-gray-400 text-xs">Débito</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-700/40 rounded border border-gray-600">
                      <Phone className="w-3 h-3 text-yellow-400" />
                      <span className="text-gray-400 text-xs">PIX</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-700/40 rounded border border-gray-600">
                      <Banknote className="w-3 h-3 text-yellow-400" />
                      <span className="text-gray-400 text-xs">Boleto</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-xs sm:text-sm">
                    ✓ Vagas limitadas • ✓ Garantia de 7 dias • Pagamento processado pela Hotmart
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Garantias e Redutores de Risco */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 bg-gray-800/40 border border-gray-700/50 rounded-xl backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-300 shadow-lg hover:shadow-yellow-400/20">
            <Shield className="w-10 h-10 text-green-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Garantia 7 Dias</h3>
            <p className="text-gray-400 text-sm">Teste sem compromisso</p>
          </div>
          <div className="text-center p-6 bg-gray-800/40 border border-gray-700/50 rounded-xl backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-300 shadow-lg hover:shadow-yellow-400/20">
            <Award className="w-10 h-10 text-green-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Satisfação Garantida</h3>
            <p className="text-gray-400 text-sm">Ou dinheiro de volta</p>
          </div>
          <div className="text-center p-6 bg-gray-800/40 border border-gray-700/50 rounded-xl backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-300 shadow-lg hover:shadow-yellow-400/20">
            <Users className="w-10 h-10 text-green-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Suporte 10 Semanas</h3>
            <p className="text-gray-400 text-sm">Acompanhamento completo</p>
          </div>
        </motion.div>

        {/* Prova de Valor */}
        <motion.div 
          variants={itemVariants}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl p-8 max-w-3xl mx-auto backdrop-blur-sm">
            <div className="text-center mb-6">
              <Calculator className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Prova de Valor</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-gray-300 mb-2">Investimento:</p>
                <p className="text-3xl font-bold text-yellow-400">R$ 1.850</p>
                <p className="text-gray-400 text-sm">Escuderia Pódium</p>
              </div>
              <div className="text-center">
                <p className="text-gray-300 mb-2">Retorno esperado:</p>
                <p className="text-3xl font-bold text-green-400">1 contrato fechado</p>
                <p className="text-gray-400 text-sm">Em 6 semanas</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-300 mb-2">Se você fechar 1 contrato de R$ 5.000:</p>
              <div className="inline-flex items-center px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-400 mr-2" />
                <span className="text-green-400 font-bold text-xl">ROI de 170%</span>
              </div>
              <p className="text-gray-400 text-xs mt-2">Lucro líquido de R$ 3.150</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Secundário */}
        <motion.div 
          variants={itemVariants}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-500/5 border border-yellow-400/30 rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">
              Prefere falar diretamente conosco?
            </h3>
            <p className="text-gray-300 mb-6">
              Nossa equipe está à disposição para esclarecer qualquer dúvida
            </p>
            <a 
              href="https://wa.me/5531994293099"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center px-8 py-4 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-green-500/30 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Falar com Consultor no WhatsApp
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
