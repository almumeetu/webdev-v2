'use client';

import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { PrivacyPolicyPage } from '@/components/PrivacyPolicyPage';

export default function PrivacyPage() {
  const router = useRouter();
  const { siteSettings } = useAppContext();

  return (
    <PrivacyPolicyPage
      content={siteSettings.privacyPolicy}
      onBack={() => router.push('/')}
    />
  );
}
