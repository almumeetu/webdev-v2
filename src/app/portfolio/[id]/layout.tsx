import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const project = await prisma.project.findUnique({ where: { id }, select: { title: true, description: true, image: true } });
    if (project) {
      return {
        title: project.title,
        description: project.description.slice(0, 300),
        alternates: { canonical: `/portfolio/${id}` },
        openGraph: { title: project.title, description: project.description.slice(0, 300), images: project.image ? [project.image] : [] },
      };
    }
  } catch {}
  return { title: 'Project', alternates: { canonical: `/portfolio/${id}` } };
}

export default function ProjectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
