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
        title="Architecting Scalable Software & Cloud Infrastructure"
        subtitle="A premier full-stack software engineering consultancy building high-performance web applications, enterprise cloud platforms, and conversion-optimized e-commerce solutions for global businesses."
        items={[
          { label: 'Home', onClick: onBackToHome },
          { label: 'About Us', active: true }
        ]}
        backAction={onBackToHome}
        backLabel="Back to Home"
        align="left"
        className="about-anim-fade"
      />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        
        {/* Core Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="space-y-5 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Archivo']">
              Engineered for Global Enterprises Across USA, Germany & Europe
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Founded with the vision to deliver world-class digital software that combines exceptional computational engineering talent with meticulous European and American architectural standards, <strong>WebDev Software Solutions</strong> serves international clients with complete trust and legal transparency.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Our agile engineering squads specialize in high-concurrency MERN architectures, distributed cloud backends, and modern frontend frameworks. Through strict code reviews, CI/CD automation, and rigorous testing standards, we ensure production reliability and seamless cross-border delivery.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#BBE7F1]/20 border border-[#9cd5e2] text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-slate-950 font-['Archivo']">500+</div>
                <div className="text-xs text-slate-600 mt-0.5 font-semibold">Global Projects</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#BBE7F1]/20 border border-[#9cd5e2] text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-slate-950 font-['Archivo']">100%</div>
                <div className="text-xs text-slate-600 mt-0.5 font-semibold">IP Ownership</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#BBE7F1]/20 border border-[#9cd5e2] text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-slate-950 font-['Archivo']">99.98%</div>
                <div className="text-xs text-slate-600 mt-0.5 font-semibold">Production SLA</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#BBE7F1]/20 border border-[#9cd5e2] text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-slate-950 font-['Archivo']">14+ Hrs</div>
                <div className="text-xs text-slate-600 mt-0.5 font-semibold">Timezone Sync</div>
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
              <div className="text-xs font-mono text-emerald-400 uppercase font-bold">Global Delivery Model</div>
              <div className="text-xs sm:text-sm font-bold mt-1">Dedicated Agile Squads</div>
              <div className="text-xs text-slate-400 mt-1">High-velocity sprints & continuous deployment</div>
            </div>
          </div>
        </div>

        {/* Operating Hubs Detailed */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-cyan-800 font-['Playfair_Display'] italic text-base sm:text-lg font-semibold tracking-wide">
              <span>Physical Presence & Operating Hubs</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Archivo']">
              Physical Presence & Global Engineering Facilities
            </h3>
            <p className="text-slate-600 text-sm sm:text-base font-['Instrument_Sans']">
              Direct international client collaboration backed by dedicated high-velocity engineering squads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Leverkusen Germany Office - FIRST */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] flex items-center justify-center font-bold">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-['Archivo']">
                Küppersteg, Leverkusen, Germany (European Hub)
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our European operational gateway located in North Rhine-Westphalia. Guarantees German GDPR compliance, BaFin-grade security standards, Hetzner Frankfurt data center management, and direct on-site consulting for DACH clients.
              </p>
              <ul className="text-xs sm:text-sm text-slate-700 space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-700 shrink-0" />
                  <span>German GDPR (DSGVO) & ISO-27001 Security Frameworks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-700 shrink-0" />
                  <span>European Cloud & Hetzner Frankfurt Server Architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-700 shrink-0" />
                  <span>Küppersteg, 51373 Leverkusen, NRW, Germany (+49 172 9766016)</span>
                </li>
              </ul>
            </div>

            {/* Joypurhat Bangladesh Office - R&D */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-['Archivo']">
                Joypurhat, Bangladesh (Global R&D Center)
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our dedicated offshore engineering lab. Houses over 30 full-stack engineers, MERN architects, WordPress core contributors, and QA automation specialists. Providing agile sprint execution and continuous deployment for international clients.
              </p>
              <ul className="text-xs sm:text-sm text-slate-700 space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full-Stack MERN & Next.js Core Engineering Squads</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Shopify & WooCommerce Custom Theme & App Dev</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Housing Estate, Ward No: 07, Joypurhat-5900, Bangladesh</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Bottom Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white text-center space-y-6 shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-tech-circuit opacity-20 pointer-events-none"></div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-['Archivo'] relative z-10">
            Collaborate With Our Engineering Leads
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed relative z-10 font-normal">
            Ready to initiate an enterprise MERN web app, Shopify store, or server infrastructure overhaul?
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap pt-2 relative z-10">
            <button
              onClick={onOpenQuote}
              className="bg-white hover:bg-slate-100 text-slate-950 text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl transition-all min-h-[44px] cursor-pointer"
            >
              Request Architecture Consultation
            </button>
            <button
              onClick={onExploreTeam}
              className="bg-slate-800/90 hover:bg-slate-800 text-[#BBE7F1] border border-slate-700/80 hover:border-[#9cd5e2] text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl transition-all min-h-[44px] cursor-pointer flex items-center gap-1.5"
            >
              <span>Meet The Minds Behind WebDev</span>
              <ArrowRight className="w-4 h-4 text-[#BBE7F1]" />
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
