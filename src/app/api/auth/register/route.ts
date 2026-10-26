import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assertSessionConfiguration, hashPassword, setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, password, country, company, phone } = (body && typeof body === 'object' ? body : {}) as {
    name?: unknown;
    email?: unknown;
    password?: unknown;
    country?: unknown;
    company?: unknown;
    phone?: unknown;
  };
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ success: false, message: 'A valid email address is required.' }, { status: 400 });
  }
  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 120) {
    return NextResponse.json({ success: false, message: 'Full name must be between 2 and 120 characters.' }, { status: 400 });
  }
  if (typeof password !== 'string' || password.length < 12 || password.length > 128) {
    return NextResponse.json({ success: false, message: 'Password must be between 12 and 128 characters.' }, { status: 400 });
  }
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('your_')) {
    return NextResponse.json({ success: false, message: 'Registration service is not configured.' }, { status: 503 });
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();
  const assignedCountry = ['Germany', 'Bangladesh', 'International'].includes(String(country))
    ? String(country)
    : 'Germany';
  const cleanCompany = typeof company === 'string' && company.trim() ? company.trim().slice(0, 160) : 'Enterprise Partner';
  const cleanPhone = typeof phone === 'string' ? phone.trim().slice(0, 40) : null;
  const avatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80';

  try {
    assertSessionConfiguration();
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        passwordHash,
        role: 'client',
        country: assignedCountry,
        company: cleanCompany,
        phone: cleanPhone,
        avatar,
      },
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

    const response = NextResponse.json({
      success: true,
      message: 'Account successfully created.',
      user: { ...user, savedProjects: [], inquiries: [] },
    }, { status: 201 });
    return setSessionCookie(response, user.id);
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
      return NextResponse.json({ success: false, message: 'An account with this email already exists.' }, { status: 409 });
    }
    console.error('Registration failed:', error);
    const message = error instanceof Error && error.message.startsWith('SESSION_SECRET')
      ? 'Authentication is not configured. Set a strong SESSION_SECRET.'
      : 'Registration service is unavailable.';
    return NextResponse.json({ success: false, message }, { status: 503 });
  }
}
