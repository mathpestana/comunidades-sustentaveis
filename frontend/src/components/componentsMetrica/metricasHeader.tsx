import { ChartArea, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export const MetricasHeader = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ChartArea className="h-6 w-6 text-white" />
            </div>
            <h1 className="ml-3 text-xl font-bold text-gray-900">
              Métricas
            </h1>
          </div>
          
          <div className="hidden md:block">
            <nav className="flex space-x-6">
              <a href="/comunidades" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Comunidades</a>
              <a href="/moradores" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Moradores</a>
              <a href="/iniciativas" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Iniciativas</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden md:inline text-gray-600">
              Olá, {user?.nome}!
            </span>
            
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-3">
              <a 
                href="/comunidades" 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Comunidades
              </a>
              <a 
                href="/moradores" 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Moradores
              </a>
              <a 
                href="/iniciativas" 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Iniciativas
              </a>
              <div className="pt-2 border-t border-gray-200 md:hidden">
                <span className="text-gray-600 px-2 py-1">
                  Olá, {user?.nome}!
                </span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};