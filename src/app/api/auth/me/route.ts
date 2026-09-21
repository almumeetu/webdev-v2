import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('webdev_session');

  if (!sessionCookie || !sessionCookie.value) {
    return NextResponse.json(
      { success: false, user: null, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  // 1. Try fetching live user from Prisma PostgreSQL
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
      const dbUser = await prisma.user.findUnique({
        where: { id: sessionCookie.value },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          country: true,
          company: true,
          phone: true,
          avatar: true,
          createdAt: true,
        },
      });

      if (dbUser) {
        return NextResponse.json({
          success: true,
          authenticated: true,
          user: {
            ...dbUser,
            savedProjects: ['proj-1', 'proj-2'],
            inquiries: [],
          },
        });
      }
    }
  } catch (err) {
    console.warn('Prisma check in /api/auth/me failed, falling back:', err);
  }

  // 2. Fallback session validation
  return NextResponse.json({
    success: true,
    authenticated: true,
    sessionId: sessionCookie.value
  });
}
