'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  Sparkles
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getRoute, getViewFromPathname } from '../utils/routes';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, siteSettings } = useAppContext();

  // Derive legacy view name from pathname — all JSX active-state checks remain unchanged
  const currentView = useMemo(() => getViewFromPathname(pathname), [pathname]);
  const savedCount = 0;

  // Local navigation wrappers — preserve the same variable names used throughout JSX
  const onOpenQuote = () => router.push('/contact');
  const onOpenAuth = () => router.push('/auth');
  const onOpenProfile = () => router.push('/profile');

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [portfolioDropdownOpen, setPortfolioDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: string, subParam?: string) => {
    router.push(getRoute(view, subParam));
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setPortfolioDropdownOpen(false);
  };

  return (
    <header 
      id="main-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/90 shadow-md py-2.5 sm:py-3' 
          : 'bg-gradient-to-b from-[#BBE7F1]/25 via-[#f8fcfd]/95 to-white/95 backdrop-blur-md border-b border-slate-200/90 py-3.5 sm:py-4 shadow-xs'
      }`}
    >
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Brand Logo - Official WebDev Software Solutions Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left group focus:outline-none shrink-0 cursor-pointer py-0.5"
          >
            {siteSettings.logoUrl && siteSettings.logoUrl.trim() !== '' ? (
              isScrolled ? (
                <div className="bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl inline-flex items-center justify-center shadow-xs transition-all duration-200">
                  <img 
                    src={siteSettings.logoUrl}
                    alt={siteSettings.companyName}
                    className="h-8 xs:h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
              ) : (
                <img 
                  src={siteSettings.logoUrl}
                  alt={siteSettings.companyName}
                  className="h-10 xs:h-11 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
              )
            ) : (
              <span className={`text-xl font-bold font-['Archivo'] ${isScrolled ? 'text-white' : 'text-slate-900'}`}>
                {siteSettings.companyName || 'WebDev'}
              </span>
            )}
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm">
            <button
              id="nav-home"
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'home' 
                  ? 'text-slate-950 font-bold bg-[#BBE7F1] border border-[#9cd5e2] shadow-xs' 
                  : isScrolled
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-[#BBE7F1]/35'
              }`}
            >
              Home
            </button>

            <button
              id="nav-about"
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'about' 
                  ? 'text-slate-950 font-bold bg-[#BBE7F1] border border-[#9cd5e2] shadow-xs' 
                  : isScrolled
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-[#BBE7F1]/35'
              }`}
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
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  currentView === 'services' 
                    ? 'text-slate-950 font-bold bg-[#BBE7F1] border border-[#9cd5e2] shadow-xs' 
                    : isScrolled
                      ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-[#BBE7F1]/35'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  servicesDropdownOpen 
                    ? (isScrolled ? 'rotate-180 text-cyan-300' : 'rotate-180 text-cyan-800') 
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
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  currentView === 'portfolio' 
                    ? 'text-slate-950 font-bold bg-[#BBE7F1] border border-[#9cd5e2] shadow-xs' 
                    : isScrolled
                      ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-[#BBE7F1]/35'
                }`}
              >
                <span>Portfolio</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  portfolioDropdownOpen 
                    ? (isScrolled ? 'rotate-180 text-cyan-300' : 'rotate-180 text-cyan-800') 
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
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'team' 
                  ? 'text-slate-950 font-bold bg-[#BBE7F1] border border-[#9cd5e2] shadow-xs' 
                  : isScrolled
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-[#BBE7F1]/35'
              }`}
            >
              Team
            </button>

            <button
              id="nav-blog"
              onClick={() => handleNavClick('blog')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'blog' 
                  ? 'text-slate-950 font-bold bg-[#BBE7F1] border border-[#9cd5e2] shadow-xs' 
                  : isScrolled
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-[#BBE7F1]/35'
              }`}
            >
              Blog
            </button>

            <button
              id="nav-contact"
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'contact' 
                  ? 'text-slate-950 font-bold bg-[#BBE7F1] border border-[#9cd5e2] shadow-xs' 
                  : isScrolled
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-[#BBE7F1]/35'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* User Auth / Profile */}
            {currentUser ? (
              <button
                id="user-profile-btn"
                onClick={onOpenProfile}
                className={`flex items-center gap-1.5 sm:gap-2 rounded-full py-1 pl-1 pr-2.5 sm:pr-3 text-xs font-medium transition-all min-h-[38px] cursor-pointer border ${
                  isScrolled 
                    ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-slate-200' 
                    : 'bg-white hover:bg-slate-50 border-slate-200/90 hover:border-slate-300 text-slate-800 shadow-xs'
                }`}
                title="Manage Profile"
              >
                {currentUser.avatar && currentUser.avatar.trim() !== '' ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-6 h-6 rounded-full object-cover border border-[#9cd5e2]" 
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#BBE7F1] border border-[#9cd5e2] text-slate-950 text-[10px] font-bold flex items-center justify-center">
                    {currentUser.name?.charAt(0) || 'U'}
                  </div>
                )}
                <span className="hidden sm:inline max-w-[80px] truncate font-semibold">{currentUser.name.split(' ')[0]}</span>
                {currentUser.role === 'admin' && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold border ${
                    isScrolled 
                      ? 'bg-[#BBE7F1]/20 text-[#BBE7F1] border-[#9cd5e2]/30' 
                      : 'bg-[#BBE7F1]/60 text-slate-950 border-[#9cd5e2]'
                  }`}>
                    Admin
                  </span>
                )}
              </button>
            ) : (
              <button
                id="google-auth-trigger-btn"
                onClick={onOpenAuth}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold transition-colors min-h-[38px] cursor-pointer border ${
                  isScrolled 
                    ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-800 hover:border-slate-700' 
                    : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 border-slate-200/90 hover:border-slate-300 shadow-xs'
                }`}
                title="Sign In / Register"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Primary Action Button - Theme #BBE7F1 Style */}
            <button
              id="get-started-cta-btn"
              onClick={() => handleNavClick('contact')}
              className="bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] text-slate-950 font-bold text-[11px] sm:text-xs tracking-wider uppercase px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-[#9cd5e2] transition-all flex items-center gap-1 sm:gap-1.5 group min-h-[38px] cursor-pointer shrink-0 shadow-xs"
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
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${
                currentView === 'home' 
                  ? 'bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] shadow-xs' 
                  : isScrolled
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>Home Overview</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${
                currentView === 'about' 
                  ? 'bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] shadow-xs' 
                  : isScrolled
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>About Company</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${
                currentView === 'services' 
                  ? 'bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] shadow-xs' 
                  : isScrolled
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
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
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${
                currentView === 'portfolio' 
                  ? 'bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] shadow-xs' 
                  : isScrolled
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>Portfolio (Recent & Ongoing)</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleNavClick('team')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${
                currentView === 'team' 
                  ? 'bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] shadow-xs' 
                  : isScrolled
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>Engineering Team & Leadership</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${
                currentView === 'blog' 
                  ? 'bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] shadow-xs' 
                  : isScrolled
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
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
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer min-h-[44px] ${
                currentView === 'contact'
                  ? 'bg-[#BBE7F1] text-slate-950 font-bold border border-[#9cd5e2] shadow-xs'
                  : isScrolled
                    ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                    : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>Contact Us (Joypurhat & Leverkusen)</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </button>

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
