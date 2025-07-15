export interface Morador {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  dataNascimento?: string;
  comunidadeId: number;

  comunidade?: {
    id: number;
    nome: string;
  };

  created_at?: string;
  updated_at?: string;

  senha?: string;
}
