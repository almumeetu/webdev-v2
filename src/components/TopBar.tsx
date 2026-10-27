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
    <div className="relative z-30 transition-all duration-300 text-slate-600 text-[11px] sm:text-xs py-1 select-none bg-gradient-to-r from-[#eef8fb] via-[#f8fafc] to-[#eaf5f9] border-b border-[#9cd5e2]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 relative z-10">
        
        {/* Left side: Contact Email with polished pill icon */}
        <div className="flex min-w-0 flex-1 items-center gap-2 text-slate-600">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-100/90 text-sky-700 shrink-0 shadow-2xs">
            <Mail className="w-2.5 h-2.5" />
          </span>
          <a 
            href="mailto:webdevsoftwaresolutions26@gmail.com"
            title="webdevsoftwaresolutions26@gmail.com"
            aria-label="Email webdevsoftwaresolutions26@gmail.com"
            className="min-w-0 truncate text-[11px] sm:text-xs text-slate-600 hover:text-sky-800 transition-colors font-medium tracking-tight"
          >
            <span className="hidden sm:inline">webdevsoftwaresolutions26@gmail.com</span>
            <span className="sm:hidden">Email us</span>
          </a>
        </div>

        {/* Right side: Language Switcher & Socials */}
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          {/* German & English Language Switcher - Slim, Branded & Polished */}
          <div className="inline-flex items-center rounded-full bg-white/90 border border-[#9cd5e2]/60 p-0.5 shadow-2xs">
            <button
              onClick={() => setLang('en')}
              className={`flex h-5 sm:h-5.5 items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-medium transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#BBE7F1] text-slate-950 font-semibold shadow-xs'
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
              className={`flex h-5 sm:h-5.5 items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-medium transition-all cursor-pointer ${
                lang === 'de'
                  ? 'bg-[#BBE7F1] text-slate-950 font-semibold shadow-xs'
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
          <div className="hidden sm:flex items-center space-x-1 text-slate-500 border-l border-[#9cd5e2]/40 pl-2.5">
            <a 
              href="https://github.com/webdevsoftware"
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-1 rounded-md text-slate-500 hover:text-slate-950 hover:bg-white/80 transition-all cursor-pointer" 
              title="GitHub"
              aria-label="GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-1 rounded-md text-slate-500 hover:text-sky-600 hover:bg-white/80 transition-all cursor-pointer" 
              title="Twitter / X"
              aria-label="Twitter / X"
            >
              <TwitterIcon className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/webdevss"
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-1 rounded-md text-slate-500 hover:text-sky-700 hover:bg-white/80 transition-all cursor-pointer" 
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
