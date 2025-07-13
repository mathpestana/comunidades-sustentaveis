export interface User {
  id: string;
  email: string;
  nome: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  message: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
  message: string;
}

export interface AuthError {
  message: string;
  errors?: Record<string, string[]>;
}