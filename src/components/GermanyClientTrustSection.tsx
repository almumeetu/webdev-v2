'use client';

import React, { useRef } from 'react';
import { ArrowUpRight, ShieldCheck, Globe, Clock, FileCheck, BadgeCheck, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { gsap, useGsapContext } from '../utils/gsapHelper';

interface GermanyClientTrustSectionProps {
  onOpenQuote?: () => void;
}

export const GermanyClientTrustSection: React.FC<GermanyClientTrustSectionProps> = ({ onOpenQuote }) => {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    gsap.fromTo(
      '.trust-de-item',
      { opacity: 0, y: isMobile ? 10 : 24 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.35 : 0.6,
        stagger: isMobile ? 0.04 : 0.09,
        ease: isMobile ? 'power1.out' : 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 94%' : 'top 82%',
          once: true,
        },
        clearProps: 'transform,opacity',
      }
    );
  });

  const trustPoints = [
    {
      icon: ShieldCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-200',
      title: lang === 'de' ? 'DSGVO-konform' : 'GDPR Compliant',
      desc: lang === 'de'
        ? 'Alle Projekte entsprechen der DSGVO. Hosting auf deutschen Servern (Hetzner Frankfurt) optional.'
        : 'All projects comply with GDPR regulations. German-based hosting via Hetzner Frankfurt available.',
    },
    {
      icon: FileCheck,
      color: 'text-sky-600',
      bg: 'bg-sky-50 border-sky-200',
      title: lang === 'de' ? 'NDA & IP-Übertragung' : 'NDA & IP Transfer',
      desc: lang === 'de'
        ? 'Gegenseitige NDA vor Projektstart. 100 % IP- und Code-Eigentumsrechte werden rechtlich übertragen.'
        : 'Mutual NDA signed before kickoff. 100% code and IP ownership legally transferred to you.',
    },
    {
      icon: Clock,
      color: 'text-violet-600',
      bg: 'bg-violet-50 border-violet-200',
      title: lang === 'de' ? 'CET-Zeitzone' : 'CET-Aligned Hours',
      desc: lang === 'de'
        ? 'Direkter Kontakt zu deutschen Bürozeiten (CET). Keine langen Wartezeiten.'
        : 'Direct reachability during German business hours (CET). No long response delays.',
    },
    {
      icon: Globe,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50 border-cyan-200',
      title: lang === 'de' ? 'Sitz in Leverkusen' : 'Based in Leverkusen, DE',
      desc: lang === 'de'
        ? 'Unser Hauptsitz befindet sich in Leverkusen. Persönliche Treffen in NRW möglich.'
        : 'Our primary office is in Leverkusen, NRW. In-person meetings across Germany available.',
    },
    {
      icon: BadgeCheck,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200',
      title: lang === 'de' ? '10+ Jahre Erfahrung' : '10+ Years Experience',
      desc: lang === 'de'
        ? 'Seit 2016 entwickeln wir maßgeschneiderte Software für europäische und internationale Kunden.'
        : 'Building custom software for European and global clients since 2016 with proven track record.',
    },
    {
      icon: Zap,
      color: 'text-rose-600',
      bg: 'bg-rose-50 border-rose-200',
      title: lang === 'de' ? 'Schnelle Lieferung' : 'Fast Delivery',
      desc: lang === 'de'
        ? 'Agile Sprints mit klaren Meilensteinen. Erstes Ergebnis oft schon nach wenigen Wochen.'
        : 'Agile sprints with clear milestones. First deliverable often within a few weeks of kickoff.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200/80 overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(187,231,241,0.18),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="trust-de-item text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700">
            🇩🇪 {lang === 'de' ? 'Für deutsche Unternehmen' : 'Germany-Friendly Partner'}
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-[32px] font-semibold text-slate-900 tracking-tight leading-tight font-['Kufam']">
            {lang === 'de'
              ? 'Warum deutsche Unternehmen uns vertrauen'
              : 'Why German Businesses Trust Us'}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {lang === 'de'
              ? 'Wir verstehen die Anforderungen des deutschen Marktes — von DSGVO bis pünktlicher Lieferung.'
              : 'We understand German market standards — from GDPR compliance to on-time, transparent delivery.'}
          </p>
        </div>

        {/* Trust Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="trust-de-item group flex flex-col gap-3 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-[#9cd5e2] transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${point.bg} ${point.color} transition-transform group-hover:scale-105 duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">{point.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{point.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Strip */}
        <div className="trust-de-item mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 p-5 sm:p-6 rounded-2xl bg-slate-900 text-white">
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
              🇩🇪 Leverkusen, NRW — {lang === 'de' ? 'Auf Deutsch verfügbar' : 'Available in German'}
            </p>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {lang === 'de'
                ? 'Bereit für Ihr Projekt? Sprechen Sie uns an.'
                : 'Ready to start your project? Let\'s talk.'}
            </h3>
          </div>
          <button
            onClick={onOpenQuote}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-semibold text-sm transition-all cursor-pointer group shadow-sm"
          >
            <span>{lang === 'de' ? 'Beratung anfragen' : 'Request Consultation'}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

