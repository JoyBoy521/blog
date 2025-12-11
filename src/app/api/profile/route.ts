import { NextResponse } from 'next/server';
import { getProfile, saveProfile } from '@/lib/profile';

export async function GET() {
  try {
    const data = getProfile();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load profile' }, { status: 500 });
  }
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