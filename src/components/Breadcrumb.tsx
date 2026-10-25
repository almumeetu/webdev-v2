import React from 'react';
import { Home, ChevronRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SignatureShapeDivider } from './SignatureShapeDivider';


export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export interface BreadcrumbBarProps {
  items: BreadcrumbItem[];
  backAction?: () => void;
  backLabel?: string;
  className?: string;
  theme?: 'light' | 'dark';
}

/**
 * High-readability inline breadcrumb navigation bar
 */
export const BreadcrumbBar: React.FC<BreadcrumbBarProps> = ({
  items,
  backAction,
  backLabel,
  className = '',
}) => {
  const { lang } = useLanguage();
  const isDe = lang === 'de';
  const defaultHomeLabel = isDe ? 'Startseite' : 'Home';
  const resolvedBackLabel = backLabel || (isDe ? 'Zurück' : 'Back');

  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 ${className}`}>
      {/* Breadcrumb Path */}
      <nav aria-label="Breadcrumb Navigation" className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        <ol className="inline-flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm px-3.5 py-2 rounded-2xl border border-slate-200/90 shadow-2xs backdrop-blur-md bg-white/95 text-slate-700 transition-all">
          {/* Home Link */}
          <li className="inline-flex items-center">
            <button
              onClick={items[0]?.onClick}
              className="inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer py-0.5 px-1.5 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-[#BBE7F1]/35"
            >
              <Home className="w-3.5 h-3.5 shrink-0 text-sky-700" />
              <span className="font-semibold">{items[0]?.label || defaultHomeLabel}</span>
            </button>
          </li>

          {/* Intermediate and Active Crumb Items */}
          {items.slice(1).map((item, index) => {
            const isLast = index === items.length - 2;
            return (
              <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
                <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                {item.onClick && !isLast ? (
                  <button
                    onClick={item.onClick}
                    className="font-medium transition-colors truncate max-w-[140px] sm:max-w-[240px] cursor-pointer py-0.5 px-1.5 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-[#BBE7F1]/35"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span
                    className={`truncate max-w-[180px] sm:max-w-[360px] text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-xl transition-all ${
                      isLast
                        ? 'bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] shadow-xs'
                        : 'text-slate-700'
                    }`}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Quick Back Action */}
      {backAction && (
        <button
          onClick={backAction}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 shadow-2xs bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200/90"
        >
          <ArrowLeft className="w-3.5 h-3.5 shrink-0 text-slate-600" />
          <span>{resolvedBackLabel}</span>
        </button>
      )}
    </div>
  );
};

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  backAction?: () => void;
  backLabel?: string;
  className?: string;
  contentClassName?: string;
  align?: 'left' | 'center';
  variant?: 'dark' | 'light';
  children?: React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  title,
  subtitle,
  badge,
  backAction,
  backLabel,
  className = '',
  contentClassName = '',
  align = 'left',
  children
}) => {
  const { lang } = useLanguage();
  const isDe = lang === 'de';
  const defaultHomeLabel = isDe ? 'Startseite' : 'Home';
  const resolvedBackLabel = backLabel || (isDe ? 'Zurück' : 'Back');

  // Determine page title from explicit prop or active last item
  const pageTitle = title || items[items.length - 1]?.label || (isDe ? 'Übersicht' : 'Overview');
  const pageBadge = badge || (items[items.length - 1]?.label ? `WEBDEV • ${items[items.length - 1]?.label.toUpperCase()}` : (isDe ? 'ÜBER WEBDEV SOFTWARE SOLUTIONS' : 'ABOUT WEBDEV SOFTWARE SOLUTIONS'));

  const isCenter = align === 'center';

  return (
    <div 
      aria-label="Breadcrumb & Page Banner" 
      className={`relative overflow-hidden pt-10 sm:pt-14 md:pt-16 pb-14 sm:pb-16 md:pb-20 text-slate-900 border-b border-slate-200/90 bg-gradient-to-b from-[#eaf4f7] via-[#f4fafc] to-white shadow-2xs ${className}`}
    >
      {/* Subtle Ambient Micro-Grid & Soft Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.4) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="pointer-events-none absolute -top-16 right-10 w-80 h-80 rounded-full bg-[#BBE7F1]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 left-10 w-80 h-80 rounded-full bg-cyan-100/40 blur-3xl" />

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 sm:space-y-5 ${contentClassName}`}>
        
        {/* 1. TOP Breadcrumb Navigation Trail */}
        <div className={`flex flex-wrap items-center gap-3 ${isCenter ? 'justify-center' : 'justify-start'}`}>
          <nav aria-label="Breadcrumb Navigation">
            <ol className="inline-flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm bg-white/95 backdrop-blur-md border border-slate-200/90 px-3.5 py-1.5 rounded-2xl text-slate-700 shadow-2xs">
              {/* Home Link */}
              <li className="inline-flex items-center">
                <button
                  onClick={items[0]?.onClick}
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-950 font-medium transition-colors cursor-pointer py-0.5 px-1.5 rounded-lg hover:bg-slate-100"
                >
                  <Home className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span className="font-semibold">{items[0]?.label || defaultHomeLabel}</span>
                </button>
              </li>

              {/* Path items */}
              {items.slice(1).map((item, index) => {
                const isLast = index === items.length - 2;
                return (
                  <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {item.onClick && !isLast ? (
                      <button
                        onClick={item.onClick}
                        className="text-slate-600 hover:text-slate-950 font-medium transition-colors truncate max-w-[140px] sm:max-w-[240px] cursor-pointer py-0.5 px-1.5 rounded-lg hover:bg-slate-100"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <span 
                        className={`truncate max-w-[180px] sm:max-w-[380px] font-semibold text-xs sm:text-sm px-3 py-1 rounded-xl transition-all ${
                          isLast 
                            ? 'text-slate-950 bg-[#BBE7F1] border border-[#9cd5e2] shadow-2xs' 
                            : 'text-slate-600 font-medium'
                        }`}
                        aria-current={isLast ? 'page' : undefined}
                      >
                        {item.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Quick Back Action */}
          {backAction && (
            <button
              onClick={backAction}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200/90 transition-all cursor-pointer text-xs font-semibold backdrop-blur-md shadow-2xs shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span>{resolvedBackLabel}</span>
            </button>
          )}
        </div>

        {/* 2. Banner Heading & Eyebrow Content */}
        <div className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} space-y-2`}>
          
          {/* Eyebrow - Clean font-mono tracking-wider */}
          <div className="text-sky-700 font-mono text-[11px] sm:text-xs tracking-wider uppercase font-semibold">
            <span>{pageBadge}</span>
          </div>

          {/* Prominent Page Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-slate-950 tracking-tight font-['Kufam'] leading-tight max-w-4xl text-left">
            {pageTitle}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className={`text-xs sm:text-[13px] text-slate-600 max-w-3xl leading-relaxed font-normal font-['Kufam'] tracking-wide ${isCenter ? 'mx-auto text-center' : 'text-left'}`}>
              {subtitle}
            </p>
          )}

          {/* Optional actions or custom content */}
          {children && (
            <div className={`pt-2.5 w-full ${isCenter ? 'flex justify-center' : ''}`}>
              {children}
            </div>
          )}

        </div>

      </div>

      {/* ── Signature Architectural Shape Divider at the Bottom of Breadcrumb ── */}
      <SignatureShapeDivider
        position="bottom"
        fillColor="text-white"
        heightClass="h-4 sm:h-5 md:h-6"
      />
    </div>
  );
};

