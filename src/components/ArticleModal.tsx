import React from 'react';
import { X, Calendar, Clock, User, Share2, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
}

interface ArticleModalProps {
  article: ArticleItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToJobs?: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  isOpen,
  onClose,
  onNavigateToJobs
}) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-stone-200 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-50 text-[#5925DC] text-xs font-semibold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-xs text-stone-400">•</span>
            <span className="text-xs text-stone-500 font-medium">{article.readTime}</span>
            <span className="text-xs text-stone-400">•</span>
            <span className="text-xs text-stone-500 font-medium">{article.date}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1C1917] leading-tight">
            {article.title}
          </h2>

          <div className="flex items-center justify-between border-y border-stone-100 py-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#5925DC] text-white font-bold flex items-center justify-center text-xs">
                {article.author.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900">{article.author}</div>
                <div className="text-[11px] text-stone-500">Recruitment & Talent Intelligence Team</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Article link copied to clipboard!');
                }}
                className="text-stone-500 hover:text-[#5925DC] p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
                title="Share Article"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden h-64 sm:h-80 shadow-md">
            <img
              src={article.image}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
            <p className="font-semibold text-stone-900 text-base sm:text-lg">
              {article.excerpt}
            </p>
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-stone-900 text-base">Ready to take your next career step?</h4>
              <p className="text-xs text-stone-600">Browse verified engineering, drafting, design & executive opportunities.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                if (onNavigateToJobs) onNavigateToJobs();
              }}
              className="px-6 py-2.5 rounded-full bg-[#5925DC] hover:bg-[#471cb3] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm whitespace-nowrap cursor-pointer"
            >
              Explore Open Roles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
