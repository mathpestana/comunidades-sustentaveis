import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000, // Aumentado para 30 segundos para lidar com atrasos no Render
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tipos para as entidades
interface ComunidadeData {
  nome: string;
  localizacao: string;
  descricao?: string;
  dataFundacao?: string;
  populacao?: number;
}

interface MoradorData {
  nome: string;
  email: string;
  comunidadeId: number;
  // Adicione outros campos conforme necessário
}

export interface Iniciativa {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  dataInicio: string;
  dataFim: string;
  status: string;
  comunidadeId: number;
  responsavelId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Metrica {
  id: number;
  iniciativaId: number;
  tipo: string;
  valor: number;
  unidade: string;
  dataRegistro: string;
  createdAt?: string;
  updatedAt?: string;
  iniciativa?: Iniciativa;
}

export type MetricaFormData = {
  iniciativaId: number;
  tipo: string;
  valor: number;
  unidade: string;
  dataRegistro: string;
};

export interface MetricaResponse {
  success: boolean;
  data: Metrica | Metrica[];
  message?: string;
}

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    // Pegar token do localStorage se existir
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Se o token expirou, redirecionar para login
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Funções para Comunidades
export const comunidadesApi = {
  // Listar todas as comunidades
  getAll: () => api.get('/api/comunidades'), // Removido o prefixo /api para testar

  // Buscar comunidade por ID
  getById: (id: number) => api.get(`/api/comunidades/${id}`),

  // Criar nova comunidade
  create: (data: ComunidadeData) => api.post('/api/comunidades', data),

  // Atualizar comunidade
  update: (id: number, data: Partial<ComunidadeData>) => api.put(`/api/comunidades/${id}`, data),

  // Deletar comunidade
  delete: (id: number) => api.delete(`/api/comunidades/${id}`),
};

// Funções para Moradores
export const moradoresApi = {
  getAll: () => api.get('/api/moradores'),
  getById: (id: number) => api.get(`/api/moradores/${id}`),
  create: (data: MoradorData) => api.post('/api/moradores', data),
  update: (id: number, data: Partial<MoradorData>) => api.put(`/api/moradores/${id}`, data),
  delete: (id: number) => api.delete(`/api/moradores/${id}`),
};

// Funções para Iniciativas
export const iniciativasApi = {
  getAll: () => api.get('/api/iniciativas'),
  getById: (id: number) => api.get(`/api/iniciativas/${id}`),
  create: (data: Iniciativa) => api.post('/api/iniciativas', data),
  update: (id: number, data: Partial<Iniciativa>) => api.put(`/api/iniciativas/${id}`, data),
  delete: (id: number) => api.delete(`/api/iniciativas/${id}`),
};

// Funções para Métricas
export const metricasApi = {
  getAll: () => api.get('/api/metricas'),
  getById: (id: number) => api.get(`/api/metricas/${id}`),
  create: (data: MetricaFormData) => api.post<Metrica>('/api/metricas', data),
  update: (id: number, data: Partial<Metrica>) => api.put(`/api/metricas/${id}`, data),
  delete: (id: number) => api.delete(`/api/metricas/${id}`),
};

// Funções para Autenticação
export const authApi = {
  login: (email: string, senha: string) =>
    api.post('/api/auth/login', { email, senha }),

  register: (nome: string, email: string, senha: string, comunidadeId: number) =>
    api.post('/api/auth/register', { nome, email, senha, comunidadeId }),
};

// Funções para Dashboard
export const dashboardApi = {
  getMetricas: () => api.get('/api/dashboard/metricas'),
};

// Função para testar conectividade
export const testConnection = async () => {
  try {
    const response = await api.get('/api/comunidades'); // Ajustado para /comunidades
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error };
  }
};

export default api;