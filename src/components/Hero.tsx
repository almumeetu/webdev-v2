import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, CheckCircle2, Shield, Zap, Globe, Cpu } from 'lucide-react';
import { gsap, useGsapContext } from '../utils/gsapHelper';

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
  const contentRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  const handleExplore = onExploreClick || onExploreServices || (() => {});
  const handleContact = onContactClick || onOpenQuote || (() => {});

  const slides = [
    {
      badge: 'EMPOWER YOUR BUSINESS',
      title: 'Technology Products and Solutions',
      subtitle: 'Driving operational and business excellence with intelligent technology, full-stack MERN web platforms, and rock-solid server engineering.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
      tag: 'Joypurhat, Bangladesh & Leverkusen, Germany',
      statLabel: 'International Engineering Hubs'
    },
    {
      badge: 'HIGH AVAILABILITY CLOUD INFRASTRUCTURE',
      title: 'Enterprise Server & Cloud Architecture',
      subtitle: 'Deploying high-throughput Linux clusters, Nginx reverse proxies, Docker container orchestration, and 99.99% uptime server management.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
      tag: 'German Hetzner & Global Edge Nodes',
      statLabel: 'Sub-second Global Latency'
    },
    {
      badge: 'SCALABLE DIGITAL COMMERCE',
      title: 'Next-Gen E-Commerce & Web Applications',
      subtitle: 'Specializing in custom headless Shopify, high-load WooCommerce, React 19 web applications, and multi-currency international checkouts.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
      tag: 'DACH Region & South Asian Markets',
      statLabel: '+40% Avg Conversion Boost'
    }
  ];

  // Auto advance slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [slides.length]);

  // GSAP Animation for slide transitions
  useGsapContext(heroRef, () => {
    if (!contentRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(
      '.hero-badge',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo(
      '.hero-title',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(
      '.hero-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo(
      '.hero-cta',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(
      '.hero-hubs',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.2'
    );

    // Floating right card animation
    if (rightCardRef.current) {
      gsap.fromTo(
        rightCardRef.current,
        { opacity: 0, x: 30, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
      );
      // Subtle ambient hover float
      gsap.to(rightCardRef.current, {
        y: -6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <div 
      ref={heroRef}
      className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] bg-[#080c14] text-white flex items-center overflow-hidden border-b border-slate-800"
    >
      
      {/* Background Hero Image with dark high-tech gradient overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={slide.image} 
          alt={slide.title} 
          className="w-full h-full object-cover object-center opacity-20 filter grayscale contrast-125 transition-all duration-1000 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080c14] via-[#080c14]/90 to-[#080c14]/70"></div>
        <div className="absolute inset-0 bg-tech-circuit opacity-35"></div>
        {/* Subtle geometric light accent in indigo */}
        <div className="absolute top-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Content (Left 8 cols) */}
          <div ref={contentRef} className="lg:col-span-8 space-y-5 sm:space-y-6">
            
            {/* Tagline / Eyebrow badge matching reference */}
            <div className="hero-badge inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-indigo-300 uppercase font-mono">
                {slide.badge}
              </span>
            </div>

            {/* Display Headline with responsive scaling */}
            <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-['Outfit']">
              {slide.title}
            </h1>

            {/* Subheading */}
            <p className="hero-subtitle text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              {slide.subtitle}
            </p>

            {/* Dual Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                id="hero-read-more-btn"
                onClick={handleExplore}
                className="hero-cta bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-sm sm:text-base px-6 sm:px-7 py-3.5 rounded-xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center justify-center gap-2.5 group cursor-pointer min-h-[44px]"
              >
                <span>EXPLORE SERVICES</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-start-project-btn"
                onClick={handleContact}
                className="hero-cta bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm sm:text-base px-6 py-3.5 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>GET A FREE ESTIMATE</span>
              </button>
            </div>

            {/* Company Branch highlights badge */}
            <div className="hero-hubs pt-3 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
                <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-slate-200 font-medium">Headquarters: Joypurhat, Bangladesh</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
                <Shield className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-slate-200 font-medium">European Branch: Leverkusen, Germany</span>
              </div>
            </div>

          </div>

          {/* Right side floating feature preview (Right 4 cols) */}
          <div ref={rightCardRef} className="hidden lg:block lg:col-span-4">
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
              <div className="absolute -top-3 -right-3 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Active Operations
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs text-slate-400 font-mono">CLIENT REACH</span>
                  <span className="text-xs font-semibold text-emerald-400">Global & Cross-Border</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Full-Stack & MERN</div>
                      <div className="text-xs text-slate-400">React 19, Node.js, Express, MongoDB</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Cloud Server Mesh</div>
                      <div className="text-xs text-slate-400">Nginx, Docker, Linux, 99.99% SLA</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">E-Commerce Specialist</div>
                      <div className="text-xs text-slate-400">Shopify Plus, WooCommerce, Headless</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
                  <span>German Engineering Quality</span>
                  <span className="text-indigo-400 font-bold">100% Reliable</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Slide Pagination Controls */}
        <div className="mt-8 sm:mt-12 pt-5 sm:pt-6 border-t border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === idx ? 'w-8 sm:w-10 bg-indigo-500' : 'w-2.5 sm:w-3 bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer min-w-[40px] min-h-[40px]"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer min-w-[40px] min-h-[40px]"
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
