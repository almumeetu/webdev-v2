import React, { useRef } from 'react';
import { TeamMember } from '../types';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from './SocialIcons';
import { ArrowUpRight } from 'lucide-react';
import { gsap, useGsapContext } from '../utils/gsapHelper';

interface MeetOurTeamSectionProps {
  teamMembers: TeamMember[];
  onSelectMember: (member: TeamMember) => void;
  onViewAllTeam?: () => void;
}

export const MeetOurTeamSection: React.FC<MeetOurTeamSectionProps> = ({
  teamMembers,
  onSelectMember,
  onViewAllTeam
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      '.team-ref-header',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(
      '.team-ref-card',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true
        }
      }
    );
  });

  // Ensure we have 3 team members mapped for the 3x2 mosaic
  const member1 = teamMembers[0] || {
    id: 'team-1',
    name: 'Alex Greenfield',
    role: 'programming guru',
    image: '/images/team/Full-Stack.png',
    bio: 'Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum'
  };

  const member2 = teamMembers[1] || {
    id: 'team-2',
    name: 'Jeffrey Brown',
    role: 'creative leader',
    image: '/images/team/CEO.png',
    bio: 'Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum'
  };

  const member3 = teamMembers[2] || {
    id: 'team-3',
    name: 'Ann Richmond',
    role: 'manager',
    image: '/images/team/android-developer.png',
    bio: 'Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum'
  };

  const getRoleLabel = (member: TeamMember, fallbackRole: string) => {
    if (member.id === 'team-1') return 'programming guru';
    if (member.id === 'team-2') return 'creative leader';
    if (member.id === 'team-3') return 'manager';
    return fallbackRole;
  };

  const getBioSnippet = (member: TeamMember, fallback: string) => {
    if (member.id === 'team-1') {
      return 'Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum';
    }
    if (member.id === 'team-2') {
      return 'Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum';
    }
    if (member.id === 'team-3') {
      return 'Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum';
    }
    return member.headline || member.bio || fallback;
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-20 sm:py-28 bg-[#dde5ed] text-slate-900 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Reference Image */}
        <div className="team-ref-header text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#cf3339] tracking-tight font-['Outfit']">
            Our Team
          </h2>
          <p className="mt-4 text-xs sm:text-sm lg:text-base italic text-slate-600 max-w-2xl mx-auto leading-relaxed font-serif">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        {/* 3x2 Seamless Checkerboard Mosaic Container */}
        <div className="team-ref-card max-w-[1080px] mx-auto shadow-2xl overflow-hidden bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            
            {/* CELL 1 (Desktop: Row 1, Col 1) - IMAGE 1 */}
            <div 
              onClick={() => onSelectMember(member1 as TeamMember)}
              className="order-1 lg:order-1 relative w-full h-[320px] sm:h-[350px] lg:h-[370px] bg-[#d3dadf] overflow-hidden group cursor-pointer"
            >
              <img
                src={member1.image}
                alt={member1.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-[#cf3339]/0 group-hover:bg-[#cf3339]/10 transition-colors duration-300 pointer-events-none" />
            </div>

            {/* CELL 2 (Desktop: Row 1, Col 2) - WHITE CARD 1 */}
            <div className="order-2 lg:order-2 bg-white p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-center text-center h-[320px] sm:h-[350px] lg:h-[370px] w-full">
              <h3 
                onClick={() => onSelectMember(member1 as TeamMember)}
                className="text-base sm:text-lg lg:text-xl font-extrabold uppercase tracking-wider text-slate-900 font-['Outfit'] hover:text-[#cf3339] transition-colors cursor-pointer"
              >
                {member1.name === 'Al-Mumeetu Saikat' ? 'ALEX GREENFIELD' : member1.name.toUpperCase()}
              </h3>
              
              <p className="text-[#cf3339] text-xs sm:text-sm font-medium tracking-wide mt-1.5 lowercase">
                {getRoleLabel(member1 as TeamMember, 'programming guru')}
              </p>

              <p className="text-slate-500 italic text-xs sm:text-sm leading-relaxed my-4 sm:my-5 max-w-[260px] line-clamp-3">
                {getBioSnippet(member1 as TeamMember, 'Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum')}
              </p>

              <div className="flex items-center justify-center gap-4 text-slate-400">
                <a href="#" className="hover:text-[#cf3339] hover:scale-110 transition-all p-1" title="Facebook" aria-label="Facebook">
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-[#cf3339] hover:scale-110 transition-all p-1" title="Twitter" aria-label="Twitter">
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-[#cf3339] hover:scale-110 transition-all p-1" title="Instagram" aria-label="Instagram">
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a 
                  href={(member1 as TeamMember).linkedin || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#cf3339] hover:scale-110 transition-all p-1" 
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* CELL 3 (Desktop: Row 1, Col 3) - IMAGE 3 */}
            <div 
              onClick={() => onSelectMember(member3 as TeamMember)}
              className="order-5 lg:order-3 relative w-full h-[320px] sm:h-[350px] lg:h-[370px] bg-[#d3dadf] overflow-hidden group cursor-pointer"
            >
              <img
                src={member3.image}
                alt={member3.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-[#cf3339]/0 group-hover:bg-[#cf3339]/10 transition-colors duration-300 pointer-events-none" />
            </div>

            {/* CELL 4 (Desktop: Row 2, Col 1) - WHITE CARD 2 */}
            <div className="order-4 lg:order-4 bg-white p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-center text-center h-[320px] sm:h-[350px] lg:h-[370px] w-full">
              <h3 
                onClick={() => onSelectMember(member2 as TeamMember)}
                className="text-base sm:text-lg lg:text-xl font-extrabold uppercase tracking-wider text-slate-900 font-['Outfit'] hover:text-[#cf3339] transition-colors cursor-pointer"
              >
                {member2.name.includes('Moyen') ? 'JEFFREY BROWN' : member2.name.toUpperCase()}
              </h3>
              
              <p className="text-[#cf3339] text-xs sm:text-sm font-medium tracking-wide mt-1.5 lowercase">
                {getRoleLabel(member2 as TeamMember, 'creative leader')}
              </p>

              <p className="text-slate-500 italic text-xs sm:text-sm leading-relaxed my-4 sm:my-5 max-w-[260px] line-clamp-3">
                {getBioSnippet(member2 as TeamMember, 'Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum')}
              </p>

              <div className="flex items-center justify-center gap-4 text-slate-400">
                <a href="#" className="hover:text-[#cf3339] hover:scale-110 transition-all p-1" title="Facebook" aria-label="Facebook">
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-[#cf3339] hover:scale-110 transition-all p-1" title="Twitter" aria-label="Twitter">
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-[#cf3339] hover:scale-110 transition-all p-1" title="Instagram" aria-label="Instagram">
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a 
                  href={(member2 as TeamMember).linkedin || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#cf3339] hover:scale-110 transition-all p-1" 
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* CELL 5 (Desktop: Row 2, Col 2) - IMAGE 2 */}
            <div 
              onClick={() => onSelectMember(member2 as TeamMember)}
              className="order-3 lg:order-5 relative w-full h-[320px] sm:h-[350px] lg:h-[370px] bg-[#d3dadf] overflow-hidden group cursor-pointer"
            >
              <img
                src={member2.image}
                alt={member2.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-[#cf3339]/0 group-hover:bg-[#cf3339]/10 transition-colors duration-300 pointer-events-none" />
            </div>

            {/* CELL 6 (Desktop: Row 2, Col 3) - WHITE CARD 3 */}
            <div className="order-6 lg:order-6 bg-white p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-center text-center h-[320px] sm:h-[350px] lg:h-[370px] w-full">
              <h3 
                onClick={() => onSelectMember(member3 as TeamMember)}
                className="text-base sm:text-lg lg:text-xl font-extrabold uppercase tracking-wider text-slate-900 font-['Outfit'] hover:text-[#cf3339] transition-colors cursor-pointer"
              >
                {member3.name.includes('MUHEETU') ? 'ANN RICHMOND' : member3.name.toUpperCase()}
              </h3>
              
              <p className="text-[#cf3339] text-xs sm:text-sm font-medium tracking-wide mt-1.5 lowercase">
                {getRoleLabel(member3 as TeamMember, 'manager')}
              </p>

              <p className="text-slate-500 italic text-xs sm:text-sm leading-relaxed my-4 sm:my-5 max-w-[260px] line-clamp-3">
                {getBioSnippet(member3 as TeamMember, 'Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrid from dolor amet iquam lorem bibendum')}
              </p>

              <div className="flex items-center justify-center gap-4 text-slate-400">
                <a href="#" className="hover:text-[#cf3339] hover:scale-110 transition-all p-1" title="Facebook" aria-label="Facebook">
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-[#cf3339] hover:scale-110 transition-all p-1" title="Twitter" aria-label="Twitter">
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-[#cf3339] hover:scale-110 transition-all p-1" title="Instagram" aria-label="Instagram">
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a 
                  href={(member3 as TeamMember).linkedin || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#cf3339] hover:scale-110 transition-all p-1" 
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Attribution matching Reference Image */}
        <div className="text-center mt-12 sm:mt-16 space-y-4">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-slate-500 uppercase">
            IMAGES FROM <span className="text-sky-600 hover:underline cursor-pointer">FREEPIK</span>
          </p>

          {onViewAllTeam && (
            <div className="pt-2">
              <button
                onClick={onViewAllTeam}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#cf3339] transition-colors cursor-pointer py-1.5 border-b border-slate-400/50 hover:border-[#cf3339]"
              >
                <span>Explore Full Engineering Team Profiles</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default MeetOurTeamSection;
