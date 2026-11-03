'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChevronDown,
  Code2,
  HeartPulse,
  Megaphone,
  Palette,
  Search,
  ShoppingCart,
  Smartphone,
  UtensilsCrossed,
  Bot,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface ServiceGroupItem {
  id: string;
  Icon: React.ElementType;
  en: string;
  de: string;
  featured?: boolean;
  badgeEn?: string;
  badgeDe?: string;
  items: Array<{
    id: string;
    en: string;
    de: string;
  }>;
}

const serviceGroups: ServiceGroupItem[] = [
  // 1. High-Priority Industry Solutions (Specialized & Healthcare Focus - FIRST & HIGHLIGHTED)
  {
    id: 'serv-13',
    Icon: HeartPulse,
    featured: true,
    badgeEn: 'Specialized Focus',
    badgeDe: 'Fokus-Bereich',
    en: 'Medical Website Design',
    de: 'Medizinisches Webdesign',
    items: [
      { id: 'serv-13', en: 'Doctor & Specialist Profiles', de: 'Arzt- & Facharztprofile' },
      { id: 'serv-13', en: 'Practice, Clinic & Hospital Websites', de: 'Praxis-, Klinik- & Krankenhaus-Websites' },
      { id: 'serv-13', en: 'Medical Chamber & Institution Portals', de: 'Ärztekammer- & Institutionsportale' },
      { id: 'serv-13', en: 'International Patient Journeys', de: 'Internationale Patientenwege' },
    ],
  },
  {
    id: 'serv-14',
    Icon: Building2,
    featured: true,
    badgeEn: 'German KMU',
    badgeDe: 'Deutsche KMU',
    en: 'Business & Corporate Websites',
    de: 'Business & Corporate (KMU)',
    items: [
      { id: 'serv-14', en: 'Professional Corporate Design & Branding', de: 'Professionelles Corporate Design & Branding' },
      { id: 'serv-14', en: 'Local SEO for German Google Rankings', de: 'Lokale SEO für Google-Rankings in DE' },
      { id: 'serv-14', en: 'GDPR Contact Forms & Cookie Banners', de: 'DSGVO-Kontaktformulare & Cookie-Banner' },
    ],
  },
  {
    id: 'serv-15',
    Icon: UtensilsCrossed,
    en: 'Restaurant & Hospitality Websites',
    de: 'Gastronomie- & Hotel-Websites',
    items: [
      { id: 'serv-15', en: 'Online Reservations & Booking Calendars', de: 'Online-Reservierung & Buchungskalender' },
      { id: 'serv-15', en: 'Digital Menus with PDF & Web View', de: 'Digitale Speisekarte mit PDF & Webansicht' },
      { id: 'serv-15', en: 'Photo Gallery & Instagram Integration', de: 'Fotogalerie & Instagram-Integration' },
    ],
  },
  {
    id: 'serv-10',
    Icon: Bot,
    en: 'AI Solutions & Automation',
    de: 'KI-Lösungen & Automation',
    items: [
      { id: 'serv-10', en: 'AI Assistants for Customer & Team Workflows', de: 'KI-Assistenten für Kunden- & Teamprozesse' },
      { id: 'serv-10', en: 'Secure RAG Knowledge Systems', de: 'Sichere RAG-Wissenssysteme' },
      { id: 'serv-10', en: 'Document Processing & API Automation', de: 'Dokumentenverarbeitung & API-Automation' },
    ],
  },

  // 2. Core Engineering & Digital Growth Platforms
  {
    id: 'serv-1',
    Icon: Code2,
    en: 'Full-Stack & Web Apps',
    de: 'Full-Stack & Web-Apps',
    items: [
      { id: 'serv-1', en: 'Single Page Applications (SPA)', de: 'Single Page Applications (SPA)' },
      { id: 'serv-1', en: 'SaaS Platforms & Projects', de: 'SaaS-Plattformen & Web-Projekte' },
      { id: 'serv-1', en: 'React & Next.js Platforms', de: 'React- & Next.js-Entwicklung' },
      { id: 'serv-2', en: 'Linux Cloud & DevOps Hosting', de: 'Linux-Server & Cloud-DevOps' },
    ],
  },
  {
    id: 'serv-3',
    Icon: ShoppingCart,
    en: 'Headless E-Commerce',
    de: 'Headless E-Commerce',
    items: [
      { id: 'serv-3', en: 'E-Commerce Landing Pages', de: 'E-Commerce Landing-Pages' },
      { id: 'serv-3', en: 'Custom Shopify Plus Stores', de: 'Shopify Plus & Storefronts' },
      { id: 'serv-3', en: 'WooCommerce & Multi-Currency', de: 'WooCommerce & Multi-Währung' },
      { id: 'serv-4', en: 'Enterprise WordPress & CMS', de: 'WordPress & Headless CMS' },
    ],
  },
  {
    id: 'serv-6',
    Icon: Smartphone,
    en: 'Mobile App Engineering',
    de: 'Mobile App Entwicklung',
    items: [
      { id: 'serv-6', en: 'iOS & Android Native Apps', de: 'iOS- & Android-Entwicklung' },
      { id: 'serv-6', en: 'Flutter Cross-Platform', de: 'Flutter Cross-Platform' },
      { id: 'serv-6', en: 'React Native Mobile Suites', de: 'React-Native-Entwicklung' },
    ],
  },
  {
    id: 'serv-7',
    Icon: Palette,
    en: 'UI/UX & Brand Design',
    de: 'UI/UX & Brand Design',
    items: [
      { id: 'serv-7', en: 'Portfolio & Website Design', de: 'Portfolio- & Website-Design' },
      { id: 'serv-7', en: 'Figma Design Systems & Kits', de: 'Figma Design-Systeme & Kits' },
      { id: 'serv-7', en: 'Clickable Interactive Prototypes', de: 'Interaktive Klick-Prototypen' },
      { id: 'serv-12', en: 'Brand Identity & Guidelines', de: 'Brand Identity & Guidelines' },
    ],
  },
  {
    id: 'serv-9',
    Icon: Search,
    en: 'SEO & Growth Marketing',
    de: 'SEO & Growth Marketing',
    items: [
      { id: 'serv-9', en: 'Technical SEO Audits & Speed', de: 'Technische SEO-Audits & Speed' },
      { id: 'serv-9', en: 'Google Search Dominance', de: 'Google Keyword-Optimierung' },
      { id: 'serv-9', en: 'Conversion Rate Optimization', de: 'Conversion Rate Optimization' },
    ],
  },
  {
    id: 'serv-8',
    Icon: Megaphone,
    en: 'Meta Ads & Paid Social',
    de: 'Meta Ads & Paid Social',
    items: [
      { id: 'serv-8', en: 'Facebook & Instagram Ads', de: 'Facebook & Instagram Ads' },
      { id: 'serv-8', en: 'Conversions API (CAPI) Setup', de: 'Server-Side CAPI Tracking' },
      { id: 'serv-8', en: 'High-ROI Retargeting Funnels', de: 'Retargeting & ROI-Funnels' },
    ],
  },
];

const megaMenuServiceGroups = serviceGroups.slice(0, 8);

export function ServicesMenu({
  mobile = false,
  active = false,
  onNavigate,
}: {
  mobile?: boolean;
  active?: boolean;
  onNavigate?: () => void;
}) {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = mobile ? 'mobile-services-menu' : 'services-mega-menu';
  const locale = lang === 'de' ? 1 : 0;

  const clearCloseTimer = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const close = () => {
    clearCloseTimer();
    setOpen(false);
  };

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (!open) return;
    const outsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', outsideClick);
    return () => document.removeEventListener('pointerdown', outsideClick);
  }, [open]);

  const navigate = () => {
    close();
    onNavigate?.();
  };

  return (
    <div
      ref={rootRef}
      className="static"
      onPointerEnter={(event) => {
        if (!mobile && event.pointerType === 'mouse') {
          clearCloseTimer();
          setOpen(true);
        }
      }}
      onPointerLeave={(event) => {
        if (!mobile && event.pointerType === 'mouse' && !rootRef.current?.contains(document.activeElement)) {
          clearCloseTimer();
          closeTimer.current = setTimeout(() => setOpen(false), 220);
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          event.stopPropagation();
          close();
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        data-clean-hover
        id={mobile ? 'mobile-nav-services' : 'nav-services'}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          clearCloseTimer();
          setOpen(!open);
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            clearCloseTimer();
            setOpen(true);
            requestAnimationFrame(() => panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus());
          }
        }}
        className={`${
          mobile
            ? 'navbar-mobile-nav-link flex min-h-11 w-full justify-between px-4 py-2.5 text-[15px]'
            : 'navbar-nav-link inline-flex px-3 py-1.5 text-[14.5px]'
        } items-center gap-1.5 text-left cursor-pointer ${
          active || open ? 'font-semibold text-[#0284c7]' : 'text-slate-600 hover:text-[#0284c7]'
        }`}
      >
        {t.navServices}
        <ChevronDown
          aria-hidden="true"
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        onPointerEnter={clearCloseTimer}
        className={
          mobile
            ? 'px-3 pb-3'
            : "absolute inset-x-0 top-full z-50 pt-0 before:absolute before:-top-3 before:inset-x-0 before:h-3 before:content-['']"
        }
      >
        <div
          className={
            mobile
              ? 'rounded-2xl border border-slate-100 bg-white p-3'
              : 'w-full border-b border-slate-200/80 bg-white shadow-[0_16px_48px_-12px_rgba(15,23,42,0.18)]'
          }
        >
          {/* Desktop mega menu inner container */}
          {!mobile && (
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
              {/* Header row */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0284c7]">
                  {locale ? 'Unsere Leistungen' : 'Our services'}
                </p>
                <Link
                  href="/services"
                  onClick={navigate}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0284c7] transition-colors hover:text-[#0369a1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0284c7]"
                >
                  {locale ? 'Alle Services ansehen' : 'View all services'}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>

              {/* Reference-style, borderless service columns. */}
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-7 sm:grid-cols-2 lg:grid-cols-5">
                {megaMenuServiceGroups.map(({ id, Icon, en, de, items }) => {
                  return (
                    <section key={id} className="min-w-0">
                      <div className="mb-3 flex items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#9cd5e2] bg-[#BBE7F1]/35 text-[#0284c7]">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <h2 className="min-w-0 text-[14px] font-semibold leading-tight text-slate-900">
                          <Link
                            href={`/services/${id}`}
                            onClick={navigate}
                            className="transition-colors hover:text-[#0284c7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0284c7]"
                          >
                            {locale ? de : en}
                          </Link>
                        </h2>
                      </div>

                      <ul className="space-y-1">
                        {items.map((item, idx) => (
                          <li key={idx}>
                            <Link
                              href={`/services/${item.id}`}
                              onClick={navigate}
                              className="group flex items-start gap-2 rounded-md text-[13px] leading-snug text-slate-500 transition-colors hover:text-[#0284c7] focus-visible:outline-2 focus-visible:outline-[#0284c7]"
                            >
                              <ArrowUpRight
                                aria-hidden="true"
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400 transition-colors group-hover:text-[#0284c7]"
                              />
                              <span>{locale ? item.de : item.en}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/70 -mx-5 px-5 py-4 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0284c7]">
                    {locale ? 'Kompetenz, die Wirkung zeigt' : 'Expertise that moves business'}
                  </p>
                  <p className="mt-1 text-[13px] text-slate-600">
                    {locale ? 'Von der Idee bis zum zuverlässigen Produkt.' : 'From first idea to a dependable product.'}
                  </p>
                </div>
                <Link
                  href="/contact"
                  onClick={navigate}
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#9cd5e2] bg-[#BBE7F1] px-4 py-2 text-[12px] font-semibold text-slate-950 transition-colors hover:bg-[#a7dfed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0284c7]"
                >
                  {locale ? 'Projekt starten' : 'Start a project'}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}

          {/* Mobile accordion view */}
          {mobile && (
            <div className="divide-y divide-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
                <p className="text-sm font-semibold text-slate-900">
                  {locale ? 'Services & Fachbereiche' : 'Services & capabilities'}
                </p>
                <Link
                  href="/services"
                  onClick={navigate}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284c7] hover:text-[#0369a1]"
                >
                  {locale ? 'Alle Services' : 'View all'}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
              {megaMenuServiceGroups.map(({ id, Icon, en, de, items, featured, badgeEn, badgeDe }) => {
                const isMedical = id === 'serv-13';

                return (
                  <details key={id} className={`group py-3 ${isMedical ? 'rounded-xl bg-[#BBE7F1]/20 px-2' : ''}`}>
                    <summary className="flex cursor-pointer list-none items-center gap-2.5 [&::-webkit-details-marker]:hidden">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                          isMedical
                            ? 'border border-[#9cd5e2] bg-[#BBE7F1] text-slate-950'
                            : 'border border-[#9cd5e2] bg-[#BBE7F1]/35 text-[#0284c7]'
                        }`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[14px] font-semibold leading-snug text-slate-900">
                          {locale ? de : en}
                        </span>
                        {featured && (
                          <span
                            className={`inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                              isMedical
                                ? 'border border-[#9cd5e2] bg-[#BBE7F1] text-slate-950'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {locale ? badgeDe : badgeEn}
                          </span>
                        )}
                      </div>
                      <ChevronDown
                        className="ml-auto h-3.5 w-3.5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform"
                        aria-hidden="true"
                      />
                    </summary>
                    <ul className="mt-2 space-y-0.5 pl-10">
                      {items.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            href={`/services/${item.id}`}
                            onClick={navigate}
                            className="group flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-[13.5px] leading-snug text-slate-600 transition-colors hover:bg-[#BBE7F1]/35 hover:text-[#0284c7]"
                          >
                            <span>{locale ? item.de : item.en}</span>
                            <ArrowUpRight
                              aria-hidden="true"
                              className="h-3.5 w-3.5 shrink-0 text-[#0284c7] opacity-0 transition-opacity group-hover:opacity-100"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
