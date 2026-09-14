'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Shield, Clock, Globe } from 'lucide-react';
import { HeroSlide } from '../types';
import { initialHeroSlides } from '../data/initialData';

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
  const slides = (customSlides && customSlides.length > 0) ? customSlides : initialHeroSlides;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide duration in milliseconds
  const AUTO_PLAY_INTERVAL = 6000;

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }, [currentIndex, slides.length, goToSlide]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  }, [currentIndex, slides.length, goToSlide]);

  // Auto advance timer
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    timerRef.current = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused, slides.length, handleNext]);

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

  return (
    <section
      className="relative h-[680px] xs:h-[660px] sm:h-[620px] md:h-[640px] lg:h-[700px] w-full flex items-center overflow-hidden bg-slate-950 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Showcase"
    >
      {/* Background Image Slides */}
      {slides.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.id || `slide-${idx}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out pointer-events-none ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
            }`}
          >
            {/* Background Image with subtle Ken Burns motion */}
            {slide.backgroundImage && slide.backgroundImage.trim() !== '' ? (
              <img
                suppressHydrationWarning
                src={slide.backgroundImage}
                alt={slide.title}
                className={`w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            ) : null}

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,_rgba(79,70,229,0.18),_transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,_rgba(6,182,212,0.15),_transparent_60%)]" />
          </div>
        );
      })}

      {/* Hero Content Container - Centered with consistent vertical clearance */}
      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:py-16 lg:py-20 w-full">
        <div className="max-w-3xl">
          {/* Animated Slide Content Box with smooth cross-fade */}
          <div className={`transition-all duration-500 ease-out ${
            isTransitioning ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
          }`}>
            {/* Eyebrow / Stylish Italic Subheading (No Background) */}
            <div className="inline-flex items-center gap-2 text-cyan-300 font-['Playfair_Display'] italic text-base sm:text-lg font-semibold tracking-wide mb-3.5 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{currentSlide.badge}</span>
            </div>

            {/* Headline with reserved height for zero layout shift across slides */}
            <div className="min-h-[72px] xs:min-h-[82px] sm:min-h-[96px] md:min-h-[115px] lg:min-h-[135px] flex items-center">
              <h1 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-[1.18] font-['Archivo']">
                {currentSlide.title}{' '}
                {currentSlide.highlightText && (
                  <span className="bg-gradient-to-r from-[#BBE7F1] via-teal-200 to-sky-300 bg-clip-text text-transparent">
                    {currentSlide.highlightText}
                  </span>
                )}
              </h1>
            </div>

            {/* Subtitle / Description with reserved height for identical slide dimensions */}
            <div className="min-h-[62px] sm:min-h-[56px] lg:min-h-[58px] flex items-start mt-3 sm:mt-4">
              <p className="text-xs xs:text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl font-['Instrument_Sans'] tracking-wide">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 min-h-[48px] flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => executeAction(currentSlide.primaryBtnAction || 'quote')}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] text-slate-950 font-bold text-sm sm:text-base border border-[#9cd5e2] transition-all duration-150 active:scale-[0.98] cursor-pointer shadow-xs"
              >
                <span>{currentSlide.primaryBtnText || 'Request Consultation'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 text-slate-950" />
              </button>

              {currentSlide.secondaryBtnText && (
                <button
                  onClick={() => executeAction(currentSlide.secondaryBtnAction || 'services')}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white font-medium text-sm sm:text-base backdrop-blur-md transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  <span>{currentSlide.secondaryBtnText}</span>
                </button>
              )}
            </div>
          </div>

          {/* Micro Trust Indicators - Locked position for rock-solid stability */}
          <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-cyan-400">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-white block text-xs sm:text-sm">Global Delivery</span>
                <span className="text-slate-400 text-[11px] sm:text-xs">Serving US & EU Clients</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#BBE7F1]">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-white block text-xs sm:text-sm">Enterprise Security</span>
                <span className="text-slate-400 text-[11px] sm:text-xs">100% IP & NDA Protected</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-emerald-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-white block text-xs sm:text-sm">Rapid Delivery</span>
                <span className="text-slate-400 text-[11px] sm:text-xs">Agile Sprints & 24/7 CI/CD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Navigation Controls */}
      <div className="absolute right-4 sm:right-8 bottom-6 sm:bottom-8 z-20 flex items-center gap-3">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 backdrop-blur-md flex items-center justify-center text-white transition-all hover:border-white/30 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Counter & Indicators */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300">
          {slides.map((_, i) => (
            <button
              key={`dot-${i}`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentIndex
                  ? 'w-6 bg-cyan-400'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
          <span className="ml-1 text-slate-400 font-sans text-xs">
            0{currentIndex + 1} / 0{slides.length}
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 backdrop-blur-md flex items-center justify-center text-white transition-all hover:border-white/30 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Autoplay Progress Bar */}
      {!isPaused && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
          <div
            key={currentIndex}
            className="h-full bg-gradient-to-r from-cyan-400 via-[#BBE7F1] to-cyan-300 animate-slideProgress"
            style={{ animationDuration: `${AUTO_PLAY_INTERVAL}ms` }}
          />
        </div>
      )}
    </section>
  );
};
