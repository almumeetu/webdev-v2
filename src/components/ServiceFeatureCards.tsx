import React, { useRef } from 'react';
import { 
  Code2, 
  Server, 
  ShoppingCart, 
  Layers, 
  Globe2, 
  ArrowRight 
} from 'lucide-react';
import { useGsapContext, animateStagger } from '../utils/gsapHelper';

interface ServiceFeatureCardsProps {
  onSelectFeature?: (featureId: string) => void;
}

export const ServiceFeatureCards: React.FC<ServiceFeatureCardsProps> = ({ onSelectFeature }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapContext(containerRef, () => {
    if (!containerRef.current) return;
    animateStagger('.feature-card-item', containerRef.current, 0.1, 35);
  });

  const features = [
    {
      id: 'feat-mern',
      icon: Code2,
      title: 'Full Stack & MERN',
      desc: 'High-performance React 19 apps with Node, Express & MongoDB/PostgreSQL backends.',
      iconBg: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
      badge: 'Architecture'
    },
    {
      id: 'feat-server',
      icon: Server,
      title: 'Linux & Cloud Mesh',
      desc: 'Nginx reverse proxies, Docker orchestration, Hetzner, AWS & automated CI/CD.',
      iconBg: 'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white',
      badge: '99.99% SLA'
    },
    {
      id: 'feat-ecommerce',
      icon: ShoppingCart,
      title: 'E-Commerce Specialist',
      desc: 'Headless Shopify Plus & WooCommerce stores engineered for rapid global conversions.',
      iconBg: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
      badge: 'High Conversion'
    },
    {
      id: 'feat-cms',
      icon: Layers,
      title: 'Enterprise CMS',
      desc: 'Custom lightweight WordPress themes, secure REST API plugins, sub-second speed.',
      iconBg: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
      badge: 'Ultra Fast'
    },
    {
      id: 'feat-global',
      icon: Globe2,
      title: 'Dual-Hub Delivery',
      desc: 'Joypurhat Bangladesh HQ & Leverkusen Germany branch delivering solutions globally.',
      iconBg: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
      badge: 'Worldwide'
    }
  ];

  return (
    <section ref={containerRef} className="bg-white py-12 sm:py-16 border-b border-slate-200/80 text-slate-900 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid: 1 col on mobile, 2 col on sm, 3 col on md, 5 col on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onSelectFeature && onSelectFeature(item.id)}
                className="feature-card-item bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-indigo-400 rounded-2xl p-5 sm:p-6 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 shadow-xs ${item.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  
                  <h3 className="text-base font-bold text-slate-900 font-['Outfit'] group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 group-hover:text-indigo-600 font-bold transition-colors">
                  <span>Explore detail</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
