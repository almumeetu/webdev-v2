import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger safely in browser context
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Scoped GSAP context hook that automatically reverts and cleans up
 * all triggers, timelines, and event listeners on component unmount.
 */
export function useGsapContext(
  scopeRef: React.RefObject<HTMLElement | null>,
  effect: (context: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    if (!scopeRef.current) return;

    // Respect reduced motion accessibility preferences
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context((self) => {
      effect(self);
    }, scopeRef.current);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Reveal an element with slide-up and fade-in when entering the viewport.
 * Automatically adapts durations and offsets for mobile to prevent lag and overlapping.
 */
export function animateReveal(
  target: string | HTMLElement | Element | null,
  triggerEl?: HTMLElement | null,
  delay: number = 0,
  yOffset: number = 24
) {
  if (!target) return;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const effectiveOffset = isMobile ? Math.min(yOffset, 12) : yOffset;
  const effectiveDuration = isMobile ? 0.38 : 0.65;
  const effectiveTrigger = triggerEl ? {
    trigger: triggerEl,
    start: isMobile ? 'top 92%' : 'top 88%',
    once: true
  } : undefined;

  gsap.fromTo(
    target,
    { opacity: 0, y: effectiveOffset },
    {
      opacity: 1,
      y: 0,
      duration: effectiveDuration,
      delay,
      ease: isMobile ? 'power1.out' : 'power2.out',
      scrollTrigger: effectiveTrigger,
      clearProps: 'transform,opacity'
    }
  );
}

/**
 * Stagger an array of child elements when entering the viewport.
 * Uses snappy timings and low y-offset on mobile to prevent sluggish lag and overlapping.
 */
export function animateStagger(
  targets: string | HTMLElement[] | NodeListOf<Element>,
  triggerEl: HTMLElement | null,
  stagger: number = 0.1,
  yOffset: number = 30
) {
  if (!triggerEl) return;
  if (typeof targets === 'string') {
    const found = triggerEl.querySelectorAll(targets);
    if (found.length === 0) return;
  }
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const effectiveOffset = isMobile ? Math.min(yOffset, 12) : yOffset;
  const effectiveDuration = isMobile ? 0.36 : 0.6;
  const effectiveStagger = isMobile ? Math.min(stagger, 0.04) : stagger;

  gsap.fromTo(
    targets,
    { opacity: 0, y: effectiveOffset },
    {
      opacity: 1,
      y: 0,
      duration: effectiveDuration,
      stagger: effectiveStagger,
      ease: isMobile ? 'power1.out' : 'power2.out',
      scrollTrigger: {
        trigger: triggerEl,
        start: isMobile ? 'top 92%' : 'top 85%',
        once: true
      },
      clearProps: 'transform,opacity'
    }
  );
}

/**
 * Animate numbers counting up smoothly when entering the viewport
 */
export function animateCounter(
  element: HTMLElement | null,
  endValue: number,
  prefix: string = '',
  suffix: string = '',
  duration: number = 2
) {
  if (!element) return;
  const obj = { val: 0 };

  gsap.to(obj, {
    val: endValue,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 88%',
      once: true
    },
    onUpdate: () => {
      element.innerText = `${prefix}${Math.floor(obj.val)}${suffix}`;
    }
  });
}
