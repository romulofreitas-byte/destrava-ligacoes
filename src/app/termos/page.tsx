import React from 'react';
import { FileText, Mail, Phone, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full mb-6">
            <FileText className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-sm">Termos de Uso</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Termos de Uso
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
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">1. Aceitação dos Termos</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Ao acessar e utilizar este site, você concorda em cumprir e estar vinculado aos 
                seguintes termos e condições de uso.
              </p>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Importante</h3>
                    <p className="text-gray-300 text-sm">
                      Se você não concordar com qualquer parte destes termos, 
                      não deve utilizar este site.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">2. Identificação da Empresa</h2>
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
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">3. Descrição do Serviço</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                A Escuderia Pódium oferece mentoria em grupo para desenvolvimento de habilidades 
                de vendas e processo comercial através do Método Pódium.
              </p>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">O que está incluído:</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>6 encontros em grupo (2 horas cada)</li>
                  <li>4 sessões individuais (1 por mês)</li>
                  <li>Acesso ao Agente Pódium (IA)</li>
                  <li>Sala de Ligação para prática</li>
                  <li>Materiais e templates do Método Pódium</li>
                  <li>Comunidade exclusiva de pilotos</li>
                  <li>Certificação &quot;Piloto Pódium - Escuderia&quot;</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">4. Condições de Pagamento</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Valor do Investimento</h3>
                  <p className="text-3xl font-bold text-yellow-400 mb-2">R$ 1.850</p>
                  <p className="text-gray-300 text-sm">ou 12x R$ 185 sem juros</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Formas de Pagamento</h3>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li>Cartão de crédito</li>
                    <li>PIX</li>
                    <li>Boleto bancário</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">5. Política de Cancelamento</h2>
            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Garantia de 7 Dias</h3>
                    <p className="text-gray-300 text-sm">
                      Você pode cancelar sua participação até 7 dias antes do início do programa 
                      com reembolso integral.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Condições de Cancelamento:</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                  <li><strong>Até 7 dias antes:</strong> Reembolso integral</li>
                  <li><strong>Após início:</strong> Não há reembolso, mas pode transferir vaga</li>
                  <li><strong>Transferência:</strong> Gratuita para outra pessoa</li>
                  <li><strong>Taxas:</strong> Sem taxas ocultas de cancelamento</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">6. Responsabilidades do Participante</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                O participante se compromete a:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Participar ativamente dos encontros e sessões</li>
                <li>Executar as atividades práticas propostas</li>
                <li>Respeitar os outros participantes e o mentor</li>
                <li>Manter confidencialidade sobre informações compartilhadas</li>
                <li>Utilizar os materiais apenas para fins pessoais</li>
                <li>Não compartilhar acesso com terceiros</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">7. Limitações de Responsabilidade</h2>
            <div className="space-y-4">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Sem Garantia de Resultados</h3>
                    <p className="text-gray-300 text-sm">
                      Não garantimos resultados específicos. O sucesso depende do empenho, 
                      dedicação e execução do participante.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-300">
                A Escuderia Pódium não se responsabiliza por:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Resultados financeiros específicos</li>
                <li>Contratos fechados pelos participantes</li>
                <li>Decisões de negócio tomadas pelos participantes</li>
                <li>Problemas técnicos de terceiros (plataformas externas)</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">8. Privacidade e Uso de Dados</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Ao utilizar este site, você concorda com a coleta e uso de dados conforme descrito em nossa 
                Política de Privacidade. Informações importantes:
              </p>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Uso de Dados para Marketing:</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                  <li>Utilizamos tecnologias de rastreamento (Meta Pixel) para medir a eficácia de campanhas de tráfego pago</li>
                  <li>Dados de navegação podem ser compartilhados com o Meta (Facebook/Instagram) para personalização de anúncios</li>
                  <li>Esses dados são utilizados exclusivamente para otimização de campanhas publicitárias</li>
                  <li>Você pode gerenciar suas preferências de cookies através do banner de consentimento</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Consentimento</h3>
                    <p className="text-gray-300 text-sm">
                      Ao aceitar cookies de marketing, você autoriza o compartilhamento de dados de navegação 
                      com o Meta para fins de publicidade personalizada. Este consentimento pode ser revogado 
                      a qualquer momento. Para mais detalhes, consulte nossa{' '}
                      <a href="/privacidade" className="text-amber-400 hover:text-amber-300 underline">
                        Política de Privacidade
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">9. Propriedade Intelectual</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Todo o conteúdo, metodologia e materiais são propriedade exclusiva da 
                Escuderia Pódium e estão protegidos por direitos autorais.
              </p>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">É proibido:</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                  <li>Reproduzir ou distribuir materiais sem autorização</li>
                  <li>Usar o Método Pódium para criar produtos concorrentes</li>
                  <li>Gravar ou transmitir sessões sem permissão</li>
                  <li>Compartilhar acesso com pessoas não inscritas</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">10. Modificações nos Termos</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                Alterações significativas serão comunicadas com antecedência.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">11. Resolução de Conflitos</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Qualquer disputa será resolvida preferencialmente por acordo amigável.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">12. Contato</h2>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <p className="text-gray-300 mb-4">
                Para dúvidas sobre estes termos ou sobre o programa:
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
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">13. Disposições Finais</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Estes termos são regidos pela legislação brasileira e estão em conformidade 
                com o Código de Defesa do Consumidor e demais normas aplicáveis.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            Ao utilizar este site, você concorda com estes termos de uso
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
