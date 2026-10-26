'use client';

import React, { useMemo } from 'react';
import { 
  Code2, 
  Server, 
  ShoppingCart, 
  Layers, 
  Globe2, 
  ArrowRight 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ServiceFeatureCardsProps {
  onSelectFeature?: (featureId: string) => void;
}

export const ServiceFeatureCards: React.FC<ServiceFeatureCardsProps> = ({ onSelectFeature }) => {
  const { lang, t } = useLanguage();
  const isDe = lang === 'de';

  const features = useMemo(() => [
    {
      id: 'feat-mern',
      icon: Code2,
      title: t.featMernTitle,
      desc: t.featMernDesc,
      iconBg: 'bg-[#BBE7F1]/50 text-slate-950 group-hover:bg-[#BBE7F1] group-hover:text-slate-950',
      badge: 'Architecture'
    },
    {
      id: 'feat-server',
      icon: Server,
      title: t.featServerTitle,
      desc: t.featServerDesc,
      iconBg: 'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white',
      badge: '99.99% SLA'
    },
    {
      id: 'feat-ecommerce',
      icon: ShoppingCart,
      title: t.featEcommerceTitle,
      desc: t.featEcommerceDesc,
      iconBg: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
      badge: 'High Conversion'
    },
    {
      id: 'feat-cms',
      icon: Layers,
      title: t.featCmsTitle,
      desc: t.featCmsDesc,
      iconBg: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
      badge: 'Ultra Fast'
    },
    {
      id: 'feat-microservices',
      icon: Globe2,
      title: t.featApiTitle,
      desc: t.featApiDesc,
      iconBg: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
      badge: 'Scalable'
    }
  ], [t]);

  const renderCard = (item: typeof features[0], keySuffix: string) => {
    const Icon = item.icon;
    return (
      <div
        key={`${item.id}-${keySuffix}`}
        onClick={() => onSelectFeature && onSelectFeature(item.id)}
        className="w-[290px] sm:w-[330px] md:w-[350px] lg:w-[380px] xl:w-[388px] shrink-0 bg-white hover:bg-slate-50/70 border border-slate-200/90 hover:border-cyan-400/80 rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-xl hover:shadow-cyan-950/5 select-none"
      >
        <div>
          <div className="mb-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 shadow-2xs shrink-0 ${item.iconBg}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
          
          <h3 className="text-base sm:text-[17px] lg:text-lg font-semibold text-slate-900 group-hover:text-cyan-800 transition-colors">
            {item.title}
          </h3>
          
          <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-normal">
            {item.desc}
          </p>
        </div>

        <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-600 group-hover:text-cyan-800 font-medium transition-colors">
          <span>{isDe ? 'Standard entdecken' : 'Explore Standard'}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </div>
      </div>
    );
  };


  return (
    <section className="bg-white py-10 sm:py-14 border-b border-slate-200/80 text-slate-900 relative z-20 overflow-hidden">
        
        {/* Infinite Marquee Slider — full viewport width */}
        <div className="relative w-full overflow-hidden group/marquee py-2">
          {/* Edge fade overlays spanning full width */}
          <div className="pointer-events-none absolute left-0 inset-y-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 inset-y-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Marquee Track: Seamless loop with 2 identical sets, pauses smoothly on hover */}
          <div 
            className="flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] pl-5 sm:pl-6"
            style={{ animationDuration: '40s' }}
          >
            {/* Primary Track */}
            <div className="flex gap-5 sm:gap-6 shrink-0 pr-5 sm:pr-6 items-stretch">
              {features.map((item) => renderCard(item, 'track1'))}
            </div>

            {/* Duplicate Track for mathematically seamless infinite marquee */}
            <div className="flex gap-5 sm:gap-6 shrink-0 pr-5 sm:pr-6 items-stretch" aria-hidden="true">
              {features.map((item) => renderCard(item, 'track2'))}
            </div>
          </div>
        </div>

    </section>
  );
};

export default ServiceFeatureCards;
