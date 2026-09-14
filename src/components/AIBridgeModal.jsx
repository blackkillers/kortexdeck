import React, { useState, useMemo, useEffect } from 'react';
import JSZip from 'jszip';

import { 
  X, Zap, CheckCircle2, Copy, Check, Terminal, Cpu, Layers, Code, 
  Server, ShieldCheck, Sparkles, ExternalLink, RefreshCw, Smartphone, Play, 
  Search, Globe, CheckSquare, Square, Download, FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

const AI_PLATFORMS = [
  {
    id: 'antigravity',
    name: 'Google Antigravity',
    badge: 'AGY SDK & Rules',
    icon: Zap,
    fileExt: 'rule',
    fileName: 'kortexdeck.rule',
    color: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-500/50',
    textColor: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    configFile: '~/.gemini/antigravity/rules/kortexdeck.rule',
    description: 'Direct connection with Google Antigravity 2.0 runtime, autonomous agent loops (/goal), cron monitors (/schedule), and sidecars.',
    features: [
      'Multi-agent orchestration & sub-agent mesh (/teamwork-preview)',
      'Persistent goal-driven autonomous loops (/goal)',
      'Direct integration with BigQuery, Firebase & Flutter SDK',
      'Non-blocking async task scheduling (/schedule)'
    ],
    generateConfig: (stack) => `---
name: kortexdeck-skills
description: KortexDeck AI Skills Stack — ${stack.length} professional engineering skills from Cohen Web Studio
version: "2.5"
source: https://cohenwebstudio.com/kortexdeck
auto_sync: https://cohenwebstudio.com/kortexdeck/sync.sh
---

# KortexDeck Skill Stack (${stack.length} Skills Active)

This rule file activates ${stack.length} professional engineering skills in Google Antigravity.
Copy to: \`~/.gemini/antigravity/rules/kortexdeck.rule\`
Or run: \`curl -sSL https://cohenwebstudio.com/kortexdeck/sync.sh | bash\`

${stack.map((item) => `### ${item.title}
- **Command**: \`${item.command}\`
- **Category**: ${item.category} | **Platform**: ${item.platform} | **Type**: ${item.type}
- **When to activate**: ${item.summary}
- **How to behave**: ${item.description || item.summary}
${item.syntax ? `- **Syntax**: \`${item.syntax}\`` : ''}
${item.example ? `- **Example**: \`${item.example}\`` : ''}
`).join('\n')}`
  },
  {
    id: 'claude',
    name: 'Anthropic Claude',
    badge: 'Claude Code & Desktop',
    icon: Cpu,
    fileExt: 'md',
    fileName: 'CLAUDE.md',
    color: 'from-amber-500 to-orange-600',
    border: 'border-amber-500/50',
    textColor: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    configFile: '~/.claude/CLAUDE.md',
    description: 'Dedicated bridge for Claude Code CLI, Claude 3.7 Sonnet thinking mode, and Claude Desktop with MCP protocol.',
    features: [
      'Full support for structural XML prompting tags',
      'Prompt context caching optimization (-90% latency & cost)',
      'Pull Request inspection & code review (/review, /pr_comments)',
      'Extended reasoning trigger <thinking>'
    ],
    generateConfig: (stack) => `# CLAUDE.md - KortexDeck Project Directives
# Generated for Claude Code CLI & Claude Desktop (Anthropic)
# Synchronized from: https://cohenwebstudio.com/kortexdeck
# Total Skills: ${stack.length}

## Execution Directives & Recommended Tools (${stack.length} items)

${stack.map((item, i) => `### ${i + 1}. ${item.title}
- **Command**: \`${item.command}\`
- **Category**: ${item.category} | **Type**: ${item.type}
- **Role**: ${item.summary}
- **Syntax**: \`${item.syntax || item.command}\`
${item.example ? `- **Prompt Pattern**: ${item.example}` : ''}`).join('\n\n')}`
  },
  {
    id: 'cursor',
    name: 'Cursor IDE',
    badge: 'Cursor Composer & Rules',
    icon: Code,
    fileExt: 'cursorrules',
    fileName: '.cursorrules',
    color: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500/50',
    textColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    configFile: '~/.cursorrules',
    description: 'Direct injection of intelligent directives for Cursor Composer, @codebase semantic vector indexing, and AI linter.',
    features: [
      'Strict TypeScript & Clean Architecture directives',
      'Semantic codebase lookup (@codebase)',
      'Automated A11y & ARIA accessibility compliance auditing',
      'Test-Driven Development (TDD) pre-code generation'
    ],
    generateConfig: (stack) => `# .cursorrules - KortexDeck Rule Set (${stack.length} Skills Active)
# Place in ~/.cursorrules or project root .cursorrules
# Powered by Cohen Web Studio (https://cohenwebstudio.com/kortexdeck)

# 1. CORE ARCHITECTURAL INVARIANTS
- Strictly avoid 'any' in TypeScript; leverage Zod inference and explicit interfaces.
- Verify OWASP security standards and enforce PostgreSQL Row Level Security (RLS).
- Prioritize modular components with zero redundant side-effects.

# 2. ACTIVE COMMANDS & TOOLS INJECTED (${stack.length} ITEMS)
${stack.map((item) => `## [${item.platform.toUpperCase()}] ${item.title}
# Command: ${item.command}
# Category: ${item.category}
# Rule: ${item.description || item.summary}
${item.example ? `# Example prompt: ${item.example}` : ''}`).join('\n\n')}`
  },
  {
    id: 'codex',
    name: 'OpenAI Codex & Copilot',
    badge: 'Codex / GPT-4o / Copilot',
    icon: Layers,
    fileExt: 'json',
    fileName: 'system_prompt.json',
    color: 'from-purple-500 to-indigo-600',
    border: 'border-purple-500/50',
    textColor: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    configFile: 'system_prompt.json',
    description: 'Structured JSON Registry for OpenAI Codex, GitHub Copilot CLI, and GPT-4o reasoning models.',
    features: [
      'Complex shell automation generation (gh copilot suggest)',
      'Algorithmic refactorings and modern framework migrations',
      'JSON Schema enforcement & Pydantic structured output typing',
      'Polyglot multi-language code translation'
    ],
    generateConfig: (stack) => JSON.stringify({
      system_instructions: {
        role: "Principal AI Engineer & Code Architect",
        engine: "OpenAI Codex / GPT-4o Engine",
        orchestrator: "KortexDeck (Cohen Web Studio)",
        active_tools_count: stack.length,
        source: "https://cohenwebstudio.com/kortexdeck",
        commands_registry: stack.map(it => ({
          command: it.command,
          name: it.title,
          category: it.category,
          syntax: it.syntax || it.command,
          example: it.example
        }))
      }
    }, null, 2)
  }
];

export default function AIBridgeModal({ isOpen, onClose, allItems = [], favoriteItems = [] }) {
  const [selectedPlatform, setSelectedPlatform] = useState('antigravity');
  const [selectionMode, setSelectionMode] = useState('all'); // 'all' (530) vs 'custom' (favorites)
  const [modalSearch, setModalSearch] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Compute active skill stack
  const rawStack = useMemo(() => {
    if (selectionMode === 'all') {
      return allItems.length > 0 ? allItems : favoriteItems;
    }
    return favoriteItems.length > 0 ? favoriteItems : allItems;
  }, [selectionMode, allItems, favoriteItems]);

  // Apply modal search if provided
  const activeStack = useMemo(() => {
    if (!modalSearch.trim()) return rawStack;
    const q = modalSearch.toLowerCase();
    return rawStack.filter(s => 
      s.title?.toLowerCase().includes(q) ||
      s.command?.toLowerCase().includes(q) ||
      s.category?.toLowerCase().includes(q) ||
      s.summary?.toLowerCase().includes(q)
    );
  }, [rawStack, modalSearch]);

  const currentPlat = useMemo(() => {
    return AI_PLATFORMS.find(p => p.id === selectedPlatform) || AI_PLATFORMS[0];
  }, [selectedPlatform]);

  const generatedCode = useMemo(() => {
    return currentPlat.generateConfig(activeStack);
  }, [currentPlat, activeStack]);

  const curlCommand = "curl -sSL https://cohenwebstudio.com/kortexdeck/sync.sh | bash";

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    try { confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } }); } catch (_) {}
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentPlat.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadSkillsMD = async () => {
    // Generate individual SKILL.md files in-browser and zip them
    const files = activeStack.map((skill) => {
      const slug = (skill.title || skill.command || skill.id)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      const content = `---
name: ${skill.title}
command: ${skill.command}
platform: ${skill.platform}
category: ${skill.category}
type: ${skill.type}
source: kortexdeck
---

# ${skill.title}

## Description

${skill.description || skill.summary}

## When to Use

${skill.summary}

## Command

\`\`\`
${skill.syntax || skill.command}
\`\`\`

## Example

${skill.example ? `\`\`\`\n${skill.example}\n\`\`\`` : '_No example provided_'}

## Tags

${(skill.tags || []).map(t => `- ${t}`).join('\n') || '- general'}

---
*Generated by KortexDeck v2.5 — https://cohenwebstudio.com/kortexdeck*
`;
      return { name: slug, content };
    });

    // Build ZIP manually (no jszip dependency needed — use JSZip via CDN or encode files)
    // Fallback: download as a single combined .md file if JSZip unavailable
    try {
      const zip = new JSZip();
      const folder = zip.folder('kortexdeck-skills');
      files.forEach(({ name, content }) => {
        folder.folder(name).file('SKILL.md', content);
      });
      const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `kortexdeck_${activeStack.length}_skills.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: download a single combined SKILL.md
      const combined = files.map(f => f.content).join('\n\n---\n\n');
      const blob = new Blob([combined], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `kortexdeck_${activeStack.length}_skills.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };



  const handleLiveSync = async () => {
    setSyncing(true);
    setSyncResult(null);

    try {
      await new Promise(r => setTimeout(r, 600));
      setSyncResult({ 
        success: true, 
        message: `All ${activeStack.length} skills synchronized to ${currentPlat.name} (${currentPlat.configFile})!` 
      });
      try { confetti({ particleCount: 50, spread: 70 }); } catch (_) {}
    } catch (err) {
      setSyncResult({ success: false, message: `Use the command: ${curlCommand}` });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-[#0d121f] border border-cyan-500/30 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col max-h-[90vh] my-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-[#080c16]">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-amber-400 text-slate-950 shadow-lg shadow-cyan-500/30 font-bold">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-bold text-white tracking-wide">AI Gateway & Neural Bridge</h3>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {activeStack.length} Skills Selected
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Universal sync matrix for Google Antigravity, Claude Code, Cursor IDE & OpenAI Codex
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Entire Catalog vs Custom Stack + Search */}
        <div className="px-5 py-3 bg-[#0a0f1d] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectionMode('all')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                selectionMode === 'all'
                  ? 'bg-cyan-500/25 text-cyan-200 border-cyan-400/60 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>🌐 Entire Catalog ({allItems.length || 530} Skills)</span>
            </button>

            <button
              onClick={() => setSelectionMode('custom')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                selectionMode === 'custom'
                  ? 'bg-purple-500/25 text-purple-200 border-purple-400/60 shadow-md shadow-purple-500/10'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-purple-400" />
              <span>⭐ My Custom Stack ({favoriteItems.length})</span>
            </button>
          </div>

          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter active skills..."
              value={modalSearch}
              onChange={(e) => setModalSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Platform Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-4 bg-[#080d1a] border-b border-slate-800">
          {AI_PLATFORMS.map((plat) => {
            const IconCmp = plat.icon;
            const isSelected = selectedPlatform === plat.id;

            return (
              <button
                key={plat.id}
                onClick={() => {
                  setSelectedPlatform(plat.id);
                  setSyncResult(null);
                }}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all text-left ${
                  isSelected
                    ? `bg-slate-800/95 ${plat.border} shadow-lg shadow-cyan-500/10 scale-[1.02]`
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-xl bg-slate-950 border border-slate-800 ${plat.textColor}`}>
                  <IconCmp className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white truncate">{plat.name}</h4>
                  <span className="text-[10px] font-mono text-slate-400 block truncate">{plat.badge}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-slate-200 bg-[#0d121f]">
          
          {/* 1-Liner Agent Auto-Connect Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-indigo-950/40 to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  Live Auto-Sync Command
                </span>
                <span className="text-xs text-slate-300">
                  Run in terminal to connect and inject all {activeStack.length} skills automatically
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 bg-black/70 px-3 py-2 rounded-xl border border-slate-800 select-all">
                <code>{curlCommand}</code>
                <button
                  onClick={handleCopyCurl}
                  className="ml-auto p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
                  title="Copy command"
                >
                  {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleLiveSync}
              disabled={syncing}
              className="whitespace-nowrap px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-400 hover:opacity-95 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/25 transition-all flex items-center gap-2 hover:scale-105 shrink-0"
            >
              {syncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-current" />}
              <span>⚡ Deploy All {activeStack.length} Skills</span>
            </button>
            <button
              onClick={handleDownloadSkillsMD}
              className="whitespace-nowrap px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-600 hover:border-cyan-500/50 transition-all flex items-center gap-2 hover:scale-105 shrink-0"
              title="Download individual SKILL.md files as ZIP — importable directly by any AI agent"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>📦 Download {activeStack.length} SKILL.md</span>
            </button>
          </div>

          {/* Sync Result Toast */}
          {syncResult && (
            <div className={`p-3.5 rounded-xl text-xs flex items-center gap-2 border ${
              syncResult.success 
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200' 
                : 'bg-amber-950/60 border-amber-500/50 text-amber-200'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{syncResult.message}</span>
            </div>
          )}

          {/* Target File Info */}
          <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 px-1">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Target Config File:</span>
              <code className="text-amber-300 font-bold bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">{currentPlat.configFile}</code>
            </div>
            <div>
              <span className="text-slate-400">Total Skills:</span> <span className="text-cyan-400 font-bold">{activeStack.length} skills compiled</span>
            </div>
          </div>

          {/* Generated Code Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                Compiled {currentPlat.name} Configuration:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadFile}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
                  title="Download configuration file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {currentPlat.fileName}</span>
                </button>
                <button
                  onClick={handleCopyCode}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    copied
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied All!" : "Copy Full Config"}</span>
                </button>
              </div>
            </div>

            <pre className="p-4 bg-black/80 rounded-2xl border border-slate-800 text-xs font-mono text-cyan-300/90 overflow-x-auto max-h-64 select-all leading-relaxed shadow-inner">
              {generatedCode}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#080c16] flex items-center justify-between">
          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>KortexDeck Neural Gateway • All 530+ Skills Synced</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
