'use client';

import React, { useId } from 'react';

export interface SignatureShapeDividerProps {
  /**
   * Position of the shape divider relative to its container:
   * - 'bottom': Transitions out of current section into the section below (e.g. Hero, Breadcrumb)
   * - 'top': Transitions into current section from the section above (e.g. Footer)
   */
  position?: 'top' | 'bottom';
  /**
   * Tailwind text color class or hex for the main surface fill (e.g. 'text-white', 'text-slate-50')
   * The SVG path uses `fill="currentColor"` so this color fills the matching side.
   */
  fillColor?: string;
  /**
   * Height class for responsiveness - default subtle scale (h-4 sm:h-5 md:h-6)
   */
  heightClass?: string;
  /**
   * Additional wrapper className
   */
  className?: string;
}

/**
 * Architectural Signature Shape Divider
 * Subtle, non-wavy precision architectural diagonal slope with a delicate hairline accent rim.
 * Completely static, clean, and softly visible without undulating curves.
 */
export const SignatureShapeDivider: React.FC<SignatureShapeDividerProps> = ({
  position = 'bottom',
  fillColor = 'text-white',
  heightClass = 'h-4 sm:h-5 md:h-6',
  className = '',
}) => {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const gradId = `sig-crest-${uid}`;
  const isTop = position === 'top';

  return (
    <div
      aria-hidden="true"
      className={`absolute left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10 ${
        isTop ? 'top-0 -translate-y-[1px]' : 'bottom-0 translate-y-[1px]'
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={`relative block w-full ${heightClass} ${fillColor}`}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.25" />
            <stop offset="20%" stopColor="#9cd5e2" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.75" />
            <stop offset="80%" stopColor="#9cd5e2" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {isTop ? (
          <>
            {/* Subtle soft tint underlay (Top) */}
            <path
              d="M0,3 L1440,21 L1440,0 L0,0 Z"
              fill="#BBE7F1"
              fillOpacity="0.25"
            />
            {/* Primary Destination Fill (Top) */}
            <path
              d="M0,0 L1440,18 L1440,0 L0,0 Z"
              fill="currentColor"
            />
            {/* Clean Static Hairline Stroke (Top) */}
            <path
              d="M0,0 L1440,18"
              stroke={`url(#${gradId})`}
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            {/* Subtle soft tint underlay (Bottom) */}
            <path
              d="M0,15 L1440,0 L1440,24 L0,24 Z"
              fill="#BBE7F1"
              fillOpacity="0.25"
            />
            {/* Primary Destination Fill (Bottom) */}
            <path
              d="M0,18 L1440,2 L1440,24 L0,24 Z"
              fill="currentColor"
            />
            {/* Clean Static Hairline Stroke (Bottom) */}
            <path
              d="M0,18 L1440,2"
              stroke={`url(#${gradId})`}
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </div>
  );
};
