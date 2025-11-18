import React from 'react';
import { Shield, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full mb-6">
            <Shield className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-sm">Política de Privacidade</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Política de Privacidade
          </h1>
          <p className="text-gray-300 text-lg">
            Escuderia Pódium - Mentoria em Grupo
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">1. Identificação do Responsável</h2>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <p className="text-gray-300 mb-2">
                <strong className="text-white">Empresa:</strong> Escuderia Pódium
              </p>
              <p className="text-gray-300 mb-2">
                <strong className="text-white">CNPJ:</strong> 43.393.622/0001-30
              </p>
              <p className="text-gray-300 mb-2">
                <strong className="text-white">Responsável:</strong> Rômulo Freitas
              </p>
              <p className="text-gray-300 mb-2">
                <strong className="text-white">Email:</strong> romulo.freitas@combustivelmv.com
              </p>
              <p className="text-gray-300">
                <strong className="text-white">Endereço:</strong> Brasil
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">2. Dados Coletados</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Esta landing page <strong className="text-white">não coleta dados pessoais diretamente</strong>. 
                Não possuímos formulários de cadastro ou campos de entrada de dados.
              </p>
              <p className="text-gray-300">
                Os únicos dados que podem ser coletados são:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Dados de navegação (cookies técnicos essenciais)</li>
                <li>Informações de acesso (IP, navegador, sistema operacional)</li>
                <li>Dados coletados por terceiros através dos links externos</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">3. Finalidade do Tratamento</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Os dados coletados são utilizados exclusivamente para:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Funcionamento técnico do site</li>
                <li>Análise de performance e segurança</li>
                <li>Melhoria da experiência do usuário</li>
                <li>Comunicação através dos canais externos (WhatsApp, Hotmart)</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">4. Cookies e Tecnologias Similares</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Utilizamos cookies técnicos essenciais para o funcionamento do site. 
                Cookies de análise e marketing são utilizados apenas com seu consentimento explícito.
              </p>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Tipos de Cookies:</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico do site. Sempre ativos.</li>
                  <li><strong>Cookies de Análise:</strong> Para análise de uso e performance (Vercel Analytics) - apenas com consentimento</li>
                  <li><strong>Cookies de Marketing:</strong> Para personalização de anúncios e medição de campanhas (Meta Pixel) - apenas com consentimento</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">Meta Pixel (Facebook Pixel)</h3>
                <p className="text-gray-300 text-sm mb-2">
                  Utilizamos o Meta Pixel para:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm ml-4">
                  <li>Medir a eficácia de nossas campanhas de tráfego pago</li>
                  <li>Personalizar anúncios para públicos relevantes</li>
                  <li>Entender como os visitantes interagem com nosso site</li>
                  <li>Otimizar campanhas publicitárias no Facebook e Instagram</li>
                </ul>
                <p className="text-gray-300 text-sm mt-3">
                  O Meta Pixel coleta dados sobre suas ações no site (visualizações de página, cliques, etc.) 
                  e os envia para o Facebook. Esses dados são utilizados para criar públicos personalizados 
                  e medir o desempenho das campanhas. Você pode gerenciar suas preferências de cookies 
                  através do banner de cookies ou nas configurações do Facebook.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">5. Compartilhamento de Dados</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Seus dados podem ser compartilhados com os seguintes serviços, sempre com seu consentimento:
              </p>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Serviços de Terceiros:</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li><strong>Meta (Facebook/Instagram):</strong> Através do Meta Pixel para medição e personalização de anúncios (apenas com consentimento de marketing)</li>
                  <li><strong>Vercel Analytics:</strong> Para análise de performance do site (apenas com consentimento de análise)</li>
                  <li><strong>Hotmart:</strong> Plataforma de pagamento (quando você realiza uma compra)</li>
                  <li><strong>WhatsApp:</strong> Comunicação direta (quando você clica nos links de contato)</li>
                  <li><strong>YouTube:</strong> Visualização de vídeos incorporados (política própria do YouTube)</li>
                </ul>
              </div>
              <p className="text-gray-300 text-sm">
                <strong className="text-white">Importante:</strong> Quando você aceita cookies de marketing, 
                dados de navegação são compartilhados com o Meta para personalização de anúncios. 
                Você pode revogar esse consentimento a qualquer momento através do banner de cookies.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">6. Seus Direitos (LGPD)</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Acesso</h3>
                  <p className="text-gray-300 text-sm">Saber quais dados temos sobre você</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Correção</h3>
                  <p className="text-gray-300 text-sm">Corrigir dados incorretos</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Exclusão</h3>
                  <p className="text-gray-300 text-sm">Solicitar exclusão dos dados</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Portabilidade</h3>
                  <p className="text-gray-300 text-sm">Transferir dados para outro serviço</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">7. Segurança dos Dados</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Certificado SSL para criptografia de dados</li>
                <li>Headers de segurança HTTP</li>
                <li>Política de Content Security Policy (CSP)</li>
                <li>Proteção contra ataques comuns (XSS, CSRF)</li>
                <li>Monitoramento de segurança contínuo</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">8. Retenção de Dados</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Os dados são mantidos apenas pelo tempo necessário para:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Funcionamento técnico do site</li>
                <li>Cumprimento de obrigações legais</li>
                <li>Resolução de disputas</li>
                <li>Exercício de direitos em processos judiciais</li>
              </ul>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mt-4">
                <h3 className="text-lg font-semibold text-white mb-3">Períodos Específicos:</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                  <li><strong>Cookies de sessão:</strong> Expiram ao fechar o navegador</li>
                  <li><strong>Preferências de cookies:</strong> Armazenadas localmente até serem alteradas ou excluídas</li>
                  <li><strong>Dados do Meta Pixel:</strong> Seguem a política de retenção do Facebook (geralmente 90 dias para eventos, até 2 anos para dados agregados)</li>
                  <li><strong>Dados de analytics:</strong> Retidos conforme política da Vercel (geralmente agregados e anonimizados)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">9. Alterações na Política</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Esta política pode ser atualizada periodicamente. Alterações significativas 
                serão comunicadas através do site ou por email.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">10. Contato</h2>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <p className="text-gray-300 mb-4">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política:
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">romulo.freitas@combustivelmv.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">(31) 99429-3099</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">Brasil</span>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">11. Base Legal</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                O tratamento de dados é baseado em:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li><strong>Consentimento:</strong> Para cookies de análise e marketing (Meta Pixel, Vercel Analytics). Você pode revogar a qualquer momento.</li>
                <li><strong>Interesse legítimo:</strong> Para funcionamento técnico do site e cookies essenciais</li>
                <li><strong>Cumprimento de obrigação legal:</strong> Quando aplicável (retenção de dados para fins legais)</li>
              </ul>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mt-4">
                <h3 className="text-lg font-semibold text-white mb-3">Sobre o Consentimento:</h3>
                <p className="text-gray-300 text-sm mb-2">
                  O consentimento para cookies de marketing é especialmente importante para:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm ml-4">
                  <li>Medição de eficácia de campanhas de tráfego pago</li>
                  <li>Personalização de anúncios no Facebook e Instagram</li>
                  <li>Otimização de investimento em publicidade</li>
                </ul>
                <p className="text-gray-300 text-sm mt-3">
                  Você pode gerenciar ou revogar seu consentimento a qualquer momento através do 
                  banner de cookies ou entrando em contato conosco.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            Esta política está em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018)
          </p>
          <div className="mt-4">
            <a 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-500 transition-colors"
            >
              Voltar ao Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
