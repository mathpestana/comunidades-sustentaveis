'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Users, MapPin, Target, BarChart3, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">
                Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {user ? `Olá, ${user?.nome}` : 'Olá, morador!'}
              </span>
              <button
                onClick={logout}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <Link href={"/"}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Sair
                </Link>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vindo ao Sistema de Comunidades
          </h2>
          <p className="text-gray-600">
            Gerencie suas comunidades, moradores, iniciativas e métricas
          </p>
        </div>

        {/* Cards de Navegação */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link 
            href="/comunidades"
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Comunidades
                </h3>
                <p className="text-gray-600 text-sm">
                  Gerenciar comunidades
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </Link>

          <Link 
            href="/moradores"
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Moradores
                </h3>
                <p className="text-gray-600 text-sm">
                  Cadastrar moradores
                </p>
              </div>
              <MapPin className="h-8 w-8 text-green-500" />
            </div>
          </Link>

          <Link 
            href="/iniciativas"
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Iniciativas
                </h3>
                <p className="text-gray-600 text-sm">
                  Gerenciar iniciativas
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </Link>

          <Link 
            href="/metricas"
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-orange-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Métricas
                </h3>
                <p className="text-gray-600 text-sm">
                  Visualizar métricas
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-500" />
            </div>
          </Link>
        </div>

        {/* Seção de Resumo */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resumo do Sistema
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">-</div>
              <div className="text-sm text-gray-600">Comunidades</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">-</div>
              <div className="text-sm text-gray-600">Moradores</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">-</div>
              <div className="text-sm text-gray-600">Iniciativas</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">-</div>
              <div className="text-sm text-gray-600">Métricas</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}