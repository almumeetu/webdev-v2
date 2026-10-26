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
        { label: 'Dienstleistungen', view: 'services', Icon: HiOutlineCode, color: 'text-violet-600' },
        { label: 'Portfolio', view: 'portfolio', Icon: HiOutlineCollection, color: 'text-amber-600' },
        { label: 'Unser Team', view: 'team', Icon: HiOutlineUserGroup, color: 'text-sky-600' },
        { label: 'Blog & News', view: 'blog', Icon: HiOutlineNewspaper, color: 'text-rose-600' },
        { label: 'Kontakt', view: 'contact', Icon: HiOutlineMail, color: 'text-emerald-600' },
      ]
    : [
        { label: 'Services', view: 'services', Icon: HiOutlineCode, color: 'text-violet-600' },
        { label: 'Portfolio', view: 'portfolio', Icon: HiOutlineCollection, color: 'text-amber-600' },
        { label: 'Meet the Team', view: 'team', Icon: HiOutlineUserGroup, color: 'text-sky-600' },
        { label: 'Engineering Insights', view: 'blog', Icon: HiOutlineNewspaper, color: 'text-rose-600' },
        { label: 'Contact', view: 'contact', Icon: HiOutlineMail, color: 'text-emerald-600' },
      ];

  const companyLinks = lang === 'de'
    ? [
        { label: 'Über uns', view: 'about', Icon: HiOutlineInformationCircle, color: 'text-cyan-600', badge: undefined },
        { label: 'Karriere', view: 'careers', Icon: HiOutlineBriefcase, color: 'text-indigo-600', badge: activeJobsCount > 0 ? 'Stellen' : undefined },
        { label: 'Datenschutz', view: 'privacy', Icon: HiOutlineShieldCheck, color: 'text-green-600', badge: undefined },
        { label: 'Nutzungsbedingungen', view: 'terms', Icon: HiOutlineDocumentText, color: 'text-orange-600', badge: undefined },
      ]
    : [
        { label: 'About Us', view: 'about', Icon: HiOutlineInformationCircle, color: 'text-cyan-600', badge: undefined },
        { label: 'Careers', view: 'careers', Icon: HiOutlineBriefcase, color: 'text-indigo-600', badge: activeJobsCount > 0 ? 'Hiring' : undefined },
        { label: 'Privacy Policy', view: 'privacy', Icon: HiOutlineShieldCheck, color: 'text-green-600', badge: undefined },
        { label: 'Terms of Service', view: 'terms', Icon: HiOutlineDocumentText, color: 'text-orange-600', badge: undefined },
      ];

  return (
    <footer className="site-footer-edge footer-simple-surface relative bg-slate-50 text-slate-700 overflow-hidden border-t border-slate-200">
      {/* Background shape image */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url('/images/white bg-shape/tech-bg-shape-1.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Subtle background pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(15,23,42,0.5) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-10 gap-y-9 pt-14 pb-12 sm:grid-cols-2 sm:pt-16 sm:pb-14 lg:grid-cols-4 lg:gap-x-12 lg:pt-20 lg:pb-16">
          <section className="flex flex-col items-start gap-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              aria-label={siteSettings.companyName}
              className="footer-nav-link inline-flex shrink-0 items-center"
            >
              {(siteSettings.logoUrl || siteSettings.darkLogoUrl) ? (
                <img
                  src={siteSettings.logoUrl || '/images/logo/webdev-logo.png'}
                  alt={`${siteSettings.companyName} Logo`}
                  className="h-10 w-auto object-contain sm:h-11"
                />
              ) : (
                <span className="text-lg font-semibold tracking-tight text-slate-900">
                  {siteSettings.companyName || 'WebDev'}
                </span>
              )}
            </button>
            <p className="max-w-sm text-sm leading-relaxed text-slate-600">
              {lang === 'de'
                ? t.footerAboutText
                : (siteSettings.footerAboutText ||
                  'Building resilient web platforms, scalable cloud systems, and digital products for growing businesses worldwide.')}
            </p>

            {socialLinks.length > 0 && (
              <nav aria-label={lang === 'de' ? 'Soziale Netzwerke' : 'Social links'} className="flex items-center gap-4 pt-1">
                {socialLinks.map(({ href, label, Icon }) => {
                  const iconColor = label === 'LinkedIn'
                    ? 'text-[#0A66C2]'
                    : label === 'WhatsApp'
                      ? 'text-[#25D366]'
                      : 'text-slate-900';
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className={`inline-flex h-8 w-8 items-center justify-center transition-transform duration-200 hover:-translate-y-0.5 ${iconColor}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </nav>
            )}
          </section>

          <section className="flex flex-col items-start gap-4">
            <h2 className="text-base font-semibold text-slate-950">
              {lang === 'de' ? 'Entdecken' : 'Explore'}
            </h2>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ label, view, Icon, color }) => (
                <li key={view}>
                  <button
                    type="button"
                    onClick={() => onNavigate(view)}
                    className="footer-nav-link group inline-flex items-center gap-2.5 text-left text-sm text-slate-600 transition-colors hover:text-slate-950"
                  >
                    <Icon className={`h-[18px] w-[18px] shrink-0 ${color}`} />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col items-start gap-4">
            <h2 className="text-base font-semibold text-slate-950">
              {lang === 'de' ? 'Unternehmen' : 'Company'}
            </h2>
            <ul className="flex flex-col gap-3">
              {companyLinks.map(({ label, view, badge, Icon, color }) => (
                <li key={view}>
                  <button
                    type="button"
                    onClick={() => onNavigate(view)}
                    className="footer-nav-link group inline-flex items-center gap-2.5 text-left text-sm text-slate-600 transition-colors hover:text-slate-950"
                  >
                    <Icon className={`h-[18px] w-[18px] shrink-0 ${color}`} />
                    <span>{label}</span>
                    {badge && <span className="text-[10px] font-medium text-emerald-700">{badge}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col items-start gap-4">
            <h2 className="text-base font-semibold text-slate-950">
              {lang === 'de' ? 'Standorte' : 'Locations'}
            </h2>
            <div className="flex flex-col gap-4">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Leverkusen,+Germany"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2.5 text-sm text-slate-600 transition-colors hover:text-slate-950"
              >
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-sky-600" />
                <span className="block font-medium text-slate-900 group-hover:text-sky-700 transition-colors">Leverkusen, Germany</span>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Joypurhat,+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2.5 text-sm text-slate-600 transition-colors hover:text-slate-950"
              >
                <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-emerald-600" />
                <span className="block font-medium text-slate-900 group-hover:text-emerald-700 transition-colors">Joypurhat, Bangladesh</span>
              </a>
            </div>
          </section>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-slate-200/80 py-5 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <button type="button" onClick={() => onNavigate('privacy')} className="footer-nav-link text-xs text-slate-500 transition-colors hover:text-slate-900">
              {t.footerPrivacy}
            </button>
            <button type="button" onClick={() => onNavigate('terms')} className="footer-nav-link text-xs text-slate-500 transition-colors hover:text-slate-900">
              {t.footerTerms}
            </button>
            <button type="button" onClick={() => onNavigate('contact')} className="footer-nav-link text-xs text-slate-500 transition-colors hover:text-slate-900">
              {lang === 'de' ? 'Sicherheit & NDA' : 'Security & NDA'}
            </button>
            <button
              id="footer-admin-link"
              type="button"
              onClick={() => onNavigate('admin')}
              className="footer-nav-link inline-flex items-center gap-1 text-xs text-slate-500 transition-colors hover:text-slate-900"
              title={lang === 'de' ? 'Administrator-Portal' : 'Administrator Portal'}
            >
              <Lock className="h-3 w-3" />
              <span>Admin</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="text-center sm:text-right">
              © {currentYear} <strong className="font-semibold text-slate-800">{siteSettings.companyName}</strong>.{' '}
              {lang === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="footer-to-top rounded-full inline-flex h-8 w-8 shrink-0 items-center justify-center text-slate-500 transition-colors hover:text-sky-700 group"
              title={lang === 'de' ? 'Nach oben scrollen' : 'Back to Top'}
              aria-label={lang === 'de' ? 'Nach oben scrollen' : 'Back to Top'}
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
