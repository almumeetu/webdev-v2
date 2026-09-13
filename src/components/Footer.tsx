import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  ShieldCheck, 
  Globe, 
  Clock, 
  CheckCircle2, 
  LayoutDashboard,
  ArrowUp,
  Sparkles,
  Lock,
  Layers,
  FileCode2,
  Server
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (view: string, subParam?: string) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote }) => {
  const { t } = useLanguage();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-800/90 overflow-hidden">
      {/* Background Imagery with Dark Glassmorphic Blur Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Background Network Graphic Image */}
        <img 
          src="/images/footer/footer-tech-bg.jpg" 
          alt="WebDev Global Network Architecture" 
          className="w-full h-full object-cover object-center opacity-35 mix-blend-screen scale-105 filter blur-[0.5px]"
        />

        {/* Cinematic Multi-Layer Gradient Overlays & Backdrop Blur */}
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(99,102,241,0.14),transparent)]"></div>
        <div className="absolute -top-40 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px]"></div>
        <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px]"></div>
      </div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 pb-12 sm:pb-14 border-b border-slate-800/80">
          
          {/* Column 1: Brand & German Enterprise Focus (4 cols) */}
          <div className="lg:col-span-4 space-y-5 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              {/* Official Brand Logo */}
              <div className="flex items-center gap-3">
                <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-md border border-slate-200/20 inline-flex items-center justify-center hover:scale-105 transition-transform duration-200">
                  <img 
                    src="/images/logo/webdev-logo.png" 
                    alt="WebDev Software Solutions Logo" 
                    className="h-9 sm:h-11 w-auto object-contain"
                  />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {t.footerAboutText || 'Premier software consultancy and engineering firm with our European Hub in Küppersteg, Leverkusen, Germany and dedicated offshore R&D centers. Delivering high-performance web platforms, cloud architectures, and GDPR-compliant digital solutions.'}
              </p>
            </div>

            {/* German & European Enterprise Standards Card */}
            <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-emerald-500/25 space-y-2.5 shadow-lg">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-200">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>German & EU Standards</span>
                </span>
                <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>DSGVO / GDPR</span>
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                Direct European contracting, strict bilateral NDAs, and CET business hours real-time collaboration from our Leverkusen office.
              </p>
            </div>

            {/* Social Icons with sleek hover glows */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Connect With Us
              </div>
              <div className="flex items-center space-x-2.5">
                <a 
                  href="https://github.com/almumeetusaikat" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                  aria-label="Twitter / X"
                  title="Twitter / X"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a 
                  href="mailto:info@webdevsoftwaresolutions.com" 
                  className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                  aria-label="Email WebDev Software Solutions"
                  title="Direct Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Operating Hubs & Offices (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Operating Hubs & Offices</span>
            </h4>
            
            <div className="space-y-4 text-xs sm:text-sm">
              {/* Germany European Hub - Displayed FIRST */}
              <div className="p-4 sm:p-4.5 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-emerald-500/35 hover:border-emerald-500/60 transition-colors space-y-2.5 shadow-md">
                <div className="flex items-center justify-between text-white font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className="text-base">🇩🇪</span>
                    <span className="tracking-tight">Leverkusen, Germany</span>
                  </span>
                  <span className="text-[11px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                    European Hub
                  </span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Küppersteg, 51373 Leverkusen, North Rhine-Westphalia, Germany
                </p>
                <div className="pt-1 flex flex-wrap items-center justify-between gap-2 text-xs border-t border-slate-800/80">
                  <a 
                    href="tel:+491729766016" 
                    className="text-emerald-400 hover:text-emerald-300 font-mono font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+49 172 9766016</span>
                  </a>
                  <span className="text-slate-400 font-mono text-[11px]">9:00 - 18:00 CET</span>
                </div>
              </div>

              {/* Bangladesh Global R&D Center */}
              <div className="p-4 sm:p-4.5 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-slate-800/90 hover:border-slate-700 transition-colors space-y-2.5">
                <div className="flex items-center justify-between text-white font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className="text-base">🇧🇩</span>
                    <span className="tracking-tight">Joypurhat, Bangladesh</span>
                  </span>
                  <span className="text-[11px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                    Offshore R&D
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Housing Estate, Ward No: 07, Joypurhat-5900, Rajshahi Division, Bangladesh
                </p>
                <div className="pt-1 flex flex-wrap items-center justify-between gap-2 text-xs border-t border-slate-800/80">
                  <a 
                    href="tel:+8801722301927" 
                    className="text-indigo-400 hover:text-indigo-300 font-mono font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+880 1722-301927</span>
                  </a>
                  <span className="text-slate-500 font-mono text-[11px]">24/7 Continuous Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Engineering Capabilities (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Capabilities</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('services', 'serv-1')} 
                  className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5 group w-full"
                >
                  <span className="text-slate-600 group-hover:text-indigo-400 transition-colors">›</span>
                  <span>Full-Stack MERN</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services', 'serv-2')} 
                  className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5 group w-full"
                >
                  <span className="text-slate-600 group-hover:text-indigo-400 transition-colors">›</span>
                  <span>Cloud & Linux DevOps</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services', 'serv-3')} 
                  className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5 group w-full"
                >
                  <span className="text-slate-600 group-hover:text-indigo-400 transition-colors">›</span>
                  <span>Headless Shopify Apps</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services', 'serv-4')} 
                  className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5 group w-full"
                >
                  <span className="text-slate-600 group-hover:text-indigo-400 transition-colors">›</span>
                  <span>Enterprise CMS & Portals</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services', 'serv-5')} 
                  className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5 group w-full"
                >
                  <span className="text-slate-600 group-hover:text-indigo-400 transition-colors">›</span>
                  <span>REST & GraphQL APIs</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services', 'serv-6')} 
                  className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5 group w-full"
                >
                  <span className="text-slate-600 group-hover:text-indigo-400 transition-colors">›</span>
                  <span>Database Optimization</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation & Consultation (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-indigo-400" />
              <span>Direct Navigation</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5 group w-full">
                  <span className="text-slate-600 group-hover:text-indigo-400 transition-colors">›</span>
                  <span>About Our Firm</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('team')} className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5 group w-full">
                  <span className="text-slate-600 group-hover:text-indigo-400 transition-colors">›</span>
                  <span>Engineering Team</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5 group w-full">
                  <span className="text-slate-600 group-hover:text-indigo-400 transition-colors">›</span>
                  <span>Case Studies & Demos</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer flex items-center gap-1.5 group w-full">
                  <span className="text-slate-600 group-hover:text-indigo-400 transition-colors">›</span>
                  <span>Tech Blog & Insights</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors text-left cursor-pointer flex items-center gap-1 pt-1 w-full">
                  <span>Client Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              </li>

              {/* Admin Dashboard Console Trigger */}
              <li className="pt-2">
                <button 
                  onClick={() => onNavigate('admin')} 
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/70 hover:bg-indigo-950/30 transition-all text-xs font-semibold cursor-pointer group shadow-sm"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                  <span>Admin Console</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Trust Badges, and Scroll-to-Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span className="text-slate-300 font-medium">© {new Date().getFullYear()} WebDev Software Solutions.</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="text-slate-400">{t.footerRights || 'All rights reserved. Bilateral NDAs & 100% IP Transfer guaranteed.'}</span>
          </div>

          {/* Security & Governance Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>German GDPR & ISO 27001</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>100% Source Code Ownership</span>
            </span>
          </div>

          {/* Scroll To Top Button */}
          <div className="shrink-0">
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-slate-900/90 hover:bg-indigo-600 border border-slate-800 hover:border-indigo-500 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm group"
              title="Scroll to Top"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};
