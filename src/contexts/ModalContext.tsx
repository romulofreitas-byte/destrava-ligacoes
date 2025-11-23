'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  ctaButtonClicked: boolean;
  setCtaButtonClicked: (clicked: boolean) => void;
}

// Valor padrão seguro para quando o Provider não está presente
const defaultContextValue: ModalContextType = {
  isModalOpen: false,
  setIsModalOpen: () => {},
  ctaButtonClicked: false,
  setCtaButtonClicked: () => {},
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ctaButtonClicked, setCtaButtonClicked] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        ctaButtonClicked,
        setCtaButtonClicked,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Hook customizado com fallback seguro
export const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext);
  // Retorna valores padrão se o contexto não estiver disponível
  return context ?? defaultContextValue;
};

