'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import RegisterForm from '@/components/forms/RegisterForm';
import { UserPlus, Home } from 'lucide-react';

export default function RegisterPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Criar nova conta
          </h1>
          <p className="text-gray-600">
            Preencha os dados para se cadastrar
          </p>
        </div>

        <RegisterForm />

        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-600">
            Já tem uma conta?{' '}
            <Link 
              href="/login" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Fazer login
            </Link>
          </p>
          
          <div className="flex items-center justify-center">
            <div className="border-t border-gray-200 flex-grow"></div>
            <span className="px-4 text-gray-500 text-sm">ou</span>
            <div className="border-t border-gray-200 flex-grow"></div>
          </div>

          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Home className="h-4 w-4 mr-2" />
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}