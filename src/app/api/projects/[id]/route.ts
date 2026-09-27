import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT (update) a project
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        category: body.category,
        status: body.status === 'ongoing' ? 'ongoing' : 'completed',
        description: body.description || '',
        clientName: body.clientName || 'Private Client',
        clientCountry: body.clientCountry || 'Germany',
        image: body.image,
        completionDate: body.completionDate || '2026',
        techStack: Array.isArray(body.techStack) ? body.techStack : [],
        liveUrl: body.liveUrl || null,
        features: Array.isArray(body.features) ? body.features : [],
        metrics: body.metrics || null,
      },
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ success: false, message: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE a project
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete project' }, { status: 500 });
  }
}
