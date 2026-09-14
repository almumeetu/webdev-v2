'use client';

import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { LatestNewsSection } from '@/components/LatestNewsSection';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function BlogPage() {
  const router = useRouter();
  const { blogs } = useAppContext();

  return (
    <div>
      <Breadcrumb
        badge="ENGINEERING BLOG"
        title="Technical Insights & News"
        subtitle="Deep dives on distributed systems, modern web architecture, cloud deployment, and engineering best practices."
        items={[
          { label: 'Home', onClick: () => router.push('/') },
          { label: 'Technical Insights & News', active: true }
        ]}
        backAction={() => router.push('/')}
        backLabel="Back to Home"
        align="left"
      />
      <div className="py-8">
        <LatestNewsSection
          blogs={blogs}
          onSelectBlog={(blog) => router.push(`/blog/${blog.id}`)}
          onViewAllBlogs={() => {}}
        />
      </div>
    </div>
  );
}
