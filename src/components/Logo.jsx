import React from 'react';

export default function Logo({ size = "normal", showText = true, animated = true }) {
  const isSmall = size === "small";
  const isLarge = size === "large";

  const iconDim = isLarge ? "w-14 h-14" : isSmall ? "w-8 h-8" : "w-10 h-10";

  return (
    <div className="flex items-center gap-3.5 select-none group">
      {/* Dynamic Animated Hexagonal Synaptic Emblem */}
      <div className={`relative ${iconDim} flex items-center justify-center`}>
        {/* Ambient Glow Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-amber-500/30 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>

        <svg viewBox="0 0 100 100" className="relative z-10 w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
          <defs>
            <linearGradient id="kortexGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="innerCoreK" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="60%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer Pulsing Cyber Ring */}
          <polygon
            points="50 3, 92 26.5, 92 73.5, 50 97, 8 73.5, 8 26.5"
            fill="none"
            stroke="url(#kortexGradPrimary)"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            className={animated ? "animate-pulse-slow opacity-60" : "opacity-40"}
          />

          {/* Main Shield Hexagon */}
          <polygon
            points="50 7, 88 28.5, 88 71.5, 50 93, 12 71.5, 12 28.5"
            fill="#080c17"
            stroke="url(#kortexGradPrimary)"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Synaptic Geometric Neural Links */}
          <line x1="50" y1="7" x2="50" y2="28" stroke="#22d3ee" strokeWidth="2.5" strokeDasharray="3,3" />
          <line x1="88" y1="71.5" x2="68" y2="58" stroke="#f59e0b" strokeWidth="2" />
          <line x1="12" y1="71.5" x2="32" y2="58" stroke="#22d3ee" strokeWidth="2" />
          <line x1="12" y1="28.5" x2="38" y2="38" stroke="#06b6d4" strokeWidth="1.5" />
          <line x1="88" y1="28.5" x2="62" y2="38" stroke="#f59e0b" strokeWidth="1.5" />

          {/* Central Stylized "K" Neural Core */}
          <path
            d="M38 28 L38 72 M63 30 L39 50 L64 70"
            fill="none"
            stroke="url(#innerCoreK)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neonGlow)"
          />

          {/* Core Synaptic Nodes */}
          <circle cx="50" cy="7" r="4" fill="#22d3ee" className="animate-ping opacity-75 origin-center" />
          <circle cx="50" cy="7" r="3.5" fill="#22d3ee" />
          <circle cx="88" cy="28.5" r="3.5" fill="#f59e0b" />
          <circle cx="88" cy="71.5" r="3.5" fill="#f59e0b" />
          <circle cx="50" cy="93" r="3.5" fill="#22d3ee" />
          <circle cx="12" cy="71.5" r="3.5" fill="#22d3ee" />
          <circle cx="12" cy="28.5" r="3.5" fill="#22d3ee" />
          <circle cx="39" cy="50" r="4" fill="#ffffff" filter="url(#neonGlow)" />
        </svg>
      </div>

      {/* Brand Typography & Studio Signature */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className={`font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors ${
              isLarge ? 'text-2xl md:text-3xl' : isSmall ? 'text-base' : 'text-xl'
            }`}>
              KORTEX<span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">DECK</span>
            </span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 tracking-wider">
              PRO
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
            <span className="text-slate-500">ENGINEERED BY</span>
            <span className="text-amber-400/90 font-semibold hover:text-amber-300 transition-colors">
              Cohen Web Studio
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
