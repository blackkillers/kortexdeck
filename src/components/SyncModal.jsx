import React, { useState } from 'react';
import { X, Zap, CheckCircle2, AlertCircle, Terminal, Copy, Check, RefreshCw, FolderCheck, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SyncModal({ isOpen, onClose, favoriteItems }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copiedScript, setCopiedScript] = useState(false);

  if (!isOpen) return null;

  const handleSyncNow = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/sync-local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: favoriteItems })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult(data);
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (_) {}
      } else {
        throw new Error(data.error || 'Erreur lors de la synchronisation locale.');
      }
    } catch (err) {
      // Fallback message if running static without local backend
      setError(err.message || 'Impossible de joindre le serveur local. Utilisez le script shell ci-dessous.');
    } finally {
      setLoading(false);
    }
  };

  const copyShellCommand = () => {
    const cmd = `./scripts/sync-stack.sh`;
    navigator.clipboard.writeText(cmd);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-cyan-500 to-amber-500 text-slate-950 shadow-lg shadow-cyan-500/20">
              <Zap className="w-6 h-6 font-bold fill-current" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Synchronisation Locale Automatique</h3>
              <p className="text-xs text-slate-400">Application directe vers ~/.cursorrules & ~/.claude/</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-400">Outils dans votre stack :</span>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                {favoriteItems.length} sélectionnés
              </span>
            </div>
            <div className="text-xs text-slate-300 space-y-1 pt-1">
              <div className="flex items-center gap-2">
                <FolderCheck className="w-4 h-4 text-emerald-400" />
                <span>Destination Cursor : <code className="text-emerald-300 font-mono">~/.cursorrules</code></span>
              </div>
              <div className="flex items-center gap-2">
                <FolderCheck className="w-4 h-4 text-amber-400" />
                <span>Destination Claude : <code className="text-amber-300 font-mono">~/.claude/CLAUDE.md</code></span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Une sauvegarde automatique (.bak) est créée avant chaque écriture.</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={handleSyncNow}
              disabled={loading}
              className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
                loading
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-slate-950 shadow-cyan-500/25 hover:scale-[1.02]'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Synchronisation en cours...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-current" />
                  <span>⚡ Appliquer ma stack sur mon poste en 1-Clic</span>
                </>
              )}
            </button>
          </div>

          {/* Success Box */}
          {result && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>{result.message}</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Vos {result.itemsCount} règles et commandes sont immédiatement actives dans votre IDE Cursor et vos sessions Claude Code.
              </p>
              <div className="font-mono text-[10px] text-emerald-400/90 bg-emerald-950/60 p-2 rounded-lg border border-emerald-800/40 space-y-1">
                <div>✓ Mis à jour : {result.cursorPath}</div>
                <div>✓ Mis à jour : {result.claudePath}</div>
              </div>
            </div>
          )}

          {/* Error Box */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 space-y-1 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>Information</span>
              </div>
              <p className="text-slate-300">{error}</p>
            </div>
          )}

          {/* Shell Alternative Box */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                Alternative via terminal (Script Shell) :
              </span>
              <button
                onClick={copyShellCommand}
                className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-300"
              >
                {copiedScript ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedScript ? "Copié !" : "Copier"}</span>
              </button>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-amber-300 select-all">
              ./scripts/sync-stack.sh
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
