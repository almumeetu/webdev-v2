'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Phone, 
  Menu, 
  X, 
  ChevronDown, 
  User as UserIcon, 
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Sparkles,
  LogIn,
  UserPlus,
  LogOut
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { getRoute, getViewFromPathname } from '../utils/routes';
import { ServicesMenu } from './ServicesMenu';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const router = useRouter();
  const { currentUser, siteSettings, logout } = useAppContext();
  const { lang, t } = useLanguage();

  // Derive active view name from current pathname
  const currentView = useMemo(() => getViewFromPathname(pathname), [pathname]);

  // Local navigation wrappers
  const onOpenQuote = () => router.push('/contact');
  const onOpenAuth = () => router.push('/auth');
  const onOpenSignUp = () => router.push('/auth?mode=signup');
  const onOpenProfile = () => router.push('/profile');

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Clean user display name: removes any (CTO & Admin) parenthetical suffixes
  const cleanUserName = useMemo(() => {
    if (!currentUser?.name) return 'User';
    return currentUser.name.replace(/\s*\(.*?\)\s*/g, '').trim();
  }, [currentUser]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Expose header height as a CSS variable so mega menu can anchor below it
  useEffect(() => {
    const header = document.getElementById('main-header');
    if (!header) return;
    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    };
    updateHeaderHeight();
    const ro = new ResizeObserver(updateHeaderHeight);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen]);

  const handleDirectRoute = (route: string) => {
    router.push(route);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    setIsScrolled(false);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const handleNavClick = (view: string, subParam?: string) => {
    handleDirectRoute(getRoute(view, subParam));
  };

  const getNavLinkClass = (viewName: string) => {
    const isActive = currentView === viewName;
    if (isActive) {
      return 'navbar-nav-link navbar-link-active text-sky-700 font-semibold';
    }
    return 'navbar-nav-link text-slate-600 hover:text-sky-700';
  };

  const getMobileNavLinkClass = (viewName: string) => {
    const isActive = currentView === viewName;
    if (isActive) {
      return 'navbar-mobile-nav-link navbar-mobile-link-active text-sky-700 font-semibold';
    }
    return 'navbar-mobile-nav-link text-slate-700 hover:text-sky-700';
  };

  return (
    <header 
      id="main-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'site-header-edge bg-white/95 backdrop-blur-xl py-2 sm:py-2.5 shadow-xs border-b border-slate-200/80'
          : isHome
            ? 'bg-transparent py-2.5 sm:py-3 border-b border-slate-900/[0.05]'
            : 'bg-white/90 backdrop-blur-xl py-2.5 sm:py-3 border-b border-slate-200/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-3">
          
          {/* ─── 1. Brand Logo (Always Light Logo) ─── */}
          <div className="flex items-center shrink-0 z-10 lg:justify-self-start">
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group focus:outline-none shrink-0 cursor-pointer py-0.5"
            >
              {siteSettings.logoUrl && siteSettings.logoUrl.trim() !== '' ? (
                <img 
                  src={siteSettings.logoUrl}
                  alt={siteSettings.companyName}
                  className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#9cd5e2] to-[#BBE7F1] flex items-center justify-center text-slate-950 font-semibold text-sm shadow-xs">
                    WD
                  </div>
                  <span className="text-lg font-semibold tracking-tight text-slate-900">
                    {siteSettings.companyName || 'WebDev'}
                  </span>
                </div>
              )}
            </button>
          </div>

          {/* ─── 2. Desktop Navigation Center Links ─── */}
          <nav className="hidden lg:flex items-center justify-self-center gap-1 xl:gap-1.5 font-medium text-[14.5px]">
            <button
              id="nav-home"
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-xl text-[14.5px] transition-all duration-150 cursor-pointer ${getNavLinkClass('home')}`}
            >
              {t.navHome}
            </button>

            <button
              id="nav-about"
              onClick={() => handleNavClick('about')}
              className={`px-3 py-1.5 rounded-xl text-[14.5px] transition-all duration-150 cursor-pointer ${getNavLinkClass('about')}`}
            >
              {t.navAbout}
            </button>

            <ServicesMenu active={currentView === 'services'} />

            <button
              id="nav-contact"
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-1.5 rounded-xl text-[14.5px] transition-all duration-150 cursor-pointer ${getNavLinkClass('contact')}`}
            >
              {t.navContact}
            </button>
          </nav>

          {/* ─── 3. Right Action Area ─── */}
          <div className="flex items-center gap-2.5 shrink-0 z-20 lg:justify-self-end">

            {currentUser ? (
              /* User Profile Trigger & Popover */
              <div className="relative" ref={userDropdownRef}>
                <button
                  id="user-profile-btn"
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className={`flex items-center gap-2 rounded-full pl-1 pr-2.5 py-1 text-xs font-medium transition-all cursor-pointer border ${
                    userDropdownOpen
                      ? 'ring-2 ring-sky-500 border-transparent bg-slate-100 text-slate-950'
                      : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-800 shadow-2xs'
                  }`}
                  title={`${cleanUserName} - Account Options`}
                >
                  <div className="relative">
                    {currentUser.avatar && currentUser.avatar.trim() !== '' ? (
                      <img 
                        src={currentUser.avatar} 
                        alt={cleanUserName} 
                        className="w-7 h-7 rounded-full object-cover border border-[#9cd5e2]" 
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#9cd5e2] to-[#BBE7F1] text-slate-950 text-xs font-semibold flex items-center justify-center border border-[#9cd5e2]">
                        {cleanUserName.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>

                  <span className="font-medium text-xs text-slate-800 max-w-[100px] truncate hidden sm:inline">
                    {cleanUserName}
                  </span>

                  <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${
                    userDropdownOpen ? 'rotate-180 text-sky-700' : ''
                  }`} />
                </button>

                {/* Profile Popover */}
                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl shadow-xl border border-slate-200/90 bg-white/98 backdrop-blur-2xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                      <div className="flex items-center gap-2.5">
                        {currentUser.avatar && currentUser.avatar.trim() !== '' ? (
                          <img 
                            src={currentUser.avatar} 
                            alt={cleanUserName} 
                            className="w-8 h-8 rounded-full object-cover border border-[#9cd5e2]" 
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#BBE7F1] text-slate-950 text-xs font-semibold flex items-center justify-center border border-[#9cd5e2]">
                            {cleanUserName.charAt(0) || 'U'}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-900 truncate font-['Kufam']">
                            {cleanUserName}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">
                            {currentUser.email}
                          </p>
                          <div className="mt-1">
                            <span className="inline-flex items-center gap-1 text-[9px] font-medium px-1.5 py-0.2 rounded bg-[#BBE7F1]/30 text-sky-800 border border-[#9cd5e2]">
                              {currentUser.role === 'admin' ? 'Administrator' : 'Enterprise Client'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          if (currentUser.role === 'admin') {
                            router.push('/admin');
                          } else {
                            onOpenProfile();
                          }
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition-colors cursor-pointer"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-sky-700" />
                        <span>{currentUser.role === 'admin' ? 'Admin Dashboard' : 'Client Profile & Sprints'}</span>
                      </button>
                    </div>

                    <div className="mt-1 pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-xl text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-600" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Sleek Auth Links when logged out */
              <div className="flex items-center gap-2">
                <button
                  id="nav-signin-btn"
                  onClick={onOpenAuth}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200/90 text-slate-700 hover:text-slate-950 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
                >
                  <LogIn className="w-3.5 h-3.5 text-sky-700" />
                  <span>{t.navSignIn}</span>
                </button>

                {/* Primary Proposal Action CTA Button */}
                <button
                  id="nav-quote-cta"
                  onClick={onOpenQuote}
                  className="navbar-header-cta inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer border border-sky-600 shadow-sm group"
                >
                  <span>{t.navGetQuote}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            )}

            {/* Mobile Hamburger Drawer Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200/90 bg-white text-slate-700 hover:text-slate-950 shadow-2xs focus:outline-none cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* ─── 4. Mobile Navigation Drawer ─── */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-4 border-t border-slate-200 pb-5 space-y-2 max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 bg-white/95 rounded-2xl p-4 shadow-xl border border-slate-200/90">
            
            {/* Quick Hub Notice - Leverkusen Primary Focus */}
            <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                <span className="font-medium text-slate-700">
                  🇩🇪 Leverkusen HQ · German Software Engineering
                </span>
              </div>
              <span className="text-[10px] bg-[#BBE7F1] text-slate-950 font-medium px-2 py-0.5 rounded-full border border-[#9cd5e2]">
                Active SLA
              </span>
            </div>

            {/* Main Navigation Links */}
            <div className="space-y-1">
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-[15px] font-medium flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${getMobileNavLinkClass('home')}`}
              >
                <span>{t.navHome}</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-[15px] font-medium flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${getMobileNavLinkClass('about')}`}
              >
                <span>{t.navAbout}</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </button>

              <ServicesMenu mobile active={currentView === 'services'} onNavigate={() => setMobileMenuOpen(false)} />

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('contact');
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[15px] font-medium transition-colors cursor-pointer min-h-[44px] ${getMobileNavLinkClass('contact')}`}
              >
                <span>{t.navContact}</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </button>
            </div>

            {/* Mobile Auth Access Bar */}
            <div className="pt-3 pb-1 border-t border-slate-200 space-y-2">

              {currentUser ? (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2.5">
                    {currentUser.avatar && currentUser.avatar.trim() !== '' ? (
                      <img src={currentUser.avatar} alt={cleanUserName} className="w-8 h-8 rounded-full object-cover border border-[#9cd5e2]" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#BBE7F1] text-slate-950 font-medium text-xs flex items-center justify-center border border-[#9cd5e2]">
                        {cleanUserName.charAt(0) || 'U'}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-semibold text-slate-900 leading-tight">{cleanUserName}</p>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {currentUser.role === 'admin' ? 'Administrator' : 'Client Partner'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => { 
                        setMobileMenuOpen(false); 
                        if (currentUser.role === 'admin') router.push('/admin');
                        else onOpenProfile(); 
                      }}
                      className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-[#BBE7F1] text-slate-950 cursor-pointer"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => { setMobileMenuOpen(false); logout(); }}
                      className="p-1 text-slate-500 hover:text-rose-600 cursor-pointer"
                      title={t.navLogout}
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-medium cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5 text-sky-700" />
                    <span>{t.navSignIn}</span>
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenSignUp(); }}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[#9cd5e2] bg-[#BBE7F1] text-slate-950 text-xs font-medium cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-slate-950" />
                    <span>{t.navSignUp}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Direct Calling Hotlines */}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <a
                href={`tel:${siteSettings.phone_bd.replace(/\s+/g, '')}`}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-center transition-colors hover:bg-slate-100"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600 mb-1" />
                <span className="text-[10px] text-slate-500">Tech Lead Direct</span>
                <span className="text-xs font-medium font-mono text-slate-800">{siteSettings.phone_bd}</span>
              </a>

              <a
                href={`tel:${siteSettings.phone_de.replace(/\s+/g, '')}`}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-center transition-colors hover:bg-slate-100"
              >
                <Phone className="w-3.5 h-3.5 text-sky-700 mb-1" />
                <span className="text-[10px] text-slate-500">🇩🇪 Leverkusen Direct</span>
                <span className="text-xs font-medium font-mono text-slate-800">{siteSettings.phone_de}</span>
              </a>
            </div>

            {/* Full-width Request Proposal CTA */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('contact');
                }}
                className="navbar-header-cta w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-xl border border-sky-600 text-sm flex items-center justify-center gap-2 min-h-[44px] cursor-pointer shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Request Project Proposal</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </header>
  );
};
