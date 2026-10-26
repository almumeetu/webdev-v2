import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering Blog',
  description: 'Technical insights on software engineering, cloud architecture, and product delivery.',
  alternates: { canonical: '/blog' },
};

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
