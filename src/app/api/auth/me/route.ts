import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ success: false, authenticated: false, user: null }, {
        status: 401,
        headers: { 'Cache-Control': 'no-store' },
      });
    }
    return NextResponse.json({
      success: true,
      authenticated: true,
      user: { ...user, savedProjects: [], inquiries: [] },
    }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    console.error('Session validation failed:', error);
    return NextResponse.json({ success: false, authenticated: false, user: null }, { status: 503 });
  }
}
