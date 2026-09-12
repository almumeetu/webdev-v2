import React, { useRef } from 'react';
import { ArrowRight, Sparkles, Shield, Globe, CheckCircle2 } from 'lucide-react';
import { useGsapContext } from '../utils/gsapHelper';
import gsap from 'gsap';

interface CallToActionBannerProps {
  onContactClick: () => void;
}

export const CallToActionBanner: React.FC<CallToActionBannerProps> = ({ onContactClick }) => {
  const bannerRef = useRef<HTMLElement>(null);

  useGsapContext(bannerRef, () => {
    if (!bannerRef.current) return;

    gsap.fromTo(
      '.cta-banner-item',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 85%',
          once: true
        }
      }
    );
  });

  return (
    <section ref={bannerRef} className="py-14 sm:py-18 bg-slate-100/90 border-t border-b border-slate-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 xs:p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden border border-slate-800/90 text-center space-y-5 sm:space-y-6">
          
          {/* Subtle background circuit & light glow */}
          <div className="absolute inset-0 bg-tech-circuit opacity-25 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="cta-banner-item inline-flex items-center gap-2 text-indigo-300 text-xs font-mono font-bold tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>START YOUR DIGITAL TRANSFORMATION TODAY</span>
          </div>

          <h2 className="cta-banner-item text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2] font-['Outfit'] max-w-3xl mx-auto">
            Ready to gain competitive advantage by modernising your software architecture?
          </h2>

          <p className="cta-banner-item text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-normal">
            Whether in Joypurhat, Leverkusen, North America, or anywhere across the globe, our architects and senior full-stack engineers are ready to scope, build, and deploy your next system.
          </p>

          {/* Quick trust metrics */}
          <div className="cta-banner-item pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-8 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free Technical Consultation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span>Full IP & Source Code Ownership</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-indigo-400" />
              <span>GDPR & ISO Standard Protocols</span>
            </div>
          </div>

          <div className="cta-banner-item pt-4">
            <button
              id="cta-get-in-touch-btn"
              onClick={onContactClick}
              className="w-full sm:w-auto justify-center bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs xs:text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-xl transition-all transform hover:scale-105 inline-flex items-center gap-2.5 cursor-pointer min-h-[44px]"
            >
              <span>SCHEDULE AN ARCHITECTURE CALL</span>
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
