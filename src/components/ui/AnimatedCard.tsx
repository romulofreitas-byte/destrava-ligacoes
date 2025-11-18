'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  variant?: 'default' | 'gradient' | 'testimonial' | 'pricing' | 'process';
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  hover = true,
  delay = 0,
  variant = 'default'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'card-gradient';
      case 'testimonial':
        return 'testimonial-card';
      case 'pricing':
        return 'pricing-card';
      case 'process':
        return 'process-step';
      default:
        return 'card';
    }
  };

  const hoverProps = hover ? {
    whileHover: { 
      y: -8, 
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      {...hoverProps}
      className={`${getVariantClasses()} ${className}`}
    >
      {children}
    </motion.div>
  );
};
