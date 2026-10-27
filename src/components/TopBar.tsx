'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';
import { useLanguage } from '../context/LanguageContext';

interface TopBarProps {
  onContactClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onContactClick }) => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="relative z-30 transition-colors duration-200 text-slate-600 text-[11px] sm:text-xs py-1 sm:py-1.5 select-none bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 relative z-10">
        
        {/* Left side: Contact Email */}
        <div className="flex min-w-0 flex-1 items-center gap-1.5 text-slate-600">
          <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
          <a 
            href="mailto:webdevsoftwaresolutions26@gmail.com"
            title="webdevsoftwaresolutions26@gmail.com"
            aria-label="Email webdevsoftwaresolutions26@gmail.com"
            className="min-w-0 truncate text-[11px] sm:text-xs hover:text-slate-950 transition-colors font-medium"
          >
            <span className="hidden sm:inline">webdevsoftwaresolutions26@gmail.com</span>
            <span className="sm:hidden">Email us</span>
          </a>
        </div>

        {/* Right side: Language Switcher & Socials */}
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          {/* German & English Language Switcher */}
          <div className="inline-flex items-center rounded-full bg-white border border-slate-200/90 p-0.5 shadow-2xs">
            <button
              onClick={() => setLang('en')}
              className={`flex min-h-8 items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#BBE7F1] text-slate-950 font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Switch language to English"
              aria-label="Switch to English"
            >
              <span className="text-[10px]">🇬🇧</span>
              <span>EN</span>
            </button>
            <button
              onClick={() => setLang('de')}
              className={`flex min-h-8 items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium transition-all cursor-pointer ${
                lang === 'de'
                  ? 'bg-[#BBE7F1] text-slate-950 font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Sprache auf Deutsch umstellen"
              aria-label="Auf Deutsch umstellen"
            >
              <span className="text-[10px]">🇩🇪</span>
              <span>DE</span>
            </button>
          </div>

          {/* Clean Socials */}
          <div className="hidden sm:flex items-center space-x-2 text-slate-500 border-l border-slate-200 pl-3">
            <a 
              href="https://github.com/webdevsoftware"
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-950 transition-colors p-1" 
              title="GitHub"
              aria-label="GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-950 transition-colors p-1" 
              title="Twitter / X"
              aria-label="Twitter / X"
            >
              <TwitterIcon className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/webdevss"
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-950 transition-colors p-1" 
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
