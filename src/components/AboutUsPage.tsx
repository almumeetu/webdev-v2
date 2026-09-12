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
import { Breadcrumb } from './Breadcrumb';

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

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    gsap.fromTo(
      '.about-anim-fade',
      { opacity: 0, y: isMobile ? 12 : 25 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.35 : 0.65,
        stagger: isMobile ? 0.04 : 0.1,
        ease: isMobile ? 'power1.out' : 'power2.out',
        clearProps: 'transform,opacity'
      }
    );
  });

  return (
    <div ref={containerRef} className="bg-white text-slate-900 min-h-screen">
      {/* Top Standard Breadcrumb & Hero Banner */}
      <Breadcrumb
        badge="ABOUT WEBDEV SOFTWARE SOLUTIONS"
        title="Bridging Bangladesh Engineering & German Precision"
        subtitle="A premier cross-border software consultancy and full-stack development powerhouse headquartered in Joypurhat, Bangladesh with a strategic branch in Leverkusen, Germany."
        items={[
          { label: 'Home', onClick: onBackToHome },
          { label: 'About Us', active: true }
        ]}
        backAction={onBackToHome}
        backLabel="Back to Home"
        align="center"
        className="about-anim-fade"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        
        {/* Core Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="space-y-5 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
              Engineered for Global Enterprises Across USA, Germany & Europe
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Founded with the vision to deliver world-class digital software that combines exceptional computational engineering talent with meticulous European and American architectural standards, <strong>WebDev Software Solutions</strong> serves international clients with complete trust and legal transparency.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Our <strong>Joypurhat, Bangladesh</strong> headquarters houses our core MERN full-stack development squads, distributed backend architects, and Shopify specialists. Our <strong>Leverkusen, Germany</strong> operational presence guarantees German GDPR compliance, BaFin security standards, and seamless cross-border coordination.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-indigo-600 font-['Outfit']">500+</div>
                <div className="text-[11px] text-slate-600 mt-0.5 font-semibold">Global Projects</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-indigo-600 font-['Outfit']">100%</div>
                <div className="text-[11px] text-slate-600 mt-0.5 font-semibold">IP Ownership</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-indigo-600 font-['Outfit']">99.98%</div>
                <div className="text-[11px] text-slate-600 mt-0.5 font-semibold">Production SLA</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-indigo-600 font-['Outfit']">14+ Hrs</div>
                <div className="text-[11px] text-slate-600 mt-0.5 font-semibold">Timezone Sync</div>
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
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white text-center space-y-6 shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-tech-circuit opacity-20 pointer-events-none"></div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-['Outfit'] relative z-10">
            Collaborate With Our Engineering Leads
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed relative z-10 font-normal">
            Ready to initiate an enterprise MERN web app, Shopify store, or server infrastructure overhaul?
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap pt-2 relative z-10">
            <button
              onClick={onOpenQuote}
              className="bg-white hover:bg-slate-100 text-slate-950 text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all min-h-[44px] cursor-pointer"
            >
              Request Architecture Consultation
            </button>
            <button
              onClick={onExploreTeam}
              className="bg-slate-800/90 hover:bg-slate-800 text-indigo-300 border border-slate-700/80 hover:border-indigo-400 text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl transition-all min-h-[44px] cursor-pointer flex items-center gap-1.5"
            >
              <span>Meet The Minds Behind WebDev</span>
              <ArrowRight className="w-4 h-4 text-indigo-400" />
            </button>
            <button
              onClick={onBackToHome}
              className="bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl transition-all min-h-[44px] cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
