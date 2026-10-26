import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

// GET single job posting by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('your_')) {
      return NextResponse.json({ success: false, message: 'Careers service is unavailable.' }, { status: 503 });
    }

    const dbJob = await prisma.jobPosting.findFirst({
      where: { id, isActive: true },
      select: {
        id: true, title: true, department: true, type: true, experienceLevel: true,
        workplace: true, location: true, salaryRange: true, description: true,
        responsibilities: true, requirements: true, niceToHave: true, benefits: true,
        techStack: true, isActive: true, featured: true, postedDate: true, deadline: true,
      },
    });
    if (!dbJob) return NextResponse.json({ success: false, message: 'Job not found.' }, { status: 404 });
    return NextResponse.json({ success: true, source: 'postgresql', data: dbJob });
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
  const authResponse = await requireAdmin(request);
  if (authResponse) return authResponse;
  try {
    const { id } = await params;
    const body = await request.json();

    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('your_')) {
      return NextResponse.json({ success: false, message: 'Careers service is unavailable.' }, { status: 503 });
    }
    const allowedFields = ['title', 'department', 'type', 'experienceLevel', 'workplace', 'location', 'salaryRange', 'description', 'responsibilities', 'requirements', 'niceToHave', 'benefits', 'techStack', 'isActive', 'featured', 'postedDate', 'deadline'] as const;
    const data = Object.fromEntries(allowedFields.filter((key) => key in body).map((key) => [key, body[key]]));
    const updated = await prisma.jobPosting.update({ where: { id }, data });
    return NextResponse.json({ success: true, message: 'Job updated.', data: updated });
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
  const authResponse = await requireAdmin(request);
  if (authResponse) return authResponse;
  try {
    const { id } = await params;

    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('your_')) {
      return NextResponse.json({ success: false, message: 'Careers service is unavailable.' }, { status: 503 });
    }
    // Preserve linked applications and candidate records when removing a job from public listings.
    const archived = await prisma.jobPosting.update({ where: { id }, data: { isActive: false } });
    return NextResponse.json({ success: true, message: 'Job archived.', data: archived });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete job' }, { status: 500 });
  }
}
