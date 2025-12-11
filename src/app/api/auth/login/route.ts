import { NextResponse } from 'next/server';
import { encrypt, ADMIN_PASSWORD } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    // 🛡️ 防爆破延时：强制等待 1秒
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'ACCESS_DENIED: Invalid Credentials' }, { status: 401 });
    }

    // 验证通过，生成 Token
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24小时
    const session = await encrypt({ user: 'admin', expires });

    // 🍪 设置高安全性 Cookie (HTTP-only)
    // FIX: Next.js 15 中 cookies() 是异步的，必须 await
    const cookieStore = await cookies();
    
    cookieStore.set('session', session, {
      expires,
      httpOnly: true, // 前端 JS 无法读取，防止 XSS
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'SYSTEM_FAILURE' }, { status: 500 });
  }
}