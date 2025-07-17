import { useEffect, useState } from 'react';
import { Metrica, MetricaFormData } from '@/types/metrica';
import { useMetricas } from './useMetricas';

export const useMetricaForm = (metricaId?: number | null, onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [metrica, setMetrica] = useState<Metrica | null>(null);
  const { addMetrica, updateMetrica, fetchMetricas } = useMetricas();

  const API_URL = 'http://localhost:3000/api/metricas';

  const getMetrica = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${id}`);
      const data = await response.json();
      if (data.success) {
        setMetrica(data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar métrica:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (metricaId) {
      getMetrica(metricaId);
    }
  }, [metricaId]);

  const onSubmit = async (formData: MetricaFormData) => {
    try {
      setLoading(true);
      const url = metricaId ? `${API_URL}/${metricaId}` : API_URL;
      const method = metricaId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao salvar métrica');
      }

      fetchMetricas();
      if (metricaId) {
        updateMetrica(data.data);
      } else {
        addMetrica(data.data);
      }
      onSuccess?.();

      return { success: true, data };

    } catch (error) {
      if (error instanceof Error && error.message.includes('sucesso')) {
        fetchMetricas();
        onSuccess?.();
        return { success: true };
      }

      console.error('Erro:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading, metrica };
};