import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const post = await prisma.blogPost.findUnique({ where: { id }, select: { title: true, excerpt: true } });
    if (post) {
      return {
        title: post.title,
        description: post.excerpt.slice(0, 300),
        alternates: { canonical: `/blog/${id}` },
        openGraph: { title: post.title, description: post.excerpt.slice(0, 300), type: 'article' },
      };
    }
  } catch {}
  return { title: 'Engineering Article', alternates: { canonical: `/blog/${id}` } };
}

export default function BlogArticleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
