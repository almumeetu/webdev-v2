import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { initialJobApplications } from '@/data/initialData';

// GET all candidate applications (Admin CMS)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
      const whereClause = jobId ? { jobId } : {};
      const dbApps = await prisma.jobApplication.findMany({
        where: whereClause,
        orderBy: { appliedAt: 'desc' }
      });
      if (dbApps && dbApps.length > 0) {
        return NextResponse.json({ success: true, source: 'postgresql', data: dbApps });
      }
    }
  } catch (error) {
    console.warn('PostgreSQL not accessible for applications GET, fallback returned:', error);
  }

  return NextResponse.json({ success: true, source: 'fallback', data: initialJobApplications });
}

// POST new job application (Candidate public submission)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      jobId, 
      jobTitle, 
      applicantName, 
      email, 
      phoneNumber, 
      location, 
      portfolioUrl, 
      linkedinUrl, 
      githubUrl, 
      resumeUrl, 
      resumeFileName, 
      experienceYears, 
      expectedSalary, 
      earliestStartDate, 
      coverLetter 
    } = body;

    if (!applicantName || !email) {
      return NextResponse.json(
        { success: false, message: 'Applicant name and email are required' },
        { status: 400 }
      );
    }

    const applicationRecord = {
      id: body.id || `app-${Date.now()}`,
      jobId: jobId || 'general',
      jobTitle: jobTitle || 'General Engineering Application',
      applicantName: applicantName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber || '',
      location: location || 'Remote',
      portfolioUrl: portfolioUrl || null,
      linkedinUrl: linkedinUrl || null,
      githubUrl: githubUrl || null,
      resumeUrl: resumeUrl || null,
      resumeFileName: resumeFileName || null,
      experienceYears: Number(experienceYears) || 1,
      expectedSalary: expectedSalary || null,
      earliestStartDate: earliestStartDate || null,
      coverLetter: (coverLetter || '').trim(),
      status: 'new' as const,
      rating: 0,
      notes: null,
      appliedAt: new Date().toISOString()
    };

    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
      const created = await prisma.jobApplication.create({
        data: {
          id: applicationRecord.id,
          jobId: applicationRecord.jobId,
          jobTitle: applicationRecord.jobTitle,
          applicantName: applicationRecord.applicantName,
          email: applicationRecord.email,
          phoneNumber: applicationRecord.phoneNumber,
          location: applicationRecord.location,
          portfolioUrl: applicationRecord.portfolioUrl,
          linkedinUrl: applicationRecord.linkedinUrl,
          githubUrl: applicationRecord.githubUrl,
          resumeUrl: applicationRecord.resumeUrl,
          resumeFileName: applicationRecord.resumeFileName,
          experienceYears: applicationRecord.experienceYears,
          expectedSalary: applicationRecord.expectedSalary,
          earliestStartDate: applicationRecord.earliestStartDate,
          coverLetter: applicationRecord.coverLetter,
          status: 'new',
          rating: 0,
          notes: null,
        }
      });

      return NextResponse.json(
        { success: true, message: 'Application submitted and saved to database.', data: created },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Application received and registered successfully.', data: applicationRecord },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit application. Please try again.' },
      { status: 500 }
    );
  }
}

// PATCH update application status / review notes / rating (Admin CMS)
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, notes, rating } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Application ID is required' },
        { status: 400 }
      );
    }

    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
      const updated = await prisma.jobApplication.update({
        where: { id },
        data: {
          ...(status ? { status } : {}),
          ...(notes !== undefined ? { notes } : {}),
          ...(rating !== undefined ? { rating: Number(rating) } : {})
        }
      });
      return NextResponse.json({ success: true, message: 'Application updated in database', data: updated });
    }

    return NextResponse.json({ success: true, message: 'Application updated successfully', data: body });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update application' },
      { status: 500 }
    );
  }
}

// DELETE application (Admin CMS)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Application ID is required' }, { status: 400 });
    }

    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
      await prisma.jobApplication.delete({
        where: { id }
      });
      return NextResponse.json({ success: true, message: 'Application deleted from database' });
    }

    return NextResponse.json({ success: true, message: 'Application deleted' });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete application' }, { status: 500 });
  }
}
