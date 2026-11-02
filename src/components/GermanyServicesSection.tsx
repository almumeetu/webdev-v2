'use client';

import React, { useRef } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { RiHospitalLine, RiBuildingLine, RiRestaurantLine, RiShieldCheckLine } from 'react-icons/ri';
import { useLanguage } from '../context/LanguageContext';
import { gsap, useGsapContext } from '../utils/gsapHelper';

interface GermanyServicesSectionProps {
  onContactClick?: () => void;
  onSelectService?: (serviceId: string) => void;
}

export const GermanyServicesSection: React.FC<GermanyServicesSectionProps> = ({
  onContactClick,
  onSelectService,
}) => {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    gsap.fromTo(
      '.de-serv-item',
      { opacity: 0, y: isMobile ? 10 : 28 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.35 : 0.65,
        stagger: isMobile ? 0.05 : 0.1,
        ease: isMobile ? 'power1.out' : 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 94%' : 'top 80%',
          once: true,
        },
        clearProps: 'transform,opacity',
      }
    );
  });

  const industries = [
    {
      id: 'serv-13',
      icon: RiHospitalLine,
      color: 'text-rose-600',
      bg: 'bg-rose-50 border-rose-200',
      accentBar: 'from-rose-400 to-rose-600',
      badge: lang === 'de' ? '🏥 Gesundheit' : '🏥 Healthcare',
      title: lang === 'de' ? 'Arztpraxis & Klinik-Websites' : 'Doctor & Clinic Websites',
      desc: lang === 'de'
        ? 'Professionelle, DSGVO-konforme Praxiswebsites mit Online-Terminbuchung, Doctolib-Integration und barrierefreiem Design — für Arztpraxen, Zahnarztpraxen, Kliniken und Krankenhäuser.'
        : 'GDPR-compliant medical websites with online appointment booking, Doctolib integration, and accessible design — for GP practices, dental clinics, specialist clinics, and hospitals.',
      bullets: lang === 'de'
        ? ['Online-Terminbuchung (Doctolib, Calendly)', 'DSGVO-konformes Patientenportal', 'Barrierefreiheit WCAG 2.1', 'Lokale SEO für Google Maps']
        : ['Online appointment booking (Doctolib, Calendly)', 'GDPR-compliant patient portal', 'Accessibility WCAG 2.1', 'Local SEO for Google Maps'],
    },
    {
      id: 'serv-14',
      icon: RiBuildingLine,
      color: 'text-sky-700',
      bg: 'bg-sky-50 border-sky-200',
      accentBar: 'from-sky-400 to-sky-700',
      badge: lang === 'de' ? '🏢 KMU & Business' : '🏢 SME & Business',
      title: lang === 'de' ? 'Business & Corporate Websites' : 'Business & Corporate Websites',
      desc: lang === 'de'
        ? 'Moderne Unternehmenswebsites für Handwerksbetriebe, Kanzleien, Beratungsunternehmen und lokale Dienstleister — mobiloptimiert, schnell und bei Google gefunden.'
        : 'Modern business websites for trades, law firms, consulting agencies, and local service providers — mobile-optimized, lightning fast, and ranking on Google.',
      bullets: lang === 'de'
        ? ['Lokale Google-SEO für NRW & ganz DE', 'DSGVO-Paket (Impressum, Cookie)', 'Google My Business Optimierung', 'Modernes Corporate Design']
        : ['Local Google SEO for all of Germany', 'GDPR package (imprint, cookie banner)', 'Google My Business optimization', 'Professional corporate design'],
    },
    {
      id: 'serv-15',
      icon: RiRestaurantLine,
      color: 'text-amber-700',
      bg: 'bg-amber-50 border-amber-200',
      accentBar: 'from-amber-400 to-amber-700',
      badge: lang === 'de' ? '🍽️ Gastronomie' : '🍽️ Hospitality',
      title: lang === 'de' ? 'Restaurant & Hotel-Websites' : 'Restaurant & Hotel Websites',
      desc: lang === 'de'
        ? 'Ansprechende Websites für Restaurants, Hotels, Cafés und Gaststätten — mit Online-Reservierung, digitaler Speisekarte und direkter Buchung ohne teure Provisionen.'
        : 'Beautiful websites for restaurants, hotels, cafés, and eateries — with online reservations, digital menus, and direct bookings without expensive platform commissions.',
      bullets: lang === 'de'
        ? ['Online-Tischreservierung & Kalender', 'Digitale Speisekarte (DE/EN)', 'Instagram-Feed-Integration', 'Google Maps & Bewertungen']
        : ['Online table reservations & calendar', 'Digital menu (DE/EN)', 'Instagram feed integration', 'Google Maps & reviews'],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-200/80 overflow-hidden"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_50%_at_50%_100%,rgba(187,231,241,0.12),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="de-serv-item text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase px-3.5 py-1.5 rounded-full bg-[#BBE7F1]/60 border border-[#9cd5e2] text-slate-800">
            🇩🇪 {lang === 'de' ? 'Spezialisiert für den deutschen Markt' : 'Specialized for the German Market'}
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-[32px] font-semibold text-slate-900 tracking-tight leading-tight font-['Kufam']">
            {lang === 'de'
              ? 'Branchen-Lösungen für Deutschland'
              : 'Industry Solutions for Germany'}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {lang === 'de'
              ? 'Maßgeschneiderte digitale Lösungen für Gesundheit, Gastronomie und Unternehmen — DSGVO-konform, mobil-optimiert und Google-ready.'
              : 'Tailored digital solutions for healthcare, hospitality and business — GDPR-compliant, mobile-optimized and Google-ready.'}
          </p>
        </div>

        {/* 3 Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.id}
                onClick={() => onSelectService?.(industry.id)}
                className="de-serv-item group relative flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-[#9cd5e2] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Top accent bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${industry.accentBar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  {/* Badge + Icon row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${industry.bg} ${industry.color}`}>
                      {industry.badge}
                    </span>
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 duration-300 ${industry.bg} ${industry.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug font-['Kufam'] mb-2">
                    {industry.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                    {industry.desc}
                  </p>

                  {/* Feature bullets */}
                  <ul className="space-y-1.5 flex-1">
                    {industry.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom action */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600 group-hover:text-sky-700 transition-colors">
                      {lang === 'de' ? 'Details ansehen' : 'View details'}
                    </span>
                    <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-slate-50 border border-slate-200 group-hover:bg-[#BBE7F1] group-hover:border-[#9cd5e2] transition-all text-slate-500 group-hover:text-slate-950">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DSGVO trust strip + CTA */}
        <div className="de-serv-item mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-xs">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <RiShieldCheckLine className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{lang === 'de' ? 'DSGVO-konform' : 'GDPR Compliant'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span className="font-medium">{lang === 'de' ? 'Hetzner Frankfurt Hosting' : 'Hetzner Frankfurt Hosting'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-violet-600 shrink-0" />
              <span className="font-medium">{lang === 'de' ? 'Auf Deutsch verfügbar' : 'German language support'}</span>
            </div>
          </div>
          <button
            onClick={onContactClick}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all cursor-pointer group shadow-sm"
          >
            <span>{lang === 'de' ? 'Kostenlos anfragen' : 'Free Consultation'}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

