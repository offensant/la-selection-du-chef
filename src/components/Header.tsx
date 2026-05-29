import { Search, Sun, Moon } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  activeCategory: string;
  setActiveCategory: Dispatch<SetStateAction<string>>;
  categories: string[];
  productCounts: Record<string, number>;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  categories,
  productCounts,
  theme,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-top">
          <div className="brand">
            <div className="brand-icon">SC</div>
            <span className="brand-name">La Sélection du Chef</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, justifyContent: 'flex-end' }}>
            <div className="search-wrapper desktop-only">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            
            <button className="theme-toggle" onClick={onToggleTheme} title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}>
              {theme === 'dark' ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>

        <div className="search-wrapper mobile-search mobile-only">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="pills-row">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pill ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
              <span className="pill-count">{productCounts[cat] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
