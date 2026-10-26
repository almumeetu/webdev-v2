'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const brands = [
  { name: 'Agneya Singh', image: '/images/brands/agneyasingh.png' },
  { name: 'All Strings Nylon', image: '/images/brands/allstringsnylon.png' },
  { name: 'Gilmore Electric', image: '/images/brands/gilmoreelectric.png' },
  { name: 'Marfione Guitar', image: '/images/brands/marfione-guitar.webp' },
  { name: 'Start Campus', image: '/images/brands/start-campus.png' },
];

export const GlobalEcosystemSection: React.FC = () => {
  const { t, lang } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-white py-11 text-slate-900 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div className="max-w-xl">
            <h2 className="font-['Kufam'] text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl lg:text-3xl">
              {lang === 'de' ? 'Geschätzt von führenden Unternehmen' : 'Trusted by Industry Leaders'}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              {t.ecosystemSubtext}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl bg-white/90 p-3 shadow-sm ring-1 ring-slate-200/60 transition-shadow hover:shadow-md"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  loading="lazy"
                  className="h-9 w-full object-contain sm:h-10"
                />
                <span className="text-center text-[10px] font-medium leading-tight text-slate-500 sm:text-[11px]">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 border-t border-slate-200/70 pt-6 sm:mt-10 sm:pt-7">
          <div className="px-2 text-center sm:px-4">
            <p className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">70+</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-sky-700 sm:text-xs">
              Clients Worldwide
            </p>
          </div>
          <div className="border-x border-slate-200/70 px-2 text-center sm:px-4">
            <p className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">98%</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-sky-700 sm:text-xs">
              Retention Rate
            </p>
          </div>
          <div className="px-2 text-center sm:px-4">
            <p className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">24/7</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-sky-700 sm:text-xs">
              Active Support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalEcosystemSection;
