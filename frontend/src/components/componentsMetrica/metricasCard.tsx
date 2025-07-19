import { Trash2, Edit } from 'lucide-react';

interface MetricaCardProps {
  metrica: {
    id: number;
    tipo: string;
    valor: number;
    unidade: string;
    dataRegistro: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export const MetricaCard = ({ metrica, onEdit, onDelete }: MetricaCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg capitalize text-black">{metrica.tipo}</h3>
          <p className="text-gray-600">
            {metrica.valor} {metrica.unidade}
          </p>
          <p className="text-sm text-gray-500">
            Registrado em: {new Date(metrica.dataRegistro).toLocaleDateString()}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            aria-label="Editar métrica"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
            aria-label="Excluir métrica"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};