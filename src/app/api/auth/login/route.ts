import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assertSessionConfiguration, setSessionCookie, verifyPassword } from '@/lib/auth';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const { email, password } = (body && typeof body === 'object' ? body : {}) as {
    email?: unknown;
    password?: unknown;
  };
  if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
    return NextResponse.json({ success: false, message: 'Email and password are required.' }, { status: 400 });
  }

  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('your_')) {
    return NextResponse.json({ success: false, message: 'Authentication service is not configured.' }, { status: 503 });
  }

  try {
    assertSessionConfiguration();
    const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
    const validPassword = user ? await verifyPassword(password, user.passwordHash) : false;

    // Never allow credentials that were shipped as demo defaults in older releases.
    if (!user || !validPassword || ['admin123', 'client123'].includes(password)) {
      return NextResponse.json({ success: false, message: 'Invalid email or password.' }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      message: 'Login successful.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        country: user.country,
        company: user.company,
        phone: user.phone,
        avatar: user.avatar,
        savedProjects: [],
        inquiries: [],
      },
    });
    return setSessionCookie(response, user.id);
  } catch (error) {
    console.error('Login failed:', error);
    const message = error instanceof Error && error.message.startsWith('SESSION_SECRET')
      ? 'Authentication is not configured. Set a strong SESSION_SECRET.'
      : 'Authentication service is unavailable.';
    return NextResponse.json({ success: false, message }, { status: 503 });
  }
}
