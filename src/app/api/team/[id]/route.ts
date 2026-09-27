import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT (update) a team member
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await prisma.teamMember.update({
      where: { id },
      data: {
        name: body.name,
        role: body.role,
        headline: body.headline || null,
        branch: body.branch,
        location: body.location || null,
        image: body.image,
        bio: body.bio,
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
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json({ success: false, message: 'Failed to update' }, { status: 500 });
  }
}

// DELETE a team member
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Team member deleted' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete' }, { status: 500 });
  }
}
