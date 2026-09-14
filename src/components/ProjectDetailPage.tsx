import React, { useRef } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Globe, 
  Calendar, 
  Layers, 
  ExternalLink, 
  ShieldCheck, 
  TrendingUp, 
  ArrowLeft,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Project } from '../types';
import { useGsapContext } from '../utils/gsapHelper';
import gsap from 'gsap';
import { BreadcrumbBar } from './Breadcrumb';


interface ProjectDetailPageProps {
  project: Project | null;
  onBack: () => void;
  onBackToHome?: () => void;
  onGetQuoteForSimilar: (projectTitle: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onBackToHome,
  onGetQuoteForSimilar,
}) => {
  const pageRef = useRef<HTMLDivElement>(null);

  useGsapContext(pageRef, () => {
    if (!pageRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    gsap.fromTo(
      '.proj-anim-fade',
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

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-3 font-['Archivo']">
          Project Case Study Not Found
        </h2>
        <button
          onClick={onBack}
          className="bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 border border-[#9cd5e2] text-xs font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer"
        >
          ← Return to Portfolio
        </button>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-white text-slate-900">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-2">
        <BreadcrumbBar
          items={[
            { label: 'Home', onClick: onBackToHome },
            { label: 'Case Studies & Portfolio', onClick: onBack },
            { label: project.title, active: true }
          ]}
          backAction={onBack}
          backLabel="Back to Portfolio"
        />
      </div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 py-6 sm:py-8">

        {/* Project Hero Banner */}
        <div className="proj-anim-fade relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
          {project.image && project.image.trim() !== '' ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xs font-mono font-bold uppercase tracking-wider bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] px-3.5 py-1.5 rounded-full">
                {project.category}
              </span>
              {project.status === 'completed' ? (
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500 text-white px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> <span className="whitespace-nowrap">Completed & Deployed</span>
                </span>
              ) : (
                <span className="text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                  <Clock className="w-3.5 h-3.5 shrink-0" /> <span className="whitespace-nowrap">Ongoing Live Project</span>
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold font-['Archivo'] tracking-tight leading-snug">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Metadata Strip */}
        <div className="proj-anim-fade grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Client Organization</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1">{project.clientName}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Client Region</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-cyan-700" />
              <span>{project.clientCountry}</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Delivery Date</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900 mt-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-700" />
              <span>{project.completionDate}</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Production URL</div>
            <div className="text-xs sm:text-sm font-bold mt-1">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-800 hover:text-cyan-900 font-bold flex items-center gap-1"
                >
                  <span>Visit Live</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-slate-400">Enterprise Private</span>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="proj-anim-fade space-y-8">
          
          {/* Executive Overview */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider font-['Archivo']">
              Architecture & System Overview
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Deliverables & Features */}
          {project.features && project.features.length > 0 && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 font-['Archivo'] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cyan-700" />
                <span>Engineered Core Deliverables</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-700 mt-2 shrink-0"></span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance Metrics */}
          {project.metrics && (
            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="whitespace-nowrap">Verified Impact & Performance</span>
              </div>
              <p className="text-sm font-semibold text-emerald-950">
                {project.metrics}
              </p>
            </div>
          )}

          {/* Tech Stack */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Applied Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onBack}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl transition-all cursor-pointer"
            >
              ← Back to Portfolio
            </button>

            <button
              onClick={() => onGetQuoteForSimilar(project.title)}
              className="bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl border border-[#9cd5e2] shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Request Similar Architecture</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
