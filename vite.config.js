import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Plugin Vite pour la synchronisation locale 1-clic vers ~/.cursorrules et ~/.claude/CLAUDE.md
function localSyncPlugin() {
  return {
    name: 'kortexdeck-local-sync-plugin',
    configureServer(server) {
      server.middlewares.use('/api/sync-local', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            const data = JSON.parse(body || '{}');
            const items = data.items || [];

            const homeDir = os.homedir();
            const cursorPath = path.join(homeDir, '.cursorrules');
            const claudeDir = path.join(homeDir, '.claude');
            const claudePath = path.join(claudeDir, 'CLAUDE.md');

            if (!fs.existsSync(claudeDir)) {
              fs.mkdirSync(claudeDir, { recursive: true });
            }

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

            // 1. Sauvegarde automatique si existants
            if (fs.existsSync(cursorPath)) {
              fs.copyFileSync(cursorPath, `${cursorPath}.bak-${timestamp}`);
            }
            if (fs.existsSync(claudePath)) {
              fs.copyFileSync(claudePath, `${claudePath}.bak-${timestamp}`);
            }

            // 2. Construction du fichier .cursorrules
            let cursorContent = `# .cursorrules - Généré par KortexDeck (Cohen Web Studio)\n`;
            cursorContent += `# Synchronisé le : ${new Date().toLocaleString('fr-FR')}\n`;
            cursorContent += `# Total commandes actives : ${items.length}\n\n`;
            cursorContent += `# DIRECTIVES GLOBALES DE L'ENVIRONNEMENT\n`;
            cursorContent += `- Prioriser la rigueur TypeScript, la sécurité OWASP et les tests automatisés.\n`;
            cursorContent += `- Analyser le graphe d'architecture avant d'appliquer des refactorings majeurs.\n\n`;
            cursorContent += `# COMMANDES & SKILLS SÉLECTIONNÉS DANS VOTRE STACK :\n\n`;

            items.forEach((it, idx) => {
              cursorContent += `## [${it.platform.toUpperCase()}] ${it.title} (\`${it.command}\`)\n`;
              cursorContent += `# Catégorie: ${it.category} | Type: ${it.type} | Niveau: ${it.difficulty}\n`;
              cursorContent += `# Directive: ${it.description}\n`;
              if (it.arguments && it.arguments.length > 0) {
                cursorContent += `# Options: ${it.arguments.map(a => a.name).join(', ')}\n`;
              }
              cursorContent += `# Exemple: ${it.example}\n\n`;
            });

            // 3. Construction du fichier CLAUDE.md
            let claudeContent = `# CLAUDE.md - Configuration Globale KortexDeck\n`;
            claudeContent += `> Synchronisé automatiquement depuis KortexDeck (https://cohenwebstudio.com/kortexdeck)\n\n`;
            claudeContent += `## Directives & Outils Actifs (${items.length} outils sélectionnés)\n\n`;

            items.forEach((it, idx) => {
              claudeContent += `### ${idx + 1}. ${it.title}\n`;
              claudeContent += `- **Commande / Symbole** : \`${it.command}\`\n`;
              claudeContent += `- **Cas d'usage** : ${it.summary}\n`;
              claudeContent += `- **Syntaxe** : \`${it.syntax || it.command}\`\n`;
              claudeContent += `- **Exemple de prompt** : \`${it.example}\`\n\n`;
            });

            // Écriture sur le disque local
            fs.writeFileSync(cursorPath, cursorContent, 'utf-8');
            fs.writeFileSync(claudePath, claudeContent, 'utf-8');

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: true,
              message: 'Synchronisation locale réussie avec succès !',
              cursorPath,
              claudePath,
              itemsCount: items.length,
              timestamp
            }));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    }
  };
}

export default defineConfig({
  base: '/kortexdeck/',
  plugins: [react(), localSyncPlugin()],
  server: {
    port: 5173,
    host: true,
    open: false
  }
});
