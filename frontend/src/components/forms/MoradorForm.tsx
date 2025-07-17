'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { validarMorador } from '@/lib/validations/morador';

export default function MoradorForm({ onSuccess }: { onSuccess?: () => void }) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [comunidade, setComunidade] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validarMorador({ nome, idade, comunidade });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await api.post('/api/moradores', {
        nome,
        idade: Number(idade),
        comunidade,
      });

      alert('Morador cadastrado com sucesso!');
      setNome('');
      setIdade('');
      setComunidade('');
      setErrors({});

      if (onSuccess) onSuccess();
    } catch (err) {
      alert('Erro ao cadastrar morador');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
      <div>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
      </div>

      <div>
        <input
          type="number"
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        {errors.idade && <p className="text-red-500 text-sm">{errors.idade}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Comunidade"
          value={comunidade}
          onChange={(e) => setComunidade(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        {errors.comunidade && <p className="text-red-500 text-sm">{errors.comunidade}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Cadastrar
      </button>
    </form>
  );
}
