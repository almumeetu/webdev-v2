import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/auth';

// Default seed accounts wired with process.env
const SEED_USERS = [
  {
    id: 'user-admin-1',
    name: 'Tanvir Hossain',
    email: (process.env.ADMIN_EMAIL || 'admin@webdevsoftware.com').toLowerCase(),
    password: process.env.ADMIN_PASSWORD || 'admin123',
    role: 'admin' as const,
    country: 'Germany' as const,
    company: 'WebDev Software Solutions',
    phone: '+880 1700-928374',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    savedProjects: ['proj-1', 'proj-2', 'proj-3'],
    inquiries: []
  },
  {
    id: 'user-admin-2',
    name: 'Tanvir Hossain',
    email: 'admin@webdevss.com',
    password: process.env.ADMIN_PASSWORD || 'admin123',
    role: 'admin' as const,
    country: 'Germany' as const,
    company: 'WebDev Software Solutions',
    phone: '+880 1700-928374',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    savedProjects: ['proj-1', 'proj-2', 'proj-3'],
    inquiries: []
  },
  {
    id: 'user-client-1',
    name: 'Lukas Schneider (Enterprise Partner)',
    email: 'client@enterprise.com',
    password: 'client123',
    role: 'client' as const,
    country: 'Germany' as const,
    company: 'Bavarian Tech Logistics GmbH',
    phone: '+49 171 000000',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    savedProjects: ['proj-1'],
    inquiries: []
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // ─── 1. PRISMA POSTGRESQL AUTHENTICATION (When Database is active) ──
    try {
      if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
        const dbUser = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        if (dbUser) {
          const isPasswordValid = await verifyPassword(password, dbUser.passwordHash);
          if (!isPasswordValid) {
            return NextResponse.json(
              { success: false, message: 'Invalid password. Please check your credentials.' },
              { status: 401 }
            );
          }

          const safeUser = {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            role: dbUser.role as 'admin' | 'client',
            country: dbUser.country,
            company: dbUser.company,
            phone: dbUser.phone,
            avatar: dbUser.avatar,
            savedProjects: ['proj-1', 'proj-2'],
            inquiries: []
          };

          const response = NextResponse.json({
            success: true,
            message: 'Login successful via PostgreSQL database.',
            user: safeUser,
            token: `session_${dbUser.id}_${Date.now()}`
          });

          response.cookies.set('webdev_session', dbUser.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 days
          });

          return response;
        }
      }
    } catch (dbError) {
      console.warn('⚠️ Prisma PostgreSQL query failed, falling back to local auth:', dbError);
    }

    // ─── 2. LOCAL SEED USERS FALLBACK ────────────────────────────────────
    const seedUserWithEmail = SEED_USERS.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    if (seedUserWithEmail) {
      if (seedUserWithEmail.password !== password) {
        return NextResponse.json(
          { success: false, message: 'Invalid password. Please check your credentials.' },
          { status: 401 }
        );
      }

      // Exclude password from returned user profile
      const { password: _, ...userWithoutPassword } = seedUserWithEmail;
      
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        user: userWithoutPassword,
        token: `session_${seedUserWithEmail.id}_${Date.now()}`
      });

      // Set session cookie
      response.cookies.set('webdev_session', seedUserWithEmail.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return response;
    }

    // Strict authentication: If credentials do not match database or authorized account
    return NextResponse.json(
      { success: false, message: 'Invalid email or password. Please verify your credentials.' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error during authentication.' },
      { status: 500 }
    );
  }
}
