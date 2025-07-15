'use client';

import { useMoradores } from '@/hooks/useMoradores';
// import MoradorForm from '@/components/forms/MoradorForm';
import { Users } from 'lucide-react';

export default function MoradoresPage() {
  const { moradores, loading, refetch } = useMoradores();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Users className="text-blue-600" />
        Moradores
      </h1>

      <div className="mb-10">
        {/* <MoradorForm onSuccess={refetch} /> */}
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lista de Moradores</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : moradores.length === 0 ? (
        <p>Nenhum morador cadastrado.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moradores.map((morador: any) => (
            <div key={morador.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800">{morador.nome}</h3>
              <p className="text-gray-600">Idade: {morador.idade}</p>
              <p className="text-gray-600">Comunidade: {morador.comunidade}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
