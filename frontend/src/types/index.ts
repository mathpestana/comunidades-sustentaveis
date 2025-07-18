export interface ComunidadeData {
  id: number;
  nome: string;
  localizacao: string;
  descricao?: string;
  dataFundacao?: string;
  populacao?: number;
  createdAt: string;
  updatedAt: string;
}

export interface MoradorData {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
  dataNascimento?: string;
  comunidadeId: number;
  comunidade?: ComunidadeData;
  createdAt: string;
  updatedAt: string;
}

export interface IniciativaData {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  status: 'ativa' | 'concluida' | 'pausada';
  dataInicio: string;
  dataFim?: string;
  responsavelId: number;
  comunidadeId: number;
  responsavel?: MoradorData;
  comunidade?: ComunidadeData;
  createdAt: string;
  updatedAt: string;
}

export interface MetricaData {
  id: number;
  tipo: string;
  valor: number;
  unidade: string;
  dataColeta: string;
  comunidadeId: number;
  iniciativaId?: number;
  observacoes?: string;
  comunidade?: ComunidadeData;
  iniciativa?: IniciativaData;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  nome: string;
  email: string;
  comunidadeId: number;
  comunidade?: ComunidadeData;
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
  metricasRecentes: MetricaData[];
}