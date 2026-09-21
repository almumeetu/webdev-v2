import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://webdevss.tech';
  const currentDate = new Date().toISOString();

  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/team',
    '/blog',
    '/contact',
    '/auth',
    '/terms',
    '/privacy',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
