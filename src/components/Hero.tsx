'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroSlide } from '../types';
import { initialHeroSlides } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';
import { SignatureShapeDivider } from './SignatureShapeDivider';

interface HeroProps {
  slides?: HeroSlide[];
  onExploreClick?: () => void;
  onExploreServices?: () => void;
  onContactClick?: () => void;
  onOpenQuote?: () => void;
  onNavigateProjects?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  slides: customSlides,
  onExploreClick,
  onExploreServices,
  onContactClick,
  onOpenQuote,
  onNavigateProjects,
}) => {
  const { lang, localizeHeroSlide } = useLanguage();
  const isDe = lang === 'de';

  const rawSlides = (customSlides && customSlides.length > 0) ? customSlides : initialHeroSlides;
  const slides = rawSlides.map((slide, idx) => localizeHeroSlide(slide, idx));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide duration in milliseconds (continuous auto-play)
  const AUTO_PLAY_INTERVAL = 5500;

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }, [currentIndex, slides.length, goToSlide]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  }, [currentIndex, slides.length, goToSlide]);

  // Continuous Auto advance timer — always auto-plays smoothly
  useEffect(() => {
    if (slides.length <= 1) return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, slides.length, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Action dispatcher
  const executeAction = (action?: string) => {
    switch (action) {
      case 'quote':
        if (onOpenQuote) onOpenQuote();
        else if (onContactClick) onContactClick();
        break;
      case 'services':
        if (onExploreServices) onExploreServices();
        else if (onExploreClick) onExploreClick();
        break;
      case 'projects':
        if (onNavigateProjects) onNavigateProjects();
        else if (onExploreClick) onExploreClick();
        break;
      case 'contact':
        if (onContactClick) onContactClick();
        else if (onOpenQuote) onOpenQuote();
        break;
      default:
        if (onOpenQuote) onOpenQuote();
        break;
    }
  };

  const currentSlide = slides[currentIndex] || slides[0];

  // Short, punchy title definitions focused on Leverkusen & German Engineering
  const shortTitleData = isDe ? [
    {
      title: 'Enterprise Web-Engineering.',
      highlight: 'Präzise & Skalierbar.',
      subtitle: 'Wir entwickeln performante Webplattformen, Cloud-Infrastrukturen und maßgeschneiderte Unternehmenssoftware mit deutscher Ingenieurspräzision.'
    },
    {
      title: 'Moderne Cloud-Architektur.',
      highlight: 'Ausfallsicher & Schnell.',
      subtitle: 'Gehärtete Linux-Systeme, Next.js und Kubernetes-Infrastrukturen mit 99,99% garantierter Verfügbarkeit und voller DSGVO-Konformität.'
    },
    {
      title: 'Maßgeschneiderte Software.',
      highlight: '100% IP-Übertragung.',
      subtitle: 'Individuelle Webanwendungen und SaaS-Lösungen direkt aus Leverkusen – mit transparenten 14-Tage-Sprints und verbindlichen Festpreisen.'
    }
  ] : [
    {
      title: 'Enterprise Web Engineering.',
      highlight: 'Built for Scale.',
      subtitle: 'High-performance web platforms, resilient cloud architectures, and bespoke enterprise software engineered in Leverkusen, Germany.'
    },
    {
      title: 'Modern Cloud Architecture.',
      highlight: 'Fast & Resilient.',
      subtitle: 'Hardened cloud infrastructure, Next.js 15, and automated DevOps delivering 99.99% availability with complete GDPR compliance.'
    },
    {
      title: 'Tailored Software Solutions.',
      highlight: '100% IP Ownership.',
      subtitle: 'Bespoke digital applications built to rigorous German engineering standards – bilateral NDAs, rapid sprints, and direct technical leadership.'
    }
  ];

  const activeContent = shortTitleData[currentIndex] || shortTitleData[0];

  // Character-by-character serene kinetic wave typography renderer
  const renderAnimatedCharacters = (
    text: string,
    startCharIndex: number,
    isHighlight = false
  ) => {
    let charCounter = startCharIndex;
    const words = text.split(' ');

    const elements = words.map((word, wordIdx) => {
      const letters = Array.from(word);
      return (
        <span key={`slide-${currentIndex}-w-${wordIdx}`} className="inline-block whitespace-nowrap">
          {letters.map((char, letterIdx) => {
            const delay = `${charCounter * 0.065}s`;
            charCounter++;
            return (
              <span
                key={`slide-${currentIndex}-c-${wordIdx}-${letterIdx}-${char}`}
                className={isHighlight ? 'hero-char-highlight' : 'hero-char-animate'}
                style={{ animationDelay: delay }}
              >
                {char}
              </span>
            );
          })}
          {wordIdx < words.length - 1 && (
            <span
              key={`slide-${currentIndex}-space-${wordIdx}`}
              className={isHighlight ? 'hero-char-highlight' : 'hero-char-animate'}
              style={{ animationDelay: `${charCounter++ * 0.065}s` }}
            >
              &nbsp;
            </span>
          )}
        </span>
      );
    });

    return { elements, nextCharIndex: charCounter };
  };

  const titleResult = renderAnimatedCharacters(activeContent.title, 0, false);
  const highlightResult = renderAnimatedCharacters(activeContent.highlight, titleResult.nextCharIndex, true);

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#f0f7f9] via-[#f7fafc] to-[#ffffff] pt-16 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32 select-none"
      aria-label="Hero Showcase"
    >
      {/* ── 1. Tech Blueprint Matrix Grid with Precision Crosshairs ── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.55]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-tech-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(148, 163, 184, 0.16)" strokeWidth="0.8" />
              <path d="M -3 0 L 3 0 M 0 -3 L 0 3" stroke="rgba(2, 132, 199, 0.28)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-tech-grid)" />
        </svg>
      </div>

      {/* ── 2. Subtle Tech Circuit Traces & Network Nodes (Left Flank) ── */}
      <svg 
        className="pointer-events-none absolute left-0 top-12 w-64 sm:w-72 h-[380px] opacity-35 hidden md:block" 
        viewBox="0 0 260 380" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 60 H70 L110 100 V180 L150 220 H250" stroke="#0284c7" strokeWidth="1.2" strokeOpacity="0.3" strokeDasharray="3 3" />
        <path d="M0 140 H50 L90 180 H170 L210 220 V320" stroke="#9cd5e2" strokeWidth="1.2" strokeOpacity="0.4" />
        <path d="M0 240 H80 L120 280 H200" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.25" />
        <circle cx="110" cy="100" r="3" fill="#0284c7" fillOpacity="0.4" />
        <circle cx="150" cy="220" r="3.5" fill="#9cd5e2" fillOpacity="0.6" />
        <circle cx="90" cy="180" r="2.5" fill="#0284c7" fillOpacity="0.35" />
        <circle cx="170" cy="180" r="3" fill="#9cd5e2" fillOpacity="0.5" />
        <circle cx="120" cy="280" r="2.5" fill="#0284c7" fillOpacity="0.4" />
        <text x="14" y="52" fill="#0284c7" fillOpacity="0.45" fontSize="9" fontFamily="monospace" letterSpacing="1">SYS // DE-NRW · 51373</text>
      </svg>

      {/* ── 3. Subtle Tech Circuit Traces & Cloud Topology (Right Flank) ── */}
      <svg 
        className="pointer-events-none absolute right-0 top-8 w-64 sm:w-72 h-[380px] opacity-35 hidden md:block" 
        viewBox="0 0 260 380" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M260 80 H180 L140 120 V200 L100 240 H0" stroke="#0284c7" strokeWidth="1.2" strokeOpacity="0.3" strokeDasharray="4 2" />
        <path d="M260 160 H200 L160 200 H80 L40 240 V340" stroke="#9cd5e2" strokeWidth="1.2" strokeOpacity="0.4" />
        <path d="M260 260 H170 L130 300 H50" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.25" />
        <circle cx="140" cy="120" r="3" fill="#0284c7" fillOpacity="0.4" />
        <circle cx="100" cy="240" r="3.5" fill="#9cd5e2" fillOpacity="0.6" />
        <circle cx="160" cy="200" r="2.5" fill="#0284c7" fillOpacity="0.35" />
        <circle cx="80" cy="200" r="3" fill="#9cd5e2" fillOpacity="0.5" />
        <text x="135" y="72" fill="#0284c7" fillOpacity="0.45" fontSize="9" fontFamily="monospace" letterSpacing="1">K8S · CLOUD // 99.99%</text>
      </svg>

      {/* ── 4. Soft Ambient Glow Aura ── */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[680px] sm:w-[900px] h-[340px] rounded-full bg-gradient-to-b from-[#BBE7F1]/50 via-[#9cd5e2]/25 to-transparent blur-3xl opacity-75" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* ── 5. Frosted Pill Badge (Leverkusen HQ) ── */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#9cd5e2]/80 text-slate-800 text-xs font-mono font-medium shadow-2xs mb-5 sm:mb-6 transition-all hover:border-[#9cd5e2] hover:bg-white">
          <span className="tracking-wide">
            {isDe ? '🇩🇪 SOFTWARE-ENGINEERING · LEVERKUSEN, DEUTSCHLAND' : '🇩🇪 SOFTWARE ENGINEERING · LEVERKUSEN, GERMANY'}
          </span>
        </div>

        {/* ── 6. Headline: Refined Non-Bold Scale with Ultra-Smooth Serene Flow ── */}
        <div className={`transition-all duration-700 ease-out ${
          isTransitioning ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
        }`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal sm:font-medium text-slate-900 tracking-tight leading-[1.28] font-['Kufam'] max-w-3xl mx-auto">
            {titleResult.elements}
            <span className="inline-block">&nbsp;</span>
            <span className="inline-block underline decoration-[#9cd5e2] decoration-2 underline-offset-8">
              {highlightResult.elements}
            </span>
          </h1>

          {/* ── 7. Concise, High-Legibility Subtitle ── */}
          <p className="mt-4 text-sm sm:text-base md:text-[17px] text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal font-['Kufam']">
            {activeContent.subtitle}
          </p>
        </div>

        {/* ── 4. High-Impact Action Buttons ── */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <button
            onClick={() => executeAction(currentSlide.primaryBtnAction || 'quote')}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] text-slate-950 font-semibold text-sm sm:text-base border border-[#9cd5e2] transition-all duration-200 shadow-xs hover:shadow-md hover:shadow-[#BBE7F1]/30 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
          >
            <span>{currentSlide.primaryBtnText || (isDe ? 'Beratung anfragen' : 'Request Consultation')}</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>

          <button
            onClick={() => executeAction(currentSlide.secondaryBtnAction || 'services')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/90 hover:bg-white border border-slate-200/90 hover:border-[#9cd5e2] text-slate-800 font-semibold text-sm sm:text-base backdrop-blur-md shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <span>{currentSlide.secondaryBtnText || (isDe ? 'Leistungen entdecken' : 'Explore Services')}</span>
          </button>
        </div>

        {/* ── 5. Minimal Slide Dots with Smooth Active Indicator ── */}
        {slides.length > 1 && (
          <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={`dot-${i}`}
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex
                    ? 'w-7 bg-sky-600'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}

      </div>

      {/* ── 6. Signature Architectural Shape Divider at the Bottom (Subtle, Static, Non-Wavy) ── */}
      <SignatureShapeDivider
        position="bottom"
        fillColor="text-white"
        heightClass="h-4 sm:h-5 md:h-6"
      />
    </section>
  );
};

export default Hero;
