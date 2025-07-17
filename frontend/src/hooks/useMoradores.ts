import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Morador } from '@/types/morador';

export function useMoradores() {
  const [moradores, setMoradores] = useState<Morador[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchMoradores() {
    try {
      const response = await api.get('/api/moradores');
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
