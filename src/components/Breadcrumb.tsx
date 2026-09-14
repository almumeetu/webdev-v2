import React from 'react';
import { Home, ChevronRight, ArrowLeft, Sparkles } from 'lucide-react';

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
  backLabel = 'Back',
  className = '',
  theme = 'light'
}) => {
  const isDark = theme === 'dark';

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
              <span className="font-semibold">{items[0]?.label || 'Home'}</span>
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
          <span>{backLabel}</span>
        </button>
      )}
    </div>
  );
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  title?: string;
  subtitle?: string;
  badge?: string;
  backAction?: () => void;
  backLabel?: string;
  className?: string;
  align?: 'left' | 'center';
  variant?: 'dark' | 'light';
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  title,
  subtitle,
  badge,
  backAction,
  backLabel = 'Back',
  className = '',
  align = 'left'
}) => {
  // Determine page title from explicit prop or active last item
  const pageTitle = title || items[items.length - 1]?.label || 'Overview';
  const pageBadge = badge || (items[items.length - 1]?.label ? `WEBDEV • ${items[items.length - 1]?.label.toUpperCase()}` : 'ABOUT WEBDEV SOFTWARE SOLUTIONS');

  const isCenter = align === 'center';

  return (
    <div 
      aria-label="Breadcrumb & Page Banner" 
      className={`relative overflow-hidden py-10 sm:py-13 md:py-15 bg-gradient-to-b from-[#BBE7F1]/25 via-[#f8fcfd] to-white text-slate-900 border-b border-slate-200/90 shadow-xs ${className}`}
    >
      {/* Ambient Soft Glows & Tech Grid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hidden md:block absolute -top-24 left-1/6 w-[500px] h-[350px] bg-[#BBE7F1]/40 rounded-full blur-[120px]" />
        <div className="hidden md:block absolute -bottom-24 right-1/6 w-[450px] h-[350px] bg-[#BBE7F1]/30 rounded-full blur-[120px]" />
        <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#BBE7F1]/35 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-tech-circuit-light opacity-25" />
      </div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 sm:space-y-5">
        
        {/* 1. TOP Breadcrumb Navigation Trail */}
        <div className={`flex flex-wrap items-center gap-3 ${isCenter ? 'justify-center' : 'justify-start'}`}>
          <nav aria-label="Breadcrumb Navigation">
            <ol className="inline-flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm bg-white/95 backdrop-blur-md border border-slate-200/90 px-3.5 py-1.5 rounded-2xl text-slate-700 shadow-xs">
              {/* Home Link */}
              <li className="inline-flex items-center">
                <button
                  onClick={items[0]?.onClick}
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-950 font-medium transition-colors cursor-pointer py-0.5 px-1.5 rounded-lg hover:bg-[#BBE7F1]/35"
                >
                  <Home className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                  <span className="font-semibold">{items[0]?.label || 'Home'}</span>
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
                        className="text-slate-600 hover:text-slate-950 font-medium transition-colors truncate max-w-[160px] sm:max-w-[260px] cursor-pointer py-0.5 px-1.5 rounded-lg hover:bg-[#BBE7F1]/35"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <span 
                        className={`truncate max-w-[200px] sm:max-w-[400px] font-bold text-xs sm:text-sm px-3 py-1 rounded-xl transition-all ${
                          isLast 
                            ? 'text-slate-950 bg-[#BBE7F1] border border-[#9cd5e2] shadow-xs' 
                            : 'text-slate-700 font-medium'
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 border border-slate-200/90 transition-all cursor-pointer text-xs font-semibold backdrop-blur-md shadow-xs shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-700 shrink-0" />
              <span>{backLabel}</span>
            </button>
          )}
        </div>

        {/* 2. Banner Heading & Eyebrow Content */}
        <div className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} space-y-2.5`}>
          
          {/* Eyebrow - Clean Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#9cd5e2] text-slate-800 font-semibold text-xs tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
            <span>{pageBadge}</span>
          </div>

          {/* Prominent Page Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-950 tracking-tight font-['Archivo'] leading-tight max-w-4xl text-left">
            {pageTitle}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className={`text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed font-normal font-['Instrument_Sans'] tracking-wide ${isCenter ? 'mx-auto text-center' : 'text-left'}`}>
              {subtitle}
            </p>
          )}

        </div>

      </div>
    </div>
  );
};
