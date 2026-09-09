import React, { useRef } from 'react';
import { Award, Headphones, Shield, CheckCircle2, TrendingUp } from 'lucide-react';
import { gsap, useGsapContext, animateCounter } from '../utils/gsapHelper';

export const TechnologyIndexSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeNumRef = useRef<HTMLDivElement>(null);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;

    // Fade and slide left image
    gsap.fromTo(
      '.tech-index-image',
      { opacity: 0, x: -30 },
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

    // Stagger right content
    gsap.fromTo(
      '.tech-index-text',
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

    // Animate skill progress bars width from 0% to full target
    const skillBars = [
      { selector: '.skill-bar-1', targetWidth: '95%' },
      { selector: '.skill-bar-2', targetWidth: '80%' },
      { selector: '.skill-bar-3', targetWidth: '90%' },
      { selector: '.skill-bar-4', targetWidth: '99.9%' }
    ];

    skillBars.forEach(({ selector, targetWidth }) => {
      gsap.fromTo(
        selector,
        { width: '0%' },
        {
          width: targetWidth,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true
          }
        }
      );
    });

    // Animate badge counter
    animateCounter(badgeNumRef.current, 99, '', '%', 2);
  });

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-28 bg-white text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Team at work image */}
          <div className="tech-index-image lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="Tech team designing software architecture"
                className="w-full h-[340px] sm:h-[440px] lg:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              
              {/* Floating tech badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-slate-900/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-700/80 text-white flex items-center justify-between shadow-2xl">
                <div>
                  <div className="text-[10px] sm:text-xs text-indigo-400 font-mono font-bold tracking-wider">GLOBAL ENGINEERING DELIVERY</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-100">Joypurhat, Bangladesh • Worldwide Clients</div>
                </div>
                <div 
                  ref={badgeNumRef} 
                  className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center font-bold text-base sm:text-lg shadow-lg shrink-0 ml-3"
                >
                  99%
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content & Skill Bars matching Frame 00:05 */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Pill label matching reference */}
            <div className="tech-index-text inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase font-mono">
                TECHNOLOGY INDEX
              </span>
            </div>

            {/* Bold Headline matching reference */}
            <h2 className="tech-index-text text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18] font-['Outfit']">
              We Are Always Best For Technology Solution
            </h2>

            {/* Two Side-by-Side Highlight Cards matching reference */}
            <div className="tech-index-text grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-['Outfit']">Experience</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    We deliver premier engineering excellence and modern architecture for your software.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-['Outfit']">Quick Support</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Dedicated 24/7 technical monitoring and rapid support across global timezones.
                  </p>
                </div>
              </div>
            </div>

            {/* GSAP Animated Progress Bars matching Frame 00:05 */}
            <div className="tech-index-text space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5 font-['Outfit']">
                  <span>IT Management & System Architecture</span>
                  <span className="text-indigo-600 font-mono">95%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="skill-bar-1 h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full w-0"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5 font-['Outfit']">
                  <span>Data Security & Cloud DevOps</span>
                  <span className="text-purple-600 font-mono">80%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="skill-bar-2 h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full w-0"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5 font-['Outfit']">
                  <span>Technology Solution & Full-Stack MERN</span>
                  <span className="text-blue-600 font-mono">90%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="skill-bar-3 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-0"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5 font-['Outfit']">
                  <span>High-Availability Server SLA & Uptime</span>
                  <span className="text-emerald-600 font-mono">99.9%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="skill-bar-4 h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full w-0"></div>
                </div>
              </div>
            </div>

            {/* Bottom summary text matching reference video */}
            <p className="tech-index-text text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              We help businesses achieve strategic technology transformation, minimising the totality of their end-to-end business risk and maximising the business value of their IT infrastructure.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};
