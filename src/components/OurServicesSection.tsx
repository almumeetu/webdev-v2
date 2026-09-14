import React, { useRef } from 'react';
import { 
  Code2, 
  Server, 
  ShoppingCart, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  ArrowRight 
} from 'lucide-react';
import { ServiceDetail } from '../types';
import { initialServices } from '../data/initialData';
import { useGsapContext, animateStagger } from '../utils/gsapHelper';
import gsap from 'gsap';

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
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Header animation
    gsap.fromTo(
      '.services-header-anim',
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
    animateStagger('.service-card-item', sectionRef.current, 0.1, 28);
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-6 h-6" />;
      case 'Server': return <Server className="w-6 h-6" />;
      case 'ShoppingCart': return <ShoppingCart className="w-6 h-6" />;
      case 'Globe': return <Globe className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      default: return <ShieldCheck className="w-6 h-6" />;
    }
  };

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-white text-slate-900 relative border-b border-slate-200/80">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="services-header-anim inline-flex items-center gap-2 text-cyan-700 font-['Playfair_Display'] italic text-base sm:text-lg lg:text-xl font-semibold tracking-wide">
            <span>Our Services & Engineering Solutions</span>
          </div>

          <h2 className="services-header-anim text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight font-['Archivo']">
            We Offer a Wide Variety of IT Services
          </h2>

          <p className="services-header-anim text-slate-600 text-sm sm:text-base leading-relaxed font-['Instrument_Sans']">
            From modern web application development and cloud server setup to high-converting international e-commerce platforms, we engineer results.
          </p>
        </div>

        {/* 3x2 Grid of visual cards with clean international standard layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className="service-card-item group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1.5 cursor-pointer flex flex-col border border-slate-200/90 hover:border-[#9cd5e2]"
            >
              {/* Card visual banner with photo & subtle gradient overlay */}
              <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-100">
                {service.image && service.image.trim() !== '' ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

                {/* Top right category tag */}
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-xs font-mono font-semibold text-[#BBE7F1] px-3 py-1 rounded-full border border-slate-700/80 shadow-sm">
                  Engineering
                </div>
              </div>

              {/* Card text content with dedicated, unclipped icon badge */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between text-left bg-white">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#BBE7F1] border border-[#9cd5e2] text-slate-950 flex items-center justify-center shadow-xs group-hover:scale-105 transition-all duration-300 mb-4">
                    {getIcon(service.iconName)}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-slate-950 transition-colors font-['Archivo']">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Tech chips preview & CTA trigger */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {service.techs.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md border border-slate-200/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="text-sm font-bold text-slate-950 group-hover:text-cyan-800 flex items-center gap-1 shrink-0 whitespace-nowrap">
                    <span className="whitespace-nowrap">Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onViewAllServices}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm sm:text-base border border-slate-200 transition-all cursor-pointer min-h-[44px]"
          >
            <span>Explore All 6 Enterprise Practice Areas</span>
            <ArrowRight className="w-4 h-4 text-slate-900" />
          </button>
        </div>

      </div>
    </section>
  );
};
