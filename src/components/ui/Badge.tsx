'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'purple' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  animated = true
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'purple':
        return 'badge-purple';
      case 'success':
        return 'bg-green-400/10 border-green-400/20 text-green-400';
      case 'warning':
        return 'bg-orange-400/10 border-orange-400/20 text-orange-400';
      default:
        return 'badge';
    }
  };

      const getSizeClasses = () => {
        switch (size) {
          case 'sm':
            return 'px-3 py-1 text-xs rounded-full';
          case 'lg':
            return 'px-5 py-2 text-base rounded-full';
          default:
            return 'px-4 py-2 text-sm rounded-full';
        }
      };

  const badgeClasses = `${getVariantClasses()} ${getSizeClasses()} ${className}`;

  if (!animated) {
    return (
      <span className={badgeClasses}>
        {children}
      </span>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className={badgeClasses}
    >
      {children}
    </motion.span>
  );
};
