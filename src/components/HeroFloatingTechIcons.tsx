'use client';

import React from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiPython,
  SiPostgresql,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';

interface TechFloatingItem {
  name: string;
  Icon: React.ElementType;
  color: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  animationClass: string;
  delay: string;
  size: number;
  visibilityClass?: string;
}

// Technologies arranged with generous distance around the perimeter so they don't crowd
const TECH_ITEMS: TechFloatingItem[] = [
  // ── LEFT SIDE (Wide vertical gap between icons) ──
  {
    name: 'React',
    Icon: SiReact,
    color: '#0284C7',
    left: '1.5%',
    top: '28%',
    animationClass: 'animate-tech-float-2',
    delay: '1.4s',
    size: 16,
    visibilityClass: 'hidden lg:flex',
  },
  {
    name: 'Node.js',
    Icon: SiNodedotjs,
    color: '#16A34A',
    left: '1.5%',
    bottom: '20%',
    animationClass: 'animate-tech-float-4',
    delay: '2.5s',
    size: 16,
    visibilityClass: 'hidden md:flex',
  },

  // ── BOTTOM ROW (Evenly spaced across the bottom) ──
  {
    name: 'PostgreSQL',
    Icon: SiPostgresql,
    color: '#4338CA',
    left: '8%',
    bottom: '3%',
    animationClass: 'animate-tech-float-6',
    delay: '0.9s',
    size: 16,
    visibilityClass: 'hidden lg:flex',
  },
  {
    name: 'Tailwind CSS',
    Icon: SiTailwindcss,
    color: '#06B6D4',
    left: '26%',
    bottom: '2%',
    animationClass: 'animate-tech-float-3',
    delay: '1.8s',
    size: 15,
    visibilityClass: 'hidden xl:flex',
  },
  {
    name: 'AWS',
    Icon: FaAws,
    color: '#D97706',
    right: '8%',
    bottom: '3%',
    animationClass: 'animate-tech-float-6',
    delay: '3.0s',
    size: 17,
    visibilityClass: 'hidden xl:flex',
  },

  // ── RIGHT SIDE (Wide vertical gap between icons) ──
  {
    name: 'Next.js',
    Icon: SiNextdotjs,
    color: '#0F172A',
    right: '1.5%',
    top: '24%',
    animationClass: 'animate-tech-float-5',
    delay: '1.2s',
    size: 16,
    visibilityClass: 'hidden lg:flex',
  },
  {
    name: 'Python',
    Icon: SiPython,
    color: '#0284C7',
    right: '1.5%',
    bottom: '26%',
    animationClass: 'animate-tech-float-5',
    delay: '3.4s',
    size: 16,
    visibilityClass: 'hidden lg:flex',
  },
];

export const HeroFloatingTechIcons: React.FC = () => {
  return (
    <div
      className="hero-floating-tech-icons pointer-events-none absolute inset-0 overflow-hidden z-10"
      aria-hidden="true"
    >
      {TECH_ITEMS.map((tech) => (
        <div
          key={tech.name}
          className={`absolute transition-all duration-300 ${
            tech.visibilityClass || 'hidden lg:flex'
          } ${tech.animationClass}`}
          style={{
            top: tech.top,
            bottom: tech.bottom,
            left: tech.left,
            right: tech.right,
            animationDelay: tech.delay,
          }}
        >
          <div
            className="group relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-2xs transition-all duration-300 hover:scale-115 hover:-translate-y-0.5 hover:border-sky-400/80 hover:shadow-md hover:shadow-sky-500/10 cursor-pointer pointer-events-auto"
            title={tech.name}
          >
            <tech.Icon
              className="relative z-10 shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{ color: tech.color, width: tech.size, height: tech.size }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroFloatingTechIcons;
