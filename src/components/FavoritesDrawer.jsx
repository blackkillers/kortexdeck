import React from 'react';
import { X, BookmarkCheck, Download, Trash2, Copy, Check, ExternalLink, Sparkles, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FavoritesDrawer({ 
  isOpen, 
  onClose, 
  favoriteItems, 
  onRemoveFavorite, 
  onSelect, 
  onClearAll,
  onOpenSync 
}) {
  if (!isOpen) return null;

  const exportAsMarkdown = () => {
    let md = `# Ma Stack Personnalisée IA & Commandes (KortexDeck)\n\n`;
    md += `Exporté le ${new Date().toLocaleDateString('fr-FR')} - Total : ${favoriteItems.length} outils\n`;
    md += `Propulsé par Cohen Web Studio (https://cohenwebstudio.com/kortexdeck)\n\n`;

    favoriteItems.forEach((item, idx) => {
      md += `### ${idx + 1}. ${item.title} (\`${item.command}\`)\n`;
      md += `- **Plateforme** : ${item.platform.toUpperCase()}\n`;
      md += `- **Catégorie** : ${item.category}\n`;
      md += `- **Type** : ${item.type} | **Niveau** : ${item.difficulty}\n`;
      md += `- **Description** : ${item.description}\n`;
      md += `- **Syntaxe** :\n\`\`\`bash\n${item.syntax || item.command}\n\`\`\`\n`;
      md += `- **Exemple** : \`${item.example}\`\n\n---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `kortexdeck-stack-${new Date().toISOString().slice(0,10)}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    try { confetti({ particleCount: 30, spread: 60 }); } catch (_) {}
  };

  const exportAsCursorRules = () => {
    let rules = `# .cursorrules - Configuration générée par KortexDeck (Cohen Web Studio)\n\n`;
    rules += `# Stack personnalisée de ${favoriteItems.length} commandes et skills\n\n`;
    
    favoriteItems.forEach((item) => {
      rules += `## [${item.platform.toUpperCase()}] ${item.title}\n`;
      rules += `# Commande: ${item.command}\n`;
      rules += `# Directive: ${item.description}\n`;
      if (item.arguments && item.arguments.length > 0) {
        rules += `# Paramètres supportés: ${item.arguments.map(a => a.name).join(', ')}\n`;
      }
      rules += `# Exemple d'application: ${item.example}\n\n`;
    });

    const blob = new Blob([rules], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '.cursorrules');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    try { confetti({ particleCount: 25, spread: 50 }); } catch (_) {}
  };

  const exportAsClaudeMD = () => {
    let claudemd = `# CLAUDE.md - Directives de projet générées via KortexDeck\n\n`;
    claudemd += `> Généré automatiquement pour Claude Code et Claude Desktop (${favoriteItems.length} outils actifs)\n\n`;
    claudemd += `## Directives & Outils Recommandés\n\n`;

    favoriteItems.forEach((item, idx) => {
      claudemd += `### ${idx + 1}. ${item.title}\n`;
      claudemd += `- **Commande** : \`${item.command}\`\n`;
      claudemd += `- **Cas d'usage** : ${item.summary}\n`;
      claudemd += `- **Syntaxe** : \`${item.syntax || item.command}\`\n\n`;
    });

    const blob = new Blob([claudemd], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'CLAUDE.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    try { confetti({ particleCount: 25, spread: 50 }); } catch (_) {}
  };

  const exportAsJSON = () => {
    const jsonStr = JSON.stringify(favoriteItems, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `kortexdeck-stack-${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
                <BookmarkCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Ma Stack Personnalisée</h3>
                <p className="text-xs text-slate-400">{favoriteItems.length} commandes sauvegardées</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: List of saved items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {favoriteItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <BookmarkCheck className="w-12 h-12 text-slate-700 mb-3" />
                <p className="text-sm font-medium text-slate-400">Votre panier de stack est vide</p>
                <p className="text-xs text-slate-600 mt-1 max-w-xs">
                  Cliquez sur l'icône de marque-page sur n'importe quelle commande pour la sauvegarder dans votre stack et l'appliquer en 1-clic.
                </p>
              </div>
            ) : (
              favoriteItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 rounded-xl p-3.5 flex flex-col justify-between transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                        {item.command}
                      </span>
                      <h4 className="text-xs font-bold text-slate-200 mt-1.5 line-clamp-1">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{item.summary}</p>
                    </div>
                    <button
                      onClick={() => onRemoveFavorite(item.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                      title="Retirer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-900">
                    <span className="text-[10px] text-slate-500 font-mono">{item.platform.toUpperCase()}</span>
                    <button
                      onClick={() => {
                        onSelect(item);
                        onClose();
                      }}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                    >
                      <span>Ouvrir</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer: 1-Click Sync & Export Buttons */}
          {favoriteItems.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-2.5">
              {/* Primary 1-Click Sync Button */}
              <button
                onClick={() => {
                  onClose();
                  onOpenSync();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01]"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>⚡ Synchroniser vers ~/.cursorrules & ~/.claude/</span>
              </button>

              <button
                onClick={exportAsMarkdown}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Exporter en Markdown (.md)</span>
              </button>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={exportAsCursorRules}
                  className="flex items-center justify-center p-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 text-[11px] font-mono font-semibold transition-all"
                  title="Exporter sous forme de fichier .cursorrules pour Cursor IDE"
                >
                  .cursorrules
                </button>
                <button
                  onClick={exportAsClaudeMD}
                  className="flex items-center justify-center p-2 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-700/60 text-[11px] font-mono font-semibold transition-all"
                  title="Exporter sous forme de fichier CLAUDE.md pour Claude Code"
                >
                  CLAUDE.md
                </button>
                <button
                  onClick={exportAsJSON}
                  className="flex items-center justify-center p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] font-mono transition-all"
                  title="Exporter au format brut JSON"
                >
                  JSON
                </button>
              </div>

              <button
                onClick={onClearAll}
                className="w-full text-center text-xs text-slate-500 hover:text-rose-400 py-1 transition-colors"
              >
                Vider toute la stack
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
