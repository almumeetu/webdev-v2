import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://webdevss.tech';
  const currentDate = new Date();
  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/team',
    '/careers',
    '/blog',
    '/contact',
    '/terms',
    '/privacy',
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    const [blogs, projects, services, teamMembers] = await Promise.all([
      prisma.blogPost.findMany({ select: { id: true, updatedAt: true } }),
      prisma.project.findMany({ select: { id: true, updatedAt: true } }),
      prisma.service.findMany({ select: { id: true, updatedAt: true } }),
      prisma.teamMember.findMany({ select: { id: true, updatedAt: true } }),
    ]);

    return [
      ...staticEntries,
      ...blogs.map((item) => ({ url: `${baseUrl}/blog/${item.id}`, lastModified: item.updatedAt, changeFrequency: 'monthly' as const, priority: 0.6 })),
      ...projects.map((item) => ({ url: `${baseUrl}/portfolio/${item.id}`, lastModified: item.updatedAt, changeFrequency: 'monthly' as const, priority: 0.6 })),
      ...services.map((item) => ({ url: `${baseUrl}/services/${item.id}`, lastModified: item.updatedAt, changeFrequency: 'monthly' as const, priority: 0.6 })),
      ...teamMembers.map((item) => ({ url: `${baseUrl}/team/${item.id}`, lastModified: item.updatedAt, changeFrequency: 'monthly' as const, priority: 0.5 })),
    ];
  } catch (error) {
    console.error('Could not build dynamic sitemap entries:', error);
    return staticEntries;
  }
}
