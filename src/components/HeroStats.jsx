import React from 'react';
import { Sparkles, Zap, Cpu, Server, Terminal, Layers, Code, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function HeroStats({ onQuickSearch, totalCount = 500, onOpenSync, onOpenAIBridge }) {
  const QUICK_PROMPTS = [
    { label: "🚀 Mode Autonome", query: "/goal", desc: "Agents longue durée" },
    { label: "🔍 Indexer le Codebase", query: "@codebase", desc: "Recherche sémantique" },
    { label: "🛡️ Audit de Sécurité", query: "security", desc: "Anti-fuite & RLS" },
    { label: "⚡ Optimiser BigQuery", query: "bigquery", desc: "SQL haute performance" },
    { label: "🔌 Serveurs MCP", query: "mcp://", desc: "Intégrations universelles" },
    { label: "🧪 Bio-Informatique", query: "alphafold", desc: "Protéines & génomique" },
  ];

  const PLATFORM_BRIDGES = [
    { name: "Google Antigravity", badge: "AGY SDK", color: "border-cyan-500/40 text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/70" },
    { name: "Anthropic Claude", badge: "CLAUDE.md", color: "border-amber-500/40 text-amber-300 bg-amber-950/40 hover:bg-amber-950/70" },
    { name: "Cursor IDE", badge: ".cursorrules", color: "border-emerald-500/40 text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/70" },
    { name: "OpenAI Codex", badge: "Prompt System", color: "border-purple-500/40 text-purple-300 bg-purple-950/40 hover:bg-purple-950/70" }
  ];

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 p-6 md:p-10 overflow-hidden shadow-2xl mb-8">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-amber-500/10 to-indigo-500/10 border border-cyan-500/30 text-xs font-mono font-semibold shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-cyan-300">KortexDeck</span>
          <span className="text-slate-500">•</span>
          <span className="text-amber-400 font-bold">Cohen Web Studio</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 font-normal">0 API Requise (100% Autonome)</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          Le Poste de Commande Neuronal pour <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">Agents IA & Ingénieurs</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Explorez, assemblez et synchronisez <strong>500 skills, commandes et serveurs MCP</strong> directement dans vos environnements <strong>Cursor IDE</strong>, <strong>Claude Code</strong>, <strong>Codex</strong> et <strong>Google Antigravity</strong>.
        </p>

        {/* Platform Direct Connectors */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          {PLATFORM_BRIDGES.map((pb, idx) => (
            <button
              key={idx}
              onClick={onOpenAIBridge}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-medium transition-all shadow-sm hover:scale-105 ${pb.color}`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
              <span className="font-bold">{pb.name}</span>
              <span className="text-[10px] font-mono opacity-80 bg-slate-900/60 px-1.5 py-0.5 rounded">
                {pb.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Quick Inspiration Pills */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-mono text-slate-500 mr-1 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" />
            Raccourcis :
          </span>
          {QUICK_PROMPTS.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => onQuickSearch(qp.query)}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 text-slate-300 hover:text-cyan-300 border border-slate-700/60 hover:border-cyan-500/40 text-xs transition-all shadow-sm"
            >
              <span className="font-medium">{qp.label}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
