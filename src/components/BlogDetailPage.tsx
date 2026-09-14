import React, { useState, useRef } from 'react';
import { Calendar, User, Heart, Share2, MessageSquare, ArrowLeft, Tag, Bookmark } from 'lucide-react';
import { BlogPost } from '../types';
import { useGsapContext } from '../utils/gsapHelper';
import gsap from 'gsap';


interface BlogDetailPageProps {
  blog: BlogPost | null;
  onBack: () => void;
  onBackToHome?: () => void;
  onLike: (id: string) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  blog,
  onBack,
  onBackToHome,
  onLike
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Array<{ id: string; author: string; text: string; date: string }>>([
    {
      id: 'c1',
      author: 'Lars Becker, Cloud Architect',
      text: 'Extremely insightful breakdown regarding server failover clusters. We saw similar reliability improvements deploying bare-metal nodes in Frankfurt.',
      date: 'Feb 19, 2026'
    },
    {
      id: 'c2',
      author: 'Mahin Chowdhury, Senior Full-Stack Engineer',
      text: 'Great point about React 19 server actions and modular monoliths. Excellent engineering standard from WebDev Software Solutions.',
      date: 'Feb 20, 2026'
    }
  ]);
  const [liked, setLiked] = useState(false);

  useGsapContext(pageRef, () => {
    if (!pageRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    gsap.fromTo(
      '.blog-fade-item',
      { opacity: 0, y: isMobile ? 10 : 20 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.35 : 0.6,
        stagger: isMobile ? 0.04 : 0.08,
        ease: isMobile ? 'power1.out' : 'power2.out',
        clearProps: 'transform,opacity'
      }
    );
  });

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-3 font-['Archivo']">
          Article Not Found
        </h2>
        <button
          onClick={onBack}
          className="bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 border border-[#9cd5e2] text-xs font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer"
        >
          ← Return to Blog
        </button>
      </div>
    );
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([
      ...comments,
      {
        id: `c-${Date.now()}`,
        author: 'Verified Engineering Lead',
        text: commentText,
        date: 'Just now'
      }
    ]);
    setCommentText('');
  };

  const toggleLike = () => {
    setLiked(!liked);
    onLike(blog.id);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-white text-slate-900">
      {/* Top Back Action & Minimal Navigation */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-cyan-800 transition-colors cursor-pointer group py-1.5 px-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Blog</span>
        </button>
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            className="text-xs font-medium text-slate-400 hover:text-cyan-800 transition-colors cursor-pointer"
          >
            Home
          </button>
        )}
      </div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto space-y-10">

        {/* Article Header */}
        <div className="blog-fade-item space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-[#BBE7F1]/80 px-3 py-1 rounded-full border border-[#9cd5e2]">
              {blog.category}
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-500 font-medium">{blog.readTime} read</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold text-slate-950 font-['Archivo'] leading-snug">
            {blog.title}
          </h1>

          {/* Author Card */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-3">
              {blog.authorImage && blog.authorImage.trim() !== '' ? (
                <img
                  src={blog.authorImage}
                  alt={blog.author}
                  className="w-11 h-11 rounded-full object-cover border-2 border-slate-200"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-[#BBE7F1]/40 border-2 border-[#9cd5e2] flex items-center justify-center text-slate-950 font-bold">
                  {blog.author?.charAt(0) || 'A'}
                </div>
              )}
              <div>
                <div className="text-sm font-bold text-slate-900">{blog.author}</div>
                <div className="text-xs text-slate-500">{blog.authorRole}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{blog.date}</span>
            </div>
          </div>
        </div>

        {/* Main Banner Image */}
        <div className="blog-fade-item relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          {blog.image && blog.image.trim() !== '' ? (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>

        {/* Article Body Content */}
        <div className="blog-fade-item prose prose-slate max-w-none space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed italic border-l-4 border-[#9cd5e2] pl-4 bg-slate-50 py-3 rounded-r-xl">
            {blog.excerpt}
          </p>

          <div className="space-y-4 pt-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 font-['Archivo']">
              Architectural Breakdown & Real-World Observations
            </h2>
            <p>
              {blog.content}
            </p>
            <p>
              When architecting distributed software ecosystems across South Asia and Europe, latency optimization and strict data residency compliance must be treated as foundational requirements rather than post-launch optimizations. By configuring containerized Node.js workloads behind high-throughput Nginx reverse proxies with automatic Brotli compression, we reduce round-trip payload delivery to under 45ms.
            </p>
            <p>
              Furthermore, continuous integration and deployment pipelines ensure that every commit merged to the production trunk undergoes automated unit testing, static linting, and Docker container verification before traffic shifting occurs.
            </p>
          </div>

          {/* Tags */}
          <div className="pt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase text-slate-400 font-bold mr-1">Tags:</span>
            {blog.tags.map((tag, idx) => (
              <span key={idx} className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200">
                #{tag}
              </span>
            ))}
          </div>

          {/* Like & Share Action Row */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                liked
                  ? 'bg-rose-50 text-rose-600 border border-rose-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current text-rose-600' : ''}`} />
              <span>{blog.likes + (liked ? 1 : 0)} Applauds</span>
            </button>

            <button
              onClick={onBack}
              className="bg-[#BBE7F1] hover:bg-[#a7dfed] text-slate-950 font-bold text-xs px-6 py-2.5 rounded-xl border border-[#9cd5e2] shadow-sm transition-all cursor-pointer"
            >
              ← Back to Technical Blog
            </button>
          </div>
        </div>

        {/* Peer Discussions & Technical Commentary */}
        <div className="blog-fade-item pt-8 border-t border-slate-200 space-y-6">
          <div className="flex items-center gap-2 text-lg font-bold text-slate-900 font-['Archivo']">
            <MessageSquare className="w-5 h-5 text-cyan-700" />
            <span>Peer Discussions ({comments.length})</span>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="space-y-3">
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Contribute technical insights or ask a question regarding this architecture..."
              className="w-full text-xs sm:text-sm p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#9cd5e2] focus:border-[#9cd5e2] outline-none resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Post Technical Feedback
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3 pt-2">
            {comments.map((comm) => (
              <div key={comm.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{comm.author}</span>
                  <span className="text-slate-400">{comm.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {comm.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        </div>
      </div>
    </div>
  );
};
