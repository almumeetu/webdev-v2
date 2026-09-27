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
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Sparkles,
  LogIn,
  UserPlus,
  LogOut,
  Zap
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { getRoute, getViewFromPathname } from '../utils/routes';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, siteSettings, logout, jobs } = useAppContext();
  const { lang, t } = useLanguage();

  // Active jobs count
  const activeJobsCount = useMemo(() => (jobs || []).filter((j) => j.isActive).length, [jobs]);

  // Derive active view name from current pathname
  const currentView = useMemo(() => getViewFromPathname(pathname), [pathname]);

  // Local navigation wrappers
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
  }, [currentUser]);

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

  // Modern active nav pill styling — adapts to light/dark scroll state
  const getNavLinkClass = (viewName: string) => {
    const isActive = currentView === viewName;
    if (isActive) {
      return isScrolled
        ? 'text-white font-semibold bg-white/10 border border-white/10'
        : 'text-slate-950 font-semibold bg-slate-900/10 border border-slate-200/80';
    }
    return isScrolled
      ? 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/60 border border-transparent';
  };

  const getMobileNavLinkClass = (viewName: string) => {
    const isActive = currentView === viewName;
    if (isActive) {
      return isScrolled
        ? 'bg-white/10 text-white font-semibold border border-slate-700'
        : 'bg-slate-100 text-slate-950 font-semibold border border-slate-200';
    }
    return isScrolled
      ? 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
      : 'text-slate-700 hover:bg-slate-100 border border-transparent';
  };

  return (
    <header 
      id="main-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800/90 shadow-lg py-2 sm:py-2.5' 
          : 'bg-gradient-to-b from-[#BBE7F1]/25 via-[#f8fcfd]/95 to-white/95 backdrop-blur-xl border-b border-slate-200/90 py-2.5 sm:py-3 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* ─── 1. Brand Logo ─── */}
          <div className="flex items-center shrink-0 z-10">
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group focus:outline-none shrink-0 cursor-pointer py-0.5"
            >
              {siteSettings.logoUrl && siteSettings.logoUrl.trim() !== '' ? (
                isScrolled ? (
                  <div className="inline-flex items-center justify-center transition-all duration-200">
                    <img 
                      src={siteSettings.darkLogoUrl || '/images/logo/dark-logo-webdevss.png'}
                      alt={siteSettings.companyName}
                      className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03] rounded-md"
                    />
                  </div>
                ) : (
                  <img 
                    src={siteSettings.logoUrl}
                    alt={siteSettings.companyName}
                    className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                )
              ) : (
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#9cd5e2] to-[#BBE7F1] flex items-center justify-center text-slate-950 font-bold text-sm shadow-xs">
                    WD
                  </div>
                  <span className={`text-lg font-bold font-['Archivo'] tracking-tight ${isScrolled ? 'text-white' : 'text-slate-900'}`}>
                    {siteSettings.companyName || 'WebDev'}
                  </span>
                </div>
              )}
            </button>
          </div>

          {/* ─── 2. Desktop Navigation Center Links ─── */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 font-medium text-sm">
            <button
              id="nav-home"
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-xl text-sm transition-all duration-150 cursor-pointer ${getNavLinkClass('home')}`}
            >
              {t.navHome}
            </button>

            <button
              id="nav-about"
              onClick={() => handleNavClick('about')}
              className={`px-3 py-1.5 rounded-xl text-sm transition-all duration-150 cursor-pointer ${getNavLinkClass('about')}`}
            >
              {t.navAbout}
            </button>

            {/* Services Megamenu Trigger & Panel */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                id="nav-services"
                onClick={() => handleNavClick('services')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm transition-all duration-150 cursor-pointer ${getNavLinkClass('services')}`}
              >
                <span>{t.navServices}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  servicesDropdownOpen ? 'rotate-180' : ''
                } ${
                  isScrolled ? 'text-slate-400' : 'text-slate-500'
                }`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full -left-20 w-[720px] pt-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-6 backdrop-blur-2xl border border-slate-800 bg-slate-950/98 text-slate-100">
                    <div className="grid grid-cols-12 gap-6">
                      
                      {/* Left 7 Cols: Core Engineering Capabilities */}
                      <div className="col-span-7 space-y-4">
                        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                          <span>Core Engineering Services</span>
                          <span className="text-[10px] text-cyan-400 font-semibold">React 19 & Cloud</span>
                        </div>

                        <div className="space-y-1.5">
                          <button
                            onClick={() => handleNavClick('services', 'serv-1')}
                            className="w-full text-left flex items-start gap-3 p-2.5 rounded-2xl transition-all group cursor-pointer hover:bg-slate-900/90 border border-transparent hover:border-slate-800"
                          >
                            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-[#BBE7F1] group-hover:text-slate-950 transition-colors shrink-0">
                              <Code2 className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                                Full Stack & MERN Engineering
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                React 19, Next.js 15, Node.js & high-concurrency microservices
                              </div>
                            </div>
                          </button>

                          <button
                            onClick={() => handleNavClick('services', 'serv-2')}
                            className="w-full text-left flex items-start gap-3 p-2.5 rounded-2xl transition-all group cursor-pointer hover:bg-slate-900/90 border border-transparent hover:border-slate-800"
                          >
                            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 group-hover:bg-sky-400 group-hover:text-slate-950 transition-colors shrink-0">
                              <Server className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                                Cloud Infrastructure & Linux Servers
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                Docker, Kubernetes, Nginx, Prometheus & 99.99% uptime SLAs
                              </div>
                            </div>
                          </button>

                          <button
                            onClick={() => handleNavClick('services', 'serv-3')}
                            className="w-full text-left flex items-start gap-3 p-2.5 rounded-2xl transition-all group cursor-pointer hover:bg-slate-900/90 border border-transparent hover:border-slate-800"
                          >
                            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-colors shrink-0">
                              <ShoppingCart className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                                Headless Commerce & Digital Retail
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                Shopify Plus APIs, Stripe SEPA, Algolia & sub-second checkouts
                              </div>
                            </div>
                          </button>

                          <button
                            onClick={() => handleNavClick('services', 'serv-4')}
                            className="w-full text-left flex items-start gap-3 p-2.5 rounded-2xl transition-all group cursor-pointer hover:bg-slate-900/90 border border-transparent hover:border-slate-800"
                          >
                            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-400 group-hover:text-slate-950 transition-colors shrink-0">
                              <Globe className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                                WordPress & Corporate CMS Portals
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                Bespoke plugins, Sanity CMS, SEO engines & 95+ PageSpeed
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Right 5 Cols: German Governance & Quick Consultation */}
                      <div className="col-span-5 p-4 rounded-2xl flex flex-col justify-between space-y-4 border bg-slate-900/70 border-slate-800">
                        <div className="space-y-2.5">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#BBE7F1]/20 text-cyan-300 border border-[#9cd5e2]/40">
                            <span>🇩🇪 LEVERKUSEN, GERMANY</span>
                          </div>
                          <div className="text-sm font-bold text-white font-['Archivo'] leading-snug">
                            PMP® Certified Project Governance
                          </div>
                          <p className="text-xs leading-relaxed text-slate-400">
                            Managed directly under German quality standards and Scrum methodology. Transparent sprint velocity and verified SLAs.
                          </p>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-800">
                          <button
                            onClick={() => handleNavClick('services')}
                            className="w-full text-left text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center justify-between py-1 transition-colors cursor-pointer"
                          >
                            <span>Explore All 6 IT Services</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleNavClick('contact')}
                            className="w-full bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold text-xs py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm border border-[#9cd5e2]"
                          >
                            <span>Book Technical Consultation</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Portfolio Megamenu Trigger & Panel */}
            <div 
              className="relative"
              onMouseEnter={() => setPortfolioDropdownOpen(true)}
              onMouseLeave={() => setPortfolioDropdownOpen(false)}
            >
              <button
                id="nav-portfolio"
                onClick={() => handleNavClick('portfolio')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm transition-all duration-150 cursor-pointer ${getNavLinkClass('portfolio')}`}
              >
                <span>{t.navPortfolio}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  portfolioDropdownOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                }`} />
              </button>

              {portfolioDropdownOpen && (
                <div className="absolute top-full -left-36 w-[720px] pt-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-6 backdrop-blur-2xl border border-slate-800 bg-slate-950/98 text-slate-100">
                    <div className="grid grid-cols-12 gap-6">
                      
                      {/* Left 7 Cols: Architectures & Regional Case Studies */}
                      <div className="col-span-7 space-y-4">
                        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                          <span>Verified Production Deployments</span>
                          <span className="text-[10px] text-cyan-400 font-semibold">13+ Systems</span>
                        </div>

                        <div className="space-y-1.5">
                          <button
                            onClick={() => handleNavClick('portfolio', 'all')}
                            className="w-full text-left flex items-start gap-3 p-2.5 rounded-2xl transition-all group cursor-pointer hover:bg-slate-900/90 border border-transparent hover:border-slate-800"
                          >
                            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-[#BBE7F1] group-hover:text-slate-950 transition-colors shrink-0">
                              <Sparkles className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                                <span>Browse All Case Studies</span>
                                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">13</span>
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                Enterprise web apps, e-commerce & cloud platforms
                              </div>
                            </div>
                          </button>

                          <button
                            onClick={() => router.push('/portfolio?category=Web+Application')}
                            className="w-full text-left flex items-start gap-3 p-2.5 rounded-2xl transition-all group cursor-pointer hover:bg-slate-900/90 border border-transparent hover:border-slate-800"
                          >
                            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 group-hover:bg-sky-400 group-hover:text-slate-950 transition-colors shrink-0">
                              <Code2 className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors flex items-center justify-between">
                                <span>Web Applications & SaaS</span>
                                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">4</span>
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                FinTech portal, telemedicine & commercial dispatch grids
                              </div>
                            </div>
                          </button>

                          <button
                            onClick={() => router.push('/portfolio?category=E-Commerce')}
                            className="w-full text-left flex items-start gap-3 p-2.5 rounded-2xl transition-all group cursor-pointer hover:bg-slate-900/90 border border-transparent hover:border-slate-800"
                          >
                            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-colors shrink-0">
                              <ShoppingCart className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                                <span>Headless & Digital Commerce</span>
                                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">3</span>
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                D2C subscriptions, concert guitars & Klarna checkouts
                              </div>
                            </div>
                          </button>

                          <button
                            onClick={() => router.push('/portfolio?category=Backend+%26+Cloud')}
                            className="w-full text-left flex items-start gap-3 p-2.5 rounded-2xl transition-all group cursor-pointer hover:bg-slate-900/90 border border-transparent hover:border-slate-800"
                          >
                            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-400 group-hover:text-slate-950 transition-colors shrink-0">
                              <Server className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                                <span>Cloud & Telemetric Backends</span>
                                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">2</span>
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                Mega data center IoT monitoring & AI WhatsApp automation
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Right 5 Cols: Turnkey Order Spotlight */}
                      <div className="col-span-5 p-4 rounded-2xl flex flex-col justify-between space-y-4 border bg-slate-900/70 border-slate-800">
                        <div className="space-y-2.5">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            <span>⚡ TURNKEY DEPLOYMENT</span>
                          </div>
                          <div className="text-sm font-bold text-white font-['Archivo'] leading-snug">
                            Ready to Launch in 7 - 14 Days
                          </div>
                          <p className="text-xs leading-relaxed text-slate-400">
                            Deploy an existing production architecture re-branded with your company identity, domain, and payment gateways.
                          </p>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-800">
                          <button
                            onClick={() => handleNavClick('portfolio')}
                            className="w-full text-left text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center justify-between py-1 transition-colors cursor-pointer"
                          >
                            <span>Explore Full Showcase Gallery</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => router.push('/portfolio?order=proj-1')}
                            className="w-full bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold text-xs py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm border border-[#9cd5e2]"
                          >
                            <span>Order Similar Architecture</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-careers"
              onClick={() => handleNavClick('careers')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm transition-all duration-150 cursor-pointer ${getNavLinkClass('careers')}`}
            >
              <span>{t.navCareers}</span>
              {activeJobsCount > 0 && (
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full leading-tight border transition-colors ${
                  currentView === 'careers'
                    ? 'bg-cyan-400 text-slate-950 border-cyan-300'
                    : isScrolled
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                      : 'bg-cyan-500/15 text-cyan-800 border-cyan-500/30'
                }`}>
                  {lang === 'de' ? 'Jobs' : 'Hiring'}
                </span>
              )}
            </button>

            <button
              id="nav-blog"
              onClick={() => handleNavClick('blog')}
              className={`px-3 py-1.5 rounded-xl text-sm transition-all duration-150 cursor-pointer ${getNavLinkClass('blog')}`}
            >
              {t.navBlog}
            </button>

            <button
              id="nav-contact"
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-1.5 rounded-xl text-sm transition-all duration-150 cursor-pointer ${getNavLinkClass('contact')}`}
            >
              {t.navContact}
            </button>
          </nav>

          {/* ─── 3. Right Action Area ─── */}
          <div className="flex items-center gap-2.5 shrink-0 z-20">

            {currentUser ? (
              /* User Profile Trigger & Popover */
              <div className="relative" ref={userDropdownRef}>
                <button
                  id="user-profile-btn"
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  className={`flex items-center gap-2 rounded-full pl-1 pr-2.5 py-1 text-xs font-medium transition-all cursor-pointer border ${
                    userDropdownOpen
                      ? 'ring-2 ring-cyan-400 border-transparent bg-slate-900 text-white'
                      : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 text-slate-200'
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
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#9cd5e2] to-[#BBE7F1] text-slate-950 text-xs font-bold flex items-center justify-center border border-[#9cd5e2]">
                        {cleanUserName.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>

                  <span className="font-semibold text-xs text-white max-w-[100px] truncate hidden sm:inline">
                    {cleanUserName}
                  </span>

                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                    userDropdownOpen ? 'rotate-180 text-cyan-400' : ''
                  }`} />
                </button>

                {/* Profile Popover */}
                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl shadow-2xl border border-slate-800 bg-slate-950/98 backdrop-blur-2xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-3 py-2.5 border-b border-slate-800 mb-1">
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
                          <p className="text-xs font-bold text-white truncate font-['Archivo']">
                            {cleanUserName}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {currentUser.email}
                          </p>
                          <div className="mt-1">
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/80">
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
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-slate-300 hover:bg-slate-800/90 hover:text-white transition-colors cursor-pointer"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{currentUser.role === 'admin' ? 'Admin Dashboard' : 'Client Profile & Sprints'}</span>
                      </button>
                    </div>

                    <div className="mt-1 pt-1 border-t border-slate-800">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-xl text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-500" />
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
                  className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                    isScrolled
                      ? 'text-slate-300 hover:text-white hover:bg-slate-900 border-slate-800/80 hover:border-slate-700'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <LogIn className={`w-3.5 h-3.5 ${isScrolled ? 'text-cyan-400' : 'text-cyan-700'}`} />
                  <span>{t.navSignIn}</span>
                </button>

                {/* Primary Proposal Action CTA Button */}
                <button
                  id="nav-quote-cta"
                  onClick={onOpenQuote}
                  className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer border border-[#9cd5e2] shadow-sm hover:shadow-md group"
                >
                  <span>{t.navGetQuote}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-950 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            )}



            {/* Mobile Hamburger Drawer Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden w-9 h-9 rounded-xl flex items-center justify-center border focus:outline-none cursor-pointer transition-colors ${
                isScrolled
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  : 'bg-white border-slate-200/90 text-slate-700 hover:text-slate-950 shadow-xs'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* ─── 4. Mobile Navigation Drawer ─── */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-4 border-t border-slate-800 pb-5 space-y-2 max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            
            {/* Quick Hub Notice */}
            <div className="p-3 rounded-2xl border border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-medium text-slate-300">
                  Dual Hub: Leverkusen & Joypurhat
                </span>
              </div>
              <span className="text-[10px] bg-[#BBE7F1] text-slate-950 font-bold px-2 py-0.5 rounded-full border border-[#9cd5e2]">
                Active SLA
              </span>
            </div>

            {/* Main Navigation Links */}
            <div className="space-y-1">
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${getMobileNavLinkClass('home')}`}
              >
                <span>{t.navHome}</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${getMobileNavLinkClass('about')}`}
              >
                <span>{t.navAbout}</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={() => handleNavClick('services')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${getMobileNavLinkClass('services')}`}
              >
                <span>{t.navServices}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md border bg-slate-800 text-slate-300 border-slate-700">
                  {lang === 'de' ? '6 Leistungen' : '6 Services'}
                </span>
              </button>

              <button
                onClick={() => handleNavClick('portfolio')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${getMobileNavLinkClass('portfolio')}`}
              >
                <span>{t.navPortfolio}</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={() => handleNavClick('careers')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${getMobileNavLinkClass('careers')}`}
              >
                <div className="flex items-center gap-2">
                  <span>{t.navCareers}</span>
                  {activeJobsCount > 0 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                      {lang === 'de' ? 'Jobs' : 'Hiring'}
                    </span>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={() => handleNavClick('blog')}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors min-h-[44px] cursor-pointer ${getMobileNavLinkClass('blog')}`}
              >
                <span>{t.navBlog}</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('contact');
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer min-h-[44px] ${getMobileNavLinkClass('contact')}`}
              >
                <span>{t.navContact}</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </button>
            </div>

            {/* Mobile Auth Access Bar */}
            <div className="pt-3 pb-1 border-t border-slate-800 space-y-2">

              {currentUser ? (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    {currentUser.avatar && currentUser.avatar.trim() !== '' ? (
                      <img src={currentUser.avatar} alt={cleanUserName} className="w-8 h-8 rounded-full object-cover border border-[#9cd5e2]" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#BBE7F1] text-slate-950 font-bold text-xs flex items-center justify-center border border-[#9cd5e2]">
                        {cleanUserName.charAt(0) || 'U'}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">{cleanUserName}</p>
                      <p className="text-[10px] text-slate-400 font-mono">
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
                      className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-[#BBE7F1] text-slate-950 cursor-pointer"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => { setMobileMenuOpen(false); logout(); }}
                      className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer"
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
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-white text-xs font-bold cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{t.navSignIn}</span>
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenSignUp(); }}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[#9cd5e2] bg-[#BBE7F1] text-slate-950 text-xs font-bold cursor-pointer"
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
                className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-center transition-colors hover:border-slate-700"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 mb-1" />
                <span className="text-[10px] text-slate-400">🇧🇩 Joypurhat HQ</span>
                <span className="text-xs font-bold font-mono text-slate-200">{siteSettings.phone_bd}</span>
              </a>

              <a
                href={`tel:${siteSettings.phone_de.replace(/\s+/g, '')}`}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-center transition-colors hover:border-slate-700"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400 mb-1" />
                <span className="text-[10px] text-slate-400">🇩🇪 Leverkusen Hub</span>
                <span className="text-xs font-bold font-mono text-slate-200">{siteSettings.phone_de}</span>
              </a>
            </div>

            {/* Full-width Request Proposal CTA */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('contact');
                }}
                className="w-full bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold py-3 px-4 rounded-xl border border-[#9cd5e2] text-sm flex items-center justify-center gap-2 min-h-[44px] cursor-pointer shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Request Project Proposal</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </header>
  );
};
