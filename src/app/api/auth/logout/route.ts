import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // FIX: Next.js 15 中 cookies() 是异步的，必须 await
  const cookieStore = await cookies();
  
  // 立即让 Cookie 过期
  cookieStore.set('session', '', { expires: new Date(0) });
  return NextResponse.json({ success: true });
}