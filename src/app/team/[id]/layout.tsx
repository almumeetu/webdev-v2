import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const member = await prisma.teamMember.findUnique({ where: { id }, select: { name: true, role: true, bio: true, image: true } });
    if (member) {
      const description = member.bio.slice(0, 300);
      return {
        title: `${member.name} | ${member.role}`,
        description,
        alternates: { canonical: `/team/${id}` },
        openGraph: { title: `${member.name} | ${member.role}`, description, images: member.image ? [member.image] : [] },
      };
    }
  } catch {}
  return { title: 'Team Member', alternates: { canonical: `/team/${id}` } };
}

export default function TeamMemberLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
