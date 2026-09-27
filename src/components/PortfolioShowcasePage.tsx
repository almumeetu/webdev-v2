'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Eye, 
  Zap, 
  Clock, 
  Building2, 
  Sparkles, 
  Code2, 
  Laptop, 
  Server, 
  Store, 
  ShoppingBag, 
  TrendingUp, 
  ShieldCheck, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  DollarSign, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { Project } from '../types';
import { ProjectOrderModal } from './ProjectOrderModal';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Breadcrumb } from './Breadcrumb';
import { useLanguage } from '../context/LanguageContext';

interface PortfolioShowcasePageProps {
  projects: Project[];
  initialStatus?: string;
  initialCategory?: string;
  initialCountry?: string;
  initialSearch?: string;
  initialOrderId?: string;
}

export const PortfolioShowcasePage: React.FC<PortfolioShowcasePageProps> = ({ 
  projects,
  initialStatus,
  initialCategory,
  initialCountry,
  initialSearch,
  initialOrderId,
}) => {
  const router = useRouter();
  const { lang, t, localizeProject } = useLanguage();

  // Localize all projects dynamically based on current language
  const localizedProjects = useMemo(() => {
    return projects.map((p) => localizeProject(p));
  }, [projects, localizeProject]);

  // ─── Filter & Search State ──────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedCountry, setSelectedCountry] = useState<string>(initialCountry || 'All');
  const [selectedStatus, setSelectedStatus] = useState<string>(initialStatus || 'All');
  const [viewMode, setViewMode] = useState<'grid' | 'expanded'>('grid');

  // ─── Order & Preview Modal State ───────────────────────────────────────────
  const [orderModalOpen, setOrderModalOpen] = useState(Boolean(initialOrderId));
  const [selectedProjectForOrder, setSelectedProjectForOrder] = useState<Project | null>(() => {
    if (initialOrderId) {
      return localizedProjects.find((p) => p.id === initialOrderId) || localizedProjects[0] || null;
    }
    return null;
  });

  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedProjectForPreview, setSelectedProjectForPreview] = useState<Project | null>(null);

  // ─── Interactive Scope Estimator State ─────────────────────────────────────
  const [estimatorOpen, setEstimatorOpen] = useState(false);
  const [estType, setEstType] = useState<'ecommerce' | 'saas' | 'corporate' | 'cloud'>('ecommerce');
  const [estTier, setEstTier] = useState<'turnkey' | 'growth' | 'enterprise'>('turnkey');

  const categories = useMemo(() => [
    { id: 'All', label: lang === 'de' ? 'Alle' : 'All', icon: Sparkles },
    { id: 'Web Application', label: lang === 'de' ? 'Web-Anwendungen' : 'Web Application', icon: Laptop },
    { id: 'Full Stack & MERN', label: lang === 'de' ? 'Full-Stack & MERN' : 'Full Stack & MERN', icon: Code2 },
    { id: 'Backend & Cloud', label: lang === 'de' ? 'Backend & Cloud' : 'Backend & Cloud', icon: Server },
    { id: 'E-Commerce', label: lang === 'de' ? 'E-Commerce' : 'E-Commerce', icon: ShoppingBag },
    { id: 'WordPress & Shopify', label: lang === 'de' ? 'WordPress & Shopify' : 'WordPress & Shopify', icon: Store },
  ], [lang]);

  const countryOptions = useMemo(() => [
    { value: 'All', label: lang === 'de' ? '🌐 Alle Länder' : '🌐 All Countries' },
    { value: 'Germany', label: `🇩🇪 ${lang === 'de' ? 'Deutschland' : 'Germany'}` },
    { value: 'USA', label: '🇺🇸 USA' },
    { value: 'UK', label: `🇬🇧 ${lang === 'de' ? 'Großbritannien' : 'UK'}` },
    { value: 'Europe', label: `🇪🇺 ${lang === 'de' ? 'Europa' : 'Europe'}` },
    { value: 'Bangladesh', label: `🇧🇩 ${lang === 'de' ? 'Bangladesch' : 'Bangladesh'}` },
  ], [lang]);

  const getCountryFlag = (country: string) => {
    switch (country) {
      case 'Germany':
        return '🇩🇪';
      case 'Bangladesh':
        return '🇧🇩';
      case 'USA':
        return '🇺🇸';
      case 'UK':
        return '🇬🇧';
      case 'Europe':
        return '🇪🇺';
      default:
        return '🌐';
    }
  };

  // ─── Filtered Projects ──────────────────────────────────────────────────────
  const filteredProjects = useMemo(() => {
    return localizedProjects.filter((project) => {
      if (selectedCategory !== 'All' && project.category !== selectedCategory) {
        return false;
      }
      if (selectedCountry !== 'All' && project.clientCountry !== selectedCountry) {
        return false;
      }
      if (selectedStatus !== 'All' && project.status !== selectedStatus) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = project.title.toLowerCase().includes(q);
        const inDesc = project.description.toLowerCase().includes(q);
        const inClient = project.clientName.toLowerCase().includes(q);
        const inCountry = project.clientCountry.toLowerCase().includes(q);
        const inTech = project.techStack.some((t) => t.toLowerCase().includes(q));
        const inFeat = project.features.some((f) => f.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inClient && !inCountry && !inTech && !inFeat) {
          return false;
        }
      }
      return true;
    });
  }, [localizedProjects, selectedCategory, selectedCountry, selectedStatus, searchQuery]);

  const handleOpenOrder = (project: Project) => {
    setSelectedProjectForOrder(project);
    setOrderModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCountry('All');
    setSelectedStatus('All');
  };

  const estimatorResult = useMemo(() => {
    const data = {
      ecommerce: {
        turnkey: {
          time: lang === 'de' ? '7 - 14 Tage' : '7 - 14 Days',
          price: '$2,500 - $3,500',
          name: lang === 'de' ? 'Schlüsselfertiger E-Commerce Storefront' : 'Turnkey E-Commerce Storefront',
          stack: 'Next.js 15 / Shopify Plus API / Stripe'
        },
        growth: {
          time: lang === 'de' ? '2 - 3 Wochen' : '2 - 3 Weeks',
          price: '$3,800 - $6,500',
          name: lang === 'de' ? 'Individuelle Headless-Commerce-Plattform' : 'Custom Headless Commerce Platform',
          stack: 'Headless Shopify / Algolia Search / Klaviyo'
        },
        enterprise: {
          time: lang === 'de' ? '4 - 6 Wochen' : '4 - 6 Weeks',
          price: '$7,000 - $14,000',
          name: lang === 'de' ? 'Globales Multi-Vendor Handelsnetzwerk' : 'Multi-Vendor / Global Commerce Engine',
          stack: 'Microservices / Redis / Multi-Currency / ERP Sync'
        },
      },
      saas: {
        turnkey: {
          time: lang === 'de' ? '10 - 15 Tage' : '10 - 15 Days',
          price: '$3,000 - $4,500',
          name: lang === 'de' ? 'MVP SaaS-Portal & Auth-Starter' : 'MVP SaaS Portal & Auth Starter',
          stack: 'Next.js 15 / PostgreSQL / Prisma / Stripe Subscriptions'
        },
        growth: {
          time: lang === 'de' ? '3 - 4 Wochen' : '3 - 4 Weeks',
          price: '$5,000 - $8,500',
          name: lang === 'de' ? 'Full-Stack Mandantenfähige SaaS-Plattform' : 'Full-Stack Multi-Tenant SaaS Platform',
          stack: lang === 'de' ? 'React 19 / Node.js / WebSockets / Rollensystem' : 'React 19 / Node.js / WebSockets / Role-Based Access'
        },
        enterprise: {
          time: lang === 'de' ? '5 - 8 Wochen' : '5 - 8 Weeks',
          price: '$9,000 - $18,000',
          name: lang === 'de' ? 'Enterprise Cloud-Portal & Microservices' : 'Enterprise Cloud Portal & Microservices',
          stack: 'Kubernetes / TimescaleDB / Kafka / SOC2 Readiness'
        },
      },
      corporate: {
        turnkey: {
          time: lang === 'de' ? '5 - 10 Tage' : '5 - 10 Days',
          price: '$1,800 - $2,800',
          name: lang === 'de' ? 'Ultraschnelle Corporate Marken-Webseite' : 'Ultra-Fast Corporate Brand Experience',
          stack: 'Next.js 15 / Tailwind / Sanity CMS / 98+ PageSpeed'
        },
        growth: {
          time: lang === 'de' ? '2 - 3 Wochen' : '2 - 3 Weeks',
          price: '$3,200 - $5,000',
          name: lang === 'de' ? 'Interaktiver Corporate Hub mit Lead-CRM' : 'Interactive Corporate Hub with Lead CRM',
          stack: 'Custom GSAP Animations / HubSpot API / Multi-Language'
        },
        enterprise: {
          time: lang === 'de' ? '3 - 5 Wochen' : '3 - 5 Weeks',
          price: '$5,500 - $9,500',
          name: lang === 'de' ? 'Globales Multi-Regionen Unternehmensökosystem' : 'Global Multi-Region Corporate Ecosystem',
          stack: lang === 'de' ? 'Cloudflare Edge / DSGVO-Engine / Portale' : 'Cloudflare Edge / GDPR Engine / Custom Portals'
        },
      },
      cloud: {
        turnkey: {
          time: lang === 'de' ? '7 - 12 Tage' : '7 - 12 Days',
          price: '$2,800 - $4,000',
          name: lang === 'de' ? 'Cloud-API & Microservice Datenaufnahme' : 'Cloud API & Microservice Ingestion',
          stack: 'Node.js / Express / Redis / Docker / AWS'
        },
        growth: {
          time: lang === 'de' ? '2 - 4 Wochen' : '2 - 4 Weeks',
          price: '$4,500 - $7,500',
          name: lang === 'de' ? 'Hochdurchsatz-Telemetrie & Analyse-Grid' : 'High-Throughput Telemetry & Analytics Grid',
          stack: 'Fastify / TimescaleDB / Grafana / Prometheus'
        },
        enterprise: {
          time: lang === 'de' ? '4 - 8 Wochen' : '4 - 8 Weeks',
          price: '$8,500 - $16,000',
          name: lang === 'de' ? 'Verteiltes Multi-Cloud Enterprise-Netzwerk' : 'Multi-Cloud Distributed Enterprise Network',
          stack: 'AWS & GCP / Multi-Region K8s / TLS 1.3'
        },
      },
    };

    return data[estType][estTier];
  }, [estType, estTier, lang]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      
      {/* ─── Top Consistent Breadcrumb & Hero Banner ──────────────────────────── */}
      <Breadcrumb
        badge={lang === 'de' ? 'BEWÄHRTE ERFOLGE • DIREKT BESTELLBAR & EINSATZBEREIT' : 'PROVEN DELIVERIES • READY TO ORDER & LAUNCH'}
        title={lang === 'de' ? 'Enterprise Plattformen & Performante Webanwendungen' : 'Enterprise Platforms & Websites Built to Perform'}
        subtitle={
          lang === 'de'
            ? 'Entdecken Sie unsere produktiven Webanwendungen, Headless-Commerce-Systeme und SaaS-Plattformen in Deutschland, den USA und Europa. Wünschen Sie ein ähnliches System? Bestellen Sie einen schlüsselfertigen Klon oder ein maßgeschneidertes Projekt.'
            : 'Explore our production-grade web applications, headless commerce systems, and SaaS platforms deployed across Germany, the USA, and Europe. Need a similar site? Order an exact turnkey clone or request a custom bespoke build.'
        }
        items={[
          { label: lang === 'de' ? 'Startseite' : 'Home', onClick: () => router.push('/') },
          { label: lang === 'de' ? 'Projekte & Fallstudien' : 'Projects & Case Studies', active: true }
        ]}
        backAction={() => router.push('/')}
        backLabel={lang === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
        align="left"
      >
        {/* Quick Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSelectedProjectForOrder(localizedProjects[0] || null);
              setOrderModalOpen(true);
            }}
            className="bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl border border-[#9cd5e2] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>{lang === 'de' ? 'Ähnliche Website bestellen' : 'Order a Website Like These'}</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>

          <button
            type="button"
            onClick={() => setEstimatorOpen(!estimatorOpen)}
            className="bg-slate-900/85 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-700/80 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>
              {estimatorOpen
                ? (lang === 'de' ? 'Kalkulator ausblenden' : 'Hide Scope Calculator')
                : (lang === 'de' ? 'Interaktiver Budget- & Zeitkalkulator' : 'Interactive Scope & Price Estimator')}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${estimatorOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </Breadcrumb>

      {/* ─── Clean Airy Stats Row ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black font-['Archivo'] text-slate-950">
              {projects.length}+
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {lang === 'de' ? 'Erfolgreiche Fallstudien' : 'Production Case Studies'}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black font-['Archivo'] text-emerald-600 flex items-center gap-1.5">
              <span>100%</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {lang === 'de' ? 'Pünktliche Sprint-Lieferung' : 'On-Time Sprint Delivery'}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black font-['Archivo'] text-cyan-800">
              {lang === 'de' ? '7 - 14 Tage' : '7 - 14 Days'}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {lang === 'de' ? 'Schneller Turnkey-Launch' : 'Fast-Track Turnkey Launch'}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1 shadow-2xs">
            <div className="text-2xl sm:text-3xl font-black font-['Archivo'] text-slate-900">
              PMP® Scrum
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {lang === 'de' ? 'Deutsche Qualitätsführung' : 'European Quality Governance'}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Interactive Scope & Cost Estimator (Spacious & Clean) ──────────── */}
      {estimatorOpen && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 animate-fadeIn">
          <div className="bg-slate-50/90 border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-8 shadow-xs">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-cyan-800 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-700" />
                  <span>{lang === 'de' ? 'SOFORTIGER PROJEKT-KALKULATOR' : 'Instant Project Estimator'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 font-['Archivo']">
                  {lang === 'de' ? 'Konfigurieren Sie Ihre Website-Spezifikation' : 'Configure Your Website Specification'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {lang === 'de'
                    ? 'Wählen Sie Ihren Plattformtyp und die gewünschte Bereitstellungsstufe, um Zeitpläne, Tech-Stack und Preiskategorien einzusehen.'
                    : 'Pick your architecture type and target speed to view estimated timelines, stack, and pricing tiers.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEstimatorOpen(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-200/60 transition-colors self-start md:self-center cursor-pointer"
              >
                {lang === 'de' ? 'Kalkulator schließen ✕' : 'Close Calculator ✕'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
              
              {/* Step 1: Platform Type */}
              <div className="space-y-3">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  {lang === 'de' ? '1. Plattformtyp wählen' : '1. Choose Platform Type'}
                </label>
                <div className="space-y-2.5">
                  {[
                    { id: 'ecommerce', label: lang === 'de' ? 'E-Commerce Storefront' : 'E-Commerce Storefront', desc: lang === 'de' ? 'Shopify / Headless / Multi-Währung' : 'Shopify / Headless / Multi-Currency' },
                    { id: 'saas', label: lang === 'de' ? 'SaaS & Web-Portal' : 'SaaS & Web Portal', desc: lang === 'de' ? 'Auth, Abonnements, Dashboards' : 'Auth, Subscriptions, Dashboards' },
                    { id: 'corporate', label: lang === 'de' ? 'Corporate Marken-Webseite' : 'Corporate Brand Website', desc: lang === 'de' ? '98+ PageSpeed, CMS, Lead-Funnel' : '98+ PageSpeed, CMS, Lead Funnel' },
                    { id: 'cloud', label: lang === 'de' ? 'Cloud-API & Backend-Grid' : 'Cloud API & Backend Grid', desc: lang === 'de' ? 'Microservices, Telemetrie, High Volume' : 'Microservices, Telemetry, High Volume' },
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setEstType(item.id as any)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        estType === item.id
                          ? 'border-[#9cd5e2] bg-[#BBE7F1]/30 font-bold text-slate-950 shadow-2xs'
                          : 'border-slate-200/80 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="text-sm font-bold text-slate-900">{item.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Delivery Tier */}
              <div className="space-y-3">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  {lang === 'de' ? '2. Bereitstellungsstufe wählen' : '2. Choose Delivery Tier'}
                </label>
                <div className="space-y-2.5">
                  {[
                    { id: 'turnkey', label: lang === 'de' ? '⚡ Schlüsselfertiger Fast-Track' : '⚡ Turnkey Fast-Track', desc: lang === 'de' ? 'Schnellste 7-14 Tage • Bewährte Architektur' : 'Fastest 7-14 Days • Rebrand proven architecture' },
                    { id: 'growth', label: lang === 'de' ? '🛠️ Maßgeschneiderte Entwicklung' : '🛠️ Custom Tailored Build', desc: lang === 'de' ? '2-4 Wochen • Eigene APIs, Workflows & Design' : '2-4 Weeks • Custom APIs, workflows & distinct UI' },
                    { id: 'enterprise', label: lang === 'de' ? '🚀 Enterprise Senior Squad' : '🚀 Enterprise Bespoke', desc: lang === 'de' ? '4-8 Wochen • Komplettes Dediziertes Team' : '4-8 Weeks • Complete ground-up senior squad build' },
                  ].map((tier) => (
                    <div
                      key={tier.id}
                      onClick={() => setEstTier(tier.id as any)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        estTier === tier.id
                          ? 'border-[#9cd5e2] bg-[#BBE7F1]/30 font-bold text-slate-950 shadow-2xs'
                          : 'border-slate-200/80 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="text-sm font-bold text-slate-900">{tier.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{tier.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Result Summary Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-cyan-800 font-mono font-bold">
                    <span>{lang === 'de' ? 'GESCHÄTZTE SPEZIFIKATION' : 'ESTIMATED SPECIFICATION'}</span>
                    <span className="uppercase px-2 py-0.5 bg-slate-100 rounded-md">{estTier}</span>
                  </div>

                  <h4 className="text-lg font-bold font-['Archivo'] text-slate-950 leading-snug">
                    {estimatorResult.name}
                  </h4>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{lang === 'de' ? 'Lieferzeitraum:' : 'Delivery Timeline:'}</span>
                      <strong className="text-cyan-900 font-bold">{estimatorResult.time}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{lang === 'de' ? 'Geschätzte Investition:' : 'Est. Investment:'}</span>
                      <strong className="text-emerald-700 font-bold">{estimatorResult.price}</strong>
                    </div>
                    <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-600">
                      {lang === 'de' ? 'Tech-Stack:' : 'Tech Stack:'} <span className="font-mono font-medium text-slate-800">{estimatorResult.stack}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedProjectForOrder(localizedProjects[0] || null);
                    setOrderModalOpen(true);
                  }}
                  className="w-full bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-extrabold text-sm py-3.5 rounded-xl border border-[#9cd5e2] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>{lang === 'de' ? 'Diese Konfiguration anfragen' : 'Order This Exact Configuration'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ─── Search, Filters & View Options ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mb-12">
        
        {/* Search & Selectors Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Search Input with generous padding */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'de' ? 'Nach Stichworten, Technologien suchen (z. B. Next.js, Stripe, Shopify)...' : 'Search by keywords, technologies (e.g. Next.js, Stripe, Shopify)...'}
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-slate-200/90 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] focus:border-transparent transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Region, Status & Layout Controls */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Country Selector */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-200/90 rounded-xl px-3.5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] cursor-pointer shadow-2xs"
            >
              {countryOptions.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>

            {/* Status Selector */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-200/90 rounded-xl px-3.5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] cursor-pointer shadow-2xs"
            >
              <option value="All">{lang === 'de' ? 'Alle Status' : 'All Statuses'}</option>
              <option value="completed">{lang === 'de' ? 'Abgeschlossen & Live' : 'Delivered & Live'}</option>
              <option value="ongoing">{lang === 'de' ? 'In aktivem Sprint' : 'In Active Sprint'}</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                title="Grid View"
                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-950 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('expanded')}
                title="Expanded Case Studies"
                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'expanded'
                    ? 'bg-white text-slate-950 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Reset Filters */}
            {(selectedCategory !== 'All' || selectedCountry !== 'All' || selectedStatus !== 'All' || searchQuery !== '') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'de' ? 'Zurücksetzen' : 'Reset'}</span>
              </button>
            )}

          </div>

        </div>

        {/* Clean Category Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full touch-pan-x scroll-smooth">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === 'All' 
              ? localizedProjects.length 
              : localizedProjects.filter((p) => p.category === cat.id).length;

            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? 'bg-[#BBE7F1] text-slate-950 font-bold border border-[#9cd5e2] shadow-2xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
                <span className={`text-[11px] font-mono px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-slate-950 text-white' : 'bg-slate-200/80 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Counter and Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div>
            {lang === 'de' ? (
              <>Zeige <strong className="text-slate-900 font-bold">{filteredProjects.length}</strong> von <strong className="text-slate-900 font-bold">{projects.length}</strong> verifizierten Enterprise-Fallstudien</>
            ) : (
              <>Showing <strong className="text-slate-900 font-bold">{filteredProjects.length}</strong> of <strong className="text-slate-900 font-bold">{projects.length}</strong> verified enterprise case studies</>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {lang === 'de' ? 'Live im Betrieb' : 'Live Production'}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> {lang === 'de' ? 'Aktiver Sprint' : 'Active Sprint'}
            </span>
          </div>
        </div>

      </section>

      {/* ─── Projects Display Area (Spacious & Clean) ────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-slate-50/70 border border-slate-200/80 space-y-4">
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 font-['Archivo']">
              {lang === 'de' ? 'Keine passenden Projekte gefunden' : 'No matching projects found'}
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              {lang === 'de'
                ? 'Wir konnten keine Projekte finden, die Ihren aktuellen Filtern entsprechen. Bitte versuchen Sie einen anderen Suchbegriff oder setzen Sie alle Filter zurück.'
                : "We couldn't find any projects matching your current filters. Try changing your search query or reset all filters."}
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold text-xs px-6 py-3 rounded-xl border border-[#9cd5e2] cursor-pointer"
            >
              {lang === 'de' ? 'Alle Filter zurücksetzen' : 'Reset All Filters'}
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          
          /* ─── GRID VIEW: Airy, spacious cards ──────────────────────────────── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-[#9cd5e2] shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Content with generous breathing room */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-cyan-800 tracking-wide uppercase">
                        {project.category}
                      </span>
                      <span className="text-slate-500 font-medium truncate max-w-[140px] flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{project.clientName}</span>
                      </span>
                    </div>

                    <h3 
                      onClick={() => router.push(`/portfolio/${project.id}`)}
                      className="text-lg sm:text-xl font-bold text-slate-950 group-hover:text-cyan-800 transition-colors font-['Archivo'] leading-snug cursor-pointer line-clamp-1"
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {project.description}
                    </p>

                    {/* Impact / Metric pill */}
                    {project.metrics && (
                      <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100 text-xs text-emerald-900 flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate font-semibold">{project.metrics}</span>
                      </div>
                    )}

                    {/* Investment & Timeline */}
                    {project.priceRange && (
                      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{lang === 'de' ? 'Geschätzt:' : 'Est:'} <strong className="text-slate-900">{project.priceRange}</strong></span>
                        </span>
                        {project.estimatedDelivery && (
                          <span className="flex items-center gap-1 font-mono text-[11px]">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{project.estimatedDelivery}</span>
                          </span>
                        )}
                      </div>
                    )}

                    {/* Tech Stack Chips */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      {project.techStack.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2.5 py-0.5 rounded-md border border-slate-200/70"
                        >
                          {t}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-[11px] text-slate-500 font-mono font-semibold">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Clean Action Row */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleOpenOrder(project)}
                      className="flex-1 bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-extrabold text-xs py-3 px-4 rounded-xl border border-[#9cd5e2] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Zap className="w-3.5 h-3.5 text-slate-950" />
                      <span>{lang === 'de' ? 'Ähnliches bestellen' : 'Order Similar'}</span>
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-950 transition-colors flex items-center justify-center cursor-pointer"
                        title={lang === 'de' ? 'Live-Produktionsdemo ansehen' : 'View Live Production Demo'}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => router.push(`/portfolio/${project.id}`)}
                      className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-950 transition-colors flex items-center justify-center cursor-pointer"
                      title={lang === 'de' ? 'Vollständige Fallstudie lesen' : 'Read Full Case Study'}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </article>
            ))}
          </div>

        ) : (

          /* ─── EXPANDED VIEW: Spacious, editorial rows ─────────────────────── */
          <div className="space-y-8">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 hover:border-[#9cd5e2] shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col lg:flex-row gap-8 items-start group"
              >
                <div className="w-full lg:w-2/5 shrink-0 rounded-2xl overflow-hidden relative aspect-[16/10] bg-slate-100 border border-slate-200/70">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-800 uppercase">
                      {project.category} • {lang === 'de' ? 'Kunde:' : 'Client:'} {project.clientName}
                    </span>

                    {project.priceRange && (
                      <span className="text-xs font-mono font-bold text-slate-900 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
                        {lang === 'de' ? 'Geschätzt:' : 'Est:'} {project.priceRange} • {project.estimatedDelivery}
                      </span>
                    )}
                  </div>

                  <h3
                    onClick={() => router.push(`/portfolio/${project.id}`)}
                    className="text-2xl font-black font-['Archivo'] text-slate-950 group-hover:text-cyan-800 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {project.description}
                  </p>

                  {project.features && project.features.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {project.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-700 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold bg-slate-100 text-slate-800 px-3 py-1 rounded-lg border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => router.push(`/portfolio/${project.id}`)}
                        className="text-xs font-bold text-slate-700 hover:text-slate-950 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{lang === 'de' ? 'Vollständige Fallstudie' : 'Full Case Study'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-cyan-800 hover:text-cyan-950 px-4 py-2.5 rounded-xl border border-cyan-200 bg-cyan-50/50 hover:bg-cyan-50 transition-colors flex items-center gap-1.5"
                        >
                          <span>{lang === 'de' ? 'Live-System besuchen' : 'Visit Production'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenOrder(project)}
                      className="bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-xl border border-[#9cd5e2] transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
                    >
                      <Zap className="w-3.5 h-3.5 text-slate-950" />
                      <span>{lang === 'de' ? 'Diese Architektur bestellen' : 'Order This Architecture'}</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

        )}

      </main>

      {/* ─── Client Trust & Quality Guarantees (Spacious & Clean) ────────────── */}
      <section className="bg-slate-50/70 border-t border-b border-slate-200/80 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 text-cyan-800 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-cyan-700" />
              <span>{lang === 'de' ? 'ENTERPRISE-LIEFERSTANDARDS' : 'Enterprise Delivery Standards'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 font-['Archivo']">
              {lang === 'de' ? 'Warum weltweite Kunden Websites bei uns beauftragen' : 'Why Global Clients Buy Websites From Us'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {lang === 'de'
                ? 'Wir kombinieren deutsche Projektmanagement-Präzision mit agiler High-Speed-Softwareentwicklung.'
                : 'We combine European project management rigor with fast-paced engineering execution.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            <div className="p-7 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-800 flex items-center justify-center text-lg font-bold">
                🇩🇪
              </div>
              <h4 className="text-base font-bold text-slate-900 font-['Archivo']">
                {lang === 'de' ? 'PMP® Scrum-Leitung' : 'PMP® Scrum Governance'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {lang === 'de'
                  ? 'Direkte Steuerung durch unsere technische Projektleitung in Leverkusen, Deutschland. Strukturierte Jira-Sprints, transparente Berichte und klare Ergebnisse.'
                  : 'Direct oversight from our Leverkusen, Germany delivery lead. Structured Jira sprints, transparent reporting, and zero guesswork.'}
              </p>
            </div>

            <div className="p-7 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-lg font-bold">
                ⚡
              </div>
              <h4 className="text-base font-bold text-slate-900 font-['Archivo']">
                {lang === 'de' ? '95+ PageSpeed & Sauberer Code' : '95+ PageSpeed & Clean Code'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {lang === 'de'
                  ? 'Server-Antwortzeiten im Sub-Sekunden-Bereich, semantisches HTML5, keine überladenen Vorlagen und barrierefreie responsive UX auf allen Geräten.'
                  : 'Sub-second initial server response, semantic HTML5, zero bloated templates, and fully accessible responsive UX across all screens.'}
              </p>
            </div>

            <div className="p-7 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center text-lg font-bold">
                🔒
              </div>
              <h4 className="text-base font-bold text-slate-900 font-['Archivo']">
                {lang === 'de' ? '100% Volle IP- & Code-Eigentümerschaft' : '100% Full IP Ownership'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {lang === 'de'
                  ? 'Vollständige Übergabe des Git-Repositories nach Projektabschluss. Keine Lizenzfallen oder Abhängigkeiten. Ihr Code gehört zu 100% Ihnen.'
                  : 'Full Git repository handed over at completion. No recurring licensing traps, no proprietary lock-in. Your code is 100% yours.'}
              </p>
            </div>

            <div className="p-7 bg-white rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center text-lg font-bold">
                🤝
              </div>
              <h4 className="text-base font-bold text-slate-900 font-['Archivo']">
                {lang === 'de' ? '30 Tage Garantie nach Go-Live' : '30-Day Free Post-Launch Warranty'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {lang === 'de'
                  ? 'Wir bieten 30 Tage kostenfreie Fehlerbehebung, Verfügbarkeitsüberwachung und Team-Einführung für einen reibungslosen Start.'
                  : 'We provide 30 days of complimentary bug fixing, uptime monitoring, and staff training to ensure your launch goes flawlessly.'}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ─── Bottom High-Converting Call to Action Banner ───────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 md:p-16 text-center relative overflow-hidden space-y-6 shadow-xl">
          
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#BBE7F1]/20 border border-[#9cd5e2]/40 text-[#BBE7F1] text-xs font-mono font-bold tracking-wider uppercase">
            <span>{lang === 'de' ? 'BEREIT FÜR DEN LAUNCH IHRER PLATTFORM?' : 'READY TO LAUNCH YOUR PLATFORM?'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Archivo'] max-w-2xl mx-auto tracking-tight">
            {lang === 'de'
              ? 'Benötigen Sie eine Website, die exakt auf Ihre Geschäftsziele abgestimmt ist?'
              : 'Need a Website Tailored to Your Specific Business Goals?'}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            {lang === 'de'
              ? 'Senden Sie uns Ihre Anforderungen oder wählen Sie eines der obigen Projekte aus. Wir analysieren Ihre Spezifikation und erstellen innerhalb von 24 Stunden ein verbindliches Festpreisangebot mit Sprint-Roadmap.'
              : 'Send us your requirements or choose any project above. We will analyze your specifications and provide an exact fixed-price proposal and sprint roadmap within 24 hours.'}
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                setSelectedProjectForOrder(localizedProjects[0] || null);
                setOrderModalOpen(true);
              }}
              className="bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-extrabold text-sm px-8 py-4 rounded-xl border border-[#9cd5e2] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>{lang === 'de' ? 'Projekt anfragen / bestellen' : 'Order / Inquire About Any Project'}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              type="button"
              onClick={() => router.push('/contact')}
              className="bg-white/10 hover:bg-white/15 text-white font-bold text-sm px-7 py-4 rounded-xl border border-white/20 transition-colors cursor-pointer"
            >
              <span>{lang === 'de' ? 'Individuelle Anforderungen einreichen' : 'Submit Custom Requirements'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* ─── Modals ─────────────────────────────────────────────────────────── */}
      <ProjectOrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        project={selectedProjectForOrder}
        allProjects={projects}
      />

      <ProjectDetailModal
        project={selectedProjectForPreview}
        onClose={() => setPreviewModalOpen(false)}
        onGetQuoteForSimilar={() => {
          setPreviewModalOpen(false);
          if (selectedProjectForPreview) {
            handleOpenOrder(selectedProjectForPreview);
          }
        }}
      />

    </div>
  );
};
