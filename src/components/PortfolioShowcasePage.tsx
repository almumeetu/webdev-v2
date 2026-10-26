'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  ExternalLink, 
  Clock, 
  Sparkles, 
  LayoutGrid,
  Code2, 
  Laptop, 
  Server, 
  Store, 
  ShoppingBag, 
  TrendingUp, 
  DollarSign, 
  Tag,
  ChevronRight
} from 'lucide-react';
import { Project } from '../types';
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
  const { lang, localizeProject } = useLanguage();

  // Localize all projects dynamically based on current language
  const localizedProjects = useMemo(() => {
    return projects.map((p) => localizeProject(p));
  }, [projects, localizeProject]);

  // ─── Filter & Search State ──────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedCountry, setSelectedCountry] = useState<string>(initialCountry || 'All');
  const [selectedStatus, setSelectedStatus] = useState<string>(initialStatus || 'All');

  // ─── Master-Detail Active Project State ─────────────────────────────────────
  const [activeProjectId, setActiveProjectId] = useState<string>(initialOrderId || (projects[0]?.id || ''));

  // ─── Preview Modal State ───────────────────────────────────────────────────
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedProjectForPreview, setSelectedProjectForPreview] = useState<Project | null>(null);

  // Keep "All" first and list every populated category alphabetically.
  const categories = useMemo(() => {
    const knownIcons: Record<string, any> = {
      'Web Application': Laptop,
      'Full Stack & MERN': Code2,
      'Backend & Cloud': Server,
      'E-Commerce': ShoppingBag,
      'WordPress & Shopify': Store,
    };

    const baseList = [
      { id: 'Web Application', label: lang === 'de' ? 'Web-Anwendungen' : 'Web Application', icon: Laptop },
      { id: 'Full Stack & MERN', label: lang === 'de' ? 'Full-Stack & MERN' : 'Full Stack & MERN', icon: Code2 },
      { id: 'Backend & Cloud', label: lang === 'de' ? 'Backend & Cloud' : 'Backend & Cloud', icon: Server },
      { id: 'E-Commerce', label: lang === 'de' ? 'E-Commerce' : 'E-Commerce', icon: ShoppingBag },
      { id: 'WordPress & Shopify', label: lang === 'de' ? 'WordPress & Shopify' : 'WordPress & Shopify', icon: Store },
    ];

    const categoryCounts = new Map<string, number>();
    localizedProjects.forEach(({ category }) => {
      if (category) categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
    });

    const availableCategories = new Set(categoryCounts.keys());
    const knownCategoryIds = new Set(baseList.map(({ id }) => id));
    const extraCategories = Array.from(availableCategories)
      .filter((id) => !knownCategoryIds.has(id))
      .map((id) => ({ id, label: id, icon: knownIcons[id] || Tag }));
    const sortedCategories = [
      ...baseList.filter(({ id }) => availableCategories.has(id)),
      ...extraCategories,
    ]
      .sort((a, b) => a.label.localeCompare(b.label, lang === 'de' ? 'de' : 'en', { sensitivity: 'base' }))
      .map((category) => ({ ...category, count: categoryCounts.get(category.id) || 0 }));

    return [
      { id: 'All', label: lang === 'de' ? 'Alle' : 'All', icon: LayoutGrid, count: localizedProjects.length },
      ...sortedCategories,
    ];
  }, [lang, localizedProjects]);

  const activeCategoryId = categories.some(({ id }) => id === selectedCategory)
    ? selectedCategory
    : 'All';

  const getCountryFlag = (country: string) => {
    switch (country) {
      case 'Germany': return '🇩🇪';
      case 'Bangladesh': return '🇧🇩';
      case 'USA': return '🇺🇸';
      case 'UK': return '🇬🇧';
      case 'Europe': return '🇪🇺';
      default: return '🌐';
    }
  };

  // ─── Filtered Projects ──────────────────────────────────────────────────────
  const filteredProjects = useMemo(() => {
    return localizedProjects.filter((project) => {
      if (activeCategoryId !== 'All' && project.category !== activeCategoryId) {
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
        const inTech = project.techStack?.some((t) => t.toLowerCase().includes(q));
        const inFeat = project.features?.some((f) => f.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inClient && !inCountry && !inTech && !inFeat) {
          return false;
        }
      }
      return true;
    });
  }, [localizedProjects, activeCategoryId, selectedCountry, selectedStatus, searchQuery]);

  // Active Project for Detail View:
  const activeProject = useMemo(() => {
    if (activeProjectId) {
      const found = filteredProjects.find((p) => p.id === activeProjectId);
      if (found) return found;
    }
    return filteredProjects[0] || null;
  }, [filteredProjects, activeProjectId]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      
      {/* ─── Top Consistent Breadcrumb & Hero Banner ──────────────────────────── */}
      <Breadcrumb
        badge={lang === 'de' ? 'BEWÄHRTE ERFOLGE • INNOVATIV & SKALIERBAR' : 'PROVEN DELIVERIES • PRODUCTION CASE STUDIES'}
        title={lang === 'de' ? 'Enterprise Plattformen & Performante Webanwendungen' : 'Enterprise Platforms & Websites Built to Perform'}
        items={[
          { label: lang === 'de' ? 'Startseite' : 'Home', onClick: () => router.push('/') },
          { label: lang === 'de' ? 'Projekte & Fallstudien' : 'Projects & Case Studies', active: true }
        ]}
        backAction={() => router.push('/')}
        backLabel={lang === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
        align="left"
      >
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/contact')}
            className="bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>{lang === 'de' ? 'Projekt unverbindlich anfragen' : 'Request Consultation'}</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </Breadcrumb>

      {/* ─── Category Tabs ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-7">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-800">
              Portfolio
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-slate-950">
              {lang === 'de' ? 'Nach Bereich stöbern' : 'Browse by category'}
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            {lang === 'de'
              ? `${localizedProjects.length} Projekte insgesamt`
              : `${localizedProjects.length} projects in total`}
          </p>
        </div>

        <div
          role="tablist"
          aria-label={lang === 'de' ? 'Portfolio-Kategorien' : 'Portfolio categories'}
          className="mt-4 flex items-center gap-2 overflow-x-auto rounded-2xl bg-slate-50/60 p-2 no-scrollbar touch-pan-x lg:flex-wrap lg:overflow-x-visible"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isSelected = activeCategoryId === category.id;

            return (
              <button
                type="button"
                role="tab"
                id={`portfolio-category-tab-${index}`}
                aria-controls="portfolio-projects-panel"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                onKeyDown={(event) => {
                  const lastIndex = categories.length - 1;
                  const currentIndex = categories.findIndex(({ id }) => id === category.id);
                  let nextIndex = currentIndex;

                  if (event.key === 'ArrowRight') nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
                  else if (event.key === 'ArrowLeft') nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
                  else if (event.key === 'Home') nextIndex = 0;
                  else if (event.key === 'End') nextIndex = lastIndex;
                  else return;

                  event.preventDefault();
                  const nextCategory = categories[nextIndex];
                  setSelectedCategory(nextCategory.id);
                  document.getElementById(`portfolio-category-tab-${nextIndex}`)?.focus();
                }}
                className={`group inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'bg-white text-slate-600 shadow-2xs hover:-translate-y-0.5 hover:bg-[#BBE7F1]/20 hover:text-slate-950'
                }`}
              >
                <Icon className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${
                  isSelected ? 'text-[#BBE7F1]' : 'text-slate-500 group-hover:text-cyan-800'
                }`} />
                <span>{category.label}</span>
                <span className={`min-w-6 rounded-md px-1.5 py-0.5 text-center text-[11px] font-mono ${
                  isSelected
                    ? 'bg-white/10 text-[#BBE7F1]'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-white'
                }`}>
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── Master-Detail Layout: Projects on Left Side, Selected Preview on Right Side ─ */}
      <main
        id="portfolio-projects-panel"
        role="tabpanel"
        aria-labelledby={`portfolio-category-tab-${Math.max(0, categories.findIndex(({ id }) => id === activeCategoryId))}`}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24"
      >
        
        {filteredProjects.length === 0 ? (
          <div className="py-20 px-6 text-center rounded-3xl bg-slate-50/70 space-y-3">
            <Sparkles className="w-10 h-10 text-cyan-700 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 font-['Archivo']">
              {lang === 'de' ? 'Keine passenden Projekte gefunden' : 'No matching projects found'}
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              {lang === 'de'
                ? 'Wählen Sie einen anderen Bereich, um weitere Projekte zu entdecken.'
                : 'Choose another category to explore more of our work.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ─── LEFT SIDE: Project Master List (lg:col-span-5) ───────────── */}
            <div className="lg:col-span-5">
              {/* Scrollable list of sleek project cards */}
              <div>
                {filteredProjects.map((project) => {
                  const isActive = activeProject?.id === project.id;
                  return (
                    <div
                      key={project.id}
                      onClick={() => setActiveProjectId(project.id)}
                      className={`p-3.5 sm:p-4 rounded-none border-b border-slate-100/90 last:border-b-0 transition-all duration-200 cursor-pointer flex gap-3.5 items-start group ${
                        isActive
                          ? 'bg-[#BBE7F1]/15 border-b-[#d8f0f4]'
                          : 'bg-white hover:bg-slate-50/60'
                      }`}
                    >
                      {/* Compact thumbnail */}
                      <div className="relative w-24 sm:w-28 aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Info on right side */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center justify-between gap-1 text-[11px]">
                          <span className="font-mono font-medium text-cyan-800 uppercase tracking-wide truncate">
                            {project.category}
                          </span>
                          <span className="text-slate-400 shrink-0">
                            {getCountryFlag(project.clientCountry)}
                          </span>
                        </div>

                        <h4 className={`text-sm font-semibold font-['Kufam'] leading-snug line-clamp-1 transition-colors ${
                          isActive ? 'text-slate-950 font-bold' : 'text-slate-900 group-hover:text-cyan-800'
                        }`}>
                          {project.title}
                        </h4>

                        <div className="flex items-center justify-between pt-0.5">
                          <div className="flex items-center gap-1">
                            {project.techStack?.slice(0, 2).map((tech, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                            {(project.techStack?.length || 0) > 2 && (
                              <span className="text-[10px] text-slate-400 font-mono">
                                +{(project.techStack?.length || 0) - 2}
                              </span>
                            )}
                          </div>

                          <span className={`text-[11px] font-medium flex items-center gap-0.5 ${
                            isActive ? 'text-cyan-800' : 'text-slate-400 group-hover:text-slate-700'
                          }`}>
                            <span>{lang === 'de' ? 'Details' : 'Preview'}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── RIGHT SIDE: Selected Project Interactive Detail Preview (lg:col-span-7) ─── */}
            <div className="lg:col-span-7 lg:sticky lg:top-24">
              {activeProject ? (
                <article className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 space-y-6">
                  
                  {/* Hero Cover Banner */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-2xs">
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Badges */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold border border-white/10 shadow-xs">
                        <span>{getCountryFlag(activeProject.clientCountry)}</span>
                        <span>{activeProject.clientName}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-xs font-mono font-bold text-[#BBE7F1] uppercase tracking-wider">
                        {activeProject.category}
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-['Archivo'] leading-tight drop-shadow-sm">
                        {activeProject.title}
                      </h3>
                    </div>
                  </div>

                  {/* Impact Metric Bar if available */}
                  {activeProject.metrics && (
                    <div className="p-3.5 rounded-xl bg-emerald-50/90 text-emerald-950 flex items-center gap-2.5 text-xs sm:text-sm">
                      <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-bold">{activeProject.metrics}</span>
                    </div>
                  )}


                  {/* Tech Stack Chips */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                      {lang === 'de' ? 'Eingesetzte Technologien' : 'Technologies Used'}
                    </h4>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {activeProject.techStack?.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-semibold bg-slate-100 text-slate-800 px-3 py-1 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Investment & Timeline Row */}
                  {(activeProject.priceRange || activeProject.estimatedDelivery) && (
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 text-xs text-slate-600">
                      {activeProject.priceRange && (
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4 text-emerald-600" />
                          <span>{lang === 'de' ? 'Geschätztes Budget:' : 'Estimated Range:'} <strong className="text-slate-900 font-bold">{activeProject.priceRange}</strong></span>
                        </div>
                      )}
                      {activeProject.estimatedDelivery && (
                        <div className="flex items-center gap-1.5 font-mono">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{activeProject.estimatedDelivery}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="pt-2 border-t border-slate-100/70 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => router.push(`/portfolio/${activeProject.id}`)}
                        className="text-xs font-bold text-slate-800 hover:text-slate-950 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{lang === 'de' ? 'Vollständige Fallstudie' : 'Full Case Study'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {activeProject.liveUrl && (
                        <a
                          href={activeProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-cyan-800 hover:text-cyan-950 px-4 py-3 rounded-xl bg-cyan-50/60 hover:bg-cyan-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                          title="Visit live system"
                        >
                          <span>{lang === 'de' ? 'Live Demo' : 'Live Demo'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => router.push(`/contact?project=${encodeURIComponent(activeProject.title)}`)}
                      className="bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>{lang === 'de' ? 'Ähnliches Projekt anfragen' : 'Request Similar Project'}</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </button>
                  </div>

                </article>
              ) : null}
            </div>

          </div>
        )}

      </main>

      {/* ─── Client Trust & Quality Guarantees (Spacious & Clean) ────────────── */}
      <section className="bg-slate-50/70 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-950">
              {lang === 'de' ? 'Warum weltweite Kunden Websites bei uns beauftragen' : 'Why Global Clients Buy Websites From Us'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {lang === 'de'
                ? 'Wir kombinieren deutsche Projektmanagement-Präzision mit agiler High-Speed-Softwareentwicklung.'
                : 'We combine European project management rigor with fast-paced engineering execution.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            <div className="p-7 bg-white rounded-3xl shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-800 flex items-center justify-center text-lg font-medium">
                🇩🇪
              </div>
              <h4 className="text-base font-semibold text-slate-900">
                {lang === 'de' ? 'PMP® Scrum-Leitung' : 'PMP® Scrum Governance'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {lang === 'de'
                  ? 'Direkte Steuerung durch unsere technische Projektleitung in Leverkusen, Deutschland. Strukturierte Jira-Sprints, transparente Berichte und klare Ergebnisse.'
                  : 'Direct oversight from our Leverkusen, Germany delivery lead. Structured Jira sprints, transparent reporting, and zero guesswork.'}
              </p>
            </div>

            <div className="p-7 bg-white rounded-3xl shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-lg font-medium">
                ⚡
              </div>
              <h4 className="text-base font-semibold text-slate-900">
                {lang === 'de' ? '95+ PageSpeed & Sauberer Code' : '95+ PageSpeed & Clean Code'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {lang === 'de'
                  ? 'Server-Antwortzeiten im Sub-Sekunden-Bereich, semantisches HTML5, keine überladenen Vorlagen und barrierefreie responsive UX auf allen Geräten.'
                  : 'Sub-second initial server response, semantic HTML5, zero bloated templates, and fully accessible responsive UX across all screens.'}
              </p>
            </div>

            <div className="p-7 bg-white rounded-3xl shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center text-lg font-medium">
                🔒
              </div>
              <h4 className="text-base font-semibold text-slate-900">
                {lang === 'de' ? '100% Volle IP- & Code-Eigentümerschaft' : '100% Full IP Ownership'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {lang === 'de'
                  ? 'Vollständige Übergabe des Git-Repositories nach Projektabschluss. Keine Lizenzfallen oder Abhängigkeiten. Ihr Code gehört zu 100% Ihnen.'
                  : 'Full Git repository handed over at completion. No recurring licensing traps, no proprietary lock-in. Your code is 100% yours.'}
              </p>
            </div>

            <div className="p-7 bg-white rounded-3xl shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center text-lg font-medium">
                🤝
              </div>
              <h4 className="text-base font-semibold text-slate-900">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24">
        <div className="bg-gradient-to-br from-[#BBE7F1]/25 via-white to-slate-50 text-slate-900 rounded-3xl p-8 sm:p-14 md:p-16 text-center relative overflow-hidden space-y-6 shadow-lg">
          
          {/* Subtle Ambient Light Blobs */}
          <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#BBE7F1]/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-cyan-200/35 blur-3xl" />
          
          <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#BBE7F1]/50 text-slate-950 text-xs font-mono font-semibold tracking-wider uppercase shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span>{lang === 'de' ? 'BEREIT FÜR DEN LAUNCH IHRER PLATTFORM?' : 'READY TO LAUNCH YOUR PLATFORM?'}</span>
          </div>

          <h2 className="relative z-10 text-xl sm:text-2xl md:text-3xl font-semibold text-slate-950 max-w-2xl mx-auto tracking-tight font-['Kufam']">
            {lang === 'de'
              ? 'Benötigen Sie eine Website, die exakt auf Ihre Geschäftsziele abgestimmt ist?'
              : 'Need a Website Tailored to Your Specific Business Goals?'}
          </h2>

          <p className="relative z-10 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            {lang === 'de'
              ? 'Senden Sie uns Ihre Anforderungen oder wählen Sie eines der obigen Projekte aus. Wir analysieren Ihre Spezifikation und erstellen innerhalb von 24 Stunden ein verbindliches Festpreisangebot mit Sprint-Roadmap.'
              : 'Send us your requirements or choose any project above. We will analyze your specifications and provide an exact fixed-price proposal and sprint roadmap within 24 hours.'}
          </p>

          <div className="relative z-10 pt-3 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => router.push('/contact')}
              className="bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-semibold text-sm px-8 py-4 rounded-xl transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <span>{lang === 'de' ? 'Projekt jetzt anfragen' : 'Inquire About Your Project'}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              type="button"
              onClick={() => router.push('/contact')}
              className="bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm px-7 py-4 rounded-xl transition-all duration-150 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <span>{lang === 'de' ? 'Individuelle Anforderungen einreichen' : 'Submit Custom Requirements'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* ─── Modals ─────────────────────────────────────────────────────────── */}
      <ProjectDetailModal
        project={selectedProjectForPreview}
        onClose={() => setPreviewModalOpen(false)}
        onGetQuoteForSimilar={() => {
          setPreviewModalOpen(false);
          if (selectedProjectForPreview) {
            router.push(`/contact?project=${encodeURIComponent(selectedProjectForPreview.title)}`);
          }
        }}
      />

    </div>
  );
};
