import { useState, useEffect } from 'react';
import { Metrica } from '@/types/metrica';

export const useMetricas = () => {
  const [metricas, setMetricas] = useState<Metrica[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetricas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/metricas');
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setMetricas(data.data);
      } else {
        throw new Error(data.message || 'Erro ao carregar métricas');
      }
    } catch (err) {
      console.error('Erro ao buscar métricas:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const deleteMetrica = async (id: number) => {
    try {
      const response = await fetch(`/api/metricas/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao deletar métrica');
      }
      
      if (data.status === 'success') {
        setMetricas(metricas.filter(metrica => metrica.id !== id));
        return { success: true };
      }
      
      throw new Error(data.message || 'Erro ao deletar métrica');
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

  return { metricas, loading, error, fetchMetricas, deleteMetrica };
};