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

  const imageStyle: React.CSSProperties = {
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
