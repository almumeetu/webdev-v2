import React, { useRef } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Globe, 
  ShieldCheck, 
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Zap,
  Code2,
  Server,
  ShoppingCart,
  Cpu,
  Layers,
  Award,
  FileCheck,
  Building2,
  Check,
  ChevronRight,
  Send
} from 'lucide-react';
import { ServiceDetail, Project } from '../types';
import { initialServices, initialProjects } from '../data/initialData';
import { useGsapContext } from '../utils/gsapHelper';
import gsap from 'gsap';


interface ServiceDetailPageProps {
  service: ServiceDetail | null;
  onBack: () => void;
  onBackToHome?: () => void;
  onRequestQuote: (serviceTitle: string) => void;
  onSelectService: (serviceId: string) => void;
  onSelectProject?: (project: Project) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onBack,
  onBackToHome,
  onRequestQuote,
  onSelectService,
  onSelectProject
}) => {
  const pageRef = useRef<HTMLDivElement>(null);

  useGsapContext(pageRef, () => {
    if (!pageRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    gsap.fromTo(
      '.serv-anim-fade',
      { opacity: 0, y: isMobile ? 12 : 25 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.35 : 0.6,
        stagger: isMobile ? 0.04 : 0.08,
        ease: isMobile ? 'power1.out' : 'power2.out',
        clearProps: 'transform,opacity'
      }
    );
  });

  if (!service) {
    return (
      <div className="min-h-[70vh] bg-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-3 font-['Outfit']">
          Service Specification Not Found
        </h2>
        <p className="text-slate-600 text-sm mb-6 max-w-md">
          The requested IT or cloud service practice area is currently unavailable or has been relocated.
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Services</span>
        </button>
      </div>
    );
  }

  // Get matching icon
  const getIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'Code2': return <Code2 className={className} />;
      case 'Server': return <Server className={className} />;
      case 'ShoppingCart': return <ShoppingCart className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      default: return <ShieldCheck className={className} />;
    }
  };

  // Find other services
  const otherServices = initialServices.filter((s) => s.id !== service.id);

  // Find relevant projects based on service id / tech
  const relevantProjects = initialProjects.filter((p) => {
    const titleLower = service.title.toLowerCase();
    if (titleLower.includes('mern') || titleLower.includes('full stack')) {
      return p.category.includes('Full Stack') || p.category.includes('Web Application');
    }
    if (titleLower.includes('server') || titleLower.includes('cloud')) {
      return p.category.includes('Backend & Cloud');
    }
    if (titleLower.includes('commerce') || titleLower.includes('shopify')) {
      return p.category.includes('E-Commerce');
    }
    if (titleLower.includes('wordpress') || titleLower.includes('cms')) {
      return p.category.includes('WordPress');
    }
    return p.category.includes('Full Stack');
  }).slice(0, 2);

  // Process workflow tailored to enterprise software
  const workflowSteps = [
    {
      step: '01',
      title: 'Discovery & Architecture Blueprint',
      desc: 'Deep requirements analysis, technical specification drafting, database ERD design, and API contract specification before writing code.'
    },
    {
      step: '02',
      title: 'Sprint Development & Code Reviews',
      desc: 'Modular, type-safe TypeScript engineering in 2-week agile sprints with bi-weekly client staging demonstrations and peer code reviews.'
    },
    {
      step: '03',
      title: 'Hardening, QA & Performance Audits',
      desc: 'Automated end-to-end testing, security penetration sweeps, OWASP compliance verification, and sub-second latency tuning.'
    },
    {
      step: '04',
      title: 'Zero-Downtime Deployment & 24/7 SLA',
      desc: 'Automated CI/CD release to production cloud clusters with rollback safeguards, full documentation transfer, and ongoing SLA monitoring.'
    }
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-white text-slate-900 pb-20">
      
      {/* Top Back Action & Minimal Navigation */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer group py-1.5 px-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to All Services</span>
        </button>
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="text-xs font-medium text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Home
          </button>
        )}
      </div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">

        {/* 2. Hero Visual Card with Gradient Overlay & Status Bar */}
        <div className="serv-anim-fade relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-950">
          <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-700 hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
            
            {/* Ambient inner glow */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Inner Content Over Banner */}
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-white">
              
              {/* Badges row */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 bg-indigo-600/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase border border-indigo-400/30 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                  <span>Production Grade Service</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md text-emerald-400 text-xs font-mono font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>German & EU Delivery Active</span>
                </div>
              </div>

              {/* Title & Icon */}
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/40 border border-white/20">
                    {getIcon(service.iconName, "w-7 h-7")}
                  </div>
                  <div>
                    <span className="text-indigo-300 font-mono text-xs font-bold uppercase tracking-widest">
                      WebDev Practice Spec
                    </span>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-['Outfit'] tracking-tight text-white">
                      {service.title}
                    </h1>
                  </div>
                </div>
                <p className="text-slate-300 text-xs sm:text-base leading-relaxed line-clamp-2 max-w-2xl">
                  {service.shortDesc}
                </p>
              </div>

            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800 bg-slate-900/95 border-t border-slate-800 text-white p-4 sm:p-5">
            <div className="p-3 text-center sm:text-left">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Reliability SLA</div>
              <div className="text-base sm:text-lg font-bold text-white mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>99.99% Guaranteed</span>
              </div>
            </div>

            <div className="p-3 text-center sm:text-left">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Turnaround Time</div>
              <div className="text-base sm:text-lg font-bold text-white mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>2 - 6 Weeks MVP</span>
              </div>
            </div>

            <div className="p-3 text-center sm:text-left">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Delivery Hubs</div>
              <div className="text-base sm:text-lg font-bold text-white mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Leverkusen (DE) & Global R&D</span>
              </div>
            </div>

            <div className="p-3 text-center sm:text-left">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Code Standard</div>
              <div className="text-base sm:text-lg font-bold text-white mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>TypeScript & Clean Code</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Main 2-Column Section: Detailed Overview & Sidebar Action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (8 cols): In-depth Architectural Breakdown */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Deep-Dive Narrative */}
            <div className="serv-anim-fade bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
              <div className="inline-flex items-center gap-2 text-indigo-600 text-xs font-mono font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                <span>ENGINEERING SCOPE & ARCHITECTURE</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
                How We Engineer Results for {service.title}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {service.fullDesc}
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3.5">
                <Zap className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-indigo-950 leading-relaxed font-medium">
                  <strong>Enterprise Assurance:</strong> Every project executed under this practice area includes end-to-end type safety, automated CI/CD pipelines, modular maintainability, and strict IP protection under NDA for German, European, and global businesses.
                </div>
              </div>
            </div>

            {/* Core Capabilities & Architectural Pillars */}
            <div className="serv-anim-fade space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
                    KEY CAPABILITIES
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit'] mt-1">
                    What Makes Our Approach Distinct
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {service.features.map((feat, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-400 shadow-xs hover:shadow-md transition-all duration-300 group flex items-start gap-3.5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {feat}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Engineered with industry-standard patterns, high test coverage, and strict performance metrics.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Deliverables Checklist */}
            <div className="serv-anim-fade bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div>
                  <span className="text-indigo-400 font-mono text-xs font-bold uppercase tracking-widest">
                    VERIFIABLE ARTIFACTS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] mt-1">
                    What You Receive Upon Delivery
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Transparent, fully documented handovers with zero vendor lock-in.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.deliverables.map((deliv, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-200 font-medium">
                        {deliv}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack & Tooling Grid */}
            <div className="serv-anim-fade space-y-4">
              <div className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
                TECHNOLOGIES & ECOSYSTEM
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit']">
                Languages, Frameworks & Cloud Services Used
              </h3>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {service.techs.map((tech, idx) => (
                  <div 
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 border border-slate-200/90 hover:border-indigo-300 text-slate-800 hover:text-indigo-700 text-xs font-bold transition-colors shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Working Methodology */}
            <div className="serv-anim-fade space-y-6 pt-4">
              <div>
                <div className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
                  STRUCTURED EXECUTION
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit'] mt-1">
                  Our 4-Stage Delivery Process
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {workflowSteps.map((step) => (
                  <div 
                    key={step.step}
                    className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-400 transition-all duration-300 relative group shadow-2xs"
                  >
                    <div className="text-2xl font-extrabold font-mono text-indigo-200 group-hover:text-indigo-600 transition-colors">
                      {step.step}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-2 font-['Outfit']">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Relevant Projects Showcase if any */}
            {relevantProjects.length > 0 && (
              <div className="serv-anim-fade space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
                      PROVEN DELIVERIES
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit'] mt-1">
                      Related Case Studies
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {relevantProjects.map((proj) => (
                    <div 
                      key={proj.id}
                      onClick={() => onSelectProject && onSelectProject(proj)}
                      className="group p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 transition-all shadow-xs hover:shadow-lg cursor-pointer flex flex-col justify-between"
                    >
                      <div className="h-40 rounded-xl overflow-hidden mb-3 relative bg-slate-100">
                        <img 
                          src={proj.image} 
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-white px-2 py-0.5 rounded-md border border-slate-700">
                          {proj.clientCountry}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                          {proj.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {proj.description}
                        </p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                        <span>Read Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column (4 cols): Sticky Quick Action & Consultation Box */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 self-start">
            
            {/* Consultation & Quote Card */}
            <div className="serv-anim-fade bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl space-y-6">
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CUSTOM ARCHITECTURE PROPOSAL</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit']">
                  Need {service.title}?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Connect with our software architects in Joypurhat, Bangladesh or Leverkusen, Germany to discuss your timeline, tech stack, and fixed-bid or dedicated team quote.
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onRequestQuote(service.title)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm py-4 px-6 rounded-2xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer min-h-[48px]"
              >
                <span>Request Custom Proposal</span>
                <Send className="w-4 h-4" />
              </button>

              {/* Service Specifications List */}
              <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100/80">
                  <span className="text-slate-500 font-medium">Pricing Model</span>
                  <span className="font-bold text-slate-800">Fixed-Milestone / Retainer</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100/80">
                  <span className="text-slate-500 font-medium">NDA & IP Rights</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Client-Owned
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100/80">
                  <span className="text-slate-500 font-medium">Timezone Overlap</span>
                  <span className="font-bold text-slate-800">CET, BST & EST Support</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-500 font-medium">Warranty Period</span>
                  <span className="font-bold text-slate-800">90-Day Post-Launch SLA</span>
                </div>
              </div>

              {/* Direct Support Contacts */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">
                  Direct Engineering Desk
                </div>
                <div className="text-xs sm:text-sm text-slate-700 space-y-1">
                  <div>Germany Hub: <a href="tel:+491729766016" className="font-bold text-emerald-600 hover:underline">+49 172 9766016</a></div>
                  <div>Global R&D Lab: <a href="tel:+8801722301927" className="font-bold text-indigo-600 hover:underline">+880 1722-301927</a></div>
                  <div>Direct Email: <a href="mailto:info@webdevsoftwaresolutions.com" className="font-bold text-indigo-600 hover:underline">info@webdevsoftwaresolutions.com</a></div>
                </div>
              </div>

              {/* Return to all services link */}
              <button
                onClick={onBack}
                className="w-full text-center text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors flex items-center justify-center gap-1 cursor-pointer py-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>View All 6 IT Services</span>
              </button>

            </div>

          </div>

        </div>

        {/* 4. Explore Other Services Section */}
        <div className="serv-anim-fade pt-12 border-t border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
                PRACTICE OVERVIEW
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] mt-1">
                Explore Other Enterprise Services
              </h3>
            </div>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
            >
              <span>View All IT Practice Areas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.slice(0, 3).map((other) => (
              <div
                key={other.id}
                onClick={() => {
                  onSelectService(other.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-indigo-400 shadow-xs hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors mb-3">
                    {getIcon(other.iconName, "w-5 h-5")}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-['Outfit']">
                    {other.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {other.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>Explore Specification</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
