'use client';

import { useState, useEffect } from 'react';
import { comunidadesApi } from '@/lib/api';
import Link from 'next/link';

// Tipos
interface Comunidade {
  id: number;
  nome: string;
  localizacao: string;
  descricao?: string;
  dataFundacao?: string;
  populacao?: number;
  createdAt: string;
  updatedAt: string;
}

export default function ComunidadesPage() {

  const [comunidades, setComunidades] = useState<Comunidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedComunidade, setSelectedComunidade] = useState<Comunidade | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    localizacao: '',
    descricao: '',
    dataFundacao: '',
    populacao: ''
  });

  // Buscar comunidades
  const fetchComunidades = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await comunidadesApi.getAll();
      console.log('Resposta da API (getAll):', response); // Log mais detalhado

      // Verificar se a resposta é um array ou se está dentro de uma propriedade
      let comunidadesData = response.data;
      
      // Se a resposta não for um array, verificar se está em uma propriedade específica
      if (!Array.isArray(comunidadesData)) {
        if (comunidadesData.comunidades && Array.isArray(comunidadesData.comunidades)) {
          comunidadesData = comunidadesData.comunidades;
        } else if (comunidadesData.data && Array.isArray(comunidadesData.data)) {
          comunidadesData = comunidadesData.data;
        } else if (comunidadesData.items && Array.isArray(comunidadesData.items)) {
          comunidadesData = comunidadesData.items;
        } else {
          console.warn('Resposta da API não é um array:', comunidadesData);
          comunidadesData = [];
        }
      }
      
      setComunidades(comunidadesData);
    } catch (err: any) {                                                                      //precisa arrumar este any para fazer o deploy
      console.error('Erro ao buscar comunidades:', err);
      const errorMessage = err.response?.status === 401
        ? 'Não autorizado. Por favor, faça login para acessar as comunidades.'
        : err.response?.status === 404
        ? 'Rota de comunidades não encontrada. Verifique a configuração da API.'
        : 'Erro ao carregar comunidades. Verifique sua conexão ou tente novamente mais tarde.';
      setError(errorMessage);
      setComunidades([]);
    } finally {
      setLoading(false);
    }
  };

  // Buscar detalhes de uma comunidade
  const fetchComunidadeDetails = async (id: number) => {
    try {
      const response = await comunidadesApi.getById(id);
      console.log('Detalhes da comunidade:', response.data);

      let comunidadeData = response.data;
      
      if (!comunidadeData.id && comunidadeData.comunidade) {
        comunidadeData = comunidadeData.comunidade;
      } else if (!comunidadeData.id && comunidadeData.data) {
        comunidadeData = comunidadeData.data;
      }
      
      setSelectedComunidade(comunidadeData);
    } catch (err) {
      console.error('Erro ao buscar detalhes:', err);
      setError('Erro ao carregar detalhes da comunidade.');
    }
  };

  // Criar nova comunidade
  const createComunidade = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setCreating(true);
      
      const data = {
        nome: formData.nome,
        localizacao: formData.localizacao,
        descricao: formData.descricao || undefined,
        dataFundacao: formData.dataFundacao || undefined,
        populacao: formData.populacao ? parseInt(formData.populacao) : undefined
      };
      
      const response = await comunidadesApi.create(data);
      console.log('Comunidade criada:', response.data);
      
      await fetchComunidades();
      
      setFormData({
        nome: '',
        localizacao: '',
        descricao: '',
        dataFundacao: '',
        populacao: ''
      });
      setShowCreateForm(false);
      
    } catch (err) {
      console.error('Erro ao criar comunidade:', err);
      alert('Erro ao criar comunidade. Verifique os dados e tente novamente.');
    } finally {
      setCreating(false);
    }
  };

  // Deletar comunidade
  const deleteComunidade = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar esta comunidade?')) return;
    
    try {
      await comunidadesApi.delete(id);
      setComunidades(prev => prev.filter(c => c.id !== id));
      if (selectedComunidade?.id === id) {
        setSelectedComunidade(null);
      }
    } catch (err) {
      console.error('Erro ao deletar comunidade:', err);
      alert('Erro ao deletar comunidade');
    }
  };

  useEffect(() => {
    fetchComunidades();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando comunidades...</p>
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
            onClick={fetchComunidades}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Link href="/dashboard">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">🌱</span>
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Comunidades
                  </h1>
                </Link>
              </div>
              <span className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                {comunidades.length} comunidades
              </span>
            </div>
            <nav className="flex space-x-6">
              <a href="/moradores" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Moradores</a>
              <a href="/iniciativas" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Iniciativas</a>
              <a href="/metricas" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Métricas</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Lista de Comunidades */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Todas as Comunidades
                </h2>
                <p className="text-gray-600">
                  Clique em uma comunidade para ver mais detalhes
                </p>
              </div>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                ➕ Nova Comunidade
              </button>
            </div>

            {Array.isArray(comunidades) && comunidades.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="text-gray-400 text-8xl mb-6">🏘️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Nenhuma comunidade encontrada
                </h3>
                <p className="text-gray-500 mb-6">
                  Ainda não há comunidades cadastradas no sistema
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  ➕ Criar Primeira Comunidade
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {Array.isArray(comunidades) && comunidades.map((comunidade) => (
                  <div
                    key={comunidade.id}
                    className={`bg-white rounded-2xl shadow-lg border-2 p-8 cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
                      selectedComunidade?.id === comunidade.id
                        ? 'border-green-400 shadow-green-100'
                        : 'border-gray-100 hover:border-green-200'
                    }`}
                    onClick={() => fetchComunidadeDetails(comunidade.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {comunidade.nome}
                        </h3>
                        {comunidade.descricao && (
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {comunidade.descricao}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                            <span className="mr-2">📍</span>
                            <span>{comunidade.localizacao}</span>
                          </div>
                          {comunidade.populacao && (
                            <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                              <span className="mr-2">👥</span>
                              <span>{comunidade.populacao.toLocaleString()} habitantes</span>
                            </div>
                          )}
                          {comunidade.dataFundacao && (
                            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                              <span className="mr-2">📅</span>
                              <span>{new Date(comunidade.dataFundacao).toLocaleDateString('pt-BR')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-6">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteComunidade(comunidade.id);
                          }}
                          className="text-red-500 hover:text-red-700 p-3 rounded-full hover:bg-red-50 transition-colors"
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
          <div className="w-96">
            {selectedComunidade ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Detalhes da Comunidade
                  </h3>
                  <button
                    onClick={() => setSelectedComunidade(null)}
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedComunidade.nome}</p>
                  </div>

                  {selectedComunidade.descricao && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Descrição
                      </label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedComunidade.descricao}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Localização
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedComunidade.localizacao}</p>
                  </div>

                  {selectedComunidade.populacao && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        População
                      </label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedComunidade.populacao.toLocaleString()} habitantes</p>
                    </div>
                  )}

                  {selectedComunidade.dataFundacao && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Data de Fundação
                      </label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {new Date(selectedComunidade.dataFundacao).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Data de Criação
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {new Date(selectedComunidade.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Última Atualização
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {new Date(selectedComunidade.updatedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <button
                    onClick={() => deleteComunidade(selectedComunidade.id)}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    🗑️ Deletar Comunidade
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center border border-gray-200">
                <div className="text-gray-400 text-6xl mb-4">👈</div>
                <p className="text-gray-500 font-medium">
                  Selecione uma comunidade para ver os detalhes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal para criar nova comunidade */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Nova Comunidade</h2>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={createComunidade} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Nome da comunidade"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Localização *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.localizacao}
                    onChange={(e) => setFormData({...formData, localizacao: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Cidade, Estado"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Descrição da comunidade"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Data de Fundação
                  </label>
                  <input
                    type="date"
                    value={formData.dataFundacao}
                    onChange={(e) => setFormData({...formData, dataFundacao: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    População
                  </label>
                  <input
                    type="number"
                    value={formData.populacao}
                    onChange={(e) => setFormData({...formData, populacao: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Número de habitantes"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50"
                  >
                    {creating ? 'Criando...' : 'Criar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}