import React, { useRef } from 'react';
import { 
  Building2, 
  Globe, 
  ShieldCheck, 
  Server, 
  Cpu, 
  Users, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { useGsapContext } from '../utils/gsapHelper';
import gsap from 'gsap';

interface AboutUsPageProps {
  onBackToHome: () => void;
  onOpenQuote: () => void;
  onExploreTeam: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onBackToHome,
  onOpenQuote,
  onExploreTeam
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapContext(containerRef, () => {
    if (!containerRef.current) return;

    gsap.fromTo(
      '.about-anim-fade',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out'
      }
    );
  });

  return (
    <div ref={containerRef} className="bg-white text-slate-900 min-h-screen">
      {/* Hero Header */}
      <div className="bg-[#090d18] text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-tech-circuit opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="about-anim-fade inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-mono font-medium">
            <span>ABOUT WEBDEV SOFTWARE SOLUTIONS</span>
          </div>
          <h1 className="about-anim-fade text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit']">
            Bridging Bangladesh Engineering & German Precision
          </h1>
          <p className="about-anim-fade text-slate-400 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            A cross-border software consultancy and full-stack development powerhouse headquartered in Joypurhat, Bangladesh with a strategic branch in Leverkusen, Germany.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        
        {/* Core Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="space-y-5 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
              Engineered to Deliver Without Geographical Boundaries
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Founded with the belief that world-class software development should combine exceptional computational engineering talent with meticulous European architectural standards, <strong>WebDev Software Solutions</strong> operates seamlessly across two continents.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Our <strong>Joypurhat, Bangladesh</strong> headquarters houses our core MERN full-stack development squads, backend architects, and Shopify specialists. Our <strong>Leverkusen, Germany</strong> branch handles enterprise client onboarding, German GDPR compliance, BaFin security audits, and European DevOps infrastructure.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-['Outfit']">99.98%</div>
                <div className="text-xs text-slate-600 mt-1 font-semibold">Production SLA Uptime</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-['Outfit']">14 Hours</div>
                <div className="text-xs text-slate-600 mt-1 font-semibold">Overlapping Timezone Support</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
              alt="Engineering Team at WebDev Software Solutions"
              className="rounded-3xl shadow-2xl w-full object-cover h-[340px] sm:h-[440px]"
            />
            <div className="absolute bottom-2 left-2 sm:-bottom-6 sm:-left-6 bg-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-xl max-w-xs border border-slate-800">
              <div className="text-[10px] sm:text-xs font-mono text-indigo-400 uppercase font-bold">Two Strategic Hubs</div>
              <div className="text-xs sm:text-sm font-bold mt-1">Joypurhat (BD) + Leverkusen (DE)</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 mt-1">Single cohesive engineering culture</div>
            </div>
          </div>
        </div>

        {/* The Two Branches Detailed */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
              Our Dual-Hub Infrastructure
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              How our Bangladesh and Germany offices collaborate seamlessly for international clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Joypurhat Bangladesh Office */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-['Outfit']">
                Joypurhat, Bangladesh (Global Headquarters)
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our main engineering lab. Houses over 30 full-stack engineers, MERN architects, WordPress core contributors, and QA automation specialists. Providing agile sprint execution and continuous deployment for clients globally.
              </p>
              <ul className="text-xs text-slate-700 space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full-Stack MERN & Next.js Core Labs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Shopify & WooCommerce Custom Theme Dev</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Housing Estate, Word No: 07, Joypurhat-5900, Bangladesh</span>
                </li>
              </ul>
            </div>

            {/* Leverkusen Germany Office */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-['Outfit']">
                Leverkusen, Germany (European Branch)
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our European operational gateway located in North Rhine-Westphalia. Guarantees German GDPR compliance, BaFin-grade security standards, Hetzner Frankfurt data center management, and direct on-site consulting for DACH clients.
              </p>
              <ul className="text-xs text-slate-700 space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>GDPR & ISO-27001 Data Privacy Frameworks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>European Cloud & Bare-Metal Server Auditing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Heinrich-von-Stephan-Str., 51373 Leverkusen, Germany</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Bottom Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#090d18] text-white text-center space-y-5">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-['Outfit']">
            Collaborate With Our Engineering Leads
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Ready to initiate an enterprise MERN web app, Shopify store, or server infrastructure overhaul?
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap pt-2">
            <button
              onClick={onOpenQuote}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all min-h-[44px] cursor-pointer"
            >
              Request Architecture Consultation
            </button>
            <button
              onClick={onBackToHome}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl transition-all min-h-[44px] cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
