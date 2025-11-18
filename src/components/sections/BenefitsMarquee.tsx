'use client';

import React from 'react';
import { Phone, Users, UserCheck, TrendingUp, Award, Shield, DollarSign, Target, Zap, Briefcase, Rocket, Star } from 'lucide-react';

export const BenefitsMarquee: React.FC = () => {
  const benefits = [
    { icon: Phone, text: 'Venda como empresário' },
    { icon: Users, text: 'Precifique seu real valor' },
    { icon: UserCheck, text: 'Domine negociações estratégicas' },
    { icon: TrendingUp, text: 'Construa mentalidade de CEO' },
    { icon: Phone, text: 'Pare de trocar horas por dinheiro' },
    { icon: Users, text: 'Estruture sua operação comercial' },
    { icon: Shield, text: 'Ganhe confiança em vendas' },
    { icon: DollarSign, text: 'Crie receita recorrente' },
    { icon: Target, text: 'Supere o medo de ligar' },
    { icon: TrendingUp, text: 'Alcance liberdade financeira' },
    { icon: Award, text: 'Fale com autoridade' },
    { icon: DollarSign, text: 'Fature como empresário' },
  ];

  return (
    <div className="bg-yellow-400 py-4 overflow-hidden w-full max-w-full">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes marquee-slow {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-slow-animation {
            animation: marquee-slow 30s linear infinite;
          }
        `
      }} />
      <div className="flex marquee-slow-animation whitespace-nowrap w-max">
        {/* Triplicate for seamless loop - ensures all 12 items are visible */}
        {[...benefits, ...benefits, ...benefits].map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div key={index} className="inline-flex items-center mx-8">
              <Icon className="w-5 h-5 text-gray-900 mr-3 flex-shrink-0" />
              <span className="text-gray-900 font-semibold text-sm whitespace-nowrap">
                {benefit.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

