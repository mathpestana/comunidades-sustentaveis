'use client';

import { useState } from 'react';
import { useMetricas } from '@/hooks/useMetricas';
import { MetricasHeader } from '@/components/componentsMetrica/metricasHeader';
import { MetricasFilters } from '@/components/componentsMetrica/metricasFilters';
import { MetricasStats } from '@/components/componentsMetrica/metricasStats';
import { MetricasList } from '@/components/componentsMetrica/metricasLists';
import { MetricasPagination } from '@/components/componentsMetrica/metricasPagination';
import { prepareChartData, filterMetricas } from "@/lib/validations/metrica";

export default function MetricasPage() {
  const { metricas, loading, error } = useMetricas();
  const [filters, setFilters] = useState({
    search: '',
    iniciativa: '',
    tipo: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (newFilters: { search?: string; iniciativa?: string; tipo?: string }) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <MetricasHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">Carregando...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50">
      <MetricasHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-red-500">Erro: {error}</div>
    </div>
  );

  const filteredMetricas = filterMetricas(metricas, filters);
  const chartData = prepareChartData(filteredMetricas);
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
            onDelete={(id) => console.log('Deletar', id)}
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