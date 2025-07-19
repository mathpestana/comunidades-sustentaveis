import { useEffect, useState } from 'react';
import { Metrica, MetricaFormData, metricasApi } from '@/lib/api';
import { useMetricas } from './useMetricas';

export const useMetricaForm = (metricaId?: number | null, onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [metrica, setMetrica] = useState<Metrica | null>(null);
  const { addMetrica, updateMetrica } = useMetricas();

  const getMetrica = async (id: number) => {
    try {
      setLoading(true);
      const response = await metricasApi.getById(id);
      
      const apiData = response.data?.data || response.data;
      
      if (!apiData) {
        throw new Error('Dados da métrica não encontrados');
      }

      const normalizedData = {
        ...apiData,
        id: apiData.id,
        iniciativaId: apiData.iniciativa_id || apiData.iniciativaId,
        valor: Number(apiData.valor) || 0,
        tipo: apiData.tipo || '',
        unidade: apiData.unidade || '',
        dataRegistro: apiData.data_registro || apiData.dataRegistro || new Date().toISOString()
      };

      setMetrica(normalizedData);
    } catch (error) {
      console.error('Erro ao buscar métrica:', error);
      setMetrica(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (metricaId) {
      getMetrica(metricaId);
    } else {
      setMetrica(null);
    }
  }, [metricaId]);

  const onSubmit = async (formData: MetricaFormData) => {
    try {
      setLoading(true);

      const payload = {
        ...formData,
        valor: Number(formData.valor) || 0,
        iniciativa_id: formData.iniciativaId,
        data_registro: formData.dataRegistro
      };

      let response;
      if (metricaId) {
        response = await metricasApi.update(metricaId, payload);
      } else {
        response = await metricasApi.create(payload);
      }

      const responseData = response.data?.data || response.data;
      const normalizedData = {
        ...responseData,
        iniciativaId: responseData.iniciativa_id || responseData.iniciativaId,
        valor: Number(responseData.valor) || 0
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