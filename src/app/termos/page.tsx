import React from 'react';
import { FileText, Mail, Phone, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';
import {
  WORKSHOP_DURATION,
  WORKSHOP_INFO,
  WORKSHOP_MODULE_2_INFO,
  WORKSHOP_PLATFORM_RULES,
  WORKSHOP_PRICING,
  WORKSHOP_SALES,
} from '@/lib/constants';

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full mb-6">
            <FileText className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-sm">Termos de Uso</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Termos de Uso</h1>
          <p className="text-gray-300 text-lg">
            Workshop Destrava Ligações — Mundo Pódium ({WORKSHOP_SALES.edition}ª edição)
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">1. Aceitação dos Termos</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Ao acessar este site e/ou adquirir o Workshop Destrava Ligações, você concorda em
                cumprir e estar vinculado a estes termos e condições de uso.
              </p>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Importante</h3>
                    <p className="text-gray-300 text-sm">
                      Se você não concordar com qualquer parte destes termos, não deve utilizar este
                      site nem concluir a compra do workshop.
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
                <strong className="text-white">Empresa:</strong> Mundo Pódium LTDA
              </p>
              <p className="text-gray-300 mb-2">
                <strong className="text-white">CNPJ:</strong> 68.349.974/0001-19
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
                O Workshop Destrava Ligações é um treinamento online ao vivo de cold call, oferecido
                pela Mundo Pódium, com {WORKSHOP_DURATION.detailLine} em dias diferentes.
              </p>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">O que está incluído:</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>
                    Módulo 1 — Preparação e Fundação ({WORKSHOP_INFO.dateDisplayLong},{' '}
                    {WORKSHOP_INFO.time} BRT)
                  </li>
                  <li>
                    Módulo 2 — Sala de Ligação ({WORKSHOP_MODULE_2_INFO.dateDisplayLong},{' '}
                    {WORKSHOP_MODULE_2_INFO.time} BRT)
                  </li>
                  <li>Construção da Anatomia da Ligação e prática supervisionada</li>
                  <li>Gravações do Workshop e da Sala de Ligação na plataforma Mundo Pódium</li>
                  <li>
                    Acesso incluso à plataforma Mundo Pódium por{' '}
                    {WORKSHOP_PLATFORM_RULES.includedAccessEndsDetail}
                  </li>
                  <li>Comunidade da turma (WhatsApp) e materiais do Método Pódium</li>
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
                  <p className="text-3xl font-bold text-yellow-400 mb-2">{WORKSHOP_PRICING.current}</p>
                  <p className="text-gray-300 text-sm">
                    Preço da {WORKSHOP_SALES.edition}ª edição do Workshop Destrava Ligações
                  </p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Formas de Pagamento</h3>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li>PIX</li>
                    <li>Boleto bancário</li>
                    <li>Cartão de crédito</li>
                  </ul>
                  <p className="text-gray-400 text-xs mt-3">
                    O checkout é processado por provedor de pagamento parceiro (PagBank).
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">5. Política de Cancelamento e Garantia</h2>
            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Garantia condicionada à execução
                    </h3>
                    <p className="text-gray-300 text-sm">
                      A garantia do Workshop Destrava Ligações é condicionada à execução das
                      atividades propostas — não é uma promessa vaga de resultado financeiro. Os
                      detalhes são explicados na seção de Garantia desta página e/ou no vídeo
                      correspondente.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Cancelamento e transferência:</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                  <li>
                    <strong>Antes do início do Módulo 1:</strong> solicitação de cancelamento deve ser
                    enviada por e-mail; a análise segue o Código de Defesa do Consumidor e a
                    garantia condicionada à execução
                  </li>
                  <li>
                    <strong>Transferência de vaga:</strong> pode ser solicitada para outra pessoa
                    antes do início do Módulo 1, mediante aviso prévio
                  </li>
                  <li>
                    <strong>Após o início:</strong> não há reembolso automático; o acesso às
                    gravações permanece conforme o período incluso
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">6. Responsabilidades do Participante</h2>
            <div className="space-y-4">
              <p className="text-gray-300">O participante se compromete a:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Participar ativamente dos módulos (ao vivo ou via gravação no prazo incluso)</li>
                <li>Executar as atividades práticas propostas, quando aplicável à garantia</li>
                <li>Respeitar os outros participantes e o mentor</li>
                <li>Manter confidencialidade sobre informações compartilhadas na turma</li>
                <li>Utilizar os materiais apenas para fins pessoais e profissionais próprios</li>
                <li>Não compartilhar acesso à plataforma ou à turma com terceiros</li>
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
                    <h3 className="text-lg font-semibold text-white mb-2">Sem garantia de resultados</h3>
                    <p className="text-gray-300 text-sm">
                      Não garantimos resultados financeiros específicos. O sucesso depende do
                      empenho, da dedicação e da execução do participante.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-300">A Mundo Pódium não se responsabiliza por:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Resultados financeiros específicos</li>
                <li>Contratos ou reuniões fechados pelos participantes</li>
                <li>Decisões de negócio tomadas pelos participantes</li>
                <li>Problemas técnicos de terceiros (plataformas externas, provedor de pagamento)</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">8. Privacidade e Uso de Dados</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Ao utilizar este site, você concorda com a coleta e o uso de dados conforme nossa
                Política de Privacidade. Informações importantes:
              </p>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Uso de Dados para Marketing:</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                  <li>
                    Utilizamos tecnologias de rastreamento (Meta Pixel) para medir a eficácia de
                    campanhas de tráfego pago
                  </li>
                  <li>
                    Dados de navegação podem ser compartilhados com o Meta (Facebook/Instagram) para
                    personalização de anúncios
                  </li>
                  <li>
                    Esses dados são utilizados exclusivamente para otimização de campanhas
                    publicitárias
                  </li>
                  <li>
                    Você pode gerenciar suas preferências de cookies através do banner de
                    consentimento
                  </li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Consentimento</h3>
                    <p className="text-gray-300 text-sm">
                      Ao aceitar cookies de marketing, você autoriza o compartilhamento de dados de
                      navegação com o Meta para fins de publicidade personalizada. Este
                      consentimento pode ser revogado a qualquer momento. Para mais detalhes,
                      consulte nossa{' '}
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
                Todo o conteúdo, metodologia e materiais do Workshop Destrava Ligações e do Método
                Pódium são propriedade exclusiva da Mundo Pódium e estão protegidos por direitos
                autorais.
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
                Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações
                significativas serão comunicadas com antecedência quando possível.
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
                Para dúvidas sobre estes termos ou sobre o Workshop Destrava Ligações:
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
                Estes termos são regidos pela legislação brasileira e estão em conformidade com o
                Código de Defesa do Consumidor e demais normas aplicáveis.
              </p>
            </div>
          </section>
        </div>

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
