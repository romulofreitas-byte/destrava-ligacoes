import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true
}) => {
  const baseClasses = 'bg-podium-dark border border-podium-yellow/15 rounded-xl p-6';
  const hoverClasses = hover ? 'hover:border-podium-yellow/30 transition-all duration-300' : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className = ''
}) => {
  return (
    <Card className={`text-center ${className}`}>
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-podium-yellow/10 rounded-full flex items-center justify-center text-podium-yellow">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-podium-text-primary">{title}</h3>
      <p className="text-podium-text-secondary">{description}</p>
    </Card>
  );
};

interface PricingCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  features: string[];
  ctaText: string;
  ctaHref?: string;
  highlight?: boolean;
  className?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  originalPrice,
  features,
  ctaText,
  ctaHref,
  highlight = false,
  className = ''
}) => {
  return (
    <Card className={`${highlight ? 'border-podium-yellow/50 bg-podium-dark-secondary' : ''} ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-podium-text-primary mb-2">{title}</h3>
        {originalPrice && (
          <p className="text-podium-text-muted line-through text-lg">De {originalPrice}</p>
        )}
        <p className="text-4xl font-bold text-podium-yellow">{price}</p>
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <div className="w-5 h-5 bg-podium-yellow rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-3 h-3 text-podium-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-podium-text-secondary">{feature}</span>
          </li>
        ))}
      </ul>
      
      <a
        href={ctaHref}
        className={`w-full block text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
          highlight
            ? 'bg-podium-yellow text-podium-black hover:brightness-110'
            : 'border-2 border-podium-yellow text-podium-yellow hover:bg-podium-yellow hover:text-podium-black'
        }`}
      >
        {ctaText}
      </a>
    </Card>
  );
};
