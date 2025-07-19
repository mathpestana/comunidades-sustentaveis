import { Metrica } from '../api';

export const prepareChartData = (metricas: Metrica[]) => {
  return metricas.map(metrica => ({
    name: metrica.tipo,
    value: metrica.valor,
    iniciativa: metrica.iniciativa?.titulo ?? 'Sem iniciativa associada',
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
  if (!metricas || metricas.length === 0) return null;

  const valores = metricas
    .map(m => {

      const valor = typeof m.valor === 'string' ? parseFloat(m.valor) : m.valor;
      return typeof valor === 'number' ? valor : 0;
    })
    .filter(val => !isNaN(val))
    .filter(val => val !== 0);

  console.log('Valores calculados:', valores);

  if (valores.length === 0) return null;

  const total = valores.reduce((sum, val) => sum + val, 0);
  const media = total / valores.length;
  const max = Math.max(...valores);
  const min = Math.min(...valores);

  const datasValidas = metricas
    .map(m => {
      const dateStr = m.updatedAt || m.createdAt || m.dataRegistro;
      return dateStr ? new Date(dateStr).getTime() : 0;
    })
    .filter(time => time > 0);

  const ultimaAtualizacao = datasValidas.length > 0
    ? new Date(Math.max(...datasValidas))
    : new Date();

  return {
    totalMetricas: metricas.length,
    valorTotal: total,
    valorMedio: media,
    valorMaximo: max,
    valorMinimo: min,
    ultimaAtualizacao
  };
};