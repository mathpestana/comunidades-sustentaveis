import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { metricaSchema } from '@/lib/validations/metrica';
import { MetricaSchema } from '@/lib/validations/metrica';
import { useEffect } from 'react';
import { useMetricaForm } from '@/hooks/useMetricaForm';

interface MetricaFormProps {
  onClose: () => void;
  metricaId?: number | null;
}

export const MetricaForm = ({ onClose, metricaId }: MetricaFormProps) => {
  const { onSubmit, loading, metrica } = useMetricaForm(metricaId, onClose);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<MetricaSchema>({
    resolver: zodResolver(metricaSchema),
    defaultValues: {
      iniciativaId: 1,
      tipo: '',
      valor: 0,
      unidade: '',
      dataRegistro: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    if (metrica) {
      console.log('Preenchendo formulário com:', metrica);
      reset({
        iniciativaId: metrica.iniciativaId,
        tipo: metrica.tipo,
        valor: metrica.valor,
        unidade: metrica.unidade,
        dataRegistro: metrica.dataRegistro.split('T')[0],
      });
    } else if (!metricaId) {
      reset({
        iniciativaId: 1,
        tipo: '',
        valor: 0,
        unidade: '',
        dataRegistro: new Date().toISOString().split('T')[0],
      });
    }
  }, [metrica, metricaId, reset]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-black">
        {metricaId ? 'Editar Métrica' : 'Nova Métrica'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
            Tipo
          </label>
          <input
            id="tipo"
            type="text"
            placeholder="Ex: reducaoCO2"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            {...register('tipo')}
          />
          {errors.tipo && (
            <p className="text-sm text-red-600">{errors.tipo.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
              Valor
            </label>
            <input
              id="valor"
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              {...register('valor', { valueAsNumber: true })}
            />
            {errors.valor && (
              <p className="text-sm text-red-600">{errors.valor.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="unidade" className="block text-sm font-medium text-gray-700">
              Unidade
            </label>
            <input
              id="unidade"
              type="text"
              placeholder="Ex: kg, litros"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              {...register('unidade')}
            />
            {errors.unidade && (
              <p className="text-sm text-red-600">{errors.unidade.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="dataRegistro" className="block text-sm font-medium text-gray-700">
            Data de Registro
          </label>
          <input
            id="dataRegistro"
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            {...register('dataRegistro')}
          />
          {errors.dataRegistro && (
            <p className="text-sm text-red-600">{errors.dataRegistro.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
};