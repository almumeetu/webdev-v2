import React from 'react';
import { Mail, Clock, MapPin, Globe, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';

interface TopBarProps {
  onContactClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onContactClick }) => {
  return (
    <div className="bg-[#070b14] border-b border-slate-800/80 text-xs text-slate-400 py-2 sm:py-2.5 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left items: on mobile show quick hub badge + phone; on tablet/desktop show full details */}
        <div className="flex items-center flex-wrap gap-3 sm:gap-6">
          {/* Dual Hub Badge */}
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="text-[11px] sm:text-xs">
              <span className="font-semibold text-white">Joypurhat, BD</span>
              <span className="text-slate-500 mx-1.5">•</span>
              <span className="font-semibold text-white">Housing Estate, W-07</span>
            </span>
          </div>

          {/* Business Hours (hidden on very small screens) */}
          <div className="hidden lg:flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Mon - Sat: 9:00 - 20:00 (BST)</span>
          </div>

          {/* Email (hidden on mobile, visible from md up) */}
          <div className="hidden md:flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <a 
              href="mailto:info@webdevsoftwaresolutions.com" 
              className="hover:text-indigo-300 transition-colors"
            >
              info@webdevsoftwaresolutions.com
            </a>
          </div>
        </div>

        {/* Right items: active status & phone / socials */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Active status indicator */}
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="hidden sm:inline">Accepting Projects 2026</span>
              <span className="sm:hidden">Available</span>
            </span>
          </div>

          {/* Direct call link on mobile/tablet */}
          <a
            href="tel:+8801712009617"
            className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-mono font-medium text-[11px] sm:text-xs"
            title="Direct Phone Line"
          >
            <Phone className="w-3 h-3 text-indigo-400" />
            <span>+880 1712-009617</span>
          </a>

          {/* Socials */}
          <div className="hidden sm:flex items-center space-x-3 text-slate-400 border-l border-slate-800/80 pl-3">
            <a 
              href="https://github.com/almumeetusaikat" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-indigo-400 transition-colors p-1" 
              title="GitHub"
              aria-label="GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-indigo-400 transition-colors p-1" 
              title="Twitter / X"
              aria-label="Twitter / X"
            >
              <TwitterIcon className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-indigo-400 transition-colors p-1" 
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
