'use client';

import { Metrica } from "@/lib/api";
import { Search } from 'lucide-react';

interface MetricasFiltersProps {
  metricas: Metrica[];
  filters: {
    search: string;
    tipo: string;
  };
  onFilterChange: (filters: { search?: string; tipo?: string }) => void;
}

export const MetricasFilters = ({ filters, onFilterChange }: MetricasFiltersProps) => {

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por tipo..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-black"
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>
    </div>
  );
};