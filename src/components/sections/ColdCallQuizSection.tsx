'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export const ColdCallQuizSection: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'Quando você precisa fazer uma ligação de prospecção, você...',
      options: [
        'Liga imediatamente sem pensar muito',
        'Fica adiando e procrastinando',
        'Prepara tudo antes, mas ainda sente ansiedade',
        'Evita completamente e usa outros métodos'
      ]
    },
    {
      question: 'Durante uma ligação, você sente...',
      options: [
        'Totalmente confiante e no controle',
        'Um pouco nervoso, mas consegue seguir em frente',
        'Muito ansioso, com coração acelerado',
        'Travado, sem saber o que dizer'
      ]
    },
    {
      question: 'Você tem um script ou roteiro claro para suas ligações?',
      options: [
        'Sim, tenho um script testado e uso sempre',
        'Tenho algumas frases prontas, mas improviso bastante',
        'Não, eu improviso tudo na hora',
        'Não sei nem por onde começar'
      ]
    }
  ];

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const calculateResult = () => {
    const totalAnswers = Object.keys(selectedAnswers).length;
    if (totalAnswers < questions.length) {
      return null;
    }

    // Contar respostas que indicam trava (índices 2 e 3 geralmente indicam mais dificuldade)
    let travaScore = 0;
    Object.values(selectedAnswers).forEach((answer) => {
      if (answer >= 2) {
        travaScore++;
      }
    });

    if (travaScore >= 2) {
      return {
        title: 'Você trava em ligações',
        message: 'Você identificou que trava em ligações. Este workshop foi feito exatamente para você. Vamos destravar juntos!',
        color: 'red'
      };
    } else {
      return {
        title: 'Você tem potencial',
        message: 'Você já tem alguma base, mas pode melhorar muito. Este workshop vai te dar técnicas avançadas para aumentar sua conversão.',
        color: 'yellow'
      };
    }
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length === questions.length) {
      setShowResults(true);
    }
  };

  const result = showResults ? calculateResult() : null;

  if (showResults && result) {
    return (
      <section className="relative overflow-hidden py-12 md:py-16 bg-gray-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className={`bg-gray-800/40 border-2 ${
              result.color === 'red' ? 'border-red-400/50' : 'border-yellow-400/50'
            } rounded-3xl p-8 backdrop-blur-sm shadow-2xl text-center`}>
              <div className={`w-16 h-16 ${
                result.color === 'red' ? 'bg-red-400/20' : 'bg-yellow-400/20'
              } rounded-full flex items-center justify-center mx-auto mb-6`}>
                {result.color === 'red' ? (
                  <AlertCircle className="w-8 h-8 text-red-400" />
                ) : (
                  <CheckCircle2 className="w-8 h-8 text-yellow-400" />
                )}
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 ${
                result.color === 'red' ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {result.title}
              </h3>
              
              <p className="text-gray-300 text-base leading-relaxed mb-6">
                {result.message}
              </p>

              <button
                onClick={() => {
                  setShowResults(false);
                  setSelectedAnswers({});
                }}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Fazer novamente
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-12 md:py-16 bg-gray-900">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 rounded-full mb-6 backdrop-blur-md">
              <span className="text-yellow-400 font-semibold text-xs tracking-wide">Quiz Rápido</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Você trava em ligações?
            </h2>
            <p className="text-gray-400 text-sm">
              Responda 3 perguntas rápidas para descobrir
            </p>
          </div>

          <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
            <div className="space-y-6">
              {questions.map((q, qIndex) => (
                <div key={qIndex}>
                  <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">
                    {qIndex + 1}. {q.question}
                  </h3>
                  <div className="space-y-2">
                    {q.options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        onClick={() => handleAnswer(qIndex, oIndex)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
                          selectedAnswers[qIndex] === oIndex
                            ? 'border-yellow-400/50 bg-yellow-400/10 text-white'
                            : 'border-gray-700/50 bg-gray-900/30 text-gray-300 hover:border-yellow-400/30 hover:bg-yellow-400/5'
                        }`}
                      >
                        <span className="text-sm">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length < questions.length}
              className={`w-full mt-6 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                Object.keys(selectedAnswers).length === questions.length
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600 shadow-lg hover:shadow-yellow-400/30'
                  : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
              }`}
            >
              Ver Resultado
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};












