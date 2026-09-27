'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const brands = [
  { name: "Agneya Singh", image: "/images/brands/agneyasingh.png" },
  { name: "All Strings Nylon", image: "/images/brands/allstringsnylon.png" },
  { name: "Gilmore Electric", image: "/images/brands/gilmoreelectric.png" },
  { name: "Marfione Guitar", image: "/images/brands/marfione-guitar.webp" },
  { name: "Start Campus", image: "/images/brands/start-campus.png" },
];

export const GlobalEcosystemSection: React.FC = () => {
  const { t, lang } = useLanguage();
  return (
    <section 
      className="py-24 sm:py-32 relative z-10 overflow-hidden bg-[#020617] text-white bg-fixed bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=85')",
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* ── FIXED BACKGROUND PARALLAX OVERLAYS ── */}

      {/* Deep Slate / Midnight High-Contrast Tint */}
      <div className="absolute inset-0 bg-[#020617]/85 backdrop-blur-[1px] pointer-events-none" />

      {/* Floating Ambient Luminous Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-cyan-500/15 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/10 w-[30rem] h-[30rem] rounded-full bg-indigo-600/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-pink-500/10 blur-[110px]" />
      </div>

      {/* Digital Cyber Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Vignette & Smooth Top/Bottom Edge Feathering */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,#020617_95%)]" />


      {/* ── FOREGROUND CONTENT ── */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-['Kufam'] text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>{t.ecosystemKicker}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-white tracking-tight font-['Kufam']">
              {lang === 'de' ? (
                <>Geschätzt von führenden <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-orange-400">Unternehmen</span></>
              ) : (
                <>Trusted by Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-orange-400">Leaders</span></>
              )}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed font-['Kufam']">
              {t.ecosystemSubtext}
            </p>
          </div>
        </div>

        {/* Brand Logos Marquee - Full Width */}
        <div className="relative w-screen left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] overflow-hidden py-8">
           {/* Fade Edges */}
           <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none"></div>
           <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none"></div>

           <div className="flex overflow-hidden group">
             {/* Duplicate map for seamless infinite scroll effect */}
             <div className="flex animate-marquee whitespace-nowrap gap-8 sm:gap-14 md:gap-20 items-center hover:[animation-play-state:paused]" style={{ animationDuration: '32s' }}>
                {[...brands, ...brands, ...brands, ...brands].map((brand, index) => {
                  const gradients = [
                    'from-cyan-500 to-blue-500',
                    'from-pink-500 to-rose-500',
                    'from-orange-500 to-amber-500',
                    'from-violet-500 to-purple-500',
                    'from-emerald-500 to-teal-500'
                  ];
                  const gradient = gradients[index % gradients.length];
                  
                  return (
                    <div key={index} className="group/brand cursor-pointer flex-shrink-0">
                      <div className="relative h-24 w-32 md:h-28 md:w-40 rounded-2xl overflow-hidden ring-1 ring-white/15 group-hover/brand:ring-2 group-hover/brand:ring-cyan-400/80 transition-all duration-300 group-hover/brand:shadow-2xl group-hover/brand:shadow-cyan-500/30 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3.5">
                        <img 
                          src={brand.image} 
                          alt={brand.name}
                          loading="lazy"
                          className="w-full h-full object-contain drop-shadow-lg group-hover/brand:scale-110 transition-transform duration-300"
                        />
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover/brand:opacity-15 transition-opacity duration-300`}></div>
                      </div>
                      <p className="text-center text-xs md:text-sm font-semibold text-slate-300 mt-3 group-hover/brand:text-transparent group-hover/brand:bg-gradient-to-r group-hover/brand:from-cyan-400 group-hover/brand:via-pink-400 group-hover/brand:to-orange-400 group-hover/brand:bg-clip-text transition-all duration-300">{brand.name}</p>
                    </div>
                  );
                })}
             </div>
           </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-14 sm:mt-18 flex flex-wrap justify-center gap-8 md:gap-14 border-t border-white/10 pt-10">
             <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">500+</p>
                <p className="text-xs text-cyan-400 uppercase tracking-widest mt-1 font-semibold">Clients Worldwide</p>
             </div>
             <div className="w-px h-12 bg-white/10 hidden md:block"></div>
             <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">98%</p>
                <p className="text-xs text-cyan-400 uppercase tracking-widest mt-1 font-semibold">Retention Rate</p>
             </div>
             <div className="w-px h-12 bg-white/10 hidden md:block"></div>
             <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">24/7</p>
                <p className="text-xs text-cyan-400 uppercase tracking-widest mt-1 font-semibold">Active Support</p>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GlobalEcosystemSection;
