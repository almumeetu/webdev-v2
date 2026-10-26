import React, { useRef, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { ServiceDetail } from '../types';
import { initialServices } from '../data/initialData';
import { useGsapContext, animateStagger } from '../utils/gsapHelper';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import {
  RiCodeSSlashLine,
  RiServerLine,
  RiShoppingCart2Line,
  RiGlobalLine,
  RiShieldKeyholeLine,
  RiCpuLine,
  RiSmartphoneLine,
  RiPaletteLine,
  RiMegaphoneLine,
  RiSearchEyeLine,
  RiBrainLine,
  RiPaintBrushLine,
  RiShieldCheckLine,
} from 'react-icons/ri';

interface OurServicesSectionProps {
  services?: ServiceDetail[];
  onSelectService: (serviceId: string) => void;
  onViewAllServices: () => void;
  showAll?: boolean;
  limit?: number;
}

export const OurServicesSection: React.FC<OurServicesSectionProps> = ({
  services = initialServices,
  onSelectService,
  onViewAllServices,
  showAll = false,
  limit = 6,
}) => {
  const { lang, t, localizeService } = useLanguage();
  const localizedServices = useMemo(() => services.map((s) => localizeService(s)), [services, localizeService]);
  const sectionRef = useRef<HTMLElement>(null);

  // Helper to ensure category is always reliably resolved
  const getServiceCategory = (s: ServiceDetail): string => {
    if (s.category && s.category.trim() !== '') return s.category;
    const fallback = initialServices.find((init) => init.id === s.id)?.category;
    return fallback || 'Development';
  };

  // Flagship 6 services representing all 6 company pillars
  const displayedServices = useMemo(() => {
    if (showAll) return localizedServices;

    // Pick top flagship services (Web, Mobile, UI/UX, Meta Ads, AI, Cloud)
    const flagshipOrder = ['serv-1', 'serv-6', 'serv-7', 'serv-8', 'serv-10', 'serv-2'];
    const sorted = [...localizedServices].sort((a, b) => {
      const idxA = flagshipOrder.indexOf(a.id);
      const idxB = flagshipOrder.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });

    return sorted.slice(0, limit);
  }, [localizedServices, showAll, limit]);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    gsap.fromTo(
      '.services-header-anim',
      { opacity: 0, y: isMobile ? 12 : 25 },
      {
        opacity: 1, y: 0,
        duration: isMobile ? 0.35 : 0.65,
        stagger: isMobile ? 0.04 : 0.1,
        ease: isMobile ? 'power1.out' : 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: isMobile ? 'top 92%' : 'top 85%', once: true },
        clearProps: 'transform,opacity'
      }
    );
    animateStagger('.service-card-item', sectionRef.current, 0.08, 20);
  }, [displayedServices]);

  // Icon configuration: each service gets its tailored palette & icon
  const iconMap: Record<string, { Icon: React.ElementType; color: string; bg: string }> = {
    Code2:        { Icon: RiCodeSSlashLine,      color: 'text-violet-600',  bg: 'bg-violet-50  border-violet-200' },
    Server:       { Icon: RiServerLine,          color: 'text-sky-600',     bg: 'bg-sky-50     border-sky-200'    },
    ShoppingCart: { Icon: RiShoppingCart2Line,   color: 'text-amber-600',   bg: 'bg-amber-50   border-amber-200'  },
    Globe:        { Icon: RiGlobalLine,          color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200'},
    Cpu:          { Icon: RiCpuLine,             color: 'text-cyan-600',    bg: 'bg-cyan-50    border-cyan-200'   },
    Smartphone:   { Icon: RiSmartphoneLine,      color: 'text-indigo-600',  bg: 'bg-indigo-50  border-indigo-200' },
    Palette:      { Icon: RiPaletteLine,         color: 'text-pink-600',    bg: 'bg-pink-50    border-pink-200'   },
    Megaphone:    { Icon: RiMegaphoneLine,       color: 'text-rose-600',    bg: 'bg-rose-50    border-rose-200'   },
    Search:       { Icon: RiSearchEyeLine,       color: 'text-teal-600',    bg: 'bg-teal-50    border-teal-200'   },
    Brain:        { Icon: RiBrainLine,           color: 'text-purple-600',  bg: 'bg-purple-50  border-purple-200' },
    ShieldCheck:  { Icon: RiShieldKeyholeLine,   color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200'},
    Brush:        { Icon: RiPaintBrushLine,      color: 'text-orange-600',  bg: 'bg-orange-50  border-orange-200' },
    default:      { Icon: RiShieldCheckLine,     color: 'text-sky-600',     bg: 'bg-sky-50     border-sky-200'    },
  };

  const getIconConfig = (iconName: string) =>
    iconMap[iconName] ?? iconMap['default'];

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-slate-50/50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header consistent with site design */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="services-header-anim inline-flex items-center gap-2 text-sky-700 font-['Kufam'] text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <span>{t.servicesKicker}</span>
          </div>
          <h2 className="services-header-anim text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-semibold text-slate-950 tracking-tight font-['Kufam']">
            {t.servicesHeading}
          </h2>
          <p className="services-header-anim text-slate-600 text-sm sm:text-base leading-relaxed font-['Kufam'] max-w-2xl mx-auto">
            {t.servicesSubheading}
          </p>
        </div>

        {/* Smart & Clean Service Cards Grid (3-column layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayedServices.map((service) => {
            const { Icon, color, bg } = getIconConfig(service.iconName);
            const categoryLabel = getServiceCategory(service);

            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service.id)}
                className="service-card-item group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-sky-300 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_-6px_rgba(15,23,42,0.1)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                {/* Subtle top ambient highlight on hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top row: Icon badge + Category pill */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shadow-2xs group-hover:scale-105 transition-all duration-300 ${bg} ${color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100/90">
                      {categoryLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-[19px] font-semibold text-slate-950 group-hover:text-sky-700 transition-colors font-['Kufam'] leading-snug">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal line-clamp-2">
                    {service.shortDesc}
                  </p>

                  {/* Tech stack badges */}
                  <div className="mt-4 flex items-center gap-1.5 flex-wrap">
                    {service.techs.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-slate-50 text-slate-600 font-medium px-2 py-0.5 rounded-lg border border-slate-200/70 group-hover:border-sky-200/80 group-hover:bg-sky-50/40 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.techs.length > 3 && (
                      <span className="text-[11px] text-slate-400 font-mono">
                        +{service.techs.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-sky-700 transition-colors">
                    {t.servicesViewDetails}
                  </span>
                  <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-slate-50 border border-slate-200/80 group-hover:bg-[#BBE7F1] group-hover:border-[#9cd5e2] group-hover:text-slate-950 transition-all text-slate-600">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation CTA */}
        <div className="mt-12 sm:mt-14 text-center">
          <button
            onClick={onViewAllServices}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-semibold text-sm border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group min-h-[46px]"
          >
            <span>
              {showAll
                ? (lang === 'de' ? 'Projekt unverbindlich anfragen' : 'Request Custom Consultation')
                : (lang === 'de' ? 'Alle Services ansehen' : 'See All Services')}
            </span>
            <ArrowRight className="w-4 h-4 text-sky-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
