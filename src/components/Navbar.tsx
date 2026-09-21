'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Phone, 
  Menu, 
  X, 
  ChevronDown, 
  Code2, 
  Server, 
  ShoppingCart, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  User as UserIcon, 
  LayoutDashboard, 
  Layers,
  ArrowRight,
  FileText,
  MapPin,
  Sparkles,
  LogIn,
  UserPlus,
  LogOut,
  Shield
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getRoute, getViewFromPathname } from '../utils/routes';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, siteSettings, logout } = useAppContext();

  // Derive legacy view name from pathname — all JSX active-state checks remain unchanged
  const currentView = useMemo(() => getViewFromPathname(pathname), [pathname]);
  const savedCount = 0;

  // Local navigation wrappers — preserve the same variable names used throughout JSX
  const onOpenQuote = () => router.push('/contact');
  const onOpenAuth = () => router.push('/auth');
  const onOpenSignUp = () => router.push('/auth?mode=signup');
  const onOpenProfile = () => router.push('/profile');

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [portfolioDropdownOpen, setPortfolioDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Clean user display name: removes any (CTO & Admin) parenthetical suffixes
  const cleanUserName = useMemo(() => {
    if (!currentUser?.name) return 'User';
    return currentUser.name.replace(/\s*\(.*?\)\s*/g, '').trim();
  }, [currentUser?.name]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  const handleNavClick = (view: string, subParam?: string) => {
    router.push(getRoute(view, subParam));
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setPortfolioDropdownOpen(false);
    setUserDropdownOpen(false);
  };

  // Simple, elegant active nav styling: no harsh colored buttons or shadows
  const getNavLinkClass = (viewName: string) => {
    const isActive = currentView === viewName;
    if (isActive) {
      return isScrolled
        ? 'text-white font-semibold bg-white/10'
        : 'text-slate-950 font-semibold bg-slate-100/90';
    }
    return isScrolled
      ? 'text-slate-400 hover:text-white hover:bg-white/5'
      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/60';
  };

  const getMobileNavLinkClass = (viewName: string) => {
    const isActive = currentView === viewName;
    if (isActive) {
      return isScrolled
        ? 'bg-white/10 text-white font-semibold'
        : 'bg-slate-100 text-slate-950 font-semibold';
    }
    return isScrolled
      ? 'text-slate-300 hover:text-white hover:bg-slate-900'
      : 'text-slate-700 hover:bg-slate-100';
  };

  return (
    <header 
      id="main-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/90 shadow-md py-1.5 sm:py-2' 
          : 'bg-gradient-to-b from-[#BBE7F1]/25 via-[#f8fcfd]/95 to-white/95 backdrop-blur-md border-b border-slate-200/90 py-2 sm:py-2.5 shadow-xs'
      }`}
    >
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Brand Logo - Official WebDev Software Solutions Logo */}
          <div className="flex items-center shrink-0 z-10">
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center text-left group focus:outline-none shrink-0 cursor-pointer py-0.5"
            >
              {siteSettings.logoUrl && siteSettings.logoUrl.trim() !== '' ? (
                isScrolled ? (
                  <div className="bg-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg inline-flex items-center justify-center shadow-xs transition-all duration-200">
                    <img 
                      src={siteSettings.logoUrl}
                      alt={siteSettings.companyName}
                      className="h-7 xs:h-7.5 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <img 
                    src={siteSettings.logoUrl}
                    alt={siteSettings.companyName}
                    className="h-8 xs:h-8.5 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                )
              ) : (
                <span className={`text-xl font-bold font-['Archivo'] ${isScrolled ? 'text-white' : 'text-slate-900'}`}>
                  {siteSettings.companyName || 'WebDev'}
                </span>
              )}
            </button>
          </div>

          {/* Desktop Navigation Links - Centered */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 font-medium text-sm absolute left-1/2 -translate-x-1/2 z-10">
            <button
              id="nav-home"
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${getNavLinkClass('home')}`}
            >
              Home
            </button>

            <button
              id="nav-about"
              onClick={() => handleNavClick('about')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${getNavLinkClass('about')}`}
            >
              About
            </button>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                id="nav-services"
                onClick={() => handleNavClick('services')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${getNavLinkClass('services')}`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  servicesDropdownOpen ? 'rotate-180' : ''
                } ${
                  currentView === 'services' 
                    ? (isScrolled ? 'text-white' : 'text-slate-900') 
                    : (isScrolled ? 'text-slate-400' : 'text-slate-500')
                }`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-84 pt-2 z-50">
                  <div className={`rounded-2xl shadow-2xl p-2.5 backdrop-blur-xl border ${
                    isScrolled 
                      ? 'bg-slate-900/95 border-slate-800' 
                      : 'bg-white/98 border-slate-200'
                  }`}>
                    <button
                      onClick={() => handleNavClick('services', 'serv-1')}
                      className={`w-full text-left flex items-start gap-3 p-2.5 rounded-xl transition-colors group cursor-pointer ${
                        isScrolled ? 'hover:bg-slate-800/80' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-[#BBE7F1]/20 text-[#BBE7F1] group-hover:bg-[#BBE7F1] group-hover:text-slate-950 transition-colors">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`text-sm font-bold transition-colors ${
                          isScrolled ? 'text-slate-100 group-hover:text-[#BBE7F1]' : 'text-slate-900 group-hover:text-cyan-800'
                        }`}>
                          Full Stack & MERN
                        </div>
                        <div className={`text-xs ${isScrolled ? 'text-slate-400' : 'text-slate-500'}`}>
                          Enterprise React 19, Next.js & Node
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('services', 'serv-2')}
                      className={`w-full text-left flex items-start gap-3 p-2.5 rounded-xl transition-colors group cursor-pointer ${
                        isScrolled ? 'hover:bg-slate-800/80' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-sky-950/60 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                        <Server className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`text-sm font-bold transition-colors ${
                          isScrolled ? 'text-slate-100 group-hover:text-sky-400' : 'text-slate-900 group-hover:text-sky-600'
                        }`}>
                          Cloud & Linux Servers
                        </div>
                        <div className={`text-xs ${isScrolled ? 'text-slate-400' : 'text-slate-500'}`}>
                          Nginx, Docker & 99.99% SLA Uptime
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('services', 'serv-3')}
                      className={`w-full text-left flex items-start gap-3 p-2.5 rounded-xl transition-colors group cursor-pointer ${
                        isScrolled ? 'hover:bg-slate-800/80' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-emerald-950/60 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`text-sm font-bold transition-colors ${
                          isScrolled ? 'text-slate-100 group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-600'
                        }`}>
                          E-Commerce Specialist
                        </div>
                        <div className={`text-xs ${isScrolled ? 'text-slate-400' : 'text-slate-500'}`}>
                          Headless Shopify & custom WooCommerce
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('services', 'serv-4')}
                      className={`w-full text-left flex items-start gap-3 p-2.5 rounded-xl transition-colors group cursor-pointer ${
                        isScrolled ? 'hover:bg-slate-800/80' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-purple-950/60 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`text-sm font-bold transition-colors ${
                          isScrolled ? 'text-slate-100 group-hover:text-purple-400' : 'text-slate-900 group-hover:text-purple-600'
                        }`}>
                          WordPress & Enterprise CMS
                        </div>
                        <div className={`text-xs ${isScrolled ? 'text-slate-400' : 'text-slate-500'}`}>
                          High-speed custom plugin development
                        </div>
                      </div>
                    </button>
                    
                    <div className={`pt-2 mt-1 border-t px-2 pb-1 ${isScrolled ? 'border-slate-800' : 'border-slate-100'}`}>
                      <button
                        onClick={() => handleNavClick('services')}
                        className={`text-xs font-bold flex items-center justify-between w-full cursor-pointer py-1 transition-colors ${
                          isScrolled ? 'text-[#BBE7F1] hover:text-white' : 'text-cyan-800 hover:text-cyan-950'
                        }`}
                      >
                        <span>Explore All 6 IT Services</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Portfolio Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setPortfolioDropdownOpen(true)}
              onMouseLeave={() => setPortfolioDropdownOpen(false)}
            >
              <button
                id="nav-portfolio"
                onClick={() => handleNavClick('portfolio')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${getNavLinkClass('portfolio')}`}
              >
                <span>Portfolio</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  portfolioDropdownOpen ? 'rotate-180' : ''
                } ${
                  currentView === 'portfolio' 
                    ? (isScrolled ? 'text-white' : 'text-slate-900') 
                    : (isScrolled ? 'text-slate-400' : 'text-slate-500')
                }`} />
              </button>

              {portfolioDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className={`rounded-2xl shadow-2xl p-2 backdrop-blur-xl border ${
                    isScrolled 
                      ? 'bg-slate-900/95 border-slate-800' 
                      : 'bg-white/98 border-slate-200'
                  }`}>
                    <button
                      onClick={() => handleNavClick('portfolio', 'all')}
                      className={`w-full text-left px-3 py-2 text-sm rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                        isScrolled ? 'text-slate-300 hover:text-white hover:bg-slate-800/80' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-medium">All Projects</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${
                        isScrolled ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        6+
                      </span>
                    </button>
                    <button
                      onClick={() => handleNavClick('portfolio', 'completed')}
                      className={`w-full text-left px-3 py-2 text-sm rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                        isScrolled ? 'text-slate-300 hover:text-white hover:bg-slate-800/80' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-medium">Recent Completed</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                        isScrolled ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        Ready
                      </span>
                    </button>
                    <button
                      onClick={() => handleNavClick('portfolio', 'ongoing')}
                      className={`w-full text-left px-3 py-2 text-sm rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                        isScrolled ? 'text-slate-300 hover:text-white hover:bg-slate-800/80' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-medium">Ongoing Active</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                        isScrolled ? 'bg-amber-950/80 text-amber-300 border-amber-800/80' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        Active
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-team"
              onClick={() => handleNavClick('team')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${getNavLinkClass('team')}`}
            >
              Team
            </button>

            <button
              id="nav-blog"
              onClick={() => handleNavClick('blog')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${getNavLinkClass('blog')}`}
            >
              Blog
            </button>

            <button
              id="nav-contact"
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${getNavLinkClass('contact')}`}
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 ml-auto z-20">

            {/* User Auth / Profile */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                {currentUser.role === 'admin' && (
                  <button
                    id="navbar-admin-cms-btn"
                    onClick={() => router.push('/admin')}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      isScrolled 
                        ? 'bg-purple-950/70 hover:bg-purple-900/90 text-purple-200 border-purple-800/80 shadow-2xs' 
                        : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200 shadow-2xs'
                    }`}
                    title="Open Admin CMS Dashboard"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span className="text-[11px] font-bold hidden sm:inline">Admin CMS</span>
                    <span className="text-[11px] font-bold sm:hidden">CMS</span>
                  </button>
                )}

                {/* Sleek Compact Avatar Menu Trigger */}
                <div className="relative" ref={userDropdownRef}>
                  <button
                    id="user-profile-btn"
                    onClick={() => setUserDropdownOpen((prev) => !prev)}
                    className={`flex items-center gap-1 rounded-full p-0.5 sm:p-1 text-xs font-medium transition-all cursor-pointer border ${
                      userDropdownOpen
                        ? 'ring-2 ring-cyan-400 border-transparent shadow-xs'
                        : isScrolled 
                          ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 hover:border-slate-600 text-slate-200' 
                          : 'bg-white hover:bg-slate-50 border-slate-200/90 hover:border-slate-300 text-slate-800 shadow-2xs'
                    }`}
                    title={`${cleanUserName} - Account Options`}
                    aria-label="User profile and account settings"
                    aria-expanded={userDropdownOpen}
                  >
                    <div className="relative">
                      {currentUser.avatar && currentUser.avatar.trim() !== '' ? (
                        <img 
                          src={currentUser.avatar} 
                          alt={cleanUserName} 
                          className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full object-cover border border-[#9cd5e2]" 
                        />
                      ) : (
                        <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-gradient-to-tr from-[#9cd5e2] to-[#BBE7F1] text-slate-950 text-xs font-bold flex items-center justify-center border border-[#9cd5e2]">
                          {cleanUserName.charAt(0) || 'U'}
                        </div>
                      )}

                      {currentUser.role === 'admin' && (
                        <span 
                          className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-purple-600 border-2 border-white dark:border-slate-950" 
                          title="Administrator"
                        />
                      )}
                    </div>

                    <ChevronDown className={`w-3 h-3 text-slate-500 mr-0.5 transition-transform duration-200 ${
                      userDropdownOpen ? 'rotate-180 text-cyan-600' : ''
                    }`} />
                  </button>

                  {/* Popover Dropdown */}
                  {userDropdownOpen && (
                    <div className={`absolute right-0 top-full mt-2 w-60 rounded-2xl shadow-xl border p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${
                      isScrolled 
                        ? 'bg-slate-900/98 border-slate-800 text-slate-200 backdrop-blur-xl' 
                        : 'bg-white/98 border-slate-200 text-slate-800 backdrop-blur-xl'
                    }`}>
                      {/* User Account Summary Card */}
                      <div className={`px-3 py-2 border-b mb-1 ${isScrolled ? 'border-slate-800' : 'border-slate-100'}`}>
                        <div className="flex items-center gap-2.5">
                          {currentUser.avatar && currentUser.avatar.trim() !== '' ? (
                            <img 
                              src={currentUser.avatar} 
                              alt={cleanUserName} 
                              className="w-8 h-8 rounded-full object-cover border border-[#9cd5e2]" 
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[#BBE7F1] text-slate-950 text-xs font-bold flex items-center justify-center border border-[#9cd5e2]">
                              {cleanUserName.charAt(0) || 'U'}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className={`text-xs font-bold truncate ${isScrolled ? 'text-white' : 'text-slate-900'}`}>
                              {cleanUserName}
                            </p>
                            <p className={`text-[10px] truncate ${isScrolled ? 'text-slate-400' : 'text-slate-500'}`}>
                              {currentUser.email}
                            </p>
                            <div className="mt-0.5">
                              {currentUser.role === 'admin' ? (
                                <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                                  isScrolled 
                                    ? 'bg-purple-950/80 text-purple-300 border-purple-800/80' 
                                    : 'bg-purple-50 text-purple-800 border-purple-200'
                                }`}>
                                  <Shield className="w-2.5 h-2.5 text-purple-600" />
                                  CTO & Admin
                                </span>
                              ) : (
                                <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                                  isScrolled 
                                    ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800/80' 
                                    : 'bg-cyan-50 text-cyan-800 border-cyan-200'
                                }`}>
                                  Client Partner
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="space-y-0.5">
                        {currentUser.role === 'admin' && (
                          <button
                            onClick={() => {
                              setUserDropdownOpen(false);
                              router.push('/admin');
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                              isScrolled 
                                ? 'text-purple-300 hover:bg-purple-950/60 hover:text-white' 
                                : 'text-purple-700 hover:bg-purple-50 hover:text-purple-900'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <LayoutDashboard className="w-3.5 h-3.5 text-purple-500" />
                              <span>Admin CMS Dashboard</span>
                            </div>
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-800">
                              CMS
                            </span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onOpenProfile();
                          }}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl transition-colors cursor-pointer ${
                            isScrolled 
                              ? 'text-slate-300 hover:bg-slate-800 hover:text-white' 
                              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                          }`}
                        >
                          <UserIcon className="w-3.5 h-3.5 text-cyan-600" />
                          <span>My Profile & Settings</span>
                        </button>
                      </div>

                      {/* Sign Out */}
                      <div className={`mt-1 pt-1 border-t ${isScrolled ? 'border-slate-800' : 'border-slate-100'}`}>
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-xl transition-colors cursor-pointer ${
                            isScrolled 
                              ? 'text-rose-400 hover:bg-rose-950/40 hover:text-rose-300' 
                              : 'text-rose-600 hover:bg-rose-50 hover:text-rose-700'
                          }`}
                        >
                          <LogOut className="w-3.5 h-3.5 text-rose-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  id="nav-signin-btn"
                  onClick={onOpenAuth}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                    isScrolled 
                      ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-800 hover:border-slate-700' 
                      : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 border-slate-200/90 hover:border-slate-300 shadow-2xs'
                  }`}
                  title="Sign In to Portal"
                >
                  <LogIn className="w-3.5 h-3.5 text-cyan-600" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>

                <button
                  id="nav-signup-btn"
                  onClick={onOpenSignUp}
                  className={`hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                    isScrolled 
                      ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-700' 
                      : 'bg-slate-100 hover:bg-slate-200/70 text-slate-800 border-slate-200 shadow-2xs'
                  }`}
                  title="Create Enterprise Account"
                >
                  <UserPlus className="w-3.5 h-3.5 text-slate-700" />
                  <span>Register</span>
                </button>
              </div>
            )}

            {/* Primary Action Button - Theme #BBE7F1 Style */}
            <button
              id="get-started-cta-btn"
              onClick={() => handleNavClick('contact')}
              className="bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] text-slate-950 font-bold text-[11px] sm:text-xs tracking-wider uppercase px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-[#9cd5e2] transition-all flex items-center gap-1 sm:gap-1.5 group cursor-pointer shrink-0 shadow-2xs"
            >
              <span className="hidden xs:inline">CONTACT US</span>
              <span className="xs:hidden">CONTACT</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-slate-900" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border focus:outline-none cursor-pointer shrink-0 transition-colors ${
                isScrolled
                  ? 'bg-slate-900 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                  : 'bg-white text-slate-700 hover:text-slate-950 border-slate-200/90 shadow-xs'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden mt-3 pt-3 border-t pb-5 space-y-2 max-h-[80vh] overflow-y-auto ${
            isScrolled ? 'border-slate-800' : 'border-slate-200'
          }`}>
            
            {/* Quick Hub Notice */}
            <div className={`p-3 rounded-xl border flex items-center justify-between text-xs mb-3 ${
              isScrolled ? 'bg-slate-900 border-slate-800' : 'bg-white/90 border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-2">
                <MapPin className={`w-3.5 h-3.5 shrink-0 ${isScrolled ? 'text-cyan-400' : 'text-cyan-700'}`} />
                <span className={`font-medium ${isScrolled ? 'text-slate-300' : 'text-slate-700'}`}>
                  Global Engineering & Client Operations
                </span>
              </div>
              <span className="text-[10px] bg-[#BBE7F1] text-slate-950 font-bold px-2 py-0.5 rounded-full border border-[#9cd5e2]">
                Active
              </span>
            </div>

            {/* Main Links */}
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${getMobileNavLinkClass('home')}`}
            >
              <span>Home Overview</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${getMobileNavLinkClass('about')}`}
            >
              <span>About Company</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${getMobileNavLinkClass('services')}`}
            >
              <span>All IT & Server Services</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${
                isScrolled ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-800 border-[#9cd5e2]'
              }`}>
                6 Services
              </span>
            </button>

            <button
              onClick={() => handleNavClick('portfolio')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${getMobileNavLinkClass('portfolio')}`}
            >
              <span>Portfolio (Recent & Ongoing)</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleNavClick('team')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${getMobileNavLinkClass('team')}`}
            >
              <span>Engineering Team & Leadership</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${getMobileNavLinkClass('blog')}`}
            >
              <span>Tech Insights & News</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </button>

            {/* Contact Page Link */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick('contact');
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer min-h-[44px] ${getMobileNavLinkClass('contact')}`}
            >
              <span>Contact Us (Joypurhat & Leverkusen)</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </button>

            {/* Mobile Auth Access Bar */}
            <div className={`pt-2 pb-1 border-t space-y-2 ${isScrolled ? 'border-slate-800' : 'border-slate-200'}`}>
              {currentUser ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#BBE7F1]/20 border border-[#9cd5e2]">
                    <div className="flex items-center gap-2.5">
                      {currentUser.avatar && currentUser.avatar.trim() !== '' ? (
                        <img src={currentUser.avatar} alt={cleanUserName} className="w-8 h-8 rounded-full object-cover border border-[#9cd5e2]" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#BBE7F1] text-slate-950 font-bold text-xs flex items-center justify-center border border-[#9cd5e2]">
                          {cleanUserName.charAt(0) || 'U'}
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold text-slate-900 leading-tight">{cleanUserName}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{currentUser.role === 'admin' ? 'CTO & Administrator' : 'Client Partner'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => { setMobileMenuOpen(false); onOpenProfile(); }}
                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-900 text-white cursor-pointer"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => { setMobileMenuOpen(false); logout(); }}
                        className="p-1 text-slate-500 hover:text-rose-600 cursor-pointer"
                        title="Sign Out"
                        aria-label="Sign Out"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {currentUser.role === 'admin' && (
                    <button
                      onClick={() => { setMobileMenuOpen(false); router.push('/admin'); }}
                      className="w-full py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      <span>Admin CMS Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-bold shadow-xs cursor-pointer"
                    >
                      <LogIn className="w-3.5 h-3.5 text-cyan-700" />
                      <span>Sign In</span>
                    </button>
                    <button
                      onClick={() => { setMobileMenuOpen(false); onOpenSignUp(); }}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[#9cd5e2] bg-[#BBE7F1] text-slate-950 text-xs font-bold shadow-xs cursor-pointer"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-slate-950" />
                      <span>Register</span>
                    </button>
                  </div>
                  <button
                    onClick={() => { setMobileMenuOpen(false); router.push('/admin'); }}
                    className="w-full text-center text-[11px] text-purple-700 hover:text-purple-900 font-bold py-1 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <LayoutDashboard className="w-3 h-3" />
                    <span>Staff / Administrator CMS Portal</span>
                  </button>
                </div>
              )}
            </div>

            {/* Direct Calling & Action Buttons */}
            <div className={`pt-3 border-t grid grid-cols-2 gap-2 ${
              isScrolled ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <a
                href="tel:+8801722301927"
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-colors ${
                  isScrolled 
                    ? 'bg-slate-900 border-slate-800 hover:border-slate-700' 
                    : 'bg-white border-slate-200 hover:border-[#9cd5e2] shadow-xs'
                }`}
              >
                <Phone className={`w-4 h-4 mb-1 ${isScrolled ? 'text-cyan-400' : 'text-cyan-700'}`} />
                <span className={`text-xs ${isScrolled ? 'text-slate-400' : 'text-slate-500'}`}>Bangladesh HQ</span>
                <span className={`text-xs font-bold font-mono ${isScrolled ? 'text-slate-200' : 'text-slate-900'}`}>+880 1722</span>
              </a>

              <a
                href="tel:+491729766016"
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-colors ${
                  isScrolled 
                    ? 'bg-slate-900 border-slate-800 hover:border-slate-700' 
                    : 'bg-white border-slate-200 hover:border-[#9cd5e2] shadow-xs'
                }`}
              >
                <Phone className={`w-4 h-4 mb-1 ${isScrolled ? 'text-cyan-400' : 'text-cyan-700'}`} />
                <span className={`text-xs ${isScrolled ? 'text-slate-400' : 'text-slate-500'}`}>Germany Branch</span>
                <span className={`text-xs font-bold font-mono ${isScrolled ? 'text-slate-200' : 'text-slate-900'}`}>+49 172</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('contact');
                }}
                className="w-full bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold py-3 px-4 rounded-xl border border-[#9cd5e2] text-sm flex items-center justify-center gap-2 min-h-[44px] cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Contact Engineering Team</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </header>
  );
};
