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
 * Reveal an element with slide-up and fade-in when entering the viewport
 */
export function animateReveal(
  target: string | HTMLElement | Element | null,
  triggerEl?: HTMLElement | null,
  delay: number = 0,
  yOffset: number = 30
) {
  if (!target) return;
  gsap.fromTo(
    target,
    { opacity: 0, y: yOffset },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: triggerEl ? {
        trigger: triggerEl,
        start: 'top 88%',
        once: true
      } : undefined
    }
  );
}

/**
 * Stagger an array of child elements when entering the viewport
 */
export function animateStagger(
  targets: string | HTMLElement[] | NodeListOf<Element>,
  triggerEl: HTMLElement | null,
  stagger: number = 0.12,
  yOffset: number = 40
) {
  if (!triggerEl) return;
  gsap.fromTo(
    targets,
    { opacity: 0, y: yOffset },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 85%',
        once: true
      }
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
