const DIAS = [
  {
    quando: 'Segunda, 09/11',
    hora: '13h',
    titulo: 'Primeiro encontro',
    detalhe:
      'Ao vivo, dentro da plataforma do Mundo Pódium. Antes das 13h, confirma a sua presença em Eventos futuros.',
  },
  {
    quando: 'Terça, 10/11',
    hora: 'Horário comercial',
    titulo: '5 ligações reais',
    detalhe: 'Neste dia não tem encontro às 13h. As ligações acontecem no horário comercial.',
  },
  {
    quando: 'Quarta, 11/11',
    hora: '13h',
    titulo: 'Segundo encontro',
    detalhe:
      'Ao vivo, de novo na plataforma. Confirma a presença em Eventos futuros, no mesmo lugar do primeiro encontro.',
  },
];

export function CorretoresObrigadoAgenda() {
  return (
    <div className="mt-10 space-y-8">
      <section>
        <h2 className="text-white text-lg font-bold">Como entrar</h2>
        <ol className="mt-4 grid gap-3">
          <li className="rounded-2xl border border-gray-700/50 bg-gray-800/40 p-5">
            <p className="text-yellow-400 text-xs font-black tracking-[0.14em]">01 · E-MAIL</p>
            <p className="mt-2 text-white font-bold text-lg">O acesso chega no Circle</p>
            <p className="mt-2 text-gray-300 text-sm sm:text-base leading-relaxed">
              A compra está confirmada. Você entra na plataforma do Mundo Pódium. O e-mail de acesso
              sai da própria plataforma, no Circle. É esse e-mail que abre a sua conta.
            </p>
          </li>
          <li className="rounded-2xl border border-gray-700/50 bg-gray-800/40 p-5">
            <p className="text-yellow-400 text-xs font-black tracking-[0.14em]">02 · PLATAFORMA</p>
            <p className="mt-2 text-white font-bold text-lg">Confirma os dois encontros</p>
            <p className="mt-2 text-gray-300 text-sm sm:text-base leading-relaxed">
              Dentro da plataforma, olhe à direita. O menu se chama Eventos futuros. Lá estão a
              segunda, 09/11, e a quarta, 11/11, às 13h. Confirma a participação nos dois.
            </p>
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-white text-lg font-bold">Os três dias</h2>
        <ol className="mt-4 grid gap-3">
          {DIAS.map((dia) => (
            <li
              key={dia.quando}
              className="rounded-2xl border border-gray-700/50 bg-gray-800/40 p-5 transition-colors duration-300 hover:border-yellow-400/50"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-yellow-400 text-sm font-bold">{dia.quando}</p>
                <p className="text-white text-sm font-black">{dia.hora}</p>
              </div>
              <p className="mt-2 text-white font-bold text-lg">{dia.titulo}</p>
              <p className="mt-2 text-gray-300 text-sm sm:text-base leading-relaxed">{dia.detalhe}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
