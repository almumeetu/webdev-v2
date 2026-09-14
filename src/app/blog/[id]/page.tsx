'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { BlogDetailPage } from '@/components/BlogDetailPage';

export default function BlogDetailRoute() {
  const params = useParams();
  const router = useRouter();
  const { blogs, likeBlog } = useAppContext();

  const blog = blogs.find((b) => b.id === (params.id as string)) || blogs[0];

  return (
    <BlogDetailPage
      blog={blog}
      onBack={() => router.push('/blog')}
      onBackToHome={() => router.push('/')}
      onLike={likeBlog}
    />
  );
}
