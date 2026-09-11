import React from 'react';
import * as Icons from 'lucide-react';

const PLATFORM_THEMES = {
  antigravity: {
    bg: "from-cyan-950/80 via-slate-900 to-blue-950/80",
    border: "border-cyan-500/30 group-hover:border-cyan-400/60",
    accent: "text-cyan-400",
    glow: "shadow-[0_0_25px_rgba(6,182,212,0.15)]",
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    tag: "AGY",
    dot: "bg-cyan-400"
  },
  claude: {
    bg: "from-amber-950/80 via-slate-900 to-orange-950/80",
    border: "border-amber-500/30 group-hover:border-amber-400/60",
    accent: "text-amber-400",
    glow: "shadow-[0_0_25px_rgba(245,158,11,0.15)]",
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    tag: "CLAUDE",
    dot: "bg-amber-400"
  },
  cursor: {
    bg: "from-emerald-950/80 via-slate-900 to-teal-950/80",
    border: "border-emerald-500/30 group-hover:border-emerald-400/60",
    accent: "text-emerald-400",
    glow: "shadow-[0_0_25px_rgba(16,185,129,0.15)]",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    tag: "CURSOR",
    dot: "bg-emerald-400"
  },
  codex: {
    bg: "from-teal-950/80 via-slate-900 to-emerald-950/80",
    border: "border-teal-500/30 group-hover:border-teal-400/60",
    accent: "text-teal-400",
    glow: "shadow-[0_0_25px_rgba(20,184,166,0.15)]",
    badge: "bg-teal-500/10 text-teal-300 border-teal-500/30",
    tag: "CODEX",
    dot: "bg-teal-400"
  },
  mcp: {
    bg: "from-purple-950/80 via-slate-900 to-indigo-950/80",
    border: "border-purple-500/30 group-hover:border-purple-400/60",
    accent: "text-purple-400",
    glow: "shadow-[0_0_25px_rgba(168,85,247,0.15)]",
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    tag: "MCP",
    dot: "bg-purple-400"
  },
  universal: {
    bg: "from-rose-950/80 via-slate-900 to-violet-950/80",
    border: "border-rose-500/30 group-hover:border-rose-400/60",
    accent: "text-rose-400",
    glow: "shadow-[0_0_25px_rgba(244,63,94,0.15)]",
    badge: "bg-rose-500/10 text-rose-300 border-rose-500/30",
    tag: "OMNI",
    dot: "bg-rose-400"
  }
};

export default function ThumbnailGenerator({ item, size = "card" }) {
  const theme = PLATFORM_THEMES[item.platform] || PLATFORM_THEMES.universal;
  
  // Resolve icon component dynamically with fallback
  const IconComponent = Icons[item.icon] || Icons.Terminal;

  if (size === "modal") {
    return (
      <div className={`relative w-full h-44 rounded-2xl bg-gradient-to-br ${theme.bg} border ${theme.border} p-6 flex items-center justify-between overflow-hidden shadow-2xl`}>
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none opacity-40"></div>
        
        {/* Glow ambient circle */}
        <div className={`absolute -right-10 -top-10 w-48 h-48 rounded-full blur-3xl opacity-30 bg-gradient-to-br ${item.gradient}`}></div>

        <div className="relative z-10 flex items-center gap-5">
          <div className={`p-4 rounded-2xl bg-slate-900/90 border border-slate-700/60 shadow-xl ${theme.accent}`}>
            <IconComponent className="w-12 h-12" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 text-xs font-mono font-bold tracking-wider rounded-md border ${theme.badge}`}>
                {theme.tag}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-slate-800/80 text-slate-300 border border-slate-700">
                {item.type}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-slate-800/80 text-slate-300 border border-slate-700">
                {item.difficulty}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">{item.title}</h2>
            <p className="font-mono text-sm text-cyan-400/90 mt-1">{item.command}</p>
          </div>
        </div>

        <div className="relative z-10 hidden md:flex flex-col items-end gap-1">
          <span className="text-xs text-slate-400 font-mono">AUTHOR</span>
          <span className="text-sm font-semibold text-slate-200">{item.author}</span>
          <span className="text-xs text-slate-400 font-mono mt-1">CATEGORY</span>
          <span className="text-sm font-semibold text-slate-300">{item.category}</span>
        </div>
      </div>
    );
  }

  // Standard Card Thumbnail
  return (
    <div className={`relative w-full h-28 rounded-xl bg-gradient-to-br ${theme.bg} border ${theme.border} p-3 flex flex-col justify-between overflow-hidden transition-all duration-300 ${theme.glow}`}>
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1rem_1rem] pointer-events-none"></div>

      {/* Decorative gradient glow corner */}
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-2xl opacity-25 bg-gradient-to-br ${item.gradient}`}></div>

      {/* Top row: Platform Badge & Difficulty */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${theme.dot} animate-pulse`}></span>
          <span className={`px-1.5 py-0.5 text-[10px] font-mono font-bold tracking-wider rounded border ${theme.badge}`}>
            {theme.tag}
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
          {item.difficulty}
        </span>
      </div>

      {/* Center: Big Icon & Command Highlight */}
      <div className="relative z-10 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg bg-slate-900/90 border border-slate-800/80 shadow-md ${theme.accent}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <div className="font-mono text-xs font-bold text-white tracking-wide truncate max-w-[170px]">
              {item.command}
            </div>
            <div className="text-[11px] text-slate-400 truncate max-w-[170px]">
              {item.category}
            </div>
          </div>
        </div>

        {/* Mini Type Pill */}
        <span className="text-[10px] text-slate-400 font-medium bg-slate-800/60 px-1.5 py-0.5 rounded border border-slate-700/50">
          {item.type}
        </span>
      </div>
    </div>
  );
}
