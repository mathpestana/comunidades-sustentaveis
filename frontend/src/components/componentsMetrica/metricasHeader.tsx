import { Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const MetricasHeader = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h1 className="ml-3 text-xl font-bold text-gray-900">
              Métricas
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Olá, {user?.nome}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};