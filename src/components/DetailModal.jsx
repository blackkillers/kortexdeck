import React, { useState, useEffect } from 'react';
import ThumbnailGenerator from './ThumbnailGenerator';
import CommandBuilder from './CommandBuilder';
import { X, Copy, Check, Bookmark, BookmarkCheck, Terminal, BookOpen, Code2, Wrench, Sparkles, ExternalLink, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DetailModal({ item, onClose, isFavorite, onToggleFavorite }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const handleCopySyntax = () => {
    navigator.clipboard.writeText(item.syntax || item.command);
    setCopied(true);
    try {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
    } catch (_) {}
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Visual Banner */}
        <div className="p-5 pb-0">
          <ThumbnailGenerator item={item} size="modal" />
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800 bg-slate-900/50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-cyan-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Fiche & Explications</span>
          </button>

          <button
            onClick={() => setActiveTab('builder')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'builder'
                ? 'border-cyan-400 text-cyan-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Générateur Interactif</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'guide'
                ? 'border-cyan-400 text-cyan-400 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Guide d'Intégration</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Description Box */}
              <div>
                <h4 className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase mb-2">
                  Pourquoi & Quand l'utiliser
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  {item.description}
                </p>
              </div>

              {/* Exact Syntax */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    Syntaxe Formelle
                  </h4>
                  <button
                    onClick={handleCopySyntax}
                    className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copié !" : "Copier la syntaxe"}</span>
                  </button>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto select-all">
                  {item.syntax || item.command}
                </div>
              </div>

              {/* Real World Example */}
              <div>
                <h4 className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Exemple de Prompt / Utilisation Réelle
                </h4>
                <div className="bg-gradient-to-r from-slate-950 to-slate-900 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed select-all">
                  {item.example}
                </div>
              </div>

              {/* Arguments Table */}
              {item.arguments && item.arguments.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 tracking-wider uppercase mb-2">
                    Arguments & Options Disponibles ({item.arguments.length})
                  </h4>
                  <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900 text-slate-400 font-mono border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-4">Paramètre</th>
                          <th className="py-2.5 px-4">Type</th>
                          <th className="py-2.5 px-4">Requis</th>
                          <th className="py-2.5 px-4">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {item.arguments.map((arg, i) => (
                          <tr key={i} className="hover:bg-slate-900/40">
                            <td className="py-2.5 px-4 font-mono font-semibold text-cyan-400">{arg.name}</td>
                            <td className="py-2.5 px-4 font-mono text-slate-400">{arg.type}</td>
                            <td className="py-2.5 px-4 font-mono">
                              {arg.required ? (
                                <span className="text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/30 text-[10px]">Oui</span>
                              ) : (
                                <span className="text-slate-500 text-[10px]">Optionnel</span>
                              )}
                            </td>
                            <td className="py-2.5 px-4 text-slate-300">{arg.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tags & Metadata */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-mono text-slate-500">Mots-clés :</span>
                {item.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60 px-2.5 py-1 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'builder' && (
            <div>
              <CommandBuilder item={item} />
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-sm text-cyan-400">Comment exécuter cet élément selon votre environnement :</h4>
                
                {item.platform === 'antigravity' && (
                  <div className="space-y-2">
                    <p className="text-slate-300">
                      <strong>Dans Google Antigravity :</strong> Tapez simplement <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded">{item.command}</code> dans le chat ou utilisez l'instruction système appropriée.
                    </p>
                    <p className="text-slate-400">
                      Les skills sont automatiquement résolus et orchestrés par l'agent sans nécessiter d'installation externe.
                    </p>
                  </div>
                )}

                {item.platform === 'claude' && (
                  <div className="space-y-2">
                    <p className="text-slate-300">
                      <strong>Dans Claude Code CLI :</strong> Lancez votre terminal et saisissez <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded">{item.command}</code> au prompt interactif.
                    </p>
                    <p className="text-slate-400">
                      Pour Claude Desktop, assurez-vous d'avoir configuré le fichier <code className="text-slate-300">claude_desktop_config.json</code> avec les permissions adéquates.
                    </p>
                  </div>
                )}

                {item.platform === 'cursor' && (
                  <div className="space-y-2">
                    <p className="text-slate-300">
                      <strong>Dans Cursor IDE :</strong> Utilisez le symbole <code className="text-emerald-300 bg-slate-900 px-1.5 py-0.5 rounded">{item.command}</code> dans le panneau Composer (⌘I / Ctrl+I) ou le Chat (⌘L / Ctrl+L).
                    </p>
                  </div>
                )}

                {item.platform === 'mcp' && (
                  <div className="space-y-2">
                    <p className="text-slate-300">
                      <strong>Configuration MCP universelle :</strong> Ajoutez la définition du serveur dans votre fichier de configuration JSON :
                    </p>
                    <pre className="p-3 bg-slate-900 rounded-lg text-purple-300 font-mono text-[11px] overflow-x-auto">
{`{
  "mcpServers": {
    "${item.id.replace('mcp-server-', '')}": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-${item.id.replace('mcp-server-', '')}"]
    }
  }
}`}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 px-6 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <button
            onClick={() => onToggleFavorite(item.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isFavorite
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            {isFavorite ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-rose-400" />
                <span>Dans ma Stack</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Sauvegarder dans ma Stack</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopySyntax}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copié dans le presse-papier !</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copier {item.command}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
