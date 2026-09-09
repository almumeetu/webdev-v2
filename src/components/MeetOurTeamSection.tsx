import React, { useRef } from 'react';
import { MapPin, Mail, ArrowUpRight, Github, Linkedin, Award } from 'lucide-react';
import { TeamMember } from '../types';
import { useGsapContext, animateStagger } from '../utils/gsapHelper';
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
    animateStagger('.team-card-item', sectionRef.current, 0.12, 35);
  });

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-28 bg-[#f8fafc] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Frame 00:06 */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="team-header-anim inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase font-mono">
              MEET OUR TEAM
            </span>
          </div>

          <h2 className="team-header-anim text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
            Meet our team of experts
          </h2>

          <p className="team-header-anim text-slate-600 text-sm sm:text-base">
            Engineered by seasoned full-stack developers, cloud architects, and product leads located in Joypurhat, Bangladesh, and Leverkusen, Germany.
          </p>
        </div>

        {/* Team Grid with top curved portrait cards matching reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {teamMembers.slice(0, 4).map((member) => (
            <div
              key={member.id}
              onClick={() => onSelectMember(member)}
              className="team-card-item group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-slate-100 flex flex-col"
            >
              {/* Photo with rounded top and subtle gradient overlay */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Branch Location Badge */}
                <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-white flex items-center gap-1 border border-slate-700">
                  <MapPin className="w-3 h-3 text-indigo-400" />
                  <span className="truncate max-w-[120px]">{member.branch.split(',')[0]}</span>
                </div>

                {/* Hover reveal overlay */}
                <div className="absolute inset-0 bg-indigo-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1">
                    View Profile <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Name & Role below portrait */}
              <div className="p-5 text-center flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-['Outfit']">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">
                    {member.role}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>{member.experienceYears}+ yrs exp</span>
                  <span className="text-indigo-600 font-semibold">{member.skills[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all team members button */}
        <div className="mt-12 text-center">
          <button
            onClick={onViewAllTeam}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm px-6 py-3.5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition-all min-h-[44px] cursor-pointer"
          >
            <span>Meet All {teamMembers.length} Team Members & Leadership</span>
            <ArrowUpRight className="w-4 h-4 text-indigo-600" />
          </button>
        </div>

      </div>
    </section>
  );
};
