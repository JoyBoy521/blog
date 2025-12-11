import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// ⚠️ 生产环境请把密钥放在 .env 文件中
const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'cyber-space-high-security-protocol-key-v1'
);

// 默认密码: Cyber2077! 
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hei989860ke.';

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // 24小时有效
    .sign(SECRET_KEY);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, SECRET_KEY, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  // FIX: Next.js 15 中 cookies() 是异步的，必须 await
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}