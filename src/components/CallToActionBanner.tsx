import React, { useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, Shield, Globe, CheckCircle2 } from 'lucide-react';
import { useGsapContext } from '../utils/gsapHelper';
import gsap from 'gsap';

interface CallToActionBannerProps {
  onContactClick: () => void;
}

export const CallToActionBanner: React.FC<CallToActionBannerProps> = ({ onContactClick }) => {
  const bannerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  /* ── Parallax on scroll ── */
  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (!bannerRef.current) return;
      const rect = bannerRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      // only run while section is in viewport
      if (rect.bottom < 0 || rect.top > viewH) return;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const shift = (progress - 0.5) * 80; // ±40px travel
      el.style.transform = `translateY(${shift}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Entrance animation ── */
  useGsapContext(bannerRef, () => {
    if (!bannerRef.current) return;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    gsap.fromTo(
      '.cta-banner-item',
      { opacity: 0, y: isMobile ? 10 : 22 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.35 : 0.6,
        stagger: isMobile ? 0.04 : 0.1,
        ease: isMobile ? 'power1.out' : 'power2.out',
        scrollTrigger: {
          trigger: bannerRef.current,
          start: isMobile ? 'top 92%' : 'top 85%',
          once: true,
        },
        clearProps: 'transform,opacity',
      }
    );
  });

  return (
    <section
      ref={bannerRef}
      className="relative overflow-hidden py-10 sm:py-14 border-t border-b border-slate-800/80"
      style={{ isolation: 'isolate' }}
    >
      {/* ── Parallax background image ── */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-0 -top-10 -bottom-10 will-change-transform pointer-events-none"
        style={{
          backgroundImage: 'url(/images/background/webdev-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ── Dark overlay layers ── */}
      <div className="absolute inset-0 bg-slate-950/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/70 pointer-events-none" />
      {/* subtle center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#BBE7F1]/15 rounded-full blur-[90px] pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-5">

          {/* Eyebrow label - Stylish Italic (No Background) */}
          <div className="cta-banner-item inline-flex items-center gap-2 text-cyan-300 font-['Playfair_Display'] italic text-base sm:text-lg font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Start Your Digital Transformation Today</span>
          </div>

          {/* Headline */}
          <h2 className="cta-banner-item text-base xs:text-lg sm:text-xl md:text-2xl lg:text-[28px] font-bold text-white tracking-tight leading-[1.25] font-['Archivo'] max-w-2xl mx-auto">
            Ready to gain competitive advantage by modernising your software architecture?
          </h2>

          {/* Sub-copy */}
          <p className="cta-banner-item text-xs sm:text-sm md:text-base text-slate-300/90 max-w-xl mx-auto leading-relaxed font-normal font-['Instrument_Sans']">
            Partner with dedicated full-stack engineers and cloud architects delivering German enterprise quality at agile development speed.
          </p>

          {/* Trust indicators */}
          <div className="cta-banner-item flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-slate-300/90 pt-1">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-[6px] backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Free Technical Consultation</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-[6px] backdrop-blur-sm">
              <Shield className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>Full IP &amp; Source Code Ownership</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-[6px] backdrop-blur-sm">
              <Globe className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>GDPR &amp; ISO Standard Protocols</span>
            </div>
          </div>

          {/* CTA button */}
          <div className="cta-banner-item pt-2">
            <button
              id="cta-get-in-touch-btn"
              onClick={onContactClick}
              className="group w-full sm:w-auto justify-center bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-3.5 rounded-[6px] transition-all transform hover:scale-[1.02] inline-flex items-center gap-2 cursor-pointer min-h-[42px] border border-[#9cd5e2] shadow-sm"
            >
              <span>SCHEDULE AN ARCHITECTURE CALL</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
