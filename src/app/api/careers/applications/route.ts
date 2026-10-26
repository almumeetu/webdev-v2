import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

const APPLICATION_STATUSES = ['new', 'reviewed', 'shortlisted', 'interviewed', 'rejected', 'hired'];

function safeExternalUrl(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const authResponse = await requireAdmin();
  if (authResponse) return authResponse;

  try {
    const jobId = new URL(request.url).searchParams.get('jobId');
    const data = await prisma.jobApplication.findMany({
      where: jobId ? { jobId } : {},
      orderBy: { appliedAt: 'desc' },
    });
    return NextResponse.json({ success: true, source: 'postgresql', data }, {
      headers: { 'Cache-Control': 'private, no-store' },
    });
  } catch (error) {
    console.error('Could not load job applications:', error);
    return NextResponse.json({ success: false, message: 'Application service is unavailable.' }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('your_')) {
    return NextResponse.json({ success: false, message: 'Application service is unavailable.' }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Invalid body');
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid application data.' }, { status: 400 });
  }

  const applicantName = typeof body.applicantName === 'string' ? body.applicantName.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const jobId = typeof body.jobId === 'string' ? body.jobId : 'general';
  if (applicantName.length < 2 || applicantName.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, message: 'A valid name and email address are required.' }, { status: 400 });
  }

  try {
    if (jobId !== 'general' && !await prisma.jobPosting.findFirst({ where: { id: jobId, isActive: true }, select: { id: true } })) {
      return NextResponse.json({ success: false, message: 'This position is no longer accepting applications.' }, { status: 404 });
    }

    const job = jobId === 'general'
      ? await prisma.jobPosting.upsert({
          where: { id: 'general' },
          update: { isActive: false },
          create: {
            id: 'general', title: 'General Engineering Application', department: 'Engineering',
            type: 'Full-time', experienceLevel: 'Mid-Level', workplace: 'Remote', location: 'Remote',
            salaryRange: 'Not specified', description: 'General application intake.',
            responsibilities: [], requirements: [], niceToHave: [], benefits: [], techStack: [],
            isActive: false, featured: false, postedDate: new Date().toISOString().slice(0, 10),
          },
        })
      : await prisma.jobPosting.findUnique({ where: { id: jobId } });
    if (!job) return NextResponse.json({ success: false, message: 'This position is unavailable.' }, { status: 404 });

    const created = await prisma.jobApplication.create({
      data: {
        jobId: job.id,
        jobTitle: job.title,
        applicantName,
        email,
        phoneNumber: typeof body.phoneNumber === 'string' ? body.phoneNumber.trim().slice(0, 80) : '',
        location: typeof body.location === 'string' ? body.location.trim().slice(0, 160) : null,
        portfolioUrl: safeExternalUrl(body.portfolioUrl),
        linkedinUrl: safeExternalUrl(body.linkedinUrl),
        githubUrl: safeExternalUrl(body.githubUrl),
        resumeUrl: typeof body.resumeUrl === 'string' && body.resumeUrl.length <= 2_000_000 && /^data:application\/pdf;base64,[A-Za-z0-9+/=]+$/.test(body.resumeUrl)
          ? body.resumeUrl
          : safeExternalUrl(body.resumeUrl),
        resumeFileName: typeof body.resumeFileName === 'string' ? body.resumeFileName.slice(0, 255) : null,
        experienceYears: Math.max(0, Math.min(60, Number(body.experienceYears) || 1)),
        expectedSalary: typeof body.expectedSalary === 'string' ? body.expectedSalary.slice(0, 160) : null,
        earliestStartDate: typeof body.earliestStartDate === 'string' ? body.earliestStartDate.slice(0, 160) : null,
        coverLetter: typeof body.coverLetter === 'string' ? body.coverLetter.slice(0, 20_000) : null,
      },
      select: { id: true },
    });

    return NextResponse.json({ success: true, message: 'Application submitted.', data: created }, { status: 201 });
  } catch (error) {
    console.error('Could not submit application:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit application.' }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  const authResponse = await requireAdmin(request);
  if (authResponse) return authResponse;
  try {
    const body = await request.json();
    if (typeof body?.id !== 'string' || !body.id) {
      return NextResponse.json({ success: false, message: 'Application ID is required.' }, { status: 400 });
    }
    if (body.status !== undefined && !APPLICATION_STATUSES.includes(body.status)) {
      return NextResponse.json({ success: false, message: 'Invalid application status.' }, { status: 400 });
    }
    if (body.rating !== undefined && (!Number.isInteger(Number(body.rating)) || Number(body.rating) < 0 || Number(body.rating) > 5)) {
      return NextResponse.json({ success: false, message: 'Rating must be from 0 to 5.' }, { status: 400 });
    }
    const updated = await prisma.jobApplication.update({
      where: { id: body.id },
      data: {
        ...(body.status !== undefined ? { status: body.status } : {}),
        ...(body.notes !== undefined ? { notes: String(body.notes).slice(0, 20_000) } : {}),
        ...(body.rating !== undefined ? { rating: Number(body.rating) } : {}),
      },
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Could not update application:', error);
    return NextResponse.json({ success: false, message: 'Failed to update application.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authResponse = await requireAdmin(request);
  if (authResponse) return authResponse;
  const id = new URL(request.url).searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, message: 'Application ID is required.' }, { status: 400 });
  try {
    await prisma.jobApplication.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Could not delete application:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete application.' }, { status: 500 });
  }
}
