import React, { useState } from 'react';
import { X, Calendar, User, Heart, Share2, MessageSquare, ArrowLeft, Tag, Bookmark } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogDetailModalProps {
  blog: BlogPost | null;
  onClose: () => void;
  onLike: (id: string) => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  blog,
  onClose,
  onLike
}) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Array<{ id: string; author: string; text: string; date: string }>>([
    {
      id: 'c1',
      author: 'Lars Becker (Munich)',
      text: 'Extremely insightful breakdown regarding server failover clusters. We saw similar reliability improvements deploying bare-metal nodes in Frankfurt.',
      date: 'Feb 19, 2026'
    },
    {
      id: 'c2',
      author: 'Mahin Chowdhury (Dhaka)',
      text: 'Great point about React 19 server actions and modular monoliths. Excellent engineering standard from WebDev Software Solutions.',
      date: 'Feb 20, 2026'
    }
  ]);
  const [liked, setLiked] = useState(false);

  if (!blog) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([
      ...comments,
      {
        id: `c-${Date.now()}`,
        author: 'Verified Engineering Visitor',
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 relative my-8">
        
        {/* Banner with close button */}
        <div className="relative h-64 sm:h-72 bg-slate-900 overflow-hidden">
          {blog.image && blog.image.trim() !== '' ? (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-center hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-[#BBE7F1] text-slate-950 border border-[#9cd5e2] px-3 py-1 rounded-full">
              {blog.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Archivo'] leading-tight">
              {blog.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Author meta header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              {blog.authorImage && blog.authorImage.trim() !== '' ? (
                <img
                  src={blog.authorImage}
                  alt={blog.author}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#9cd5e2]"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#BBE7F1] border-2 border-[#9cd5e2] flex items-center justify-center text-slate-950 font-bold">
                  {blog.author?.charAt(0) || 'A'}
                </div>
              )}
              <div>
                <div className="text-sm font-bold text-slate-900">{blog.author}</div>
                <div className="text-xs text-slate-400">{blog.authorRole} • WebDev Software Solutions</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-cyan-800" />
                {blog.date}
              </span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
          </div>

          {/* Formatted Article Content */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
            {blog.content.split('\n\n').map((para, i) => {
              if (para.startsWith('### ')) {
                return (
                  <h4 key={i} className="text-base sm:text-lg font-bold text-slate-900 font-['Archivo'] pt-2">
                    {para.replace('### ', '')}
                  </h4>
                );
              }
              return <p key={i}>{para}</p>;
            })}
          </div>

          {/* Tags */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            {blog.tags.map((tag, i) => (
              <span key={i} className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium">
                #{tag}
              </span>
            ))}
          </div>

          {/* Like & Share Action Bar */}
          <div className="py-3 px-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                liked ? 'bg-rose-100 text-rose-600' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{blog.likes + (liked ? 1 : 0)} Likes</span>
            </button>

            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-cyan-800" />
              <span>Share via LinkedIn or Twitter</span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-['Archivo'] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-800" />
              <span>Reader Discussion ({comments.length})</span>
            </h4>

            {/* Comment List */}
            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                    <span>{c.author}</span>
                    <span className="text-[11px] text-slate-400 font-normal">{c.date}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>

            {/* Post Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-2 pt-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your engineering thoughts..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#9cd5e2] focus:ring-2 focus:ring-[#BBE7F1]/50"
              />
              <button
                type="submit"
                className="bg-[#BBE7F1] hover:bg-[#a7dfed] active:bg-[#9cd5e2] text-slate-950 border border-[#9cd5e2] text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0 shadow-sm"
              >
                Post
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
