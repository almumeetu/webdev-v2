import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { initialJobPostings } from '@/data/initialData';
import { requireAdmin } from '@/lib/auth';

// GET all job postings
// Query param ?all=true returns both active and inactive (for Admin CMS)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeAll = searchParams.get('all') === 'true';
    if (includeAll) {
      const authResponse = await requireAdmin();
      if (authResponse) return authResponse;
    }

    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
      const whereClause = includeAll ? { id: { not: 'general' } } : { isActive: true };
      const dbJobs = await prisma.jobPosting.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        include: {
          applications: {
            select: { id: true }
          }
        }
      });

      const mapped = dbJobs.map((job) => ({
        ...job,
        applicantsCount: job.applications.length,
      }));
      return NextResponse.json({ success: true, source: 'postgresql', data: mapped });
    }
  } catch (error) {
    console.error('PostgreSQL not accessible for careers GET:', error);
    return NextResponse.json({ success: false, message: 'Careers service is unavailable.' }, { status: 503 });
  }

  return NextResponse.json({ success: true, source: 'fallback', data: initialJobPostings });
}

// POST new job posting (Admin CMS)
export async function POST(request: Request) {
  const authResponse = await requireAdmin(request);
  if (authResponse) return authResponse;
  try {
    const body = await request.json();

    if (!body.title || !body.department) {
      return NextResponse.json(
        { success: false, message: 'Job title and department are required' },
        { status: 400 }
      );
    }

    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('your_')) {
      return NextResponse.json({ success: false, message: 'Careers service is unavailable.' }, { status: 503 });
    }

    const newJob = {
      title: body.title,
      department: body.department,
      type: body.type || 'Full-time',
      experienceLevel: body.experienceLevel || 'Mid-Level',
      workplace: body.workplace || 'Remote',
      location: body.location || 'Remote (Worldwide)',
      salaryRange: body.salaryRange || 'Competitive',
      description: body.description || '',
      responsibilities: Array.isArray(body.responsibilities) ? body.responsibilities : [],
      requirements: Array.isArray(body.requirements) ? body.requirements : [],
      niceToHave: Array.isArray(body.niceToHave) ? body.niceToHave : [],
      benefits: Array.isArray(body.benefits) ? body.benefits : [],
      techStack: Array.isArray(body.techStack) ? body.techStack : [],
      isActive: body.isActive ?? true,
      featured: body.featured ?? false,
      postedDate: body.postedDate || new Date().toISOString().split('T')[0],
      deadline: body.deadline || null,
    };

    const created = await prisma.jobPosting.create({ data: newJob });
    return NextResponse.json(
      { success: true, message: 'Job posting created.', data: created },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating job posting:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create job posting' },
      { status: 500 }
    );
  }
}
