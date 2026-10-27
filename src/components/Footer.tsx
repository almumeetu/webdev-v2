'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowUp,
  ArrowRight,
  Check,
  LoaderCircle,
  Lock,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, WhatsAppIcon } from './SocialIcons';
import {
  HiOutlineCode,
  HiOutlineCollection,
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
  const { siteSettings, jobs, addInquiry } = useAppContext();
  const { t, lang } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const activeJobsCount = (jobs || []).filter((job) => job.isActive).length;
  const currentYear = new Date().getFullYear();

  const onNavigate = (view: string, subParam?: string) => router.push(getRoute(view, subParam));
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newsletterStatus === 'loading') return;

    setNewsletterStatus('loading');
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Newsletter',
          lastName: 'Subscriber',
          email: newsletterEmail.trim().toLowerCase(),
          projectType: 'Newsletter subscription',
          budget: 'Not applicable',
          currency: '',
          timezone: '',
          targetMarket: 'International',
          message: `I would like to subscribe to the newsletter. Request submitted through the website footer. Preferred language: ${lang === 'de' ? 'German' : 'English'}.`,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success || !result.inquiry) {
        throw new Error('Newsletter request could not be saved.');
      }

      addInquiry(result.inquiry);
      setNewsletterEmail('');
      setNewsletterStatus('success');
    } catch {
      setNewsletterStatus('error');
    }
  };

  const socialLinks = [
    {
      key: 'linkedin',
      href: siteSettings.socialLinks.linkedin,
      label: 'LinkedIn',
      Icon: LinkedinIcon,
      hoverColor: 'hover:border-sky-200 hover:bg-sky-50 hover:text-[#0A66C2]',
    },
    {
      key: 'github',
      href: siteSettings.socialLinks.github,
      label: 'GitHub',
      Icon: GithubIcon,
      hoverColor: 'hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950',
    },
    {
      key: 'twitter',
      href: siteSettings.socialLinks.twitter,
      label: 'Twitter / X',
      Icon: TwitterIcon,
      hoverColor: 'hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950',
    },
    {
      key: 'whatsapp',
      href: siteSettings.socialLinks.whatsapp_de?.trim() || siteSettings.socialLinks.whatsapp_bd,
      label: 'WhatsApp',
      Icon: WhatsAppIcon,
      hoverColor: 'hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600',
    },
  ].filter((link) => Boolean(link.href?.trim()));

  const quickLinks = lang === 'de'
    ? [
        { label: 'Dienstleistungen', view: 'services', Icon: HiOutlineCode, color: 'text-violet-600' },
        { label: 'Portfolio', view: 'portfolio', Icon: HiOutlineCollection, color: 'text-amber-600' },
        { label: 'Blog & News', view: 'blog', Icon: HiOutlineNewspaper, color: 'text-rose-600' },
        { label: 'Kontakt', view: 'contact', Icon: HiOutlineMail, color: 'text-emerald-600' },
      ]
    : [
        { label: 'Services', view: 'services', Icon: HiOutlineCode, color: 'text-violet-600' },
        { label: 'Portfolio', view: 'portfolio', Icon: HiOutlineCollection, color: 'text-amber-600' },
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
        <section aria-label={lang === 'de' ? 'In Verbindung bleiben' : 'Stay connected'} className="relative flex flex-col items-center py-8 text-center sm:py-10">
          {socialLinks.length > 0 && (
            <>
              <h2 id="footer-follow-heading" className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
                {lang === 'de' ? 'Folgen Sie uns' : 'Follow Us'}
              </h2>
              <div className="mt-4 flex w-full max-w-3xl items-center gap-3 sm:gap-6">
                <div aria-hidden="true" className="relative h-px min-w-0 flex-1 bg-gradient-to-r from-transparent via-slate-300/80 to-sky-300/80">
                  <span className="absolute -right-0.5 top-1/2 h-1 w-1 -translate-y-1/2 rotate-45 bg-sky-300" />
                </div>
                <nav aria-label={lang === 'de' ? 'Soziale Netzwerke' : 'Social links'} className="flex max-w-full shrink-0 flex-wrap items-center justify-center gap-2.5 sm:gap-4">
                  {socialLinks.map(({ key, href, label, Icon, hoverColor }) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-600 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${hoverColor}`}
                    >
                      <span aria-hidden="true"><Icon className="h-[19px] w-[19px]" /></span>
                    </a>
                  ))}
                </nav>
                <div aria-hidden="true" className="relative h-px min-w-0 flex-1 bg-gradient-to-r from-sky-300/80 via-slate-300/80 to-transparent">
                  <span className="absolute -left-0.5 top-1/2 h-1 w-1 -translate-y-1/2 rotate-45 bg-sky-300" />
                </div>
              </div>
            </>
          )}
          <div className={`w-full max-w-xs ${socialLinks.length > 0 ? 'mt-7' : ''}`}>
            <h2 id="footer-newsletter-heading" className="text-sm font-semibold tracking-tight text-slate-800">
              {lang === 'de' ? 'Unseren Newsletter abonnieren' : 'Subscribe to our newsletter'}
            </h2>
            <form
              onSubmit={handleNewsletterSubmit}
              aria-labelledby="footer-newsletter-heading"
              aria-busy={newsletterStatus === 'loading'}
              className="mt-3 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 p-1.5 shadow-sm shadow-slate-200/30 transition-colors focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100"
            >
              <Mail aria-hidden="true" className="ml-2 h-4 w-4 shrink-0 text-slate-400" />
              <label htmlFor="footer-newsletter-email" className="sr-only">
                {lang === 'de' ? 'E-Mail-Adresse' : 'Email address'}
              </label>
              <input
                id="footer-newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                maxLength={254}
                value={newsletterEmail}
                onChange={(event) => {
                  setNewsletterEmail(event.target.value);
                  setNewsletterStatus('idle');
                }}
                disabled={newsletterStatus === 'loading'}
                placeholder={lang === 'de' ? 'Ihre E-Mail-Adresse' : 'Your email address'}
                aria-describedby="footer-newsletter-status"
                className="min-w-0 flex-1 bg-transparent py-2 text-base text-slate-700 placeholder:text-slate-400 disabled:opacity-60 sm:text-sm"
              />
              <button
                type="submit"
                data-clean-hover
                disabled={newsletterStatus === 'loading'}
                aria-label={newsletterStatus === 'loading'
                  ? (lang === 'de' ? 'Anfrage wird gesendet' : 'Sending subscription request')
                  : t.newsletterBtn}
                title={t.newsletterBtn}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white transition-colors hover:bg-sky-700 disabled:opacity-60"
              >
                {newsletterStatus === 'loading'
                  ? <LoaderCircle aria-hidden="true" className="h-4 w-4 motion-safe:animate-spin" />
                  : newsletterStatus === 'success'
                    ? <Check aria-hidden="true" className="h-4 w-4" />
                    : <ArrowRight aria-hidden="true" className="h-4 w-4" />}
              </button>
            </form>
            <p id="footer-newsletter-status" role="status" aria-live="polite" className={`mt-2 text-xs leading-relaxed ${newsletterStatus === 'error' ? 'text-rose-600' : 'text-emerald-700'}`}>
              {newsletterStatus === 'success'
                ? (lang === 'de' ? 'Vielen Dank! Ihre Newsletter-Anfrage ist eingegangen.' : 'Thank you! Your subscription request has been received.')
                : newsletterStatus === 'error'
                  ? (lang === 'de' ? 'Das hat nicht geklappt. Bitte versuchen Sie es erneut.' : 'We couldn’t save your request. Please try again.')
                  : null}
            </p>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent">
            <span className="absolute left-1/2 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-x-10 gap-y-9 pt-10 pb-12 sm:grid-cols-2 sm:pt-12 sm:pb-14 lg:grid-cols-4 lg:gap-x-12 lg:pt-14 lg:pb-16">
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
            <div className="flex flex-col gap-5">
              {/* Germany */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Leverkusen,+Germany"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 text-sm text-slate-600 transition-colors hover:text-slate-950"
                >
                  <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-sky-600" />
                  <span className="block font-medium text-slate-900 group-hover:text-sky-700 transition-colors">Leverkusen, Germany</span>
                </a>
                {siteSettings.phone_de && (
                  <a
                    href={`tel:${siteSettings.phone_de.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2.5 text-sm text-slate-500 hover:text-sky-700 transition-colors pl-0.5"
                  >
                    <Phone className="h-[15px] w-[15px] shrink-0 text-sky-500" />
                    <span className="font-mono text-[13px]">{siteSettings.phone_de}</span>
                  </a>
                )}
              </div>

              {/* Bangladesh */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Joypurhat,+Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 text-sm text-slate-600 transition-colors hover:text-slate-950"
                >
                  <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-emerald-600" />
                  <span className="block font-medium text-slate-900 group-hover:text-emerald-700 transition-colors">Joypurhat, Bangladesh</span>
                </a>
                {siteSettings.phone_bd && (
                  <a
                    href={`tel:${siteSettings.phone_bd.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2.5 text-sm text-slate-500 hover:text-emerald-700 transition-colors pl-0.5"
                  >
                    <Phone className="h-[15px] w-[15px] shrink-0 text-emerald-500" />
                    <span className="font-mono text-[13px]">{siteSettings.phone_bd}</span>
                  </a>
                )}
              </div>
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
