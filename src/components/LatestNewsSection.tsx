import React, { useRef } from 'react';
import { Calendar, User, ArrowRight, Heart } from 'lucide-react';
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
  onViewAllBlogs
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current) return;

    // Header animation
    gsap.fromTo(
      '.news-header-anim',
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

    // Stagger cards
    animateStagger('.blog-card-item', sectionRef.current, 0.12, 35);
  });

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-white text-slate-900 relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Frame 00:11 */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="news-header-anim inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase font-mono">
              FROM OUR BLOG
            </span>
          </div>

          <h2 className="news-header-anim text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
            Latest News and Insights
          </h2>

          <p className="news-header-anim text-slate-600 text-xs sm:text-base">
            Expert engineering articles on MERN architecture, high-availability Linux servers, and international e-commerce.
          </p>
        </div>

        {/* 3 Blog Cards matching Frame 00:11 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {blogs.slice(0, 3).map((blog) => (
            <article
              key={blog.id}
              onClick={() => onSelectBlog(blog)}
              className="blog-card-item group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-slate-100 flex flex-col"
            >
              {/* Image banner */}
              <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-900">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-indigo-600 text-white text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {blog.category}
                </div>
              </div>

              {/* Card Meta & Title */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Date & Author matching reference video */}
                  <div className="flex items-center gap-3 sm:gap-4 text-xs text-slate-400 mb-2.5 sm:mb-3 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      {blog.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <User className="w-3.5 h-3.5 text-indigo-500" />
                      {blog.author}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug font-['Outfit']">
                    {blog.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Read more link matching reference video */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 group-hover:text-indigo-700 inline-flex items-center gap-1 uppercase tracking-wider">
                    READ MORE <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    {blog.likes}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all articles */}
        <div className="mt-12 text-center">
          <button
            onClick={onViewAllBlogs}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm px-6 py-3.5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition-all min-h-[44px] cursor-pointer"
          >
            <span>Read All News & Engineering Articles</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </button>
        </div>

      </div>
    </section>
  );
};
