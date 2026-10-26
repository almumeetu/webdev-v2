import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Web, mobile, cloud, and software engineering services for growing businesses.',
  alternates: { canonical: '/services' },
};

export default function ServicesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
