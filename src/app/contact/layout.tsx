import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact WebDev Software Solutions to discuss your software, cloud, or infrastructure project.',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
