import React from 'react';

const technologies = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
];

const technologiesRow2 = [
  { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
  { name: "Shopify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/salesforce/salesforce-original.svg" },
  { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
  { name: "Sass", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg" },
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg" },
];

interface TechBadgeProps {
  tech: { name: string; icon: string };
}

const TechBadge: React.FC<TechBadgeProps> = ({ tech }) => (
  <div 
    className="relative group/item flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-br from-white/90 via-white/70 to-white/50 border border-slate-200/80 backdrop-blur-xl hover:border-primary-400/80 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary-500/20 hover:scale-105 hover:-translate-y-1 min-w-[200px]"
  >
    {/* Gradient overlay on hover */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 to-violet-500/0 group-hover/item:from-primary-500/10 group-hover/item:to-violet-500/10 transition-all duration-500"></div>
    
    <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-primary-50 to-violet-50 shadow-inner group-hover/item:shadow-lg group-hover/item:scale-110 transition-all duration-500">
      <img src={tech.icon} alt={tech.name} loading="lazy" width="36" height="36" className="h-9 w-9 object-contain" />
    </div>
    <span className="relative text-base font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent group-hover/item:from-primary-600 group-hover/item:to-violet-600 transition-all duration-500">
      {tech.name}
    </span>
    
    {/* Glowing pulse effect */}
    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary-500 to-violet-500 opacity-0 group-hover/item:opacity-20 blur-lg transition-all duration-500"></div>
  </div>
);

export const TechStackSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 relative z-10 overflow-hidden bg-slate-50/70">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-violet-50/40 -z-10"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-400/20 to-violet-400/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-violet-400/20 to-primary-400/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      
      {/* Gradient Fade Edges for marquee */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none"></div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="inline-flex items-center gap-2 text-primary-600 font-['Playfair_Display'] italic text-base sm:text-lg lg:text-xl font-semibold tracking-wide">
          <span>The Engine Room & Tech Arsenal</span>
        </div>
        <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-primary-600 to-violet-600">
            Powering World-Class Solutions
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium font-['Instrument_Sans']">
          Built with cutting-edge technologies trusted by industry leaders worldwide
        </p>
      </div>
      
      {/* Marquee Row 1 - Moving Left */}
      <div className="relative flex overflow-hidden mb-8 group">
        <div className="flex animate-marquee whitespace-nowrap gap-6 py-4 hover:[animation-play-state:paused]" style={{ animationDuration: '38s' }}>
          {[...technologies, ...technologies, ...technologies, ...technologies].map((tech, index) => (
            <TechBadge key={`r1-${index}`} tech={tech} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 - Moving Right (Reverse) */}
      <div className="relative flex overflow-hidden group">
        <div className="flex animate-marquee-reverse whitespace-nowrap gap-6 py-4 hover:[animation-play-state:paused]" style={{ animationDuration: '38s' }}>
          {[...technologiesRow2, ...technologiesRow2, ...technologiesRow2, ...technologiesRow2].map((tech, index) => (
            <TechBadge key={`r2-${index}`} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
