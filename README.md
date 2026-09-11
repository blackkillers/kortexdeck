<div align="center">

# ⚡ KORTEXDECK (v2.5 PRO)
### The Neural Command Center for AI Agents & Engineers
**Anthropic Claude • Google Antigravity • Cursor IDE • OpenAI Codex • MCP Ecosystem**

[![Website](https://img.shields.io/badge/Live_Demo-cohenwebstudio.com%2Fkortexdeck-06b6d4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://cohenwebstudio.com/kortexdeck)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-StudioEngine-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=black)](https://buymeacoffee.com/studioengine)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)
[![Zero API](https://img.shields.io/badge/Dependencies-0_API_Paid-purple?style=for-the-badge)](https://cohenwebstudio.com)

<br/>

<img src="public/images/kortexdeck_hero.jpg" alt="KortexDeck Hero Banner" width="100%" style="border-radius: 16px; border: 1px solid #1e293b; box-shadow: 0 20px 50px rgba(6, 182, 212, 0.15);" />

</div>

---

## 🌟 À Propos de KortexDeck

**KortexDeck** est une station de pilotage universelle répertoriant une encyclopédie interactive de **500 commandes slash (`/`), skills natifs, règles architecturales et serveurs MCP** conçus pour décupler la productivité des développeurs sur les meilleurs modèles de raisonnement IA (Claude 3.7 Sonnet, Google Antigravity 2.0, Cursor Composer, GPT-4o).

> 💡 **Architecture 100% Autonome & Zero-API** : Aucun abonnement API externe n'est requis. L'indexation, la recherche sémantique floue (< 1 ms), les miniatures et le générateur de commandes fonctionnent intégralement en mémoire côté client.

---

## 🚀 Fonctionnalités Clés

- 🧠 **500 Fiches d'Outils Exhaustives** :
  - **Google Antigravity** : Slash commands autonomes (`/goal`, `/schedule`, `/browser`, `/grill-me`, `/teamwork-preview`, `/learn`, `/boost`), skills BigQuery, Firebase, Flutter/Dart, Bio-informatique (AlphaFold, PubMed, ChEMBL).
  - **Anthropic Claude** : Commandes Claude Code CLI (`/bug`, `/compact`, `/cost`, `/doctor`, `/init`, `/review`, `/test`...), balisage XML structurel et gestion du cache de contexte.
  - **Cursor IDE & Codex** : Directives `@codebase`, `@web`, `@docs`, règles `.cursorrules` (TypeScript Strict, RSC, TDD, OWASP).
  - **Model Context Protocol (MCP)** : Serveurs officiels et communautaires (`filesystem`, `postgres`, `git`, `github`, `puppeteer`, `brave-search`, `docker`, `kubernetes`, `sentry`, `linear`, `notion`...).
- ⚡ **Synchronisation Locale 1-Clic** :
  - Écriture directe et sécurisée dans `~/.cursorrules` et `~/.claude/CLAUDE.md`.
  - Sauvegardes automatiques `.bak` créées avant chaque modification.
- 🎨 **Miniatures Graphiques Thématiques** :
  - Badges visuels dynamiques par plateforme, niveaux de difficulté (Débutant, Intermédiaire, Expert) et code couleur d'ingénierie.
- 🛠️ **Générateur Interactif (*Command Builder*)** :
  - Personnalisation en direct des arguments et options avec aperçu immédiat de la commande finale.
- 📦 **Export Multi-Formats** :
  - Exportation en un clic en Markdown (`.md`), JSON, `.cursorrules` ou `CLAUDE.md`.

---

## 🛠️ Installation & Démarrage Local

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- npm ou pnpm

### Lancer le projet
```bash
# 1. Cloner le dépôt
git clone https://github.com/blackkillers/kortexdeck.git
cd kortexdeck

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur local
npm run dev
```

L'application est disponible immédiatement sur `http://localhost:5173/kortexdeck/`.

---

## 💻 Synchronisation Locale via Script Shell

Vous pouvez synchroniser votre stack sélectionnée directement depuis votre terminal sans ouvrir le navigateur :

```bash
# Rendre le script exécutable et le lancer
chmod +x ./scripts/sync-stack.sh
./scripts/sync-stack.sh
```

Le script met automatiquement à jour :
1. `~/.cursorrules` (pour Cursor IDE)
2. `~/.claude/CLAUDE.md` (pour Claude Code & Claude Desktop)

---

## 🏗️ Architecture Technique

```
omnicommand-hub/
├── public/
│   └── images/
│       └── kortexdeck_hero.jpg      # Illustration officielle
├── src/
│   ├── components/
│   │   ├── Logo.jsx                 # Logo vectoriel animé KortexDeck
│   │   ├── Navbar.jsx               # Barre de navigation & liens rapides
│   │   ├── HeroStats.jsx            # Bannière d'accueil & passerelles IA
│   │   ├── FilterBar.jsx            # Filtres multi-critères & facettes
│   │   ├── CommandCard.jsx          # Carte avec miniature et copie 1-clic
│   │   ├── DetailModal.jsx          # Fiche complète & constructeur
│   │   ├── CommandBuilder.jsx       # Formulaire dynamique d'arguments
│   │   ├── FavoritesDrawer.jsx      # Panier de stack personnalisée
│   │   ├── SyncModal.jsx            # Modal de synchronisation locale
│   │   ├── AIBridgeModal.jsx        # Passerelle de connexion aux 4 IA
│   │   └── ThumbnailGenerator.jsx   # Rendu graphique des miniatures
│   ├── data/
│   │   ├── commandsData.json        # Base de données des 500 outils
│   │   └── categories.js            # Filtres et plateformes
│   ├── utils/
│   │   └── searchEngine.js          # Moteur MiniSearch & synonymes
│   ├── App.jsx                      # Contrôleur principal
│   └── main.jsx
├── scripts/
│   └── sync-stack.sh                # Script bash de synchronisation locale
├── vite.config.js                   # Config Vite & API middleware local
└── tailwind.config.js
```

---

## ☕ Soutenir le Projet

Si **KortexDeck** vous aide dans vos workflows de développement au quotidien, vous pouvez soutenir le studio :

👉 **[Offrir un café sur Buy Me a Coffee](https://buymeacoffee.com/studioengine)**

---

## 👨‍💻 Auteur & Crédits

- **Conçu & Développé par** : **Cohen Web Studio**
- **Site Officiel** : [https://cohenwebstudio.com](https://cohenwebstudio.com)
- **Application Déployée** : [https://cohenwebstudio.com/kortexdeck](https://cohenwebstudio.com/kortexdeck)
- **Licence** : [MIT](LICENSE)
