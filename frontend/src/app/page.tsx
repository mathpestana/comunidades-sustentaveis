'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Users, BarChart3, MapPin, Target, ArrowRight, LogIn, UserPlus } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">
                Sistema de Comunidades
              </h1>
            </div>
            
            <nav className="flex items-center space-x-4">
              {user ? (
                <Link 
                  href="/dashboard"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link 
                    href="/login"
                    className="text-gray-600 hover:text-gray-900 flex items-center"
                  >
                    <LogIn className="h-4 w-4 mr-1" />
                    Entrar
                  </Link>
                  <Link 
                    href="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Cadastrar
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Gerencie suas{' '}
            <span className="text-blue-600">Comunidades</span>
            <br />
            de forma simples
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Plataforma completa para gerenciar comunidades, moradores, iniciativas e métricas. 
            Tudo em um só lugar, simples e eficiente.
          </p>
          
          {user ? (
            <Link 
              href="/dashboard"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Acessar Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register"
                className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Começar agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/login"
                className="inline-flex items-center border border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Já tenho conta
                <LogIn className="ml-2 h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Principais funcionalidades
            </h3>
            <p className="text-gray-600 text-lg">
              Tudo que você precisa para gerenciar suas comunidades
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Comunidades
              </h4>
              <p className="text-gray-600">
                Gerencie todas as suas comunidades em um só lugar
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Moradores
              </h4>
              <p className="text-gray-600">
                Cadastre e acompanhe todos os moradores
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Iniciativas
              </h4>
              <p className="text-gray-600">
                Crie e gerencie iniciativas da comunidade
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-orange-100 p-3 rounded-lg w-fit mb-4">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Métricas
              </h4>
              <p className="text-gray-600">
                Acompanhe estatísticas e indicadores
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Pronto para começar?
          </h3>
          <p className="text-gray-600 text-lg mb-8">
            Crie sua conta gratuita e comece a gerenciar suas comunidades hoje mesmo.
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Criar conta grátis
                <UserPlus className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="/login"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Já tenho conta
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <span className="ml-2 text-lg font-semibold">
              Sistema de Comunidades
            </span>
          </div>
          <p className="text-gray-400">
            © {new Date().getFullYear()} Sistema de Comunidades. Desenvolvido com ❤️ para comunidades.
          </p>
        </div>
      </footer>
    </div>
)
}