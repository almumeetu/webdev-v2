import React from 'react';
import { Home, ChevronRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
  theme = 'light'
}) => {
  const isDark = theme === 'dark';
  const { lang } = useLanguage();
  const isDe = lang === 'de';
  const defaultHomeLabel = isDe ? 'Startseite' : 'Home';
  const resolvedBackLabel = backLabel || (isDe ? 'Zurück' : 'Back');

  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 ${className}`}>
      {/* Breadcrumb Path */}
      <nav aria-label="Breadcrumb Navigation" className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        <ol className={`inline-flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm px-3.5 py-2 rounded-2xl border shadow-xs backdrop-blur-md transition-all ${
          isDark 
            ? 'bg-slate-900/90 border-slate-800 text-slate-200' 
            : 'bg-white/95 border-slate-200/90 text-slate-700'
        }`}>
          {/* Home Link */}
          <li className="inline-flex items-center">
            <button
              onClick={items[0]?.onClick}
              className={`inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer py-0.5 px-1.5 rounded-lg ${
                isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' 
                  : 'text-slate-600 hover:text-slate-950 hover:bg-[#BBE7F1]/35'
              }`}
            >
              <Home className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-cyan-300' : 'text-slate-700'}`} />
              <span className="font-semibold">{items[0]?.label || defaultHomeLabel}</span>
            </button>
          </li>

          {/* Intermediate and Active Crumb Items */}
          {items.slice(1).map((item, index) => {
            const isLast = index === items.length - 2;
            return (
              <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                {item.onClick && !isLast ? (
                  <button
                    onClick={item.onClick}
                    className={`font-medium transition-colors truncate max-w-[140px] sm:max-w-[240px] cursor-pointer py-0.5 px-1.5 rounded-lg ${
                      isDark 
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' 
                        : 'text-slate-600 hover:text-slate-950 hover:bg-[#BBE7F1]/35'
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <span
                    className={`truncate max-w-[180px] sm:max-w-[360px] text-xs sm:text-sm font-bold px-2.5 py-1 rounded-xl transition-all ${
                      isLast
                        ? 'bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] shadow-xs'
                        : isDark
                          ? 'text-slate-300'
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
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 shadow-xs ${
            isDark
              ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800'
              : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200/90'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
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
      className={`relative overflow-hidden py-10 sm:py-14 md:py-16 text-white border-b border-slate-800 bg-slate-950 shadow-md ${className}`}
    >
      {/* Background Banner Image with Consistent Cinematic Tech Styling */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <img
          src="/images/banner/webdev-banner.webp"
          alt="Page Banner"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Harmonious Dark Gradients for Maximum Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(6,182,212,0.12),_transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 sm:space-y-5">
        
        {/* 1. TOP Breadcrumb Navigation Trail */}
        <div className={`flex flex-wrap items-center gap-3 ${isCenter ? 'justify-center' : 'justify-start'}`}>
          <nav aria-label="Breadcrumb Navigation">
            <ol className="inline-flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm bg-slate-900/85 backdrop-blur-md border border-slate-700/80 px-3.5 py-1.5 rounded-2xl text-slate-200 shadow-md">
              {/* Home Link */}
              <li className="inline-flex items-center">
                <button
                  onClick={items[0]?.onClick}
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white font-medium transition-colors cursor-pointer py-0.5 px-1.5 rounded-lg hover:bg-slate-800/70"
                >
                  <Home className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                  <span className="font-semibold">{items[0]?.label || defaultHomeLabel}</span>
                </button>
              </li>

              {/* Path items */}
              {items.slice(1).map((item, index) => {
                const isLast = index === items.length - 2;
                return (
                  <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    {item.onClick && !isLast ? (
                      <button
                        onClick={item.onClick}
                        className="text-slate-300 hover:text-white font-medium transition-colors truncate max-w-[140px] sm:max-w-[240px] cursor-pointer py-0.5 px-1.5 rounded-lg hover:bg-slate-800/70"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <span 
                        className={`truncate max-w-[180px] sm:max-w-[380px] font-bold text-xs sm:text-sm px-3 py-1 rounded-xl transition-all ${
                          isLast 
                            ? 'text-slate-950 bg-[#BBE7F1] border border-[#9cd5e2] shadow-xs' 
                            : 'text-slate-300 font-medium'
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-900/85 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 transition-all cursor-pointer text-xs font-semibold backdrop-blur-md shadow-md shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span>{resolvedBackLabel}</span>
            </button>
          )}
        </div>

        {/* 2. Banner Heading & Eyebrow Content */}
        <div className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} space-y-2`}>
          
          {/* Eyebrow - Clean, no border, no icon, small 400-weight */}
          <div className="text-cyan-300 font-normal font-[400] text-[11px] sm:text-xs tracking-wider uppercase">
            <span>{pageBadge}</span>
          </div>

          {/* Prominent Page Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight font-['Kufam'] leading-tight max-w-4xl text-left">
            {pageTitle}
          </h1>

          {/* Subtitle - Smaller font size, 400 weight */}
          {subtitle && (
            <p className={`text-xs sm:text-[13px] text-slate-300 max-w-3xl leading-relaxed font-normal font-[400] font-['Kufam'] tracking-wide ${isCenter ? 'mx-auto text-center' : 'text-left'}`}>
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
    </div>
  );
};
