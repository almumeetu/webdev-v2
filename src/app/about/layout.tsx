import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the engineering team and learn how WebDev Software Solutions delivers web, mobile, and cloud systems.',
  alternates: { canonical: '/about' },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
