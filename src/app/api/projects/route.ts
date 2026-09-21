import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { initialProjects } from '@/data/initialData';

// GET all projects
export async function GET() {
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
      const dbProjects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
      });
      if (dbProjects && dbProjects.length > 0) {
        return NextResponse.json({ success: true, source: 'postgresql', data: dbProjects });
      }
    }
  } catch (error) {
    console.warn('PostgreSQL not accessible for projects GET, using default data:', error);
  }

  return NextResponse.json({ success: true, source: 'fallback', data: initialProjects });
}

// POST new project (Admin CMS)
export async function POST(request: Request) {
  try {
    const project = await request.json();

    if (!project.title || !project.category) {
      return NextResponse.json(
        { success: false, message: 'Title and category are required' },
        { status: 400 }
      );
    }

    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
      const created = await prisma.project.create({
        data: {
          id: project.id || `proj-${Date.now()}`,
          title: project.title,
          category: project.category,
          status: project.status === 'ongoing' ? 'ongoing' : 'completed',
          description: project.description || '',
          clientName: project.clientName || 'Private Client',
          clientCountry: project.clientCountry || 'Germany',
          image: project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
          completionDate: project.completionDate || '2026',
          techStack: Array.isArray(project.techStack) ? project.techStack : [],
          liveUrl: project.liveUrl || null,
          features: Array.isArray(project.features) ? project.features : [],
          metrics: project.metrics || null,
        }
      });

      return NextResponse.json({ success: true, message: 'Project created in PostgreSQL', data: created }, { status: 201 });
    }

    return NextResponse.json({ success: true, message: 'Project received (storage via AppContext/LocalStorage)', data: project });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ success: false, message: 'Failed to create project' }, { status: 500 });
  }
}
