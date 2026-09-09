import React, { useRef } from 'react';
import { clientLogos } from '../data/initialData';
import { useGsapContext, animateStagger } from '../utils/gsapHelper';
import gsap from 'gsap';

export const ClientLogosSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      '.logo-strip-item',
      { opacity: 0, y: 15 },
      {
        opacity: 0.8,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          once: true
        }
      }
    );
  });

  return (
    <section ref={sectionRef} className="py-10 sm:py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-slate-400 font-mono">
            JOIN THE 500+ COMPANIES TRUSTING WEBDEV SOFTWARE SOLUTIONS
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center justify-items-center">
          {clientLogos.map((logo: any, idx) => (
            <div
              key={idx}
              className="logo-strip-item flex items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition-all cursor-default w-full max-w-[190px] h-16 group"
            >
              {logo.image ? (
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="max-h-10 max-w-[140px] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs font-mono shrink-0">
                    {logo.symbol}
                  </div>
                  <span className="text-xs sm:text-sm tracking-tight font-['Outfit']">{logo.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
