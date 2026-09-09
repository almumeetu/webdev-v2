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
      title: 'Technology Products & Digital Solutions',
      subtitle: 'Driving operational and business excellence with intelligent technology, full-stack MERN web platforms, high-performance cloud architecture, and rock-solid server engineering.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
      tag: 'Headquarters: Joypurhat, Bangladesh • Global Delivery',
      statLabel: 'Worldwide Enterprise Clients'
    },
    {
      badge: 'HIGH AVAILABILITY CLOUD INFRASTRUCTURE',
      title: 'Enterprise Server & Cloud Architecture',
      subtitle: 'Deploying high-throughput Linux clusters, Nginx reverse proxies, Docker container orchestration, automated CI/CD, and 99.99% uptime server management.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
      tag: 'Global Edge Cloud & Hardened Security',
      statLabel: 'Sub-second Global Latency'
    },
    {
      badge: 'SCALABLE DIGITAL COMMERCE',
      title: 'Next-Gen E-Commerce & Web Applications',
      subtitle: 'Specializing in custom headless Shopify, high-load WooCommerce, React 19 web applications, multi-currency international checkouts, and high conversion rates.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
      tag: 'USA, UK, European & International Markets',
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
      className="relative min-h-[600px] sm:min-h-[660px] lg:min-h-[740px] bg-white text-slate-900 flex items-center overflow-hidden border-b border-slate-200/90"
    >
      {/* Background with soft/light image ("halka image") and elegant gradient overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src={slide.image} 
          alt={slide.title} 
          className="w-full h-full object-cover object-center opacity-[0.09] filter contrast-125 transition-all duration-1000 transform scale-105"
        />
        {/* Soft light gradient overlays to ensure extreme clarity & readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80"></div>
        <div className="absolute inset-0 bg-tech-circuit-light opacity-60"></div>
        
        {/* Subtle ambient indigo & violet light accents */}
        <div className="absolute top-10 right-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Hero Content (Left 8 cols) */}
          <div ref={contentRef} className="lg:col-span-8 space-y-5 sm:space-y-6">
            
            {/* Tagline / Eyebrow badge */}
            <div className="hero-badge inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200/80 px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-indigo-700 uppercase font-mono">
                {slide.badge}
              </span>
            </div>

            {/* Display Headline with international standard typography */}
            <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12] font-['Outfit']">
              {slide.title}
            </h1>

            {/* Subheading */}
            <p className="hero-subtitle text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
              {slide.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                id="hero-read-more-btn"
                onClick={handleExplore}
                className="hero-cta bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all flex items-center justify-center gap-2.5 group cursor-pointer min-h-[44px]"
              >
                <span>EXPLORE SERVICES</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-start-project-btn"
                onClick={handleContact}
                className="hero-cta bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-slate-300 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>GET A FREE ESTIMATE</span>
              </button>
            </div>

            {/* Company Headquarters & International Reach highlights badge */}
            <div className="hero-hubs pt-3 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3.5 py-2 rounded-xl shadow-xs">
                <Globe className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="text-slate-800 font-semibold">Headquarters: Joypurhat, Bangladesh</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3.5 py-2 rounded-xl shadow-xs">
                <Shield className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="text-slate-800 font-semibold">Serving Global Clients: USA, UK, Germany & Worldwide</span>
              </div>
            </div>

          </div>

          {/* Right side floating feature preview (Right 4 cols) - International Standard Card */}
          <div ref={rightCardRef} className="hidden lg:block lg:col-span-4">
            <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-2xl relative text-slate-900">
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-[10px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                Active Operations
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs text-slate-400 font-mono font-semibold">CLIENT REACH</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                    Worldwide Delivery
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-xs">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Full-Stack & MERN</div>
                      <div className="text-xs text-slate-500">React 19, Next.js, Node, Express, MongoDB</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 shadow-xs">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Cloud & Server Mesh</div>
                      <div className="text-xs text-slate-500">Linux, Nginx, Docker, 99.99% Uptime</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 shadow-xs">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">E-Commerce Specialist</div>
                      <div className="text-xs text-slate-500">Shopify Plus, WooCommerce, Headless</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                  <span>Enterprise Engineering Quality</span>
                  <span className="text-indigo-600 font-bold">100% Reliable Code</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Slide Pagination Controls */}
        <div className="mt-8 sm:mt-12 pt-5 sm:pt-6 border-t border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === idx ? 'w-8 sm:w-10 bg-indigo-600' : 'w-2.5 sm:w-3 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-400 transition-colors shadow-xs cursor-pointer min-w-[40px] min-h-[40px]"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-400 transition-colors shadow-xs cursor-pointer min-w-[40px] min-h-[40px]"
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
