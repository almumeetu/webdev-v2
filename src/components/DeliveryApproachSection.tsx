import React from 'react';
import { ClipboardList, Layers3, Code2, FileCheck2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DeliveryApproachSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const steps = lang === 'de'
    ? [
        {
          number: '01',
          icon: ClipboardList,
          phase: 'Abstimmung',
          title: 'Ziele und Umfang klären',
          description: 'Gemeinsam definieren wir Geschäftsziele, Nutzeranforderungen und Prioritäten für das Projekt.',
          outcome: 'Abgestimmter Projektumfang',
        },
        {
          number: '02',
          icon: Layers3,
          phase: 'Planung',
          title: 'Den Lösungsweg planen',
          description: 'Wir strukturieren die Lösung, stimmen das Konzept ab und legen klare Meilensteine für die Umsetzung fest.',
          outcome: 'Konzept und Meilensteinplan',
        },
        {
          number: '03',
          icon: Code2,
          phase: 'Umsetzung',
          title: 'Entwickeln und prüfen',
          description: 'Prüfbare Zwischenstände, regelmäßiges Feedback und Qualitätssicherung begleiten jeden Entwicklungsschritt.',
          outcome: 'Geprüfte, vorführbare Software',
        },
        {
          number: '04',
          icon: FileCheck2,
          phase: 'Veröffentlichung',
          title: 'Starten und übergeben',
          description: 'Wir bereiten den Produktivstart vor und übergeben Quellcode, Dokumentation und die nächsten Schritte.',
          outcome: 'Produktivstart und Übergabe',
        },
      ]
    : [
        {
          number: '01',
          icon: ClipboardList,
          phase: 'Discovery',
          title: 'Align on goals and scope',
          description: 'We define your business goals, user needs, and priorities together to give the project a clear starting point.',
          outcome: 'Agreed project scope',
        },
        {
          number: '02',
          icon: Layers3,
          phase: 'Planning',
          title: 'Map out the solution',
          description: 'We shape the solution, agree on the approach, and set clear milestones before development begins.',
          outcome: 'Solution outline and roadmap',
        },
        {
          number: '03',
          icon: Code2,
          phase: 'Development',
          title: 'Build, review, and refine',
          description: 'Reviewable progress, regular feedback, and quality checks keep every stage of development on track.',
          outcome: 'Tested, reviewable software',
        },
        {
          number: '04',
          icon: FileCheck2,
          phase: 'Launch',
          title: 'Launch with a clear handover',
          description: 'We prepare the release and hand over the source code, documentation, and practical next steps.',
          outcome: 'Release and handover package',
        },
      ];

  return (
    <section className="bg-slate-50/80 py-14 text-slate-900 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-14">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl lg:text-3xl">
            {t.testimonialsHeading}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            {t.testimonialsSubheading}
          </p>
        </header>

        <ol className="mx-auto max-w-2xl list-none p-0 lg:grid lg:max-w-none lg:grid-cols-4 lg:gap-x-8">
          {steps.map(({ number, icon: Icon, phase, title, description, outcome }) => (
            <li
              key={number}
              className="group relative grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 pb-9 last:pb-0 sm:gap-x-6 sm:pb-10 lg:flex lg:flex-col lg:gap-0 lg:pb-0"
            >
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-[21px] top-11 w-px bg-sky-200/80 group-last:hidden lg:-right-8 lg:bottom-auto lg:left-11 lg:top-[21px] lg:h-px lg:w-auto"
              />
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-white text-sm font-semibold tabular-nums text-sky-700 shadow-sm">
                <span className="sr-only">{lang === 'de' ? 'Schritt' : 'Step'} </span>
                {number}
              </span>

              <div className="min-w-0 pt-0.5 lg:mt-6 lg:flex lg:flex-1 lg:flex-col lg:pt-0">
                <div className="mb-2.5 flex items-center gap-2 text-sky-700">
                  <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] [overflow-wrap:anywhere]">{phase}</p>
                </div>
                <h3 className="text-base font-semibold leading-snug tracking-tight text-slate-950 sm:text-lg [overflow-wrap:anywhere]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 [overflow-wrap:anywhere]">{description}</p>
                <div className="mt-5 lg:mt-auto lg:pt-6">
                  <div className="border-t border-slate-200/70 pt-4">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {lang === 'de' ? 'Ergebnis' : 'Deliverable'}
                    </p>
                    <p className="flex items-start gap-2 text-xs font-medium leading-5 text-slate-700">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                      <span className="min-w-0 [overflow-wrap:anywhere]">{outcome}</span>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default DeliveryApproachSection;
