import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  RiGlobalLine,
  RiLockLine,
  RiShieldCheckLine,
  RiTimeLine,
} from 'react-icons/ri';

interface GlobalTrustSectionProps {
  onOpenQuote?: () => void;
  onExplorePortfolio?: () => void;
}

export const GlobalTrustSection: React.FC<GlobalTrustSectionProps> = ({
  onOpenQuote,
  onExplorePortfolio
}) => {
  const { t, lang } = useLanguage();

  const trustPillars = [
    {
      Icon: RiGlobalLine,
      title: lang === 'de' ? 'Architektur & Umsetzung' : 'Architecture & delivery',
      desc: lang === 'de'
        ? 'Cloud-native Lösungen, die auf Ihre Anforderungen und geplantes Wachstum abgestimmt sind.'
        : 'Cloud-native systems shaped around your requirements and expected growth.',
      tag: lang === 'de' ? 'Globale Teams' : 'Global teams',
      iconColor: 'text-cyan-600',
      iconBg: 'bg-cyan-50 border-cyan-200',
      tagColor: 'bg-cyan-50 border-cyan-200 text-cyan-700',
    },
    {
      Icon: RiLockLine,
      title: lang === 'de' ? 'Vertraulichkeit & Eigentum' : 'Confidentiality & ownership',
      desc: lang === 'de'
        ? 'Projektvereinbarungen regeln den Umgang mit Informationen, Zugriffen, Code und Ergebnissen.'
        : 'Project agreements clarify how information, access, code, and deliverables are handled.',
      tag: lang === 'de' ? 'Klare Vereinbarungen' : 'Clear agreements',
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50 border-emerald-200',
      tagColor: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    },
    {
      Icon: RiShieldCheckLine,
      title: lang === 'de' ? 'Datenschutz & Sicherheit' : 'Privacy & security',
      desc: lang === 'de'
        ? 'Regulatorische und infrastrukturelle Anforderungen fließen früh in Design und Deployment ein.'
        : 'Regulatory and infrastructure needs are surfaced during discovery, then included in design and deployment.',
      tag: lang === 'de' ? 'Sicher geplant' : 'Secure by design',
      iconColor: 'text-sky-600',
      iconBg: 'bg-sky-50 border-sky-200',
      tagColor: 'bg-sky-50 border-sky-200 text-sky-700',
    },
    {
      Icon: RiTimeLine,
      title: lang === 'de' ? 'Gemeinsame Arbeitszeiten' : 'Shared working hours',
      desc: lang === 'de'
        ? 'Regelmäßige Abstimmungen schaffen Zeit für Feedback und schnelle Entscheidungen.'
        : 'Regular overlap leaves room for feedback and timely decisions.',
      tag: lang === 'de' ? 'Direkte Abstimmung' : 'Direct collaboration',
      iconColor: 'text-violet-600',
      iconBg: 'bg-violet-50 border-violet-200',
      tagColor: 'bg-violet-50 border-violet-200 text-violet-700',
    },
  ];

  return (
    <section className="home-shape-waves py-16 sm:py-20 lg:py-24 bg-slate-100/90 border-b border-slate-300/80 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 text-cyan-800 font-['Kufam'] text-xs sm:text-sm font-semibold tracking-wide">
            <RiShieldCheckLine className="w-4 h-4 text-cyan-600" />
            <span>{t.trustKicker}</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-slate-900 tracking-tight font-['Kufam']">
            {t.trustHeading}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-['Kufam']">
            {t.trustSubheading}
          </p>
        </div>

        {/* 4 Trust Cards */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {trustPillars.map((pillar) => {
            const { Icon } = pillar;
            return (
              <div
                key={pillar.title}
                className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#9cd5e2] hover:shadow-lg sm:p-6"
              >
                <div className="mb-5 flex items-center gap-3">
                  {/* Colorful icon box */}
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${pillar.iconBg} ${pillar.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-4 ${pillar.tagColor}`}>
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="min-h-14 font-['Instrument_Sans'] text-base font-bold leading-6 text-slate-900 sm:text-lg">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
