import { Suspense } from 'react';
import type { Metadata } from 'next';
import { CareersPage } from '@/components/CareersPage';

export const metadata: Metadata = {
  title: 'Careers & Engineering Opportunities | WebDev Software Solutions',
  description:
    'Join our global engineering team across Leverkusen, Germany and Joypurhat, Bangladesh. Explore full-stack, cloud DevOps, and UI/UX opportunities.',
  openGraph: {
    title: 'Careers & Engineering Opportunities | WebDev Software Solutions',
    description:
      'Join our global engineering team across Leverkusen, Germany and Joypurhat, Bangladesh. Explore full-stack, cloud DevOps, and UI/UX opportunities.',
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Loading open positions...</div>}>
      <CareersPage />
    </Suspense>
  );
}
