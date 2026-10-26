import React, { useRef } from 'react';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { BlogPost } from '../types';
import { useGsapContext, animateStagger } from '../utils/gsapHelper';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';

interface LatestNewsSectionProps {
  blogs: BlogPost[];
  onSelectBlog: (blog: BlogPost) => void;
  onViewAllBlogs: () => void;
}

export const LatestNewsSection: React.FC<LatestNewsSectionProps> = ({
  blogs,
  onSelectBlog,
  onViewAllBlogs,
}) => {
  const { t, localizeBlog } = useLanguage();
  const localizedBlogs = blogs.map(b => localizeBlog(b));
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Header animation
    gsap.fromTo(
      '.news-header-anim',
      { opacity: 0, y: isMobile ? 12 : 22 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.35 : 0.6,
        stagger: isMobile ? 0.04 : 0.08,
        ease: isMobile ? 'power1.out' : 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 92%' : 'top 85%',
          once: true,
        },
        clearProps: 'transform,opacity',
      }
    );

    // Stagger cards
    animateStagger('.blog-card-item', sectionRef.current, 0.08, 24);
  });

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24 bg-white text-slate-900 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="news-header-anim inline-flex items-center gap-2 text-sky-700 font-['Kufam'] text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <BookOpen className="w-4 h-4 text-sky-600" />
            <span>{t.blogKicker}</span>
          </div>

          <h2 className="news-header-anim text-xl sm:text-2xl md:text-3xl font-semibold text-slate-950 tracking-tight font-['Kufam']">
            {t.blogHeading}
          </h2>

          <p className="news-header-anim text-slate-600 text-sm sm:text-base leading-relaxed font-['Kufam'] max-w-xl mx-auto">
            {t.blogSubheading}
          </p>
        </div>

        {/* 3 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {localizedBlogs.slice(0, 3).map((blog) => (
            <article
              key={blog.id}
              onClick={() => onSelectBlog(blog)}
              className="blog-card-item group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Image banner */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                {blog.image && blog.image.trim() !== '' ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : null}
              </div>

              {/* Card Meta & Title */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Author & Date metadata row */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3 font-medium">
                    <div className="flex items-center gap-2 min-w-0">
                      {blog.authorImage && blog.authorImage.trim() !== '' ? (
                        <img
                          src={blog.authorImage}
                          alt={blog.author}
                          className="w-5 h-5 rounded-[6px] object-cover border border-slate-200 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-[6px] bg-[#BBE7F1]/40 border border-[#9cd5e2] text-slate-950 font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                          {blog.author.charAt(0)}
                        </div>
                      )}
                      <span className="text-slate-700 font-medium truncate">{blog.author}</span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-400 text-[11px] sm:text-xs flex-shrink-0">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{blog.date}</span>
                    </div>
                  </div>

                  {/* Title (Clean, High-Legibility) */}
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2 leading-snug font-['Kufam']">
                    {blog.title}
                  </h3>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {blog.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium text-slate-600 bg-slate-100/90 px-2 py-0.5 rounded-[6px] border border-slate-200/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-slate-950 group-hover:text-sky-700 inline-flex items-center gap-1.5 uppercase tracking-wider transition-colors cursor-pointer">
                    <span>{t.blogReadArticle}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all articles button */}
        <div className="mt-12 sm:mt-14 text-center">
          <button
            onClick={onViewAllBlogs}
            className="inline-flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>{t.blogViewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
