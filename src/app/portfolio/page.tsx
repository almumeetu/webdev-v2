'use client';

import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { RecentProjectsSection } from '@/components/RecentProjectsSection';
import { Breadcrumb } from '@/components/Breadcrumb';

export default function PortfolioPage() {
  const router = useRouter();
  const { projects } = useAppContext();

  return (
    <div>
      <Breadcrumb
        badge="PROVEN DELIVERIES"
        title="Enterprise Projects & Case Studies"
        subtitle="Explore production-grade platforms, e-commerce architectures, and SaaS applications deployed across USA & Europe."
        items={[
          { label: 'Home', onClick: () => router.push('/') },
          { label: 'Projects & Case Studies', active: true }
        ]}
        backAction={() => router.push('/')}
        backLabel="Back to Home"
        align="left"
      />
      <div className="py-8">
        <RecentProjectsSection
          projects={projects}
          onSelectProject={(project) => router.push(`/portfolio/${project.id}`)}
          onViewAllProjects={() => router.push('/contact')}
        />
      </div>
    </div>
  );
}
