import React, { useState, useRef } from 'react';
import { Play, Plus, Minus, CheckCircle, Shield, Sparkles, X } from 'lucide-react';
import { gsap, useGsapContext, animateCounter } from '../utils/gsapHelper';

export const FaqAndExperienceSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const expCounterRef = useRef<HTMLDivElement>(null);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;

    // Image reveal
    gsap.fromTo(
      '.faq-image-wrapper',
      { opacity: 0, x: -35 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true
        }
      }
    );

    // FAQ right content
    gsap.fromTo(
      '.faq-text-content',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true
        }
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
      a: 'Our dual presence in Joypurhat, Bangladesh (BST, UTC+6) and Leverkusen, Germany (CET, UTC+1) enables up to 14 hours of overlapping daily real-time collaboration. We use Slack, Microsoft Teams, Jira, and GitHub with dedicated project managers fluent in English, German, and Bengali.'
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Visual with Play button & Years of experience badge matching Frame 00:08 */}
          <div className="faq-image-wrapper lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                alt="WebDev software engineer coding"
                className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-indigo-950/25"></div>

              {/* Video Play Button Overlay matching reference video */}
              <button
                onClick={() => setVideoModalOpen(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-indigo-500 transition-all duration-300 group cursor-pointer"
                aria-label="Play company reel"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white/40 flex items-center justify-center group-hover:border-white">
                  <Play className="w-5 h-5 sm:w-7 sm:h-7 fill-current ml-1" />
                </div>
              </button>

              {/* Glowing blue "10+ Years of experience" badge */}
              <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3.5 sm:p-5 rounded-2xl shadow-2xl flex items-center gap-3 sm:gap-4 border-2 border-white/20">
                <div 
                  ref={expCounterRef}
                  className="text-3xl sm:text-5xl font-extrabold font-['Outfit'] tracking-tight"
                >
                  10+
                </div>
                <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider leading-snug">
                  Years of<br />Engineering<br />Experience
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: FAQs Accordion matching Frame 00:08 */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Pill label */}
            <div className="faq-text-content inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase font-mono">
                FREQUENTLY ASKED QUESTIONS
              </span>
            </div>

            {/* Headline */}
            <h2 className="faq-text-content text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18] font-['Outfit']">
              Have any Question to our team?
            </h2>

            <p className="faq-text-content text-sm sm:text-base text-slate-600">
              Everything you need to know about our international delivery process, pricing transparency, and technology stack.
            </p>

            {/* Accordion list */}
            <div className="faq-text-content space-y-3 pt-1">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                      isOpen 
                        ? 'border-indigo-600 bg-indigo-50/40 shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none min-h-[44px] cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-bold text-slate-900 font-['Outfit']">
                        {faq.q}
                      </span>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-indigo-100/60 pt-3">
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

      {/* Responsive Video Showcase Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b0f19] border border-slate-700 rounded-2xl p-5 sm:p-6 max-w-2xl w-full text-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base sm:text-lg font-bold font-['Outfit']">WebDev Software Solutions Reel</h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video bg-slate-950 rounded-xl flex flex-col items-center justify-center text-center p-6 border border-slate-800 relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-3">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold">WebDev Software Solutions Showcase</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Cross-border IT excellence connecting Joypurhat, Bangladesh and Leverkusen, Germany. Full-stack MERN, high-availability servers, and global commerce.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
