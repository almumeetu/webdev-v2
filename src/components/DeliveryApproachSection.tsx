import React from 'react';
import { ClipboardList, Code2, FileCheck2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DeliveryApproachSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const steps = lang === 'de'
    ? [
        {
          number: '01',
          icon: ClipboardList,
          title: 'Ziele und Umfang abstimmen',
          description: 'Wir klären Geschäftsziele, Nutzer, Anforderungen und Prioritäten, bevor die Umsetzung beginnt.'
        },
        {
          number: '02',
          icon: Code2,
          title: 'In Etappen entwickeln',
          description: 'Sie erhalten regelmäßig prüfbare Zwischenstände und können Feedback früh in die Umsetzung einbringen.'
        },
        {
          number: '03',
          icon: FileCheck2,
          title: 'Klar übergeben',
          description: 'Zum Abschluss erhalten Sie den Quellcode, dokumentierte Entscheidungen und eine verständliche Übergabe.'
        }
      ]
    : [
        {
          number: '01',
          icon: ClipboardList,
          title: 'Align on goals and scope',
          description: 'We clarify business goals, users, requirements, and priorities before implementation begins.'
        },
        {
          number: '02',
          icon: Code2,
          title: 'Build in visible steps',
          description: 'You get reviewable progress at regular milestones and can shape the work as it develops.'
        },
        {
          number: '03',
          icon: FileCheck2,
          title: 'Hand over with clarity',
          description: 'At completion, you receive the source code, documented decisions, and a clear handover.'
        }
      ];

  return (
    <section className="home-shape-architecture bg-white py-16 sm:py-20 lg:py-24 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-800">
            {t.testimonialsKicker}
          </p>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-slate-950">
            {t.testimonialsHeading}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            {t.testimonialsSubheading}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {steps.map(({ number, icon: Icon, title, description }) => (
            <article
              key={number}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition-colors hover:border-[#9cd5e2] hover:bg-white sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium tracking-[0.12em] text-slate-400">{number}</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#9cd5e2] bg-[#BBE7F1]/50 text-cyan-900">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <h3 className="mt-7 text-lg font-semibold text-slate-950 sm:text-xl">{title}</h3>
              <p className="mt-2.5 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryApproachSection;
