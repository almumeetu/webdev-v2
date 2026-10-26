import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering Team',
  description: 'Meet the engineering leaders and specialists at WebDev Software Solutions.',
  alternates: { canonical: '/team' },
};

export default function TeamLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
