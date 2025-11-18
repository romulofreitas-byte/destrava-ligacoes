import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-yellow-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-400 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-500 transition-colors"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}

