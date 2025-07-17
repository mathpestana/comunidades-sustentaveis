import { WrenchScrewdriverIcon, ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-8">
      <div className="text-center max-w-2xl mx-auto">
        
        <WrenchScrewdriverIcon className="h-20 w-20 mx-auto mb-6 text-cyan-400" />
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Página em Construção
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Nossa equipe está trabalhando duro para trazer um site incrível e cheio de novidades para você.
          Agradecemos a sua paciência!
        </p>

        <div className="mt-10 flex items-center justify-center gap-3 text-gray-400">
          <ClockIcon className="h-6 w-6" />
          <span>Volte em breve!</span>
        </div>

        <button>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Voltar para a Página Inicial
          </Link>
        </button>

      </div>
      <footer className="absolute bottom-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Sistema de Comunidades. Desenvolvido com ❤️ para comunidades.
      </footer>
    </main>
  );
}