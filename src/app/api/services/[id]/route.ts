import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT (update) a service
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await prisma.service.update({
      where: { id },
      data: {
        title: body.title,
        shortDesc: body.shortDesc,
        fullDesc: body.fullDesc,
        iconName: body.iconName,
        image: body.image,
        techs: body.techs || [],
        features: body.features || [],
        deliverables: body.deliverables || [],
      },
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ success: false, message: 'Failed to update' }, { status: 500 });
  }
}

// DELETE a service
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete' }, { status: 500 });
  }
}
