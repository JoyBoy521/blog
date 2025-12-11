import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 🔒 保护所有以 /admin 开头的路径
  const isProtectedRoute = path.startsWith('/admin');
  
  if (isProtectedRoute) {
    // 1. 获取 session cookie
    const cookie = request.cookies.get('session')?.value;
    
    // 2. 解密验证 session
    const session = await decrypt(cookie || '');

    // 3. 如果没有 session 或 session 无效，强制重定向到登录页
    if (!session) {
      // 🚨 关键：使用 NextResponse.rewrite 或 redirect 时，要确保 URL 是新的。
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 允许通过
  return NextResponse.next();
}

// 确保 Middleware 匹配 /admin 及其所有子路径
export const config = {
  matcher: ['/admin/:path*'],
};