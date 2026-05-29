import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import type { Product } from './components/ProductCard';
import AgentModal from './components/AgentModal';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Theme state — persisted in localStorage
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'light' ? 'light' : 'dark');
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        const uniqueCats = Array.from(new Set(data.map((p) => p.category)));
        setCategories(['All', ...uniqueCats.sort()]);
      })
      .catch((err) => console.error('Failed to load products:', err));
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, activeCategory]);

  const productCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="aurora-bg">
        <div className="aurora-blob aurora-blob--blue" />
        <div className="aurora-blob aurora-blob--purple" />
        <div className="aurora-blob aurora-blob--cyan" />
      </div>
      <div className="noise-overlay" />

      <div className="app-container">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
          productCounts={productCounts}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main className="main-content">
          <div className="section-header">
            <p className="product-count">
              <strong>{filtered.length}</strong> produit{filtered.length !== 1 ? 's' : ''}
              {activeCategory !== 'All' && (
                <span className="product-count-cat"> · {activeCategory}</span>
              )}
            </p>
          </div>

          <div className="product-grid" key={activeCategory + searchQuery}>
            {filtered.length === 0 ? (
              <div className="empty-state">Aucun produit trouvé.</div>
            ) : (
              filtered.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onBuyClick={handleBuyClick}
                  index={index}
                />
              ))
            )}
          </div>
        </main>

        <AgentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
        />
      </div>
    </>
  );
}
