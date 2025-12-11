'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ObrigadoPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para a plataforma Mundo Pódium
    // O checkout e página de obrigado agora são gerenciados pela plataforma
    window.location.href = 'https://plataforma.mundopodium.com.br/checkout/workshop-destrava-ligacoes';
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white text-center">
        <p>Redirecionando para a plataforma Mundo Pódium...</p>
      </div>
    </main>
  );
}
