import React, { useRef } from 'react';
import { Star, Quote, Globe } from 'lucide-react';
import { initialTestimonials } from '../data/initialData';
import { useGsapContext, animateStagger } from '../utils/gsapHelper';
import gsap from 'gsap';

export const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;

    // Header animation
    gsap.fromTo(
      '.testimonials-header-anim',
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
    animateStagger('.testimonial-card-item', sectionRef.current, 0.14, 40);
  });

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-28 bg-[#090d18] text-white relative overflow-hidden border-t border-b border-slate-800">
      {/* Circuit background & glow */}
      <div className="absolute inset-0 bg-tech-circuit opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header matching Frame 00:10 */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="testimonials-header-anim inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-indigo-400 uppercase font-mono">
              WHAT CLIENTS SAY
            </span>
          </div>

          <h2 className="testimonials-header-anim text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Hear What Our Global Clients Say
          </h2>

          <p className="testimonials-header-anim text-slate-400 text-sm sm:text-base">
            Trusted by enterprises and high-growth brands across Germany, Bangladesh, Europe, and North America.
          </p>
        </div>

        {/* Testimonials Grid matching Frame 00:10 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {initialTestimonials.map((item) => (
            <div
              key={item.id}
              className="testimonial-card-item bg-white text-slate-900 rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between border border-slate-100 relative group transform hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                {/* 5 Stars matching reference */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Text matching reference video */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info & Quotation mark at bottom */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-indigo-600 shrink-0"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-['Outfit']">
                      {item.name}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 truncate max-w-[160px]">
                      {item.role}, {item.country}
                    </p>
                  </div>
                </div>

                {/* Quotation mark icon */}
                <div className="text-indigo-600 opacity-25 group-hover:opacity-100 transition-opacity">
                  <Quote className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
