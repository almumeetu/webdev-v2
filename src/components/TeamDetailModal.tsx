import React from 'react';
import { X, MapPin, Mail, Phone, Linkedin, Github, Award, CheckCircle2, Briefcase } from 'lucide-react';
import { TeamMember } from '../types';

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 relative my-8">
        
        {/* Header */}
        <div className="bg-[#090d18] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-indigo-600 shadow-2xl"
            />
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/20 px-3 py-1 rounded-full">
                {member.branch}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
                {member.name}
              </h3>
              <p className="text-sm font-semibold text-slate-300">
                {member.role}
              </p>
              <div className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-4 pt-1">
                <span>{member.experienceYears}+ Years Track Record</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">Active Specialist</span>
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
              Core Technical Competencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill, idx) => (
                <span key={idx} className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg border border-indigo-100">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {member.highlightedProjects && member.highlightedProjects.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 font-['Outfit']">
                Signature Project Contributions
              </h4>
              <div className="space-y-2">
                {member.highlightedProjects.map((proj, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
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
              <a
                href={`mailto:${member.email}`}
                className="text-xs text-slate-600 hover:text-indigo-600 flex items-center gap-1 font-mono"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{member.email}</span>
              </a>
            </div>

            <button
              onClick={() => {
                onClose();
                onContactLead(member.name);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all"
            >
              Consult With {member.name.split(' ')[0]}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
