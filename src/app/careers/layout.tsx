import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Explore engineering careers and open roles at WebDev Software Solutions.',
  alternates: { canonical: '/careers' },
};

export default function CareersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
