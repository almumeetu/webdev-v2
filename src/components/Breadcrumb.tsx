import React from 'react';
import { Home, ChevronRight, ArrowLeft } from 'lucide-react';
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
 * Inline breadcrumb navigation bar — minimal, no pill styling
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
      <nav aria-label="Breadcrumb Navigation">
        <ol className="inline-flex items-center flex-wrap gap-1 text-xs text-slate-500">
          <li className="inline-flex items-center">
            <button
              onClick={items[0]?.onClick}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-sky-700 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 shrink-0" />
              <span>{items[0]?.label || defaultHomeLabel}</span>
            </button>
          </li>

          {items.slice(1).map((item, index) => {
            const isLast = index === items.length - 2;
            return (
              <li key={index} className="inline-flex items-center gap-1">
                <ChevronRight className="w-3 h-3 shrink-0 text-slate-300" />
                {item.onClick && !isLast ? (
                  <button
                    onClick={item.onClick}
                    className="text-slate-500 hover:text-sky-700 transition-colors cursor-pointer truncate max-w-[140px] sm:max-w-[240px]"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span
                    className={`truncate max-w-[180px] sm:max-w-[360px] ${isLast ? 'text-slate-900 font-medium' : 'text-slate-500'}`}
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

      {backAction && (
        <button
          onClick={backAction}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
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
  contentClassName?: string;
  align?: 'left' | 'center';
  variant?: 'dark' | 'light';
  dividerFillColor?: string;
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
  dividerFillColor = 'text-white',
  children
}) => {
  const { lang } = useLanguage();
  const isDe = lang === 'de';
  const defaultHomeLabel = isDe ? 'Startseite' : 'Home';
  const resolvedBackLabel = backLabel || (isDe ? 'Zurück' : 'Back');

  const pageTitle = title || items[items.length - 1]?.label || (isDe ? 'Übersicht' : 'Overview');
  const eyebrow = badge || (items[items.length - 1]?.label
    ? items[items.length - 1]?.label.toUpperCase()
    : (isDe ? 'WEBDEV SOFTWARE SOLUTIONS' : 'WEBDEV SOFTWARE SOLUTIONS'));

  const isCenter = align === 'center';

  return (
    <div
      aria-label="Page Banner"
      className={`breadcrumb-shape-surface relative overflow-hidden pt-10 sm:pt-14 md:pt-16 pb-14 sm:pb-16 md:pb-20 ${className}`}
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/background/webdev-bg.webp')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/80 to-slate-900/85" />

      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Soft color glow */}
      <div className="pointer-events-none absolute -top-20 right-0 w-[420px] h-[320px] rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[300px] h-[240px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${contentClassName}`}>

        {/* Breadcrumb trail */}
        <nav aria-label="Breadcrumb Navigation" className={`mb-5 sm:mb-6 ${isCenter ? 'flex justify-center' : ''}`}>
          <ol className="inline-flex items-center flex-wrap gap-1 text-xs text-slate-300">
            <li className="inline-flex items-center">
              <button
                onClick={items[0]?.onClick}
                className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5 shrink-0" />
                <span>{items[0]?.label || defaultHomeLabel}</span>
              </button>
            </li>

            {items.slice(1).map((item, index) => {
              const isLast = index === items.length - 2;
              return (
                <li key={index} className="inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 shrink-0 text-slate-500" />
                  {item.onClick && !isLast ? (
                    <button
                      onClick={item.onClick}
                      className="text-slate-300 hover:text-white transition-colors cursor-pointer truncate max-w-[140px] sm:max-w-[240px]"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <span
                      className={`truncate max-w-[180px] sm:max-w-[380px] ${
                        isLast ? 'text-white font-semibold' : 'text-slate-300'
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

        {/* Page heading block */}
        <div className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} gap-2.5`}>


          {/* Page title */}
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-white tracking-tight font-['Kufam'] leading-tight max-w-4xl">
            {pageTitle}
          </h1>

          {/* Back button */}
          {backAction && (
            <button
              onClick={backAction}
              className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span>{resolvedBackLabel}</span>
            </button>
          )}

          {/* Optional slot */}
          {children && (
            <div className={`pt-1.5 w-full ${isCenter ? 'flex justify-center' : ''}`}>
              {children}
            </div>
          )}
        </div>

      </div>

      {/* Bottom shape divider */}
      <SignatureShapeDivider
        position="bottom"
        fillColor={dividerFillColor}
        heightClass="h-4 sm:h-5 md:h-6"
      />
    </div>
  );
};
