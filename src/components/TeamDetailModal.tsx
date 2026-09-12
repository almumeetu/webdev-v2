import React from 'react';
import { X, MapPin, Mail, Phone, Award, CheckCircle2, Briefcase, ArrowUpRight } from 'lucide-react';
import { TeamMember } from '../types';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

interface TeamDetailModalProps {
  member: TeamMember | null;
  onClose: () => void;
  onContactLead: (memberName: string) => void;
}

export const TeamDetailModal: React.FC<TeamDetailModalProps> = ({
  member,
  onClose,
  onContactLead
}) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200/90 relative my-8">
        
        {/* Header */}
        <div className="bg-[#090d18] text-white p-6 sm:p-8 relative overflow-hidden">
          {/* Subtle ambient light */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left relative z-10">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-800 border-2 border-indigo-500/50 shadow-xl shrink-0">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30">
                  {member.branch}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Active Lead</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-white">
                {member.name}
              </h3>
              
              <p className="text-sm font-semibold text-indigo-200">
                {member.role}
              </p>

              <div className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-3 pt-0.5">
                <span className="flex items-center gap-1 text-slate-300">
                  <Award className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{member.experienceYears}+ Years Track Record</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 font-['Outfit']">
              Professional Biography
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {member.bio}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 font-['Outfit']">
              Core Technical Competencies & Specializations
            </h4>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill, idx) => (
                <span key={idx} className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {member.highlightedProjects && member.highlightedProjects.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 font-['Outfit']">
                Key Contributions & Signature Case Studies
              </h4>
              <div className="space-y-2">
                {member.highlightedProjects.map((proj, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <Briefcase className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{proj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact & Inquiry action */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white flex items-center justify-center transition-colors"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white flex items-center justify-center transition-colors"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="text-xs text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 font-mono font-medium"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{member.email}</span>
                </a>
              )}
            </div>

            <button
              onClick={() => {
                onClose();
                onContactLead(member.name);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Consult With {member.name.split(' ')[0]}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
