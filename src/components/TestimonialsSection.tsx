import React, { useState, useRef } from 'react';
import { Star, Quote, Globe, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { initialTestimonials } from '../data/initialData';
import { useGsapContext, animateStagger } from '../utils/gsapHelper';
import gsap from 'gsap';

export const TestimonialsSection: React.FC = () => {
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

  const filteredTestimonials = selectedFilter === 'All'
    ? initialTestimonials
    : initialTestimonials.filter(t => t.country.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-slate-100/90 text-slate-900 relative overflow-hidden border-b border-slate-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="testimonials-header-anim inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase font-mono">
              VERIFIED INTERNATIONAL REVIEWS
            </span>
          </div>

          <h2 className="testimonials-header-anim text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight font-['Outfit']">
            Trusted by Leaders Across USA, Germany & the UK
          </h2>

          <p className="testimonials-header-anim text-slate-600 text-xs sm:text-base leading-relaxed">
            Real feedback from executive directors, startup founders, and technical architects who trust WebDev Software Solutions with their mission-critical platforms.
          </p>

          {/* Filter Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {['All', 'USA', 'Germany', 'UK'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer min-h-[36px] ${
                  selectedFilter === filter
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {filteredTestimonials.map((item: any) => (
            <div
              key={item.id}
              className="testimonial-card-item bg-white hover:bg-white text-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs hover:shadow-xl flex flex-col justify-between border border-slate-200/90 relative group transform hover:-translate-y-1.5 transition-[border-color,box-shadow,transform] duration-200"
            >
              <div>
                {/* 5 Stars & Country Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-full text-xs font-medium text-slate-700 shadow-2xs">
                    <span>{item.flag || '🌐'}</span>
                    <span className="font-semibold text-[11px]">{item.country}</span>
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-5 border-t border-slate-200/70 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-indigo-600 shrink-0 shadow-xs"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-['Outfit'] truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate max-w-[170px]" title={`${item.role}, ${item.company}`}>
                      {item.role}, {item.company.split(',')[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0 whitespace-nowrap">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="whitespace-nowrap">Verified Client</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Stamp */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>100% Genuine Client Endorsements</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-cyan-600" />
            <span>Bilateral Contracts in Frankfurt & Joypurhat</span>
          </div>
        </div>

      </div>
    </section>
  );
};
