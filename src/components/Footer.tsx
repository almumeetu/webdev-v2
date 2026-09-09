import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight,
  Shield,
  Globe
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';

interface FooterProps {
  onNavigate: (view: string, subParam?: string) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <footer className="bg-[#070b14] text-slate-300 border-t border-slate-800/80 pt-14 sm:pt-16 pb-10 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid matching reference video Frame 00:12 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-12 sm:pb-14 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Bio (4 cols on lg, 2 on sm, 1 on mobile) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center shadow-lg shadow-indigo-600/30 shrink-0">
                <div className="w-5 h-5 border-2 border-white rounded-sm transform rotate-45 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-white font-['Outfit']">
                  WebDev
                </div>
                <div className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">
                  Software Solutions
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pr-2 sm:pr-4">
              We are a premier cross-border software engineering & cloud infrastructure firm. Providing enterprise web applications, MERN engineering, Linux server management, and e-commerce platforms to clients across Bangladesh, Germany, and globally.
            </p>

            {/* Social icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://github.com/almumeetusaikat" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Outfit']">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-indigo-400 transition-colors text-left py-1 block">
                  About Company
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('team')} className="hover:text-indigo-400 transition-colors text-left py-1 block">
                  Our Engineering Team
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-indigo-400 transition-colors text-left py-1 block">
                  Blog & News
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-indigo-400 transition-colors text-left py-1 block">
                  Recent & Ongoing Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-indigo-400 transition-colors text-left py-1 block">
                  Joypurhat BD Office
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-indigo-400 transition-colors text-left py-1 block">
                  Leverkusen Germany Office
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Services Links */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Outfit']">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('services', 'serv-1')} className="hover:text-indigo-400 transition-colors text-left py-1 block">
                  Full-Stack MERN Development
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'serv-2')} className="hover:text-indigo-400 transition-colors text-left py-1 block">
                  Cloud & Linux Server Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'serv-3')} className="hover:text-indigo-400 transition-colors text-left py-1 block">
                  E-Commerce (Shopify & Woo)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services', 'serv-4')} className="hover:text-indigo-400 transition-colors text-left py-1 block">
                  WordPress & Enterprise CMS
                </button>
              </li>
              <li>
                <button onClick={onOpenQuote} className="hover:text-indigo-400 transition-colors text-left py-1 block font-semibold text-indigo-400">
                  Instant Project Cost Estimator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-indigo-400 transition-colors text-left py-1 block text-slate-400">
                  Admin Dashboard Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Locations */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Outfit']">
              Contact & Hubs
            </h4>
            
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="font-bold text-white flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Headquarters</span>
                </div>
                <p className="text-slate-400">Housing Estate, Word No: 07, Joypurhat-5900, Bangladesh</p>
                <a href="tel:+8801712009617" className="mt-1 inline-block font-mono text-indigo-400 hover:text-indigo-300 font-semibold">
                  +880 1712-009617
                </a>
              </div>

              <div className="pt-1">
                <div className="text-slate-400 text-[11px]">General Enquiries:</div>
                <a href="mailto:info@webdevsoftwaresolutions.com" className="text-white hover:text-indigo-400 font-medium break-all">
                  info@webdevsoftwaresolutions.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar with copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div>
            © Copyright 2026 <span className="text-slate-300 font-semibold">WebDev Software Solutions</span>. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-slate-400 hover:text-slate-300 cursor-pointer">Privacy Policy (GDPR)</span>
            <span className="text-slate-400 hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="text-slate-400 hover:text-slate-300 cursor-pointer">Security SLA</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
