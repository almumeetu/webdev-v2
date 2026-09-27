'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Phone,
  ArrowUp,
  ArrowUpRight,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, WhatsAppIcon } from './SocialIcons';
import { useLanguage } from '../context/LanguageContext';
import { useAppContext } from '../context/AppContext';
import { getRoute } from '../utils/routes';

export const Footer: React.FC = () => {
  const router = useRouter();
  const { siteSettings, jobs } = useAppContext();
  const activeJobsCount = (jobs || []).filter((j) => j.isActive).length;

  // Local navigation wrappers — preserve the same variable names used throughout JSX
  const onNavigate = (view: string, subParam?: string) => router.push(getRoute(view, subParam));
  const onOpenQuote = () => router.push('/contact');

  const { t, lang } = useLanguage();

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12">

        {/* ── Pre-Footer Conversation Invitation ── */}
        <div className="pb-10 sm:pb-12 mb-10 sm:mb-12 border-b border-slate-800/70">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-['Archivo']">
                {lang === 'de' ? 'Bereit für Ihre nächste Enterprise-Softwarelösung?' : 'Ready to engineer your next software solution?'}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold text-sm transition-colors cursor-pointer border border-[#9cd5e2] shadow-sm"
              >
                <span>{t.requestConsultation}</span>
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
            <div className="flex items-center">
              {(siteSettings.darkLogoUrl || siteSettings.logoUrl) ? (
                <div className="inline-flex items-center justify-center rounded-lg overflow-hidden shrink-0">
                  <img
                    src={siteSettings.darkLogoUrl || '/images/logo/dark-logo-webdevss.png'}
                    alt={`${siteSettings.companyName} Logo`}
                    className="h-11 sm:h-12 w-auto object-contain rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-[#BBE7F1] border border-[#9cd5e2] flex items-center justify-center text-slate-950 font-bold text-sm">
                  {siteSettings.companyName?.slice(0, 2).toUpperCase() || 'WD'}
                </div>
              )}
            </div>

            {/* Company Real Description */}
            <p className="text-sm text-slate-400 leading-relaxed font-['Instrument_Sans'] max-w-sm">
              {lang === 'de' ? t.footerAboutText : (siteSettings.footerAboutText || 
                'WebDev Software Solutions is a full-cycle software engineering consultancy engineering high-performance web platforms, enterprise cloud infrastructures, and bespoke digital products for global businesses.')}
            </p>

            {/* Trust & Presence Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400 font-['Instrument_Sans']">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Leverkusen, DE &amp; Joypurhat, BD
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                {lang === 'de' ? 'DSGVO & Enterprise-konform' : 'GDPR & Enterprise Grade'}
              </span>
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
              {lang === 'de' ? 'Fachbereiche' : 'Practice Areas'}
            </h4>
            <ul className="space-y-2.5 text-sm font-['Instrument_Sans']">
              {[
                { label: lang === 'de' ? 'Full-Stack Web-Apps' : 'Full-Stack Web Apps', id: 'serv-1' },
                { label: lang === 'de' ? 'Cloud & Linux DevOps' : 'Cloud & Linux DevOps', id: 'serv-2' },
                { label: lang === 'de' ? 'Headless E-Commerce' : 'Headless E-Commerce', id: 'serv-3' },
                { label: lang === 'de' ? 'Enterprise CMS-Portale' : 'Enterprise CMS Portals', id: 'serv-4' },
                { label: lang === 'de' ? 'Microservices & APIs' : 'Microservices & APIs', id: 'serv-5' },
                { label: lang === 'de' ? 'Datenbank-Optimierung' : 'Database Optimization', id: 'serv-6' }
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
              {lang === 'de' ? 'Unternehmen' : 'Corporate'}
            </h4>
            <ul className="space-y-2.5 text-sm font-['Instrument_Sans']">
              <li>
                <button onClick={() => onNavigate('about')} className="text-slate-400 hover:text-white transition-colors text-left cursor-pointer font-normal block">
                  {lang === 'de' ? 'Über WebDev' : 'About WebDev'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('team')} className="text-slate-400 hover:text-white transition-colors text-left cursor-pointer font-normal block">
                  {lang === 'de' ? 'Team & Führung' : 'Our Team & Leadership'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="text-slate-400 hover:text-cyan-300 transition-colors text-left cursor-pointer font-normal inline-flex items-center gap-1.5">
                  <span>{t.navCareers}</span>
                  {activeJobsCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {lang === 'de' ? 'Stellen' : 'Hiring'}
                    </span>
                  )}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="text-slate-400 hover:text-white transition-colors text-left cursor-pointer font-normal block">
                  {lang === 'de' ? 'Fallstudien & Projekte' : 'Case Studies & Work'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="text-slate-400 hover:text-white transition-colors text-left cursor-pointer font-normal block">
                  {lang === 'de' ? 'Fachartikel & News' : 'Engineering Insights'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="text-slate-400 hover:text-white transition-colors text-left cursor-pointer font-normal block">
                  {lang === 'de' ? 'Kontakt & Anfragen' : 'Contact & Inquiries'}
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={onOpenQuote}
                  className="text-[#BBE7F1] hover:text-[#a7dfed] font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>{lang === 'de' ? 'Angebot anfordern' : 'Request Proposal'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#BBE7F1]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Global Offices (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Archivo']">
              {lang === 'de' ? 'Standorte' : 'Global Offices'}
            </h4>

            {/* Germany HQ */}
            <div className="space-y-1.5 pb-3.5 border-b border-slate-800/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white font-['Archivo']">
                    {lang === 'de' ? 'Leverkusen, Deutschland' : 'Leverkusen, Germany'}
                  </span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Küppersteg,+51373+Leverkusen,+Germany"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-[#BBE7F1] inline-flex items-center gap-1 transition-colors"
                  title={lang === 'de' ? 'In Google Maps öffnen' : 'Open in Google Maps'}
                >
                  <span>{lang === 'de' ? 'Karte' : 'Map'}</span>
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
              </div>
            </div>

            {/* Bangladesh Center */}
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white font-['Archivo']">Joypurhat, Bangladesh</span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Housing+Estate,+Ward+07,+Joypurhat-5900,+Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                  title={lang === 'de' ? 'In Google Maps öffnen' : 'Open in Google Maps'}
                >
                  <span>{lang === 'de' ? 'Karte' : 'Map'}</span>
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
              </div>
            </div>

          </div>

        </div>

        {/* ── Sub-Footer / Formal Governance & Legal Bar ── */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-['Instrument_Sans']">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>
              © {currentYear} <strong className="text-slate-200 font-medium">{siteSettings.companyName}</strong>. {lang === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 font-medium">
            <button
              onClick={() => onNavigate('privacy')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {t.footerPrivacy}
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {t.footerTerms}
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {lang === 'de' ? 'Sicherheit & NDA' : 'Security & NDA'}
            </button>
            <button
              id="footer-admin-link"
              onClick={() => onNavigate('admin')}
              className="text-slate-400 hover:text-[#BBE7F1] transition-colors cursor-pointer inline-flex items-center gap-1"
              title={lang === 'de' ? 'Administrator-Portal' : 'Administrator Portal'}
            >
              <Lock className="w-3 h-3 text-slate-500" />
              <span>{lang === 'de' ? 'Admin-Bereich' : 'Admin Portal'}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title={lang === 'de' ? 'Nach oben scrollen' : 'Back to Top'}
              aria-label={lang === 'de' ? 'Nach oben scrollen' : 'Back to Top'}
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
