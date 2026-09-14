import React, { useState, useRef } from 'react';
import { Play, Plus, Minus, CheckCircle, Shield, Sparkles, Award } from 'lucide-react';
import { gsap, useGsapContext, animateCounter } from '../utils/gsapHelper';

interface FaqAndExperienceSectionProps {
  onLearnMore?: () => void;
}

export const FaqAndExperienceSection: React.FC<FaqAndExperienceSectionProps> = ({ onLearnMore }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const expCounterRef = useRef<HTMLDivElement>(null);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Image reveal
    gsap.fromTo(
      '.faq-image-wrapper',
      { opacity: 0, x: isMobile ? 0 : -35, y: isMobile ? 12 : 0 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: isMobile ? 0.35 : 0.65,
        ease: isMobile ? 'power1.out' : 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 92%' : 'top 80%',
          once: true
        },
        clearProps: 'transform,opacity'
      }
    );

    // FAQ right content
    gsap.fromTo(
      '.faq-text-content',
      { opacity: 0, y: isMobile ? 12 : 25 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.35 : 0.65,
        stagger: isMobile ? 0.04 : 0.1,
        ease: isMobile ? 'power1.out' : 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 92%' : 'top 80%',
          once: true
        },
        clearProps: 'transform,opacity'
      }
    );

    // Counter
    animateCounter(expCounterRef.current, 10, '', '+', 1.8);
  });

  const faqs = [
    {
      q: '1. What documents & contracts are needed for project kickoff?',
      a: 'We provide clear, legally binding Service Agreements and mutual Non-Disclosure Agreements (NDAs) adhering to German GDPR data privacy regulations and international contracting standards. All intellectual property (IP) and source code ownership belong 100% to the client upon completion.'
    },
    {
      q: '2. What is the typical budget and timeline for a new project?',
      a: 'Projects range from focused MVPs and custom Shopify storefronts ($2,500 - $6,000 / €2,300 - €5,500) to large-scale enterprise MERN platforms and high-availability server clusters ($10,000 - $35,000+). Delivery sprints are typically 3 to 8 weeks with weekly milestone demos.'
    },
    {
      q: '3. How do international clients communicate across timezones?',
      a: 'Our engineering squads provide direct, real-time collaboration structured around European, UK, and North American business hours. We work in dedicated Slack or Teams channels, run weekly sprint demos on Zoom or Google Meet, and maintain continuous transparency through Jira, Linear, and GitHub.'
    },
    {
      q: '4. Do you provide ongoing server maintenance and SLA uptime guarantees?',
      a: 'Yes. We offer 24/7 proactive Linux server management, continuous security patching, database optimization, and guaranteed 1-hour critical response SLAs for both cloud instances and bare-metal servers.'
    },
    {
      q: '5. Can you migrate our legacy PHP/WordPress site to modern MERN or Shopify?',
      a: 'Absolutely. We specialize in zero-downtime database and asset migrations, modernizing legacy systems into ultra-fast React 19 / Next.js frontends and decoupled API backends with 100% SEO preservation.'
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-28 bg-white text-slate-900 relative">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Visual with Experience Badge */}
          <div className="faq-image-wrapper lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                alt="WebDev software engineer coding"
                className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/20"></div>

              {/* Verified Trust overlay chip */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-800 shadow-md flex items-center gap-1.5 border border-slate-200/80">
                <Shield className="w-3.5 h-3.5 text-cyan-700" />
                <span>GDPR & ISO Standard Compliant</span>
              </div>

              {/* 10+ Years of experience badge */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-slate-900/95 text-white p-4 sm:p-5 rounded-2xl shadow-2xl flex items-center gap-3 sm:gap-4 border border-slate-700/80 backdrop-blur-md">
                <div 
                  ref={expCounterRef}
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Archivo'] tracking-tight text-[#BBE7F1]"
                >
                  10+
                </div>
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider leading-snug text-slate-300">
                  Years of<br />Engineering<br />Experience
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: FAQs Accordion */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Eyebrow Subheading - Stylish Italic (No Background) */}
            <div className="faq-text-content inline-flex items-center gap-2 text-cyan-800 font-['Playfair_Display'] italic text-base sm:text-lg lg:text-xl font-semibold tracking-wide">
              <span>Frequently Asked Questions & Answers</span>
            </div>

            {/* Headline */}
            <h2 className="faq-text-content text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold text-slate-950 tracking-tight leading-[1.22] font-['Archivo']">
              Have any Question to our team?
            </h2>

            <p className="faq-text-content text-sm sm:text-base text-slate-600 leading-relaxed font-['Instrument_Sans']">
              Everything you need to know about our international delivery process, pricing transparency, and technology stack.
            </p>

            {/* Accordion list */}
            <div className="faq-text-content space-y-3 pt-1">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen 
                        ? 'border-[#9cd5e2] bg-[#BBE7F1]/20 shadow-xs' 
                        : 'border-slate-200/90 bg-white hover:border-slate-300'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none min-h-[44px] cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-bold text-slate-900 font-['Instrument_Sans']">
                        {faq.q}
                      </span>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2]' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-[#9cd5e2]/40 pt-3 font-normal">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
