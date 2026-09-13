import React from 'react';
import { Home, ChevronRight, ArrowLeft, Sparkles } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

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
  align = 'left',
  variant = 'dark'
}) => {
  // Determine page title from explicit prop or active last item
  const pageTitle = title || items[items.length - 1]?.label || 'Overview';
  const pageBadge = badge || (items[items.length - 1]?.label ? `WEBDEV • ${items[items.length - 1]?.label.toUpperCase()}` : 'ABOUT WEBDEV SOFTWARE SOLUTIONS');

  const isCenter = align === 'center';

  return (
    <div 
      aria-label="Breadcrumb & Page Banner" 
      className={`relative overflow-hidden py-14 sm:py-18 md:py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-b border-slate-800 shadow-xl ${className}`}
    >
      {/* 1. Ambient Glows & High-Tech Circuit Background (matching Cross-Border Advantage) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hidden md:block absolute -top-24 left-1/6 w-[500px] h-[350px] bg-indigo-600/20 rounded-full blur-[140px]" />
        <div className="hidden md:block absolute -bottom-24 right-1/6 w-[450px] h-[350px] bg-sky-500/15 rounded-full blur-[130px]" />
        <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-tech-circuit opacity-30" />
      </div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Left-Aligned Unified Banner Container */}
        <div className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} space-y-4 sm:space-y-5`}>
          
          {/* Eyebrow badge matching THE WEBDEV CROSS-BORDER ADVANTAGE style */}
          <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-xl bg-indigo-950/70 border border-indigo-800/80 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 animate-pulse" />
            <span>{pageBadge}</span>
          </div>

          {/* Prominent Page Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit'] leading-tight max-w-4xl text-left">
            {pageTitle}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className={`text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-normal ${isCenter ? 'mx-auto text-center' : 'text-left'}`}>
              {subtitle}
            </p>
          )}

          {/* Left-aligned Breadcrumb Trail & Quick Back Action */}
          <div className={`flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 ${isCenter ? 'justify-center' : 'justify-start'}`}>
            
            {/* Breadcrumb Trail Navigation */}
            <nav aria-label="Breadcrumb Navigation">
              <ol className="inline-flex items-center flex-wrap justify-start gap-1.5 sm:gap-2 text-xs bg-slate-900/90 backdrop-blur-md border border-slate-800/90 px-4 py-2 rounded-xl text-slate-300 shadow-inner">
                {/* Home Link */}
                <li>
                  <button
                    onClick={items[0]?.onClick}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer"
                  >
                    <Home className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{items[0]?.label || 'Home'}</span>
                  </button>
                </li>

                {/* Trail of inner pages */}
                {items.slice(1).map((item, index) => {
                  const isLast = index === items.length - 2;
                  return (
                    <li key={index} className="flex items-center gap-1.5 sm:gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      {item.onClick && !isLast ? (
                        <button
                          onClick={item.onClick}
                          className="text-slate-400 hover:text-indigo-300 font-medium transition-colors truncate max-w-[160px] sm:max-w-[260px] cursor-pointer"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <span 
                          className={`truncate max-w-[200px] sm:max-w-[400px] ${
                            isLast 
                              ? 'text-white font-bold bg-indigo-600 px-2.5 py-0.5 rounded-md shadow-xs shadow-indigo-500/30' 
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

            {/* Quick Back Button */}
            {backAction && (
              <button
                onClick={backAction}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/90 transition-all cursor-pointer text-xs font-semibold shadow-inner backdrop-blur-md"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{backLabel}</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
