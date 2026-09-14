/**
 * Maps the legacy view-based navigation system to Next.js App Router routes.
 * Used by Navbar, Footer, and any component migrating from the old navigation pattern.
 */
export function getRoute(view: string, subParam?: string): string {
  const v = view === 'quote' ? 'contact' : view;

  // ─── Dynamic Routes with Item ID ──────────────────────────────────────────
  if (v === 'services' && subParam && subParam.startsWith('serv-')) {
    return `/services/${subParam}`;
  }
  if (v === 'service-detail') {
    return subParam ? `/services/${subParam}` : '/services';
  }
  if (v === 'project-detail') {
    return subParam ? `/portfolio/${subParam}` : '/portfolio';
  }
  if (v === 'team-member') {
    return subParam ? `/team/${subParam}` : '/team';
  }
  if (v === 'blog-detail') {
    return subParam ? `/blog/${subParam}` : '/blog';
  }

  // ─── Portfolio Status Filter ──────────────────────────────────────────────
  if (v === 'portfolio' && subParam && (subParam === 'completed' || subParam === 'ongoing')) {
    return `/portfolio?status=${subParam}`;
  }

  // ─── Standard Routes ─────────────────────────────────────────────────────
  const map: Record<string, string> = {
    home: '/',
    about: '/about',
    services: '/services',
    portfolio: '/portfolio',
    projects: '/portfolio',
    team: '/team',
    blog: '/blog',
    contact: '/contact',
    auth: '/auth',
    profile: '/profile',
    privacy: '/privacy',
    terms: '/terms',
    admin: '/admin',
  };

  return map[v] || '/';
}

/**
 * Derives a legacy "view" name from the current pathname.
 * Used by Navbar to maintain active-state highlighting without modifying JSX.
 */
export function getViewFromPathname(pathname: string): string {
  if (pathname === '/') return 'home';
  if (pathname === '/about') return 'about';
  if (pathname.startsWith('/services')) return 'services';
  if (pathname.startsWith('/portfolio')) return 'portfolio';
  if (pathname.startsWith('/team')) return 'team';
  if (pathname.startsWith('/blog')) return 'blog';
  if (pathname === '/contact') return 'contact';
  if (pathname === '/auth') return 'auth';
  if (pathname === '/profile') return 'profile';
  if (pathname === '/privacy') return 'privacy';
  if (pathname === '/terms') return 'terms';
  if (pathname === '/admin') return 'admin';
  return 'home';
}
