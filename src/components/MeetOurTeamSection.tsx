import React, { useRef } from 'react';
import { TeamMember } from '../types';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { ArrowUpRight, Phone, Mail, User, Award, Briefcase, MapPin, ShieldCheck, Globe } from 'lucide-react';
import { gsap, useGsapContext } from '../utils/gsapHelper';
import { useLanguage } from '../context/LanguageContext';

interface MeetOurTeamSectionProps {
  teamMembers: TeamMember[];
  onSelectMember: (member: TeamMember) => void;
  onViewAllTeam?: () => void;
  featuredOnly?: boolean;
}

export const MeetOurTeamSection: React.FC<MeetOurTeamSectionProps> = ({
  teamMembers,
  onSelectMember,
  onViewAllTeam,
  featuredOnly = false
}) => {
  const { t, lang, localizeTeamMember } = useLanguage();
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

  const featuredFounder = teamMembers.find(m =>
    m.id === 'team-2' ||
    m.name.toLowerCase().includes('moyen') ||
    /founder\s*(?:&|and)\s*ceo|ceo\s*(?:&|and)\s*founder/i.test(m.role)
  );
  if (featuredOnly && !featuredFounder) return null;

  const rawMoyen = featuredFounder || teamMembers[0];
  if (!rawMoyen) return null;

  const moyenUddin = localizeTeamMember(rawMoyen);

  const getCleanRole = (member: TeamMember) => {
    if (lang === 'de') {
      if (member.id === 'team-2' || member.name.toLowerCase().includes('moyen')) return 'Gründer & Geschäftsführer | European Delivery Head';
      if (member.id === 'team-1' || member.name.toLowerCase().includes('saikat')) return 'Full Stack Software Engineer & E-Commerce Specialist';
      if (member.id === 'team-3' || member.name.toLowerCase().includes('muheetu')) return 'Mobile Application Engineer (Android & iOS)';
      return member.role.split('|')[0].trim();
    }
    if (member.id === 'team-2' || member.name.toLowerCase().includes('moyen')) return 'Founder & CEO | European Delivery Head';
    if (member.id === 'team-1' || member.name.toLowerCase().includes('saikat')) return 'Full Stack Software Engineer & E-Commerce Specialist';
    if (member.id === 'team-3' || member.name.toLowerCase().includes('muheetu')) return 'Mobile Application Engineer (Android & iOS)';
    return member.role.split('|')[0].trim();
  };

  const getCleanBio = (member: TeamMember) => {
    if (lang === 'de') {
      if (member.id === 'team-2' || member.name.toLowerCase().includes('moyen')) {
        return 'PMP®-zertifizierter Projektleiter & Senior Software Engineer mit über 10 Jahren Führungserfahrung in europäischen Softwareprojekten, AWS Cloud und DSGVO-Compliance.';
      }
      if (member.id === 'team-1' || member.name.toLowerCase().includes('saikat')) {
        return 'Spezialisiert auf Next.js, React, Node.js, Express und Cloud-Serverinfrastrukturen für skalierbare Enterprise-Webplattformen.';
      }
      return member.bio || 'Erfahren in nativer und plattformübergreifender Softwareentwicklung.';
    }
    if (member.id === 'team-2' || member.name.toLowerCase().includes('moyen')) {
      return 'PMP® certified leader & Senior Software Engineer with 10+ years driving European agile software delivery, AWS cloud, and German GDPR compliance.';
    }
    if (member.id === 'team-1' || member.name.toLowerCase().includes('saikat')) {
      return 'Specialized in Next.js, React, Node.js, Express, and cloud server infrastructure for scalable enterprise web platforms.';
    }
    if (member.id === 'team-3' || member.name.toLowerCase().includes('muheetu')) {
      return 'Dedicated mobile specialist with 4+ years building high-performance native Android (Kotlin), iOS (Swift), and Flutter apps.';
    }
    return member.bio || 'Experienced in building reliable digital products and software solutions.';
  };

  const getImagePosition = (member: TeamMember) => {
    if (member.id === 'team-2' || member.image.includes('CEO') || member.name.toLowerCase().includes('moyen')) return 'object-[36%_20%]';
    if (member.id === 'team-3' || member.image.includes('android-developer') || member.name.toLowerCase().includes('muheetu')) return 'object-[center_35%]';
    return 'object-[center_15%]';
  };

  // Accent color per team member for visual variety
  const getAccentColor = (member: TeamMember) => {
    if (member.id === 'team-2' || member.name.toLowerCase().includes('moyen')) return { pill: 'bg-cyan-50 text-cyan-800 border-cyan-200', dot: 'bg-cyan-600', ring: 'ring-cyan-400/30', shadow: 'shadow-cyan-500/10' };
    if (member.id === 'team-1' || member.name.toLowerCase().includes('saikat')) return { pill: 'bg-violet-50 text-violet-800 border-violet-200', dot: 'bg-violet-500', ring: 'ring-violet-400/30', shadow: 'shadow-violet-500/10' };
    if (member.id === 'team-3' || member.name.toLowerCase().includes('muheetu')) return { pill: 'bg-emerald-50 text-emerald-800 border-emerald-200', dot: 'bg-emerald-500', ring: 'ring-emerald-400/30', shadow: 'shadow-emerald-500/10' };
    return { pill: 'bg-slate-100 text-slate-700 border-slate-200', dot: 'bg-slate-400', ring: 'ring-slate-400/20', shadow: 'shadow-slate-500/10' };
  };

  /* ─────────────────────────── FEATURED (single founder) ─────────────────────────── */
  if (featuredOnly) {
    const accent = getAccentColor(moyenUddin);
    return (
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24 text-slate-900"
      >
        {/* Decorative background shape */}
        <div className="pointer-events-none absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-cyan-50 opacity-60 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-slate-100 opacity-80 blur-2xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Kicker */}
          <div className="team-ref-header mb-10 flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-cyan-600 to-cyan-400" />
            <span className="font-['Kufam'] text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">
              {lang === 'de' ? 'DAS TEAM HINTER WEBDEV' : 'THE PEOPLE BEHIND WEBDEV'}
            </span>
          </div>

          <div className="team-ref-card grid grid-cols-1 items-center gap-10 md:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            {/* Photo */}
            <div className="relative mx-auto w-full max-w-[400px] md:mx-0">
              {/* Decorative border offset */}
              <div
                aria-hidden="true"
                className={`absolute -bottom-4 -left-4 h-full w-full rounded-[2rem] border-2 border-cyan-200/60`}
              />
              {/* Glow backdrop */}
              <div
                aria-hidden="true"
                className="absolute -bottom-8 -left-8 -right-8 -top-8 rounded-[2.5rem] bg-gradient-to-br from-cyan-100/50 via-transparent to-transparent blur-xl"
              />
              <div className={`relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-slate-100 ring-1 ${accent.ring} shadow-2xl ${accent.shadow}`}>
                {moyenUddin.image ? (
                  <img
                    src={moyenUddin.image}
                    alt={moyenUddin.name}
                    className={`absolute inset-0 h-full w-full object-cover ${getImagePosition(moyenUddin)} transition-transform duration-700 hover:scale-[1.03]`}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-300">
                    <User className="h-20 w-20" />
                  </div>
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-900/50 to-transparent" />
                {/* Branch badge */}
                <div className="absolute bottom-4 left-4 rounded-full border border-white/80 bg-white/95 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-widest text-slate-700 shadow-lg backdrop-blur-sm">
                  {moyenUddin.branch}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center py-2">
              {/* Role badge */}
              <div className={`mb-4 inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-widest ${accent.pill}`}>
                <Award className="h-3.5 w-3.5" />
                <span>{lang === 'de' ? 'GRÜNDER & CEO' : 'FOUNDER & CEO'}</span>
                <span className="h-1 w-1 rounded-full bg-current opacity-40" />
                <span className="font-semibold tracking-normal normal-case opacity-70">
                  {moyenUddin.experienceYears}+ {lang === 'de' ? 'Jahre' : 'yrs exp.'}
                </span>
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {moyenUddin.name}
              </h2>
              <p className="mt-2 text-base font-medium text-slate-500">
                {getCleanRole(moyenUddin).split('|').slice(1).join('|').trim()}
              </p>

              <div className="mt-1 h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent" />

              <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate-600">
                {getCleanBio(moyenUddin)}
              </p>

              {/* Skills grid */}
              {moyenUddin.skills && moyenUddin.skills.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-2">
                  {moyenUddin.skills.slice(0, 4).map((skill) => (
                    <div key={skill} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-slate-100 pt-6">
                <button
                  onClick={() => onSelectMember(moyenUddin)}
                  className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.98] cursor-pointer"
                >
                  <span>{lang === 'de' ? 'Profil ansehen' : 'View profile'}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                {moyenUddin.email && (
                  <a
                    href={`mailto:${moyenUddin.email}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{lang === 'de' ? 'Kontakt aufnehmen' : 'Get in touch'}</span>
                  </a>
                )}
                {moyenUddin.linkedin && (
                  <a
                    href={moyenUddin.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* View all team link */}
          {onViewAllTeam && (
            <div className="mt-12 flex justify-end border-t border-slate-100 pt-5">
              <button
                onClick={onViewAllTeam}
                className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400 transition-colors hover:text-slate-900 cursor-pointer"
              >
                <span>{lang === 'de' ? 'Das gesamte Team kennenlernen' : 'Meet the whole team'}</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }

  /* ─────────────────────────── FULL GRID VIEW ─────────────────────────── */
  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-12 sm:py-16 lg:py-20 text-slate-900"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="team-ref-header mb-10 sm:mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-slate-100 pb-8 sm:pb-10">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-cyan-700" />
              <span className="font-['Kufam'] text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-800">
                {t.teamKicker}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-slate-950 font-['Kufam']">
              {lang === 'de' ? 'Die Menschen hinter unseren Lösungen' : 'Meet the minds behind the work'}
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
              {t.teamSubheading}
            </p>
          </div>

          {/* Delivery & Governance trust strip */}
          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 text-xs text-slate-600 self-start sm:self-auto shrink-0">
            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-slate-50/70 px-3.5 py-2 font-medium">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <span>{lang === 'de' ? '🇩🇪 Leverkusen HQ & 🇧🇩 Global Engineering' : '🇩🇪 Leverkusen HQ & 🇧🇩 Global Engineering'}</span>
            </div>
            <div className="text-[11px] text-slate-500 sm:pr-1">
              <span>{String(teamMembers.length).padStart(2, '0')} {lang === 'de' ? 'Dedizierte Spezialisten & Engineers' : 'Dedicated Core Engineers'}</span>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => {
            const localizedMember = localizeTeamMember(member);
            const accent = getAccentColor(localizedMember);

            return (
              <article
                key={localizedMember.id}
                className="team-ref-card group flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Portrait Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  {localizedMember.image ? (
                    <img
                      src={localizedMember.image}
                      alt={localizedMember.name}
                      className={`h-full w-full object-cover ${getImagePosition(localizedMember)} transition-transform duration-700 ease-out group-hover:scale-105`}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-300">
                      <User className="h-16 w-16" />
                    </div>
                  )}

                  {/* Soft bottom vignette */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                  {/* Branch / Location Badge */}
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-slate-950/80 backdrop-blur-md px-3 py-1.5 text-[11px] font-medium text-white border border-white/10 shadow-sm">
                    <MapPin className="h-3 w-3 text-cyan-400 shrink-0" />
                    <span className="truncate max-w-[190px]">{localizedMember.location || localizedMember.branch}</span>
                  </div>

                  {/* Experience Badge */}
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-slate-800 border border-slate-200/80 shadow-xs">
                    <Briefcase className="h-3 w-3 text-cyan-800 shrink-0" />
                    <span>{localizedMember.experienceYears}+ {lang === 'de' ? 'Jahre' : 'yrs exp.'}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {/* Clean Role */}
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-800">
                    {getCleanRole(localizedMember).split('|')[0].trim()}
                  </p>

                  {/* Name */}
                  <h3 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-slate-950 font-['Kufam'] group-hover:text-cyan-800 transition-colors">
                    {localizedMember.name}
                  </h3>

                  {/* Subtle Accent Line */}
                  <div className="mt-2 mb-3.5 h-0.5 w-8 rounded-full bg-cyan-700/30 group-hover:w-14 group-hover:bg-cyan-800 transition-all duration-300" />

                  {/* Bio */}
                  <p className="text-sm leading-relaxed text-slate-600 line-clamp-3 mb-5">
                    {getCleanBio(localizedMember)}
                  </p>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {localizedMember.skills?.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-slate-50 border border-slate-200/80 px-2.5 py-1 text-[11px] font-medium text-slate-700 group-hover:border-slate-300 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-1.5">
                      {localizedMember.linkedin && (
                        <a
                          href={localizedMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${localizedMember.name} LinkedIn`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/90 text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
                        >
                          <LinkedinIcon className="h-4 w-4" />
                        </a>
                      )}
                      {localizedMember.github && (
                        <a
                          href={localizedMember.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${localizedMember.name} GitHub`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/90 text-slate-500 hover:text-slate-950 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                        >
                          <GithubIcon className="h-4 w-4" />
                        </a>
                      )}
                      {localizedMember.email && (
                        <a
                          href={`mailto:${localizedMember.email}`}
                          aria-label={`Email ${localizedMember.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/90 text-slate-500 hover:text-cyan-800 hover:border-cyan-200 hover:bg-cyan-50/50 transition-colors"
                        >
                          <Mail className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {localizedMember.phone && (
                        <a
                          href={`tel:${localizedMember.phone.replace(/[^\d+]/g, '')}`}
                          aria-label={`Call ${localizedMember.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/90 text-slate-500 hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectMember(localizedMember)}
                      className="group/btn inline-flex items-center gap-1.5 rounded-xl bg-slate-950 px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-slate-800 active:scale-95 shadow-xs cursor-pointer"
                    >
                      <span>{lang === 'de' ? 'Profil ansehen' : 'View Profile'}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeamSection;
