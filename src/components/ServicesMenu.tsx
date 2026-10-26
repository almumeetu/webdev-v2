'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronDown, Code2, Cpu, Globe, Server, ShoppingCart, Smartphone, Palette, Megaphone, Search, Bot, ShieldCheck, PenTool } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

const serviceGroups = [
  // Row 1 (Core Software & Intelligent Platforms)
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
    ]
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
    ]
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
    ]
  },
  {
    id: 'serv-10',
    Icon: Bot,
    en: 'AI & Process Automation',
    de: 'KI & Prozessautomation',
    items: [
      { id: 'serv-10', en: 'OpenAI & Claude LLM Integration', de: 'OpenAI & Claude LLM Integration' },
      { id: 'serv-10', en: 'RAG Vector Knowledge Bases', de: 'RAG Vektor-Wissensdatenbanken' },
      { id: 'serv-5', en: 'APIs & Microservices Backend', de: 'APIs & Microservices Backend' },
    ]
  },

  // Row 2 (Creative Design & Digital Growth)
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
    ]
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
    ]
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
    ]
  },
];

const deliverySteps = [['Scope', 'Analyse'], ['Sprints', 'Sprints'], ['Quality', 'Qualität'], ['Deploy', 'Rollout'], ['Handover', 'Übergabe']];

export function ServicesMenu({ mobile = false, active = false, onNavigate }: {
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

  const { services } = useAppContext();

  // Combine base serviceGroups with any extra custom-added services
  const displayedServiceGroups = useMemo(() => {
    const defaultIds = new Set([
      'serv-1', 'serv-2', 'serv-3', 'serv-4', 'serv-5', 'serv-6',
      'serv-7', 'serv-8', 'serv-9', 'serv-10', 'serv-11', 'serv-12'
    ]);
    const extraServices = (services || []).filter((s) => !defaultIds.has(s.id));

    if (!extraServices.length) return serviceGroups;

    const extraGroups = extraServices.map((s) => ({
      id: s.id,
      Icon: Globe,
      en: s.title,
      de: s.title,
      items: (s.features || s.techs || []).slice(0, 3).map((f) => ({
        id: s.id,
        en: f,
        de: f,
      })),
    }));

    return [...serviceGroups, ...extraGroups];
  }, [services]);

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
        onPointerEnter={clearCloseTimer}
        className={
          mobile
            ? 'px-3 pb-3'
            : 'absolute inset-x-0 top-full z-50 pt-0 before:absolute before:-top-3 before:inset-x-0 before:h-3 before:content-[\'\']'
        }
      >
        <div className={mobile ? 'rounded-2xl border border-slate-100 bg-white p-3' : 'w-full border-b border-slate-200/80 bg-white shadow-[0_16px_48px_-12px_rgba(15,23,42,0.18)]'}>
          {/* Desktop mega menu inner container */}
          {!mobile && (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Header row */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 py-3.5">
                <p className="text-[14.5px] font-semibold text-slate-900">{locale ? 'Services & Fachbereiche' : 'Services & Capabilities'}</p>
                <Link href="/services" onClick={navigate} className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-sky-700 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500">
                  {locale ? 'Alle Services' : 'View all services'}<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
              {/* Service groups 4-column grid (Row 1: 4 columns, Row 2: 3 columns = exactly 7 services) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-10 gap-y-7 py-6">
                {displayedServiceGroups.map(({ id, Icon, en, de, items }) => (
                  <section key={id} className="min-w-0">
                    <h2>
                      <Link
                        href={`/services/${id}`}
                        onClick={navigate}
                        className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-sky-500 mb-2 transition-colors"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-100 group-hover:text-sky-700 transition-colors">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="text-[14px] font-semibold leading-snug text-slate-900 group-hover:text-sky-700 transition-colors whitespace-nowrap">
                          {locale ? de : en}
                        </span>
                      </Link>
                    </h2>
                    <ul className="space-y-0.5">
                      {items.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            href={`/services/${item.id}`}
                            onClick={navigate}
                            className="group flex items-center justify-between gap-1.5 rounded-lg px-2 py-1.5 text-[13.5px] leading-snug text-slate-600 transition-colors hover:bg-sky-50/60 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-sky-500"
                          >
                            <span className="truncate">{locale ? item.de : item.en}</span>
                            <ArrowUpRight aria-hidden="true" className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 text-sky-600" />
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
                <Link href="/services" onClick={navigate} className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900">
                  {locale ? 'Alle Services' : 'View all'}<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
              {displayedServiceGroups.map(({ id, Icon, en, de, items }) => (
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
