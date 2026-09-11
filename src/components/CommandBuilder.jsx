import React, { useState } from 'react';
import { Copy, Check, Terminal, Play, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CommandBuilder({ item }) {
  // Initialize state with default argument values
  const [argValues, setArgValues] = useState(() => {
    const initial = {};
    if (item.arguments) {
      item.arguments.forEach(arg => {
        initial[arg.name] = arg.defaultValue || '';
      });
    }
    return initial;
  });

  const [copied, setCopied] = useState(false);

  const handleInputChange = (name, value) => {
    setArgValues(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    const initial = {};
    if (item.arguments) {
      item.arguments.forEach(arg => {
        initial[arg.name] = arg.defaultValue || '';
      });
    }
    setArgValues(initial);
  };

  // Construct generated command string
  const generateCommand = () => {
    let base = item.command;

    if (item.platform === 'antigravity' && item.type === 'Skill') {
      base = `use skill: ${item.command}`;
    } else if (item.platform === 'mcp') {
      base = `npx -y @modelcontextprotocol/server-${item.id.replace('mcp-server-', '')}`;
    }

    const parts = [base];

    if (item.arguments && item.arguments.length > 0) {
      item.arguments.forEach(arg => {
        const val = argValues[arg.name];
        if (val !== undefined && val !== '') {
          if (arg.type === 'boolean') {
            if (val === true || val === 'true') {
              parts.push(arg.name);
            }
          } else if (arg.name.startsWith('-')) {
            parts.push(`${arg.name} "${val}"`);
          } else {
            parts.push(`"${val}"`);
          }
        }
      });
    }

    return parts.join(' ');
  };

  const generatedOutput = generateCommand();

  const handleCopyGenerated = (e) => {
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.7 }
      });
    } catch (_) {}
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-inner">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-bold text-slate-200">Générateur Interactif de Commande</h4>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 px-2 py-1 rounded transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Réinitialiser</span>
        </button>
      </div>

      {/* Form Fields for Arguments */}
      {item.arguments && item.arguments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {item.arguments.map((arg, idx) => (
            <div key={idx} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-semibold text-slate-300">
                  {arg.name}
                  {arg.required && <span className="text-rose-400 ml-1">*</span>}
                </label>
                <span className="text-[10px] font-mono text-slate-500">{arg.type}</span>
              </div>
              
              {arg.type === 'boolean' ? (
                <select
                  value={argValues[arg.name] || 'false'}
                  onChange={(e) => handleInputChange(arg.name, e.target.value)}
                  className="bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                >
                  <option value="true">Activé (true)</option>
                  <option value="false">Désactivé (false)</option>
                </select>
              ) : (
                <input
                  type="text"
                  placeholder={arg.description || `Valeur pour ${arg.name}`}
                  value={argValues[arg.name] || ''}
                  onChange={(e) => handleInputChange(arg.name, e.target.value)}
                  className="bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono placeholder:text-slate-600"
                />
              )}
              <span className="text-[11px] text-slate-500 leading-tight">
                {arg.description}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-4 text-xs text-slate-400 font-mono italic">
          Cette commande ne requiert aucun argument obligatoire. Vous pouvez l'exécuter directement.
        </div>
      )}

      {/* Live Generated Command Output */}
      <div className="mt-4 pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-medium text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            Ligne de commande générée :
          </span>
          <button
            onClick={handleCopyGenerated}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
              copied
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copié dans le presse-papier !</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copier la commande personnalisée</span>
              </>
            )}
          </button>
        </div>

        <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs text-cyan-300 break-all select-all flex items-center justify-between">
          <span>{generatedOutput}</span>
        </div>
      </div>
    </div>
  );
}
