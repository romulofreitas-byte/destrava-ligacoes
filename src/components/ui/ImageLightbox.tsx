'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;

    document.addEventListener('keydown', handleEscape);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    setIsModalOpen(true);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      setIsModalOpen(false);
    };
  }, [isOpen, onClose, setIsModalOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex h-[100dvh] w-screen flex-col overflow-hidden bg-black/92 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Visualizar print ampliado'}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 z-10 rounded-full bg-gray-800/90 p-2.5 text-white transition-colors hover:bg-gray-700 sm:top-5 sm:right-5"
        aria-label="Fechar"
      >
        <X className="h-6 w-6" />
      </button>

      <div
        className="flex min-h-0 flex-1 items-center justify-center px-3 pb-10 pt-14 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- full-res lightbox for readable prints */}
        <img
          src={src}
          alt={alt}
          className="h-auto w-auto select-none rounded-lg object-contain shadow-2xl"
          style={{ maxHeight: '85dvh', maxWidth: '100vw' }}
          draggable={false}
        />
      </div>

      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-gray-400 sm:bottom-4 sm:text-sm">
        Toque fora ou Esc para fechar
      </p>
    </div>,
    document.body
  );
};
