import React from 'react';
import Logo from './Logo';
import { Search, Bookmark, Zap, X, Server, Sparkles } from 'lucide-react';

export default function Navbar({
  searchQuery,
  onSearchChange,
  favoriteCount,
  onOpenFavorites,
  onOpenSync,
  onOpenAIBridge,
  totalResults
}) {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-2xl border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Studio Credit */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSearchChange('')}>
          <Logo size="normal" showText={true} />
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-xl relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Recherche (ex: /goal, bigquery, @codebase, tests, mcp://postgres)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-slate-600 focus:border-cyan-400 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all font-sans shadow-inner"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="absolute right-3 hidden sm:flex items-center gap-1 font-mono text-[10px] text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/60 pointer-events-none">
                <span>⌘K</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Bridge Button */}
          <button
            onClick={onOpenAIBridge}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold shadow-sm transition-all hover:scale-105"
            title="Connexion IA directe vers Claude, Antigravity, Codex & Cursor"
          >
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Connexion IA</span>
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/blackkillers/kortexdeck"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold shadow-sm transition-all hover:scale-105"
            title="Code source sur GitHub"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="hidden lg:inline">GitHub</span>
          </a>

          {/* Buy Me a Coffee Button */}
          <a
            href="https://buymeacoffee.com/studioengine"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold shadow-sm transition-all hover:scale-105"
            title="Soutenez le studio sur Buy Me a Coffee"
          >
            <span className="text-sm">☕</span>
            <span className="hidden lg:inline">Café</span>
          </a>

          {/* Quick Sync Button */}
          <button
            onClick={onOpenSync}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-amber-500/20 hover:from-cyan-500/30 hover:to-amber-500/30 text-slate-200 border border-slate-700 text-xs font-semibold shadow-sm transition-all"
            title="Synchroniser directement ~/.cursorrules et ~/.claude/"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Sync</span>
          </button>

          {/* Favorites / Stack Drawer Trigger */}
          <button
            onClick={onOpenFavorites}
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-all shadow-sm"
          >
            <Bookmark className="w-4 h-4 text-rose-400" />
            <span className="hidden sm:inline">Ma Stack</span>
            {favoriteCount > 0 && (
              <span className="px-1.5 py-0.2 text-[11px] font-bold rounded-full bg-rose-500 text-white animate-pulse">
                {favoriteCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
