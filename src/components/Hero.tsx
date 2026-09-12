import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, CheckCircle2, Shield, Zap, Globe, Cpu, Server, Lock } from 'lucide-react';

interface HeroProps {
  onExploreClick?: () => void;
  onExploreServices?: () => void;
  onContactClick?: () => void;
  onOpenQuote?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onExploreClick, 
  onExploreServices, 
  onContactClick, 
  onOpenQuote 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleExplore = onExploreClick || onExploreServices || (() => {});
  const handleContact = onContactClick || onOpenQuote || (() => {});

  const slides = [
    {
      badge: 'GLOBAL ENTERPRISE ARCHITECTURE',
      badgeColor: 'bg-indigo-950/85 border-indigo-500/50 text-indigo-300',
      beaconColor: 'bg-indigo-400',
      title: 'Empowering High-Growth Enterprises Across USA, UK & Europe',
      subtitle: 'Delivering mission-critical full-stack MERN web platforms, ultra-scalable SaaS systems, and hardened cloud engineering for industry leaders and ambitious digital brands worldwide.',
      image: '/images/banner/webdev-banner.webp',
      glow: 'bg-indigo-600/25',
      accentColor: 'text-indigo-400',
      telemetry: {
        headerBadge: 'FULL-STACK MERN HUB',
        status: 'Active Deployment',
        statusColor: 'text-emerald-400 bg-emerald-950/70 border-emerald-500/40',
        items: [
          {
            title: 'Modern React 19 & Next.js',
            sub: 'SSR, Edge Rendering, TailwindCSS & TypeScript',
            icon: Cpu,
            iconClass: 'bg-indigo-950/80 border-indigo-500/30 text-indigo-400'
          },
          {
            title: 'Robust Node & Express APIs',
            sub: 'Microservices, GraphQL, MongoDB & PostgreSQL',
            icon: Zap,
            iconClass: 'bg-cyan-950/80 border-cyan-500/30 text-cyan-400'
          },
          {
            title: 'Global Delivery Track Record',
            sub: '500+ Enterprise Projects Deployed with Zero Bug Rate',
            icon: Globe,
            iconClass: 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400'
          }
        ],
        footerLeft: 'Engineering Quality Standard',
        footerRight: '100% Reliable Code'
      }
    },
    {
      badge: 'HIGH AVAILABILITY CLOUD INFRASTRUCTURE',
      badgeColor: 'bg-cyan-950/85 border-cyan-500/50 text-cyan-300',
      beaconColor: 'bg-cyan-400',
      title: 'Enterprise Server Mesh & Zero-Downtime DevOps',
      subtitle: 'Hardened Linux bare-metal clusters, Nginx reverse proxies, Docker/Kubernetes orchestration, and 24/7 proactive monitoring built to German BaFin & GDPR security benchmarks.',
      image: '/images/banner/webdev-2.webp',
      glow: 'bg-cyan-500/25',
      accentColor: 'text-cyan-400',
      telemetry: {
        headerBadge: 'SERVER MESH OPERATIONS',
        status: '99.99% SLA Uptime',
        statusColor: 'text-cyan-400 bg-cyan-950/70 border-cyan-500/40',
        items: [
          {
            title: 'Linux Bare-Metal & Hetzner Mesh',
            sub: 'Nginx reverse proxies, Let’s Encrypt TLS & FastCGI',
            icon: Server,
            iconClass: 'bg-cyan-950/80 border-cyan-500/30 text-cyan-400'
          },
          {
            title: 'Docker & Kubernetes CI/CD',
            sub: 'Automated GitHub Actions deployment pipeline',
            icon: Zap,
            iconClass: 'bg-indigo-950/80 border-indigo-500/30 text-indigo-400'
          },
          {
            title: 'Strict GDPR & BaFin Security',
            sub: 'Hardened firewall, OWASP Top 10 mitigation & audit ready',
            icon: Shield,
            iconClass: 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400'
          }
        ],
        footerLeft: 'Frankfurt & US Edge Mesh',
        footerRight: 'Zero Downtime'
      }
    },
    {
      badge: 'HIGH-CONVERTING DIGITAL COMMERCE',
      badgeColor: 'bg-purple-950/85 border-purple-500/50 text-purple-300',
      beaconColor: 'bg-purple-400',
      title: 'Headless E-Commerce & Next-Gen Web Applications',
      subtitle: 'Architecting custom headless Shopify Plus storefronts, high-throughput WooCommerce clusters, and React 19 web applications for top retailers across North America and Western Europe.',
      image: '/images/banner/web-3.webp',
      glow: 'bg-purple-600/25',
      accentColor: 'text-purple-400',
      telemetry: {
        headerBadge: 'GLOBAL RETAIL COMMERCE',
        status: '+38% Conversion Gain',
        statusColor: 'text-purple-400 bg-purple-950/70 border-purple-500/40',
        items: [
          {
            title: 'Headless Shopify Plus & Liquid',
            sub: 'Custom Storefront API, checkout UI & sub-second speed',
            icon: Globe,
            iconClass: 'bg-purple-950/80 border-purple-500/30 text-purple-400'
          },
          {
            title: 'High-Throughput WooCommerce',
            sub: 'Redis object caching, MariaDB clustering & Stripe API',
            icon: Zap,
            iconClass: 'bg-amber-950/80 border-amber-500/30 text-amber-400'
          },
          {
            title: 'Sub-Second Core Web Vitals',
            sub: 'Optimized CDN delivery across North America & Europe',
            icon: CheckCircle2,
            iconClass: 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400'
          }
        ],
        footerLeft: 'International Payment Mesh',
        footerRight: 'Multi-Currency Ready'
      }
    }
  ];

  // Auto advance slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div 
      ref={heroRef}
      className="relative min-h-[640px] sm:min-h-[700px] lg:min-h-[780px] bg-slate-950 text-white flex items-center overflow-hidden border-b border-slate-800"
    >
      {/* Dynamic High-Res Banner Background Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out transform ${
              currentSlide === idx 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img 
              src={s.image} 
              alt={s.title} 
              className="w-full h-full object-cover object-center lg:object-right filter contrast-110 brightness-90"
            />
            {/* Cinematic Gradient Overlays: Deep slate from left for text contrast, letting 3D graphics glow on right */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 sm:via-slate-950/80 to-slate-950/40 lg:to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-transparent"></div>

            {/* Slide-specific ambient color glow */}
            <div className={`absolute -top-24 left-1/4 w-72 sm:w-96 h-72 sm:h-96 ${s.glow} rounded-full blur-3xl md:blur-[140px]`}></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Hero Content (Left 8 cols) - Smoothly keyed to currentSlide */}
          <div 
            key={currentSlide} 
            className="lg:col-span-8 space-y-5 sm:space-y-6 animate-hero-fade-in"
          >
            
            {/* Eyebrow clean subtitle without pill background */}
            <div className="inline-flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${slide.beaconColor} animate-ping`}></span>
              <span className={`text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase font-mono ${slide.accentColor}`}>
                {slide.badge}
              </span>
            </div>

            {/* Display Headline with international standard typography */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.14] font-['Outfit'] drop-shadow-md">
              {slide.title}
            </h1>

            {/* Subheading */}
            <p className="text-xs xs:text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed drop-shadow-xs">
              {slide.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                id="hero-read-more-btn"
                onClick={handleExplore}
                className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs xs:text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-lg shadow-indigo-600/40 hover:shadow-indigo-600/60 transition-all flex items-center justify-center gap-2.5 group cursor-pointer min-h-[44px]"
              >
                <span>EXPLORE SERVICES</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-start-project-btn"
                onClick={handleContact}
                className="bg-white/10 hover:bg-white/20 active:bg-white/15 text-white font-semibold text-xs xs:text-sm sm:text-base px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-white/25 shadow-md backdrop-blur-md transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>START A PROJECT / ESTIMATE</span>
              </button>
            </div>

            {/* Company Headquarters & International Reach highlights badge */}
            <div className="pt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-md">
                <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-slate-100 font-semibold">Headquarters: Joypurhat, Bangladesh</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-md">
                <Shield className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-slate-100 font-semibold">Leverkusen, Germany Branch • Global Reach</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-md text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-semibold">USA, UK & DACH Client Experience</span>
              </div>
            </div>

          </div>

          {/* Right side dynamic telemetry preview (Right 4 cols) */}
          <div 
            key={`card-${currentSlide}`}
            className="hidden lg:block lg:col-span-4 animate-hero-fade-in"
          >
            <div className="animate-float-slow bg-slate-950/80 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl relative text-white">
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-[10px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                {slide.telemetry.headerBadge}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs text-slate-400 font-mono font-semibold">SYSTEM TELEMETRY</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${slide.telemetry.statusColor}`}>
                    {slide.telemetry.status}
                  </span>
                </div>

                <div className="space-y-3.5">
                  {slide.telemetry.items.map((item, i) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-xs ${item.iconClass}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{item.title}</div>
                          <div className="text-xs text-slate-400">{item.sub}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3.5 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span>{slide.telemetry.footerLeft}</span>
                  <span className="text-indigo-400 font-bold">{slide.telemetry.footerRight}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Slide Pagination Controls */}
        <div className="mt-8 sm:mt-12 pt-5 sm:pt-6 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-xs font-mono text-slate-400 font-bold tracking-wider">
              <span className="text-indigo-400">{`0${currentSlide + 1}`}</span> / {`0${slides.length}`}
            </div>
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                    currentSlide === idx 
                      ? 'w-8 sm:w-10 bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.7)]' 
                      : 'w-2.5 sm:w-3 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="w-10 h-10 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-500 transition-colors shadow-lg cursor-pointer min-w-[40px] min-h-[40px]"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="w-10 h-10 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-500 transition-colors shadow-lg cursor-pointer min-w-[40px] min-h-[40px]"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
