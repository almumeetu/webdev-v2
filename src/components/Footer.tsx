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
      color: 'text-[#0A66C2] hover:border-sky-300 hover:bg-sky-50',
    },
    {
      key: 'github',
      href: siteSettings.socialLinks.github,
      label: 'GitHub',
      Icon: GithubIcon,
      color: 'text-slate-800 hover:border-slate-400 hover:bg-slate-100',
    },
    {
      key: 'twitter',
      href: siteSettings.socialLinks.twitter,
      label: 'Twitter / X',
      Icon: TwitterIcon,
      color: 'text-slate-800 hover:border-slate-400 hover:bg-slate-100',
    },
    {
      key: 'whatsapp',
      href: siteSettings.socialLinks.whatsapp_de?.trim() || siteSettings.socialLinks.whatsapp_bd,
      label: 'WhatsApp',
      Icon: WhatsAppIcon,
      color: 'text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50',
    },
  ].filter((link) => Boolean(link.href?.trim()));

  const quickLinks = lang === 'de'
    ? [
        { label: 'Dienstleistungen', view: 'services', Icon: HiOutlineCode },
        { label: 'Portfolio', view: 'portfolio', Icon: HiOutlineCollection },
        { label: 'Blog & News', view: 'blog', Icon: HiOutlineNewspaper },
        { label: 'Kontakt', view: 'contact', Icon: HiOutlineMail },
      ]
    : [
        { label: 'Services', view: 'services', Icon: HiOutlineCode },
        { label: 'Portfolio', view: 'portfolio', Icon: HiOutlineCollection },
        { label: 'Engineering Insights', view: 'blog', Icon: HiOutlineNewspaper },
        { label: 'Contact', view: 'contact', Icon: HiOutlineMail },
      ];

  const companyLinks = lang === 'de'
    ? [
        { label: 'Über uns', view: 'about', Icon: HiOutlineInformationCircle, badge: undefined },
        { label: 'Karriere', view: 'careers', Icon: HiOutlineBriefcase, badge: activeJobsCount > 0 ? 'Stellen' : undefined },
        { label: 'Datenschutz', view: 'privacy', Icon: HiOutlineShieldCheck, badge: undefined },
        { label: 'Nutzungsbedingungen', view: 'terms', Icon: HiOutlineDocumentText, badge: undefined },
      ]
    : [
        { label: 'About Us', view: 'about', Icon: HiOutlineInformationCircle, badge: undefined },
        { label: 'Careers', view: 'careers', Icon: HiOutlineBriefcase, badge: activeJobsCount > 0 ? 'Hiring' : undefined },
        { label: 'Privacy Policy', view: 'privacy', Icon: HiOutlineShieldCheck, badge: undefined },
        { label: 'Terms of Service', view: 'terms', Icon: HiOutlineDocumentText, badge: undefined },
      ];

  const locations = [
    {
      key: 'de',
      label: lang === 'de' ? 'Leverkusen, Deutschland' : 'Leverkusen, Germany',
      mapsHref: 'https://www.google.com/maps/search/?api=1&query=Leverkusen,+Germany',
      phone: siteSettings.phone_de,
    },
    {
      key: 'bd',
      label: lang === 'de' ? 'Joypurhat, Bangladesch' : 'Joypurhat, Bangladesh',
      mapsHref: 'https://www.google.com/maps/search/?api=1&query=Joypurhat,+Bangladesh',
      phone: siteSettings.phone_bd,
    },
  ];

  return (
    <footer className="site-footer-edge footer-simple-surface relative overflow-hidden border-t border-slate-200 text-slate-700">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.96), rgba(255,255,255,0.88) 55%, rgba(255,255,255,0.82)), url("/images/white bg-shape/bg-shpae-2.webp")',
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section aria-label={lang === 'de' ? 'In Verbindung bleiben' : 'Stay connected'} className="relative py-6 text-center sm:py-7">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5">
            {socialLinks.length > 0 && (
              <div className="flex w-full max-w-md flex-col items-center">
                <h2 id="footer-follow-heading" className="text-base font-semibold tracking-tight text-slate-900">
                  {lang === 'de' ? 'Folgen Sie uns' : 'Follow Us'}
                </h2>
                <div className="mt-3 flex w-full items-center gap-3 sm:gap-4">
                  <div aria-hidden="true" className="h-px min-w-0 flex-1 bg-gradient-to-r from-transparent to-sky-300" />
                  <nav aria-label={lang === 'de' ? 'Soziale Netzwerke' : 'Social links'} className="flex max-w-full shrink-0 flex-wrap items-center justify-center gap-2.5 sm:gap-4">
                    {socialLinks.map(({ key, href, label, Icon, color }) => (
                      <a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 ${color}`}
                      >
                        <span aria-hidden="true"><Icon className="h-[19px] w-[19px]" /></span>
                      </a>
                    ))}
                  </nav>
                  <div aria-hidden="true" className="h-px min-w-0 flex-1 bg-gradient-to-r from-sky-300 to-transparent" />
                </div>
              </div>
            )}
            <div className="w-full max-w-sm">
              <form
                onSubmit={handleNewsletterSubmit}
                aria-label={lang === 'de' ? 'Newsletter abonnieren' : 'Subscribe to our newsletter'}
                aria-busy={newsletterStatus === 'loading'}
                className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white p-1 transition-colors focus-within:border-sky-600 focus-within:ring-1 focus-within:ring-sky-600"
              >
                <Mail aria-hidden="true" className="ml-2.5 h-4 w-4 shrink-0 text-slate-500" />
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  {lang === 'de' ? 'E-Mail-Adresse für unseren Newsletter' : 'Email address for our newsletter'}
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
                  placeholder={lang === 'de' ? 'Newsletter abonnieren' : 'Subscribe to our newsletter'}
                  aria-describedby="footer-newsletter-status"
                  className="min-w-0 flex-1 bg-transparent py-2 text-base text-slate-800 placeholder:text-sm placeholder:text-slate-500 disabled:opacity-60 sm:text-sm"
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
              <p id="footer-newsletter-status" role="status" aria-live="polite" className={`text-xs leading-relaxed ${newsletterStatus === 'success' || newsletterStatus === 'error' ? 'mt-2' : ''} ${newsletterStatus === 'error' ? 'text-rose-600' : 'text-emerald-700'}`}>
                {newsletterStatus === 'success'
                  ? (lang === 'de' ? 'Vielen Dank! Ihre Newsletter-Anfrage ist eingegangen.' : 'Thank you! Your subscription request has been received.')
                  : newsletterStatus === 'error'
                    ? (lang === 'de' ? 'Das hat nicht geklappt. Bitte versuchen Sie es erneut.' : 'We couldn’t save your request. Please try again.')
                    : null}
              </p>
            </div>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-slate-200" />
        </section>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-9 sm:gap-x-10 lg:grid-cols-4 lg:py-10">
          <section className="col-span-2 flex min-w-0 flex-col items-start gap-4 lg:col-span-1">
            <button
              type="button"
              onClick={() => router.push('/')}
              aria-label={siteSettings.companyName}
              className="footer-nav-link inline-flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
            >
              {(siteSettings.logoUrl || siteSettings.darkLogoUrl) ? (
                <img
                  src={siteSettings.logoUrl || '/images/logo/webdev-logo.png'}
                  alt={`${siteSettings.companyName} Logo`}
                  className="h-11 w-auto object-contain sm:h-12"
                />
              ) : (
                <span className="text-lg font-semibold tracking-tight text-slate-900">
                  {siteSettings.companyName || 'WebDev'}
                </span>
              )}
            </button>
            <p className="max-w-md text-sm leading-7 text-slate-600">
              {lang === 'de'
                ? t.footerAboutText
                : (siteSettings.footerAboutText ||
                  'Building resilient web platforms, scalable cloud systems, and digital products for growing businesses worldwide.')}
            </p>
          </section>

          <section className="flex min-w-0 flex-col items-start gap-4 lg:pt-1">
            <h2 className="text-base font-semibold text-slate-900">
              {lang === 'de' ? 'Entdecken' : 'Explore'}
            </h2>
            <ul className="flex w-full flex-col gap-1">
              {quickLinks.map(({ label, view, Icon }) => (
                <li key={view}>
                  <button
                    type="button"
                    onClick={() => onNavigate(view)}
                    className="footer-nav-link group inline-flex min-h-10 w-full items-center gap-2.5 py-1 text-left text-sm text-slate-700 transition-colors hover:text-sky-700"
                  >
                    <Icon aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-sky-600" />
                    <span className="min-w-0 flex-1 break-words hyphens-auto">{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex min-w-0 flex-col items-start gap-4 lg:pt-1">
            <h2 className="text-base font-semibold text-slate-900">
              {lang === 'de' ? 'Unternehmen' : 'Company'}
            </h2>
            <ul className="flex w-full flex-col gap-1">
              {companyLinks.map(({ label, view, badge, Icon }) => (
                <li key={view}>
                  <button
                    type="button"
                    onClick={() => onNavigate(view)}
                    className="footer-nav-link group inline-flex min-h-10 w-full items-center gap-2.5 py-1 text-left text-sm text-slate-700 transition-colors hover:text-sky-700"
                  >
                    <Icon aria-hidden="true" className="h-[18px] w-[18px] shrink-0 text-sky-600" />
                    <span className="min-w-0 flex-1 break-words hyphens-auto">{label}</span>
                    {badge && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200/70">{badge}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="col-span-2 flex min-w-0 flex-col items-start gap-4 lg:col-span-1 lg:pt-1">
            <h2 className="text-base font-semibold text-slate-900">
              {lang === 'de' ? 'Standorte' : 'Locations'}
            </h2>
            <div className="grid w-full grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-1">
              {locations.map(({ key, label, mapsHref, phone }) => (
                <div key={key} className="flex min-w-0 items-start gap-2.5">
                  <span aria-hidden="true" className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-sky-600">
                    <MapPin className="h-[18px] w-[18px]" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                    <a
                      href={mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium leading-6 text-slate-900 transition-colors hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                    >
                      {label}
                    </a>
                    {phone && (
                      <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-start gap-1.5 text-slate-600 transition-colors hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                      >
                        <Phone aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        <span className="min-w-0 break-words text-sm leading-6">{phone}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-3 border-t border-slate-200/80 py-4 lg:grid-cols-[1fr_auto_auto]">
          <p className="col-span-2 min-w-0 text-xs leading-relaxed text-slate-600 lg:col-span-1">
            © {currentYear} <span className="font-medium text-slate-700">{siteSettings.companyName}</span>.{' '}
            {lang === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
          </p>
          <nav aria-label={lang === 'de' ? 'Rechtliche Informationen' : 'Legal and administration'} className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <button type="button" onClick={() => onNavigate('privacy')} className="footer-nav-link min-h-8 text-xs text-slate-600 transition-colors hover:text-sky-700">
              {t.footerPrivacy}
            </button>
            <button type="button" onClick={() => onNavigate('terms')} className="footer-nav-link min-h-8 text-xs text-slate-600 transition-colors hover:text-sky-700">
              {t.footerTerms}
            </button>
            <button type="button" onClick={() => onNavigate('contact')} className="footer-nav-link min-h-8 text-xs text-slate-600 transition-colors hover:text-sky-700">
              {lang === 'de' ? 'Sicherheit & NDA' : 'Security & NDA'}
            </button>
            <button
              id="footer-admin-link"
              type="button"
              onClick={() => onNavigate('admin')}
              className="footer-nav-link inline-flex min-h-8 items-center gap-1.5 text-xs text-slate-600 transition-colors hover:text-sky-700"
              title={lang === 'de' ? 'Administrator-Portal' : 'Administrator Portal'}
            >
              <Lock className="h-3 w-3" />
              <span>Admin</span>
            </button>
          </nav>
          <button
            type="button"
            onClick={scrollToTop}
            className="footer-to-top group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-600 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
            title={lang === 'de' ? 'Nach oben scrollen' : 'Back to Top'}
            aria-label={lang === 'de' ? 'Nach oben scrollen' : 'Back to Top'}
          >
            <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
