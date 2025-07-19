'use client';

import { useEffect, useState } from 'react';
import { useMetricas } from '@/hooks/useMetricas';
import { MetricasHeader } from '@/components/componentsMetrica/metricasHeader';
import { MetricasFilters } from '@/components/componentsMetrica/metricasFilters';
import { MetricasStats } from '@/components/componentsMetrica/metricasStats';
import { MetricasList } from '@/components/componentsMetrica/metricasLists';
import { filterMetricas } from "@/lib/validations/metrica";
import { MetricasPagination } from '@/components/componentsMetrica/metricasPagination';

export default function MetricasPage() {
  const { metricas, loading, error, deleteMetrica, fetchMetricas } = useMetricas();
  const [filters, setFilters] = useState({
    search: '',
    iniciativa: '',
    tipo: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await fetchMetricas();
      setDataLoaded(true);
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      fetchMetricas();
    };

    window.addEventListener('metricasUpdated', handleUpdate);
    return () => window.removeEventListener('metricasUpdated', handleUpdate);
  }, [fetchMetricas]);

  const handleFilterChange = (newFilters: { search?: string; iniciativa?: string; tipo?: string }) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handleDelete = async (id: number) => {
    const result = await deleteMetrica(id);
    if (result.success) {
      fetchMetricas();
    }
  };

  if (loading || !dataLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando métricas...</p>
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
            onClick={fetchMetricas}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  const filteredMetricas = filterMetricas(metricas, filters);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredMetricas.length / itemsPerPage);
  const paginatedMetricas = filteredMetricas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <MetricasHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Métricas</h1>

          <MetricasFilters
            metricas={metricas}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <MetricasStats metricas={filteredMetricas} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <MetricasList
            metricas={paginatedMetricas}
            onEdit={(id) => console.log('Editar', id)}
            onDelete={handleDelete}
            loading={loading}
            error={error}
          />

          {totalPages > 1 && (
            <div className="mt-6">
              <MetricasPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}