import React, { useRef } from 'react';
import { MapPin, Mail, ArrowUpRight, Award, ShieldCheck, Globe, Users } from 'lucide-react';
import { TeamMember } from '../types';
import { useGsapContext, animateStagger } from '../utils/gsapHelper';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import gsap from 'gsap';

interface MeetOurTeamSectionProps {
  teamMembers: TeamMember[];
  onSelectMember: (member: TeamMember) => void;
  onViewAllTeam: () => void;
}

export const MeetOurTeamSection: React.FC<MeetOurTeamSectionProps> = ({
  teamMembers,
  onSelectMember,
  onViewAllTeam
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;

    // Header animation
    gsap.fromTo(
      '.team-header-anim',
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
    animateStagger('.team-card-item', sectionRef.current, 0.15, 35);
  });

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 lg:py-28 bg-white text-slate-900 relative border-t border-slate-100">
      {/* Subtle clean agency ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.05),rgba(255,255,255,0))] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="team-header-anim inline-flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase font-mono">
              EXECUTIVE LEADERSHIP & CORE ARCHITECTS
            </span>
          </div>

          <h2 className="team-header-anim text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight font-['Outfit']">
            Meet The Minds Behind WebDev
          </h2>

          <p className="team-header-anim text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Senior full-stack architects, engineering leaders, and mobile specialists based in Joypurhat, Bangladesh delivering world-class digital solutions with European architectural rigor.
          </p>
        </div>

        {/* Clean 3-Column Executive Portrait Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {teamMembers.slice(0, 3).map((member) => (
            <div
              key={member.id}
              className="team-card-item group bg-white rounded-3xl border border-slate-200/90 hover:border-indigo-400/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(79,70,229,0.12)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col overflow-hidden"
            >
              {/* Executive Portrait Frame */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-gradient-to-b from-slate-100 via-slate-100 to-indigo-50/50">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Overlaid Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none gap-2">
                  <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-800 shadow-sm border border-slate-200/60 shrink-0 whitespace-nowrap">
                    <MapPin className="w-3 h-3 text-indigo-600 shrink-0" />
                    <span className="whitespace-nowrap">{member.branch.includes('Germany') ? 'Leverkusen (DE)' : 'Joypurhat (BD) HQ'}</span>
                  </div>
                  
                  <div className="inline-flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-white shadow-sm border border-slate-700/60 shrink-0 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                    <span className="whitespace-nowrap">Active Lead</span>
                  </div>
                </div>

                {/* Subtle bottom shadow vignette */}
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/35 to-transparent pointer-events-none"></div>
              </div>

              {/* Card Details Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Role Kicker */}
                  <div className="text-[11px] font-mono font-bold tracking-wider text-indigo-600 uppercase mb-1">
                    {member.role}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 group-hover:text-indigo-600 transition-colors font-['Outfit']">
                    {member.name}
                  </h3>

                  {member.headline && (
                    <div className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                      {member.headline}
                    </div>
                  )}

                  {/* Experience Badge */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1 mb-3">
                    <Award className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{member.experienceYears}+ Years Track Record</span>
                  </div>

                  {/* Authentic Bio */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>

                {/* Tech Competency Chips */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                    Core Specialties
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-slate-50 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/80 group-hover:border-indigo-200 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Row */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                          title={`${member.name} GitHub`}
                          aria-label="GitHub Profile"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                          title={`${member.name} LinkedIn`}
                          aria-label="LinkedIn Profile"
                        >
                          <LinkedinIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                          title={`Email ${member.name}`}
                          aria-label="Send Email"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <span className="text-[11px] font-medium text-slate-400">
                      {member.highlightedProjects?.length || 3} Case Studies
                    </span>
                  </div>

                  {/* View Profile Button */}
                  <button
                    onClick={() => onSelectMember(member)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 group-hover:bg-indigo-600 text-slate-800 group-hover:text-white border border-slate-200 group-hover:border-indigo-600 text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0 whitespace-nowrap"
                  >
                    <span className="whitespace-nowrap">View Specialist Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Agency Credential Trust Bar */}
        <div className="mt-14 sm:mt-16 pt-10 border-t border-slate-200/80 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200/70 text-indigo-600 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-['Outfit']">Dual-Hub Synergy</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  14-hour overlapping timezone coverage bridging Joypurhat (BD) HQ and Leverkusen (DE) engineering teams.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/70 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-['Outfit']">European Compliance</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  German GDPR privacy frameworks, BaFin security audits, and strict ISO code governance across all client repositories.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/70 text-purple-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-['Outfit']">Direct Architect Access</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Zero junior layering. Enterprise clients collaborate directly with principal architects and technical founders.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* View all team button */}
        <div className="mt-12 text-center">
          <button
            onClick={onViewAllTeam}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Explore All Team Credentials & Case Studies</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

