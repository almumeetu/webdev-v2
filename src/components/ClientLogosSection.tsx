import React, { useRef } from 'react';
import { clientLogos } from '../data/initialData';
import { useGsapContext } from '../utils/gsapHelper';
import gsap from 'gsap';
import { Globe, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ClientLogosSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      '.logo-strip-item',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
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
    <section ref={sectionRef} className="py-12 sm:py-14 bg-slate-100/90 border-b border-slate-300/80 text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Eyebrow Header */}
        <div className="text-center mb-6 sm:mb-8 space-y-1.5">
          <div className="inline-flex items-center gap-2 text-indigo-600 text-xs font-bold font-mono tracking-[0.2em] uppercase">
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span>INTERNATIONAL ENTERPRISE CLIENTS & PARTNERS</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-['Outfit']">
            Trusted by High-Growth Brands Across USA, Germany, UK & Europe
          </h3>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-stretch justify-items-center">
          {clientLogos.map((logo: any, idx) => (
            <div
              key={idx}
              className="logo-strip-item flex flex-col items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-400 hover:bg-white transition-all duration-300 cursor-default w-full group shadow-xs hover:shadow-md"
            >
              {/* Logo Area */}
              <div className="h-12 flex items-center justify-center w-full">
                {logo.image ? (
                  <img
                    src={logo.image}
                    alt={logo.name}
                    className="max-h-9 max-w-[130px] object-contain filter grayscale group-hover:grayscale-0 contrast-125 group-hover:scale-105 transition-all duration-300"
                  />
                ) : (
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs font-mono shrink-0 shadow-xs">
                      {logo.symbol}
                    </div>
                    <span className="text-xs tracking-tight font-['Outfit'] text-slate-800 truncate">{logo.name}</span>
                  </div>
                )}
              </div>

              {/* Country Badge */}
              <div className="mt-2 pt-2 border-t border-slate-100 w-full flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span className="truncate max-w-[95px] text-slate-700 font-semibold">{logo.name}</span>
                <span className="text-indigo-600 font-bold shrink-0">{logo.badge || logo.country}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Ribbon */}
        <div className="mt-7 pt-5 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Code & IP Ownership Legally Transferred</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Strict Bilateral NDAs Signed Before Project Kickoff</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-600 shrink-0" />
            <span>Real-Time US (EST/PST) & European (CET/GMT) Overlap</span>
          </div>
        </div>

      </div>
    </section>
  );
};
