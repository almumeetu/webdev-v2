'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowUp,
  Lock,
  MapPin
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, WhatsAppIcon } from './SocialIcons';
import {
  HiOutlineCode,
  HiOutlineCollection,
  HiOutlineUserGroup,
  HiOutlineNewspaper,
  HiOutlineMail,
  HiOutlineInformationCircle,
  HiOutlineBriefcase,
  HiOutlineShieldCheck,
  HiOutlineDocumentText
} from 'react-icons/hi';
import { useLanguage } from '../context/LanguageContext';
import { useAppContext } from '../context/AppContext';
import { getRoute } from '../utils/routes';
import { SignatureShapeDivider } from './SignatureShapeDivider';

export const Footer: React.FC = () => {
  const router = useRouter();
  const { siteSettings, jobs } = useAppContext();
  const { t, lang } = useLanguage();
  const activeJobsCount = (jobs || []).filter((job) => job.isActive).length;
  const currentYear = new Date().getFullYear();

  const onNavigate = (view: string, subParam?: string) => router.push(getRoute(view, subParam));
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socialLinks = [
    { href: siteSettings.socialLinks.github, label: 'GitHub', Icon: GithubIcon },
    { href: siteSettings.socialLinks.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    { href: siteSettings.socialLinks.twitter, label: 'Twitter / X', Icon: TwitterIcon },
    { href: siteSettings.socialLinks.whatsapp_de, label: 'WhatsApp', Icon: WhatsAppIcon }
  ].filter((link) => Boolean(link.href));

  const quickLinks = lang === 'de'
    ? [
        { label: 'Dienstleistungen', view: 'services', Icon: HiOutlineCode,            color: 'text-violet-600', bg: 'group-hover:border-violet-300 group-hover:bg-violet-50' },
        { label: 'Portfolio',        view: 'portfolio', Icon: HiOutlineCollection,      color: 'text-amber-600',  bg: 'group-hover:border-amber-300  group-hover:bg-amber-50'  },
        { label: 'Unser Team',       view: 'team',      Icon: HiOutlineUserGroup,       color: 'text-sky-600',    bg: 'group-hover:border-sky-300    group-hover:bg-sky-50'    },
        { label: 'Blog & News',      view: 'blog',      Icon: HiOutlineNewspaper,       color: 'text-rose-600',   bg: 'group-hover:border-rose-300   group-hover:bg-rose-50'   },
        { label: 'Kontakt',          view: 'contact',   Icon: HiOutlineMail,            color: 'text-emerald-600', bg: 'group-hover:border-emerald-300 group-hover:bg-emerald-50' },
      ]
    : [
        { label: 'Services',             view: 'services', Icon: HiOutlineCode,        color: 'text-violet-600', bg: 'group-hover:border-violet-300 group-hover:bg-violet-50' },
        { label: 'Portfolio',            view: 'portfolio', Icon: HiOutlineCollection, color: 'text-amber-600',  bg: 'group-hover:border-amber-300  group-hover:bg-amber-50'  },
        { label: 'Meet the Team',        view: 'team',      Icon: HiOutlineUserGroup,  color: 'text-sky-600',    bg: 'group-hover:border-sky-300    group-hover:bg-sky-50'    },
        { label: 'Engineering Insights', view: 'blog',      Icon: HiOutlineNewspaper,  color: 'text-rose-600',   bg: 'group-hover:border-rose-300   group-hover:bg-rose-50'   },
        { label: 'Contact',              view: 'contact',   Icon: HiOutlineMail,       color: 'text-emerald-600', bg: 'group-hover:border-emerald-300 group-hover:bg-emerald-50' },
      ];

  const companyLinks = lang === 'de'
    ? [
        { label: 'Über uns',              view: 'about',    Icon: HiOutlineInformationCircle, color: 'text-cyan-600',    bg: 'group-hover:border-cyan-300    group-hover:bg-cyan-50',    badge: undefined },
        { label: 'Karriere',              view: 'careers',  Icon: HiOutlineBriefcase,         color: 'text-indigo-600',  bg: 'group-hover:border-indigo-300  group-hover:bg-indigo-50',  badge: activeJobsCount > 0 ? 'Stellen' : undefined },
        { label: 'Datenschutz',           view: 'privacy',  Icon: HiOutlineShieldCheck,       color: 'text-green-600',   bg: 'group-hover:border-green-300   group-hover:bg-green-50',   badge: undefined },
        { label: 'Nutzungsbedingungen',   view: 'terms',    Icon: HiOutlineDocumentText,      color: 'text-orange-600',  bg: 'group-hover:border-orange-300  group-hover:bg-orange-50',  badge: undefined },
      ]
    : [
        { label: 'About Us',         view: 'about',   Icon: HiOutlineInformationCircle, color: 'text-cyan-600',    bg: 'group-hover:border-cyan-300    group-hover:bg-cyan-50',    badge: undefined },
        { label: 'Careers',          view: 'careers', Icon: HiOutlineBriefcase,         color: 'text-indigo-600',  bg: 'group-hover:border-indigo-300  group-hover:bg-indigo-50',  badge: activeJobsCount > 0 ? 'Hiring' : undefined },
        { label: 'Privacy Policy',   view: 'privacy', Icon: HiOutlineShieldCheck,       color: 'text-green-600',   bg: 'group-hover:border-green-300   group-hover:bg-green-50',   badge: undefined },
        { label: 'Terms of Service', view: 'terms',   Icon: HiOutlineDocumentText,      color: 'text-orange-600',  bg: 'group-hover:border-orange-300  group-hover:bg-orange-50',  badge: undefined },
      ];

  return (
    <footer className="relative overflow-hidden bg-slate-50/95 border-t border-slate-200/90 text-slate-700 pt-8 sm:pt-10">
      {/* ── Signature Architectural Shape Divider at the Top of Footer ── */}
      <SignatureShapeDivider
        position="top"
        fillColor="text-white"
        heightClass="h-4 sm:h-5 md:h-6"
      />

      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(15,23,42,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Main Footer Grid: 12 Columns for Perfect Balance ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 py-12 sm:py-14">

          {/* Column 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              aria-label={siteSettings.companyName}
              className="inline-flex shrink-0 items-center self-start"
            >
              {(siteSettings.logoUrl || siteSettings.darkLogoUrl) ? (
                <img
                  src={siteSettings.logoUrl || '/images/logo/webdev-logo.png'}
                  alt={`${siteSettings.companyName} Logo`}
                  className="h-10 w-auto object-contain sm:h-11"
                />
              ) : (
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#9cd5e2] bg-[#BBE7F1]/30 text-sm font-semibold text-slate-900">
                  {siteSettings.companyName?.slice(0, 2).toUpperCase() || 'WD'}
                </span>
              )}
            </button>

            <p className="text-sm leading-relaxed text-slate-600 max-w-sm font-normal">
              {lang === 'de'
                ? t.footerAboutText
                : (siteSettings.footerAboutText ||
                  'Building resilient web platforms, scalable cloud systems, and digital products for growing businesses worldwide.')}
            </p>

            {/* Social links */}
            {socialLinks.length > 0 && (
              <nav aria-label={lang === 'de' ? 'Soziale Netzwerke' : 'Social links'} className="flex items-center gap-2 pt-1">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="group inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs transition-all duration-200 hover:border-[#9cd5e2] hover:bg-[#BBE7F1]/20 hover:text-slate-950 hover:scale-105"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </nav>
            )}
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900 font-mono">
              {lang === 'de' ? 'Navigation' : 'Explore'}
            </p>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map(({ label, view, Icon, color, bg }) => (
                <li key={view}>
                  <button
                    onClick={() => onNavigate(view)}
                    className="group flex items-center gap-2.5 text-sm text-slate-600 transition-all duration-150 hover:text-slate-950 hover:translate-x-0.5 cursor-pointer text-left"
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-slate-200/90 bg-white shadow-2xs transition-all duration-200 ${color} ${bg}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company & Legal (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900 font-mono">
              {lang === 'de' ? 'Unternehmen' : 'Company'}
            </p>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map(({ label, view, badge, Icon, color, bg }) => (
                <li key={view}>
                  <button
                    onClick={() => onNavigate(view)}
                    className="group flex items-center gap-2.5 text-sm text-slate-600 transition-all duration-150 hover:text-slate-950 hover:translate-x-0.5 cursor-pointer text-left"
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-slate-200/90 bg-white shadow-2xs transition-all duration-200 ${color} ${bg}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span>{label}</span>
                    {badge && (
                      <span className="rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                        {badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Standorte / Locations (Only the 2 locations with colorful icons) */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900 font-mono">
              {lang === 'de' ? 'Standorte' : 'Locations'}
            </p>

            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Küppersteg,+51373+Leverkusen,+Germany"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 text-sm text-slate-600 transition-all duration-150 hover:text-slate-950 cursor-pointer"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-sky-200/90 bg-sky-50 shadow-2xs transition-all duration-200 text-sky-600 group-hover:border-sky-300 group-hover:bg-sky-100 mt-0.5">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-snug">Küppersteg, 51373 Leverkusen, NRW, Germany</span>
                </a>
              </li>

              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Housing+Estate,+Ward+07,+Joypurhat-5900,+Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 text-sm text-slate-600 transition-all duration-150 hover:text-slate-950 cursor-pointer"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-emerald-200/90 bg-emerald-50 shadow-2xs transition-all duration-200 text-emerald-600 group-hover:border-emerald-300 group-hover:bg-emerald-100 mt-0.5">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-snug">Joypurhat, Bangladesh</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Sub-Footer / Formal Governance & Legal Bar ── */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 py-6 sm:flex-row">
          <span className="text-xs text-slate-500 font-['Kufam']">
            © {currentYear}{' '}
            <strong className="font-semibold text-slate-800">{siteSettings.companyName}</strong>.{' '}
            {lang === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
          </span>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <button
              onClick={() => onNavigate('privacy')}
              className="text-xs text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              {t.footerPrivacy}
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className="text-xs text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              {t.footerTerms}
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="text-xs text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              {lang === 'de' ? 'Sicherheit & NDA' : 'Security & NDA'}
            </button>

            <button
              id="footer-admin-link"
              onClick={() => onNavigate('admin')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-900 cursor-pointer"
              title={lang === 'de' ? 'Administrator-Portal' : 'Administrator Portal'}
            >
              <Lock className="h-3 w-3" />
              <span>{lang === 'de' ? 'Admin' : 'Admin'}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="group ml-2 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-2xs transition-all duration-200 hover:border-[#9cd5e2] hover:bg-[#BBE7F1]/20 hover:text-slate-950 cursor-pointer"
              title={lang === 'de' ? 'Nach oben scrollen' : 'Back to Top'}
              aria-label={lang === 'de' ? 'Nach oben scrollen' : 'Back to Top'}
            >
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
