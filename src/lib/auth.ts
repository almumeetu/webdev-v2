import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;
const SESSION_COOKIE = 'webdev_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  country: string;
  company: string | null;
  phone: string | null;
  avatar: string | null;
  createdAt: Date;
}

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error('SESSION_SECRET must contain at least 32 bytes.');
  }
  return secret;
}

export function assertSessionConfiguration(): void {
  getSessionSecret();
}

function signPayload(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function createSessionToken(userId: string): string {
  const secret = getSessionSecret();
  const payload = Buffer.from(JSON.stringify({
    userId,
    expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  })).toString('base64url');
  return `${payload}.${signPayload(payload, secret)}`;
}

function readSessionUserId(token: string): string | null {
  try {
    const [payload, signature, extra] = token.split('.');
    if (!payload || !signature || extra) return null;

    const expected = Buffer.from(signPayload(payload, getSessionSecret()), 'base64url');
    const actual = Buffer.from(signature, 'base64url');
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;

    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      userId?: unknown;
      expiresAt?: unknown;
    };
    if (typeof decoded.userId !== 'string' || !decoded.userId) return null;
    if (typeof decoded.expiresAt !== 'number' || decoded.expiresAt <= Date.now()) return null;
    return decoded.userId;
  } catch {
    return null;
  }
}

export function setSessionCookie(response: NextResponse, userId: string): NextResponse {
  response.cookies.set(SESSION_COOKIE, createSessionToken(userId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}

export function clearSessionCookie(response: NextResponse): NextResponse {
  response.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return response;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const userId = readSessionUserId(token);
  if (!userId) return null;

  return prisma.user.findUnique({
    where: { id: userId },
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
  }) as Promise<SessionUser | null>;
}

function hasTrustedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const requestHost = request.headers.get('x-forwarded-host') || request.headers.get('host');
  try {
    return Boolean(origin && requestHost && new URL(origin).host === requestHost);
  } catch {
    return false;
  }
}

export async function requireUser(request?: Request): Promise<SessionUser | NextResponse> {
  if (request && !['GET', 'HEAD', 'OPTIONS'].includes(request.method.toUpperCase())) {
    if (!hasTrustedOrigin(request)) {
      return NextResponse.json({ success: false, message: 'Invalid request origin.' }, { status: 403 });
    }
  }

  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Authentication required.' }, {
        status: 401,
        headers: { 'Cache-Control': 'no-store' },
      });
    }
    return user;
  } catch (error) {
    console.error('Session authorization failed:', error);
    return NextResponse.json({ success: false, message: 'Authentication service unavailable.' }, {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    });
  }
}

export async function requireAdmin(request?: Request): Promise<NextResponse | null> {
  const user = await requireUser(request);
  if (user instanceof NextResponse) return user;
  if (user.role !== 'admin') {
    return NextResponse.json({ success: false, message: 'Administrator access required.' }, { status: 403 });
  }
  return null;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
