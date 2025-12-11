import { NextResponse } from 'next/server';
import { getProfile, saveProfile } from '@/lib/profile';

export async function GET() {
  const data = getProfile();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    saveProfile(body);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 });
  }
}