import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';

export async function GET(request: Request) {
  const user = await requireUser(request);
  if (user instanceof NextResponse) return user;

  try {
    const data = await prisma.inquiry.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data }, {
      headers: { 'Cache-Control': 'private, no-store' },
    });
  } catch (error) {
    console.error('Could not load account inquiries:', error);
    return NextResponse.json({ success: false, message: 'Inquiry service is unavailable.' }, { status: 503 });
  }
}
