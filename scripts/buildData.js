import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to generate items
const commands = [];

// 1. Antigravity Built-in Slash Commands & Skills
const antigravityItems = [
  {
    id: "agy-goal",
    title: "Mode Autonome Longue Durée (/goal)",
    command: "/goal",
    platform: "antigravity",
    category: "Workflow & Agents",
    type: "Slash Command",
    summary: "Active le mode objectif autonome persistant sans interruption jusqu'à complétion.",
    description: "Ordonne à l'agent Antigravity d'exécuter une tâche complexe de longue haleine (ex: refactoring complet, création d'app de zéro) sans s'arrêter avant d'avoir atteint et validé tous les critères de succès.",
    syntax: "/goal <objectif_détaillé> [--max-steps N] [--verify-tests]",
    arguments: [
      { name: "objectif", type: "string", required: true, description: "Description complète et critères de succès de la tâche" },
      { name: "--max-steps", type: "number", required: false, description: "Nombre maximum d'étapes d'itération", defaultValue: "50" },
      { name: "--verify-tests", type: "boolean", required: false, description: "Exécute obligatoirement la suite de tests avant de clôturer", defaultValue: "true" }
    ],
    example: "/goal Refactorise tout le module d'authentification vers NextAuth v5 avec session JWT et tests Vitest à 100% de couverture.",
    icon: "Target",
    gradient: "from-cyan-500 to-blue-600",
    tags: ["autonomous", "agent", "long-running", "unsupervised", "goal", "refactor"],
    difficulty: "Expert",
    author: "Google Antigravity",
    popular: true
  },
  {
    id: "agy-schedule",
    title: "Planificateur & Timers (/schedule)",
    command: "/schedule",
    platform: "antigravity",
    category: "Workflow & Agents",
    type: "Slash Command",
    summary: "Programme un rappel ponctuel ou un job cron récurrent en arrière-plan.",
    description: "Permet à l'agent de planifier des vérifications d'état, des surveillances de déploiement ou des relances programmées sans bloquer la conversation active.",
    syntax: "/schedule --duration <sec> | --cron <expr> --prompt <message>",
    arguments: [
      { name: "--duration", type: "number", required: false, description: "Durée en secondes pour un timer unique (ex: 300 pour 5min)" },
      { name: "--cron", type: "string", required: false, description: "Expression cron 5 champs (ex: '*/5 * * * *')" },
      { name: "--prompt", type: "string", required: true, description: "Instructions à exécuter lors du déclenchement" }
    ],
    example: "/schedule --duration 300 --prompt 'Vérifie si le conteneur Docker est en statut Healthy et analyse les logs d'erreur'",
    icon: "Clock",
    gradient: "from-blue-500 to-indigo-600",
    tags: ["timer", "cron", "background", "schedule", "automation", "polling"],
    difficulty: "Intermédiaire",
    author: "Google Antigravity",
    popular: true
  },
  {
    id: "agy-browser",
    title: "Navigation & Web Automation (/browser)",
    command: "/browser",
    platform: "antigravity",
    category: "Web & Frontend",
    type: "Slash Command",
    summary: "Active les outils de navigation et d'interaction web réelles.",
    description: "Permet à l'agent d'explorer le web en direct, d'interagir avec des formulaires, d'inspecter le DOM, de prendre des captures d'écran et de tester des applications en local ou distant.",
    syntax: "/browser <url> [--action click|type|screenshot] [--query recherche]",
    arguments: [
      { name: "url", type: "string", required: true, description: "URL cible à inspecter ou tester" },
      { name: "--action", type: "string", required: false, description: "Action spécifique à exécuter dans le navigateur" },
      { name: "--query", type: "string", required: false, description: "Terme de recherche web" }
    ],
    example: "/browser http://localhost:5173 --action screenshot --inspect-console",
    icon: "Globe",
    gradient: "from-emerald-500 to-teal-600",
    tags: ["browser", "web", "scraping", "e2e", "devtools", "inspection"],
    difficulty: "Débutant",
    author: "Google Antigravity",
    popular: true
  },
  {
    id: "agy-grill-me",
    title: "Interview Socratique & Architecture (/grill-me)",
    command: "/grill-me",
    platform: "antigravity",
    category: "Architecture & System",
    type: "Slash Command",
    summary: "Lance un questionnement intensif pour clarifier chaque zone d'ombre d'un projet.",
    description: "L'agent prend la posture d'un Lead Architecte exigeant et pose une série de questions ciblées pour valider les choix technologiques, les contraintes de sécurité et le modèle de données avant d'écrire une seule ligne de code.",
    syntax: "/grill-me <sujet_ou_spec>",
    arguments: [
      { name: "sujet", type: "string", required: true, description: "Description du projet, de l'API ou de la fonctionnalité à challenger" }
    ],
    example: "/grill-me Je veux concevoir une architecture microservices temps-réel pour du trading de cryptomonnaies.",
    icon: "HelpCircle",
    gradient: "from-amber-500 to-orange-600",
    tags: ["architecture", "interview", "clarification", "socratic", "design", "planning"],
    difficulty: "Intermédiaire",
    author: "Google Antigravity",
    popular: true
  },
  {
    id: "agy-boost",
    title: "Mode Réflexion Profonde & Vérification (/boost)",
    command: "/boost",
    platform: "antigravity",
    category: "Workflow & Agents",
    type: "Slash Command",
    summary: "Active le raisonnement approfondi multi-perspectives avec auto-critique systématique.",
    description: "Maximise le budget de calcul interne (Chain-of-Thought étendu) pour résoudre des algorithmes complexes, analyser des vulnérabilités subtiles ou optimiser des requêtes critiques.",
    syntax: "/boost <problème_complexe>",
    arguments: [
      { name: "problème", type: "string", required: true, description: "Énoncé de l'algorithme ou du problème à résoudre à haute intensité" }
    ],
    example: "/boost Trouve une solution O(N log K) avec garantie de mémoire bornée pour fusionner 1000 flux de données triés en parallèle.",
    icon: "Zap",
    gradient: "from-purple-500 to-pink-600",
    tags: ["deep-thinking", "reasoning", "boost", "complex", "algorithm", "audit"],
    difficulty: "Expert",
    author: "Google Antigravity",
    popular: true
  },
  {
    id: "agy-teamwork-preview",
    title: "Multi-Agents Coordonnés (/teamwork-preview)",
    command: "/teamwork-preview",
    platform: "antigravity",
    category: "Workflow & Agents",
    type: "Slash Command",
    summary: "Déploie une équipe de sous-agents spécialisés travaillant en parallèle.",
    description: "Divise automatiquement un grand projet entre un agent chercheur, un agent rédacteur de tests, un agent frontend et un agent backend avec synchronisation par messages.",
    syntax: "/teamwork-preview <projet> [--agents front,back,test,docs]",
    arguments: [
      { name: "projet", type: "string", required: true, description: "Cahier des charges du projet à répartir" },
      { name: "--agents", type: "string", required: false, description: "Rôles des sous-agents à instancier" }
    ],
    example: "/teamwork-preview Créer un clone de Linear avec dashboard frontend, API Fastify et base Supabase.",
    icon: "Users",
    gradient: "from-violet-500 to-purple-600",
    tags: ["multi-agent", "subagents", "parallel", "orchestration", "collaboration"],
    difficulty: "Expert",
    author: "Google Antigravity",
    popular: true
  },
  {
    id: "agy-learn",
    title: "Apprentissage & Mémorisation de Règles (/learn)",
    command: "/learn",
    platform: "antigravity",
    category: "Workflow & Agents",
    type: "Slash Command",
    summary: "Persiste une règle, une préférence ou une convention pour toutes les futures sessions.",
    description: "Analyse une correction ou une instruction utilisateur et l'enregistre durablement dans le fichier de règles globales de l'environnement Antigravity.",
    syntax: "/learn <règle_ou_pattern_à_mémoriser>",
    arguments: [
      { name: "règle", type: "string", required: true, description: "Convention de code, style architectural ou règle métier à retenir" }
    ],
    example: "/learn Utilise toujours les imports explicites avec extensions .js dans les projets ESM et préfère Zod pour valider les payloads.",
    icon: "BookOpen",
    gradient: "from-rose-500 to-pink-600",
    tags: ["memory", "rules", "learn", "preferences", "customization"],
    difficulty: "Débutant",
    author: "Google Antigravity",
    popular: true
  }
];

// Helper to systematically add skills & tools
console.log("Building comprehensive catalog of 500 items...");
