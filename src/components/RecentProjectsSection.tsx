import React, { useState, useRef } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Globe, 
  ArrowUpRight, 
  Layers, 
  Filter, 
  ExternalLink 
} from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { useGsapContext, animateStagger } from '../utils/gsapHelper';
import gsap from 'gsap';

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
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'completed' | 'ongoing'>('all');
  const sectionRef = useRef<HTMLElement>(null);

  const categories = [
    'All',
    'Web Application',
    'Full Stack & MERN',
    'Backend & Cloud',
    'E-Commerce',
    'WordPress & Shopify'
  ];

  // Filtering
  const filteredProjects = projects.filter((proj) => {
    const matchesCat = selectedCategory === 'All' || proj.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || proj.status === selectedStatus;
    return matchesCat && matchesStatus;
  });

  // GSAP animation triggered on category / status filter changes and scroll
  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;

    // Header animation
    gsap.fromTo(
      '.portfolio-header-anim',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true
        }
      }
    );

    // Stagger cards
    animateStagger('.project-card-item', sectionRef.current, 0.12, 35);
  }, [selectedCategory, selectedStatus]);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-28 bg-[#f8fafc] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Frame 00:09 */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="portfolio-header-anim inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase font-mono">
              RECENT & ONGOING PROJECTS
            </span>
          </div>

          <h2 className="portfolio-header-anim text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
            Check our recent and ongoing work
          </h2>

          <p className="portfolio-header-anim text-slate-600 text-sm sm:text-base">
            Engineered with high precision across Joypurhat (BD) and Leverkusen (DE). Filter by technology category or delivery status.
          </p>
        </div>

        {/* Filter Controls: Clean & fully responsive */}
        <div className="portfolio-header-anim mb-10 flex flex-col items-center gap-4">
          
          {/* Status Segment (All, Completed, Ongoing) */}
          <div className="inline-flex items-center p-1 rounded-xl bg-white border border-slate-200 shadow-sm">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] cursor-pointer ${
                selectedStatus === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setSelectedStatus('completed')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] cursor-pointer flex items-center gap-1.5 ${
                selectedStatus === 'completed'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Recent Completed</span>
            </button>
            <button
              onClick={() => setSelectedStatus('ongoing')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] cursor-pointer flex items-center gap-1.5 ${
                selectedStatus === 'ongoing'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Ongoing Active</span>
            </button>
          </div>

          {/* Category Pills: cleanly wrapping on mobile/tablet */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[34px] cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Project Cards Grid matching Frame 00:09 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="project-card-item group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-slate-100 flex flex-col"
            >
              {/* Image banner with curved bottom mask matching reference video Frame 00:09 */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  {project.status === 'completed' ? (
                    <span className="inline-flex items-center gap-1 bg-emerald-500/95 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-sm">
                      <CheckCircle className="w-3 h-3" /> Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-amber-500/95 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-sm">
                      <Clock className="w-3 h-3 animate-spin" /> In Active Development
                    </span>
                  )}
                </div>

                {/* Country Badge */}
                <div className="absolute top-4 right-4 bg-slate-900/85 backdrop-blur-md text-slate-200 text-[11px] font-medium px-2.5 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-indigo-400" />
                  <span>{project.clientCountry}</span>
                </div>
              </div>

              {/* Card Footer matching Frame 00:09 typography */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-center bg-white">
                <div>
                  <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-indigo-600 uppercase font-mono mb-1.5 sm:mb-2">
                    {project.category}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-['Outfit']">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech chips & View details trigger */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {project.techStack.slice(0, 2).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 2 && (
                      <span className="text-[10px] text-slate-400">+{project.techStack.length - 2}</span>
                    )}
                  </div>

                  <div className="text-xs font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1">
                    <span>View Case</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* If no projects match filter */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">No projects found for the selected category.</p>
          </div>
        )}

      </div>
    </section>
  );
};
