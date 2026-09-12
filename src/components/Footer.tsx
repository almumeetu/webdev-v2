import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight,
  Shield,
  Globe,
  Clock,
  CheckCircle2,
  LayoutDashboard
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';

interface FooterProps {
  onNavigate: (view: string, subParam?: string) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/90 pt-16 sm:pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="bg-white px-3.5 py-2 rounded-2xl shadow-md border border-slate-200/20 inline-flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <img 
                  src="/images/logo/webdev-logo.png" 
                  alt="WebDev Software Solutions Logo" 
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Premier international software engineering & cloud infrastructure firm. Providing scalable full-stack MERN platforms, enterprise Linux server engineering, and headless commerce solutions to clients across North America, Europe, Bangladesh, and worldwide.
            </p>

            {/* Social icons */}
            <div className="flex items-center space-x-2.5 pt-1">
              <a 
                href="https://github.com/almumeetusaikat" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:text-white flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Dual Office Locations (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Global Operating Hubs
            </h4>
            
            <div className="space-y-4 text-xs">
              {/* Bangladesh HQ */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-white font-bold">
                  <span>Joypurhat, Bangladesh</span>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.2 rounded font-mono font-bold">HQ</span>
                </div>
                <p className="text-slate-400">Housing Estate, Ward 07, Joypurhat Sadar, Rajshahi Division</p>
                <div className="pt-1 text-slate-300 font-mono">
                  <a href="tel:+8801712009617" className="hover:text-indigo-400 transition-colors">
                    +880 1712-009617
                  </a>
                </div>
              </div>

              {/* Germany Branch */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-white font-bold">
                  <span>Leverkusen, Germany</span>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.2 rounded font-mono font-bold">Branch</span>
                </div>
                <p className="text-slate-400">Friedrich-Ebert-Platz 3, 51373 Leverkusen, NRW, Germany</p>
                <div className="pt-1 text-slate-300 font-mono">
                  <a href="tel:+49214839201" className="hover:text-indigo-400 transition-colors">
                    +49 214 839201
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Engineering Services (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('services', 'serv-1')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Full-Stack MERN
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'serv-2')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Cloud & Linux Servers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'serv-3')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Shopify & E-Commerce
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'serv-4')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Enterprise CMS
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'serv-5')} className="hover:text-white transition-colors text-left cursor-pointer">
                  API Integrations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'serv-6')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Database Optimization
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation & Admin (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Direct Access
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-left cursor-pointer">
                  About WebDev Software Solutions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('team')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Meet The Minds & Leadership
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Recent Completed & Ongoing Work
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Technical Insights & Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors text-left cursor-pointer">
                  Contact Us & Operating Hubs
                </button>
              </li>
              <li>
                <button onClick={onOpenQuote} className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors text-left cursor-pointer flex items-center gap-1">
                  <span>Instant Project Cost Scoper</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => onNavigate('admin')} 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800/80 transition-all text-xs font-semibold cursor-pointer group"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                  <span>Admin Management Console</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} WebDev Software Solutions. All Rights Reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-5 text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>German GDPR & ISO 27001 Standard Protocol</span>
            </span>
            <span className="hidden xs:inline">•</span>
            <span className="text-slate-400">Joypurhat (BD) HQ & Leverkusen (DE) Branch</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
