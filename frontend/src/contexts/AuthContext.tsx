'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  nome: string;
}

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (nome: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          api.defaults.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Falha na verificação de autenticação:", error);
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.log("Erro na resposta da API:", error.response.data);
            console.log("Status do erro:", error.response.status);

            if (error.response.status === 401 || error.response.status === 403) {
              console.log("Token inválido ou expirado. Realizando logout.");
              localStorage.removeItem('token');
              delete api.defaults.headers.Authorization;
              setUser(null);
            }
          } else if (error.request) {
              console.error("Erro de rede. Nenhuma resposta recebida:", error.request);
          } else {
              console.error("Erro de configuração do Axios:", error.message);
            }
        } else {
          console.error("Ocorreu um erro inesperado:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

  const login = async (email: string, senha: string) => {
    const response = await api.post('/api/auth/login', { email, senha });
    console.log(response.data)
    const { token, user: userData } = response.data;
    
    // Salvar token no localStorage e cookie
    localStorage.setItem('token', token);
    document.cookie = `token=${token}; path=/; max-age=86400; secure; samesite=strict`;
    
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(userData);
  };

  const register = async (nome: string, email: string, senha: string) => {
    const response = await api.post('/api/auth/register', { nome, email, senha });
    console.log(response.data)
    const { token, user: userData } = response.data;
    
    // Salvar token no localStorage e cookie
    localStorage.setItem('token', token);
    document.cookie = `token=${token}; path=/; max-age=86400; secure; samesite=strict`;
    
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    delete api.defaults.headers.Authorization;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};