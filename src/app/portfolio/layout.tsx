import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Selected software, web, mobile, and cloud engineering projects.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
