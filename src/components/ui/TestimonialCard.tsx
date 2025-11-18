'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role?: string;
  content: string;
  rating?: number;
  avatar?: string;
  delay?: number;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  content,
  rating = 5,
  avatar,
  delay = 0,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={`testimonial-card ${className}`}
    >
      <div className="flex items-start space-x-4">
        {avatar ? (
              <Image 
                src={avatar} 
                alt={name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-xl object-cover"
              />
        ) : (
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-lg">
              {name.charAt(0)}
            </span>
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          
          <blockquote className="text-gray-300 mb-4 relative">
            <Quote className="absolute -top-2 -left-2 w-6 h-6 text-yellow-400/30" />
            &ldquo;{content}&rdquo;
          </blockquote>
          
          <div>
            <p className="font-semibold text-white">{name}</p>
            {role && (
              <p className="text-sm text-gray-400">{role}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
