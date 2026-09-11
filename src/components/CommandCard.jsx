import React, { useState } from 'react';
import ThumbnailGenerator from './ThumbnailGenerator';
import { Copy, Check, Bookmark, BookmarkCheck, ArrowRight, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CommandCard({ item, onSelect, isFavorite, onToggleFavorite }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.command);
    setCopied(true);
    
    // Mini confetti effect
    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { x, y },
        colors: ['#38bdf8', '#818cf8', '#34d399'],
        ticks: 100,
        disableForReducedMotion: true
      });
    } catch (_) {}

    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(item.id);
  };

  return (
    <div 
      onClick={() => onSelect(item)}
      className="group relative flex flex-col justify-between bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-4 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1.5 cursor-pointer overflow-hidden backdrop-blur-sm"
    >
      {/* Featured Badge Indicator */}
      {item.popular && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-amber-500/15 border border-amber-500/35 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm animate-pulse-slow">
          <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>Featured</span>
        </div>
      )}

      {/* Top Visual Miniature */}
      <div className="mb-3 transition-transform duration-300 group-hover:scale-[1.02]">
        <ThumbnailGenerator item={item} size="card" />
      </div>

      {/* Content Body */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
            {item.title}
          </h3>
          
          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {item.summary}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.tags.slice(0, 3).map((tag, idx) => (
            <span 
              key={idx}
              className="text-[10px] font-mono text-slate-400 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/40 px-2 py-0.5 rounded-md transition-colors"
            >
              #{tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="text-[10px] font-mono text-slate-500 px-1 py-0.5">
              +{item.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        {/* Quick Copy Command Button */}
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
            copied
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60'
          }`}
          title="Copy command syntax"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
              <span className="truncate max-w-[110px]">{item.command}</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5">
          {/* Favorite Toggle */}
          <button
            onClick={handleFavoriteClick}
            className={`p-1.5 rounded-lg border transition-all ${
              isFavorite
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-sm'
                : 'bg-slate-800/60 hover:bg-slate-700/80 text-slate-400 hover:text-slate-200 border-slate-700/50'
            }`}
            title={isFavorite ? "Remove from stack" : "Save to my stack"}
          >
            {isFavorite ? (
              <BookmarkCheck className="w-4 h-4 fill-rose-500/30" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>

          {/* Inspect / Detail trigger */}
          <button
            onClick={() => onSelect(item)}
            className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-all flex items-center justify-center hover:scale-105"
            title="Inspect & Builder"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
