import { useState } from 'react';
import { MetricaCard } from './metricasCard';
import { Plus } from 'lucide-react';
import { MetricaForm } from './metricasForm';
import { Metrica } from '@/types/metrica';
import { ConfirmationModal } from './confirmationModal';

interface MetricasListProps {
    metricas: Metrica[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    loading?: boolean;
    error?: string;
}

export const MetricasList = ({
    metricas,
    onEdit,
    onDelete,
    loading,
    error
}: MetricasListProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingMetrica, setEditingMetrica] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [metricToDelete, setMetricToDelete] = useState<number | null>(null);

    const handleDeleteClick = (id: number) => {
        setMetricToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (metricToDelete) {
            onDelete(metricToDelete);
            setMetricToDelete(null);
        }
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-32 rounded-lg bg-gray-200 animate-pulse" />
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 p-4">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-black">Lista de Métricas</h2>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Métrica
                </button>
            </div>

            {isFormOpen && (
                <MetricaForm
                    onClose={() => {
                        setIsFormOpen(false);
                        setEditingMetrica(null);
                    }}
                    metricaId={editingMetrica}
                />
            )}

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirmar Exclusão"
                message="Tem certeza que deseja excluir esta métrica? Esta ação não pode ser desfeita."
                confirmText="Excluir"
                cancelText="Cancelar"
            />

            {metricas.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    Nenhuma métrica encontrada.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {metricas.map((metrica) => (
                        <MetricaCard
                            key={metrica.id}
                            metrica={metrica}
                            onEdit={() => {
                                setEditingMetrica(metrica.id);
                                setIsFormOpen(true);
                            }}
                            onDelete={() => handleDeleteClick(metrica.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};