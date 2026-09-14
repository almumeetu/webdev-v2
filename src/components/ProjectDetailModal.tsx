import React from 'react';
import { X, CheckCircle2, Clock, Globe, Calendar, Layers, ExternalLink, ShieldCheck, TrendingUp } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onGetQuoteForSimilar: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onGetQuoteForSimilar,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 relative my-8">
        
        {/* Banner with close button */}
        <div className="relative h-64 sm:h-80 bg-slate-950 overflow-hidden">
          {project.image && project.image.trim() !== '' ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-center hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold uppercase tracking-wider bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] px-3 py-1 rounded-full">
                {project.category}
              </span>
              {project.status === 'completed' ? (
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/90 px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed Project
                </span>
              ) : (
                <span className="text-xs font-bold uppercase tracking-wider bg-amber-500/90 px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Ongoing Live Project
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Archivo']">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Quick Meta Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <div className="text-slate-400 font-semibold uppercase">Client</div>
              <div className="font-bold text-slate-800 mt-0.5">{project.clientName}</div>
            </div>
            <div>
              <div className="text-slate-400 font-semibold uppercase">Region</div>
              <div className="font-bold text-slate-800 mt-0.5 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-cyan-800" />
                {project.clientCountry}
              </div>
            </div>
            <div>
              <div className="text-slate-400 font-semibold uppercase">Timeline</div>
              <div className="font-bold text-slate-800 mt-0.5">{project.completionDate}</div>
            </div>
            <div>
              <div className="text-slate-400 font-semibold uppercase">Engagement Type</div>
              <div className="font-bold text-cyan-800 mt-0.5">Dedicated Agile Squad</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-['Archivo'] mb-2">
              Project Overview
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Deliverables & Features */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-['Archivo'] mb-3">
              Key Engineering Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-['Archivo'] mb-2">
              Technology Stack Used
            </h4>
            <div className="flex items-center gap-2 flex-wrap">
              {project.techStack.map((tech, i) => (
                <span key={i} className="text-xs font-semibold bg-[#BBE7F1]/30 text-slate-950 border border-[#9cd5e2] px-3 py-1 rounded-lg">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics Callout */}
          {project.metrics && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 text-white flex items-center gap-3 shadow-lg">
              <TrendingUp className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs text-cyan-300 uppercase font-mono font-bold">Business Outcome & Impact</div>
                <div className="text-sm font-bold">{project.metrics}</div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Close Window
            </button>

            <button
              onClick={() => {
                onClose();
                onGetQuoteForSimilar();
              }}
              className="bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] text-slate-950 border border-[#9cd5e2] text-xs font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Build A Similar Solution For Your Business</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
