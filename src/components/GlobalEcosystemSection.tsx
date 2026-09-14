import React from 'react';

const brands = [
  { name: "Agneya Singh", image: "/images/brands/agneyasingh.png" },
  { name: "All Strings Nylon", image: "/images/brands/allstringsnylon.png" },
  { name: "Gilmore Electric", image: "/images/brands/gilmoreelectric.png" },
  { name: "Marfione Guitar", image: "/images/brands/marfione-guitar.webp" },
  { name: "Start Campus", image: "/images/brands/start-campus.png" },
];

export const GlobalEcosystemSection: React.FC = () => {
  return (
    <section className="py-24 relative z-10 overflow-hidden">
      {/* Background Image with Parallax Feel */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Office Background" 
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {/* Dark Blue/Slate Overlay */}
        <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-[2px]"></div>
        
        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-cyan-300 font-['Playfair_Display'] italic text-base sm:text-lg lg:text-xl font-semibold tracking-wide">
              <span>Global Ecosystem & Partnerships</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold text-white tracking-tight">
              Trusted by Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-orange-400">Leaders</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed font-['Instrument_Sans']">
              We collaborate with ambitious brands and startups to build the digital infrastructure of tomorrow.
            </p>
          </div>
        </div>

        {/* Brand Logos Marquee - Full Width */}
        <div className="relative w-screen left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] overflow-hidden py-8">
           {/* Fade Edges */}
           <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none"></div>
           <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none"></div>

           <div className="flex overflow-hidden group">
             {/* Duplicate map for infinite scroll effect */}
             <div className="flex animate-marquee whitespace-nowrap gap-12 md:gap-20 items-center hover:[animation-play-state:paused]" style={{ animationDuration: '32s' }}>
                {[...brands, ...brands, ...brands, ...brands].map((brand, index) => {
                  // Colorful gradient cycling for each brand
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
                      <div className={`relative h-24 w-32 md:h-28 md:w-40 rounded-2xl overflow-hidden ring-2 ring-white/20 group-hover/brand:ring-offset-2 group-hover/brand:ring-offset-[#020617] group-hover/brand:ring-white/60 transition-all duration-300 group-hover/brand:shadow-2xl group-hover/brand:shadow-cyan-500/50 bg-white/10 backdrop-blur-sm flex items-center justify-center p-3`}>
                        <img 
                          src={brand.image} 
                          alt={brand.name}
                          loading="lazy"
                          className="w-full h-full object-contain drop-shadow-lg group-hover/brand:scale-110 transition-transform duration-300"
                        />
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover/brand:opacity-20 transition-opacity duration-300`}></div>
                      </div>
                      <p className="text-center text-xs md:text-sm font-semibold text-slate-300 mt-3 group-hover/brand:text-transparent group-hover/brand:bg-gradient-to-r group-hover/brand:from-cyan-400 group-hover/brand:via-pink-400 group-hover/brand:to-orange-400 group-hover/brand:bg-clip-text transition-all duration-300">{brand.name}</p>
                    </div>
                  );
                })}
             </div>
           </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-12 border-t border-white/10 pt-10">
             <div className="text-center">
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-xs text-primary-400 uppercase tracking-widest mt-1">Clients Worldwide</p>
             </div>
             <div className="w-px h-12 bg-white/10 hidden md:block"></div>
             <div className="text-center">
                <p className="text-3xl font-bold text-white">98%</p>
                <p className="text-xs text-primary-400 uppercase tracking-widest mt-1">Retention Rate</p>
             </div>
             <div className="w-px h-12 bg-white/10 hidden md:block"></div>
             <div className="text-center">
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="text-xs text-primary-400 uppercase tracking-widest mt-1">Active Support</p>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GlobalEcosystemSection;
