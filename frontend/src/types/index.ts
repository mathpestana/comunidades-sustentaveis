export interface Comunidade {
  id: number;
  nome: string;
  localizacao: string;
  descricao?: string;
  dataFundacao?: string;
  populacao?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Morador {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
  dataNascimento?: string;
  comunidadeId: number;
  comunidade?: Comunidade;
  createdAt: string;
  updatedAt: string;
}

export interface Iniciativa {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  status: 'ativa' | 'concluida' | 'pausada';
  dataInicio: string;
  dataFim?: string;
  responsavelId: number;
  comunidadeId: number;
  responsavel?: Morador;
  comunidade?: Comunidade;
  createdAt: string;
  updatedAt: string;
}

export interface Metrica {
  id: number;
  tipo: string;
  valor: number;
  unidade: string;
  dataColeta: string;
  comunidadeId: number;
  iniciativaId?: number;
  observacoes?: string;
  comunidade?: Comunidade;
  iniciativa?: Iniciativa;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  nome: string;
  email: string;
  comunidadeId: number;
  comunidade?: Comunidade;
}

export interface AuthResponse {
  token: string;
  usuario: User;
}

export interface LoginData {
  email: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  comunidadeId: number;
}

export interface DashboardMetrics {
  totalComunidades: number;
  totalMoradores: number;
  totalIniciativas: number;
  totalMetricas: number;
  iniciativasAtivas: number;
  metricasRecentes: Metrica[];
}