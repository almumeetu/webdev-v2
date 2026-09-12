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
import { initialServices } from '../data/initialData';
import { useGsapContext, animateStagger } from '../utils/gsapHelper';
import gsap from 'gsap';

interface OurServicesSectionProps {
  onSelectService: (serviceId: string) => void;
  onViewAllServices: () => void;
}

export const OurServicesSection: React.FC<OurServicesSectionProps> = ({
  onSelectService,
  onViewAllServices,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;

    // Header animation
    gsap.fromTo(
      '.services-header-anim',
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
    animateStagger('.service-card-item', sectionRef.current, 0.12, 40);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="services-header-anim inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase font-mono">
              OUR SERVICES
            </span>
          </div>

          <h2 className="services-header-anim text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
            We Offer a Wide Variety of IT Services
          </h2>

          <p className="services-header-anim text-slate-600 text-xs sm:text-base leading-relaxed">
            From modern web application development and cloud server setup to high-converting international e-commerce platforms, we engineer results.
          </p>
        </div>

        {/* 3x2 Grid of visual cards with clean international standard layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {initialServices.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className="service-card-item group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col border border-slate-200/90 hover:border-indigo-400"
            >
              {/* Card visual banner with photo & subtle gradient overlay */}
              <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

                {/* Top right category tag */}
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-[11px] font-mono font-semibold text-indigo-300 px-3 py-1 rounded-full border border-slate-700/80 shadow-sm">
                  Engineering
                </div>
              </div>

              {/* Card text content with dedicated, unclipped icon badge */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between text-left bg-white">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/25 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 mb-4">
                    {getIcon(service.iconName)}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-['Outfit']">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Tech chips preview & CTA trigger */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {service.techs.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2.5 py-0.5 rounded-md border border-slate-200/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1 shrink-0 whitespace-nowrap">
                    <span className="whitespace-nowrap">Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-xs hover:shadow transition-all cursor-pointer min-h-[44px]"
          >
            <span>Explore All 6 Enterprise Practice Areas</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </button>
        </div>

      </div>
    </section>
  );
};
