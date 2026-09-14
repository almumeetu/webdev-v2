import React, { useRef } from 'react';
import { Check, ArrowUpRight, ShieldCheck, Award, Server } from 'lucide-react';
import { gsap, useGsapContext, animateCounter } from '../utils/gsapHelper';

interface WhoWeBringProps {
  onAboutClick: () => void;
}

export const WhoWeBring: React.FC<WhoWeBringProps> = ({ onAboutClick }) => {
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
      className="py-16 sm:py-20 lg:py-24 bg-slate-100/90 border-b border-slate-300/80 text-slate-900 overflow-hidden relative"
    >
      {/* Background subtle watermark & tech circuit */}
      <div className="absolute inset-0 bg-tech-circuit-light opacity-40 pointer-events-none"></div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Section Eyebrow - Stylish Italic (No Background) */}
            <div className="who-content-item inline-flex items-center gap-2 text-cyan-700 font-['Playfair_Display'] italic text-base sm:text-lg lg:text-xl font-semibold tracking-wide">
              <span>Who We Bring & Our Pedigree</span>
            </div>

            {/* Bold Headline */}
            <h2 className="who-content-item text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold text-slate-900 tracking-tight leading-[1.22] font-['Archivo']">
              World-Class Engineering for High-Growth Global Businesses
            </h2>

            {/* Subtext */}
            <p className="who-content-item text-sm sm:text-base text-slate-600 leading-relaxed font-['Instrument_Sans']">
              With over 10+ years of collective experience delivering software for enterprise clients in the USA, Germany, United Kingdom, and across Europe, we build mission-critical digital systems engineered to perform under heavy production loads.
            </p>

            {/* 4 Feature Checklist */}
            <div className="who-content-item grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2.5 text-slate-800 font-medium text-sm">
                <div className="w-5 h-5 rounded-full bg-[#BBE7F1]/50 border border-[#9cd5e2] flex items-center justify-center text-slate-900 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Strict Bilateral NDA & 100% IP Transfer</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-800 font-medium text-sm">
                <div className="w-5 h-5 rounded-full bg-[#BBE7F1]/50 border border-[#9cd5e2] flex items-center justify-center text-slate-900 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Hardened Cloud & Server DevOps (99.99% SLA)</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-800 font-medium text-sm">
                <div className="w-5 h-5 rounded-full bg-[#BBE7F1]/50 border border-[#9cd5e2] flex items-center justify-center text-slate-900 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Full-Stack MERN & Next.js Core Engineering</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-800 font-medium text-sm">
                <div className="w-5 h-5 rounded-full bg-[#BBE7F1]/50 border border-[#9cd5e2] flex items-center justify-center text-slate-900 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>US, UK & German Overlapping Timezone Sync</span>
              </div>
            </div>

            {/* Secondary Paragraph */}
            <p className="who-content-item text-sm text-slate-500 italic leading-relaxed pt-1">
              "Our engineering teams harness the power of scalable cloud servers, full-stack MERN architecture, and modern headless frameworks to optimize operations and drive sustainable revenue for global enterprises."
            </p>

            {/* Action button & Founder Signature */}
            <div className="who-content-item pt-3 flex flex-wrap items-center gap-5 sm:gap-8">
              <button
                id="more-about-us-btn"
                onClick={onAboutClick}
                className="w-full sm:w-auto justify-center bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold text-sm px-6 py-3.5 rounded-xl border border-[#9cd5e2] transition-all flex items-center gap-2 group cursor-pointer min-h-[44px] shadow-xs"
              >
                <span>MORE ABOUT US</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-slate-950" />
              </button>

              {/* Founder signature */}
              <div className="flex items-center gap-3">
                <div className="font-serif italic text-xl sm:text-2xl font-bold text-slate-900 tracking-wider font-['Archivo'] select-none">
                  Md Moyen Uddin
                </div>
                <div className="text-left border-l border-slate-300 pl-3">
                  <div className="text-sm font-bold text-slate-800">CEO & Founder</div>
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
                  <div className="text-xs sm:text-sm font-bold text-slate-900">Engineering Excellence</div>
                  <div className="text-xs text-cyan-800 font-semibold">Dedicated Agile Squads</div>
                </div>
              </div>

              {/* Floating experience badge - safe relative positioning */}
              <div className="absolute -top-3 right-2 sm:-top-4 sm:-right-4 bg-slate-950 text-white border border-slate-700/80 p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-2.5 sm:gap-3">
                <div ref={counterRef} className="text-xl sm:text-3xl font-black font-['Archivo'] text-[#BBE7F1]">10+</div>
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
