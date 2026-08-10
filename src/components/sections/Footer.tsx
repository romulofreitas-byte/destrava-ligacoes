import React from 'react';
import { Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { ProtectedImage } from '@/components/ui/ProtectedImage';
import { WORKSHOP_SALES } from '@/lib/constants';

const WHATSAPP_WORKSHOP_TEXT = encodeURIComponent(
  `Rômulo, quero saber mais sobre o Workshop Destrava Ligações (${WORKSHOP_SALES.edition}ª edição)!`
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h3 className="text-2xl font-bold text-white">
                  <a href="/" className="hover:text-yellow-400 transition-colors">
                    Workshop Destrava Ligações
                  </a>
                </h3>
                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full backdrop-blur-md shadow-lg shadow-yellow-400/20">
                  <span className="text-yellow-400 font-semibold text-xs tracking-wide">
                    {WORKSHOP_SALES.edition}ª edição
                  </span>
                </span>
              </div>
              <p className="text-gray-300">
                Treinamento prático de cold call em 2 módulos — Anatomia da Ligação, ligações ao vivo e
                60 dias na Plataforma Mundo Pódium.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Um produto da{' '}
                <a
                  href="https://www.mundopodium.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  Mundo Pódium
                </a>
                .
              </p>
            </div>

            <div className="space-y-2 text-gray-300">
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

          <div></div>

          <div className="hidden md:block">
            <h4 className="text-lg font-semibold text-white mb-4">Redes Sociais</h4>
            <div className="space-y-3">
              <a
                href="https://linkedin.com/in/romulocsfreitas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://instagram.com/romulocsfreitas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
              <a
                href="https://youtube.com/@combustivelmv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <Youtube className="w-5 h-5" />
                <span>YouTube</span>
              </a>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-white mb-4">Contato Direto</h4>
              <div className="space-y-2">
                <a
                  href={`https://wa.me/5531994293099?text=${WHATSAPP_WORKSHOP_TEXT}`}
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
                  className="block border border-yellow-400 text-yellow-400 px-4 py-2 rounded-lg text-center hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center py-2">
          <a
            href="https://www.mundopodium.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex h-8 w-[140px] items-center sm:h-9 sm:w-[160px]"
          >
            <ProtectedImage
              src="/logos-mundo-podium/logo_horizontal_claro.png"
              alt="Mundo Pódium"
              width={160}
              height={36}
              className="object-contain opacity-90 hover:opacity-70 transition-opacity duration-300 cursor-pointer"
            />
          </a>
        </div>

        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left space-y-1">
              <p>© {new Date().getFullYear()} Mundo Pódium. Todos os direitos reservados.</p>
              <p>CNPJ: 68.349.974/0001-19 — Mundo Pódium LTDA</p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm pb-2">
              <a href="/privacidade" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Política de Privacidade
              </a>
              <a href="/termos" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Termos de Uso
              </a>
              <a
                href="mailto:romulo.freitas@combustivelmv.com"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                Contato
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
