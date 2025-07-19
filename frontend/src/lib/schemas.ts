import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ser válido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const registerSchema = z.object({
  nome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ser válido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z
    .string()
    .min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

export const comunidadeSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  localizacao: z.string().min(2, 'Localização é obrigatória'),
  descricao: z.string().optional(),
  dataFundacao: z.string().optional(),
  populacao: z.number().min(0, 'População deve ser um número positivo').optional(),
});

export const moradorSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  telefone: z.string().optional(),
  endereco: z.string().optional(),
  dataNascimento: z.string().optional(),
  comunidadeId: z.number().min(1, 'Selecione uma comunidade'),
});

const statusEnum = z.enum(['ativa', 'concluida', 'pausada']);

export const iniciativaSchema = z.object({
  titulo: z.string().min(2, 'Título deve ter pelo menos 2 caracteres'),
  descricao: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  status: statusEnum.refine(
    (val) => ['ativa', 'concluida', 'pausada'].includes(val),
    { message: 'Status deve ser ativa, concluída ou pausada' }
  ),
  dataInicio: z.string().min(1, 'Data de início é obrigatória'),
  dataFim: z.string().optional(),
  responsavelId: z.number().min(1, 'Selecione um responsável'),
  comunidadeId: z.number().min(1, 'Selecione uma comunidade'),
});

export const metricaSchema = z.object({
  iniciativaId: z.number().min(1, 'ID da iniciativa é obrigatório'),
  tipo: z.string().min(1, 'Tipo da métrica é obrigatório'),
  valor: z.number(),
  unidade: z.string().min(1, 'Unidade é obrigatória'),
  dataRegistro: z.string()
  .min(1, 'Data de registro é obrigatória')
  .transform(date => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }),
});


export type ComunidadeData = z.infer<typeof comunidadeSchema>;
export type MoradorData = z.infer<typeof moradorSchema>;
export type IniciativaData = z.infer<typeof iniciativaSchema>;
export type MetricaSchema = z.infer<typeof metricaSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;