import React from 'react';
import { Linkedin, Instagram, Youtube, Mail, Phone, MapPin, Users } from 'lucide-react';
import { ProtectedImage } from '@/components/ui/ProtectedImage';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-podium-black border-t border-podium-yellow/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h3 className="text-2xl font-bold text-podium-text-primary">
                  <a href="https://www.mundopodium.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-podium-yellow transition-colors">
                    Escuderia Pódium
                  </a>
                </h3>
                <a 
                  href="https://www.mundopodium.com.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400/20 to-green-500/10 border border-green-400/30 rounded-full backdrop-blur-md shadow-lg shadow-green-400/20 animate-fade-in-up hover:shadow-green-400/40 transition-all duration-300"
                  style={{animationDelay: '0.1s'}}
                >
                  <Users className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-green-400 font-semibold text-xs tracking-wide">conheça a mentoria em grupo</span>
                </a>
              </div>
              <p className="text-podium-text-secondary">
                Mentoria em grupo para transformar seu processo comercial e fechar seu primeiro contrato.
              </p>
            </div>
            
            <div className="space-y-2 text-podium-text-secondary">
              <p className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Brasil</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(31) 99429-3099</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>romulo.freitas@combustivelmv.com</span>
              </p>
            </div>
          </div>

          {/* Empty space where Links Rápidos was */}
          <div></div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-lg font-semibold text-podium-text-primary mb-4">
              Redes Sociais
            </h4>
            <div className="space-y-3">
              <a 
                href="https://linkedin.com/in/romulocsfreitas" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-podium-text-secondary hover:text-podium-yellow transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://instagram.com/romulocsfreitas" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-podium-text-secondary hover:text-podium-yellow transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
              <a 
                href="https://youtube.com/@combustivelmv" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-podium-text-secondary hover:text-podium-yellow transition-colors"
              >
                <Youtube className="w-5 h-5" />
                <span>YouTube</span>
              </a>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-podium-text-primary mb-4">
                Contato Direto
              </h4>
              <div className="space-y-2">
                <a 
                  href="https://wa.me/5531994293099?text=Rômulo,%20quero%20saber%20mais%20sobre%20a%20Escuderia%20Pódium!" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-green-500 text-white px-4 py-2 rounded-lg text-center hover:bg-green-600 transition-colors"
                >
                  WhatsApp
                </a>
                <a 
                  href="mailto:romulo.freitas@combustivelmv.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-podium-yellow text-podium-yellow px-4 py-2 rounded-lg text-center hover:bg-podium-yellow hover:text-podium-black transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Logos Section */}
        <div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <a href="https://www.mundopodium.com.br" target="_blank" rel="noopener noreferrer" className="w-24 h-24 sm:w-28 sm:h-28 relative flex items-center">
                <ProtectedImage 
                  src="/logos/Escuderia Branco.png"
                  alt="Escuderia Pódium"
                  width={112}
                  height={112}
                  className="object-contain opacity-100 hover:opacity-70 transition-opacity duration-300 cursor-pointer"
                />
              </a>
              <div className="hidden sm:block w-px h-20 bg-gray-600"></div>
              <div className="w-24 h-12 relative">
                <ProtectedImage 
                  src="/logos/logo-metodo.png"
                  alt="Método Pódium"
                  width={96}
                  height={48}
                  className="object-contain opacity-100 hover:opacity-70 transition-opacity duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-podium-text-muted text-sm">
              © 2025 Escuderia Pódium. Todos os direitos reservados. | CNPJ: 43.393.622/0001-30
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="/privacidade" className="text-podium-text-muted hover:text-podium-yellow transition-colors">
                Política de Privacidade
              </a>
              <a href="/termos" className="text-podium-text-muted hover:text-podium-yellow transition-colors">
                Termos de Uso
              </a>
              <a href="mailto:romulo.freitas@combustivelmv.com" className="text-podium-text-muted hover:text-podium-yellow transition-colors">
                Contato
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
