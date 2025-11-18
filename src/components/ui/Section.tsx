import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id
}) => {
  return (
    <section id={id} className={`py-16 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = ''
}) => {
  const variantClasses = {
    primary: 'bg-podium-yellow text-podium-black',
    secondary: 'bg-podium-dark-secondary text-podium-text-primary border border-podium-yellow/30',
    success: 'bg-green-500 text-white',
    warning: 'bg-orange-500 text-white'
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  center?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 2,
  className = '',
  center = false
}) => {
  const levelClasses = {
    1: 'text-4xl sm:text-5xl lg:text-6xl font-bold',
    2: 'text-3xl sm:text-4xl lg:text-5xl font-bold',
    3: 'text-2xl sm:text-3xl font-semibold',
    4: 'text-xl sm:text-2xl font-semibold',
    5: 'text-lg sm:text-xl font-semibold',
    6: 'text-base sm:text-lg font-semibold'
  };
  
  const centerClass = center ? 'text-center' : '';
  
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag className={`${levelClasses[level]} text-podium-text-primary ${centerClass} ${className}`}>
      {children}
    </Tag>
  );
};

interface TextProps {
  children: React.ReactNode;
  size?: 'sm' | 'base' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'muted';
  center?: boolean;
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  size = 'base',
  color = 'secondary',
  center = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  const colorClasses = {
    primary: 'text-podium-text-primary',
    secondary: 'text-podium-text-secondary',
    muted: 'text-podium-text-muted'
  };
  
  const centerClass = center ? 'text-center' : '';
  
  return (
    <p className={`${sizeClasses[size]} ${colorClasses[color]} ${centerClass} ${className}`}>
      {children}
    </p>
  );
};
