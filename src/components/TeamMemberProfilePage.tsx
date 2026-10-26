import React, { useRef } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Award, 
  CheckCircle2, 
  Briefcase, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Calendar,
  Layers,
  GraduationCap,
  Building,
  Languages,
  User
} from 'lucide-react';
import { TeamMember, Project } from '../types';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { useGsapContext } from '../utils/gsapHelper';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { BreadcrumbBar } from './Breadcrumb';

const educationInstitutionLinks = [
  {
    name: 'Universität Rostock',
    href: 'https://www.linkedin.com/school/23014/',
  },
  {
    name: 'Rajshahi University of Engineering & Technology',
    href: 'https://www.linkedin.com/school/6837756/',
  },
];

const getProfileImagePosition = (member: TeamMember) => {
  if (member.id === 'team-2' || member.image.includes('CEO') || member.name.toLowerCase().includes('moyen')) {
    return 'object-[36%_20%]';
  }
  if (member.id === 'team-3' || member.image.includes('android-developer') || member.name.toLowerCase().includes('muheetu')) {
    return 'object-[center_35%]';
  }
  return 'object-[center_15%]';
};


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
  const { lang, localizeTeamMember } = useLanguage();
  const legacyCompanyEmails = ['info@webdevsoftwaresolutions.com', 'engineer@webdevsoftware.com'];
  const memberWithCurrentContact = member && legacyCompanyEmails.includes(member.email)
    ? { ...member, email: 'webdevsoftwaresolutions26@gmail.com' }
    : member;
  const currentMember = memberWithCurrentContact ? localizeTeamMember(memberWithCurrentContact) : null;
  const pageRef = useRef<HTMLDivElement>(null);

  useGsapContext(pageRef, () => {
    if (!pageRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    gsap.fromTo(
       '.profile-anim-item',
       { opacity: 0, y: isMobile ? 12 : 25 },
       {
         opacity: 1,
         y: 0,
         duration: isMobile ? 0.35 : 0.6,
         stagger: isMobile ? 0.04 : 0.08,
         ease: isMobile ? 'power1.out' : 'power2.out',
         clearProps: 'transform,opacity'
       }
     );
   });

  if (!currentMember) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-3 font-['Archivo']">
          {lang === 'de' ? 'Spezialistenprofil nicht gefunden' : 'Specialist Profile Not Found'}
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          {lang === 'de' 
            ? 'Das angeforderte Führungs- oder Ingenieursprofil ist derzeit nicht verfügbar.' 
            : 'The requested leadership or engineering profile is unavailable.'}
        </p>
        <button
          onClick={onBack}
          className="bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] text-slate-950 border border-[#9cd5e2] text-xs font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer shadow-sm"
        >
          {lang === 'de' ? '← Zurück zum Führungsteam' : '← Return to Leadership Team'}
        </button>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-white text-slate-900 relative">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-2">
        <BreadcrumbBar
          items={[
            { label: lang === 'de' ? 'Startseite' : 'Home', onClick: onBackToHome },
            { label: lang === 'de' ? 'Führung & Team' : 'Leadership & Team', onClick: onBack },
            { label: currentMember.name, active: true }
          ]}
          backAction={onBack}
          backLabel={lang === 'de' ? 'Zurück zum Team' : 'Back to Team'}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12 pt-4 sm:pt-6 pb-16 sm:pb-20 lg:pb-24">

        {/* Hero Section: Executive Portrait & Core Identification */}
        <div className="profile-anim-item relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:gap-12">
            
            {/* Portrait Column */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="relative w-full max-w-[320px] sm:max-w-[340px] lg:max-w-none">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-cyan-100/80 via-slate-50 to-sky-100/70"
                />
                <figure className="group relative isolate aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-slate-100 shadow-xl ring-1 ring-slate-900/5">
                  {currentMember.image && currentMember.image.trim() !== '' ? (
                    <img
                      src={currentMember.image}
                      alt={currentMember.name}
                      className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] ${getProfileImagePosition(currentMember)}`}
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-400">
                      <User className="h-14 w-14" aria-hidden="true" />
                      <span className="text-sm font-medium text-slate-500">{currentMember.name}</span>
                    </div>
                  )}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950/30 via-slate-950/5 to-transparent"
                  />
                  <figcaption className="absolute inset-x-4 bottom-4 flex min-w-0 items-center gap-3 rounded-2xl bg-white/95 px-3.5 py-3 shadow-lg backdrop-blur-md sm:inset-x-5 sm:bottom-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 text-left">
                      <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        {lang === 'de' ? 'Standort' : 'Based in'}
                      </span>
                      <span className="block truncate text-xs font-semibold text-slate-900">
                        {currentMember.location || currentMember.branch}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </div>

            </div>

            {/* Core Info Column */}
            <div className="min-w-0 space-y-5 lg:col-span-8">
              <div className="space-y-2">
                <div className="text-xs sm:text-sm font-['Kufam'] font-semibold text-cyan-800 tracking-wide">
                  {currentMember.role}
                </div>
                
                <h1 className="break-words text-2xl font-bold tracking-tight text-slate-950 font-['Kufam'] sm:text-3xl lg:text-[34px]">
                  {currentMember.name}
                </h1>

                {currentMember.headline && (
                  <p className="rounded-xl border-l-2 border-sky-300 bg-sky-50/70 px-3.5 py-2 text-xs font-medium leading-relaxed text-slate-900 sm:text-sm">
                    {currentMember.headline}
                  </p>
                )}

                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium pt-1">
                  <Award className="w-4 h-4 text-cyan-800 shrink-0" />
                  <span>{currentMember.experienceYears}+ {lang === 'de' ? 'Jahre Branchenerfahrung & Technische Führung' : 'Years Industry Track Record & Technical Stewardship'}</span>
                </div>
              </div>

              {/* Bio snippet */}
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {currentMember.bio}
              </p>

              {/* Contact & Social Links Bar */}
              <div className="flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  {currentMember.github && (
                    <a
                      href={currentMember.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white flex items-center justify-center transition-colors shadow-xs"
                      title="GitHub Profile"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {currentMember.linkedin && (
                    <a
                      href={currentMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shadow-xs transition-colors hover:bg-[#BBE7F1] hover:text-slate-950"
                      title="LinkedIn Profile"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  )}
                  {currentMember.email && (
                    <a
                      href={`mailto:${currentMember.email}`}
                      className="inline-flex min-w-0 max-w-full items-center gap-2 rounded-xl bg-slate-100 px-3 py-2.5 text-[11px] font-medium text-slate-700 transition-colors hover:bg-sky-50 hover:text-cyan-800 sm:px-3.5 sm:text-xs"
                    >
                      <Mail className="w-3.5 h-3.5 text-cyan-800" />
                      <span className="break-all">{currentMember.email}</span>
                    </a>
                  )}
                  {currentMember.phone && (
                    <a
                      href={`tel:${currentMember.phone}`}
                      className="inline-flex max-w-full items-center gap-2 rounded-xl bg-slate-100 px-3 py-2.5 text-[11px] font-medium text-slate-700 transition-colors hover:bg-sky-50 hover:text-cyan-800 sm:px-3.5 sm:text-xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{currentMember.phone}</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => onContactLead(currentMember.name)}
                  data-clean-hover
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#BBE7F1] px-5 py-3 text-xs font-bold text-slate-950 shadow-sm transition-colors hover:bg-[#a7dfed] active:bg-[#9cd5e2] cursor-pointer sm:w-auto sm:px-6 sm:text-sm"
                >
                  <span>{lang === 'de' ? `Beratungsgespräch mit ${currentMember.name} buchen` : `Book Consultation With ${currentMember.name}`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Grid: Competencies & Case Studies */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          
          {/* Main Dossier Column */}
          <div className="min-w-0 space-y-6 lg:col-span-8 lg:space-y-7">
            
            {/* Core Competencies */}
            <div className="profile-anim-item space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-7">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-['Archivo'] flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-800" />
                <span>{lang === 'de' ? 'Kompetenzen & Fachgebiete' : 'Skills & Areas of Expertise'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'de'
                  ? 'Werkzeuge, Technologien und Fachkenntnisse, die dieses Teammitglied in Kundenprojekte einbringt.'
                  : 'Tools, technologies, and strengths this team member brings to client work.'}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {currentMember.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-slate-100/80 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-900"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Professional Experience & Career History */}
            {currentMember.experienceHistory && currentMember.experienceHistory.length > 0 && (
              <div className="profile-anim-item space-y-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-7">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-['Archivo'] flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-cyan-800" />
                    <span>{lang === 'de' ? 'Berufliche Erfahrung & Werdegang' : 'Professional Experience & Track Record'}</span>
                  </h2>
                </div>

                <div className="space-y-4 pt-1">
                  {currentMember.experienceHistory.map((exp, idx) => (
                    <div
                      key={idx}
                      className="space-y-2 border-b border-slate-200/70 py-4 last:border-b-0 last:pb-0 sm:py-5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-950 font-['Archivo']">
                            {exp.role}
                          </h3>
                          <div className="text-xs sm:text-sm font-semibold text-cyan-800 flex items-center gap-1.5 mt-0.5">
                            <Building className="w-3.5 h-3.5 shrink-0" />
                            <span>{exp.company}</span>
                            {exp.type && (
                              <span className="text-slate-400 font-normal">· {exp.type}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex shrink-0 items-center gap-2 self-start rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] text-slate-500 sm:self-center">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      {exp.location && (
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{exp.location}</span>
                        </div>
                      )}

                      {exp.description && (
                        <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-slate-200/60 mt-2">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Academic Credentials & Education */}
            {currentMember.education && currentMember.education.length > 0 && (
              <div className="profile-anim-item space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-7">
                <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-['Archivo'] flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-cyan-800" />
                  <span>{lang === 'de' ? 'Akademischer Hintergrund & Hochschulabschlüsse' : 'Academic Background & Engineering Degrees'}</span>
                </h2>
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {currentMember.education.map((edu, idx) => (
                    <div key={idx} className="flex items-start gap-3 border-b border-slate-200/70 py-4 last:border-b-0">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-800">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                        {(() => {
                          const institution = educationInstitutionLinks.find(({ name }) => edu.startsWith(name));
                          if (!institution) return edu;

                          return (
                            <>
                              <a
                                href={institution.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-800 underline decoration-sky-300 underline-offset-2 hover:text-sky-950"
                              >
                                {institution.name}
                              </a>
                              {edu.slice(institution.name.length)}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Professional Certifications & Accreditations */}
            {currentMember.certifications && currentMember.certifications.length > 0 && (
              <div className="profile-anim-item space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-7">
                <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-['Archivo'] flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>{lang === 'de' ? 'Lizenzen & Professionelle Zertifizierungen' : 'Licenses & Professional Certifications'}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {currentMember.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-start gap-3 border-b border-slate-200/70 py-3.5 last:border-b-0">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                        <Award className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-bold text-slate-900 leading-snug">
                        {cert}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Signature Project Highlights */}
            {currentMember.highlightedProjects && currentMember.highlightedProjects.length > 0 && (
              <div className="profile-anim-item space-y-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-7">
                <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-['Archivo'] flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-cyan-800" />
                  <span>{lang === 'de' ? 'Ausgewählte Projekte' : 'Selected Projects'}</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lang === 'de' 
                    ? `Ausgewählte Arbeiten und Projektbeiträge von ${currentMember.name}.`
                    : `Selected work and project contributions from ${currentMember.name}.`}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {currentMember.highlightedProjects.map((projTitle, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onSelectProject?.(projTitle)}
                      data-clean-hover
                      className="group flex min-w-0 flex-col justify-between space-y-3 rounded-xl border-b border-slate-200/80 bg-slate-50/70 p-4 text-left transition-colors hover:bg-sky-50/70 cursor-pointer"
                    >
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-800 font-bold">
                          {lang === 'de' ? 'Kunden-Fallstudie' : 'Client Case Study'} {idx + 1}
                        </div>
                        <h3 className="break-words text-sm font-bold text-slate-900 transition-colors group-hover:text-cyan-800 font-['Archivo']">
                          {projTitle}
                        </h3>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60 gap-2">
                        <span className="whitespace-nowrap">{lang === 'de' ? 'Produktivbereitstellung' : 'Production Deployment'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-cyan-800 shrink-0" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Engineering Standards & Philosophy */}
            <div className="profile-anim-item space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-7">
              <h2 className="text-lg sm:text-xl font-bold text-slate-950 font-['Archivo'] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>{lang === 'de' ? 'Projektumsetzung & Qualitätsstandards' : 'Project Delivery Standards'}</span>
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  {lang === 'de' ? (
                    <>Bei <strong>WebDev Software Solutions</strong> unterstützen klare Reviews, sichere Datenverarbeitung und dokumentierte Übergaben eine zuverlässige Zusammenarbeit.</>
                  ) : (
                    <>At <strong>WebDev Software Solutions</strong>, clear reviews, careful client data handling, and documented handovers support reliable collaboration.</>
                  )}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{lang === 'de' ? 'Nachvollziehbare Reviews' : 'Reviewable changes'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{lang === 'de' ? 'Sorgfältiger Datenschutz' : 'Careful data handling'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{lang === 'de' ? 'Regelmäßige Meilensteine' : 'Regular milestones'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{lang === 'de' ? 'Dokumentierte Übergabe' : 'Documented handover'}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Column: Office, Schedule, & Direct Consultation */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 self-start lg:max-h-[calc(100vh-6.5rem)] lg:overflow-y-auto no-scrollbar z-20">
            
            {/* Multilingual Communication Proficiency */}
            {currentMember.languages && currentMember.languages.length > 0 && (
              <div className="profile-anim-item space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
                <h3 className="text-base font-bold text-slate-900 font-['Archivo'] flex items-center gap-2">
                  <Languages className="w-4 h-4 text-cyan-800 shrink-0" />
                  <span>{lang === 'de' ? 'Sprachkenntnisse' : 'Language Proficiency'}</span>
                </h3>
                <div className="space-y-2.5">
                  {currentMember.languages.map((langItem, idx) => {
                    const name = langItem.split(' (')[0].trim();
                    const rawLevel = langItem.includes('(') ? langItem.split('(')[1].replace(')', '').trim() : 'Fluent';
                    const level = rawLevel.replace(/\s*Proficiency/gi, '').trim();

                    return (
                      <div 
                        key={idx} 
                        className="flex min-w-0 items-center justify-between gap-3 rounded-xl bg-white/80 px-3.5 py-2.5 text-xs text-slate-800 transition-colors hover:bg-sky-50/70"
                      >
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                          <span className="font-bold text-slate-900">{name}</span>
                        </div>
                        <span className="shrink-0 rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-semibold text-sky-900 whitespace-nowrap">
                          {level}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Office & Direct Contact Card */}
            <div className="profile-anim-item space-y-5 rounded-2xl bg-slate-50/80 p-5 ring-1 ring-slate-100 sm:p-6">
              <h3 className="text-base font-bold text-slate-900 font-['Archivo']">
                {lang === 'de' ? 'Standort & Zusammenarbeit' : 'Location & Collaboration'}
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-cyan-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">{lang === 'de' ? 'Standort:' : 'Based in:'}</strong>
                    <span>{currentMember.location || currentMember.branch}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 border-t border-slate-200/70 pt-3">
                  <Globe className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">{lang === 'de' ? 'Zusammenarbeit:' : 'Work style:'}</strong>
                    <span>{lang === 'de' ? 'Remote mit regelmäßigen Abstimmungen und klaren Meilensteinen.' : 'Remote, with regular reviews and clear milestones.'}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Direct Consultation Box */}
            <div className="profile-anim-item space-y-4 rounded-2xl bg-slate-950 p-5 text-white shadow-sm sm:p-6">
              <div className="text-xs sm:text-sm font-['Kufam'] font-semibold text-cyan-300 tracking-wide">
                {lang === 'de' ? 'Direkte Kundenberatung' : 'Direct Client Advisory'}
              </div>
              <h3 className="text-lg font-bold font-['Kufam']">
                {lang === 'de' ? `Direkt mit ${currentMember.name} sprechen` : `Engage With ${currentMember.name} Directly`}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {lang === 'de'
                  ? 'Vereinbaren Sie eine Architektur-Scoping-Session oder Machbarkeitsanalyse für Ihr bevorstehendes Enterprise-Vorhaben.'
                  : 'Schedule an architectural scoping session or technical feasibility review for your upcoming enterprise software initiative.'}
              </p>
              <button
                onClick={() => onContactLead(currentMember.name)}
                data-clean-hover
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#BBE7F1] py-3.5 text-xs font-bold text-slate-950 shadow-sm transition-colors hover:bg-[#a7dfed] active:bg-[#9cd5e2] cursor-pointer"
              >
                <span>{lang === 'de' ? 'Architektur-Gespräch initiieren' : 'Initiate Architecture Discussion'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
};
