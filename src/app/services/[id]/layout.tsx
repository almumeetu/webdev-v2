import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const service = await prisma.service.findUnique({ where: { id }, select: { title: true, shortDesc: true, image: true } });
    if (service) {
      return {
        title: service.title,
        description: service.shortDesc.slice(0, 300),
        alternates: { canonical: `/services/${id}` },
        openGraph: { title: service.title, description: service.shortDesc.slice(0, 300), images: service.image ? [service.image] : [] },
      };
    }
  } catch {}
  return { title: 'Service', alternates: { canonical: `/services/${id}` } };
}

export default function ServiceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
