import React from 'react';
import { Mail, Clock, Globe, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';
import { useLanguage } from '../context/LanguageContext';

interface TopBarProps {
  onContactClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onContactClick }) => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="bg-slate-950 text-slate-400 text-xs sm:text-sm py-2.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
      <div className="max-w-[1520px] mx-auto flex items-center justify-between gap-4">
        
        {/* Left side: Hub Info & Working Hours */}
        <div className="flex items-center flex-wrap gap-4 sm:gap-6">
          {/* Dual Engineering Hub */}
          <div className="flex items-center gap-2 text-slate-300 font-medium truncate">
            <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-xs sm:text-sm truncate">
              <span className="text-white font-semibold">{t.topbarHub}</span>
            </span>
          </div>

          {/* Email */}
          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
            <a 
              href="mailto:info@webdevsoftwaresolutions.com" 
              className="text-xs sm:text-sm hover:text-white transition-colors"
            >
              info@webdevsoftwaresolutions.com
            </a>
          </div>

          {/* Operating SLA Hours */}
          <div className="hidden xl:flex items-center gap-2 text-slate-400">
            <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-xs sm:text-sm">{t.topbarHours}</span>
          </div>
        </div>

        {/* Right side: Language Switcher & Direct BD Hotline / Socials */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* German & English Language Switcher */}
          <div className="inline-flex items-center rounded-full bg-slate-900 border border-slate-700/80 p-0.5 shadow-xs">
            <button
              onClick={() => setLang('en')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Switch language to English"
              aria-label="Switch to English"
            >
              <span className="text-xs">🇬🇧</span>
              <span>EN</span>
            </button>
            <button
              onClick={() => setLang('de')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                lang === 'de'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Sprache auf Deutsch umstellen"
              aria-label="Auf Deutsch umstellen"
            >
              <span className="text-xs">🇩🇪</span>
              <span>DE</span>
            </button>
          </div>

          {/* Direct Hotline */}
          <a
            href="tel:+491729766016"
            className="flex items-center gap-1.5 text-slate-200 hover:text-emerald-400 font-medium text-xs sm:text-sm transition-colors"
            title="Direct German Client Line (Leverkusen, DE)"
          >
            <span className="text-xs">🇩🇪</span>
            <span className="font-mono font-bold">+49 172 9766016</span>
          </a>

          {/* Clean Socials */}
          <div className="hidden sm:flex items-center space-x-2 text-slate-400 border-l border-slate-800 pl-3">
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
