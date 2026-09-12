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
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  title,
  subtitle,
  badge,
  backAction,
  backLabel = 'Back',
  className = ''
}) => {
  // Determine page title from explicit prop or active last item
  const pageTitle = title || items[items.length - 1]?.label || 'Overview';

  return (
    <div 
      aria-label="Breadcrumb & Page Banner" 
      className={`bg-slate-100/90 text-slate-900 relative overflow-hidden py-8 sm:py-10 border-b border-slate-300/80 ${className}`}
    >
      {/* Ambient background glows */}
      <div className="absolute -top-24 left-1/4 w-96 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-80 h-64 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Subtle high-tech pattern */}
      <div className="absolute inset-0 bg-tech-circuit-light opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          
          <div className="space-y-2">
            {/* Eyebrow clean subtitle without pill background */}
            <div className="inline-flex items-center gap-2 text-indigo-600 text-xs font-bold font-mono tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>{badge || 'WEBDEV ENTERPRISE SOLUTIONS'}</span>
            </div>

            {/* Prominent Page Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
              {pageTitle}
            </h1>

            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-normal leading-relaxed">
                {subtitle}
              </p>
            )}

            {/* Breadcrumb Trail Navigation */}
            <nav aria-label="Breadcrumb Navigation" className="pt-1">
              <ol className="inline-flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs bg-white border border-slate-200/90 px-3.5 py-1.5 rounded-xl shadow-xs">
                {/* Home Link */}
                <li>
                  <button
                    onClick={items[0]?.onClick}
                    className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 font-medium transition-colors cursor-pointer"
                  >
                    <Home className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{items[0]?.label || 'Home'}</span>
                  </button>
                </li>

                {/* Trail of inner pages */}
                {items.slice(1).map((item, index) => {
                  const isLast = index === items.length - 2;
                  return (
                    <li key={index} className="flex items-center gap-1.5 sm:gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {item.onClick && !isLast ? (
                        <button
                          onClick={item.onClick}
                          className="text-slate-600 hover:text-indigo-600 font-medium transition-colors truncate max-w-[140px] sm:max-w-[220px] cursor-pointer"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <span 
                          className={`truncate max-w-[180px] sm:max-w-[340px] ${
                            isLast 
                              ? 'text-white font-bold bg-indigo-600 px-2.5 py-0.5 rounded-md shadow-xs' 
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
          </div>

          {/* Quick Back Button */}
          {backAction && (
            <div className="shrink-0 self-start md:self-center">
              <button
                onClick={backAction}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-300 transition-all cursor-pointer text-xs font-semibold shadow-xs"
              >
                <ArrowLeft className="w-4 h-4 text-slate-600" />
                <span>{backLabel}</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
