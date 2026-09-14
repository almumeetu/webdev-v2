import React, { useRef } from 'react';
import { TeamMember } from '../types';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { ArrowUpRight, Phone, Mail, Sparkles, ShieldCheck, Crown, User } from 'lucide-react';
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

  const moyenUddin = teamMembers.find(m => m.id === 'team-2' || m.name.toLowerCase().includes('moyen')) || teamMembers[0];
  const saikat = teamMembers.find(m => m.id === 'team-1' || m.name.toLowerCase().includes('saikat')) || teamMembers[1] || teamMembers[0];
  const muheetu = teamMembers.find(m => m.id === 'team-3' || m.name.toLowerCase().includes('muheetu')) || teamMembers[2] || teamMembers[0];

  const getCleanRole = (member: TeamMember) => {
    if (member.id === 'team-2' || member.name.toLowerCase().includes('moyen')) return 'Founder & CEO | European Delivery Lead';
    if (member.id === 'team-1' || member.name.toLowerCase().includes('saikat')) return 'Full Stack Software Engineer & E-Commerce Lead';
    if (member.id === 'team-3' || member.name.toLowerCase().includes('muheetu')) return 'Mobile Application Engineer (Android & iOS)';
    return member.role.split('|')[0].trim();
  };

  const getCleanBio = (member: TeamMember) => {
    if (member.id === 'team-2' || member.name.toLowerCase().includes('moyen')) {
      return 'PMP® certified leader & Senior Software Engineer with 10+ years driving European agile software delivery, AWS cloud, and German GDPR compliance.';
    }
    if (member.id === 'team-1' || member.name.toLowerCase().includes('saikat')) {
      return 'Specialized in Next.js, React, Node.js, Express, and cloud server infrastructure for scalable enterprise web platforms.';
    }
    if (member.id === 'team-3' || member.name.toLowerCase().includes('muheetu')) {
      return 'Dedicated mobile specialist with 4+ years building high-performance native Android (Kotlin), iOS (Swift), and Flutter apps.';
    }
    return member.headline || member.bio.slice(0, 150) + '...';
  };

  const getImagePosition = (member: TeamMember) => {
    if (member.id === 'team-2' || member.image.includes('CEO') || member.name.toLowerCase().includes('moyen')) return 'object-[36%_20%]';
    if (member.id === 'team-3' || member.image.includes('android-developer') || member.name.toLowerCase().includes('muheetu')) return 'object-[center_35%]';
    return 'object-[center_15%]';
  };

  const getWhatsAppLink = (member: TeamMember) => {
    if (member.id === 'team-2' || member.name.toLowerCase().includes('moyen')) return 'https://wa.me/491729766016';
    return 'https://wa.me/8801722301927';
  };

  const renderContentCard = (member: TeamMember, isFeatured: boolean = false) => (
    <div className={`p-5 sm:p-6 lg:p-7 flex flex-col items-center justify-between text-center h-[340px] sm:h-[380px] lg:h-[420px] w-full transition-all ${
      isFeatured 
        ? 'bg-gradient-to-b from-amber-50/50 via-white to-white border-t-4 border-t-amber-500 shadow-inner' 
        : 'bg-white'
    }`}>
      {/* Top: Location, Experience & Name */}
      <div className="space-y-1.5 w-full">
        {isFeatured ? (
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/15 via-amber-600/15 to-[#BBE7F1]/40 border border-amber-500/40 text-amber-900 text-[10px] font-extrabold font-mono uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Executive Leadership</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 font-mono">
              Principal Solutions Architect • <span className="text-emerald-600 font-semibold">{member.experienceYears || 10}+ Yrs Exp</span>
            </span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-slate-500 font-mono uppercase tracking-wider">
            <span>{member.role.split('|')[0].trim()}</span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold">{member.experienceYears || 4}+ Yrs Exp</span>
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 pt-0.5">
          {isFeatured && <Crown className="w-4 h-4 text-amber-500 shrink-0" />}
          <h3
            onClick={() => onSelectMember(member)}
            className={`font-extrabold tracking-tight font-['Archivo'] hover:text-cyan-800 transition-colors cursor-pointer ${
              isFeatured 
                ? 'text-lg sm:text-xl lg:text-2xl text-slate-950 font-black' 
                : 'text-base sm:text-lg lg:text-xl text-slate-950'
            }`}
          >
            {member.name}
          </h3>
          {isFeatured && (
            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold border border-emerald-300">
              PMP®
            </span>
          )}
        </div>

        <p className={`text-xs sm:text-[13px] font-bold tracking-tight ${
          isFeatured ? 'text-amber-700 font-extrabold' : 'text-cyan-800'
        }`}>
          {getCleanRole(member)}
        </p>
      </div>

      {/* Middle: Short Bio */}
      <p className="text-slate-600 italic text-xs leading-relaxed my-2 max-w-[280px] line-clamp-3">
        "{getCleanBio(member)}"
      </p>

      {/* Core Skills Badges */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[300px]">
        {member.skills?.slice(0, 4).map((skill, idx) => {
          const isHighlightSkill = isFeatured && idx < 2;
          return (
            <span
              key={idx}
              className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                isHighlightSkill
                  ? 'bg-amber-100/90 text-amber-900 border-amber-300 font-bold'
                  : 'bg-slate-100/90 text-slate-700 border-slate-200/80'
              }`}
            >
              {skill}
            </span>
          );
        })}
      </div>

      {/* Bottom: Social Contact & Profile Action */}
      <div className="pt-3 border-t border-slate-100 w-full flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-slate-400">
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-900 text-slate-600 hover:text-white flex items-center justify-center transition-all shadow-2xs"
              title="GitHub Profile"
              aria-label="GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-sky-600 text-slate-600 hover:text-white flex items-center justify-center transition-all shadow-2xs"
              title="LinkedIn Profile"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {member.phone && (
            <a
              href={getWhatsAppLink(member)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white flex items-center justify-center transition-all shadow-2xs"
              title="Direct WhatsApp"
              aria-label="WhatsApp"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-[#BBE7F1] text-slate-600 hover:text-slate-950 flex items-center justify-center transition-all shadow-2xs"
              title="Direct Email"
              aria-label="Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        <button
          onClick={() => onSelectMember(member)}
          className={`inline-flex items-center gap-1 text-[11px] font-bold cursor-pointer uppercase tracking-wider px-2.5 py-1 rounded-md border transition-all ${
            isFeatured
              ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600'
              : 'bg-slate-50 hover:bg-[#BBE7F1]/50 text-slate-800 hover:text-slate-950 border-slate-200 hover:border-[#9cd5e2]'
          }`}
        >
          <span>{isFeatured ? 'Executive Profile' : 'Profile'}</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );

  const renderImageCard = (member: TeamMember, isFeatured: boolean = false) => (
    <div
      onClick={() => onSelectMember(member)}
      className="relative w-full h-[340px] sm:h-[380px] lg:h-[420px] bg-slate-200 overflow-hidden group cursor-pointer"
    >
      {member.image && member.image.trim() !== '' ? (
        <img
          src={member.image}
          alt={member.name}
          className={`w-full h-full object-cover ${getImagePosition(member)} group-hover:scale-105 transition-transform duration-500 ease-out`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
          <User className="w-16 h-16 opacity-30" />
        </div>
      )}

      {/* Top badges for Featured / Founder */}
      {isFeatured && (
        <>
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-cyan-700 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-lg shadow-amber-500/25 border border-amber-300/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Founder & CEO</span>
          </div>

          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold shadow-md">
            <ShieldCheck className="w-3 h-3" />
            <span>PMP® Certified</span>
          </div>
        </>
      )}

      {/* Floating Name Badge over Photo */}
      <div className={`absolute bottom-3 left-3 right-3 backdrop-blur-md px-3.5 py-2 rounded-xl text-white shadow-xl flex items-center justify-between transition-all ${
        isFeatured 
          ? 'bg-slate-950/90 border border-amber-500/40' 
          : 'bg-slate-900/80 border border-white/20'
      }`}>
        <div>
          <div className="text-xs font-bold font-['Archivo'] flex items-center gap-1.5">
            {isFeatured && <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
            <span>{member.name}</span>
          </div>
          <div className="text-[10px] text-slate-300 font-mono mt-0.5">
            {isFeatured ? 'Founder & Solutions Director' : member.role.split('|')[0].trim()}
          </div>
        </div>
        {isFeatured && (
          <div className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold shrink-0">
            10+ Yrs Exp
          </div>
        )}
      </div>

      <div className={`absolute inset-0 transition-colors duration-300 pointer-events-none ${
        isFeatured 
          ? 'group-hover:bg-amber-500/10' 
          : 'group-hover:bg-[#BBE7F1]/20'
      }`} />
    </div>
  );

  if (!moyenUddin || !saikat || !muheetu) return null;

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 bg-slate-100 text-slate-900 relative overflow-hidden"
    >
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="team-ref-header text-center mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-cyan-800 font-['Playfair_Display'] italic text-base sm:text-lg lg:text-xl font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Executive Leadership & Engineering</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold text-slate-950 tracking-tight font-['Archivo']">
            Meet Our Leadership & Team
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-['Instrument_Sans'] italic">
            Guided by PMP® certified technical leadership and senior solutions architects, delivering enterprise-grade digital products and high-performance cloud platforms worldwide.
          </p>
        </div>

        {/* 3×2 Seamless Checkerboard Mosaic - Matching standard width */}
        <div className="team-ref-card w-full shadow-2xl overflow-hidden bg-white border border-slate-200/80 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">

            {/* Row 1 Col 1 (Desktop) / Order 1 (Mobile) — Image: Moyen Uddin (Founder & CEO) */}
            <div className="order-1 md:order-1 lg:order-1 lg:border-r border-slate-200/80">{renderImageCard(moyenUddin, true)}</div>

            {/* Row 1 Col 2 (Desktop) / Order 2 (Mobile) — Content: Moyen Uddin (Founder & CEO) */}
            <div className="order-2 md:order-2 lg:order-2 border-t md:border-t-0 lg:border-r border-slate-200/80">{renderContentCard(moyenUddin, true)}</div>

            {/* Row 1 Col 3 (Desktop) / Order 5 (Mobile) — Image: Saikat (Al-Mumeetu) */}
            <div className="order-5 md:order-5 lg:order-3 border-t md:border-t lg:border-t-0 border-slate-200/80">{renderImageCard(saikat, false)}</div>

            {/* Row 2 Col 1 (Desktop) / Order 3 (Mobile) — Content: Al-Muheetu (Details first in 2nd row 1st column) */}
            <div className="order-3 md:order-3 lg:order-4 border-t lg:border-r border-slate-200/80">{renderContentCard(muheetu, false)}</div>

            {/* Row 2 Col 2 (Desktop) / Order 4 (Mobile) — Image: Al-Muheetu (Image then shown in 2nd row 2nd column) */}
            <div className="order-4 md:order-4 lg:order-5 border-t lg:border-r border-slate-200/80">{renderImageCard(muheetu, false)}</div>

            {/* Row 2 Col 3 (Desktop) / Order 6 (Mobile) — Content: Saikat (Directly at the bottom of Saikat's image) */}
            <div className="order-6 md:order-6 lg:order-6 border-t border-slate-200/80">{renderContentCard(saikat, false)}</div>

          </div>
        </div>

        {/* Bottom attribution */}
        <div className="text-center mt-12 sm:mt-16 space-y-4">
          <p className="text-base sm:text-lg font-['Playfair_Display'] italic font-medium text-slate-500">
            Leadership & Engineering ·{' '}
            <span className="text-slate-900 font-bold underline decoration-[#9cd5e2] underline-offset-4">WebDev Software Solutions</span>
          </p>

          {onViewAllTeam && (
            <div className="pt-2">
              <button
                onClick={onViewAllTeam}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-950 transition-colors cursor-pointer py-1.5 border-b border-slate-400/50 hover:border-[#9cd5e2]"
              >
                <span>Explore Full Engineering Team Profiles & Case Studies</span>
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
