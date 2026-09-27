import React, { useRef } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Globe, 
  ShieldCheck, 
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Zap,
  Code2,
  Server,
  ShoppingCart,
  Cpu,
  Layers,
  Award,
  FileCheck,
  Building2,
  Check,
  ChevronRight,
  Send
} from 'lucide-react';
import { ServiceDetail, Project } from '../types';
import { initialServices, initialProjects } from '../data/initialData';
import { useGsapContext } from '../utils/gsapHelper';
import gsap from 'gsap';
import { BreadcrumbBar } from './Breadcrumb';
import { useLanguage } from '../context/LanguageContext';

interface ServiceDetailPageProps {
  service: ServiceDetail | null;
  onBack: () => void;
  onBackToHome?: () => void;
  onRequestQuote: (serviceTitle: string) => void;
  onSelectService: (serviceId: string) => void;
  onSelectProject?: (project: Project) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service: rawService,
  onBack,
  onBackToHome,
  onRequestQuote,
  onSelectService,
  onSelectProject
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const { lang, t, localizeService, localizeProject } = useLanguage();

  const service = rawService ? localizeService(rawService) : null;

  useGsapContext(pageRef, () => {
    if (!pageRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    gsap.fromTo(
      '.serv-anim-fade',
      { opacity: 0, y: isMobile ? 12 : 25 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.35 : 0.6,
        stagger: isMobile ? 0.04 : 0.08,
        ease: isMobile ? 'power1.out' : 'power2.out',
        clearProps: 'transform,opacity'
      }
    );
  });

  if (!service) {
    return (
      <div className="min-h-[70vh] bg-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-3 font-['Archivo']">
          {lang === 'de' ? 'Servicespezifikation nicht gefunden' : 'Service Specification Not Found'}
        </h2>
        <p className="text-slate-600 text-sm mb-6 max-w-md">
          {lang === 'de'
            ? 'Der angeforderte IT- oder Cloud-Leistungsbereich ist derzeit nicht verfügbar oder wurde verlegt.'
            : 'The requested IT or cloud service practice area is currently unavailable or has been relocated.'}
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] text-slate-950 text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer border border-[#9cd5e2] shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'de' ? 'Zurück zu allen Services' : 'Return to All Services'}</span>
        </button>
      </div>
    );
  }

  // Get matching icon
  const getIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'Code2': return <Code2 className={className} />;
      case 'Server': return <Server className={className} />;
      case 'ShoppingCart': return <ShoppingCart className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      default: return <ShieldCheck className={className} />;
    }
  };

  // Find other services and localize them
  const otherServices = initialServices
    .filter((s) => s.id !== service.id)
    .map((s) => localizeService(s));

  // Find relevant projects based on service id / tech and localize them
  const relevantProjects = initialProjects
    .filter((p) => {
      const titleLower = service.title.toLowerCase();
      if (titleLower.includes('mern') || titleLower.includes('full stack')) {
        return p.category.includes('Full Stack') || p.category.includes('Web Application');
      }
      if (titleLower.includes('server') || titleLower.includes('cloud')) {
        return p.category.includes('Backend & Cloud');
      }
      if (titleLower.includes('commerce') || titleLower.includes('shopify')) {
        return p.category.includes('E-Commerce');
      }
      if (titleLower.includes('wordpress') || titleLower.includes('cms')) {
        return p.category.includes('WordPress');
      }
      return p.category.includes('Full Stack');
    })
    .slice(0, 2)
    .map((p) => localizeProject(p));

  // Process workflow tailored to enterprise software
  const workflowSteps = [
    {
      step: '01',
      title: lang === 'de' ? 'Anforderungsanalyse & Architektur-Blueprint' : 'Discovery & Architecture Blueprint',
      desc: lang === 'de'
        ? 'Detaillierte Anforderungsanalyse, Ausarbeitung der technischen Spezifikation, Datenbank-ERD-Design und API-Vertragsdefinition vor Codebeginn.'
        : 'Deep requirements analysis, technical specification drafting, database ERD design, and API contract specification before writing code.'
    },
    {
      step: '02',
      title: lang === 'de' ? 'Agile Sprints & Peer Code Reviews' : 'Sprint Development & Code Reviews',
      desc: lang === 'de'
        ? 'Modulare, typsichere TypeScript-Entwicklung in 2-Wochen-Sprints mit regelmäßigen Staging-Demos und Peer-Reviews.'
        : 'Modular, type-safe TypeScript engineering in 2-week agile sprints with bi-weekly client staging demonstrations and peer code reviews.'
    },
    {
      step: '03',
      title: lang === 'de' ? 'Härtung, QA & Performance-Audits' : 'Hardening, QA & Performance Audits',
      desc: lang === 'de'
        ? 'Automatisierte End-to-End-Tests, Security-Scans, OWASP-Prüfungen und Optimierung auf Sub-Sekunden-Ladezeiten.'
        : 'Automated end-to-end testing, security penetration sweeps, OWASP compliance verification, and sub-second latency tuning.'
    },
    {
      step: '04',
      title: lang === 'de' ? 'Zero-Downtime Deployment & 24/7 SLA' : 'Zero-Downtime Deployment & 24/7 SLA',
      desc: lang === 'de'
        ? 'Automatisiertes CI/CD-Release in Produktionscluster mit Rollback-Schutz, vollständiger Dokumentation und laufendem Monitoring.'
        : 'Automated CI/CD release to production cloud clusters with rollback safeguards, full documentation transfer, and ongoing SLA monitoring.'
    }
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-white text-slate-900 pb-20">
      
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-2">
        <BreadcrumbBar
          items={[
            { label: lang === 'de' ? 'Startseite' : 'Home', onClick: onBackToHome },
            { label: lang === 'de' ? 'Leistungsbereiche & Services' : 'Practice Areas & Services', onClick: onBack },
            { label: service.title, active: true }
          ]}
          backAction={onBack}
          backLabel={lang === 'de' ? 'Zurück zu allen Services' : 'Back to All Services'}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">

        {/* 2. Hero Visual Card with Gradient Overlay & Status Bar */}
        <div className="serv-anim-fade relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-950">
          <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
            {service.image && service.image.trim() !== '' ? (
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-700 hover:scale-100"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
            
            {/* Ambient inner glow */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#BBE7F1]/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Inner Content Over Banner */}
            <div className="absolute inset-0 p-5 sm:p-8 md:p-10 flex flex-col justify-between text-white">
              
              {/* Badges row - Floating stylish cursive indicators (No background) */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 text-cyan-300 font-['Kufam'] text-xs sm:text-sm font-semibold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                  <span>{lang === 'de' ? 'Produktionsreifer Service' : 'Production Grade Service'}</span>
                </div>

                <div className="inline-flex items-center gap-2 text-emerald-400 font-['Kufam'] text-xs sm:text-sm font-semibold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{lang === 'de' ? 'Deutsche & EU-Lieferung Aktiv' : 'German & EU Delivery Active'}</span>
                </div>
              </div>

              {/* Title & Icon */}
              <div className="space-y-2.5 max-w-3xl">
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#BBE7F1] text-slate-950 flex items-center justify-center shadow-lg shadow-[#BBE7F1]/20 border border-[#9cd5e2] shrink-0">
                    {getIcon(service.iconName, "w-5 h-5 sm:w-6 sm:h-6 text-slate-950")}
                  </div>
                  <div>
                    <span className="text-cyan-300 font-['Kufam'] text-xs font-semibold tracking-wide block mb-0.5">
                      {lang === 'de' ? 'WebDev Praxisbereich' : 'WebDev Practice Spec'}
                    </span>
                    <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-['Kufam'] tracking-tight leading-snug text-white">
                      {service.title}
                    </h1>
                  </div>
                </div>
                <p className="text-slate-200/90 text-xs sm:text-sm md:text-[15px] leading-relaxed line-clamp-2 max-w-2xl font-['Instrument_Sans'] font-normal">
                  {service.shortDesc}
                </p>
              </div>

            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800 bg-slate-900/95 border-t border-slate-800 text-white p-4 sm:p-5">
            <div className="p-3 text-center sm:text-left">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                {lang === 'de' ? 'Zuverlässigkeits-SLA' : 'Reliability SLA'}
              </div>
              <div className="text-base sm:text-lg font-bold text-white mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'de' ? '99,99% Garantiert' : '99.99% Guaranteed'}</span>
              </div>
            </div>

            <div className="p-3 text-center sm:text-left">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                {lang === 'de' ? 'Lieferzeit' : 'Turnaround Time'}
              </div>
              <div className="text-base sm:text-lg font-bold text-white mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'de' ? '2 - 6 Wochen MVP' : '2 - 6 Weeks MVP'}</span>
              </div>
            </div>

            <div className="p-3 text-center sm:text-left">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                {lang === 'de' ? 'Liefermodell' : 'Delivery Model'}
              </div>
              <div className="text-base sm:text-lg font-bold text-white mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'de' ? 'Agile Sprints & Volle IP' : 'Agile Sprints & Full IP'}</span>
              </div>
            </div>

            <div className="p-3 text-center sm:text-left">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                {lang === 'de' ? 'Code-Standard' : 'Code Standard'}
              </div>
              <div className="text-base sm:text-lg font-bold text-white mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{lang === 'de' ? 'TypeScript & Sauberer Code' : 'TypeScript & Clean Code'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Main 2-Column Section: Detailed Overview & Sidebar Action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (8 cols): In-depth Architectural Breakdown */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Deep-Dive Narrative */}
            <div className="serv-anim-fade bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
              <div className="inline-flex items-center gap-2 text-cyan-800 font-['Kufam'] text-xs sm:text-sm font-semibold tracking-wide">
                <span>{lang === 'de' ? 'Engineering-Umfang & Architektur' : 'Engineering Scope & Architecture'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Kufam']">
                {lang === 'de' ? `Wie wir Resultate für ${service.title} erzielen` : `How We Engineer Results for ${service.title}`}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {service.fullDesc}
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#BBE7F1]/20 border border-[#9cd5e2] flex items-start gap-3.5">
                <Zap className="w-5 h-5 text-cyan-800 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-900 leading-relaxed font-medium">
                  <strong>{lang === 'de' ? 'Unternehmensgarantie:' : 'Enterprise Assurance:'}</strong>{' '}
                  {lang === 'de'
                    ? 'Jedes Projekt in diesem Leistungsbereich beinhaltet durchgehende Typsicherheit, automatisierte CI/CD-Pipelines, modulare Wartbarkeit und strengen IP-Schutz unter NDA für deutsche, europäische und weltweite Unternehmen.'
                    : 'Every project executed under this practice area includes end-to-end type safety, automated CI/CD pipelines, modular maintainability, and strict IP protection under NDA for German, European, and global businesses.'}
                </div>
              </div>
            </div>

            {/* Core Capabilities & Architectural Pillars */}
            <div className="serv-anim-fade space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-cyan-800 font-['Kufam'] text-xs sm:text-sm font-semibold tracking-wide">
                    {lang === 'de' ? 'Kernkompetenzen & Stärken' : 'Key Capabilities & Core Strengths'}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Kufam'] mt-1">
                    {lang === 'de' ? 'Was unseren Ansatz auszeichnet' : 'What Makes Our Approach Distinct'}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {service.features.map((feat, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#9cd5e2] shadow-xs hover:shadow-md transition-all duration-300 group flex items-start gap-3.5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#BBE7F1]/40 text-slate-950 flex items-center justify-center shrink-0 group-hover:bg-[#BBE7F1] group-hover:text-slate-950 transition-colors border border-[#9cd5e2]/60">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-cyan-800 transition-colors">
                        {feat}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {lang === 'de'
                          ? 'Entwickelt nach Industriestandards, hoher Testabdeckung und strengen Performancemetriken.'
                          : 'Engineered with industry-standard patterns, high test coverage, and strict performance metrics.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Deliverables Checklist */}
            <div className="serv-anim-fade bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#BBE7F1]/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div>
                  <span className="text-cyan-300 font-['Kufam'] text-xs sm:text-sm font-semibold tracking-wide">
                    {lang === 'de' ? 'Verifizierbare Projektergebnisse & Artefakte' : 'Verifiable Artifacts & Deliverables'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-['Kufam'] mt-1">
                    {lang === 'de' ? 'Was Sie bei Projektabschluss erhalten' : 'What You Receive Upon Delivery'}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    {lang === 'de'
                      ? 'Transparente, vollständig dokumentierte Übergabe ohne Abhängigkeiten (Vendor Lock-in).'
                      : 'Transparent, fully documented handovers with zero vendor lock-in.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.deliverables.map((deliv, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-200 font-medium">
                        {deliv}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack & Tooling Grid */}
            <div className="serv-anim-fade space-y-4">
              <div className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-wider">
                {lang === 'de' ? 'TECHNOLOGIEN & ÖKOSYSTEM' : 'TECHNOLOGIES & ECOSYSTEM'}
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Archivo']">
                {lang === 'de' ? 'Eingesetzte Sprachen, Frameworks & Cloud-Dienste' : 'Languages, Frameworks & Cloud Services Used'}
              </h3>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {service.techs.map((tech, idx) => (
                  <div 
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#BBE7F1]/30 border border-slate-200/90 hover:border-[#9cd5e2] text-slate-800 hover:text-slate-950 text-xs font-bold transition-colors shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#BBE7F1] border border-[#9cd5e2]" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Working Methodology */}
            <div className="serv-anim-fade space-y-6 pt-4">
              <div>
                <div className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-wider">
                  {lang === 'de' ? 'STRUKTURIERTE DURCHFÜHRUNG' : 'STRUCTURED EXECUTION'}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Archivo'] mt-1">
                  {lang === 'de' ? 'Unser 4-Phasen-Lieferprozess' : 'Our 4-Stage Delivery Process'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {workflowSteps.map((step) => (
                  <div 
                    key={step.step}
                    className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#9cd5e2] transition-all duration-300 relative group shadow-2xs"
                  >
                    <div className="text-2xl font-extrabold font-mono text-[#9cd5e2] group-hover:text-cyan-800 transition-colors">
                      {step.step}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-2 font-['Archivo']">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Relevant Projects Showcase if any */}
            {relevantProjects.length > 0 && (
              <div className="serv-anim-fade space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-wider">
                      {lang === 'de' ? 'BEWÄHRTE ERFOLGE' : 'PROVEN DELIVERIES'}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Archivo'] mt-1">
                      {lang === 'de' ? 'Verwandte Fallstudien' : 'Related Case Studies'}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {relevantProjects.map((proj) => (
                    <div 
                      key={proj.id}
                      onClick={() => onSelectProject && onSelectProject(proj)}
                      className="group p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#9cd5e2] transition-all shadow-xs hover:shadow-lg cursor-pointer flex flex-col justify-between"
                    >
                      <div className="h-40 rounded-xl overflow-hidden mb-3 relative bg-slate-100">
                        {proj.image && proj.image.trim() !== '' ? (
                          <img 
                            src={proj.image} 
                            alt={proj.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                        ) : null}
                        <div className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-white px-2 py-0.5 rounded-md border border-slate-700">
                          {proj.clientCountry}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-cyan-800 transition-colors line-clamp-1">
                          {proj.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {proj.description}
                        </p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-800">
                        <span>{lang === 'de' ? 'Fallstudie lesen' : 'Read Case Study'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column (4 cols): Sticky Quick Action & Consultation Box */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 self-start lg:max-h-[calc(100vh-6.5rem)] lg:overflow-y-auto no-scrollbar z-20">
            
            {/* Consultation & Quote Card */}
            <div className="serv-anim-fade bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl space-y-6">
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-950 bg-[#BBE7F1] border border-[#9cd5e2] px-2.5 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'de' ? 'INDIVIDUELLES ARCHITEKTUR-ANGEBOT' : 'CUSTOM ARCHITECTURE PROPOSAL'}</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 font-['Archivo']">
                  {lang === 'de' ? `Bedarf an ${service.title}?` : `Need ${service.title}?`}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'de'
                    ? 'Sprechen Sie direkt mit unseren Lösungsarchitekten über Projektumfang, Tech-Stack, Meilensteine und ein verbindliches Festpreis- oder Squad-Angebot.'
                    : 'Connect directly with our solutions architects to discuss your project scope, tech stack, milestones, and fixed-bid or dedicated team proposal.'}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onRequestQuote(service.title)}
                className="w-full flex items-center justify-center gap-2 bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] text-slate-950 font-bold text-sm py-4 px-6 rounded-2xl transition-all duration-150 cursor-pointer min-h-[48px] border border-[#9cd5e2] shadow-sm"
              >
                <span>{lang === 'de' ? 'Individuelles Angebot anfordern' : 'Request Custom Proposal'}</span>
                <Send className="w-4 h-4" />
              </button>

              {/* Service Specifications List */}
              <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100/80">
                  <span className="text-slate-500 font-medium">
                    {lang === 'de' ? 'Preise & Modell' : 'Pricing Model'}
                  </span>
                  <span className="font-bold text-slate-800">
                    {lang === 'de' ? 'Festpreis-Meilensteine / Retainer' : 'Fixed-Milestone / Retainer'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100/80">
                  <span className="text-slate-500 font-medium">
                    {lang === 'de' ? 'NDA & IP-Rechte' : 'NDA & IP Rights'}
                  </span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {lang === 'de' ? '100% Kundeneigentum' : '100% Client-Owned'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100/80">
                  <span className="text-slate-500 font-medium">
                    {lang === 'de' ? 'Zeitzonen-Support' : 'Timezone Overlap'}
                  </span>
                  <span className="font-bold text-slate-800">
                    {lang === 'de' ? 'MEZ, BST & EST Support' : 'CET, BST & EST Support'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-500 font-medium">
                    {lang === 'de' ? 'Garantiezeitraum' : 'Warranty Period'}
                  </span>
                  <span className="font-bold text-slate-800">
                    {lang === 'de' ? '90 Tage Post-Launch SLA' : '90-Day Post-Launch SLA'}
                  </span>
                </div>
              </div>

              {/* Direct Support Contacts */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">
                  {lang === 'de' ? 'Technischer Direktsupport' : 'Direct Engineering Desk'}
                </div>
                <div className="text-xs sm:text-sm text-slate-700 space-y-1">
                  <div>{lang === 'de' ? 'Deutschland Zentrale:' : 'Germany Hub:'} <a href="tel:+491729766016" className="font-bold text-emerald-600 hover:underline">+49 172 9766016</a></div>
                  <div>{lang === 'de' ? 'Globales F&E-Labor:' : 'Global R&D Lab:'} <a href="tel:+8801722301927" className="font-bold text-cyan-800 hover:underline">+880 1722-301927</a></div>
                  <div>{lang === 'de' ? 'Direkte E-Mail:' : 'Direct Email:'} <a href="mailto:info@webdevsoftwaresolutions.com" className="font-bold text-cyan-800 hover:underline">info@webdevsoftwaresolutions.com</a></div>
                </div>
              </div>

              {/* Return to all services link */}
              <button
                onClick={onBack}
                className="w-full text-center text-xs font-bold text-slate-600 hover:text-cyan-800 transition-colors flex items-center justify-center gap-1 cursor-pointer py-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{lang === 'de' ? 'Alle 6 IT-Services anzeigen' : 'View All 6 IT Services'}</span>
              </button>

            </div>

          </aside>

        </div>

        {/* 4. Explore Other Services Section */}
        <div className="serv-anim-fade pt-12 border-t border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="text-xs font-mono font-bold text-cyan-800 uppercase tracking-wider">
                {lang === 'de' ? 'LEISTUNGSÜBERSICHT' : 'PRACTICE OVERVIEW'}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Archivo'] mt-1">
                {lang === 'de' ? 'Weitere Enterprise-Services entdecken' : 'Explore Other Enterprise Services'}
              </h3>
            </div>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-800 hover:text-cyan-900 cursor-pointer"
            >
              <span>{lang === 'de' ? 'Alle Leistungsbereiche ansehen' : 'View All IT Practice Areas'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.slice(0, 3).map((other) => (
              <div
                key={other.id}
                onClick={() => {
                  onSelectService(other.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#9cd5e2] shadow-xs hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#BBE7F1]/40 text-slate-950 flex items-center justify-center group-hover:bg-[#BBE7F1] group-hover:text-slate-950 transition-colors mb-3 border border-[#9cd5e2]/60">
                    {getIcon(other.iconName, "w-5 h-5")}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-cyan-800 transition-colors font-['Archivo']">
                    {other.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {other.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-800">
                  <span>{lang === 'de' ? 'Spezifikation ansehen' : 'Explore Specification'}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
