'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { CheckCircle, Users, Calendar, ArrowRight, CreditCard, Mail, Clock, Video, Share2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/sections/Footer').then(mod => ({ default: mod.Footer })), { ssr: false });

function ObrigadoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    // Verificar se há dados do lead no localStorage
    const leadData = localStorage.getItem('leadData');
    
    // Permitir acesso direto em desenvolvimento (localhost)
    const isDevelopment = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    
    if (!leadData && !isDevelopment) {
      // Se não houver dados e não estiver em desenvolvimento, redirecionar para a página principal
      router.push('/workshop-destrava-ligacoes');
    }

    // Verificar se veio do PagSeguro (pode ter parâmetros na URL)
    const transactionId = searchParams?.get('transaction_id');
    const paymentStatus = searchParams?.get('status');
    
    if (transactionId || paymentStatus) {
      setPaymentConfirmed(true);
    }
  }, [router, searchParams]);

  return (
    <main className="min-h-screen bg-gray-900">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <section className="relative overflow-hidden py-12 md:py-20 lg:py-32">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Main Card */}
            <div className="bg-gray-800/40 border-2 border-yellow-400/50 rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-sm shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 relative overflow-hidden group animate-fade-in-up">
              {/* Animated border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
              
              <div className="relative z-10">
                {/* Success Header */}
                <div className="text-center mb-8">
                  {/* Ícone centralizado */}
                  <div className="flex justify-center mb-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-400/20 border-2 border-green-400/50 rounded-full">
                      <CheckCircle className="w-12 h-12 text-green-400" />
                    </div>
                  </div>
                  
                  {/* Badge centralizado abaixo do ícone */}
                  <div className="flex justify-center mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400/20 to-green-500/10 border border-green-400/30 rounded-full backdrop-blur-md shadow-lg shadow-green-400/20">
                      <span className="text-green-400 font-semibold text-xs tracking-wide drop-shadow-sm">Pagamento Confirmado</span>
                    </div>
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                    Obrigado por garantir sua vaga no{' '}
                    <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">Workshop Destrava Ligações!</span>
                  </h1>
                  
                  {paymentConfirmed && (
                    <div className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full mb-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                      <CreditCard className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-green-400 text-sm font-semibold">Pagamento de R$ 9,99 confirmado</span>
                    </div>
                  )}
                  
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                    Seu compromisso em participar e aprender está garantido. Agora é só aguardar o workshop e aproveitar ao máximo!
                  </p>
                </div>

          {/* Next Steps */}
                <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 hover:border-yellow-400/50 transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/30 rounded-xl flex items-center justify-center flex-shrink-0 mr-4">
                        <Users className="w-6 h-6 text-yellow-400" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">
                Próximos Passos
              </h2>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Step 1 */}
                      <div className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-green-400/50 transition-all duration-300">
                        <div className="w-10 h-10 bg-green-400/10 border border-green-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-green-400 font-bold text-lg">1</span>
                  </div>
                  <div className="flex-1">
                          <h3 className="text-white font-bold text-lg mb-2">Entre na Comunidade Pódium</h3>
                          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      Junte-se à comunidade &quot;Construindo Empresários&quot; e comece a interagir com outros profissionais.
                    </p>
                    <a
                      href="https://chat.whatsapp.com/L4camOPOJMxDb8et6M80oN"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/40 hover:scale-105"
                    >
                      Acessar Comunidade no WhatsApp
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>

                      {/* Step 2 */}
                      <div className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300">
                        <div className="w-10 h-10 bg-yellow-400/10 border border-yellow-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-yellow-400 font-bold text-lg">2</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg mb-2">Fique Atento ao E-mail e Comunidade</h3>
                          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                            O link de acesso ao workshop será enviado por <strong className="text-yellow-400">e-mail</strong> e também disponibilizado na <strong className="text-green-400">Comunidade Pódium</strong> alguns dias antes do evento.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <div className="inline-flex items-center px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full">
                              <Mail className="w-4 h-4 text-yellow-400 mr-2" />
                              <span className="text-gray-300 text-sm">Verifique seu e-mail</span>
                            </div>
                            <a
                              href="https://chat.whatsapp.com/L4camOPOJMxDb8et6M80oN"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 bg-green-400/10 border border-green-400/30 rounded-full hover:bg-green-400/20 hover:border-green-400/50 transition-all duration-300"
                            >
                              <Users className="w-4 h-4 text-green-400 mr-2" />
                              <span className="text-gray-300 text-sm">Acesse a Comunidade</span>
                            </a>
                          </div>
                        </div>
                      </div>
                </div>
              </div>
            </div>

            {/* Event Details */}
                <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 hover:border-yellow-400/50 transition-all duration-300">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center">
                      <Calendar className="w-6 h-6 text-yellow-400 mr-3" />
                      Detalhes do Workshop
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300">
                        <div className="w-8 h-8 bg-yellow-400/10 border border-yellow-400/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4 text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Data</p>
                          <p className="text-white font-semibold text-sm">26 de Novembro de 2025</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300">
                        <div className="w-8 h-8 bg-yellow-400/10 border border-yellow-400/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Horário</p>
                          <p className="text-white font-semibold text-sm">13h</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300">
                        <div className="w-8 h-8 bg-yellow-400/10 border border-yellow-400/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Duração</p>
                          <p className="text-white font-semibold text-sm">3 horas intensas</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300">
                        <div className="w-8 h-8 bg-yellow-400/10 border border-yellow-400/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Video className="w-4 h-4 text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Formato</p>
                          <p className="text-white font-semibold text-sm">Online • Ao vivo</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Botão de Compartilhar */}
                    <div className="mt-6 p-5 bg-gradient-to-br from-green-400/20 via-green-500/15 to-green-400/20 rounded-xl border-2 border-green-400/60 hover:border-green-400 transition-all duration-300">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-3">
                          <div className="w-12 h-12 bg-green-400/20 border-2 border-green-400/60 rounded-xl flex items-center justify-center">
                            <Share2 className="w-6 h-6 text-green-400" />
                          </div>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">Compartilhe com outros profissionais</h4>
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                          Ajude outros empresários a destravarem suas ligações e marcarem mais reuniões de vendas.
                        </p>
                        <button
                          onClick={() => {
                            const url = typeof window !== 'undefined' ? window.location.origin + '/workshop-destrava-ligacoes' : '';
                            const text = 'Acabei de garantir minha vaga no Workshop Destrava Ligações! 🚀 Aprenda a fazer cold call e marcar reuniões de vendas em 48h.';
                            if (navigator.share) {
                              navigator.share({
                                title: 'Workshop Destrava Ligações',
                                text: text,
                                url: url,
                              }).catch(() => {
                                // Fallback para copiar link
                                navigator.clipboard.writeText(url);
                                alert('Link copiado para a área de transferência!');
                              });
                            } else {
                              // Fallback para copiar link
                              navigator.clipboard.writeText(url);
                              alert('Link copiado para a área de transferência!');
                            }
                          }}
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/40 hover:scale-105"
                        >
                          <Share2 className="w-5 h-5 mr-2" />
                          Compartilhar Workshop
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back Link */}
                <div className="text-center animate-fade-in-up" style={{animationDelay: '0.8s'}}>
                  <Link
                    href="/workshop-destrava-ligacoes"
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm inline-flex items-center"
                  >
                    ← Voltar para a página do workshop
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ObrigadoPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </main>
    }>
      <ObrigadoContent />
    </Suspense>
  );
}

