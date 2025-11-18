'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';

interface ProtectedImageProps extends Omit<ImageProps, 'onContextMenu' | 'onDragStart' | 'onSelectStart' | 'alt'> {
  className?: string;
  alt: string;
}

export const ProtectedImage: React.FC<ProtectedImageProps> = ({ 
  className = '', 
  alt,
  fill,
  ...props 
}) => {

  if (fill) {
    // Quando usar fill, o container precisa ser relative e a className vai na Image
    // A div wrapper precisa ocupar todo o espaço do container pai
    return (
      <div className="relative w-full h-full select-none">
        <Image
          {...props}
          alt={alt}
          fill={fill}
          className={className}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{
            userSelect: 'none',
          } as React.CSSProperties}
        />
      </div>
    );
  }

  return (
    <div className={`relative select-none ${className}`}>
      <Image
        {...props}
        alt={alt}
        fill={fill}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        style={{
          userSelect: 'none',
          pointerEvents: 'none',
        } as React.CSSProperties}
      />
    </div>
  );
};
