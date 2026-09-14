'use client';

import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { TermsOfServicePage } from '@/components/TermsOfServicePage';

export default function TermsPage() {
  const router = useRouter();
  const { siteSettings } = useAppContext();

  return (
    <TermsOfServicePage
      content={siteSettings.termsOfService}
      onBack={() => router.push('/')}
    />
  );
}
