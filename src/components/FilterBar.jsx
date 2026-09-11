import React from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import { Layers, Zap, Cpu, Code, Server, Globe, Sparkles, Filter, RotateCcw, Check, Star } from 'lucide-react';

const ICON_MAP = {
  Layers: Layers,
  Zap: Zap,
  Cpu: Cpu,
  Code: Code,
  Server: Server,
  Globe: Globe,
  Sparkles: Sparkles
};

export default function FilterBar({
  selectedPlatform,
  onSelectPlatform,
  selectedCategory,
  onSelectCategory,
  selectedType,
  onSelectType,
  selectedDifficulty,
  onSelectDifficulty,
  popularOnly,
  onTogglePopular,
  sortBy,
  onSelectSort,
  onResetFilters,
  totalResults
}) {
  const types = ["all", "Slash Command", "Skill", "MCP Server", "Extension", "Prompt Template", "Workflow", "Rule / Prompt"];
  const difficulties = ["all", "Débutant", "Intermédiaire", "Expert"];

  const hasActiveFilters = 
    selectedPlatform !== 'all' ||
    selectedCategory !== 'all' ||
    selectedType !== 'all' ||
    selectedDifficulty !== 'all' ||
    popularOnly;

  return (
    <div className="space-y-4 mb-6">
      {/* 1. Platform Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {PLATFORMS.map((plat) => {
          const IconCmp = ICON_MAP[plat.icon] || Layers;
          const isSelected = selectedPlatform === plat.id;

          return (
            <button
              key={plat.id}
              onClick={() => onSelectPlatform(plat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-500/10 scale-105'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
              }`}
            >
              <IconCmp className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{plat.name}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Categories Scrollbar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-slate-800 text-white border-slate-600 shadow-sm'
                  : 'bg-slate-950/60 hover:bg-slate-900 text-slate-400 hover:text-slate-300 border-slate-800/80'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                isSelected ? 'bg-cyan-500/30 text-cyan-300' : 'bg-slate-800 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Secondary Dropdowns & Result Counters */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
        <div className="flex flex-wrap items-center gap-2">
          {/* Type Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5">
            <span className="text-[11px] font-mono text-slate-500">Type :</span>
            <select
              value={selectedType}
              onChange={(e) => onSelectType(e.target.value)}
              className="bg-transparent text-xs font-medium text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-slate-200">Tous les types</option>
              {types.filter(t => t !== 'all').map((t, idx) => (
                <option key={idx} value={t} className="bg-slate-900 text-slate-200">{t}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5">
            <span className="text-[11px] font-mono text-slate-500">Niveau :</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => onSelectDifficulty(e.target.value)}
              className="bg-transparent text-xs font-medium text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-slate-200">Tous niveaux</option>
              {difficulties.filter(d => d !== 'all').map((d, idx) => (
                <option key={idx} value={d} className="bg-slate-900 text-slate-200">{d}</option>
              ))}
            </select>
          </div>

          {/* Popular Only Toggle */}
          <button
            onClick={onTogglePopular}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
              popularOnly
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${popularOnly ? 'text-amber-400 fill-amber-400' : 'text-slate-500'}`} />
            <span>Top Populaires</span>
          </button>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-2.5 py-1.5 rounded-xl transition-colors border border-rose-500/20"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Réinitialiser</span>
            </button>
          )}
        </div>

        {/* Total Results Count */}
        <div className="text-xs font-mono text-slate-400">
          <span className="text-cyan-400 font-bold">{totalResults}</span> résultats trouvés
        </div>
      </div>
    </div>
  );
}
