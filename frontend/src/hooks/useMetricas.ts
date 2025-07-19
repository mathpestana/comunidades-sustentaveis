import { useState, useEffect } from 'react';
import { Metrica, metricasApi } from '@/lib/api';

interface ApiMetrica {
  id: number;
  iniciativa_id?: number;
  iniciativaId?: number;
  valor: number | string;
  tipo: string;
  unidade: string;
  data_registro?: string;
  dataRegistro?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const useMetricas = () => {
  const [metricas, setMetricas] = useState<Metrica[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetricas = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await metricasApi.getAll();
      
      const responseData = response.data?.data || response.data;
      
      if (!Array.isArray(responseData)) {
        throw new Error('Formato de resposta inesperado da API');
      }

      const normalizedData = responseData.map((metrica: ApiMetrica) => ({
        id: metrica.id,
        iniciativaId: metrica.iniciativa_id || metrica.iniciativaId || 0,
        valor: typeof metrica.valor === 'string' ? parseFloat(metrica.valor) || 0 : metrica.valor,
        tipo: metrica.tipo,
        unidade: metrica.unidade,
        dataRegistro: metrica.data_registro || metrica.dataRegistro || new Date().toISOString(),
        createdAt: metrica.createdAt,
        updatedAt: metrica.updatedAt
      } as Metrica));

      setMetricas(normalizedData);
    } catch (err) {
      console.error('Erro ao buscar métricas:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const deleteMetrica = async (id: number) => {
    try {
      await metricasApi.delete(id);
      setMetricas(prev => prev.filter(metrica => metrica.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Erro ao deletar métrica:', err);
      return {
        success: false,
        message: err instanceof Error ? err.message : 'Erro desconhecido'
      };
    }
  };

  useEffect(() => {
    fetchMetricas();
  }, []);

  const addMetrica = (newMetrica: Metrica) => {
    setMetricas(prev => [...prev, newMetrica]);
  };

  const updateMetrica = (updatedMetrica: Metrica) => {
    setMetricas(prev => prev.map(m =>
      m.id === updatedMetrica.id ? { ...m, ...updatedMetrica } : m
    ));
  };

  return { metricas, loading, error, fetchMetricas, deleteMetrica, addMetrica, updateMetrica };
};