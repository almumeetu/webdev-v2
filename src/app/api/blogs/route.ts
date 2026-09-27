import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { initialBlogPosts } from '@/data/initialData';

// GET all blogs
export async function GET() {
  try {
    const blogs = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
    if (blogs.length > 0) {
      return NextResponse.json({ success: true, source: 'postgresql', data: blogs });
    }
  } catch (error) {
    console.warn('DB not accessible for blogs GET:', error);
  }
  return NextResponse.json({ success: true, source: 'fallback', data: initialBlogPosts });
}

// POST new blog
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await prisma.blogPost.create({
      data: {
        id: body.id || `blog-${Date.now()}`,
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/\s+/g, '-'),
        excerpt: body.excerpt || '',
        content: body.content || '',
        author: body.author || 'Engineering Team',
        authorRole: body.authorRole || 'Senior Architect',
        authorImage: body.authorImage || '',
        date: body.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: body.readTime || '5 min read',
        category: body.category || 'Engineering',
        tags: body.tags || [],
        image: body.image || '',
        likes: 0,
      },
    });
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ success: false, message: 'Failed to create blog' }, { status: 500 });
  }
}
