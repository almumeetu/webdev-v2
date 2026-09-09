import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
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
  MapPin
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, subParam?: string) => void;
  onOpenQuote: () => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  currentUser: UserProfile | null;
  savedCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenQuote,
  onOpenAuth,
  onOpenProfile,
  currentUser,
  savedCount = 0
}) => {
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
    onNavigate(view, subParam);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setPortfolioDropdownOpen(false);
  };

  return (
    <header 
      id="main-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#090d18]/95 backdrop-blur-md border-b border-slate-800/90 shadow-2xl py-2.5 sm:py-3' 
          : 'bg-[#090d18] border-b border-slate-800/60 py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo matching high-tech theme */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 border-2 border-white rounded-sm transform rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-['Outfit']">
                  WebDev
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono font-medium border border-indigo-500/30">
                  Global
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-wide uppercase">
                Software Solutions
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm">
            <button
              id="nav-home"
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentView === 'home' 
                  ? 'text-white font-semibold bg-slate-800/80' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Home
            </button>

            <button
              id="nav-about"
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentView === 'about' 
                  ? 'text-white font-semibold bg-slate-800/80' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
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
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'services' 
                    ? 'text-white font-semibold bg-slate-800/80' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-indigo-400' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 pt-2 z-50">
                  <div className="bg-[#0e1424] border border-slate-700/80 rounded-xl shadow-2xl p-2 backdrop-blur-xl">
                    <button
                      onClick={() => handleNavClick('services', 'serv-1')}
                      className="w-full text-left flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800/80 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">Full Stack & MERN</div>
                        <div className="text-xs text-slate-400">Enterprise React 19 & Node architectures</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('services', 'serv-2')}
                      className="w-full text-left flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800/80 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Server className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">Cloud & Linux Servers</div>
                        <div className="text-xs text-slate-400">Nginx, Docker & 99.99% high availability</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('services', 'serv-3')}
                      className="w-full text-left flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800/80 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">E-Commerce Specialist</div>
                        <div className="text-xs text-slate-400">Headless Shopify & custom WooCommerce</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('services', 'serv-4')}
                      className="w-full text-left flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-800/80 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">WordPress & Enterprise CMS</div>
                        <div className="text-xs text-slate-400">Lightweight, ultra-fast custom code</div>
                      </div>
                    </button>
                    
                    <div className="pt-2 mt-1 border-t border-slate-800 px-2 pb-1">
                      <button
                        onClick={() => handleNavClick('services')}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center justify-between w-full"
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
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'portfolio' 
                    ? 'text-white font-semibold bg-slate-800/80' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>Portfolio</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${portfolioDropdownOpen ? 'rotate-180 text-indigo-400' : ''}`} />
              </button>

              {portfolioDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className="bg-[#0e1424] border border-slate-700/80 rounded-xl shadow-2xl p-2 backdrop-blur-xl">
                    <button
                      onClick={() => handleNavClick('portfolio', 'all')}
                      className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-lg flex items-center justify-between"
                    >
                      <span>All Projects</span>
                      <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-400">6+</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('portfolio', 'completed')}
                      className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-lg flex items-center justify-between"
                    >
                      <span>Recent Completed Works</span>
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">Ready</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('portfolio', 'ongoing')}
                      className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:text-white hover:bg-slate-800/80 rounded-lg flex items-center justify-between"
                    >
                      <span>Ongoing Live Projects</span>
                      <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">Active</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-team"
              onClick={() => handleNavClick('team')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentView === 'team' 
                  ? 'text-white font-semibold bg-slate-800/80' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Team
            </button>

            <button
              id="nav-blog"
              onClick={() => handleNavClick('blog')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentView === 'blog' 
                  ? 'text-white font-semibold bg-slate-800/80' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Blog
            </button>

            {/* Admin Dashboard Quick Access Button */}
            <button
              id="nav-admin"
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                currentView === 'admin'
                  ? 'bg-purple-600/30 border-purple-500 text-purple-200'
                  : 'bg-slate-800/60 border-slate-700/70 text-slate-300 hover:text-purple-300 hover:border-purple-500/50'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin</span>
            </button>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Phone support indicator (visible from xl up) */}
            <div className="hidden xl:flex items-center gap-2 text-right pl-2 pr-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Quick Hotline
                </div>
                <a 
                  href="tel:+8801700928374" 
                  className="text-xs font-bold text-white hover:text-indigo-400 transition-colors font-mono"
                >
                  +880 1700-928374
                </a>
              </div>
            </div>

            {/* User Auth / Profile */}
            {currentUser ? (
              <button
                id="user-profile-btn"
                onClick={onOpenProfile}
                className="flex items-center gap-1.5 sm:gap-2 bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 rounded-full py-1 pl-1 pr-2.5 sm:pr-3 text-xs font-medium text-slate-200 transition-all min-h-[38px]"
                title="Manage Profile"
              >
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-6 h-6 rounded-full object-cover border border-indigo-500" 
                />
                <span className="hidden sm:inline max-w-[80px] truncate">{currentUser.name.split(' ')[0]}</span>
                {currentUser.role === 'admin' && (
                  <span className="bg-purple-500/20 text-purple-300 text-[10px] px-1.5 py-0.2 rounded font-bold">
                    Admin
                  </span>
                )}
              </button>
            ) : (
              <button
                id="google-auth-trigger-btn"
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 px-2.5 sm:px-3 py-2 rounded-lg text-xs font-semibold transition-colors min-h-[38px]"
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

            {/* Primary Action Button */}
            <button
              id="get-started-cta-btn"
              onClick={onOpenQuote}
              className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-xs sm:text-sm px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center gap-1.5 group min-h-[38px] cursor-pointer"
            >
              <span>GET STARTED</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Toggle (44px touch target) */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg bg-slate-800/90 text-slate-200 hover:text-white flex items-center justify-center border border-slate-700/80 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer - Full User-Friendly Responsive Design */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-800 pb-5 space-y-2 animate-fadeIn max-h-[80vh] overflow-y-auto">
            
            {/* Quick Hub Notice on Mobile Drawer */}
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between text-xs mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-slate-300">Joypurhat (BD) & Leverkusen (DE)</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            {/* Main Links with 44px min-height */}
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors min-h-[44px] ${
                currentView === 'home' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>Home Overview</span>
              <ArrowRight className="w-4 h-4 opacity-60" />
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors min-h-[44px] ${
                currentView === 'about' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>About Company (Joypurhat & Leverkusen)</span>
              <ArrowRight className="w-4 h-4 opacity-60" />
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors min-h-[44px] ${
                currentView === 'services' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>All IT & Server Services</span>
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-indigo-300">6 Services</span>
            </button>

            <button
              onClick={() => handleNavClick('portfolio')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors min-h-[44px] ${
                currentView === 'portfolio' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>Portfolio (Recent & Ongoing)</span>
              <ArrowRight className="w-4 h-4 opacity-60" />
            </button>

            <button
              onClick={() => handleNavClick('team')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors min-h-[44px] ${
                currentView === 'team' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>Engineering Team & Leadership</span>
              <ArrowRight className="w-4 h-4 opacity-60" />
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors min-h-[44px] ${
                currentView === 'blog' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>Tech News & Insights</span>
              <ArrowRight className="w-4 h-4 opacity-60" />
            </button>

            {/* Admin Management Dashboard Link */}
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-purple-300 bg-purple-950/40 border border-purple-800/60 flex items-center justify-between min-h-[44px]"
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-purple-400" />
                <span>Admin Dashboard Console</span>
              </div>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono font-bold">
                PRO
              </span>
            </button>

            {/* Direct Calling & Action Buttons */}
            <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
              <a
                href="tel:+8801700928374"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center hover:border-indigo-500 transition-colors"
              >
                <Phone className="w-4 h-4 text-indigo-400 mb-1" />
                <span className="text-[10px] text-slate-400">Bangladesh HQ</span>
                <span className="text-xs font-bold text-white font-mono">+880 1700</span>
              </a>

              <a
                href="tel:+49214839201"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center hover:border-indigo-500 transition-colors"
              >
                <Phone className="w-4 h-4 text-purple-400 mb-1" />
                <span className="text-[10px] text-slate-400">Germany Branch</span>
                <span className="text-xs font-bold text-white font-mono">+49 214</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg text-sm flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Free Project Estimate</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </header>
  );
};
