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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const sliderRef = useRef<HTMLDivElement>(null);

  const categories = [
    { name: 'All', icon: Sparkles },
    { name: 'Web Application', icon: Laptop },
    { name: 'Full Stack & MERN', icon: Code2 },
    { name: 'Backend & Cloud', icon: Server },
    { name: 'E-Commerce', icon: ShoppingBag },
    { name: 'WordPress & Shopify', icon: Store }
  ];

  // Filtering based on single-line category tabs
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter((proj) => proj.category === selectedCategory);
  }, [projects, selectedCategory]);

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

  return (
    <section 
      id="portfolio-section"
      className="py-16 sm:py-20 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-9">
          <div>
            <div className="inline-flex items-center gap-2 mb-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase font-mono">
                RECENT & ONGOING PROJECTS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
              Check our{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-sky-600 bg-clip-text text-transparent">
                recent and ongoing work
              </span>
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
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 min-h-[38px] ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-600/30'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                  <span>{cat.name}</span>
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
                className="w-[280px] xs:w-[310px] sm:w-[340px] shrink-0 bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-indigo-400 shadow-xs hover:shadow-xl transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between group"
              >
                {/* Card Image Banner */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                  {/* Top Status & Country Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                      project.status === 'completed'
                        ? 'bg-emerald-600 sm:bg-emerald-600/90 sm:backdrop-blur-md text-white'
                        : 'bg-amber-600 sm:bg-amber-600/90 sm:backdrop-blur-md text-white'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
                      <span className="whitespace-nowrap">{project.status === 'completed' ? 'Delivered' : 'In Sprint'}</span>
                    </span>

                    <span className="text-xs bg-slate-900 sm:bg-slate-950/80 sm:backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/20 shadow-xs flex items-center gap-1.5 font-medium shrink-0 whitespace-nowrap">
                      <span className="shrink-0">{getCountryFlag(project.clientCountry)}</span>
                      <span className="text-[10px] font-semibold whitespace-nowrap">{project.clientCountry}</span>
                    </span>
                  </div>

                  {/* Performance Metric Strip (Bottom of Image) */}
                  {project.metrics && (
                    <div className="absolute bottom-2.5 left-3 right-3 bg-slate-900 sm:bg-slate-950/85 sm:backdrop-blur-md text-white text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 z-10 border border-white/10 shadow-sm">
                      <TrendingUp className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate font-medium text-slate-200">{project.metrics}</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5 bg-white">
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className="font-mono font-bold text-indigo-600 tracking-wide">{project.category}</span>
                      <span className="text-slate-500 font-medium truncate max-w-[130px] flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{project.clientName}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors font-['Outfit'] line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech pills & View button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                      {project.techStack.slice(0, 2).map((t, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md border border-slate-200/60 whitespace-nowrap">
                          {t}
                        </span>
                      ))}
                      {project.techStack.length > 2 && (
                        <span className="text-[10px] text-slate-500 font-mono font-semibold whitespace-nowrap">
                          +{project.techStack.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:text-indigo-700 shrink-0 whitespace-nowrap">
                      <span className="whitespace-nowrap">View Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
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
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 shadow-2xs hover:shadow transition-all cursor-pointer min-h-[44px]"
          >
            <span>Explore All 12+ Worldwide Case Studies</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </button>
        </div>

      </div>
    </section>
  );
};
