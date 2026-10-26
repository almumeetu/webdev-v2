'use client';

import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { useLanguage } from '@/context/LanguageContext';
import { LatestNewsSection } from '@/components/LatestNewsSection';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function BlogPage() {
  const router = useRouter();
  const { blogs } = useAppContext();
  const { lang } = useLanguage();

  return (
    <div>
      <Breadcrumb
        badge={lang === 'de' ? 'FACHBLOG & INSIGHTS' : 'ENGINEERING BLOG'}
        title={lang === 'de' ? 'Technische Einblicke & News' : 'Technical Insights & News'}
        items={[
          { label: lang === 'de' ? 'Startseite' : 'Home', onClick: () => router.push('/') },
          { label: lang === 'de' ? 'Technische Einblicke & News' : 'Technical Insights & News', active: true }
        ]}
        backAction={() => router.push('/')}
        backLabel={lang === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
        align="left"
      />
      <div className="pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20">
        <LatestNewsSection
          blogs={blogs}
          onSelectBlog={(blog) => router.push(`/blog/${blog.id}`)}
          onViewAllBlogs={() => {}}
        />
      </div>
    </div>
  );
}
