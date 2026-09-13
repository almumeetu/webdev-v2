import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowUpRight, Award, ShieldCheck, Globe, Users, MessageSquare, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { TeamMember } from '../types';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { useLanguage } from '../context/LanguageContext';
import { gsap, useGsapContext, animateStagger } from '../utils/gsapHelper';

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
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Responsive items per view calculation
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, teamMembers.length - itemsPerView);

  // Ensure currentIndex stays within bounds when itemsPerView changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Autoplay functionality
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (isHovered || teamMembers.length <= itemsPerView) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide, teamMembers.length, itemsPerView]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Header animation
    gsap.fromTo(
      '.team-header-anim',
      { opacity: 0, y: isMobile ? 12 : 25 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.35 : 0.65,
        stagger: isMobile ? 0.04 : 0.1,
        ease: isMobile ? 'power1.out' : 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 92%' : 'top 85%',
          once: true
        },
        clearProps: 'transform,opacity'
      }
    );

    // Stagger cards
    animateStagger('.team-card-item', sectionRef.current, 0.08, 20);
  });

  const getExperienceBadge = (member: TeamMember) => {
    if (member.id === 'team-3') {
      return '4+ Yrs Exp • Mobile & Web';
    }
    if (member.id === 'team-2') {
      return '10+ Yrs Exp • EU Delivery Lead';
    }
    return '4+ Yrs Exp • Full Stack & E-Com';
  };

  const getRoleShortBadge = (member: TeamMember) => {
    if (member.id === 'team-2') {
      return 'Founder & CEO | European Delivery Lead';
    }
    if (member.id === 'team-1') {
      return 'Full Stack Software Engineer';
    }
    return 'Mobile Application Engineer';
  };

  const getCardAccentGradient = (member: TeamMember) => {
    if (member.id === 'team-2') {
      return 'from-emerald-500 via-teal-500 to-indigo-600';
    }
    if (member.id === 'team-1') {
      return 'from-indigo-600 via-purple-600 to-pink-500';
    }
    return 'from-cyan-500 via-sky-500 to-blue-600';
  };

  const getWhatsAppLink = (member: TeamMember) => {
    if (member.id === 'team-2') {
      return 'https://wa.me/491729766016?text=Hello%20Md%20Moyen%20Uddin,%20I%20would%20like%20to%20consult%20regarding%20a%20project';
    }
    return 'https://wa.me/8801722301927?text=Hello%20WebDev%20Software%20Solutions,%20I%20would%20like%20to%20consult%20regarding%20a%20project';
  };

  const getImagePosition = (member: TeamMember) => {
    if (member.id === 'team-2' || member.image.includes('CEO')) {
      return 'object-[36%_50%]';
    }
    if (member.id === 'team-3' || member.image.includes('android-developer')) {
      return 'object-[center_46%]';
    }
    return 'object-[center_25%]';
  };

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-slate-50/60 text-slate-900 relative border-t border-slate-200/80 overflow-hidden">
      {/* Subtle clean agency ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.06),rgba(255,255,255,0))] pointer-events-none"></div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Slider Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-3xl space-y-2.5">
            <div className="team-header-anim inline-flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-indigo-600 uppercase font-mono">
                {t.teamKicker || 'EXECUTIVE LEADERSHIP & CORE ENGINEERS'}
              </span>
            </div>

            <h2 className="team-header-anim text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight font-['Outfit']">
              {t.teamHeading || 'Meet Our Senior Engineering Leadership'}
            </h2>

            <p className="team-header-anim text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed">
              {t.teamSubheading || 'High-caliber software engineers and European project leadership delivering enterprise-grade platforms.'}
            </p>
          </div>

          {/* Slider Controls (Prev / Next & Slide Counter) */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <div className="hidden sm:flex items-center text-xs font-mono font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
              <span className="text-indigo-600">{currentIndex + 1}</span>
              <span className="mx-1">/</span>
              <span>{Math.max(1, teamMembers.length - itemsPerView + 1)}</span>
            </div>

            <button
              onClick={prevSlide}
              aria-label="Previous Team Slide"
              className="w-10 h-10 rounded-xl bg-white hover:bg-indigo-50 active:bg-indigo-100 text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-300 flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next Team Slide"
              className="w-10 h-10 rounded-xl bg-white hover:bg-indigo-50 active:bg-indigo-100 text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-300 flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Slider Wrapper */}
        <div
          ref={sliderContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative overflow-hidden py-2"
        >
          {/* Animated Slider Track */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
            }}
          >
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="px-2.5 sm:px-3.5 shrink-0"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                {/* Compact Professional Team Card */}
                <div className="team-card-item group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-indigo-400/90 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_36px_-8px_rgba(79,70,229,0.18)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full overflow-hidden relative">
                  
                  {/* Top Accent Gradient Line */}
                  <div className={`h-1 w-full bg-gradient-to-r ${getCardAccentGradient(member)}`}></div>

                  {/* Properly Proportioned Portrait Frame */}
                  <div className="relative h-64 sm:h-72 lg:h-80 w-full overflow-hidden bg-gradient-to-b from-slate-100 via-slate-100 to-indigo-50/40">
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-full h-full object-cover ${getImagePosition(member)} group-hover:scale-105 transition-transform duration-500 ease-out`}
                    />

                    {/* Overlaid Badges: Country Flag & Active Indicator */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none gap-2">
                      <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-800 shadow-2xs border border-slate-200/80 shrink-0 whitespace-nowrap">
                        <span>{member.branch.includes('Germany') ? '🇩🇪' : '🇧🇩'}</span>
                        <span className="whitespace-nowrap">{member.branch.includes('Germany') ? 'Leverkusen (DE)' : 'Joypurhat (BD)'}</span>
                      </div>
                      
                      <div className="inline-flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-2xs border border-slate-700/60 shrink-0 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
                        <span className="whitespace-nowrap">{t.teamActiveLead || 'Active Lead'}</span>
                      </div>
                    </div>

                    {/* Floating Experience Tag over bottom edge */}
                    <div className="absolute inset-x-2.5 bottom-2.5 z-10 pointer-events-none">
                      <div className="bg-white/95 backdrop-blur-md rounded-xl px-3 py-1.5 border border-slate-200/90 shadow-xs flex items-center gap-2 text-[11px] sm:text-xs font-bold text-slate-900 truncate">
                        <Award className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="truncate">{getExperienceBadge(member)}</span>
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      {/* Compact Role Tag */}
                      <div className="inline-block text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/80 truncate max-w-full">
                        {getRoleShortBadge(member)}
                      </div>

                      {/* Name */}
                      <h3 className="text-lg sm:text-xl font-bold text-slate-950 group-hover:text-indigo-600 transition-colors font-['Outfit'] tracking-tight truncate">
                        {member.name}
                      </h3>

                      {/* Headline / Brief snippet */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                        {member.headline || member.bio}
                      </p>
                    </div>

                    {/* Compact Core Skills Tags */}
                    <div>
                      <div className="flex flex-wrap gap-1.5">
                        {member.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-semibold bg-slate-100/90 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200/80 group-hover:border-indigo-200 transition-colors truncate max-w-[130px]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Row */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      {/* Quick Contact Icons */}
                      <div className="flex items-center gap-1.5">
                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
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
                            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                            title={`${member.name} LinkedIn`}
                            aria-label="LinkedIn Profile"
                          >
                            <LinkedinIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {member.phone && (
                          <a
                            href={getWhatsAppLink(member)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                            title={`WhatsApp consultation with ${member.name}`}
                            aria-label="WhatsApp Contact"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {member.phone && (
                          <a
                            href={`tel:${member.phone}`}
                            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                            title={`Call ${member.name}`}
                            aria-label="Call directly"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      {/* View Profile Button */}
                      <button
                        onClick={() => onSelectMember(member)}
                        className="py-2 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs hover:shadow-md shrink-0 whitespace-nowrap"
                      >
                        <span>{t.teamViewProfile || 'Profile'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        {teamMembers.length > itemsPerView && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to team slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'w-7 bg-indigo-600'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Agency Credential Trust Bar */}
        <div className="mt-12 sm:mt-14 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200/70 text-indigo-600 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 font-['Outfit']">German & European Hub</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Real-time CET timezone collaboration from our Leverkusen (DE) office with full-throttle agile delivery.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/70 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 font-['Outfit']">European Compliance</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  German GDPR privacy frameworks, BaFin security audits, and ISO code governance across all client repositories.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/70 text-purple-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 font-['Outfit']">Direct Architect Access</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Zero junior layering. Enterprise clients collaborate directly with principal architects and technical leads.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Bottom Action */}
        <div className="mt-10 text-center">
          <button
            onClick={onViewAllTeam}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[44px]"
          >
            <span>Explore All Team Credentials & Case Studies</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
