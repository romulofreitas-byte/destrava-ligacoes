import Image from 'next/image';
import type { Aula } from '@/content/aulas';

export function AulaFooter({ aula }: { aula: Aula }) {
  return (
    <footer className="border-t border-yellow-400/20 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logos-mundo-podium/logo_horizontal_claro.png"
            alt={aula.footer.brand}
            width={140}
            height={32}
            className="h-8 w-auto"
          />
        </div>
        <div className="text-xs leading-relaxed text-gray-400">
          <p>{aula.footer.brand}</p>
          <p>
            {aula.footer.razao} · CNPJ {aula.footer.cnpj}
          </p>
          <p>{aula.footer.cidade}</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-300">
          <a href={aula.footer.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
            Instagram
          </a>
          <a href={aula.footer.youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
            YouTube
          </a>
          <a href="/privacidade" className="hover:text-yellow-400">
            Política de Privacidade
          </a>
        </nav>
      </div>
    </footer>
  );
}
