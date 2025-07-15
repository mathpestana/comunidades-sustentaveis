'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function MoradorForm({ onSuccess }: { onSuccess?: () => void }) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [comunidade, setComunidade] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/moradores', {
        nome,
        idade: Number(idade),
        comunidade,
      });

      alert('Morador cadastrado com sucesso!');
      setNome('');
      setIdade('');
      setComunidade('');

      if (onSuccess) onSuccess();
    } catch (err) {
      alert('Erro ao cadastrar morador');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2"
      />
      <input
        type="number"
        placeholder="Idade"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2"
      />
      <input
        type="text"
        placeholder="Comunidade"
        value={comunidade}
        onChange={(e) => setComunidade(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Cadastrar
      </button>
    </form>
  );
}
