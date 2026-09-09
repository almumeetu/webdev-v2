import React, { useRef } from 'react';
import { Search, Code2, Headphones, ArrowRight } from 'lucide-react';
import { useGsapContext, animateStagger } from '../utils/gsapHelper';
import gsap from 'gsap';

export const WorkingProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;

    // Header animation
    gsap.fromTo(
      '.process-header-anim',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true
        }
      }
    );

    // Stagger steps
    animateStagger('.process-step-item', sectionRef.current, 0.18, 40);
  });

  const steps = [
    {
      num: '01',
      title: 'Understanding Your Story',
      desc: 'We listen to the story and objectives of your brand, and conduct deep technical analysis to plan for successful partnering across Germany, Bangladesh & beyond.',
      icon: Search,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80'
    },
    {
      num: '02',
      title: 'Tailoring Software Solutions',
      desc: 'We identify your software needs and quickly engineer full-stack MERN apps, high-throughput servers, and optimized e-commerce storefronts.',
      icon: Code2,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80'
    },
    {
      num: '03',
      title: 'Provide Ongoing Support',
      desc: 'Our team of experts provides ongoing technical monitoring, Linux server patching, and DevOps support to guarantee 99.99% system availability.',
      icon: Headphones,
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-28 bg-[#090d18] text-white relative overflow-hidden border-t border-b border-slate-800">
      {/* Background glow & circuit pattern */}
      <div className="absolute inset-0 bg-tech-circuit opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header matching Frame 00:07 */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="process-header-anim inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-indigo-400 uppercase font-mono">
              WORKING PROCESS
            </span>
          </div>

          <h2 className="process-header-anim text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
            Get your IT solutions in 3 easy steps
          </h2>

          <p className="process-header-anim text-slate-400 text-sm sm:text-base">
            Transparent milestones, rapid sprints, and zero communication friction between client hubs and engineering teams.
          </p>
        </div>

        {/* 3 Step Cards with curved connecting arrows matching reference video */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="process-step-item relative flex flex-col items-center text-center group"
              >
                {/* Circular image badge with glowing border & step number pill */}
                <div className="relative mb-5 sm:mb-6">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-indigo-600/50 group-hover:border-indigo-500 transition-colors shadow-2xl p-1 bg-slate-900">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Step Number Tag */}
                  <div className="absolute -bottom-2 -right-1 w-9 h-9 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-lg border-2 border-[#090d18] font-mono">
                    {step.num}
                  </div>
                </div>

                {/* Step Content */}
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-400 transition-colors font-['Outfit']">
                  {step.title}
                </h3>

                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
                  {step.desc}
                </p>

                {/* Connecting arrow for steps 1 and 2 (desktop) */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-16 -right-6 w-12 text-indigo-500/40 transform translate-x-1/2 pointer-events-none">
                    <svg className="w-12 h-6" viewBox="0 0 48 24" fill="none" stroke="currentColor">
                      <path d="M4 12 C 16 4, 32 20, 44 12" strokeWidth="2" strokeDasharray="3 3" />
                      <polyline points="38 7 44 12 38 17" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
