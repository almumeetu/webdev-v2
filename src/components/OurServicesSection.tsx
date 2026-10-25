import React, { useRef } from 'react';
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
  RiShieldCheckLine,
  RiCpuLine,
} from 'react-icons/ri';

interface OurServicesSectionProps {
  services?: ServiceDetail[];
  onSelectService: (serviceId: string) => void;
  onViewAllServices: () => void;
}

export const OurServicesSection: React.FC<OurServicesSectionProps> = ({
  services = initialServices,
  onSelectService,
  onViewAllServices,
}) => {
  const { t, localizeService } = useLanguage();
  const localizedServices = services.map((s) => localizeService(s));
  const sectionRef = useRef<HTMLElement>(null);

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
    animateStagger('.service-card-item', sectionRef.current, 0.1, 28);
  });

  // Icon config: each service gets its own colorful icon
  const iconMap: Record<string, { Icon: React.ElementType; color: string; bg: string }> = {
    Code2:       { Icon: RiCodeSSlashLine,    color: 'text-violet-600', bg: 'bg-violet-50 border-violet-200' },
    Server:      { Icon: RiServerLine,        color: 'text-sky-600',    bg: 'bg-sky-50    border-sky-200'    },
    ShoppingCart:{ Icon: RiShoppingCart2Line, color: 'text-amber-600',  bg: 'bg-amber-50  border-amber-200'  },
    Globe:       { Icon: RiGlobalLine,        color: 'text-emerald-600',bg: 'bg-emerald-50 border-emerald-200'},
    Cpu:         { Icon: RiCpuLine,           color: 'text-rose-600',   bg: 'bg-rose-50   border-rose-200'   },
    default:     { Icon: RiShieldCheckLine,   color: 'text-cyan-600',   bg: 'bg-cyan-50   border-cyan-200'   },
  };

  const getIconConfig = (iconName: string) =>
    iconMap[iconName] ?? iconMap['default'];

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-white text-slate-900 relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="services-header-anim inline-flex items-center gap-2 text-cyan-700 font-['Kufam'] text-xs sm:text-sm font-semibold tracking-wide">
            <span>{t.servicesKicker}</span>
          </div>
          <h2 className="services-header-anim text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-semibold text-slate-900 tracking-tight font-['Kufam']">
            {t.servicesHeading}
          </h2>
          <p className="services-header-anim text-slate-600 text-xs sm:text-sm leading-relaxed font-['Kufam']">
            {t.servicesSubheading}
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {localizedServices.map((service) => {
            const { Icon, color, bg } = getIconConfig(service.iconName);
            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service.id)}
                className="service-card-item group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1.5 cursor-pointer flex flex-col border border-slate-200/90 hover:border-[#9cd5e2]"
              >
                {/* Card image banner */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-100">
                  {service.image && service.image.trim() !== '' ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-xs font-mono font-semibold text-[#BBE7F1] px-3 py-1 rounded-full border border-slate-700/80 shadow-sm">
                    {t.servicesTag}
                  </div>
                </div>

                {/* Card content */}
                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between text-left bg-white">
                  <div>
                    {/* Colorful icon badge */}
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-sm group-hover:scale-110 transition-all duration-300 mb-4 ${bg} ${color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-slate-950 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {service.techs.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md border border-slate-200/60">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-slate-950 group-hover:text-cyan-800 flex items-center gap-1 shrink-0 whitespace-nowrap">
                      <span className="whitespace-nowrap">{t.servicesViewDetails}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onViewAllServices}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-medium text-sm sm:text-base border border-slate-200 transition-all cursor-pointer min-h-[44px]"
          >
            <span>{t.servicesViewAll}</span>
            <ArrowRight className="w-4 h-4 text-slate-900" />
          </button>
        </div>
      </div>
    </section>
  );
};
