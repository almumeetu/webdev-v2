import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { initialServices } from '@/data/initialData';

// GET all services
export async function GET() {
  try {
    const services = await prisma.service.findMany({ orderBy: { createdAt: 'asc' } });
    if (services.length > 0) {
      return NextResponse.json({ success: true, source: 'postgresql', data: services });
    }
  } catch (error) {
    console.warn('DB not accessible for services GET:', error);
  }
  return NextResponse.json({ success: true, source: 'fallback', data: initialServices });
}

// POST new service
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await prisma.service.create({
      data: {
        id: body.id || `serv-${Date.now()}`,
        title: body.title,
        shortDesc: body.shortDesc || '',
        fullDesc: body.fullDesc || '',
        iconName: body.iconName || 'Code2',
        image: body.image || '',
        techs: body.techs || [],
        features: body.features || [],
        deliverables: body.deliverables || [],
      },
    });
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ success: false, message: 'Failed to create service' }, { status: 500 });
  }
}
