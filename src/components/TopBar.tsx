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
    <div className="bg-slate-950 text-slate-400 text-[11px] sm:text-xs py-1 sm:py-1.5 border-b border-slate-800/80">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Left side: Contact Email */}
        <div className="flex items-center gap-1.5 text-slate-300">
          <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <a 
            href="mailto:info@webdevsoftwaresolutions.com" 
            className="text-[11px] sm:text-xs hover:text-white transition-colors font-medium"
          >
            info@webdevsoftwaresolutions.com
          </a>
        </div>

        {/* Right side: Language Switcher & Socials */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* German & English Language Switcher */}
          <div className="inline-flex items-center rounded-full bg-slate-900 border border-slate-700/80 p-0.5">
            <button
              onClick={() => setLang('en')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#BBE7F1] text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Switch language to English"
              aria-label="Switch to English"
            >
              <span className="text-[10px]">🇬🇧</span>
              <span>EN</span>
            </button>
            <button
              onClick={() => setLang('de')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                lang === 'de'
                  ? 'bg-[#BBE7F1] text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Sprache auf Deutsch umstellen"
              aria-label="Auf Deutsch umstellen"
            >
              <span className="text-[10px]">🇩🇪</span>
              <span>DE</span>
            </button>
          </div>

          {/* Clean Socials */}
          <div className="flex items-center space-x-2 text-slate-400 border-l border-slate-800 pl-3">
            <a 
              href="https://github.com/almumeetusaikat" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors p-1" 
              title="GitHub"
              aria-label="GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors p-1" 
              title="Twitter / X"
              aria-label="Twitter / X"
            >
              <TwitterIcon className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors p-1" 
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
