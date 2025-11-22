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
      // Small delay to not interrupt initial page load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
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
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      aria-modal="true"
    >
      <div className="w-full px-4 sm:px-6">
        <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-t-2xl shadow-2xl">
          {!showSettings ? (
            // Main consent banner
            <div className="p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center">
                    <Cookie className="w-5 h-5 text-amber-400" aria-hidden="true" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 
                    id="cookie-consent-title"
                    className="text-sm font-semibold text-gray-100 mb-1.5"
                  >
                    Cookies e Privacidade
                  </h3>
                  <p 
                    id="cookie-consent-description"
                    className="text-xs leading-relaxed text-gray-300 mb-4 sm:mb-0"
                  >
                    Utilizamos cookies essenciais e tecnologias de marketing (incluindo Meta Pixel) para melhorar sua experiência e personalizar anúncios. Ao continuar, você concorda com nossa{' '}
                    <a 
                      href="/privacidade" 
                      className="text-amber-400 hover:text-amber-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Política de Privacidade
                    </a>
                    {' '}e{' '}
                    <a 
                      href="/termos" 
                      className="text-amber-400 hover:text-amber-300 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Termos de Uso
                    </a>
                    .
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:flex-shrink-0">
                  <button
                    onClick={handleAcceptAll}
                    className="w-full sm:w-auto px-4 py-2.5 bg-amber-500/90 text-gray-900 rounded-lg hover:bg-amber-500 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 whitespace-nowrap"
                    aria-label="Aceitar todos os cookies"
                  >
                    Aceitar Todos
                  </button>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleAcceptEssential}
                      className="flex-1 sm:flex-none px-4 py-2 border border-gray-600/50 text-gray-300 rounded-lg hover:border-gray-500/70 hover:text-gray-200 transition-all duration-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 whitespace-nowrap"
                      aria-label="Rejeitar cookies não essenciais"
                    >
                      Rejeitar
                    </button>
                    
                    <button
                      onClick={() => setShowSettings(true)}
                      className="flex-1 sm:flex-none px-4 py-2 border border-gray-600/50 text-gray-300 rounded-lg hover:border-gray-500/70 hover:text-gray-200 transition-all duration-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 whitespace-nowrap"
                      aria-label="Personalizar configurações de cookies"
                    >
                      Personalizar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Settings panel
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 
                  id="cookie-settings-title"
                  className="text-sm font-semibold text-gray-100"
                >
                  Configurações de Cookies
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label="Voltar para o banner principal"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
              
              <div className="space-y-3 mb-4">
                {/* Essential Cookies */}
                <div className="flex items-start justify-between p-3 bg-gray-800/30 border border-gray-700/50 rounded-lg">
                  <div className="flex-1 mr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-200 text-sm">Cookies Essenciais</h4>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Necessários para o funcionamento básico do site. Sempre ativos.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Check className="w-4 h-4 text-green-400" aria-hidden="true" />
                    <span className="text-green-400 text-xs font-medium">Ativo</span>
                  </div>
                </div>
                
                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-3 bg-gray-800/30 border border-gray-700/50 rounded-lg">
                  <div className="flex-1 mr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-200 text-sm">Cookies de Análise</h4>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Nos ajudam a entender como você usa o site para melhorá-lo (Vercel Analytics).
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('analytics')}
                    className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                      preferences.analytics ? 'bg-amber-500' : 'bg-gray-600'
                    }`}
                    role="switch"
                    aria-checked={preferences.analytics}
                    aria-label={`Cookies de análise ${preferences.analytics ? 'ativados' : 'desativados'}`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        preferences.analytics ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                
                {/* Marketing Cookies */}
                <div className="flex items-start justify-between p-3 bg-gray-800/30 border border-gray-700/50 rounded-lg">
                  <div className="flex-1 mr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-200 text-sm">Cookies de Marketing</h4>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Usados para personalizar anúncios e medir campanhas (Meta Pixel). Essencial para tráfego pago.
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('marketing')}
                    className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                      preferences.marketing ? 'bg-amber-500' : 'bg-gray-600'
                    }`}
                    role="switch"
                    aria-checked={preferences.marketing}
                    aria-label={`Cookies de marketing ${preferences.marketing ? 'ativados' : 'desativados'}`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        preferences.marketing ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleSavePreferences}
                  className="w-full px-4 py-2.5 bg-amber-500/90 text-gray-900 rounded-lg hover:bg-amber-500 transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label="Salvar preferências de cookies"
                >
                  Salvar Preferências
                </button>
                
                <button
                  onClick={handleAcceptEssential}
                  className="w-full px-4 py-2 border border-gray-600/50 text-gray-300 rounded-lg hover:border-gray-500/70 hover:text-gray-200 transition-all duration-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label="Aceitar apenas cookies essenciais"
                >
                  Apenas Essenciais
                </button>
              </div>
            </div>
          )}
          
          {/* Footer links */}
          <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-gray-700/50 pt-3">
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400">
              <a 
                href="/privacidade" 
                className="hover:text-amber-400 transition-colors underline"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir Política de Privacidade em nova aba"
              >
                Política de Privacidade
              </a>
              <span className="text-gray-600">•</span>
              <a 
                href="/termos" 
                className="hover:text-amber-400 transition-colors underline"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir Termos de Uso em nova aba"
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
