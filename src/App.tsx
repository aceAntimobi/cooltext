import { useMemo, useState } from 'react';
import { ItemCard } from './components/ItemCard';
import { ItemDetailModal } from './components/ItemDetailModal';
import { categories, findItemById, library, type Item, type ItemType, typeLabels } from './data/library';
import { useLocalStorageState } from './hooks/useLocalStorage';

const MAX_RECENT = 20;

function buildCategoryLabelMap() {
  const map = new Map<string, string>();
  (Object.keys(categories) as ItemType[]).forEach((type) => {
    categories[type].forEach((category) => {
      map.set(`${type}:${category.id}`, category.label);
    });
  });
  return map;
}

const categoryLabelMap = buildCategoryLabelMap();

export default function App() {
  const [selectedType, setSelectedType] = useState<ItemType>('emoji');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useLocalStorageState<string[]>('cooltext:favorites', []);
  const [recents, setRecents] = useLocalStorageState<string[]>('cooltext:recents', []);
  const [detailItem, setDetailItem] = useState<Item | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const itemsForType = useMemo(
    () => library.filter((item) => item.type === selectedType),
    [selectedType]
  );

  const filteredItems = useMemo(() => {
    return itemsForType.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchesCategory) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const keywordHit = item.keywords.some((keyword) => keyword.toLowerCase().includes(normalizedSearch));
      return (
        item.name.toLowerCase().includes(normalizedSearch) ||
        keywordHit ||
        item.character.includes(searchTerm.trim())
      );
    });
  }, [itemsForType, normalizedSearch, searchTerm, selectedCategory]);

  const favoriteItems = useMemo(
    () => favorites.map((id) => findItemById(id)).filter(Boolean) as Item[],
    [favorites]
  );

  const recentItems = useMemo(
    () => recents.map((id) => findItemById(id)).filter(Boolean) as Item[],
    [recents]
  );

  const handleCopy = async (item: Item) => {
    const text = item.character;

    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    setRecents((prev) => {
      const deduped = prev.filter((id) => id !== item.id);
      return [item.id, ...deduped].slice(0, MAX_RECENT);
    });
  };

  const toggleFavorite = (item: Item) => {
    setFavorites((prev) => {
      if (prev.includes(item.id)) {
        return prev.filter((id) => id !== item.id);
      }
      return [...prev, item.id];
    });
  };

  const clearFavorites = () => setFavorites([]);
  const clearRecents = () => setRecents([]);

  const handleSelectType = (type: ItemType) => {
    setSelectedType(type);
    setSelectedCategory('all');
    setIsNavOpen(false);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setIsNavOpen(false);
  };

  const currentCategories = categories[selectedType];

  return (
    <div className="app-shell">
      {isNavOpen && <div className="sidebar-overlay" onClick={() => setIsNavOpen(false)} />}
      <aside className={`sidebar ${isNavOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Browse</h2>
          <button type="button" className="sidebar-close" onClick={() => setIsNavOpen(false)} aria-label="Close navigation">
            ✕
          </button>
        </div>
        <div className="type-tabs" role="tablist" aria-label="Item types">
          {(Object.keys(typeLabels) as ItemType[]).map((type) => (
            <button
              key={type}
              type="button"
              role="tab"
              className={`type-tab ${selectedType === type ? 'active' : ''}`}
              onClick={() => handleSelectType(type)}
              aria-selected={selectedType === type}
            >
              {typeLabels[type]}
            </button>
          ))}
        </div>
        <nav aria-label="Categories">
          <ul className="category-list">
            {currentCategories.map((category) => (
              <li key={category.id}>
                <button
                  type="button"
                  className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleSelectCategory(category.id)}
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <p className="attribution">Favorites and recents are saved in your browser.</p>
      </aside>
      <main className="main">
        <header className="header">
          <div className="top-bar">
            <h1 className="app-title">Emoji, Kaomoji & Symbol Aggregator</h1>
            <button type="button" className="menu-button" onClick={() => setIsNavOpen((value) => !value)}>
              ☰ Menu
            </button>
          </div>
          <p>
            A unified, mobile-friendly picker to browse, search, favorite, and copy the characters you use most.
          </p>
          <div className="search-bar" role="search">
            <span className="search-icon" aria-hidden>
              🔍
            </span>
            <input
              type="search"
              placeholder="Search for smile, heart, arrow, (╯°□°）╯︵ ┻━┻ ..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search across all items"
            />
          </div>
        </header>

        {favoriteItems.length > 0 && (
          <section className="section" aria-label="Favorites">
            <div className="section-header">
              <h2 className="section-title">Favorites</h2>
              <button type="button" className="category-button" onClick={clearFavorites}>
                Clear
              </button>
            </div>
            <div className="inline-list">
              {favoriteItems.map((item) => (
                <div className="inline-card" key={item.id}>
                  <div className="item-character" aria-hidden>
                    {item.character}
                  </div>
                  <div className="item-meta">{item.name}</div>
                  <button type="button" onClick={() => handleCopy(item)}>
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {recentItems.length > 0 && (
          <section className="section" aria-label="Recently used">
            <div className="section-header">
              <h2 className="section-title">Recently Used</h2>
              <button type="button" className="category-button" onClick={clearRecents}>
                Clear
              </button>
            </div>
            <div className="inline-list">
              {recentItems.map((item) => (
                <div className="inline-card" key={item.id}>
                  <div className="item-character" aria-hidden>
                    {item.character}
                  </div>
                  <div className="item-meta">{item.name}</div>
                  <button type="button" onClick={() => handleCopy(item)}>
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="section" aria-label="Results">
          <div className="section-header">
            <h2 className="section-title">{typeLabels[selectedType]} Library</h2>
            <span>{filteredItems.length} items</span>
          </div>
          {filteredItems.length === 0 ? (
            <div className="empty-state">
              No matches yet. Try another keyword or choose a different category.
            </div>
          ) : (
            <div className="item-grid">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  categoryLabel={categoryLabelMap.get(`${item.type}:${item.category}`) ?? item.category}
                  isFavorite={favorites.includes(item.id)}
                  onToggleFavorite={toggleFavorite}
                  onCopy={handleCopy}
                  onOpenDetail={setDetailItem}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      {detailItem && (
        <ItemDetailModal
          item={detailItem}
          onClose={() => setDetailItem(null)}
          onCopy={handleCopy}
          isFavorite={favorites.includes(detailItem.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}
