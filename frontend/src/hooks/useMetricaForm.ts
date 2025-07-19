import { useEffect, useState } from 'react';
import { Metrica, MetricaFormData } from '@/lib/api';
import { useMetricas } from './useMetricas';

export const useMetricaForm = (metricaId?: number | null, onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [metrica, setMetrica] = useState<Metrica | null>(null);
  const { addMetrica, updateMetrica } = useMetricas();
  const getMetrica = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/metricas/${id}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      if (data.status === 'success') {
        const normalizedData = {
          ...data.data,
          iniciativaId: data.data.iniciativa_id || data.data.iniciativaId,
          valor: Number(data.data.valor)
        };
        setMetrica(normalizedData);
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
    } else {
      setMetrica(null)
    }
  }, [metricaId]);

  const onSubmit = async (formData: MetricaFormData) => {
    try {
      setLoading(true);

      const payload = {
        ...formData,
        valor: Number(formData.valor),
        iniciativa_id: formData.iniciativaId
      };

      const response = await fetch(metricaId ? `/api/metricas/${metricaId}` : '/api/metricas', {
        method: metricaId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      const normalizedData = {
        ...data.data,
        iniciativaId: data.data.iniciativa_id || data.data.iniciativaId,
        valor: Number(data.data.valor)
      };

      if (metricaId) {
        updateMetrica(normalizedData);
      } else {
        addMetrica(normalizedData);
      }

      onSuccess?.();
      return { success: true };

    } catch (error) {
      console.error('Erro:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading, metrica };
};