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
      desc: 'High-performance React 19 apps with Node, Express & MongoDB/SQL backends.',
      color: 'text-indigo-400',
      bgGlow: 'hover:border-indigo-500/60'
    },
    {
      id: 'feat-server',
      icon: Server,
      title: 'Linux & Cloud Servers',
      desc: 'Nginx setup, containerized Docker clusters, Hetzner, AWS & automated CI/CD.',
      color: 'text-sky-400',
      bgGlow: 'hover:border-sky-500/60'
    },
    {
      id: 'feat-ecommerce',
      icon: ShoppingCart,
      title: 'E-Commerce Specialist',
      desc: 'Shopify Plus & WooCommerce stores engineered for rapid checkout & conversions.',
      color: 'text-emerald-400',
      bgGlow: 'hover:border-emerald-500/60'
    },
    {
      id: 'feat-cms',
      icon: Layers,
      title: 'WordPress & Shopify',
      desc: 'Custom headless theme development, secure API plugins, speed optimization.',
      color: 'text-amber-400',
      bgGlow: 'hover:border-amber-500/60'
    },
    {
      id: 'feat-global',
      icon: Globe2,
      title: 'Global Delivery',
      desc: 'Joypurhat, Bangladesh engineering hub delivering solutions worldwide.',
      color: 'text-purple-400',
      bgGlow: 'hover:border-purple-500/60'
    }
  ];

  return (
    <section ref={containerRef} className="bg-[#090d18] py-8 sm:py-12 border-b border-slate-800 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid: 1 col on mobile, 2 col on sm, 3 col on md, 5 col on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onSelectFeature && onSelectFeature(item.id)}
                className={`feature-card-item bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 ${item.bgGlow} rounded-2xl p-5 sm:p-6 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between group shadow-lg`}
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center ${item.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <h3 className="text-base font-bold text-white font-['Outfit'] group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 group-hover:text-indigo-400 font-semibold transition-colors">
                  <span>Learn more</span>
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
