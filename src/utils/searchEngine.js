import MiniSearch from 'minisearch';
import commandsData from '../data/commandsData.json';

// Configuration du moteur de recherche avec pondération et tolérance aux fautes
const miniSearch = new MiniSearch({
  fields: ['command', 'title', 'summary', 'description', 'tags', 'category', 'platform', 'author', 'syntax'],
  storeFields: ['id'],
  searchOptions: {
    boost: {
      command: 5.0,
      title: 3.5,
      tags: 2.5,
      summary: 2.0,
      description: 1.2,
      category: 1.0,
      platform: 1.0
    },
    fuzzy: 0.25,
    prefix: true,
    combineWith: 'OR'
  }
});

// Indexation des 500 entrées
miniSearch.addAll(commandsData);

// Table de correspondance pour les synonymes fréquents
const SYNONYMS = {
  'bug': ['debug', 'fix', 'error', 'erreur', 'crash', 'stacktrace', 'dépannage'],
  'test': ['vitest', 'playwright', 'e2e', 'tdd', 'jest', 'testing', 'qa', 'unitaire'],
  'agent': ['goal', 'autonomous', 'teamwork', 'subagent', 'multi-agent', 'workflow'],
  'db': ['database', 'base', 'postgres', 'sql', 'firestore', 'supabase', 'sqlite', 'mysql', 'mongodb'],
  'bdd': ['database', 'base', 'postgres', 'sql', 'firestore', 'supabase', 'sqlite', 'mysql', 'mongodb'],
  'donnees': ['data', 'analytics', 'bigquery', 'dbt', 'sql', 'lakehouse', 'spark'],
  'data': ['données', 'analytics', 'bigquery', 'dbt', 'sql', 'lakehouse', 'spark'],
  'ia': ['ai', 'gemini', 'claude', 'codex', 'rag', 'llm', 'multimodal', 'vision'],
  'ai': ['ia', 'gemini', 'claude', 'codex', 'rag', 'llm', 'multimodal', 'vision'],
  'secu': ['securite', 'security', 'auth', 'jwt', 'rbac', 'saif', 'audit', 'owasp'],
  'securite': ['security', 'auth', 'jwt', 'rbac', 'saif', 'audit', 'owasp'],
  'bio': ['biologie', 'adn', 'protein', 'alphafold', 'pubmed', 'genomics', 'variants'],
  'web': ['frontend', 'ui', 'ux', 'html', 'css', 'react', 'nextjs', 'tailwind'],
  'mobile': ['flutter', 'dart', 'ios', 'android', 'xcode', 'app']
};

export function searchCommands(query, filters = {}) {
  if (!query || query.trim() === '') {
    return filterOnly(commandsData, filters);
  }

  const cleanQuery = query.trim().toLowerCase();
  
  // Extension de la requête avec synonymes
  let expandedTerms = [cleanQuery];
  for (const [key, synList] of Object.entries(SYNONYMS)) {
    if (cleanQuery.includes(key)) {
      expandedTerms.push(...synList);
    }
  }

  const combinedSearch = expandedTerms.join(' ');
  const searchResults = miniSearch.search(combinedSearch);
  const resultIds = new Set(searchResults.map(r => r.id));

  // Récupération des objets originaux dans l'ordre de pertinence
  const idToItem = new Map(commandsData.map(item => [item.id, item]));
  const matchedItems = [];

  for (const res of searchResults) {
    const item = idToItem.get(res.id);
    if (item) {
      matchedItems.push(item);
    }
  }

  // Si la recherche floue n'a rien donné, fallback sur filtre direct regex
  if (matchedItems.length === 0) {
    const regex = new RegExp(cleanQuery, 'i');
    const fallback = commandsData.filter(item => 
      regex.test(item.title) ||
      regex.test(item.command) ||
      regex.test(item.summary) ||
      regex.test(item.description) ||
      item.tags.some(t => regex.test(t))
    );
    return filterOnly(fallback, filters);
  }

  return filterOnly(matchedItems, filters);
}

function filterOnly(list, filters) {
  return list.filter(item => {
    // Filtre Plateforme
    if (filters.platform && filters.platform !== 'all' && item.platform !== filters.platform) {
      return false;
    }

    // Filtre Catégorie
    if (filters.category && filters.category !== 'all' && item.category !== filters.category) {
      return false;
    }

    // Filtre Type (Slash Command, Skill, MCP Server...)
    if (filters.type && filters.type !== 'all' && item.type !== filters.type) {
      return false;
    }

    // Filtre Difficulté
    if (filters.difficulty && filters.difficulty !== 'all' && item.difficulty !== filters.difficulty) {
      return false;
    }

    // Filtre Populaires
    if (filters.popularOnly && !item.popular) {
      return false;
    }

    // Filtre Favoris uniquement
    if (filters.favoritesOnly && (!filters.favoritesList || !filters.favoritesList.includes(item.id))) {
      return false;
    }

    return true;
  });
}
