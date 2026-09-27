import React, { useState, useRef } from 'react';
import { Star, Quote, Globe, ShieldCheck, Sparkles } from 'lucide-react';
import { Testimonial } from '../types';
import { initialTestimonials } from '../data/initialData';
import { useGsapContext, animateStagger } from '../utils/gsapHelper';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials = initialTestimonials }) => {
  const { t, lang, localizeTestimonial } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Header animation
    gsap.fromTo(
      '.testimonials-header-anim',
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
    animateStagger('.testimonial-card-item', sectionRef.current, 0.1, 28);
  });

  const rawList = selectedFilter === 'All'
    ? testimonials
    : testimonials.filter(item => item.country.toLowerCase().includes(selectedFilter.toLowerCase()));
  const filteredTestimonials = rawList.map(item => localizeTestimonial(item));

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-slate-100/90 text-slate-900 relative overflow-hidden border-b border-slate-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="testimonials-header-anim inline-flex items-center gap-2 text-cyan-800 font-['Kufam'] text-xs sm:text-sm font-semibold tracking-wide">
            <span>{t.testimonialsKicker}</span>
          </div>

          <h2 className="testimonials-header-anim text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold text-slate-950 tracking-tight font-['Kufam']">
            {t.testimonialsHeading}
          </h2>

          <p className="testimonials-header-anim text-slate-600 text-xs sm:text-sm leading-relaxed font-['Kufam']">
            {t.testimonialsSubheading}
          </p>

          {/* Filter Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'All', label: lang === 'de' ? 'Alle' : 'All' },
              { id: 'USA', label: 'USA' },
              { id: 'Germany', label: lang === 'de' ? 'Deutschland' : 'Germany' },
              { id: 'UK', label: 'UK' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer min-h-[36px] ${
                  selectedFilter === f.id
                    ? 'bg-[#BBE7F1] text-slate-950 font-bold border border-[#9cd5e2] shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {filteredTestimonials.map((item: Testimonial) => (
            <div
              key={item.id}
              className="testimonial-card-item bg-white hover:bg-white text-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs hover:shadow-xl flex flex-col justify-between border border-slate-200/90 relative group transform hover:-translate-y-1.5 transition-[border-color,box-shadow,transform] duration-200"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-5 border-t border-slate-200/70 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {item.avatar && item.avatar.trim() !== '' ? (
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#9cd5e2] shrink-0 shadow-xs"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#BBE7F1]/40 border-2 border-[#9cd5e2] flex items-center justify-center text-slate-950 font-bold shrink-0">
                      {item.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 font-['Archivo'] truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 truncate max-w-[170px]" title={`${item.role}, ${item.company}`}>
                      {item.role}, {item.company.split(',')[0]}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Stamp */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-700" />
            <span>{lang === 'de' ? '100% echte Kundenempfehlungen' : '100% Genuine Client Endorsements'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'de' ? 'SLA-gestützte Verträge & weltweiter Support' : 'SLA-Backed Agreements & Dedicated Global Support'}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
