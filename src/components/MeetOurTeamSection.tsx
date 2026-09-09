import React, { useRef } from 'react';
import { MapPin, Mail, ArrowUpRight, Award, Sparkles } from 'lucide-react';
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
    <section ref={sectionRef} className="py-20 sm:py-24 lg:py-32 bg-[#f8fafc] text-slate-900 relative overflow-hidden">
      {/* Subtle decorative background accents */}
      <div className="absolute inset-0 bg-tech-circuit-light opacity-50 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-3">
          <div className="team-header-anim inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200/80 px-3.5 py-1.5 rounded-full shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-indigo-700 uppercase font-mono">
              EXECUTIVE LEADERSHIP & CORE TEAM
            </span>
          </div>

          <h2 className="team-header-anim text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight font-['Outfit']">
            Meet The Minds Behind WebDev
          </h2>

          <p className="team-header-anim text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Senior full-stack architects, engineering leaders, and mobile specialists based in Joypurhat, Bangladesh delivering world-class digital solutions for global enterprises.
          </p>
        </div>

        {/* International Standard 3-Column Executive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto items-stretch">
          {teamMembers.slice(0, 3).map((member, index) => {
            const isCEO = member.role.toLowerCase().includes('ceo') || index === 1;

            return (
              <div
                key={member.id}
                className={`team-card-item group bg-white rounded-3xl p-7 sm:p-8 border transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center relative shadow-lg hover:shadow-2xl ${
                  isCEO 
                    ? 'border-indigo-400/80 ring-2 ring-indigo-500/20 bg-gradient-to-b from-white via-white to-indigo-50/30' 
                    : 'border-slate-200/90'
                }`}
              >
                {/* Crown / Leadership badge for CEO */}
                {isCEO && (
                  <div className="absolute -top-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] sm:text-[11px] font-bold tracking-widest uppercase px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Executive Leadership</span>
                  </div>
                )}

                {/* High-end Circular Portrait with Gradient Ring (No Awkward Cropping) */}
                <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-xl group-hover:scale-105 transition-transform duration-300 mb-6 shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full bg-slate-100 shadow-inner"
                  />
                  {/* Subtle location pin badge */}
                  <div className="absolute bottom-1 right-1 bg-slate-900/90 backdrop-blur-md text-[10px] text-white font-medium px-2 py-0.5 rounded-full border border-slate-700 flex items-center gap-1 shadow-sm">
                    <MapPin className="w-2.5 h-2.5 text-indigo-400" />
                    <span>BD</span>
                  </div>
                </div>

                {/* Role Pill */}
                <div className="mb-2.5">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-mono bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                    {member.role}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 group-hover:text-indigo-600 transition-colors font-['Outfit']">
                  {member.name}
                </h3>

                {/* Experience counter */}
                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium mt-1 mb-3">
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{member.experienceYears}+ Years Industry Experience</span>
                </div>

                {/* Bio text */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 flex-grow line-clamp-3">
                  {member.bio}
                </p>

                {/* Skill Chips */}
                <div className="w-full mb-6 pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {member.skills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 px-2.5 py-1 rounded-lg border border-slate-200/60 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social & Contact Actions */}
                <div className="w-full flex items-center justify-center gap-3 pt-2">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                      title={`${member.name} GitHub`}
                      aria-label="GitHub Profile"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                      title={`${member.name} LinkedIn`}
                      aria-label="LinkedIn Profile"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                      title={`Email ${member.name}`}
                      aria-label="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Direct View Profile Trigger */}
                <button
                  onClick={() => onSelectMember(member)}
                  className="w-full mt-4 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white border border-slate-200 hover:border-indigo-600 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group/btn cursor-pointer shadow-xs"
                >
                  <span>View Specialist Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* View all team button */}
        <div className="mt-14 text-center">
          <button
            onClick={onViewAllTeam}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm px-7 py-3.5 rounded-xl border border-slate-300 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <span>Explore Team Credentials & Case Studies</span>
            <ArrowUpRight className="w-4 h-4 text-indigo-600" />
          </button>
        </div>

      </div>
    </section>
  );
};
