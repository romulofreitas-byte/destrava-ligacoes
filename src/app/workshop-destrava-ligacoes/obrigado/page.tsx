'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { CheckCircle, Users, Calendar, ArrowRight, CreditCard, Mail, Clock, Video, Share2, Phone, ExternalLink } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { WORKSHOP_INFO, WORKSHOP_MODULE_2_INFO, WORKSHOP_PLATFORM_RULES } from '@/lib/constants';

const Footer = dynamic(() => import('@/components/sections/Footer').then(mod => ({ default: mod.Footer })), { ssr: false });

function ObrigadoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [emailSent, setEmailSent] = useState<boolean | null>(null);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  useEffect(() => {
    // Verificar parâmetros do PagBank na URL
    const chargeId = searchParams?.get('charge_id');
    const paymentStatus = searchParams?.get('status');
    const referenceId = searchParams?.get('reference_id');
    
    // Verificar se há dados do lead no localStorage
    const leadData = localStorage.getItem('leadData');
    
    // Permitir acesso direto em desenvolvimento (localhost)
    const isDevelopment = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    
    // Se veio do PagBank com charge_id ou status, confirmar pagamento
    if (chargeId || paymentStatus === 'PAID' || paymentStatus === 'paid') {
      setPaymentConfirmed(true);
      
      // Salvar dados do pagamento no localStorage
      if (chargeId) {
        localStorage.setItem('pagamentoChargeId', chargeId);
        
        // Verificar se email já foi enviado e, se não, tentar enviar (fallback)
        // Aguardar um pouco para dar tempo do webhook processar
        setTimeout(() => {
          fetch(`/api/email/send?charge_id=${chargeId}`)
            .then(res => res.json())
            .then(data => {
              if (!data.found) {
                // Se não encontrou registro, tentar enviar email imediato
                console.log('📧 Email não encontrado no registro. Tentando enviar via fallback...');
                setEmailSent(false);
                fetch('/api/email/send', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chargeId: chargeId,
                    type: 'immediate',
                  }),
                })
                .then(res => res.json())
                .then(result => {
                  if (result.success) {
                    console.log('✅ Email enviado com sucesso via fallback');
                    setEmailSent(true);
                  } else {
                    console.error('❌ Erro ao enviar email via fallback:', result.error);
                    console.warn('⚠️ O email pode não ter sido enviado. Verifique os logs do servidor.');
                    setEmailSent(false);
                  }
                })
                .catch(err => {
                  console.error('❌ Erro ao enviar email (fallback):', err);
                  setEmailSent(false);
                });
              } else {
                console.log('✅ Email já foi enviado anteriormente');
                setEmailSent(true);
              }
            })
            .catch(err => {
              console.error('❌ Erro ao verificar status do email:', err);
              setEmailSent(false);
              // Tentar enviar mesmo assim
              fetch('/api/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chargeId: chargeId,
                  type: 'immediate',
                }),
              })
              .then(res => res.json())
              .then(result => {
                if (result.success) {
                  setEmailSent(true);
                }
              })
              .catch(fallbackErr => {
                console.error('❌ Erro ao enviar email (fallback após erro):', fallbackErr);
              });
            });
        }, 2000); // Aguardar 2 segundos para dar tempo do webhook processar
      }
      if (referenceId) {
        localStorage.setItem('pagamentoReferenceId', referenceId);
      }
    } else if (!leadData && !isDevelopment) {
      // Se não houver dados e não estiver em desenvolvimento, redirecionar para a página principal
      router.push('/workshop-destrava-ligacoes');
    }

    // Verificar se veio do PagSeguro (compatibilidade com sistema antigo)
    // IMPORTANTE: Só confirmar se o status for PAID/paid ou se tiver transactionId (assumindo que transactionId só vem em pagamentos confirmados)
    const transactionId = searchParams?.get('transaction_id');
    const isValidPaymentStatus = paymentStatus === 'PAID' || paymentStatus === 'paid' || paymentStatus === '3'; // '3' é código de pagamento aprovado no PagSeguro
    if (transactionId || isValidPaymentStatus) {
      setPaymentConfirmed(true);
    }
  }, [router, searchParams]);

  const handleResendEmail = async () => {
    const chargeId = searchParams?.get('charge_id');
    
    if (!chargeId) {
      setResendMessage('Não foi possível identificar o pagamento. Entre em contato pelo WhatsApp.');
      return;
    }

    setResendingEmail(true);
    setResendMessage('');

    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chargeId: chargeId,
          type: 'immediate',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setEmailSent(true);
        setResendMessage('✅ Email reenviado com sucesso! Verifique sua caixa de entrada e spam.');
      } else {
        setResendMessage('❌ Erro ao reenviar email. Entre em contato pelo WhatsApp.');
      }
    } catch (error) {
      console.error('Erro ao reenviar email:', error);
      setResendMessage('❌ Erro ao reenviar email. Entre em contato pelo WhatsApp.');
    } finally {
      setResendingEmail(false);
    }
  };

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
                      <span className="text-green-400 text-sm font-semibold">Pagamento confirmado</span>
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

                      {/* Email Status & Resend */}
                      {paymentConfirmed && (
                        <div className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-2xl border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300">
                          <div className="w-10 h-10 bg-blue-400/10 border border-blue-400/30 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Mail className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-bold text-lg mb-2">Status do E-mail de Confirmação</h3>
                            
                            {emailSent === null && (
                              <div className="flex items-center space-x-2 mb-3">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                                <p className="text-gray-300 text-sm">Verificando envio do e-mail...</p>
                              </div>
                            )}
                            
                            {emailSent === true && (
                              <div className="flex items-center space-x-2 mb-3">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <p className="text-green-400 text-sm font-semibold">E-mail de confirmação enviado com sucesso!</p>
                              </div>
                            )}
                            
                            {emailSent === false && (
                              <div className="mb-3">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                  <p className="text-yellow-400 text-sm font-semibold">E-mail não foi enviado automaticamente</p>
                                </div>
                                <p className="text-gray-300 text-sm mb-3">
                                  Não se preocupe! Você pode reenviar o e-mail de confirmação clicando no botão abaixo.
                                </p>
                              </div>
                            )}

                            {resendMessage && (
                              <div className={`p-3 rounded-lg mb-3 ${
                                resendMessage.includes('✅') 
                                  ? 'bg-green-500/20 border border-green-500/50 text-green-400' 
                                  : 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400'
                              }`}>
                                <p className="text-sm">{resendMessage}</p>
                              </div>
                            )}
                            
                            {(emailSent === false || emailSent === null) && (
                              <button
                                onClick={handleResendEmail}
                                disabled={resendingEmail}
                                className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                              >
                                {resendingEmail ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Enviando...
                                  </>
                                ) : (
                                  <>
                                    <Mail className="w-4 h-4 mr-2" />
                                    Reenviar E-mail de Confirmação
                                  </>
                                )}
                              </button>
                            )}
                            
                            <p className="text-gray-400 text-xs mt-3">
                              💡 Dica: Verifique também sua caixa de spam. Se não receber o e-mail, entre em contato pelo WhatsApp.
                            </p>
                          </div>
                        </div>
                      )}
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
                          <p className="text-gray-400 text-xs mb-1">Módulo 1</p>
                          <p className="text-white font-semibold text-sm">{WORKSHOP_INFO.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300">
                        <div className="w-8 h-8 bg-yellow-400/10 border border-yellow-400/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4 text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Módulo 2</p>
                          <p className="text-white font-semibold text-sm">{WORKSHOP_MODULE_2_INFO.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300">
                        <div className="w-8 h-8 bg-yellow-400/10 border border-yellow-400/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Horários</p>
                          <p className="text-white font-semibold text-sm">Módulo 1: {WORKSHOP_INFO.time}</p>
                          <p className="text-white font-semibold text-sm mt-1">Módulo 2: {WORKSHOP_MODULE_2_INFO.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300">
                        <div className="w-8 h-8 bg-yellow-400/10 border border-yellow-400/30 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Duração</p>
                          <p className="text-white font-semibold text-sm">6 horas (3h por módulo)</p>
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

                {/* Google Meet Access */}
                <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.75s'}}>
                  <div className="bg-gray-800/50 border border-blue-400/50 rounded-2xl p-6 hover:border-blue-400 transition-all duration-300">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center">
                      <Video className="w-6 h-6 text-blue-400 mr-3" />
                      Acesso ao Workshop - Google Meet
                    </h3>
                    
                    <div className="mb-6 p-4 bg-blue-400/10 border border-blue-400/30 rounded-xl">
                      <p className="text-white font-semibold mb-2">🎉 Acesso Imediato à Plataforma Mundo Pódium</p>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Parabéns! Você adquiriu o Workshop por R$ 497,00 e já tem acesso
                        imediato à Plataforma Mundo Pódium.{' '}
                        {WORKSHOP_PLATFORM_RULES.obrigadoPlatformAccessNote}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Google Meet Link */}
                      <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300">
                        <div className="flex items-start space-x-3 mb-3">
                          <div className="w-10 h-10 bg-blue-400/10 border border-blue-400/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Video className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-bold text-base mb-1">Link da Videochamada</h4>
                            <p className="text-gray-400 text-sm mb-3">
                              Clique no botão abaixo para acessar o Google Meet no dia do workshop
                            </p>
                            <a
                              href="https://meet.google.com/wnd-obfb-mha"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/40 hover:scale-105"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Acessar Google Meet
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Phone Access */}
                      <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300">
                        <div className="flex items-start space-x-3 mb-3">
                          <div className="w-10 h-10 bg-blue-400/10 border border-blue-400/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Phone className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-bold text-base mb-2">Acesso por Telefone</h4>
                            <div className="space-y-2">
                              <div>
                                <p className="text-gray-400 text-sm mb-1">Disque:</p>
                                <p className="text-white font-semibold text-sm">(BR) +55 11 4935-2548</p>
                                <p className="text-gray-300 text-sm">PIN: <span className="font-mono">222 404 360#</span></p>
                              </div>
                              <div className="mt-3">
                                <p className="text-gray-400 text-sm mb-2">Outros números de telefone:</p>
                                <a
                                  href="https://tel.meet/wnd-obfb-mha?pin=4955899739442"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors"
                                >
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  Ver outros números
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Workshop Info */}
                      <div className="p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-xl">
                        <p className="text-yellow-400 font-semibold text-sm mb-2">📅 Workshop Destrava Ligações | 2026</p>
                        <p className="text-gray-300 text-sm">
                          <strong>Módulo 1:</strong> {WORKSHOP_INFO.dateEmailLine}<br />
                          <strong>Módulo 2:</strong> {WORKSHOP_MODULE_2_INFO.dateEmailLine}<br />
                          <strong>Horário módulo 1:</strong> {WORKSHOP_INFO.time} ({WORKSHOP_INFO.timezone})<br />
                          <strong>Horário módulo 2:</strong> {WORKSHOP_MODULE_2_INFO.time} ({WORKSHOP_INFO.timezone})
                        </p>
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

