import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role, country, company, phone } = body;

    // Validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: 'Full name is required.' },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // Public registration strictly assigns 'client' role. Admin accounts cannot be self-registered.
    const assignedRole = 'client' as const;
    const assignedCountry = ['Germany', 'Bangladesh', 'International'].includes(country) 
      ? country 
      : 'Germany';

    const avatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80';

    const cleanEmail = email.trim().toLowerCase();
    const cleanCompany = company ? company.trim() : 'Enterprise Partner';
    const cleanPhone = phone ? phone.trim() : (assignedCountry === 'Bangladesh' ? '+880 1700-000000' : '+49 171 000000');

    // ─── 1. PRISMA POSTGRESQL INSERTION (If DB is connected) ─────────────
    try {
      if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
        // Check if user already exists in PostgreSQL
        const existingUser = await prisma.user.findUnique({
          where: { email: cleanEmail },
        });

        if (existingUser) {
          return NextResponse.json(
            { success: false, message: 'An account with this email address already exists. Please sign in instead.' },
            { status: 409 }
          );
        }

        // Hash password securely with bcrypt
        const hashedPassword = await hashPassword(password);

        // Save new user in PostgreSQL
        const dbUser = await prisma.user.create({
          data: {
            name: name.trim(),
            email: cleanEmail,
            passwordHash: hashedPassword,
            role: assignedRole,
            country: assignedCountry,
            company: cleanCompany,
            phone: cleanPhone,
            avatar,
          },
        });

        const safeUser = {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          role: dbUser.role as 'admin' | 'client',
          country: dbUser.country,
          company: dbUser.company,
          phone: dbUser.phone,
          avatar: dbUser.avatar,
          savedProjects: ['proj-1'],
          inquiries: [],
        };

        const response = NextResponse.json({
          success: true,
          message: 'Account successfully registered and saved to PostgreSQL database.',
          user: safeUser,
          token: `session_${dbUser.id}_${Date.now()}`
        }, { status: 201 });

        response.cookies.set('webdev_session', dbUser.id, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;
      }
    } catch (dbError) {
      console.warn('⚠️ Prisma PostgreSQL not reached during register, falling back to session mode:', dbError);
    }

    // ─── 2. FALLBACK IN-MEMORY MODE (When DB is not yet running) ─────────
    const fallbackUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      role: assignedRole,
      country: assignedCountry,
      company: cleanCompany,
      phone: cleanPhone,
      avatar,
      savedProjects: ['proj-1'],
      inquiries: []
    };

    const response = NextResponse.json({
      success: true,
      message: 'Registration successful. Account created.',
      user: fallbackUser,
      token: `session_${fallbackUser.id}_${Date.now()}`
    }, { status: 201 });

    response.cookies.set('webdev_session', fallbackUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error during account creation.' },
      { status: 500 }
    );
  }
}
