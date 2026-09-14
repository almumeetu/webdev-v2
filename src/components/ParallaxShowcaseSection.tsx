import React, { useEffect, useRef, useState } from 'react';
import { 
  Server, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  ArrowRight, 
  Activity, 
  Code2, 
  CheckCircle2, 
  Globe2, 
  Sparkles,
  Layers
} from 'lucide-react';

interface ParallaxShowcaseSectionProps {
  onContactClick: () => void;
}

export const ParallaxShowcaseSection: React.FC<ParallaxShowcaseSectionProps> = ({
  onContactClick
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollYOffset, setScrollYOffset] = useState(0);

  useEffect(() => {
    // Only enable parallax scroll listener on desktop viewports (>= 1024px)
    // On mobile devices, constant scroll setState triggers re-render thrashing and card overlapping
    if (typeof window === 'undefined') return;

    let ticking = false;

    const handleScroll = () => {
      if (window.innerWidth < 1024) {
        setScrollYOffset(0);
        return;
      }
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Calculate relative offset as section scrolls into view
            const centerDistance = rect.top + rect.height / 2 - windowHeight / 2;
            setScrollYOffset(centerDistance);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    if (window.innerWidth >= 1024) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setScrollYOffset(0);
      } else {
        handleScroll();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Compute smooth parallax translate values (strictly 0 on mobile to prevent overlapping)
  const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 1024 : false;
  const bgShift = isDesktop ? scrollYOffset * 0.12 : 0;
  const cardFloat1 = isDesktop ? scrollYOffset * -0.15 : 0;
  const cardFloat2 = isDesktop ? scrollYOffset * 0.18 : 0;
  const badgeFloat = isDesktop ? scrollYOffset * -0.22 : 0;

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-28 md:py-36 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-y border-slate-800"
      aria-label="Engineering Benchmark Parallax Showcase"
    >
      {/* 1. Parallax Layer: Ambient Glows & High-Tech Circuit Background */}
      <div 
        className="absolute inset-0 pointer-events-none transform-gpu will-change-transform"
        style={{ transform: bgShift ? `translate3d(0, ${bgShift}px, 0)` : undefined }}
      >
        <div className="hidden md:block absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-[#BBE7F1]/10 rounded-full blur-[140px]" />
        <div className="hidden md:block absolute bottom-1/4 right-1/5 w-[450px] h-[450px] bg-sky-500/15 rounded-full blur-[130px]" />
        <div className="md:hidden absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#BBE7F1]/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-tech-circuit opacity-30" />
      </div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Mission, Vision & Engineering Value (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            <div className="inline-flex items-center gap-2 text-cyan-300 font-['Playfair_Display'] italic text-base sm:text-lg lg:text-xl font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>The WebDev Cross-Border Advantage</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold text-white font-['Archivo'] tracking-tight leading-[1.2]">
              Industrial Rigor Meets <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-[#BBE7F1] to-sky-200">
                Computational Agility
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              Most offshore development fails due to communication gaps, poor code stewardship, and zero architectural governance. We eliminated that by embedding German engineering precision directly into our Bangladesh full-stack squad culture.
            </p>

            {/* Metric Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-inner">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#BBE7F1] font-['Archivo']">500+</div>
                <div className="text-[11px] text-slate-400 mt-1 font-medium">Deployments</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-inner">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-['Archivo']">99.98%</div>
                <div className="text-[11px] text-slate-400 mt-1 font-medium">Uptime SLA</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-inner">
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-['Archivo']">14+ Hrs</div>
                <div className="text-[11px] text-slate-400 mt-1 font-medium">Daily Overlap</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-inner">
                <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-['Archivo']">100%</div>
                <div className="text-[11px] text-slate-400 mt-1 font-medium">IP Ownership</div>
              </div>
            </div>

            {/* Direct Consultation Action */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onContactClick}
                className="bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] text-slate-950 font-bold text-xs sm:text-sm px-7 py-4 rounded-xl border border-[#9cd5e2] shadow-sm transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <span>Consult With Lead Architect Directly</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Response in &lt; 12 Hours</span>
              </span>
            </div>

          </div>

          {/* Right Column: Layered 3D Depth Parallax Telemetry Cards (5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Parallax Card 1: Core System Architecture Terminal */}
            <div 
              className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-5 transform-gpu will-change-transform"
              style={{ transform: cardFloat1 ? `translate3d(0, ${cardFloat1}px, 0)` : undefined }}
            >
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                  <span className="text-[11px] font-mono text-slate-400 ml-2">webdev-cluster.prod.sh</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800/60">
                  ALL SYSTEMS NOMINAL
                </span>
              </div>

              {/* Code / Telemetry Log */}
              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="flex items-center justify-between text-slate-400">
                  <span>[CONTAINER_ENGINE] Microservices Mesh:</span>
                  <span className="text-cyan-300 font-bold">ONLINE (High-Throughput)</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>[SECURITY_SHIELD] Zero-Trust / GDPR Compliance:</span>
                  <span className="text-purple-400 font-bold">VERIFIED 100%</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>[SLA_MONITOR] Mean Response Latency:</span>
                  <span className="text-emerald-400 font-bold">18.4 ms</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>[DEPLOYMENT_PIPELINE] Zero Downtime:</span>
                  <span className="text-sky-400 font-bold">ACTIVE</span>
                </div>
              </div>

              {/* Security & Reliability Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>German GDPR Standards</span>
                </div>
                <span className="text-slate-500 text-[11px]">Audit v2.8</span>
              </div>
            </div>

            {/* Parallax Floating Badge 2: Floating High-Availability Pill */}
            <div 
              className="hidden sm:flex absolute -bottom-8 -left-8 bg-gradient-to-r from-slate-900/95 to-slate-950/95 border border-[#9cd5e2]/40 p-4 rounded-2xl shadow-xl backdrop-blur-md items-center gap-3 transform-gpu will-change-transform z-20"
              style={{ transform: `translate3d(0, ${cardFloat2}px, 0)` }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#BBE7F1]/20 text-cyan-300 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-['Archivo']">Sub-25ms Distributed Edge</div>
                <div className="text-[11px] text-slate-300">USA & Europe Content Delivery</div>
              </div>
            </div>

            {/* Parallax Floating Badge 3: Top Right Direct Contact Badge */}
            <div 
              className="hidden sm:flex absolute -top-8 -right-6 bg-slate-900/95 border border-slate-700/80 p-3.5 rounded-2xl shadow-xl backdrop-blur-md items-center gap-2.5 transform-gpu will-change-transform z-20"
              style={{ transform: `translate3d(0, ${badgeFloat}px, 0)` }}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-slate-200">
                Direct WhatsApp & Call Available
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
