import React from 'react';
import { X, MapPin, Mail, Phone, Award, CheckCircle2, Briefcase, ArrowUpRight, User } from 'lucide-react';
import { TeamMember } from '../types';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { useLanguage } from '../context/LanguageContext';

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
  const { lang, t, localizeTeamMember } = useLanguage();
  const currentMember = member ? localizeTeamMember(member) : null;

  if (!currentMember) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200/90 relative my-8">
        
        {/* Header */}
        <div className="bg-[#090d18] text-white p-6 sm:p-8 relative overflow-hidden">
          {/* Subtle ambient light */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#BBE7F1]/10 rounded-full blur-3xl pointer-events-none"></div>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left relative z-10">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-800 border-2 border-[#9cd5e2] shadow-xl shrink-0 flex items-center justify-center">
              {currentMember.image && currentMember.image.trim() !== '' ? (
                <img
                  src={currentMember.image}
                  alt={currentMember.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <User className="w-12 h-12 text-slate-400" />
              )}
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-950 bg-[#BBE7F1] px-3 py-1 rounded-full border border-[#9cd5e2]">
                  {currentMember.branch}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{lang === 'de' ? 'Aktiver Lead' : 'Active Lead'}</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Kufam'] text-white">
                {currentMember.name}
              </h3>
              
              <p className="text-xs sm:text-sm font-semibold text-cyan-300 font-['Kufam']">
                {currentMember.role}
              </p>

              <div className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-3 pt-0.5">
                <span className="flex items-center gap-1 text-slate-300">
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{currentMember.experienceYears}+ {lang === 'de' ? 'Jahre Erfahrung' : 'Years Track Record'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 font-['Archivo']">
              {lang === 'de' ? 'Beruflicher Werdegang' : 'Professional Biography'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {currentMember.bio}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 font-['Archivo']">
              {lang === 'de' ? 'Zentrale Technische Kompetenzen & Schwerpunkte' : 'Core Technical Competencies & Specializations'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentMember.skills.map((skill, idx) => (
                <span key={idx} className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {currentMember.highlightedProjects && currentMember.highlightedProjects.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 font-['Archivo']">
                {lang === 'de' ? 'Wesentliche Beiträge & Kunden-Fallstudien' : 'Key Contributions & Signature Case Studies'}
              </h4>
              <div className="space-y-2">
                {currentMember.highlightedProjects.map((proj, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <Briefcase className="w-4 h-4 text-cyan-800 shrink-0" />
                    <span>{proj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact & Inquiry action */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {currentMember.github && (
                <a
                  href={currentMember.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white flex items-center justify-center transition-colors"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {currentMember.linkedin && (
                <a
                  href={currentMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-[#BBE7F1] text-slate-600 hover:text-slate-950 flex items-center justify-center transition-colors border border-transparent hover:border-[#9cd5e2]"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {currentMember.email && (
                <a
                  href={`mailto:${currentMember.email}`}
                  className="text-xs text-slate-600 hover:text-cyan-800 flex items-center gap-1.5 font-mono font-medium"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{currentMember.email}</span>
                </a>
              )}
            </div>

            <button
              onClick={() => {
                onClose();
                onContactLead(currentMember.name);
              }}
              className="bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] text-slate-950 border border-[#9cd5e2] text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <span>{lang === 'de' ? `Gespräch mit ${currentMember.name.split(' ')[0]} anfragen` : `Consult With ${currentMember.name.split(' ')[0]}`}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
