import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, useGsapContext, animateCounter } from '../utils/gsapHelper';
import { useLanguage } from '../context/LanguageContext';
import {
  RiCheckDoubleLine,
  RiShieldCheckLine,
  RiGlobalLine,
  RiAwardLine,
} from 'react-icons/ri';

interface WhoWeBringProps {
  onAboutClick: () => void;
}

export const WhoWeBring: React.FC<WhoWeBringProps> = ({ onAboutClick }) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Stagger in content on scroll
    gsap.fromTo(
      '.who-content-item',
      { opacity: 0, y: isMobile ? 12 : 30 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.35 : 0.65,
        stagger: isMobile ? 0.04 : 0.1,
        ease: isMobile ? 'power1.out' : 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 92%' : 'top 80%',
          once: true
        },
        clearProps: 'transform,opacity'
      }
    );

    // Fade and scale image collage
    gsap.fromTo(
      '.who-image-collage',
      { opacity: 0, scale: isMobile ? 1 : 0.96, y: isMobile ? 14 : 35 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: isMobile ? 0.38 : 0.75,
        ease: isMobile ? 'power1.out' : 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 90%' : 'top 78%',
          once: true
        },
        clearProps: 'transform,opacity'
      }
    );

    // Animated counter for 10+
    animateCounter(counterRef.current, 10, '', '+', 1.8);
  });

  return (
    <section 
      ref={sectionRef} 
      className="home-shape-network py-16 sm:py-20 lg:py-24 bg-slate-100/90 border-b border-slate-300/80 text-slate-900 overflow-hidden relative"
    >
      {/* Background subtle watermark & tech circuit */}
      <div className="absolute inset-0 bg-tech-circuit-light opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            

            {/* Headline */}
            <h2 className="who-content-item text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-semibold text-slate-900 tracking-tight leading-[1.22] font-['Kufam']">
              {t.whoHeading}
            </h2>

            {/* Subtext */}
            <p className="who-content-item text-xs sm:text-sm text-slate-600 leading-relaxed font-['Kufam']">
              {t.whoSubtext}
            </p>

            {/* 4 Feature Checklist — each with its own color */}
            <div className="who-content-item grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2.5 text-slate-800 font-medium text-sm">
                <div className="w-6 h-6 rounded-full bg-violet-100 border border-violet-300 flex items-center justify-center shrink-0">
                  <RiCheckDoubleLine className="w-3.5 h-3.5 text-violet-600" />
                </div>
                <span>{t.whoBullet1}</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-800 font-medium text-sm">
                <div className="w-6 h-6 rounded-full bg-sky-100 border border-sky-300 flex items-center justify-center shrink-0">
                  <RiShieldCheckLine className="w-3.5 h-3.5 text-sky-600" />
                </div>
                <span>{t.whoBullet2}</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-800 font-medium text-sm">
                <div className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
                  <RiGlobalLine className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span>{t.whoBullet3}</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-800 font-medium text-sm">
                <div className="w-6 h-6 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                  <RiAwardLine className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <span>{t.whoBullet4}</span>
              </div>
            </div>

            {/* Secondary Paragraph */}
            <p className="who-content-item text-sm text-slate-500 italic leading-relaxed pt-1">
              {t.whoQuote}
            </p>

            {/* Action button & Founder Signature */}
            <div className="who-content-item pt-3 flex flex-wrap items-center gap-5 sm:gap-8">
              <button
                id="more-about-us-btn"
                onClick={onAboutClick}
                className="w-full sm:w-auto justify-center bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-medium text-sm px-6 py-3.5 rounded-xl border border-[#9cd5e2] transition-all flex items-center gap-2 group cursor-pointer min-h-[44px] shadow-xs"
              >
                <span>{t.whoMoreBtn}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-slate-950" />
              </button>

              {/* Founder signature */}
              <div className="flex items-center gap-3">
                <div className="font-serif italic text-xl sm:text-2xl font-semibold text-slate-900 tracking-wider font-['Archivo'] select-none">
                  Md Moyen Uddin
                </div>
                <div className="text-left border-l border-slate-300 pl-3">
                  <div className="text-sm font-medium text-slate-800">CEO & Founder</div>
                  <div className="text-xs text-slate-500">WEBDEV Software Solutions</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Multi-layer Image Collage (overflow-safe for mobile) */}
          <div className="who-image-collage lg:col-span-6 relative pt-4 pb-8 sm:py-6">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main rounded cut-out image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80"
                  alt="WebDev Software Solutions team meeting"
                  className="w-full h-[320px] sm:h-[420px] lg:h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
              </div>

              {/* Floating secondary photo card (bottom-left) - safe positioning */}
              <div className="absolute bottom-2 left-2 sm:-bottom-4 sm:-left-4 w-44 sm:w-60 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                  alt="Software engineers collaborating"
                  className="w-full h-24 sm:h-36 object-cover"
                />
                <div className="p-2.5 sm:p-3 bg-white">
                  <div className="text-xs sm:text-sm font-medium text-slate-900">Engineering Excellence</div>
                  <div className="text-xs text-cyan-800 font-medium">Dedicated Agile Squads</div>
                </div>
              </div>

              {/* Floating experience badge - safe relative positioning */}
              <div className="absolute -top-3 right-2 sm:-top-4 sm:-right-4 bg-slate-950 text-white border border-slate-700/80 p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-2.5 sm:gap-3">
                <div ref={counterRef} className="text-xl sm:text-3xl font-semibold font-['Archivo'] text-[#BBE7F1]">10+</div>
                <div className="text-xs font-medium leading-tight text-slate-300">
                  Years of<br />Excellence
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
