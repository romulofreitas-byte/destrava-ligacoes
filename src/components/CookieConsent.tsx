'use client';

import React, { useState, useEffect } from 'react';
import { Cookie, X, Check } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsent = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(allConsent));
    setIsVisible(false);
    // Dispatch event for Meta Pixel initialization
    window.dispatchEvent(new CustomEvent('cookieConsentChange'));
  };

  const handleAcceptEssential = () => {
    const essentialConsent = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(essentialConsent));
    setIsVisible(false);
    // Dispatch event for Meta Pixel initialization
    window.dispatchEvent(new CustomEvent('cookieConsentChange'));
  };

  const handleSavePreferences = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setIsVisible(false);
    setShowSettings(false);
    // Dispatch event for Meta Pixel initialization
    window.dispatchEvent(new CustomEvent('cookieConsentChange'));
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    if (key === 'essential') return; // Can't disable essential cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:left-1/2 sm:transform sm:-translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="w-full px-4 sm:px-0 sm:max-w-md">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-t-2xl sm:rounded-2xl shadow-2xl">
          {!showSettings ? (
            // Main consent banner
            <div className="p-3 sm:p-5">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-medium text-gray-200 mb-1 sm:mb-2">
                    Cookies e Privacidade
                  </h3>
                  <p className="text-xs sm:text-sm leading-snug sm:leading-relaxed mb-3 sm:mb-4">
                    Utilizamos cookies para melhorar sua experiência e garantir o funcionamento do site.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-col sm:gap-2">
                    <button
                      onClick={handleAcceptEssential}
                      className="px-2 py-2 sm:px-4 sm:py-2 border border-gray-600/50 text-gray-300 rounded-lg hover:border-gray-500/70 hover:text-gray-200 transition-all duration-200 text-xs sm:text-sm font-medium"
                    >
                      Rejeitar Todos
                    </button>
                    
                    <button
                      onClick={handleAcceptAll}
                      className="px-2 py-2 sm:px-4 sm:py-2 bg-amber-500/90 text-gray-900 rounded-lg hover:bg-amber-500 transition-all duration-200 text-xs sm:text-sm font-medium font-semibold"
                    >
                      Aceitar Todos
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setShowSettings(true)}
                    className="mt-3 mx-auto block text-[10px] sm:text-xs text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    Personalizar cookies
                  </button>
                </div>
                
                <div className="flex-shrink-0 hidden sm:block">
                  <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center">
                    <Cookie className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Settings panel
            <div className="p-3 sm:p-5">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <h3 className="text-sm sm:text-base font-medium text-gray-200">
                  Configurações de Cookies
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1.5 sm:p-1.5 text-gray-400 hover:text-gray-200 transition-colors"
                  aria-label="Voltar"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
              
              <div className="space-y-2 sm:space-y-3 mb-2 sm:mb-4">
                {/* Essential Cookies */}
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-800/30 border border-gray-700/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-200 mb-0.5 sm:mb-1 text-xs sm:text-sm">Cookies Essenciais</h4>
                    <p className="text-[10px] sm:text-xs">
                      Necessários para o funcionamento básico do site
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Check className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-green-400" />
                    <span className="text-green-400 text-[10px] sm:text-xs font-medium">Sempre Ativo</span>
                  </div>
                </div>
                
                {/* Analytics Cookies */}
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-800/30 border border-gray-700/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-200 mb-0.5 sm:mb-1 text-xs sm:text-sm">Cookies de Análise</h4>
                    <p className="text-[10px] sm:text-xs">
                      Nos ajudam a entender como você usa o site para melhorá-lo
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('analytics')}
                    className={`w-8 h-4 sm:w-10 sm:h-5 rounded-full transition-colors ${
                      preferences.analytics ? 'bg-amber-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full transition-transform ${
                        preferences.analytics ? 'translate-x-4 sm:translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
                
                {/* Marketing Cookies */}
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-800/30 border border-gray-700/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-200 mb-0.5 sm:mb-1 text-xs sm:text-sm">Cookies de Marketing</h4>
                    <p className="text-[10px] sm:text-xs">
                      Usados para personalizar anúncios e conteúdo relevante
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('marketing')}
                    className={`w-8 h-4 sm:w-10 sm:h-5 rounded-full transition-colors ${
                      preferences.marketing ? 'bg-amber-500' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full transition-transform ${
                        preferences.marketing ? 'translate-x-4 sm:translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-col sm:gap-2">
                <button
                  onClick={handleAcceptEssential}
                  className="px-2 py-2 sm:px-4 sm:py-2 border border-gray-600/50 text-gray-300 rounded-lg hover:border-gray-500/70 hover:text-gray-200 transition-all duration-200 text-xs sm:text-sm font-medium"
                >
                  Apenas Essenciais
                </button>
                
                <button
                  onClick={handleSavePreferences}
                  className="col-span-2 px-2 py-2 sm:px-4 sm:py-2 bg-amber-500/90 text-gray-900 rounded-lg hover:bg-amber-500 transition-all duration-200 text-xs sm:text-sm font-medium"
                >
                  Salvar Preferências
                </button>
              </div>
            </div>
          )}
          
          {/* Footer links */}
          <div className="px-2 sm:px-5 pb-4 sm:pb-3">
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-3 text-[10px] sm:text-xs text-gray-400">
              <a 
                href="/privacidade" 
                className="hover:text-amber-400 transition-colors"
              >
                Política de Privacidade
              </a>
              <span>•</span>
              <a 
                href="/termos" 
                className="hover:text-amber-400 transition-colors"
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
