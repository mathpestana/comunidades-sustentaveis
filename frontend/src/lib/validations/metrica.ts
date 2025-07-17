import * as z from 'zod';
import { Metrica } from "@/types/metrica";

export const metricaSchema = z.object({
  iniciativaId: z.number().min(1, 'ID da iniciativa é obrigatório'),
  tipo: z.string().min(1, 'Tipo da métrica é obrigatório'),
  valor: z.number().min(0, 'Valor deve ser positivo'),
  unidade: z.string().min(1, 'Unidade é obrigatória'),
  dataRegistro: z.string().min(1, 'Data de registro é obrigatória'),
});

export const prepareChartData = (metricas: Metrica[]) => {
  return metricas.map(metrica => ({
    name: metrica.tipo,
    value: parseFloat(metrica.valor),
    iniciativa: metrica.iniciativa.titulo,
    date: new Date(metrica.dataRegistro).toLocaleDateString()
  }));
};

export const filterMetricas = (
  metricas: Metrica[],
  filters: { search: string; iniciativa: string; tipo: string }
) => {
  return metricas.filter(metrica => {
    const matchesSearch = metrica.tipo.toLowerCase().includes(filters.search.toLowerCase());
    const matchesIniciativa = filters.iniciativa === '' || metrica.iniciativaId.toString() === filters.iniciativa;
    const matchesTipo = filters.tipo === '' || metrica.tipo === filters.tipo;
    
    return matchesSearch && matchesIniciativa && matchesTipo;
  });
};

export const calculateStats = (metricas: Metrica[]) => {
  if (metricas.length === 0) return null;
  
  const valores = metricas.map(m => parseFloat(m.valor));
  const total = valores.reduce((sum, val) => sum + val, 0);
  const media = total / valores.length;
  const max = Math.max(...valores);
  const min = Math.min(...valores);
  
  return {
    totalMetricas: metricas.length,
    valorTotal: total,
    valorMedio: media,
    valorMaximo: max,
    valorMinimo: min,
    ultimaAtualizacao: new Date(Math.max(...metricas.map(m => new Date(m.updated_at).getTime())))
  };
};

export type MetricaSchema = z.infer<typeof metricaSchema>;