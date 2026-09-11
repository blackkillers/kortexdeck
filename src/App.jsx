import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroStats from './components/HeroStats';
import FilterBar from './components/FilterBar';
import CommandCard from './components/CommandCard';
import DetailModal from './components/DetailModal';
import FavoritesDrawer from './components/FavoritesDrawer';
import SyncModal from './components/SyncModal';
import AIBridgeModal from './components/AIBridgeModal';
import { searchCommands } from './utils/searchEngine';
import commandsData from './data/commandsData.json';
import { Sparkles, Terminal, ArrowUp, Zap, HelpCircle, Layers } from 'lucide-react';

const PAGE_SIZE = 48; // Efficient pagination chunk

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [popularOnly, setPopularOnly] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  
  // Modals state
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isAIBridgeOpen, setIsAIBridgeOpen] = useState(false);

  // Favorites state (persisted in localStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('kortexdeck_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (_) {
      return [];
    }
  });

  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(PAGE_SIZE);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kortexdeck_favorites', JSON.stringify(favorites));
    } catch (_) {}
  }, [favorites]);

  // Handle scroll to top listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter and search computation
  const filteredCommands = useMemo(() => {
    return searchCommands(searchQuery, {
      platform: selectedPlatform,
      category: selectedCategory,
      type: selectedType,
      difficulty: selectedDifficulty,
      popularOnly: popularOnly
    });
  }, [searchQuery, selectedPlatform, selectedCategory, selectedType, selectedDifficulty, popularOnly]);

  // Reset pagination limit when search or filters change
  useEffect(() => {
    setDisplayLimit(PAGE_SIZE);
  }, [searchQuery, selectedPlatform, selectedCategory, selectedType, selectedDifficulty, popularOnly]);

  const favoriteItems = useMemo(() => {
    const map = new Map(commandsData.map(i => [i.id, i]));
    return favorites.map(id => map.get(id)).filter(Boolean);
  }, [favorites]);

  const handleToggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const handleClearFavorites = () => {
    setFavorites([]);
  };

  const handleResetFilters = () => {
    setSelectedPlatform('all');
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedDifficulty('all');
    setPopularOnly(false);
    setSearchQuery('');
  };

  const handleQuickSearch = (term) => {
    setSearchQuery(term);
    setSelectedPlatform('all');
    setSelectedCategory('all');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleLoadMore = () => {
    setDisplayLimit(prev => prev + PAGE_SIZE);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visibleCommands = filteredCommands.slice(0, displayLimit);

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white font-sans antialiased">
      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favoriteCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenSync={() => setIsSyncModalOpen(true)}
        onOpenAIBridge={() => setIsAIBridgeOpen(true)}
        totalResults={filteredCommands.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Hero Section */}
        <HeroStats
          onQuickSearch={handleQuickSearch}
          totalCount={commandsData.length}
          onOpenSync={() => setIsSyncModalOpen(true)}
          onOpenAIBridge={() => setIsAIBridgeOpen(true)}
        />

        {/* Filters and Facets */}
        <FilterBar
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedType={selectedType}
          onSelectType={setSelectedType}
          selectedDifficulty={selectedDifficulty}
          onSelectDifficulty={setSelectedDifficulty}
          popularOnly={popularOnly}
          onTogglePopular={() => setPopularOnly(p => !p)}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          onResetFilters={handleResetFilters}
          totalResults={filteredCommands.length}
        />

        {/* Grid of Command Cards */}
        {visibleCommands.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center bg-slate-900/40 rounded-3xl border border-slate-800">
            <HelpCircle className="w-12 h-12 text-slate-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-300">Aucun résultat trouvé</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md">
              Aucune commande ou skill ne correspond à vos filtres actuels. Essayez d'autres mots-clés ou réinitialisez les filtres.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-semibold transition-all"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visibleCommands.map((item) => (
              <CommandCard
                key={item.id}
                item={item}
                onSelect={setSelectedItem}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}

        {/* Load More Trigger */}
        {displayLimit < filteredCommands.length && (
          <div className="mt-10 text-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs shadow-lg hover:border-cyan-500/50 transition-all"
            >
              Charger plus ({filteredCommands.length - displayLimit} restants)
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-300">KORTEXDECK v2.5</span>
            <span>— 500 Commandes, Skills & MCPs</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsAIBridgeOpen(true)}
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors font-medium bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 px-3 py-1 rounded-full"
            >
              <span>⚡ Passerelle IA (Claude, Antigravity, Codex, Cursor)</span>
            </button>

            <a
              href="https://buymeacoffee.com/studioengine"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-medium bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full"
            >
              <span>☕ Offrir un café sur Buy Me a Coffee</span>
            </a>

            <div className="flex items-center gap-1 text-slate-400">
              <span>Propulsé par</span>
              <a 
                href="https://cohenwebstudio.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-amber-400 font-semibold hover:text-amber-300 transition-colors underline decoration-amber-500/40"
              >
                Cohen Web Studio
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          isFavorite={favorites.includes(selectedItem.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteItems={favoriteItems}
        onRemoveFavorite={handleToggleFavorite}
        onSelect={setSelectedItem}
        onClearAll={handleClearFavorites}
        onOpenSync={() => setIsSyncModalOpen(true)}
      />

      {/* Local Sync Automation Modal */}
      <SyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        favoriteItems={favoriteItems.length > 0 ? favoriteItems : commandsData.slice(0, 10)}
      />

      {/* AI Multi-Platform Bridge Modal */}
      <AIBridgeModal
        isOpen={isAIBridgeOpen}
        onClose={() => setIsAIBridgeOpen(false)}
        favoriteItems={favoriteItems.length > 0 ? favoriteItems : commandsData.slice(0, 15)}
      />

      {/* Scroll to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-xl shadow-cyan-500/25 transition-all animate-bounce hover:animate-none"
          title="Retour en haut"
        >
          <ArrowUp className="w-5 h-5 font-bold" />
        </button>
      )}
    </div>
  );
}
