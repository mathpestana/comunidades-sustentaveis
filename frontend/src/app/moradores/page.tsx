'use client';

import { useState, useEffect } from 'react';
import { moradoresApi } from '@/lib/api';
import Link from 'next/link';

// Tipos
interface Morador {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  comunidadeId: number;
  createdAt: string;
  updatedAt: string;
}

export default function MoradoresPage() {
  const [moradores, setMoradores] = useState<Morador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMorador, setSelectedMorador] = useState<Morador | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Buscar moradores
  const fetchMoradores = async () => {
  try {
    setLoading(true);
    setError(null);

    const response = await moradoresApi.getAll();
    console.log('📦 Dados da API:', response.data);

    // Corrigido: acessar o array dentro de response.data.data
    setMoradores(Array.isArray(response.data.data) ? response.data.data : []);
  } catch (err: unknown) {
    console.error('Erro ao buscar moradores:', err);
    setError('Erro ao carregar moradores. Verifique sua conexão.');
  } finally {
    setLoading(false);
  }
};

  // Buscar detalhes de um morador
  const fetchMoradorDetails = async (id: number) => {
    try {
      const response = await moradoresApi.getById(id);
      setSelectedMorador(response.data);
    } catch (err) {
      console.error('Erro ao buscar detalhes:', err);
    }
  };

  // Deletar morador
  const deleteMorador = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este morador?')) return;
    
    try {
      await moradoresApi.delete(id);
      setMoradores(prev => prev.filter(m => m.id !== id));
      if (selectedMorador?.id === id) {
        setSelectedMorador(null);
      }
    } catch (error) {
      console.error('Erro ao deletar morador:', error);
    }
  };

  // Filtrar moradores
  const filteredMoradores = Array.isArray(moradores)
  ? moradores.filter(morador =>
      morador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      morador.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

  useEffect(() => {
    fetchMoradores();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando moradores...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Erro ao carregar</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchMoradores}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">👥 Moradores</h1>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {moradores.length} moradores
                </span>
            </div>
            </Link>
            <nav className="flex space-x-4">
              <a href="/comunidades" className="text-gray-600 hover:text-blue-600">Comunidades</a>
              <a href="/iniciativas" className="text-gray-600 hover:text-blue-600">Iniciativas</a>
              <a href="/metricas" className="text-gray-600 hover:text-blue-600">Métricas</a>
            </nav>
          </div>
        </div>
      </header>
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Lista de Moradores */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Todos os Moradores
              </h2>
              <p className="text-gray-600 mb-4">
                Gerencie os moradores cadastrados no sistema
              </p>
              
              {/* Busca */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
              </div>
            </div>

            {filteredMoradores.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <div className="text-gray-400 text-6xl mb-4">👤</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'Nenhum morador encontrado' : 'Nenhum morador cadastrado'}
                </h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Tente ajustar sua busca' : 'Ainda não há moradores cadastrados no sistema'}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredMoradores.map((morador) => (
                  <div
                    key={morador.id}
                    className={`bg-white rounded-lg shadow-sm border p-6 cursor-pointer transition-all ${
                      selectedMorador?.id === morador.id
                        ? 'border-blue-500 shadow-md'
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                    onClick={() => fetchMoradorDetails(morador.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {morador.nome}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <span className="mr-2">📧</span>
                            <span>{morador.email}</span>
                          </div>
                          {morador.telefone && (
                            <div className="flex items-center">
                              <span className="mr-2">📞</span>
                              <span>{morador.telefone}</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <span className="mr-2">🏠</span>
                            <span className="truncate">{morador.endereco}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMorador(morador.id);
                          }}
                          className="text-red-500 hover:text-red-700 p-2"
                          title="Deletar"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Painel de Detalhes */}
          <div className="w-80">
            {selectedMorador ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Detalhes do Morador
                  </h3>
                  <button
                    onClick={() => setSelectedMorador(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome Completo
                    </label>
                    <p className="text-gray-900">{selectedMorador.nome}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <p className="text-gray-900">{selectedMorador.email}</p>
                  </div>

                  {selectedMorador.telefone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone
                      </label>
                      <p className="text-gray-900">{selectedMorador.telefone}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Endereço
                    </label>
                    <p className="text-gray-900">{selectedMorador.endereco}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID da Comunidade
                    </label>
                    <p className="text-gray-900">{selectedMorador.comunidadeId}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data de Cadastro
                    </label>
                    <p className="text-gray-900">
                      {new Date(selectedMorador.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Última Atualização
                    </label>
                    <p className="text-gray-900">
                      {new Date(selectedMorador.updatedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <button
                    onClick={() => deleteMorador(selectedMorador.id)}
                    className="w-full bg-red-50 text-red-700 px-4 py-2 rounded-md hover:bg-red-100 transition-colors"
                  >
                    🗑️ Deletar Morador
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-gray-400 text-4xl mb-3">👈</div>
                <p className="text-gray-500">
                  Selecione um morador para ver os detalhes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}