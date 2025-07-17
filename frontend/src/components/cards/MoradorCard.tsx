import { useState } from 'react';
import { Morador } from '@/types/morador';
import MoradorModal from '@/components/modals/MoradorModal';

type Props = {
  morador: Morador;
};

export default function MoradorCard({ morador }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="bg-white shadow-md rounded-xl p-4 w-full max-w-md mx-auto my-4 border border-gray-200 cursor-pointer hover:shadow-lg transition"
      >
        <h2 className="text-xl font-semibold text-gray-800">{morador.nome}</h2>
        {morador.comunidade?.nome && (
          <p className="text-gray-600">Comunidade: {morador.comunidade.nome}</p>
        )}
      </div>

      <MoradorModal morador={showModal ? morador : null} onClose={() => setShowModal(false)} />
    </>
  );
}
