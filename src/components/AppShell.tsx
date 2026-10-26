'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { TopBar } from './TopBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

/**
 * Application shell that provides the shared layout structure.
 * Renders TopBar, Navbar, and Footer on all routes except /admin,
 * where the AdminDashboard renders its own full-screen workstation UI.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === '/admin';
  const isHome = pathname === '/';

  // Ensure every route transition starts at the very top of the page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  // Admin dashboard has its own dedicated full-screen layout
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className={`min-h-screen ${isHome ? 'bg-slate-50' : 'bg-white'} text-slate-900 flex flex-col font-['Kufam'] font-sans antialiased selection:bg-[#BBE7F1] selection:text-slate-950`}>
      <TopBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
