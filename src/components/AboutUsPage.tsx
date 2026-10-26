import React, { useRef } from 'react';
import { 
  Building2, 
  Globe, 
  ShieldCheck, 
  Server, 
  Cpu, 
  Users, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Award,
  Target,
  Zap
} from 'lucide-react';
import { useGsapContext } from '../utils/gsapHelper';
import gsap from 'gsap';
import { Breadcrumb } from './Breadcrumb';
import { useLanguage } from '../context/LanguageContext';

interface AboutUsPageProps {
  onBackToHome: () => void;
  onOpenQuote: () => void;
  onExploreTeam: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onBackToHome,
  onOpenQuote,
  onExploreTeam
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLanguage();

  useGsapContext(containerRef, () => {
    if (!containerRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    gsap.fromTo(
      '.about-anim-fade',
      { opacity: 0, y: isMobile ? 12 : 25 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.35 : 0.65,
        stagger: isMobile ? 0.04 : 0.1,
        ease: isMobile ? 'power1.out' : 'power2.out',
        clearProps: 'transform,opacity'
      }
    );
  });

  return (
    <div ref={containerRef} className="bg-slate-50/50 text-slate-900 min-h-screen">
      {/* Breadcrumb Banner */}
      <Breadcrumb
        badge={lang === 'de' ? 'ÜBER UNS' : 'ABOUT US'}
        title={
          lang === 'de'
            ? 'Skalierbare Software & Cloud-Infrastruktur'
            : 'Building Scalable Software & Cloud Infrastructure'
        }
        items={[
          { label: t.navHome, onClick: onBackToHome },
          { label: t.navAbout, active: true }
        ]}
        backAction={onBackToHome}
        backLabel={t.backToHome}
        align="left"
        contentClassName="about-anim-fade"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 space-y-16 sm:space-y-20">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center about-anim-fade">
          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-slate-900 tracking-tight">
              {lang === 'de'
                ? 'Professionelle Software-Entwicklung für Deutschland'
                : 'Professional Software Engineering for Germany'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {lang === 'de' ? (
                <>
                  Mit Sitz in <strong>Leverkusen, Deutschland</strong>, entwickelt <strong>WebDev Software Solutions</strong> maßgeschneiderte digitale Lösungen für deutsche und europäische Unternehmen. Wir kombinieren moderne Technologien mit höchsten Sicherheits- und Datenschutzstandards nach DSGVO.
                </>
              ) : (
                <>
                  Based in <strong>Leverkusen, Germany</strong>, <strong>WebDev Software Solutions</strong> delivers custom digital solutions for German and European businesses, combining cutting-edge technology with the highest GDPR security and privacy standards.
                </>
              )}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {lang === 'de'
                ? 'Unsere Tech-Stack: Next.js, TypeScript, React Native, Flutter, Kotlin für Mobile-Apps, PostgreSQL und Supabase für Datenbanken, sowie Prisma ORM. Wir entwickeln skalierbare Web- und Mobile-Anwendungen mit modernen Cloud-Architekturen und CI/CD-Automatisierung.'
                : 'Our tech stack: Next.js, TypeScript, React Native, Flutter, Kotlin for mobile apps, PostgreSQL and Supabase for databases, and Prisma ORM. We build scalable web and mobile applications with modern cloud architectures and CI/CD automation.'}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
                <div className="text-2xl font-bold text-slate-950">500+</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  {lang === 'de' ? 'Projekte' : 'Projects'}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
                <div className="text-2xl font-bold text-slate-950">100%</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  {lang === 'de' ? 'IP-Eigentum' : 'IP Ownership'}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
                <div className="text-2xl font-bold text-slate-950">99.98%</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  {lang === 'de' ? 'Uptime' : 'Uptime SLA'}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
                <div className="text-2xl font-bold text-slate-950">14+</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  {lang === 'de' ? 'Zeitzonen' : 'Time Zones'}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
              alt="Engineering Team"
              className="rounded-2xl shadow-lg w-full object-cover h-[320px] sm:h-[400px] border border-slate-200"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-lg border border-slate-200">
              <div className="text-xs font-semibold text-sky-600 uppercase">
                {lang === 'de' ? 'Globales Delivery-Modell' : 'Global Delivery Model'}
              </div>
              <div className="text-sm font-bold mt-0.5 text-slate-900">
                {lang === 'de' ? 'Dedizierte Agile Squads' : 'Dedicated Agile Squads'}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {lang === 'de' ? 'High-Velocity Sprints & Continuous Deployment' : 'High-velocity sprints & continuous deployment'}
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hubs */}
        <div className="about-anim-fade space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-semibold text-sky-600 uppercase tracking-wider mb-2">
              {lang === 'de' ? 'Standorte & Engineering-Zentren' : 'Physical Presence & Engineering Hubs'}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {lang === 'de' ? 'Globale Niederlassungen' : 'Global Facilities'}
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              {lang === 'de'
                ? 'Direkte internationale Zusammenarbeit mit Kunden.'
                : 'Direct international client collaboration backed by dedicated squads.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Leverkusen Germany */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                {lang === 'de' ? 'Leverkusen, Deutschland' : 'Leverkusen, Germany'}
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                  <span>{lang === 'de' ? 'DSGVO & ISO-27001' : 'GDPR & ISO-27001'}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                  <span>{lang === 'de' ? 'Hetzner Frankfurt' : 'Hetzner Frankfurt'}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                  <span>Küppersteg, 51373 Leverkusen</span>
                </li>
              </ul>
            </div>

            {/* Joypurhat Bangladesh */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                {lang === 'de' ? 'Joypurhat, Bangladesch' : 'Joypurhat, Bangladesh'}
              </h4>
              <ul className="text-xs text-slate-700 space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{lang === 'de' ? 'Next.js & TypeScript' : 'Next.js & TypeScript'}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{lang === 'de' ? 'Flutter, React Native & Kotlin' : 'Flutter, React Native & Kotlin'}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{lang === 'de' ? 'PostgreSQL, Supabase & Prisma' : 'PostgreSQL, Supabase & Prisma'}</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Values Section */}
        <div className="about-anim-fade grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-2">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">
              {lang === 'de' ? 'Zielorientiert' : 'Goal-Driven'}
            </h3>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">
              {lang === 'de' ? 'Sicherheit zuerst' : 'Security First'}
            </h3>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center mx-auto mb-2">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">
              {lang === 'de' ? 'Schnelle Lieferung' : 'Fast Delivery'}
            </h3>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">
              {lang === 'de' ? 'Qualitätsgarantie' : 'Quality Assurance'}
            </h3>
          </div>
        </div>


        {/* CTA Banner */}
        <div className="about-anim-fade p-8 sm:p-12 rounded-2xl bg-slate-900 text-white text-center space-y-6 shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-bold">
            {lang === 'de' ? 'Starten Sie Ihr Projekt mit uns' : 'Start Your Project With Us'}
          </h3>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            {lang === 'de'
              ? 'Bereit für eine moderne Web-Anwendung mit Next.js & TypeScript oder eine Mobile-App mit Flutter, React Native oder Kotlin?'
              : 'Ready to build a modern web application with Next.js & TypeScript or a mobile app with Flutter, React Native, or Kotlin?'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenQuote}
              className="bg-white hover:bg-slate-100 text-slate-950 text-sm font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              {lang === 'de' ? 'Beratung anfordern' : 'Request Consultation'}
            </button>
            <button
              onClick={onExploreTeam}
              className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>{lang === 'de' ? 'Team kennenlernen' : 'Meet The Team'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
