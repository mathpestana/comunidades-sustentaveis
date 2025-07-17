import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  
  // Rotas que requerem autenticação
  const protectedRoutes = ['/dashboard', '/comunidades', '/iniciativas', '/metricas']  // '/dashboard' , '/comunidades', '/iniciativas', '/moradores', '/metricas'
  
  // Rotas que só podem ser acessadas por usuários não autenticados
  const authRoutes = ['/login', '/register', '/moradores']    //originais sao login e register 
  
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )
  
  const isAuthRoute = authRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )
  
  // Redirecionar para login se tentar acessar rota protegida sem token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Redirecionar para dashboard se tentar acessar rotas de auth com token
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/comunidades/:path*',
    '/iniciativas/:path*',
    '/moradores/:path*',
    '/metricas/:path*',
    '/login',
    '/register'
  ]
}