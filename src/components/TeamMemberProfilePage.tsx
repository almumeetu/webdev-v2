import React, { useRef } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Award, 
  CheckCircle2, 
  Briefcase, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Sparkles,
  Calendar,
  Layers,
  Clock
} from 'lucide-react';
import { TeamMember, Project } from '../types';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { useGsapContext } from '../utils/gsapHelper';
import gsap from 'gsap';
import { Breadcrumb } from './Breadcrumb';

interface TeamMemberProfilePageProps {
  member: TeamMember | null;
  onBack: () => void;
  onBackToHome?: () => void;
  onContactLead: (memberName: string) => void;
  onSelectProject?: (projectTitle: string) => void;
}

export const TeamMemberProfilePage: React.FC<TeamMemberProfilePageProps> = ({
  member,
  onBack,
  onBackToHome,
  onContactLead,
  onSelectProject
}) => {
  const pageRef = useRef<HTMLDivElement>(null);

  useGsapContext(pageRef, () => {
    if (!pageRef.current) return;

    gsap.fromTo(
      '.profile-anim-item',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out'
      }
    );
  });

  if (!member) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-3 font-['Outfit']">
          Specialist Profile Not Found
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          The requested leadership or engineering profile is unavailable.
        </p>
        <button
          onClick={onBack}
          className="bg-indigo-600 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md cursor-pointer"
        >
          ← Return to Leadership Team
        </button>
      </div>
    );
  }

  const isCEO = member.role.toLowerCase().includes('ceo') || member.role.toLowerCase().includes('founder');

  return (
    <div ref={pageRef} className="min-h-screen bg-white text-slate-900">
      {/* Top Standard Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', onClick: onBackToHome || onBack },
          { label: 'Engineering Team', onClick: onBack },
          { label: member.name, active: true }
        ]}
        backAction={onBack}
        backLabel="Back to Team"
      />

      {/* Subtle ambient light gradient */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-slate-50 via-white to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12 py-10">

        {/* Hero Section: Executive Portrait & Core Identification */}
        <div className="profile-anim-item bg-white rounded-3xl border border-slate-200/90 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Portrait Column */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xl group shrink-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
                
                {/* Floating branch badge */}
                <div className="absolute bottom-3 inset-x-3 bg-slate-950/85 backdrop-blur-md text-white text-[11px] font-medium py-1.5 px-3 rounded-xl border border-slate-800 flex items-center justify-center gap-1.5 shadow-sm">
                  <MapPin className="w-3 h-3 text-indigo-400" />
                  <span>{member.branch}</span>
                </div>
              </div>

              {/* Verified Badges */}
              <div className="mt-4 flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Lead
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  Verified Engineering Lead
                </span>
              </div>
            </div>

            {/* Core Info Column */}
            <div className="lg:col-span-8 space-y-5">
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold tracking-[0.2em] text-indigo-600 uppercase">
                  {member.role}
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight font-['Outfit']">
                  {member.name}
                </h1>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium pt-1">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span>{member.experienceYears}+ Years Industry Track Record & Technical Stewardship</span>
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {member.bio}
              </p>

              {/* Contact & Social Links Bar */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                      title="GitHub Profile"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-indigo-600 text-slate-700 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                      title="LinkedIn Profile"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 px-3.5 py-2.5 rounded-xl border border-slate-200/80 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{member.email}</span>
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 px-3.5 py-2.5 rounded-xl border border-slate-200/80 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{member.phone}</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => onContactLead(member.name)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Consultation With {member.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Grid: Competencies & Case Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Dossier Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Core Competencies */}
            <div className="profile-anim-item bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-['Outfit'] flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <span>Core Architectural Competencies & Tech Stack</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Technologies, frameworks, and methodologies continuously applied across mission-critical client systems.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {member.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold bg-slate-50 text-slate-800 px-3.5 py-2 rounded-xl border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Signature Project Highlights */}
            {member.highlightedProjects && member.highlightedProjects.length > 0 && (
              <div className="profile-anim-item bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-5 shadow-xs">
                <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-['Outfit'] flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  <span>Signature Project Contributions & Deliverables</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Enterprise-grade platforms and systems engineered under {member.name}'s direct supervision.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {member.highlightedProjects.map((projTitle, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSelectProject && onSelectProject(projTitle)}
                      className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 font-bold">
                          Client Case Study {idx + 1}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-['Outfit']">
                          {projTitle}
                        </h3>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                        <span>Production Deployment</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-indigo-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Engineering Standards & Philosophy */}
            <div className="profile-anim-item bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-['Outfit'] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Governance, Security & Delivery Standards</span>
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  At <strong>WebDev Software Solutions</strong>, {member.name} adheres to zero-compromise architectural guidelines. All client repositories are maintained with automated continuous integration, strict TypeScript compilation, SonarQube static analysis, and German GDPR privacy standards.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>ISO-27001 Code Governance</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>BaFin & GDPR Data Privacy</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Zero-Downtime Blue/Green CI/CD</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Client Code Ownership</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Column: Office, Schedule, & Direct Consultation */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Office & Direct Contact Card */}
            <div className="profile-anim-item bg-slate-50 rounded-3xl border border-slate-200/90 p-6 sm:p-7 space-y-5">
              <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                Operational Headquarters
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Joypurhat Headquarters:</strong>
                    <span>Housing Estate, Word No: 07, Joypurhat-5900, Bangladesh</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200">
                  <Globe className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">European Operations:</strong>
                    <span>Heinrich-von-Stephan-Str., 51373 Leverkusen, Germany</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200">
                  <Clock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Active Timezone Coverage:</strong>
                    <span>14-Hour Working Overlap (GMT+6 / CET)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Consultation Box */}
            <div className="profile-anim-item bg-[#090d18] text-white rounded-3xl p-6 sm:p-7 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                Direct Client Advisory
              </div>
              <h3 className="text-lg font-bold font-['Outfit']">
                Engage With {member.name} Directly
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Schedule an architectural scoping session or technical feasibility review for your upcoming enterprise software initiative.
              </p>
              <button
                onClick={() => onContactLead(member.name)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Initiate Architecture Discussion</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
