'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronDown, Code2, Cpu, Globe, Server, ShoppingCart, Smartphone } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

const serviceGroups = [
  { id: 'serv-1', Icon: Code2, en: 'Full-Stack & Web Apps', de: 'Full-Stack & Web-Apps',
    items: [
      { id: 'serv-1', en: 'React & Next.js Development', de: 'React- & Next.js-Entwicklung' },
      { id: 'serv-1', en: 'MERN Stack Applications', de: 'MERN-Stack-Anwendungen' },
      { id: 'serv-1', en: 'SaaS & Business Platforms', de: 'SaaS- & Business-Plattformen' },
      { id: 'serv-1', en: 'Progressive Web Apps', de: 'Progressive Web Apps' },
    ] },
  { id: 'serv-6', Icon: Smartphone, en: 'Mobile App Development', de: 'Mobile App Entwicklung',
    items: [
      { id: 'serv-6', en: 'Android App Development', de: 'Android-App-Entwicklung' },
      { id: 'serv-6', en: 'iOS App Development', de: 'iOS-App-Entwicklung' },
      { id: 'serv-6', en: 'Flutter Development', de: 'Flutter-Entwicklung' },
      { id: 'serv-6', en: 'React Native Development', de: 'React-Native-Entwicklung' },
      { id: 'serv-6', en: 'Native Android with Kotlin', de: 'Native Android-Apps mit Kotlin' },
    ] },
  { id: 'serv-2', Icon: Server, en: 'Cloud & Infrastructure', de: 'Cloud & Infrastruktur',
    items: [
      { id: 'serv-2', en: 'Linux Servers & Cloud Hosting', de: 'Linux-Server & Cloud-Hosting' },
      { id: 'serv-2', en: 'Docker & Kubernetes', de: 'Docker & Kubernetes' },
      { id: 'serv-2', en: 'DevOps & CI/CD Pipelines', de: 'DevOps & CI/CD-Pipelines' },
      { id: 'serv-2', en: 'Monitoring & Maintenance', de: 'Monitoring & Wartung' },
    ] },
  { id: 'serv-3', Icon: ShoppingCart, en: 'Headless E-Commerce', de: 'Headless E-Commerce',
    items: [
      { id: 'serv-3', en: 'Shopify Storefronts', de: 'Shopify-Storefronts' },
      { id: 'serv-3', en: 'WooCommerce Development', de: 'WooCommerce-Entwicklung' },
      { id: 'serv-3', en: 'Payment Integrations', de: 'Zahlungsintegrationen' },
      { id: 'serv-3', en: 'B2B Commerce & ERP Sync', de: 'B2B-Commerce & ERP-Sync' },
    ] },
  { id: 'serv-4', Icon: Globe, en: 'CMS & WordPress', de: 'CMS & WordPress',
    items: [
      { id: 'serv-4', en: 'Custom Themes & Plugins', de: 'Individuelle Themes & Plugins' },
      { id: 'serv-4', en: 'Headless CMS Platforms', de: 'Headless-CMS-Plattformen' },
      { id: 'serv-4', en: 'Performance & Core Web Vitals', de: 'Performance & Core Web Vitals' },
      { id: 'serv-4', en: 'Corporate Websites & Portals', de: 'Unternehmenswebsites & Portale' },
    ] },
  { id: 'serv-5', Icon: Cpu, en: 'APIs & Microservices', de: 'APIs & Microservices',
    items: [
      { id: 'serv-5', en: 'REST & GraphQL APIs', de: 'REST- & GraphQL-APIs' },
      { id: 'serv-5', en: 'Mobile App Backends', de: 'Backends für mobile Apps' },
      { id: 'serv-5', en: 'Real-Time Integrations', de: 'Echtzeit-Integrationen' },
      { id: 'serv-5', en: 'Authentication & Data Security', de: 'Authentifizierung & Datensicherheit' },
    ] },
];

const deliverySteps = [['Scope', 'Analyse'], ['Sprints', 'Sprints'], ['Quality', 'Qualität'], ['Deploy', 'Rollout'], ['Handover', 'Übergabe']];

export function ServicesMenu({ mobile = false, active = false, onNavigate }: {
  mobile?: boolean;
  active?: boolean;
  onNavigate?: () => void;
}) {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [menuTop, setMenuTop] = useState<number>(64);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = mobile ? 'mobile-services-menu' : 'services-mega-menu';
  const locale = lang === 'de' ? 1 : 0;

  // Dynamically position mega menu directly below the bottom edge of #main-header
  useEffect(() => {
    if (!open || mobile) return;
    const updatePosition = () => {
      const header = document.getElementById('main-header');
      if (header) {
        const bottom = header.getBoundingClientRect().bottom;
        setMenuTop(Math.max(bottom, 0));
      }
    };
    updatePosition();
    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, mobile]);

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
      onPointerEnter={(event) => {
        if (!mobile && event.pointerType === 'mouse') {
          clearCloseTimer();
          setOpen(true);
        }
      }}
      onPointerLeave={(event) => {
        if (!mobile && event.pointerType === 'mouse' && !rootRef.current?.contains(document.activeElement)) {
          clearCloseTimer();
          closeTimer.current = setTimeout(() => setOpen(false), 160);
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
        id={mobile ? 'mobile-nav-services' : 'nav-services'}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => { clearCloseTimer(); setOpen(!open); }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            clearCloseTimer();
            setOpen(true);
            requestAnimationFrame(() => panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus());
          }
        }}
        className={`${mobile ? 'navbar-mobile-nav-link flex min-h-11 w-full justify-between px-4 py-2.5 text-[15px]' : 'navbar-nav-link inline-flex px-3 py-1.5 text-[14.5px]'} items-center gap-1.5 text-left cursor-pointer ${active || open ? 'font-semibold text-sky-700' : 'text-slate-600 hover:text-sky-700'}`}
      >
        {t.navServices}
        <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        style={!mobile ? { top: `${menuTop}px` } : undefined}
        className={mobile ? 'px-3 pb-3' : 'fixed left-0 right-0 z-50 pt-0'}
      >
        <div className={mobile ? 'rounded-2xl border border-slate-100 bg-white p-3' : 'w-full border-b border-slate-200/80 bg-white shadow-[0_16px_48px_-12px_rgba(15,23,42,0.18)]'}>
          {/* Desktop mega menu inner container */}
          {!mobile && (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Header row */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 py-3.5">
                <p className="text-[14.5px] font-semibold text-slate-900">{locale ? 'Services & Fachbereiche' : 'Services & Capabilities'}</p>
                <Link href="/services" onNavigate={navigate} className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-sky-700 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500">
                  {locale ? 'Alle Services' : 'View all services'}<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
              {/* Service groups grid */}
              <div className="grid grid-cols-6 gap-x-6 gap-y-0 py-6">
                {serviceGroups.map(({ id, Icon, en, de, items }) => (
                  <section key={id} className="min-w-0">
                    <h2>
                      <Link href={`/services/${id}`} onClick={navigate} className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-sky-500 mb-2">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="text-[13.5px] font-semibold leading-snug text-slate-900">{locale ? de : en}</span>
                      </Link>
                    </h2>
                    <ul className="space-y-0.5">
                      {items.map((item, idx) => (
                        <li key={idx}>
                          <Link href={`/services/${item.id}`} onClick={navigate} className="group flex items-center justify-between gap-1.5 rounded-lg px-2 py-1.5 text-[13.5px] leading-snug text-slate-600 transition-colors hover:bg-sky-50/60 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-sky-500">
                            <span>{locale ? item.de : item.en}</span>
                            <ArrowUpRight aria-hidden="true" className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
              {/* Delivery process footer */}
              <div className="flex items-center gap-8 border-t border-slate-100 bg-slate-50/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3">
                <span className="shrink-0 text-xs font-semibold text-slate-700">{locale ? 'Unser Ablauf' : 'Delivery process'}</span>
                <ol className="grid flex-1 grid-cols-5 gap-3">
                  {deliverySteps.map((step, index) => (
                    <li key={step[0]} className="flex items-center gap-2 text-[11px] text-slate-600">
                      <span className="font-mono text-sky-600">0{index + 1}</span>
                      {step[locale]}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* Mobile accordion view */}
          {mobile && (
            <div className="divide-y divide-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
                <p className="text-sm font-semibold text-slate-900">{locale ? 'Services & Fachbereiche' : 'Services & capabilities'}</p>
                <Link href="/services" onNavigate={navigate} className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900">
                  {locale ? 'Alle Services' : 'View all'}<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
              {serviceGroups.map(({ id, Icon, en, de, items }) => (
                <details key={id} className="group py-3">
                  <summary className="flex cursor-pointer list-none items-center gap-2.5 [&::-webkit-details-marker]:hidden">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600"><Icon className="h-4 w-4" aria-hidden="true" /></span>
                    <span className="text-[14px] font-semibold leading-snug text-slate-900">{locale ? de : en}</span>
                    <ChevronDown className="ml-auto h-3.5 w-3.5 shrink-0 text-slate-400 group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className="mt-2 space-y-0.5">
                    {items.map((item, idx) => (
                      <li key={idx}>
                        <Link href={`/services/${item.id}`} onClick={navigate} className="group flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-[13.5px] leading-snug text-slate-600 transition-colors hover:bg-sky-50/60 hover:text-sky-700">
                          <span>{locale ? item.de : item.en}</span><ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
