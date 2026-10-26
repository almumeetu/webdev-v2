import React, { useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useGsapContext, animateStagger } from '../utils/gsapHelper';
import gsap from 'gsap';
import { RiSearchLine, RiCodeSSlashLine, RiHeadphoneLine } from 'react-icons/ri';

export const WorkingProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    gsap.fromTo(
      '.process-header-anim',
      { opacity: 0, y: isMobile ? 12 : 25 },
      {
        opacity: 1, y: 0,
        duration: isMobile ? 0.35 : 0.65,
        stagger: isMobile ? 0.04 : 0.1,
        ease: isMobile ? 'power1.out' : 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: isMobile ? 'top 92%' : 'top 85%', once: true },
        clearProps: 'transform,opacity'
      }
    );
    animateStagger('.process-step-item', sectionRef.current, 0.1, 28);
  });

  const steps = [
    {
      num: '01',
      title: 'Architectural Discovery',
      desc: 'We conduct deep technical discovery, analyzing your system requirements, database topologies, and business objectives across Germany, Bangladesh & worldwide.',
      Icon: RiSearchLine,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/20 border-amber-400/30',
      badge: 'Discovery & Plan',
      badgeColor: 'text-amber-300 bg-amber-400/15 border-amber-400/30',
      numColor: 'group-hover:text-amber-300',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=80'
    },
    {
      num: '02',
      title: 'Agile Engineering Sprints',
      desc: 'Our senior engineers develop full-stack MERN web platforms, high-throughput cloud servers, and custom e-commerce stores with continuous weekly staging demos.',
      Icon: RiCodeSSlashLine,
      iconColor: 'text-violet-400',
      iconBg: 'bg-violet-500/20 border-violet-400/30',
      badge: 'Rapid Build',
      badgeColor: 'text-violet-300 bg-violet-400/15 border-violet-400/30',
      numColor: 'group-hover:text-violet-300',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80'
    },
    {
      num: '03',
      title: '24/7 SLA & DevOps Support',
      desc: 'Our dedicated DevOps specialists handle continuous Linux server patching, container orchestration, and guaranteed 99.99% system availability.',
      Icon: RiHeadphoneLine,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/20 border-emerald-400/30',
      badge: 'Live SLA',
      badgeColor: 'text-emerald-300 bg-emerald-400/15 border-emerald-400/30',
      numColor: 'group-hover:text-emerald-300',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80'
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-slate-950 text-white relative overflow-hidden border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="process-header-anim inline-flex items-center gap-2 text-cyan-300 font-['Kufam'] text-xs sm:text-sm font-semibold tracking-wide">
            <span>Our Working Process & Methodology</span>
          </div>
          <h2 className="process-header-anim text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-semibold text-white tracking-tight font-['Kufam']">
            Get your IT solutions in 3 easy steps
          </h2>
          <p className="process-header-anim text-slate-400 text-xs sm:text-sm leading-relaxed font-['Kufam']">
            Transparent milestones, rapid sprints, and zero communication friction between client hubs and engineering teams.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-8 relative">
          {steps.map((step) => {
            const { Icon } = step;
            return (
              <div
                key={step.num}
                className="process-step-item bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-slate-600 shadow-xl hover:shadow-slate-900/50 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  {/* Top: step number + badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-3xl sm:text-4xl font-semibold text-slate-700 transition-colors ${step.numColor}`}>
                      {step.num}
                    </span>
                    <span className={`text-xs font-mono font-medium px-2.5 py-1 rounded-full border ${step.badgeColor}`}>
                      {step.badge}
                    </span>
                  </div>

                  {/* Image banner */}
                  <div className="w-full h-40 rounded-2xl overflow-hidden mb-6 relative bg-slate-950">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    {/* Colorful icon overlay */}
                    <div className={`absolute bottom-3 left-3 w-10 h-10 rounded-xl border flex items-center justify-center shadow-lg ${step.iconBg} ${step.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white group-hover:text-slate-100 transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified Engineering Delivery</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
