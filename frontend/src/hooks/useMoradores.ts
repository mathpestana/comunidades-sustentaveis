import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export function useMoradores() {
  const [moradores, setMoradores] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMoradores() {
    try {
      const response = await api.get('/moradores');
      setMoradores(response.data);
    } catch (error) {
      console.error('Erro ao buscar moradores:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMoradores();
  }, []);

  return { moradores, loading, refetch: fetchMoradores };
}
