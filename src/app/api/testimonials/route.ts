import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { initialTestimonialsData } from '@/data/initialData';

// GET all testimonials
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
    if (testimonials.length > 0) {
      return NextResponse.json({ success: true, source: 'postgresql', data: testimonials });
    }
  } catch (error) {
    console.warn('DB not accessible for testimonials GET:', error);
  }
  return NextResponse.json({ success: true, source: 'fallback', data: initialTestimonialsData });
}

// POST new testimonial
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await prisma.testimonial.create({
      data: {
        id: body.id || `test-${Date.now()}`,
        name: body.name,
        role: body.role,
        company: body.company,
        avatar: body.avatar || '',
        country: body.country || 'International',
        flag: body.flag || '🌐',
        quote: body.quote,
        rating: body.rating ?? 5,
        verified: body.verified ?? true,
      },
    });
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ success: false, message: 'Failed to create testimonial' }, { status: 500 });
  }
}
