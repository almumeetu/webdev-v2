import React, { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
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
    <section ref={bannerRef} className="bg-[#090d18] py-16 sm:py-20 relative overflow-hidden border-t border-slate-800">
      {/* Background glow accent */}
      <div className="absolute inset-0 bg-tech-circuit opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5 sm:space-y-6">
        <div className="cta-banner-item inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full text-indigo-400 text-xs font-mono font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>START YOUR DIGITAL TRANSFORMATION TODAY</span>
        </div>

        <h2 className="cta-banner-item text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2] font-['Outfit'] max-w-3xl mx-auto">
          Ready to gain competitive advantage by harnessing data and modernising your technology?
        </h2>

        <p className="cta-banner-item text-slate-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Whether in Bangladesh, Germany, or anywhere across the globe, we are ready to build, scale, and maintain your software systems.
        </p>

        <div className="cta-banner-item pt-2">
          <button
            id="cta-get-in-touch-btn"
            onClick={onContactClick}
            className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-xl shadow-indigo-600/40 hover:shadow-indigo-600/60 transition-all transform hover:scale-105 inline-flex items-center gap-2.5 cursor-pointer min-h-[44px]"
          >
            <span>GET IN TOUCH</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
