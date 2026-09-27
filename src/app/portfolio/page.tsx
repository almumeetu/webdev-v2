'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { PortfolioShowcasePage } from '@/components/PortfolioShowcasePage';

function PortfolioContent() {
  const { projects } = useAppContext();
  const searchParams = useSearchParams();

  const initialStatus = searchParams.get('status') || undefined;
  const initialCategory = searchParams.get('category') || undefined;
  const initialCountry = searchParams.get('country') || undefined;
  const initialSearch = searchParams.get('search') || undefined;
  const initialOrderId = searchParams.get('order') || undefined;

  return (
    <PortfolioShowcasePage
      projects={projects}
      initialStatus={initialStatus}
      initialCategory={initialCategory}
      initialCountry={initialCountry}
      initialSearch={initialSearch}
      initialOrderId={initialOrderId}
    />
  );
}

export default function PortfolioPage() {
  return (
    <Suspense>
      <PortfolioContent />
    </Suspense>
  );
}
