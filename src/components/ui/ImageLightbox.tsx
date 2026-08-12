'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useModalContext } from '@/contexts/ModalContext';

export type ImageLightboxProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt?: string;
};

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  src,
  alt = '',
}) => {
  const { setIsModalOpen } = useModalContext();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    setIsModalOpen(true);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      setIsModalOpen(false);
    };
  }, [isOpen, onClose, setIsModalOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-black/92 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Visualizar print ampliado'}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 p-2.5 rounded-full bg-gray-800/90 hover:bg-gray-700 text-white transition-colors"
        aria-label="Fechar"
      >
        <X className="w-6 h-6" />
      </button>

      {/* min-h-0 + max bounds so tall WhatsApp prints fit the viewport without scroll */}
      <div
        className="flex min-h-0 flex-1 items-center justify-center px-3 pb-10 pt-14 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- full-res lightbox for readable prints */}
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full h-auto w-auto object-contain select-none rounded-lg shadow-2xl"
          draggable={false}
        />
      </div>

      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-gray-400 sm:bottom-4 sm:text-sm">
        Toque fora ou Esc para fechar
      </p>
    </div>
  );
};
