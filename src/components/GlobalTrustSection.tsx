import React from 'react';
import { ShieldCheck, Lock, Globe, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
      icon: Globe,
      title: lang === 'de' ? 'Enterprise-Architektur & Delivery' : 'Enterprise Architecture & Delivery',
      desc: lang === 'de' ? 'Moderne Cloud-native Entwicklerteams mit hoher Geschwindigkeit und voller Zeitzonenausrichtung.' : 'Modern cloud-native engineering squads with high velocity and full timezone alignment.',
      tag: lang === 'de' ? 'Globale Delivery-Standards' : 'Global Delivery Standards',
      color: 'text-slate-950 bg-[#BBE7F1]/60 border-[#9cd5e2]'
    },
    {
      icon: Lock,
      title: lang === 'de' ? 'Strikte NDAs & 100% IP-Übertragung' : 'Strict NDAs & 100% IP Transfer',
      desc: lang === 'de' ? 'Vollständige Übertragung aller geistigen Eigentumsrechte (IP) mit rechtssicheren bilateralen NDAs.' : 'Full IP ownership legally transferred to your enterprise with ironclad bilateral NDAs.',
      tag: lang === 'de' ? 'Rechtlich abgesichert' : 'Legally Protected',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    },
    {
      icon: ShieldCheck,
      title: lang === 'de' ? 'DSGVO- & BaFin-Konformität' : 'GDPR & BaFin Compliance',
      desc: lang === 'de' ? 'Gehärtete Linux-Serverinfrastruktur, OWASP Top 10 Schutz und deutsche Sicherheitsrichtlinien.' : 'Hardened Linux server mesh, OWASP Top 10 mitigation, and German security benchmarks.',
      tag: lang === 'de' ? 'Audit-geprüft' : 'Audit Ready',
      color: 'text-sky-600 bg-sky-50 border-sky-200'
    },
    {
      icon: Clock,
      title: lang === 'de' ? 'Überlappende Zeitzonen' : 'Real-Time Timezone Overlap',
      desc: lang === 'de' ? 'Dedizierte Kommunikationskanäle abgestimmt auf deutsche, europäische und US-Arbeitszeiten.' : 'Dedicated communication channels overlapping US Eastern, Pacific, and European hours.',
      tag: lang === 'de' ? '24/7 SLA Uptime' : '24/7 SLA Uptime',
      color: 'text-purple-600 bg-purple-50 border-purple-200'
    }
  ];

  return (
    <section className="py-14 sm:py-18 bg-slate-100/90 border-b border-slate-300/80 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 text-cyan-800 font-['Kufam'] text-xs sm:text-sm font-semibold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-cyan-700" />
            <span>{t.trustKicker}</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-[30px] font-bold text-slate-900 tracking-tight font-['Kufam']">
            {t.trustHeading}
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-['Kufam']">
            {t.trustSubheading}
          </p>
        </div>

        {/* 4 Compact Trust Cards in 1 Clean Responsive Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-white hover:bg-white border border-slate-200/90 hover:border-[#9cd5e2] rounded-2xl p-5 sm:p-6 transition-all duration-300 transform hover:-translate-y-1 shadow-xs hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${pillar.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full shadow-2xs">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Instrument_Sans'] group-hover:text-cyan-800 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
