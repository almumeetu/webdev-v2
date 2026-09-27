import React, { useState, useRef, useMemo } from 'react';
import { 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles,
  Code2,
  Server,
  ShoppingBag,
  Store,
  Laptop,
  ArrowRight,
  TrendingUp,
  Building2
} from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface RecentProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onViewAllProjects: () => void;
}

export const RecentProjectsSection: React.FC<RecentProjectsSectionProps> = ({
  projects,
  onSelectProject,
  onViewAllProjects
}) => {
  const { t, lang, localizeProject } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const sliderRef = useRef<HTMLDivElement>(null);

  const localizedProjects = useMemo(() => projects.map(p => localizeProject(p)), [projects, localizeProject]);

  const categories = [
    { name: 'All', label: t.portfolioAllCategory, icon: Sparkles },
    { name: 'Web Application', label: lang === 'de' ? 'Web-Anwendungen' : 'Web Application', icon: Laptop },
    { name: 'Full Stack & MERN', label: 'Full Stack & MERN', icon: Code2 },
    { name: 'Backend & Cloud', label: lang === 'de' ? 'Backend & Cloud' : 'Backend & Cloud', icon: Server },
    { name: 'E-Commerce', label: 'E-Commerce', icon: ShoppingBag },
    { name: 'WordPress & Shopify', label: 'WordPress & Shopify', icon: Store }
  ];

  // Filtering based on single-line category tabs
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return localizedProjects;
    return localizedProjects.filter((proj) => proj.category === selectedCategory);
  }, [localizedProjects, selectedCategory]);

  // Duplicate items for continuous seamless marquee loop
  const marqueeItems = useMemo(() => {
    if (filteredProjects.length === 0) return [];
    // Ensure we have at least 8 items for a smooth marquee loop
    let items = [...filteredProjects];
    while (items.length < 8) {
      items = [...items, ...filteredProjects];
    }
    return [...items, ...items];
  }, [filteredProjects]);

  return (
    <section 
      id="portfolio-section"
      className="py-16 sm:py-20 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-9">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-800 font-['Kufam'] text-xs sm:text-sm font-semibold tracking-wide mb-2">
              <span>{t.portfolioKicker}</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-[30px] font-bold text-slate-900 tracking-tight font-['Kufam']">
              {t.portfolioHeading}
            </h2>
          </div>

          {/* Clean Single-Line Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 max-w-full touch-pan-x scroll-smooth">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  type="button"
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 min-h-[38px] ${
                    isSelected
                      ? 'bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-slate-500'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Smooth Infinite Marquee Slider Container strictly within max-w-7xl container */}
        <div 
          ref={sliderRef}
          className="w-full overflow-hidden relative group/slider py-2 rounded-2xl"
        >
          {/* Subtle edge fade overlays matching section background */}
          <div className="absolute left-0 inset-y-0 w-8 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-8 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Continuous Marquee Track with slow graceful speed */}
          <div 
            className="animate-marquee flex gap-4 sm:gap-5 items-stretch"
            style={{ animationDuration: '85s' }}
          >
            {marqueeItems.map((project, idx) => (
              <div
                key={`${project.id}-${idx}`}
                onClick={() => onSelectProject(project)}
                className="w-[280px] xs:w-[310px] sm:w-[340px] shrink-0 bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-[#9cd5e2] shadow-xs hover:shadow-xl transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between group"
              >
                {/* Card Image Banner */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                  {project.image && project.image.trim() !== '' ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>



                  {/* Performance Metric Strip (Bottom of Image) */}
                  {project.metrics && (
                    <div className="absolute bottom-2.5 left-3 right-3 bg-slate-900 sm:bg-slate-950/85 sm:backdrop-blur-md text-white text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 z-10 border border-white/10 shadow-sm">
                      <TrendingUp className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate font-medium text-slate-200">{project.metrics}</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5 bg-white">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-mono font-bold text-cyan-800 tracking-wide">{project.category}</span>
                      <span className="text-slate-500 font-medium truncate max-w-[130px] flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{project.clientName}</span>
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-cyan-800 transition-colors font-['Archivo'] line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="mt-1.5 text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech pills & View button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                      {project.techStack.slice(0, 2).map((t, i) => (
                        <span key={i} className="text-xs bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md border border-slate-200/60 whitespace-nowrap">
                          {t}
                        </span>
                      ))}
                      {project.techStack.length > 2 && (
                        <span className="text-xs text-slate-500 font-mono font-semibold whitespace-nowrap">
                          +{project.techStack.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="inline-flex items-center gap-1 text-sm font-bold text-slate-950 group-hover:text-cyan-800 shrink-0 whitespace-nowrap">
                      <span className="whitespace-nowrap">{t.portfolioViewProject}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action inside container */}
        <div className="mt-9 text-center">
          <button
            onClick={onViewAllProjects}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-sm sm:text-base border border-slate-200 transition-all cursor-pointer min-h-[44px]"
          >
            <span>{t.portfolioViewAll}</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>

      </div>
    </section>
  );
};
