import React, { useRef } from 'react';
import { Calendar, Clock, ArrowRight, Heart, BookOpen } from 'lucide-react';
import { BlogPost } from '../types';
import { useGsapContext, animateStagger } from '../utils/gsapHelper';
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
      className="py-16 sm:py-20 lg:py-24 bg-slate-50/70 text-slate-900 relative border-t border-b border-slate-200/80"
    >
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="news-header-anim inline-flex items-center gap-2 text-cyan-800 font-['Playfair_Display'] italic text-base sm:text-lg lg:text-xl font-semibold tracking-wide">
            <BookOpen className="w-4 h-4 text-cyan-700" />
            <span>From Our Engineering Journal & Insights</span>
          </div>

          <h2 className="news-header-anim text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold text-slate-950 tracking-tight font-['Archivo']">
            Latest News and Insights
          </h2>

          <p className="news-header-anim text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-['Instrument_Sans']">
            Deep-dive technical perspectives on cloud infrastructure, distributed microservices, Linux server security, and modern web architectures.
          </p>
        </div>

        {/* 3 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {blogs.slice(0, 3).map((blog) => (
            <article
              key={blog.id}
              onClick={() => onSelectBlog(blog)}
              className="blog-card-item group bg-white rounded-[6px] overflow-hidden border border-slate-200/80 hover:border-[#9cd5e2] hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
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
                
                {/* Category badge */}
                <div className="absolute top-3 left-3 bg-[#BBE7F1]/90 backdrop-blur-sm text-slate-950 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-[6px] uppercase tracking-wider border border-[#9cd5e2] shadow-xs">
                  {blog.category}
                </div>

                {/* Read time badge */}
                {blog.readTime && (
                  <div className="absolute top-3 right-3 bg-slate-950/75 backdrop-blur-sm text-slate-200 text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-[6px] border border-white/10 flex items-center gap-1 shadow-xs">
                    <Clock className="w-3 h-3 text-slate-300" />
                    <span>{blog.readTime}</span>
                  </div>
                )}
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

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-cyan-800 transition-colors line-clamp-2 leading-snug font-['Archivo']">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>

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
                  <span className="text-xs sm:text-sm font-semibold text-slate-950 group-hover:text-cyan-800 inline-flex items-center gap-1.5 uppercase tracking-wider transition-colors cursor-pointer">
                    <span>READ ARTICLE</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/30" />
                    <span>{blog.likes}</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all articles button */}
        <div className="mt-12 text-center">
          <button
            onClick={onViewAllBlogs}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs sm:text-sm px-6 py-3 rounded-[6px] border border-slate-300 hover:border-slate-400 transition-all cursor-pointer min-h-[40px]"
          >
            <span>Read All News & Engineering Articles</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>

      </div>
    </section>
  );
};
