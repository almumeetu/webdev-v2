import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT (update) a testimonial
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await prisma.testimonial.update({
      where: { id },
      data: {
        name: body.name,
        role: body.role,
        company: body.company,
        avatar: body.avatar,
        country: body.country,
        flag: body.flag,
        quote: body.quote,
        rating: body.rating ?? 5,
        verified: body.verified ?? true,
      },
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ success: false, message: 'Failed to update' }, { status: 500 });
  }
}

// DELETE a testimonial
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete' }, { status: 500 });
  }
}
