import React from 'react';
import { Mail, Clock, Globe, Phone, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';

interface TopBarProps {
  onContactClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onContactClick }) => {
  return (
    <div className="bg-slate-950 text-slate-400 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left side: Hub Info & Working Hours */}
        <div className="flex items-center flex-wrap gap-4 sm:gap-6">
          {/* Dual Engineering Hub */}
          <div className="flex items-center gap-1.5 text-slate-300 font-medium truncate">
            <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="text-[11px] sm:text-xs truncate">
              <span className="text-white font-semibold">Joypurhat, BD (HQ)</span>
              <span className="hidden sm:inline text-slate-600 mx-1.5">•</span>
              <span className="hidden sm:inline text-slate-300">Leverkusen, DE (Branch)</span>
            </span>
          </div>

          {/* Email */}
          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <a 
              href="mailto:info@webdevsoftwaresolutions.com" 
              className="hover:text-white transition-colors"
            >
              info@webdevsoftwaresolutions.com
            </a>
          </div>

          {/* Operating SLA Hours */}
          <div className="hidden xl:flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Mon - Sat: 9:00 - 20:00 (BST / CET)</span>
          </div>
        </div>

        {/* Right side: Active Status & Phone / Socials */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Direct Phone */}
          <a
            href="tel:+8801712009617"
            className="flex items-center gap-1.5 text-slate-200 hover:text-indigo-400 font-medium text-[11px] sm:text-xs transition-colors"
            title="Direct Engineering Line"
          >
            <Phone className="w-3 h-3 text-indigo-400" />
            <span className="font-mono">+880 1712-009617</span>
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
