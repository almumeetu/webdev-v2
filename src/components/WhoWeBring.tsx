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

    // Stagger in content on scroll
    gsap.fromTo(
      '.who-content-item',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true
        }
      }
    );

    // Fade and scale image collage
    gsap.fromTo(
      '.who-image-collage',
      { opacity: 0, scale: 0.94, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true
        }
      }
    );

    // Animated counter for 10+
    animateCounter(counterRef.current, 10, '', '+', 1.8);
  });

  return (
    <section 
      ref={sectionRef} 
      className="py-16 sm:py-20 lg:py-28 bg-white text-slate-900 overflow-hidden relative"
    >
      {/* Background subtle watermark & tech circuit */}
      <div className="absolute inset-0 bg-tech-circuit-light opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Pill section label matching reference video */}
            <div className="who-content-item inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase font-mono">
                WHO WE BRING
              </span>
            </div>

            {/* Bold Headline */}
            <h2 className="who-content-item text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18] font-['Outfit']">
              Exclusive Technology to Provide IT Solutions & Services
            </h2>

            {/* Subtext */}
            <p className="who-content-item text-sm sm:text-base text-slate-600 leading-relaxed">
              We have over 10+ years of collective experience in all stages of modern software architecture, cloud server engineering, high-load e-commerce, and enterprise systems, serving clients across North America, Europe, and worldwide.
            </p>

            {/* 4 Feature Checklist */}
            <div className="who-content-item grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2.5 text-slate-800 font-medium text-xs sm:text-sm">
                <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>IT Professional services</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-800 font-medium text-xs sm:text-sm">
                <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Managed IT & Server services</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-800 font-medium text-xs sm:text-sm">
                <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Application Development services</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-800 font-medium text-xs sm:text-sm">
                <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Maintenance And 24/7 Support</span>
              </div>
            </div>

            {/* Secondary Paragraph */}
            <p className="who-content-item text-xs sm:text-sm text-slate-500 italic leading-relaxed pt-1">
              "Our engineering teams harness the power of scalable cloud servers, full-stack MERN architecture, and modern headless frameworks to optimize operations and drive sustainable revenue for global enterprises."
            </p>

            {/* Action button & Founder Signature */}
            <div className="who-content-item pt-3 flex flex-wrap items-center gap-6 sm:gap-8">
              <button
                id="more-about-us-btn"
                onClick={onAboutClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all flex items-center gap-2 group cursor-pointer min-h-[44px]"
              >
                <span>MORE ABOUT US</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Founder signature */}
              <div className="flex items-center gap-3">
                <div className="font-serif italic text-xl sm:text-2xl font-bold text-indigo-900 tracking-wider font-['Outfit'] select-none">
                  Md Moyen Uddin
                </div>
                <div className="text-left border-l border-slate-300 pl-3">
                  <div className="text-xs font-bold text-slate-800">CEO & Founder</div>
                  <div className="text-[11px] text-slate-500">WEBDEV Software Solutions</div>
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
                <div className="p-2 sm:p-3 bg-white">
                  <div className="text-[11px] sm:text-xs font-bold text-slate-900">Joypurhat, Bangladesh</div>
                  <div className="text-[10px] sm:text-[11px] text-indigo-600 font-medium">Global Delivery Hub</div>
                </div>
              </div>

              {/* Floating experience badge - safe relative positioning */}
              <div className="absolute -top-3 right-2 sm:-top-4 sm:-right-4 bg-indigo-600 text-white p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-2.5 sm:gap-3">
                <div ref={counterRef} className="text-xl sm:text-3xl font-black font-['Outfit']">10+</div>
                <div className="text-[10px] sm:text-[11px] font-medium leading-tight">
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
