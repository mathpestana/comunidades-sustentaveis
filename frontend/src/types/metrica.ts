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

export type MetricaFormData = Omit<Metrica, 'id' | 'createdAt' | 'updatedAt' | 'iniciativa'>;

export interface MetricaResponse {
  success: boolean;
  data: Metrica | Metrica[];
  message?: string;
}