'use client';

import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { Morador } from '@/types/morador';

type Props = {
  morador: Morador | null;
  onClose: () => void;
};

export default function MoradorModal({ morador, onClose }: Props) {
  if (!morador) return null;

  return (
    <Dialog open={!!morador} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center p-4 bg-black/40">
      <Dialog.Panel className="bg-white max-w-md w-full p-6 rounded-xl shadow-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X />
        </button>

        <Dialog.Title className="text-xl font-bold mb-4">Detalhes do Morador</Dialog.Title>
        <div className="space-y-2 text-gray-700">
          <p><strong>Nome:</strong> {morador.nome}</p>
          {morador.email && <p><strong>Email:</strong> {morador.email}</p>}
          {morador.telefone && <p><strong>Telefone:</strong> {morador.telefone}</p>}
          {morador.dataNascimento && <p><strong>Nascimento:</strong> {morador.dataNascimento}</p>}
          {morador.comunidade?.nome && <p><strong>Comunidade:</strong> {morador.comunidade.nome}</p>}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
