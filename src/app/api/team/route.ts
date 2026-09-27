import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { initialTeamMembers } from '@/data/initialData';

// GET all team members
export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({ orderBy: { createdAt: 'asc' } });
    if (members.length > 0) {
      return NextResponse.json({ success: true, source: 'postgresql', data: members });
    }
  } catch (error) {
    console.warn('DB not accessible for team GET:', error);
  }
  return NextResponse.json({ success: true, source: 'fallback', data: initialTeamMembers });
}

// POST new team member
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await prisma.teamMember.create({
      data: {
        id: body.id || `team-${Date.now()}`,
        name: body.name,
        role: body.role,
        headline: body.headline || null,
        branch: body.branch || 'Joypurhat, Bangladesh',
        location: body.location || null,
        image: body.image,
        bio: body.bio || '',
        skills: body.skills || [],
        email: body.email,
        phone: body.phone || null,
        linkedin: body.linkedin || null,
        github: body.github || null,
        experienceYears: body.experienceYears || 3,
        highlightedProjects: body.highlightedProjects || [],
        education: body.education || [],
        certifications: body.certifications || [],
        languages: body.languages || [],
      },
    });
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json({ success: false, message: 'Failed to create team member' }, { status: 500 });
  }
}
