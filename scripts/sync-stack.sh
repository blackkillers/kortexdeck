#!/usr/bin/env bash
# ==============================================================================
# KORTEXDECK - LOCAL SYNC AUTOMATION PLUGIN
# Cohen Web Studio (https://cohenwebstudio.com/kortexdeck)
#
# Synchronise la stack de commandes et skills sélectionnée vers :
#   1. ~/.cursorrules (pour Cursor IDE)
#   2. ~/.claude/CLAUDE.md (pour Claude Code & Claude Desktop)
# ==============================================================================

set -e

CYAN='\033[0;36m'
AMBER='\033[0;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║     KORTEXDECK - Neural Stack Synchronizer (v2.5)          ║${NC}"
echo -e "${CYAN}║     by Cohen Web Studio (https://cohenwebstudio.com)       ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"

HOME_DIR="${HOME:-/Users/$USER}"
CURSOR_DEST="$HOME_DIR/.cursorrules"
CLAUDE_DIR="$HOME_DIR/.claude"
CLAUDE_DEST="$CLAUDE_DIR/CLAUDE.md"

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

echo -e "\n${AMBER}[1/4] Vérification des répertoires cibles...${NC}"
mkdir -p "$CLAUDE_DIR"
echo -e "  ✓ Répertoire Claude : $CLAUDE_DIR"

# Sauvegarde des fichiers existants si présents
echo -e "\n${AMBER}[2/4] Création des sauvegardes de sécurité...${NC}"
if [ -f "$CURSOR_DEST" ]; then
    cp "$CURSOR_DEST" "${CURSOR_DEST}.bak_${TIMESTAMP}"
    echo -e "  ✓ Sauvegarde créée : ${CURSOR_DEST}.bak_${TIMESTAMP}"
else
    echo -e "  ℹ Aucun .cursorrules préalable (création nouvelle)."
fi

if [ -f "$CLAUDE_DEST" ]; then
    cp "$CLAUDE_DEST" "${CLAUDE_DEST}.bak_${TIMESTAMP}"
    echo -e "  ✓ Sauvegarde créée : ${CLAUDE_DEST}.bak_${TIMESTAMP}"
else
    echo -e "  ℹ Aucun CLAUDE.md préalable (création nouvelle)."
fi

# Récupération de la stack (soit via argument de fichier JSON, soit via l'API locale, soit template standard 500)
DATA_SOURCE="${1:-}"

if [ -n "$DATA_SOURCE" ] && [ -f "$DATA_SOURCE" ]; then
    echo -e "\n${AMBER}[3/4] Lecture de la stack personnalisée depuis $DATA_SOURCE...${NC}"
    STACK_CONTENT=$(cat "$DATA_SOURCE")
else
    echo -e "\n${AMBER}[3/4] Génération de la stack d'ingénierie active...${NC}"
fi

# Écriture dans ~/.cursorrules
cat << 'EOF' > "$CURSOR_DEST"
# ==============================================================================
# .cursorrules - Configuration KortexDeck
# Généré par KortexDeck (Cohen Web Studio)
# ==============================================================================

# RÈGLES GÉNÉRALES D'EXÉCUTION
- Prioriser l'architecture modulaire, le typage strict TypeScript et la gestion d'erreurs robuste.
- Toujours vérifier la sécurité OWASP (pas de secrets en clair, validation Zod, RLS PostgreSQL).
- Pour chaque refactorisation ou ajout de fonctionnalité, vérifier la conformité avec la suite de tests.

# DIRECTIVES DE COMMANDES INTÉGRÉES
- @codebase : Explorer le graphe de dépendances avant modification majeure.
- @definitions : Extraire les types stricts pour guider l'implémentation.
- /goal : Décomposer les tâches complexes en étapes vérifiables.
- /review : Réaliser une auto-critique du diff avant soumission.
EOF

# Écriture dans ~/.claude/CLAUDE.md
cat << 'EOF' > "$CLAUDE_DEST"
# CLAUDE.md - Configuration Globale KortexDeck
# Généré par KortexDeck (https://cohenwebstudio.com/kortexdeck)

## Standards & Instructions de Travail
- **Environnement** : Claude Code CLI & Desktop
- **Philosophie** : Code clair, modulaire, documenté, zéro régression.
- **Sécurité** : Sanctuarisation des clés API, variables d'environnement dans .env.
- **Workflow recommandé** :
  1. `/compact` : Optimisation régulière du contexte de session.
  2. `/review` : Revue méthodique de chaque modification de code.
  3. `/test` : Exécution systématique de la suite de tests unitaires.
EOF

echo -e "\n${GREEN}[4/4] Synchronisation effectuée avec succès !${NC}"
echo -e "  ✨ ~/.cursorrules mis à jour (${CURSOR_DEST})"
echo -e "  ✨ ~/.claude/CLAUDE.md mis à jour (${CLAUDE_DEST})"
echo -e "\n${CYAN}Votre environnement Cursor IDE et Claude Code est immédiatement synchronisé.${NC}\n"
