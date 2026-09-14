'use client';

import { useRouter } from 'next/navigation';
import { AboutUsPage } from '@/components/AboutUsPage';

export default function AboutPage() {
  const router = useRouter();

  return (
    <AboutUsPage
      onBackToHome={() => router.push('/')}
      onOpenQuote={() => router.push('/contact')}
      onExploreTeam={() => router.push('/team')}
    />
  );
}
