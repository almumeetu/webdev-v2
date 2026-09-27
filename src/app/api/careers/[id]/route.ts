import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { initialJobPostings } from '@/data/initialData';

// GET single job posting by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
      const dbJob = await prisma.jobPosting.findUnique({
        where: { id },
        include: {
          applications: true
        }
      });
      if (dbJob) {
        return NextResponse.json({ success: true, source: 'postgresql', data: dbJob });
      }
    }

    const fallbackJob = initialJobPostings.find((j) => j.id === id);
    if (fallbackJob) {
      return NextResponse.json({ success: true, source: 'fallback', data: fallbackJob });
    }

    return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch job' }, { status: 500 });
  }
}

// PATCH / PUT update job posting (Admin CMS)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
      const updated = await prisma.jobPosting.update({
        where: { id },
        data: body
      });
      return NextResponse.json({ success: true, message: 'Job updated in PostgreSQL', data: updated });
    }

    return NextResponse.json({ success: true, message: 'Job updated (managed via AppContext)', data: { id, ...body } });
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json({ success: false, message: 'Failed to update job' }, { status: 500 });
  }
}

// DELETE job posting (Admin CMS)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
      await prisma.jobPosting.delete({
        where: { id }
      });
      return NextResponse.json({ success: true, message: 'Job deleted from PostgreSQL' });
    }

    return NextResponse.json({ success: true, message: 'Job deleted (managed via AppContext)' });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete job' }, { status: 500 });
  }
}
