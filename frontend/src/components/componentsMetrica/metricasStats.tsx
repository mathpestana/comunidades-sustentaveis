'use client';

import { Metrica } from "@/types/metrica";
import { calculateStats } from "@/lib/validations/metrica";
import { BarChart2, Clock, Maximize2, Minimize2 } from 'lucide-react';

export const MetricasStats = ({ metricas }: { metricas: Metrica[] }) => {
  const stats = calculateStats(metricas);
  
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="flex items-center">
          <BarChart2 className="h-5 w-5 text-blue-500 mr-2" />
          <h4 className="text-gray-500 text-sm font-medium">Total de Métricas</h4>
        </div>
        <p className="text-2xl font-bold mt-1 text-black">{stats.totalMetricas}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="flex items-center">
          <Maximize2 className="h-5 w-5 text-green-500 mr-2" />
          <h4 className="text-gray-500 text-sm font-medium">Valor Máximo</h4>
        </div>
        <p className="text-2xl font-bold mt-1 text-black">
          {stats.valorMaximo.toFixed(2)}
        </p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="flex items-center">
          <Minimize2 className="h-5 w-5 text-yellow-500 mr-2" />
          <h4 className="text-gray-500 text-sm font-medium">Valor Médio</h4>
        </div>
        <p className="text-2xl font-bold mt-1 text-black">
          {stats.valorMedio.toFixed(2)}
        </p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-purple-500 mr-2" />
          <h4 className="text-gray-500 text-sm font-medium">Última Atualização</h4>
        </div>
        <p className="text-2xl font-bold mt-1 text-black">
          {stats.ultimaAtualizacao.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};