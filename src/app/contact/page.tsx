'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { ContactUsPage } from '@/components/ContactUsPage';

function ContactContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addInquiry } = useAppContext();

  const initialLeadName = searchParams.get('lead') || undefined;
  const initialProjectTitle = searchParams.get('project') || undefined;

  return (
    <ContactUsPage
      onBackToHome={() => router.push('/')}
      onSubmitSuccess={addInquiry}
      initialLeadName={initialLeadName}
      initialProjectTitle={initialProjectTitle}
    />
  );
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactContent />
    </Suspense>
  );
}
