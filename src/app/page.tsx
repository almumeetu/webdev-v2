'use client';

import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { Hero } from '@/components/Hero';
import { ServiceFeatureCards } from '@/components/ServiceFeatureCards';
import { WhoWeBring } from '@/components/WhoWeBring';
import { OurServicesSection } from '@/components/OurServicesSection';
import { MeetOurTeamSection } from '@/components/MeetOurTeamSection';
import { GlobalTrustSection } from '@/components/GlobalTrustSection';
import { RecentProjectsSection } from '@/components/RecentProjectsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { GlobalEcosystemSection } from '@/components/GlobalEcosystemSection';
import { LatestNewsSection } from '@/components/LatestNewsSection';

export default function HomePage() {
  const router = useRouter();
  const { projects, teamMembers, blogs, services, testimonials, siteSettings } = useAppContext();

  return (
    <>
      <Hero
        slides={siteSettings.heroSlides}
        onOpenQuote={() => router.push('/contact')}
        onExploreServices={() => router.push('/services')}
        onContactClick={() => router.push('/contact')}
        onNavigateProjects={() => router.push('/portfolio')}
      />

      <ServiceFeatureCards
        onSelectFeature={(featureId) => {
          const map: Record<string, string> = {
            'feat-mern': 'serv-1',
            'feat-server': 'serv-2',
            'feat-ecommerce': 'serv-3',
            'feat-cms': 'serv-4',
            'feat-global': 'serv-1'
          };
          const targetId = map[featureId] || 'serv-1';
          router.push(`/services/${targetId}`);
        }}
      />

      <WhoWeBring onAboutClick={() => router.push('/about')} />

      <OurServicesSection
        services={services}
        onSelectService={(serviceId) => router.push(`/services/${serviceId}`)}
        onViewAllServices={() => router.push('/services')}
      />

      <MeetOurTeamSection
        teamMembers={teamMembers}
        onSelectMember={(member) => router.push(`/team/${member.id}`)}
        onViewAllTeam={() => router.push('/team')}
      />

      <GlobalTrustSection
        onOpenQuote={() => router.push('/contact')}
        onExplorePortfolio={() => router.push('/portfolio')}
      />

      <RecentProjectsSection
        projects={projects}
        onSelectProject={(project) => router.push(`/portfolio/${project.id}`)}
        onViewAllProjects={() => router.push('/portfolio')}
      />

      <TestimonialsSection testimonials={testimonials} />

      <GlobalEcosystemSection />

      <LatestNewsSection
        blogs={blogs}
        onSelectBlog={(blog) => router.push(`/blog/${blog.id}`)}
        onViewAllBlogs={() => router.push('/blog')}
      />
    </>
  );
}
