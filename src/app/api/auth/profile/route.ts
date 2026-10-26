import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';

export async function PATCH(request: Request) {
  const user = await requireUser(request);
  if (user instanceof NextResponse) return user;

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Invalid body');
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid profile data.' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (name.length < 2 || name.length > 120) {
    return NextResponse.json({ success: false, message: 'Name must be between 2 and 120 characters.' }, { status: 400 });
  }
  if (body.company !== undefined && typeof body.company !== 'string') {
    return NextResponse.json({ success: false, message: 'Company must be text.' }, { status: 400 });
  }
  if (body.phone !== undefined && typeof body.phone !== 'string') {
    return NextResponse.json({ success: false, message: 'Phone must be text.' }, { status: 400 });
  }

  try {
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        company: typeof body.company === 'string' ? body.company.trim().slice(0, 160) || null : user.company,
        phone: typeof body.phone === 'string' ? body.phone.trim().slice(0, 40) || null : user.phone,
      },
      select: {
        id: true, name: true, email: true, role: true, country: true,
        company: true, phone: true, avatar: true, createdAt: true,
      },
    });
    return NextResponse.json({
      success: true,
      data: { ...updated, savedProjects: [], inquiries: [] },
    }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    console.error('Could not update user profile:', error);
    return NextResponse.json({ success: false, message: 'Profile could not be saved.' }, { status: 500 });
  }
}
