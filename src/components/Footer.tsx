'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Phone,
  ArrowUp,
  ArrowUpRight,
  ShieldCheck,
  Lock,
  Clock
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, WhatsAppIcon } from './SocialIcons';
import { useLanguage } from '../context/LanguageContext';
import { useAppContext } from '../context/AppContext';
import { getRoute } from '../utils/routes';

export const Footer: React.FC = () => {
  const router = useRouter();
  const { siteSettings } = useAppContext();

  // Local navigation wrappers — preserve the same variable names used throughout JSX
  const onNavigate = (view: string, subParam?: string) => router.push(getRoute(view, subParam));
  const onOpenQuote = () => router.push('/contact');

  const { t } = useLanguage();

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-slate-800/80">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12">

        {/* ── Pre-Footer Conversation Invitation ── */}
        <div className="pb-10 sm:pb-12 mb-10 sm:mb-12 border-b border-slate-800/70">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-['Archivo']">
                Ready to engineer your next software solution?
              </h3>
              <p className="mt-2 text-sm text-slate-400 font-['Instrument_Sans'] leading-relaxed">
                Partner with our engineering teams in Germany and Bangladesh for high-performance web systems, cloud architectures, and dedicated product delivery.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold text-sm transition-colors cursor-pointer border border-[#9cd5e2] shadow-sm"
              >
                <span>Request a Proposal</span>
                <ArrowUpRight className="w-4 h-4 text-slate-950" />
              </button>
              <a
                href={`mailto:${siteSettings.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-sm font-medium transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{siteSettings.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Main 4-Column Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 pb-12 sm:pb-14 border-b border-slate-800/70">

          {/* Column 1: Brand & Enterprise Credentials (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              {siteSettings.logoUrl && siteSettings.logoUrl.trim() !== '' ? (
                <div className="bg-white px-2.5 py-1 rounded-lg inline-flex items-center justify-center">
                  <img
                    src={siteSettings.logoUrl}
                    alt={`${siteSettings.companyName} Logo`}
                    className="h-7 w-auto object-contain"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-[#BBE7F1] border border-[#9cd5e2] flex items-center justify-center text-slate-950 font-bold text-sm">
                  {siteSettings.companyName?.slice(0, 2).toUpperCase() || 'WD'}
                </div>
              )}
              <div>
                <span className="text-base font-bold text-white tracking-tight leading-none block font-['Archivo']">
                  {siteSettings.companyName}
                </span>
                <span className="text-[11px] font-medium text-slate-400 tracking-wider uppercase block mt-1 font-['Instrument_Sans']">
                  Software Solutions &amp; Cloud Engineering
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed font-['Instrument_Sans']">
              {t.footerAboutText || siteSettings.footerAboutText}
            </p>

            {/* Formal Compliance & Assurance Badges */}
            <div className="pt-1 flex flex-col gap-2 text-xs text-slate-400 font-['Instrument_Sans']">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>EU GDPR / DSGVO Compliant Protocols</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100% Client IP &amp; Source Code Ownership</span>
              </div>
            </div>

            {/* Social Communications Links */}
            <div className="flex items-center gap-2 pt-2">
              {siteSettings.socialLinks.github && (
                <a
                  href={siteSettings.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {siteSettings.socialLinks.linkedin && (
                <a
                  href={siteSettings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {siteSettings.socialLinks.twitter && (
                <a
                  href={siteSettings.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 flex items-center justify-center transition-colors"
                  aria-label="Twitter / X"
                  title="Twitter / X"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
              {siteSettings.socialLinks.whatsapp_de && (
                <a
                  href={siteSettings.socialLinks.whatsapp_de}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 border border-slate-800 hover:border-slate-700 flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                </a>
              )}
              <a
                href={`mailto:${siteSettings.email}`}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 flex items-center justify-center transition-colors"
                aria-label="Email"
                title={siteSettings.email}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Solutions & Capabilities (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Archivo']">
              Practice Areas
            </h4>
            <ul className="space-y-2.5 text-sm font-['Instrument_Sans']">
              {[
                { label: 'Full-Stack Web Apps', id: 'serv-1' },
                { label: 'Cloud & Linux DevOps', id: 'serv-2' },
                { label: 'Headless E-Commerce', id: 'serv-3' },
                { label: 'Enterprise CMS Portals', id: 'serv-4' },
                { label: 'Microservices & APIs', id: 'serv-5' },
                { label: 'Database Optimization', id: 'serv-6' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate('services', item.id)}
                    className="text-slate-400 hover:text-white transition-colors text-left cursor-pointer font-normal block"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Corporate Directory (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Archivo']">
              Corporate
            </h4>
            <ul className="space-y-2.5 text-sm font-['Instrument_Sans']">
              <li>
                <button onClick={() => onNavigate('about')} className="text-slate-400 hover:text-white transition-colors text-left cursor-pointer font-normal block">
                  About WebDev
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('team')} className="text-slate-400 hover:text-white transition-colors text-left cursor-pointer font-normal block">
                  Leadership &amp; Engineers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="text-slate-400 hover:text-white transition-colors text-left cursor-pointer font-normal block">
                  Case Studies &amp; Work
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="text-slate-400 hover:text-white transition-colors text-left cursor-pointer font-normal block">
                  Engineering Insights
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="text-slate-400 hover:text-white transition-colors text-left cursor-pointer font-normal block">
                  Contact &amp; Inquiries
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={onOpenQuote}
                  className="text-[#BBE7F1] hover:text-[#a7dfed] font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Request Proposal</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#BBE7F1]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Global Offices (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Archivo']">
              Global Offices
            </h4>

            {/* Germany HQ */}
            <div className="space-y-1.5 pb-3.5 border-b border-slate-800/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white font-['Archivo']">Leverkusen, Germany</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#BBE7F1]/10 text-cyan-300 border border-[#9cd5e2]/30 font-semibold">
                    European HQ
                  </span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Küppersteg,+51373+Leverkusen,+Germany"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-[#BBE7F1] inline-flex items-center gap-1 transition-colors"
                  title="Open in Google Maps"
                >
                  <span>Map</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-['Instrument_Sans']">
                {siteSettings.address_de}
              </p>

              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs font-mono pt-0.5">
                <a
                  href={`tel:${siteSettings.phone_de.replace(/\s+/g, '')}`}
                  className="text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3 h-3 text-cyan-400" />
                  <span>{siteSettings.phone_de}</span>
                </a>
                <span className="text-slate-700 hidden sm:inline">·</span>
                <span className="text-slate-400 inline-flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>Mon–Fri 09:00–18:00 CET</span>
                </span>
              </div>
            </div>

            {/* Bangladesh Center */}
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white font-['Archivo']">Joypurhat, Bangladesh</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                    R&amp;D Center
                  </span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Housing+Estate,+Ward+07,+Joypurhat-5900,+Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                  title="Open in Google Maps"
                >
                  <span>Map</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-['Instrument_Sans']">
                {siteSettings.address_bd}
              </p>

              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs font-mono pt-0.5">
                <a
                  href={`tel:${siteSettings.phone_bd.replace(/\s+/g, '')}`}
                  className="text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>{siteSettings.phone_bd}</span>
                </a>
                <span className="text-slate-700 hidden sm:inline">·</span>
                <span className="text-slate-400 inline-flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>Sun–Thu 10:00–19:00 BST</span>
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* ── Sub-Footer / Formal Governance & Legal Bar ── */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-['Instrument_Sans']">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>
              © {currentYear} <strong className="text-slate-200 font-medium">{siteSettings.companyName}</strong>. All rights reserved.
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="text-slate-400">
              Dual-Registered in Germany &amp; Bangladesh · GDPR (DSGVO) Compliant
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 font-medium">
            <button
              onClick={() => onNavigate('privacy')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Terms of Engagement
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Security &amp; NDA
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Admin Portal
            </button>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
